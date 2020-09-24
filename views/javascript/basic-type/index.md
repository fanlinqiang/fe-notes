## 数值（Number）
JavaScript不区分整数和浮点数，所有数字都用浮点数表示。
* 能够表示最大值是 -2<sup>53</sup> ~ 2<sup>53</sup>,包含边界。超过范围的数无法保证低位数字的精度。
* JavaScript能直接识别十进制的整型直接量和十六进制值(以`0x`或`0X`为前缀,由`0~9`和`a(A)~f(F)`构成，如：`0xff`,即`15 * 16 + 15 = 255`)。ECMAScript标准不支持八进制直接量。
* 浮点数直接量表达式：`[digits][.digits][(E|e)(+|-)digits]`,如：`3.12E12` => 3.12<sup>12</sup>, 浮点数值的最高精度是 17 位小数
* 算数运算符：加`+`、减`-`、乘`*`、除`/`、取余`%`
* JavaScript中算数运算在溢出、下溢(无限接近于零并比JavaScript能表示的最小值还小的数，JavaScript将会返回0)或被零整除时不会报错(返回正(或负)无穷，例外：零除以零，结果是一个非数字，用`NaN`表示)。溢出时，结果为无穷大(`Infinity`)值；下溢结果为负无穷(`-Infinity`)。基于无穷大的加减乘除运算结果还是无穷大(保留正负号)。
* `NaN`表示非数字值，它和任何值都不相等，包括自身。判断一个值是否为NaN：`x != x`,当切只当x为`NaN`时，表达式为true。
> 函数`isNaN()`,如果参数为`NaN`或者非数字则返回`true`；函数`isFinite()`,在参数不是`NaN`、`Infinity`、`-Infinity`的时候返回`true`。
* JavaScript采用了IEEE-754浮点数表示法（几乎所有现代编程语言所采用），这是一种二进制表示法，可以精确的表示分数，如：1/2、1/8和1/1024。但在现实生活中通常用十进制分数，1/10、1/100等。二进制表达式具有足够的精度，但并不能精确的表示类似0.1这样的简单数字。要避免这些舍入问题(特别时金融领域)，尽量使用大整数进行计算，例如:乘以相同的倍数，结果再除以相同倍数
```js
var x = .3 - .2;
var y = .2 - .1;
x == y // false
x == .1 //false
y == .1 // true
// 由于舍入误差，0.3与0.2的近似差值并不等于0.2与0.1的近似差值
var a = (.3 * 10 - .2 * 10) / 10
var b = (.2 * 10 - .1 * 10) / 10
a == b // true
a == .1 // true
b == .1 // true
```
除了以十进制表示外，整数还可以通过八进制(以 8 为基数)或十六进制(以 16 为基数)的字面值 来表示。其中，八进制字面值的第一位必须是零(0)，然后是八进制数字序列(0~7)。如果字面值中的 数值超出了范围，那么前导零将被忽略，后面的数值将被当作十进制数值解析。
```
var octalNum1 = 070; // 八进制的 56
var octalNum2 = 079; // 无效的八进制数值——解析为 79
var octalNum3 = 08;  // 无效的八进制数值——解析为 8
```

!> 八进制字面量在严格模式下是无效的，会导致支持的 JavaScript 引擎抛出错误。

十六进制字面值的前两位必须是 0x，后跟任何十六进制数字(0~9 及 A~F)。其中，字母 A~F 可以大写，也可以小写。如下面的例子所示:
```
var hexNum1 = 0xA; // 十六进制的 10
var hexNum2 = 0x1f; // 十六进制的 31
```
在进行算术计算时，所有以八进制和十六进制表示的数值最终都将被转换成十进制数值。

#### NaN
NaN，即非数值(Not a Number)是一个特殊的数值，这个数值用于表示一个本来要返回数值的操作数，未返回数值的情况。其有两个特点：
1. 任何涉及 NaN 的操作(例如 NaN/10)都会返回 NaN
2. NaN 与任何值都不相等，包括 NaN 本身

ECMAScript 定义了 isNaN()函数。其会尝试 将接收到的值转换为数值，若能转为数值则返回false，否则返回true。
```
alert(isNaN(NaN)); //true
alert(isNaN(10)); //false(10 是一个数值)
alert(isNaN("10"));  //false(可以被转换成数值 10)
alert(isNaN("blue")); //true(不能转换成数值)
alert(isNaN(true)); //false(可以被转换成数值 1)
```

#### 数值转换
有 3 个函数可以把非数值转换为数值:Number()、parseInt()和 parseFloat()。

#### Number()


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

