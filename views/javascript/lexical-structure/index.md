### 大小写敏感
JavaScript是区分大小写的语言。即，关键字、变量、函数名和所有的标识符号(identifier)都必须采取一致的大小写形式.
### 注释
```js
// 单行注释
/* 一段注释 */ // 另一段注释
/*
* 多行注释
*
*/
```
### 标识符、关键字和保留字
标识符即名字。在JavaScript中，标识符用来对变量和函数进行命名，或者用作某些循环语句中的跳转位置的标记、函数的参数。

!>标识符必须是数字、字母、下划线(_)或美元符($)组成，且数字不能作为开始，以便Javascript可以轻易区分标识符和数字。
标识符中的字母也可以包含扩展的 ASCII 或 Unicode 字母字符(如 À 和 Æ)，例如：`let a我 = 2`也是可以正常使用的，但我们不推荐这样做。

JavaScript把一些标识符拿出来用作自己的关键字。因此，就不能再在程序中把这些关键字用作标识符。
关键字：
```
break     delete    function    return    typeof
case      do        if          switch    var
catch     else      in          this      void
continue  false     instanceof  throw     while
debugger  finally   new         true      with
default   for       null        try
```
JavaScript同样保留了一些关键字，这些关键字在当前的语言版本中并没有使用，但在未来版本中可能会用到。
```
abstract              delete               goto                   null	            throws
as                    do                   if		             package	         transient
boolean               double               implements             private             true
break                 else                 import                 protected           try
byte                  enum                 in                     public              typeof
case                  export               instanceof             return              use
catch                 extends              int                    short               var
char                  false                interface              static              void
class                 final                is                     super               volatile
continue              finally              long                   switch              while
const                 float                namespace              synchronized        with
debugger              for                  native                 this
default               function             new                    throw
```
另外，JS中内置了很多全局变量和函数，应当避免吧他们的名字用作变量名和函数名
```
arguments             Error             Math            String
Array                 eval              NaN             super
Boolean               EvalError         Number          synchronized
Date                  Function          Object          throws
decodeURI             Infinity          parseFloat      transient
decodeURIComponent    isFinite          parseInt        volatile
encodeURI             isNaN             RangeError
encodeURIComponent    JSON              regExp
```
### 分隔符
JavaScript使用分号作为分隔符。通常情况下，缺少分隔符，上一条语句的结束就成了下一条语句的开始；使用换行来作为分隔时
JavaScript会尝试合并解析，在无法正确解析代码时则在上一条语句后填补分号；
```js
// demo 1
var a
a
=
1
console.log(a)

// JavaScript 无法解析代码`var a a`因此自动加了`;`,结果为
var a;a=1;console.log(a);

// demo 2
var a = 1, b = 2, f = 2
var c = a + f
(a + b).toString()

// 解析结果 Uncaught TypeError: f is not a function
var a = 1, b = 2, f = 2; var c = a + f(a + b).toString();

// demo 3
return
true;

// 解析结果
return; true;

// demo 4
x
++
y

// 解析结果
x; ++y;
```
如果一条语句以`(`、`[`、`/`、`+`或`-`开始，极有可能和前一条语句合在一起解析。因此很多库、框架或者平时代码中都喜欢保守的在开始语句前加一个分号。另外，有两种特殊的情况：
* 几个特殊的语句（`return`、`break`、`continue`） ，与随后的表达式之间不能换行，反之则只有在及特殊的情况下才不会报错，而且程序的调试非常不方便;
* 在涉及`++`和`--`运算符时，因其可作为表达式前缀，也可以作为表达式后缀，JavaScript解析时会优先与下一行代码合并解析

### 严格模式

ECMAScript 5 引入了严格模式(strict mode)的概念。严格模式是为 JavaScript 定义了一种不同的 解析与执行模型。在严格模式下，ECMAScript 3 中的一些不确定的行为将得到处理，而且对某些不安全 的操作也会抛出错误。要在整个脚本中启用严格模式，可以在顶部添加如下代码:
```
"use strict";
```

!> 严格模式下，JavaScript 的执行结果会有很大不同
