## 理解对象

### 创建一个对象
```js
// 构造函数方式
let person = new Object();
person.name = 'xiaoming';
person.age = 18;
person.sayName = function() {
  console.log(this.name);
}
// 子面量方式，结果同上
let person = {
    name: 'xiaoming', 
    age: 18,
    sayName: function() {
      console.log(this.name);
    }
}
```
#### 属性描述符

> 详参：[Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)、[]Object.defineProperties](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)

ECMA-262 第 5 版在定义只有内部才用的特性(attribute)时，描述了属性(property)的各种特征。 ECMA-262 定义这些特性是为了实现 JavaScript 引擎用的，因此在 JavaScript 中不能直接访问它们。
对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个具有值的属性，该值可能是可写的，也可能不是可写的。存取描述符是由getter-setter函数对描述的属性。描述符必须是这两种形式之一；不能同时是两者。

数据描述符和存取描述符均具有以下可选键值(默认值是在使用Object.defineProperty()定义属性的情况下)：

|描述符|说明|
|:-|:-|
|configurable|当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。|
|enumerable|当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false。|

数据描述符同时具有以下可选键值：

|描述符|说明|
|:-|:-|
|value|该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。|
|writable|当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false。|

存取描述符同时具有以下可选键值：

|描述符|说明|
|:-|:-|
|get|一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入this对象（由于继承关系，这里的this并不一定是定义该属性的对象）。默认为 undefined。|
|set|一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。默认为 undefined。|

描述符可同时具有的键值

||configurable|	enumerable	|value	|writable	|get	|set|
|:-|:-|:-|:-|:-|:-|:-|
|数据描述符	|Yes	|Yes	|Yes	|Yes	|No	|No|
|存取描述符	|Yes	|Yes	|No	|No	|Yes	|Yes|


```js
// 在调用 Object.defineProperty()方法时，如果不指定，configurable、enumerable 和 writable 特性的默认值都是 false。
// 可以多次调用 Object.defineProperty()方法修改同一个属性，每次只会更新传入的描述符，但在把 configurable 特性设置为 false 之后就不能：1. 删除该属性; 2. 修改除value和writable特性外的其他特性。
let person = {};
Object.defineProperty(person, 'name', {
    value: 'xiaoming',
    configurable: true,
    writable: false
})



// 数据描述符和存取描述符不能混合使用
let o = new Object
Object.defineProperty(o, "error", {
  value: 11, 
  get: function() { 
    return 12; 
  } 
}); // Uncaught TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>
```

### 属性类型

根据上文的属性描述符，可将属性划分为两种：数据属性和访问器属性

#### 数据属性
数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有 4 个描述其行为的特性，即：

```
[[Configurable]]:表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 false。
[[Enumerable]]:表示能否通过 for-in 循环返回属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true。
[[Writable]]:表示能否修改属性的值。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true
[[Value]]:包含这个属性的数据值。读取属性值的时候，从这个位置读;写入属性值的时候，把新值保存在这个位置。这个特性的默认值为 undefined。
```
实例：
```js
let person = {
    name: 'xiaoming'
}
// 通过方法Object.getOwnPropertyDescriptor(person, 'name')，可查看给定属性的描述符。则上述定义等同于
let person = {};
Object.defineProperty(person, 'name', {
    value: 'xiaoming',
    configurable: true,
    enumerable: true,
    writable: true
})
// 可以多次调用 Object.defineProperty()方法修改同一个属性
// 一旦把属性定义为不可配置的，即configurable 设置为 false， 再调用 Object.defineProperty()方法修改除 writable、value 之外 的特性都会导致错误,
// 注意这里是'修改'，如果重新定义的属性值与原值相同则不会报错
Object.defineProperty(person, 'name', {
    configurable: false
})
Object.defineProperty(person, 'name', {enumerable:false}) // VM385:1 Uncaught TypeError: Cannot redefine property: name
```

#### 访问器属性
访问器属性不包含数据值;它们包含一对儿 getter 和 setter 函数(不过，这两个函数都不是必需的)。 在读取访问器属性时，会调用 getter 函数，这个函数负责返回有效的值;在写入访问器属性时，会调用 setter 函数并传入新值，这个函数负责决定如何处理数据。访问器属性有如下 4 个特性。

```
[[Configurable]]:表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特 性，或者能否把属性修改为数据属性。对于直接在对象上定义的属性，这个特性的默认值为 true。
[[Enumerable]]:表示能否通过 for-in 循环返回属性。对于直接在对象上定义的属性，这 5 个特性的默认值为 true。
[[Get]]:在读取属性时调用的函数。默认值为 undefined。
[[Set]]:在写入属性时调用的函数。默认值为 undefined。
```

访问器属性不能直接定义，必须使用 Object.defineProperty()来定义。请看下面的例子。
```
var book = {
    _year: 2004,
edition: 1 };
Object.defineProperty(book, "year", {
    get: function(){
        return this._year;
    },
    set: function(newValue){
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
} }
});
book.year = 2005; alert(book.edition); //2
```

支持 ECMAScript 5 的这个方法的浏览器有 IE9+(IE8 只是部分实现)、Firefox 4+、Safari 5+、Opera 12+和 Chrome。在这个方法之前，要创建访问器属性，一般都使用两个非标准的方法: __defineGetter__()和__defineSetter__()。这两个方法最初是由 Firefox 引入的，后来 Safari 3、 Chrome 1 和 Opera 9.5 也给出了相同的实现。使用这两个遗留的方法，可以像下面这样重写前面的例子。

```
var book = {
    _year: 2004,
edition: 1 };
//定义访问器的旧有方法 
book.__defineGetter__("year", function(){
    return this._year;
});
book.__defineSetter__("year", function(newValue){
    if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
    }
});
book.year = 2005; alert(book.edition); //2
```