!> 一元加操作符的操作与 Number()函数相同。

#### parseInt()

parseInt()函数在转换字符串时，更多的是看其是否符合数值模式。它会忽略字 符串前面的空格，直至找到第一个非空格字符。如果第一个字符不是数字字符或者负号，parseInt() 就会返回 NaN;也就是说，用 parseInt()转换空字符串会返回 NaN(Number()对空字符返回 0)。如 果第一个字符是数字字符，parseInt()会继续解析第二个字符，直到解析完所有后续字符或者遇到了 一个非数字字符。
如果字符串中的第一个字符是数字字符，parseInt()也能够识别出各种整数格式(即前面讨论的 十进制、八进制和十六进制数)。也就是说，如果字符串以"0x"开头且后跟数字字符，就会将其当作一 5 个十六进制整数;如果字符串以"0"开头且后跟数字字符，则会将其当作一个八进制数来解析。
```
var num1 = parseInt("1234blue"); // 1234
var num2 = parseInt(""); // NaN
var num3 = parseInt("0xA"); // 10(十六进制数)
var num4 = parseInt(22.5); // 22
var num5 = parseInt("070"); // 56(八进制数)
var num6 = parseInt("70"); // 70(十进制数)
var num7 = parseInt("0xf"); // 15(十六进制数
```

!> ECMAScript 5 中，即使是在非严格 模式下parseInt()已经不具有解析八进制值的能力,为此转换时可以提供第二个参数--使用的基数(即多少进制)。

```
var mum8 = parseInt("0xAF", 16); // 175
// 或
var mum9 = parseInt("AF", 16); // 175
var num10 = parseInt("070", 6); // 0
```

#### parseFloat()
parseFloat()也是从第一个字符(位置 0)开始解析每个字符。而且 也是一直解析到字符串末尾，或者解析到遇见一个无效的浮点数字字符为止。需要注意的点：
1. 字符串中的第一个小数点是有效的,而第二个小数点就是无效的了，因此它后面的字符串将被忽略。举例来说， "22.34.5"将会被转换为 22.34。
2. 始终都会忽略前导 的零。parseFloat()可以识别前面讨论过的所有浮点数值格式，也包括十进制整数格式。但十六进制格 式的字符串则始终会被转换成 0。由于 parseFloat()只解析十进制值，因此它没有用第二个参数指定基 数的用法。
3. 如果字符串包含的是一个可解析为整数的数(没有小数点，或者小数点后 都是零)，parseFloat()会返回整数。

```
var num1 = parseFloat("1234blue");  //1234(整数)
var num2 = parseFloat("0xA");   //0
var num3 = parseFloat("22.5"); //22.5
var num4 = parseFloat("22.34.5"); //22.34
var num5 = parseFloat("0908.5"); //908.5
var num6 = parseFloat("3.125e7"); //31250000
```

## 字符串（String）
JavaScript的字符直接量，是由单引号或双引号括起来的字符序列。ECMAScript 中的字符串是不可变的，也就是说，字符串一旦创建，它们的值就不能改变。要改变 某个变量保存的字符串，首先要销毁原来的字符串，然后再用另一个包含新值的字符串填充该变量
* ES3中，字符串直接量必须写在一行中；ES5可以拆分数行，行间必须以反斜线(`\`)分割
```js
var a = "nice\
 to\
 meet\
 you";
console.log(a); // nice to meet you
```
* 转义字符`\`,避免常规的字符串解析,转义符号。

!> 如果`\`字符位于没有在下表中的字符前，则忽略`\`

代码|输出
--|:--:
`\o`|NUL字符
`\'`|单引号
`\"`|双引号
`\&`|和号
`\\`|反斜杠
`\n`|换行符
`\r`|回车符
`\t`|水平制表符
`\v`|垂直制表符
`\b`|退格符
`\f`|换页符
`\xXX`|由两位十六进制数XX指定的Latin-1字符
`\uXXXX`|由4位十六进制数XXXX指定的Unicode字符


```js
var a = 'you\'re right' // you're right

```

#### 转换为字符串
要把一个值转换为一个字符串有两种方式：

1. 第一种是使用几乎每个值都有的 toString()方法

!> 除`null`、`undefined`无toString方法外(调用toString方法会报错)，几乎所有的js对象、变量都支持toString方法

特别的，数值在调用toString方法时可以传递一个参数：输出数值的基数)。默认情况下toString方法以十进制格式返回字符串标识，传递基数可以输出任意有效进制格式的字符串值。

