## [一元操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators#%E4%B8%80%E5%85%83%E8%BF%90%E7%AE%97%E7%AC%A6)
只能操作一个值的操作符叫做一元操作符。

### typeof
typeof 后直接跟表达式或变量

|返回结果|说明|
|:------|:--|
|"undefined" |如果这个值未定义|
|"boolean" | 如果这个值是布尔值|
|"string" | 如果这个值是字符串|
|"number"| 如果这个值是数值|
|"object"| 如果这个值是对象或 null|
|"function"| 如果这个值是函数。|

!> 有些时候，typeof 操作符会返回一些令人迷惑但技术上却正确的值。比如，调用 typeof null 会返回"object"，因为特殊值 null 被认为是一个空的对象引用。Safari 5 及之前版本、Chrome 7 及之 前版本在对正则表达式调用 typeof 操作符时会返回"function"，而其他浏览器在这种情况下会返回 "object"。

```
var message; // 这个变量声明之后默认取得了 undefined 值 // 下面这个变量并没有声明
 // var age
alert(typeof message); // "undefined"
alert(typeof age); // "undefined"

// 对未初始化和未声明的变量执行 typeof 操作符都返回了 undefined 值
```

### 逻辑非 `！`

### instanceof

### void
void 运算符 对给定的表达式进行求值，然后返回 undefined。
void 运算符通常只用于获取 undefined的原始值，一般使用void(0)（等同于void 0）。在上述情况中，也可以使用全局变量undefined 来代替（假定其仍是默认值）。

可以用来给在使用立即调用的函数表达式（IIFE）时，可以利用 void 运算符让 JS 引擎把一个 function 关键字识别成函数表达式而不是函数声明。
```
function iife() { console.log('foo') }()       // 报错，因为JS引擎把IIFE识别为了函数声明
void function iife() { console.log('foo') }()  // 正常调用
~function iife() { console.log('foo') }()      // 也可以使用一个位操作符
(function iife() { console.log('foo') })()     // 或者干脆用括号括起来表示为整体的表达式
```
还可以用在箭头函数中避免传值泄漏，箭头函数，允许在函数体不使用括号来直接返回值。这个特性给用户带来了很多便利，但有时候也带来了不必要的麻烦，如果右侧调用了一个原本没有返回值的函数，其返回值改变后，会导致非预期的副作用。
```
const func = () => void customMethod()   // 特别是给一个事件或者回调函数传一个函数时
```
安全起见，当不希望函数返回值是除了空值以外其他值，应该使用 void 来确保返回 undefined，这样，当 customMethod 返回值发生改变时，也不会影响箭头函数的行为。

### [delete](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete)
 delete 操作符用于删除对象的某个属性；如果没有指向这个属性的引用，那它最终会被释放。
 语法：
```
delete expression //  expression 的计算结果应该是某个属性的引用，例如：

delete object.property
delete object['property']
```

- 返回值：对于所有情况都是true，除非属性是一个自己不可配置的属性，在这种情况下，非严格模式返回 false。
- 异常：在严格模式下，如果是属性是一个自己不可配置的属性，会抛出`Global_objects/SyntaxError`。

### 一元加（+）

一元加操作符的操作与 Number()函数相同。换句话说，布尔值 false 和 true 将被转换为 0 和 1，字符串值会被按照一组特殊的规则进行解析，而 对象是先调用它们的 valueOf()和(或)toString()方法，再转换得到的值。

```js
var s1 = "01";
var s2 = "1.1";
var s3 = "z";
var b = false;
var f = 1.1;
var o = {
    valueOf: function() {
        return -1;
  }
};
s1 = +s1; // 值变成数值 1
s2 = +s2; // 值变成数值 1.1
s3 = +s3; // 值变成 NaN
b= +b; // 值变成数值 0
f= +f; // 值未变，仍然是 1.1
o= +o; // 值变成数值-1
```

```
如果是 Boolean 值，true 和 false 将分别被转换为 1 和 0。
如果是数字值，只是简单的传入和返回。
如果是 null 值，返回 0。
如果是 undefined，返回 NaN。
如果是字符串，遵循下列规则:
    如果字符串中只包含数字(包括前面带正号或负号的情况)，则将其转换为十进制数值，即"1" 会变成 1，"123"会变成 123，而"011"会变成 11(注意:前导的零被忽略了);
    如果字符串中包含有效的浮点格式，如"1.1"，则将其转换为对应的浮点数值(同样，也会忽 略前导零);
    如果字符串中包含有效的十六进制格式，例如"0xf"，则将其转换为相同大小的十进制整 数值;
    如果字符串是空的(不包含任何字符)，则将其转换为 0;
    如果字符串中包含除上述格式之外的字符，则将其转换为 NaN。
如果是对象，则调用对象的 valueOf()方法，然后依照前面的规则转换返回的值。如果转换的结果是 NaN，则调用对象的 toString()方法，然后再次依照前面的规则转换返回的字符串值。
```

### 递增（++）和递减（--）操作符
递增和递减操作符各有两个版本:前置型和后置型。前置型应该位于要操作的变量之前，而后置型则应该位于要操作的变量之后。

```js
let a = 1;
a ++; // 2, => a = a + 1

let b = 1;
let c = -- b + 2;  // b = 0, c = 2

var num1 = 2;
var num2 = 20;
var num3 = num1-- + num2; // 等于 22
var num4 = num1 + num2; // 等于 21

var s1 = "2";
var s2 = "z";
var b = false;
var f = 1.1;
var o = {
    valueOf: function() {
        return -1;
    }
};
s1++; // 3
s2++; // NaN
b++; // 1
f--; // 0.10000000000000009
o--; // 值变成数值-2
```
在应用于不同的值时，递增和递减操作符遵循下列规则。
```
在应用于一个包含有效数字字符的字符串时，先将其转换为数字值，再执行加减 1 的操作。字 符串变量变成数值变量。
在应用于一个不包含有效数字字符的字符串时，将变量的值设置为 NaN。 字符串变量变成数值变量。
在应用于布尔值 false 时，先将其转换为 0 再执行加减 1 的操作。布尔值变量变成数值变量。
在应用于布尔值 true 时，先将其转换为 1 再执行加减 1 的操作。布尔值变量变成数值变量。
在应用于浮点数值时，执行加减 1 的操作。
在应用于对象时，先调用对象的 valueOf()方法以取得一个可供操作的值。然后对该值应用前述规则。如果结果是 NaN，则在调用 toString()方法后再应用前述规则。对象变量变成数值变量。
```

### 展开运算符...
> [展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

> 展开语法(Spread syntax), 可以在函数调用/数组构造时, 将数组表达式或者`string`在语法层面展开；还可以在构造字面量对象时, 将对象表达式按key-value的方式展开。
（字面量一般指 [1, 2, 3] 或者 {name: "mdn"} 这种简洁的构造方式）

```js
// 构造字面量对象时,进行克隆或者属性拷贝（ECMAScript 2018规范新增特性）：
let t1 = {t: 1}
let t2 = {a: 2}
let t3 = { ...t1, ... t2}; // {t: 1, a: 2}
```
