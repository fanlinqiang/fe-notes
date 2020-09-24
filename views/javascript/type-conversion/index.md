JavaScript会根据需要，自行转换类型

值|字符串|数字|布尔值|对象
:--:|:---:|:-:|:---:|:--:
undefined|"undefined"|NaN|false|throw TypeError
null|"null"|0|false|throw TypeError
true|"true"|1||new Boolean(true)
false|"false"|0||new Boolean(false)
""(空串)||0|false|new String("")
"2.3"||2.3|true|new String("2.3")
"test"||NaN|true|new String("test")
0|"0"||false|new Number(0)
-0|"0"||false|new Number(-0)
NaN|"NaN"||false|new Number(NaN)
Infinity|"Infinity"||true|new Number(Infinity)
-Infinity|"-Infinity"||true|new Number(-Infinity)
1|"1"||true|new Number(1)
{}|见下方对象转化为原始值|见下方对象转化为原始值|true|
[]|""|0|true|
[1]|"1"|1|true|
['a']|使用join()方法|NaN|true|
function(){}||NaN|true|

* 除了`null`和`undefined`之外任何值都有`toString()`方法，这个方法的执行结果通常和`String()`方法一致
* 所有的对象(包括数组和函数)进行`bool`转换时都转换为`true`，例：`!!new Boolean(false)`，结果为`true`

### 对象转化为原始值
!> 对象到字符串和对象到数字的转换是通过调用待转换对象的一个方法完成的。Javascript对象有两个不同的方法来执行转换。

所有的对象继承了两个转换方法。
1. 第一个是`toString()`，它的作用是返回一个反映这个对象的字符串。
JavaScript中的本地对象往往定义了自己的`toString()`方法， 如：

类| `toString()`实现方式| 示例
:-:|:----------------:|:-:
普通对象|返回类型|`({a:1}).toString()` ==> `"[object Object]"`
数组类(Array class)|将每个数组元素转换为一个字符串，并用`,`连接|`[1,2,3].toString()` ==> `"1,2,3"`
函数类(Function class)|返回这个函数的实现定义的表示方式，即将用户定义的函数转换为JavaScript源代码字符串|`(function() {console.log(1)}).toString()` ==> `"function() {console.log(1)}"`
日期类(Date class)|返回一个可读的(可被Javascript解析的)日期和时间字符串|`(new Date(2019, 5, 31)).toString` ==> `"Mon Jul 01 2019 00:00:00 GMT+0800 (中国标准时间)"`
RegExp类(RegExp class)|返回表示正则表达式直接量的字符串|`/\d+/g.toString()` ==> `"/\d+/g"`

2. 另一个转换对象的函数是`valueOf()`。这个方法的任务并未详细定义：如果存在任意原始值，它就将默认对象转换为表示它的原始值。对象是复合值，而且大多数对象无法真正表示为一个原始值，因此默认的`valueOf()
`方法简单地返回对象本身，而不是返回一个原始值。

数组、函数和正则表达式简单地继承了这个默认的方法，调用这些类型的实例的`valueOf()`方法只是简单返回对象本身。
日期类定义的`valueOf()`方法会返回它的内部表示：1970年1月1日以来的毫秒数
```js
(new Date(2019, 5, 31)).valueOf() // => 1561910400000
```
### JavaScript中对象到字符串的转换过程
1. 如果对象具有`toString()`方法，则调用这个方法。如果它返回一个原始值，JavaScript将这个值转换为字符串(如果本身不是字符串)，并返回这个字符串结果。
2. 如果对象没有`toString()`方法，或者这个方法并不返回一个原始值，那么Javascript会调用`valueOf()
`方法。如果存在这个方法，则JavaScript调用它。如果返回值是原始值，JavaScript将这个值转换为字符串(如果本身不是字符串)，并返回这个字符串结果。
3. 否则，JavaScript无法从`toString()`或`valueOf()`获得一个原始值，这时他将抛出一个类型错误异常

### JavaScript中对象到数字的转换过程
对象到数字的转换过程与对象到字符串的转换过程类似，只是他会首先尝试使用`valueOf()`方法：
1. 如果对象具有`valueOf()`方法，若后者返回一个原始值，则JavaScript将这原始值转换为数字(如果需要的话)，并返回这个数字
2. 否则，如果对象具有`toString()`方法，若后者返回一个原始值，则JavaScript将其转换为数字并返回
3. 否则，抛出一个类型错误异常

#### 示例
示例：空数组转换为数字0
```js
+[] // => 0
```
示例：包含一个数字元素的数组转换为数字，结果为这个数字
```js
+[100] // => 100
```
> 解释：数组继承了默认的`valueOf()`方法，这个方法返回一个对象而不是一个原始值，因此继续调用`toString()`方法；空数组转换为空字符串，空串再转换为数字0。同理，包含`100`的数组转换为字符串`"100"`,
再转换为数字`100`

示例：
```js
[] + [] // => '',在这个过程中先调用valueOf()方法，返回的数组的原始值还是一个数组，再调用toString()方法，即为："" + "" =""
[1,2] + 1 // => '1,21', [1,2] 先调用valueOf()，返回的还是数组本身，在调用toString()，返回字符串"1,2"，则 "1,2" + 1 ="1,21"
[1] + 1 // => 2
1 + {a:1} // => "1[object Object]"
{a:1} +1  // => 1, 这是因为js在解释代码时遇到{}会认为是一个代码块（代码区域），{a:1}已经结束的代码块，因此相当于原式=      +1   //  1
new Number(1) == 1 // => true
```
> 二原运算符`+`,如果其中一个操作数是对象，则JavaScript将使用特殊的方法(日期对象先尝试调用`toString()`，再尝试调用`valueOf()`，
只用得到原始值则直接使用，而不会进一步转换为数字或字符串；除日期对象外，则先尝试调用`valueOf()`,然后调用`toString()`,同样的也不会进一步转换为数字或字符串)
将其转换为原始值进行运算；`==`、`!=`及关系运算符与此相似，如果将一个对象同一个原始值比较，则转换遵照对象到原始值的转换方式进行;
示例：

```js
let now = new Date();
now + 1 // "Fri May 31 2019 17:10:20 GMT+0800 (中国标准时间)1"
now - 1 // 1562034278023
now == now.toString() // true
now > (now - 1) // true
```

```js
(!+[]+[]+![]).length // 9
```
```js
(!(~+[]) + {})[--[~+""][+[]] * [~+[]] + ~~!+[]] + ({} + [])[[~!+[]] * ~+[]] // => sb
```
```js
let a = {};
a.toString = () => 2
a.valueOf = () => 3
1 + a // 4
'1' + a // '13'
```

```js
console.log([] + []) // ''
console.log({} + []) // '[object Object]'
console.log([] == ![]) // true
console.log(true + false) // 1, 两个基本类型相加，如果其中一方是字符，则将其他的转换为字符相加，否则将类型转换为Number
```
### JavaScript真值表
![JavaScript真值表](/thomas-yang.me_projects_oh-my-dear-js_.png "JavaScript真值表")