```
var num = 10;
alert(num.toString()); // "10"
alert(num.toString(2)); // "1010"
alert(num.toString(8)); // "12"
alert(num.toString(10)); // "10"
alert(num.toString(16)); // "a"
```

在不知道要转换的值是不是 null 或 undefined 的情况下，还可以使用转型函数 String()，这个 函数能够将任何类型的值转换为字符串。String()函数遵循下列转换规则:
```
如果值有 toString()方法，则调用该方法(没有参数)并返回相应的结果;
如果值是 null，则返回"null";
如果值是 undefined，则返回"undefined"。
```

```
// 数值和布尔值的转换结果与调用 toString()方法得到的结果相同。
String(10) // "10"
String(true) // "true"
// null 和 undefined 没有 toString()方法，所以 String() 函数就返回了这两个值的字面量。
String(undefined) // "undefined"
String(null) // "null"
let a = "test", b;
a + b = "testundefined"
```

!> tips: 将某个值转为字符串，可以使用加号操作符，即将其与一个空串('')加在一起


#### 字符串方法

> 详见[MDN字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String ':target=_blank')

!> 在JavaScript中字符串时固定不变的，类似`replace()`和`toUpperCase()`的方法都返回新字符串，原字符串本身并没有发生改变

在ES5中，字符串可以当作只读数组，除了使用charAt()方法，也可以使用方括号来访问字符串中的单个字符（16位值）：
```js
s = "hello"
s[0] // => 'h'
s[s.length - 1] // => o
```

## 布尔值
布尔值指代真或假、开或关、是或否。这个类型只有两个值，保留字true和false。
任意的Javascript的值都可以转换位布尔值，下面这些值或被转换成false：
```js
false
undefined
null
0
-0
NaN
"" //空字符串
```
其他所有值，包括所有对象(数组)都会转换成true。JavaScript期望使用一个布尔值时，会将自动转换

#### 布尔运算符

```js
&& // 与
|| // 或
! // 非
```
## `undefined`

Undefined 类型只有一个值，即特殊的 undefined。在使用 var 声明变量但未对其加以初始化时，这个变量的值就是 undefined，例如:
```
    var message; // 这个变量声明之后默认取得了 undefined 值
    // 下面这个变量并没有声明
     // var age
    alert(message);
    alert(age);
    // "undefined" // 产生错误
```

由于 `undefined` 并不是 `JavaScript` 的关键字，所以我们在赋值某个变量为 undefined 时可能会有点意想不到的结果。

```js
function t(){
    var undefined = 10;
    console.log(undefined);
}
t(); // 大多数浏览器下都是10
```

如上代码我们可能希望赋值为 undefined，但却得到了 10 这个莫名其妙的情况。所以我们可以使用使用 `void` 替换 `undefined`。void 运算符对给定的表达式进行求值，然后返回 undefined。

## `null`

Null 类型类型只有一个值，即特殊的 null,从逻辑角度来看，null 值表 示一个空对象指针，而这也正是使用 typeof 操作符检测 null 值时会返回"object"的原因。早期的js只有null，第 3 版引入undefined是为了正式区分空对象指针与未经初始化的变量。

特殊的：
```
null == undefined // true，undefined 值是派生自 null 值的，因此 ECMA-262 规定对它们的相等性测试要返回 true，这其中 == 做了隐式转换

null === undefined // false
```

## symbol

