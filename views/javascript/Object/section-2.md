## 创建对象

虽然 Object 构造函数或对象字面量都可以用来创建单个对象，但这些方式有个明显的缺点:使用同一个接口创建很多对象，会产生大量的重复代码。

### 工厂模式

```js
function createPerson (name, gender) {
    return {
        name,
        gender
    }
}
let xiaoming = createPerson('xiaoming', 18);
let xiaohong = createPerson('xiaohong', 18);
```

函数 createPerson()能够根据接受的参数来构建一个包含所有必要信息的 Person 对象。可以无 数次地调用这个函数，而每次它都会返回一个对象。工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题(即怎样知道一个对象的类型)。随着 JavaScript 的发展，又一个新模式出现了。

### 构造函数模式

ECMAScript 中的构造函数可用来创建特定类型的对象。像 Object 和 Array 这样的原生构造函数，在运行时会自动出现在执行环境中。此外，也可以创建自定义的构造函数，从而定义自定义对象类型的属性和方法。例如，可以使用构造函数模式将前面的例子重写如下。
```js
function Person (name, gender) {
    this.name = name;
    this.gender = gender;
}
let xiaoming = new Person('xiaoming', 18);
let xiaohong = new Person('xiaohong', 18);
// xiaoming、xiaohong分别保存着 Person 的一个不同的实例。这两个对象都有一个 constructor(构造函数)属性，该属性指向 Person
xiaoming.constructor === Person; // true
xiaohong.constructor === Person; // true
xiaoming.constructor === xiaohong.constructor; // true;
// 对象的 constructor 属性最初是用来标识对象类型的。但是，提到检测对象类型，还是 instan- ceof 操作符要更可靠一些。
// 创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型;而这正是构造函数模式 胜过工厂模式的地方。
xiaoming instanceof Object; // true
xiaoming instanceof Person; // true
```

要创建 Person 的新实例，必须使用 new 操作符。以这种方式调用构造函数实际上会经历以下 4 个步骤:

1. 创建一个新对象, 即`{}`;
2. 将构造函数的作用域赋给新对象(因此 this 就指向了这个新对象);
3. 执行构造函数中的代码(为这个新对象添加属性)，即使用指定的参数调用构造函数，并将 this 绑定到新创建的对象。new Person 等同于 new Person()，也就是没有指定参数列表，Person 不带任何参数调用的情况。
4. 如果该函数没有返回对象，则返回this(即新对象)。展开来说，由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤）

模拟实现一个new操作：

```js
/**
* fn 构造函数
* args 参数，可以是多个
*/
// 实现一
function newOper(fn, ...args) {
  let obj = {};
  Object.setPrototypeOf(obj, fn.prototype); // setPrototypeOf是es6新增方法，之前版本可使用: obj.__proto__ = fn.prototype;
  let result = fn.apply(obj, args);
  return result instanceof Object ? result : obj;
}
// 由于现代 JavaScript 引擎优化属性访问所带来的特性的关系，更改对象的 [[Prototype]]在各个浏览器和 JavaScript 引擎上都是一个很慢的操作。关心性能，你应该避免设置一个对象的 [[Prototype]]。相反，你应该使用 Object.create()来创建带有你想要的[[Prototype]]的新对象。详见：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
// 实现二
function newOper2 (fn, ...args) {
    let obj = Object.create(fn.prototype);
    let result = fn.apply(obj, args);
    return result instanceof Object ? result : obj;
}
// 对于两种方式的测试
function Person(){}
Person.prototype.name = "xiaoming"
console.time('newOper')
for(let i = 0; i < 10000; i++){
    newOper(Person);
}
console.timeEnd('newOper');
console.time('newOper2');
for(let i = 0; i < 10000; i++){
    newOper2(Person);
}
console.timeEnd('newOper2')
// 测试结果, 显然方法二效率更高
// newOper: 3.765625ms
// newOper2: 2.02294921875ms
```



!> 以这种方式定义的构造函数是定义在 Global 对象(在浏览器中是 window 对象)中的。

