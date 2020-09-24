## 函数声明

> 参考：[http://es6.ruanyifeng.com/#docs/function](http://es6.ruanyifeng.com/#docs/function)

ECMAScript 中的函数使用 function 关键字来声明，后跟一组参数以及函数体。 函数的基本语法如下所示:

```js
// 1. 函数声明
function fn1 (arg0, arg1,...,argN) {

}
// Firefox、Safari、Chrome 和 Opera 都给函数定义了一个非标准的 name 属性，通过这个属性可以访问到给函数指定的名字。这个 属性的值永远等于跟在 function 关键字后面的标识符。
console.log(fn1.name); // fn1
// 函数声明的一个重要特征就是函数声明提升(function declaration hoisting)，意思是在执行 代码之前会先读取函数声明。这就意味着可以把函数声明放在调用它的语句后面。
sayHello();
function sayHello () {
    console.log('Hello world')
}

// 2.函数表达式,即创建一个函数并将它赋值给变量 functionName。 这种情况下创建的函数叫做匿名函数(anonymous function)，因为 function 关键字后面没有标识符。(匿名函数有时候也叫拉姆达函数。)匿名函数的 name 属性是空字符串。
var fn2 = function (arg0, arg1,...,argN) {

}
console.log(fn2.name); // fn2

var fn3 = function f () {
  
}
console.log(fn3.name); // f
// 以下代码会报错
sayHello2(); // 此时函数还不存在，仅是sayHello2变量声明提升，还未给其赋值
var sayHello2 = function () {
    console.log('Hello world')
}
```

### arguments 和 this
在函数内部，有两个特殊的对象:arguments 和 this。
在函数体内可以通过 `arguments` 对象来 访问这个参数数组，从而获取传递给函数的每一个参数。arguments的值永远与对应命名参数的值保持同步。如：

```js
(function a(num1, num2) {
    arguments[1] = 10;
    console.log(arguments[0] + num2); // arguments 对象中的值会自动反映到对应的命名参数，所以修改 arguments[1]，也就修改了 num2
    // 函数内部可以通过arguments.callee访问函数本身,但在严格模式下，不能通过脚本访问 arguments.callee，访问这个属性会导致错误。
    console.log(arguments.callee); // f a() {console.log(arguments.callee)}
})(1, 2) // 11
```

如果只传入了一个参数，那么为 arguments[1]设置的值不会反应到命名参数中。这是因为 arguments 对象的长度是由传入的参数个数决定的，不是由定义函数时的命名参数的个数决定的。
没有传递值的命名参数将自动被赋予 undefined 值。这就跟定义了 变量但又没有初始化一样。例如，如果只给 函数传递了一个参数，则 num2 中就会保存 undefined 值。
严格模式对如何使用 arguments 对象做出了一些限制。首先，像前面例子中那样的赋值会变得无效。也就是说，即使把 arguments[1]设置为 10，num2 的值仍然还是 undefined。其次，重写 arguments 的值会导致语法错误(代码将不会执行)。

在 ECMAScript 中定义了两个名字相同的函数，则该名字只属于后定义的函数。
```js
function log () {
    console.log(1);
}
function log () {
    console.log(2);
}
log(); // 2
```

this 引用的是函数据以执行的环境对象(当在网页的全局作用域中调用函数时， this 对象引用的就是 window)。函数的名字仅仅是一个包含指针的变量而已。因此，即使是在不同的环境中执行，全局的函数与 o.sayColor()指向的仍然是同一个函数。

ECMAScript 5 也规范化了另一个函数对象的属性:caller。除了 Opera 的早期版本不支持，其他 4 浏览器都支持这个 ECMAScript 3 并没有定义的属性。这个属性中保存着调用当前函数的函数的引用， 如果是在全局作用域中调用当前函数，它的值为 null。例如:
```js
function outer(){
    inner();
}
 function inner(){ 
    console.log(inner.caller);
} 
outer(); // f: outer
 // 改写
 function outer(){
     inner();
 }
function inner(){
     console.log(arguments.callee.caller);
     // 当函数在严格模式下运行时，访问 arguments.callee 会导致错误。ECMAScript 5 还定义了 arguments.caller 属性，但在严格模式下访问它也会导致错误，而在非严格模式下这个属性始终是 undefined。
     // 定义这个属性是为了分清 arguments.caller 和函数的 caller 属性。以上变化都是为 了加强这门语言的安全性，这样第三方代码就不能在相同的环境里窥视其他代码了。
     // 严格模式还有一个限制:不能为函数的 caller 属性赋值，否则会导致错误。
} 
 outer();
```

### 箭头函数(Arrow Function)

> 详见: [http://es6.ruanyifeng.com/?search=%E7%AE%AD%E5%A4%B4&x=0&y=0#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0](http://es6.ruanyifeng.com/?search=%E7%AE%AD%E5%A4%B4&x=0&y=0#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)

ES6 允许使用“箭头”（=>）定义函数。
```js
let a = t => t;
// 等同于
let a = function(t) {
  return t;
}
// 返回是一个对象时
let b = (t) => ({t});
// 函数多个参数，函数体内有多条表达式时
let c = (t1, t2) => {
    let res = t1 + t2;
    return res;
}
```

#### 箭头函数与普通函数的区别

1. 箭头函数默认绑定`this`,即箭头函数内的`this`永远指向箭头函数定义时的上下文

2. 不可以当作构造函数,不可以使用new命令，否则会抛出一个错误

```js
let t = (a) => {
    this.a = a;
}
Object.getOwnPropertyNames(t) // ["length", "name"]

function tt () {}
Object.getOwnPropertyNames(tt) // ["length", "name", "arguments", "caller", "prototype"]

// 对比可知箭头函数没有prototype属性，而new操作符的执行过程中这个prototype是必须的
```

3. 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

```js
// 同上，箭头函数没有arguments对象
let t = (...args) => {
    console.log(args);
}
```