> 详见： [symbol](https://es6.ruanyifeng.com/#docs/symbol)

ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。Symbol 值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

```
let s = Symbol();
typeof s; // symbol

// Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
let s1 = Symbol('foo');
let s2 = Symbol('bar');
let s3 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"

s2 === s3; // false,Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。

// 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
sym // Symbol(abc)
```

!> 注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

Symbol 值不能与其他类型的值进行运算，会报错。

```
let sym = Symbol('My symbol');

"your symbol is " + sym
// TypeError: can't convert symbol to string
`your symbol is ${sym}`
// TypeError: can't convert symbol to string
```

但是，Symbol 值可以显式转为字符串。

```
let sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
```

另外，Symbol 值也可以转为布尔值，但是不能转为数值。
```
let sym = Symbol();
Boolean(sym) // true
!sym  // false

if (sym) {
  // ...
}

Number(sym) // TypeError
sym + 2 // TypeError
```

## BigInt

> 详见：[JS最新基本数据类型:BigInt](https://segmentfault.com/a/1190000019912017?utm_source=tag-newest)

BigInt数据类型的目的是比Number数据类型支持的范围更大的整数值。在对大整数执行数学运算时，以任意精度表示整数的能力尤为重要。使用BigInt，整数溢出将不再是问题。

创建BigInt，只需在整数的末尾追加n即可。比较:
```
console.log(9007199254740995n);    // → 9007199254740995n
console.log(9007199254740995);     // → 9007199254740996
```
或者，可以调用BigInt()构造函数
```
BigInt("9007199254740995");    // → 9007199254740995n
```
BigInt文字也可以用二进制、八进制或十六进制表示
```
// binary
console.log(0b100000000000000000000000000000000000000000000000000011n);
// → 9007199254740995n

// hex
console.log(0x20000000000003n);
// → 9007199254740995n

// octal
console.log(0o400000000000000003n);
// → 9007199254740995n

// note that legacy octal syntax is not supported
console.log(0400000000000000003n);
// → SyntaxError
```

请记住，不能使用严格相等运算符将BigInt与常规数字进行比较，因为它们的类型不同：
```
console.log(10n === 10);    // → false

console.log(typeof 10n);    // → bigint
console.log(typeof 10);     // → number
```
相反，可以使用等号运算符，它在处理操作数之前执行隐式类型转换
```
console.log(10n == 10);    // → true
除一元加号(+)运算符外，所有算术运算符都可用于BigInt

10n + 20n;    // → 30n
10n - 20n;    // → -10n
+10n;         // → TypeError: Cannot convert a BigInt value to a number
-10n;         // → -10n
10n * 20n;    // → 200n
20n / 10n;    // → 2n
23n % 10n;    // → 3n
10n ** 3n;    // → 1000n

const x = 10n;
++x;          // → 11n
--x;          // → 9n
```
不支持一元加号（+）运算符的原因是某些程序可能依赖于+始终生成Number的不变量，或者抛出异常。 更改+的行为也会破坏asm.js代码。

当然，与BigInt操作数一起使用时，算术运算符应该返回BigInt值。因此，除法(/)运算符的结果会自动向下舍入到最接近的整数。例如:
```
25 / 10;      // → 2.5
25n / 10n;    // → 2n
```

### 隐式类型转换

因为隐式类型转换可能丢失信息，所以不允许在bigint和 Number 之间进行混合操作。当混合使用大整数和浮点数时，结果值可能无法由BigInt或Number精确表示。思考下面的例子：
```
(9007199254740992n + 1n) + 0.5
```
这个表达式的结果超出了BigInt和Number的范围。小数部分的Number不能精确地转换为BigInt。大于2^53的BigInt不能准确地转换为数字。

由于这个限制，不可能对混合使用Number和BigInt操作数执行算术操作。还不能将BigInt传递给Web api和内置的 JS 函数，这些函数需要一个 Number 类型的数字。尝试这样做会报TypeError错误
```
10 + 10n;    // → TypeError
Math.max(2n, 4n, 6n);    // → TypeError
```
请注意，关系运算符不遵循此规则，如下例所示：
```
10n > 5;    // → true
```
如果希望使用BigInt和Number执行算术计算，首先需要确定应该在哪个类型中执行该操作。为此，只需通过调用Number()或BigInt()来转换操作数：
```
BigInt(10) + 10n;    // → 20n
// or
10 + Number(10n);    // → 20
```
当 Boolean 类型与BigInt 类型相遇时，BigInt的处理方式与Number类似，换句话说，只要不是0n，BigInt就被视为truthy的值：
```
if (5n) {
    // 这里代码块将被执行
}

if (0n) {
    // 这里代码块不会执行
}
```
排序BigInts和Numbers数组时，不会发生隐式类型转换：
```
const arr = [3n, 4, 2, 1n, 0, -1n];
arr.sort();    // → [-1n, 0, 1n, 2, 3n, 4]
```
位操作符如|、&、<<、>>和^对Bigint的操作方式与Number类似。下面是一些例子
```
90 | 115;      // → 123
90n | 115n;    // → 123n
90n | 115;     // → TypeError
```

### BigInt构造函数

与其他基本类型一样，可以使用构造函数创建BigInt。传递给BigInt()的参数将自动转换为BigInt:
```
BigInt("10");    // → 10n
BigInt(10);      // → 10n
BigInt(true);    // → 1n
```
无法转换的数据类型和值会引发异常:
```
BigInt(10.2);     // → RangeError
BigInt(null);     // → TypeError
BigInt("abc");    // → SyntaxError
```
可以直接对使用构造函数创建的BigInt执行算术操作
```
BigInt(10) * 10n;    // → 100n
```
使用严格相等运算符的操作数时，使用构造函数创建的Bigint与常规Bigint的处理方式类似
```
BigInt(true) === 1n;    // → true
```