#### 构造函数与函数
构造函数与其他函数的唯一区别，就在于调用它们的方式不同。不过，构造函数毕竟也是函数，不 存在定义构造函数的特殊语法。任何函数，只要通过 new 操作符来调用，那它就可以作为构造函数;而 任何函数，如果不通过 new 操作符来调用，那它跟普通函数也不会有什么两样。
```js
function Person (name, gender) {
    this.name = name;
    this.gender = gender;
}
// 当作构造函数使用
let xiaoming = new Person('xiaoming', 18);
// 作为普通函数调用, 在全局作用域中调用一个函数时，this 对象总是指向 Global 对象(在 浏览器中就是 window 对象)。相当于是给window对象新增了两个属性
Person('xiaoming', 18);
// 在另一个对象的作用域中调用
var o = new Object();
Person.call(o, "xiaohong", 18);
```
#### 构造函数的问题
使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍。
```js
function Person (name, gender) {
    this.name = name;
    this.gender = gender;
    this.getName = function() {
      return this.name;
    }
}
let xiaoming = new Person('xiaoming', 18); 
let xiaohong = new Person('xiaohong', 18); // 每个Person实例都包含一个不同的Function实例
xiaoming.getName === xiaohong.getName; // false
// xiaoming、xiaohong都有一个名为 getName()的方法，但那 两个方法不是同一个 Function 的实例。ECMAScript 中的函数是对象，因此每定义一个 函数，也就是实例化了一个对象。从逻辑角度讲，此时的构造函数也可以这样定义。
function Person(name, gender) {
    this.name = name;
    this.gender = gender;
    this.getName = new Function("return this.name"); // 与声明函数在逻辑上是等价的 
}
```
创建两个完成同样任务的 Function 实例的确没有必要;况且有 this 对象在，根本不用在 执行代码前就把函数绑定到特定对象上面。因此，大可像下面这样，通过把函数定义转移到构造函数外 部来解决这个问题。
```js
function Person (name, gender) {
    this.name = name;
    this.gender = gender;
    this.getName = getName;
}
function getName() {
  return this.name;
}
```
可是新问题又来了:在全局作用域中定义的函数实际上只 能被某个对象调用，这让全局作用域有点名不副实。而更让人无法接受的是:如果对象需要定义很多方 法，那么就要定义很多个全局函数，于是我们这个自定义的引用类型就丝毫没有封装性可言了。好在， 这些问题可以通过使用原型模式来解决。

### 原型模式

我们创建的每个函数都有一个 prototype(原型)属性，这个属性是一个指针，指向一个对象， 而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。如果按照字面意思来理解，那 么 prototype 就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以 让所有对象实例共享它所包含的属性和方法。换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中。
```js
function Person() {}
Person.prototype.name = 'xiaoming';
Person.prototype.gender = 'male';
Person.prototype.getName = function() {
    return this.name;
};
let xiaoming = new Person(); 
let xiaohong = new Person(); // 新对象的这些属性和方法是由所有实例共享的
xiaoming.getName === xiaohong.getName; // true

```

#### 理解原型对象

无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个 prototype 属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个 constructor (构造函数)属性，这个属性包含一个指向 prototype 属性所在函数的指针。当调用构造函数创建一个新实例后，该实例的内部将包含一个指针(内部属性, 即[[Prototype]])，指向构造函数的原型对象.虽然在脚本中 没有标准的方式访问[[Prototype]]，但 Firefox、Safari 和 Chrome 在每个对象上都支持一个属性 __proto__;而在其他实现中，这个属性对脚本则是完全不可见的。要明确的真正重要的一点就 是，这个连接存在于实例与构造函数的原型对象之间，而不是存在于实例与构造函数之间。
```js
function Person() {}
let xiaoming = new Person(); 
Person.prototype.constructor === Person; // true, 通过这个构造函数，可继续为原型对象添加其他属性和方法。
// 可以通过 isPrototypeOf()方法来确定对象之间是否存在原型关联关系
Person.prototype.isPrototypeOf(xiaoming); // true
// ECMAScript 5增加了一个新方法，叫Object.getPrototypeOf()，在所有支持的实现中，这个 方法返回[[Prototype]]的值
Object.getPrototypeOf(xiaoming) == Person.prototype; // true
// 创建了自定义的构造函数之后，其原型对象默认只会取得 constructor 属性;至于其他方法，则都是从 Object 继承而来的。
Object.getOwnPropertyNames(Person.prototype); // ["constructor"]
Object.getOwnPropertyNames(Person.prototype.__proto__); // ["constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "isPrototypeOf", "propertyIsEnumerable", "toString", "valueOf", "__proto__", "toLocaleString"]
// Object.getOwnPropertyNames(Object.getPrototypeOf(Person.prototype)),结果同上
Person.prototype.__proto__ === Object.prototype; // true
```

