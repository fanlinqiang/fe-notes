### [replace](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
#### 语法
`str.replace(substr|regexp, newSubStr|function)`
> 不改变调用它的字符串本身，而只是返回一个新的替换后的字符串。

#### 参数
* `regexp (pattern)` 一个RegExp 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。
* `substr (pattern)`一个将被 newSubStr 替换的 字符串。其被视为一整个字符串，而不是一个正则表达式。仅第一个匹配项会被替换。
* `newSubStr (replacement)`用于替换掉第一个参数在原字符串中的匹配部分的字符串。该字符串中可以内插一些特殊的变量名。
* `function (replacement)`一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果.

#### 使用字符串作为参数
替换字符串可以插入下面的特殊变量名：

|变量名|代表的值|
|-----|-------|
|`$$`|	插入一个 "$"。|
|`$&`|	插入匹配的子串。|
|$`|	插入当前匹配的子串左边的内容。|
|`$'`|	插入当前匹配的子串右边的内容。|
|`$n`|假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串。提示：索引是从1开始|

```js
let a = 'L2R';
a.replace('2', '$$'); // "L$R"
a.replace('2', '$&$&'); // "L22R"
a.replace('2', '$`33'); // "LL33R"
a.replace('2', "$'33"); // "LR33R"

var str = "John Smith";
str.replace(/(\w+)\s(\w+)/, "$2, $1"); // Smith, John
```

#### 指定一个函数作为参数
可以指定一个函数作为第二个参数。在这种情况下，当匹配执行后，该函数就会执行。 函数的返回值作为替换字符串。 (注意：上面提到的特殊替换参数在这里不能被使用。) 另外要注意的是，如果第一个参数是正则表达式，并且其为全局匹配模式，那么这个方法将被多次调用，每次匹配都会被调用。
下面是该函数的参数：

|变量名	|代表的值|
|:-----|:-------|
|match|	匹配的子串。（对应于上述的$&。）|
|p1,p2, ...|假如replace()方法的第一个参数是一个RegExp 对象，则代表第n个括号匹配的字符串。（对应于上述的$1，$2等。）例如，如果是用 /(\a+)(\b+)/ 这个来匹配，p1 就是匹配的 \a+，p2 就是匹配的 \b+。|
|offset	|匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是 'abcd'，匹配到的子字符串是 'bc'，那么这个参数将会是 1）|
|string	|被匹配的原字符串。NamedCaptureGroup	命名捕获组匹配的对象|

```js
"2017&08@08".replace(/(\d+)(\D)/g, function(matched, p1, p2, offset, string){
    console.log({matched, p1, p2, offset, string});
    /**
    * {matched: "2017&", p1: "2017", p2: "&", offset: 0, string: "2017&08@08"}
    *  {matched: "08@", p1: "08", p2: "@", offset: 5, string: "2017&08@08"}
    */
    return p1 + "-"; // "2017-08-08"
})
```