代码的实例图解：
```js
function Person() {}
Person.prototype.name = 'xiaoming';
Person.prototype.gender = 'male';
Person.prototype.getName = function() {
    return this.name;
};
let xiaoming = new Person(); 
let xiaohong = new Person(); // 新对象的这些属性和方法是由所有实例共享的
xiaoming.getName === xiaohong.getName; // true
```

![prototype](/images/gragh-prototype.png "prototype")

再来回顾下原型对象：
1. 定义`Person`函数时(`function Person() {}`),默认情况下其原型对象`prototype`自动获得一个 `constructor` (构造函数)属性，这个属性包含一个指向 prototype 属性所在函数的指针。并且其原型对象`prototype`默认存在一个指针指向`Object`的原型(`Object.prototype`);
2. 在`Person`的原型对象`prototype`上定义一些属性;
3. 使用new操作符调用构造函数创建实例对象，实例的内部将包含一个指针(内部 属性, [[Prototype]])，指向构造函数的原型对象。可以通过实例的`__proto__`属性来访问。

#### 原型链

每当代码读取某个对象的某个属性时，都会执行一次搜索，目标是具有给定名字的属性。
1. 搜索首先 从对象实例本身开始。如果在实例中找到了具有给定名字的属性，则返回该属性的值;
2. 如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性。如果在原型对象中找到了这个属性，则返回该属性的值；
3. 如果没有找到，则将搜索指针指向原型对象的原型对象，直到搜索指针指向`null`, 否则重复2。

```js
function Person () {}
Person.prototype.age = 18;
let xiaoming = new Person();
xiaoming.gender = 'male';
// 使用 hasOwnProperty()方法可以检测一个属性是存在于实例中，还是存在于原型中。
xiaoming.hasOwnProperty('gender'); // true
xiaoming.hasOwnProperty('age'); // false
xiaoming.age; // 18
```

#### 原型的动态性

由于在原型中查找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能够立即从实例上反映出来——即使是先创建了实例后修改原型也照样如此。
```js
function Person() {}
let xiaoming = new Person();
Person.prototype.name = 'xiaoming'; // 可以认为实例的[[Prototype]]（可用__proto__访问）仅是一个指向Person.prototype对象的指针
console.log(xiaoming.name); // xiaoming
// 但是当重写Person.prototype后
Person.prototype = { // 此时相当于Person.prototype指向了一个新的对象
    constructor: Person,
    name: 'xiaohong'
}
// 在此之前已经创建的实例的__proto__仍指向原来的对象
console.log(xiaoming.name); // xiaoming
let xiaohong = new Person();
console.log(xiaohong.name); // xiaohong
```

#### 原型与in操作符

单独使用时，in 操作符会在通 过对象能够访问给定属性时返回 true，无论该属性存在于实例中还是原型中。配合hasOwnProperty使用则可判定属性是存在于对象中，还是存在于 原型中，如下所示。
```js
function hasPrototypeProperty(object, name){
  return !object.hasOwnProperty(name) && (name in object);
}
```

在使用 for-in 循环时，返回的是所有能够通过对象访问的、可枚举的(enumerated)属性，其中 既包括存在于实例中的属性，也包括存在于原型中的属性。屏蔽了原型中不可枚举属性(即将 [[Enumerable]]标记为 false 的属性)的实例属性也会在 for-in 循环中返回，因为根据规定，所 有开发人员定义的属性都是可枚举的——只有在 IE8 及更早版本中例外。
IE 早期版本的实现中存在一个 bug，即屏蔽不可枚举属性的实例属性不会出现在 for-in 循环中。 例如:
```js
var o = {
    toString : function(){
        return "My Object";
    }
};
for (var prop in o){
    if (prop == "toString"){
        alert("Found toString");//在 IE 中不会显示
  } }
```

当以上代码运行时，应该会显示一个警告框，表明找到了 toString()方法。这里的对象 o 定义了 一个名为 toString()的方法，该方法屏蔽了原型中(不可枚举)的 toString()方法。在 IE 中，由 于其实现认为原型的 toString()方法被打上了值为 false 的[[Enumerable]]标记，因此应该跳过 该属性，结果我们就不会看到警告框。该 bug 会影响默认不可枚举的所有属性和方法，包括: hasOwnProperty()、propertyIsEnumerable()、toLocaleString()、toString()和 valueOf()。 ECMAScript 5 也将 constructor 和 prototype 属性的[[Enumerable]]特性设置为 false，但并不 是所有浏览器都照此实现。

要取得对象上所有可枚举的实例属性（不包含原型链上的属性），可以使用 ECMAScript 5 的 Object.keys()方法。这个方法接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组。
如果你想要得到所有实例属性（不包含原型链上的属性），无论它是否可枚举，都可以使用 Object.getOwnPropertyNames() 方法。

#### 更简单的原型语法

```js
function Person() {}
Person.prototype = {
    constructor: Person, // 如若不指定则，constructor将会指向Object, 注意，以这种方式重设 constructor 属性会导致它的[[Enumerable]]特性被设置为 true。
    name: 'xiaoming',
    gender: 'male'
}
// 因为默认的构造器的原因，使用下面的方法更方便
Object.assign(Person.prototype, {
    name: 'xiaoming',
    gender: 'male'
});
```

#### 原型对象的问题

首先，它省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值。原型模式的最大问题是由其共享的本性所导致的,这种共享对于函数非常合适。然而，对于包含引用类型值的属性来说，当不同实例修改同一引用类型，问题就比较突出。如：共享的是数组，那么不同实例对其的操作都会被保存在同一数组中。

### 组合构造函数和原型模式

创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式。构造函数模式用于定义实 例属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本， 但同时又共享着对方法的引用，最大限度地节省了内存。另外，这种混成模式还支持向构造函数传递参 数;可谓是集两种模式之长。
```js
function Person(name, gender) {
    this.name = name;
    this.gender = gender;
}
Object.assign(Person.prototype, {
    getName: function() {
        return this.name;
    }
});
```

### 动态原型模式
独立的构造函数和原型时，很可能会感到非常困惑。动态原 型模式正是致力于解决这个问题的一个方案，它把所有信息都封装在了构造函数中，而通过在构造函数 中初始化原型(仅在必要的情况下)，又保持了同时使用构造函数和原型的优点。换句话说，可以通过 检查某个应该存在的方法是否有效，来决定是否需要初始化原型。
```js
function Person(name, gender) {
    this.name = name;
    this.gender = gender;
    if (!this.getName) {
        Person.prototype.getName = function() {
            return this.name;
        }
    }
}
```
这里只在 getName()方法不存在的情况下，才会将它添加到原型中。这段代码只会在初次调用构造函数时才会执行。此后，原型已经完成初始化，不需要再做什么修 改了。不过要记住，这里对原型所做的修改，能够立即在所有实例中得到反映。因此，这种方法确实可 以说非常完美。其中，if 语句检查的可以是初始化之后应该存在的任何属性或方法——不必用一大堆 if 语句检查每个属性和每个方法;只要检查其中一个即可。对于采用这种模式创建的对象，还可以使 用 instanceof 操作符确定它的类型。

!> 使用动态原型模式时，不能使用对象字面量重写原型。前面已经解释过了，如果 在已经创建了实例的情况下重写原型，那么就会切断现有实例与新原型之间的联系。

### 寄生构造函数模式
这种模式 的基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象;但从表面上看，这个函数又很像是典型的构造函数。
```js
function Person(name, gender) {
    return {
        name,
        gender
    }
}
```
构造函数在不返回值的情况下，默认会返回新对象实例。而通过在构造函数的末尾添加一个 return 语句，可以重写调用构造函数时返回的值。这个模式可以在特殊的情况下用来为对象创建构造函数。假设我们想创建一个具有额外方法的特殊数组。由于不能直接修改 Array 构造函数，因此可以使用这个模式。
```js
function SpecialArray(...args) {
    //创建数组
    let arr = new Array(...args);
    //添加方法
    arr.toPipedString = function(){
        return this.join("|");
    };
    //返回数组
    return arr;
}
```
#### 寄生构造函数的问题
首先，返回的对象与构造函数或者与构造函数的原型属 性之间没有关系;也就是说，构造函数返回的对象与在构造函数外部创建的对象没有什么不同。为此， 不能依赖 instanceof 操作符来确定对象类型。由于存在上述问题，我们建议在可以使用其他模式的情 况下，不要使用这种模式。

### ES6新增的class

> 详见: http://es6.ruanyifeng.com/#docs/class

```js
class Person {
    constructor (name, gender) { // constructor方法是类的默认方法，如果没有显式定义，一个空的constructor方法会被默认添加
        this.name = name;
        this.gender = gender;
    }
    getName () {
        return this.name;
    }
}
typeof Person; // function
Person === Person.prototype.constructor; // true
// 类的内部所有定义的方法，都是不可枚举的这一点与 ES5 的行为不一致。
Object.keys(Person.prototype); // []
Object.getOwnPropertyNames(Person.prototype)

```
