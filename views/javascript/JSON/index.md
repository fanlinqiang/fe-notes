JSON它是一种数据格式，不是一种编程语言。虽然具有相同的语法形式， 但 JSON 并不从属于 JavaScript。

## 语法
JSON 的语法可以表示以下三种类型的值。
* 简单值:使用与JavaScript 相同的语法，可以在 JSON 中表示字符串、数值、布尔值和 null。但 JSON 不支持 JavaScript 中的特殊值 undefined。

```js
// 下面的值是有效的 JSON 数据:

123

"Hello world!" // JavaScript 字符串与 JSON 字符串的最大区别在于，JSON 字符串必须使用双引号(单引号会导致语 法错误)。
```

* 对象:对象作为一种复杂数据类型，表示的是一组无序的键值对儿。而每个键值对儿中的值可以是简单值，也可以是复杂数据类型的值。

```js
// 与 JavaScript 的对象字面量相比，JSON 对象有两个地方不一样。首先，没有声明变量(JSON 中没有变量的概念)。其次，没有末尾的分号(因为这不是 JavaScript 语句，所以不需要分号)
{
    "name": "xiaoming",
    "age": 18,
    "department": {
        "name": "AOC",
        "_id": "232"
    }
}
```

* 数组:数组也是一种复杂数据类型，表示一组有序的值的列表，可以通过数值索引来访问其中的值。数组的值也可以是任意类型——简单值、对象或数组。

```js
{
    "name": "xiaoming",
    "age": 18,
    "friends": ["tiantian", "huhu", 23] // JSON 数组也没有变量和分号。
}
```

!> JSON 不支持变量、函数或对象实例，它就是一种表示结构化数据的格式，虽然与 JavaScript 中表示数据的某些语法相同，但它并不局限于 JavaScript 的范畴。

### JavaScript 与 JSON 的区别

> [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)

|JavaScript类型|	JSON 的不同点|
|:-|:-|
|对象和数组|属性名称必须是双引号括起来的字符串；最后一个属性后不能有逗号。|
|数值|禁止出现前导零（ JSON.stringify 方法自动忽略前导零，而在 JSON.parse 方法中将会抛出 SyntaxError）；如果有小数点, 则后面至少跟着一位数字。|
|字符串|只有有限的一些字符可能会被转义；禁止某些控制字符； Unicode 行分隔符 （U+2028）和段分隔符 （U+2029）被允许 ; 字符串必须用双引号括起来。请参考下面的示例，可以看到 JSON.parse() 能够正常解析，但将其当作JavaScript解析时会抛出 SyntaxError 错误：```let code = '"\u2028\u2029"';// 正常eval(code);JSON.parse(code);// 错误```|

## JSON对象

早期的 JSON 解析器基本上就是使用 JavaScript 的 eval()函数。由于 JSON 是 JavaScript 语法的子 集，因此 eval()函数可以解析、解释并返回 JavaScript 对象和数组。ECMAScript 5 对解析 JSON 的行 为进行规范，定义了全局对象 JSON。

JSON 对象有两个方法:stringify()和 parse()。在最简单的情况下，这两个方法分别用于把 JavaScript 对象序列化为 JSON 字符串和把 JSON 字符串解析为原生 JavaScript 值。

### JSON.parse()方法
JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。提供可选的reviver函数用以在返回之前对所得到的对象执行变换(操作)。

语法
```js
JSON.parse(text[, reviver]) // 返回给定JSON文本的对象/值。
```
|参数|描述|
|:-|:-|
|text|要被解析成JavaScript值的字符串, 若传入的字符串不符合 JSON 规范，则会抛出 SyntaxError 异常。|
|reviver|可选，转换器, 如果传入该参数(函数)，可以用来修改解析生成的原始值，调用时机在parse函数返回之前。|

#### 第一个参数`text`

```js
JSON.parse('{}');              // {}
JSON.parse('true');            // true
JSON.parse('"foo"');           // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse('null');            // null
JSON.parse('1');               //  1
```

#### 第二个参数`reviver`

> 如果指定了 reviver 函数，则解析出的 JavaScript 值（解析值）会经过一次转换后才将被最终返回（返回值）。更具体点讲就是：解析值本身以及它所包含的所有属性，会按照一定的顺序（从最最里层的属性开始，一级级往外，最终到达顶层，也就是解析值本身）分别的去调用 reviver 函数，在调用过程中，当前属性所属的对象会作为 this 值，当前属性名和属性值会分别作为第一个和第二个参数传入 reviver 中。如果 reviver 返回 undefined，则当前属性会从所属对象中删除，如果返回了其他值，则返回的值会成为当前属性新的属性值。
> 当遍历到最顶层的值（解析值）时，传入 reviver 函数的参数会是空字符串 ""（因为此时已经没有真正的属性）和当前的解析值（有可能已经被修改过了），当前的 this 值会是 {"": 修改过的解析值}，在编写 reviver 函数时，要注意到这个特例。（这个函数的遍历顺序依照：从最内层开始，按照层级顺序，依次向外遍历）

```js
JSON.parse('{"p": 5}', function (k, v) {
    if(k === '') return v;     // 如果到了最顶层，则直接返回属性值，
    return v * 2;              // 否则将属性值变为原来的 2 倍。
});                            // { p: 10 }

JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}', function (k, v) {
    console.log(k); // 输出当前的属性名，从而得知遍历顺序是从内向外的，
                    // 最后一个属性名会是个空字符串。
    return v;       // 返回原始属性值，相当于没有传递 reviver 参数。
});

// 1
// 2
// 4
// 6
// 5
// 3
// ""
```

#### JSON.parse() 不允许用逗号作为结尾

```js
// both will throw a SyntaxError
JSON.parse("[1, 2, 3, 4, ]");
JSON.parse('{"foo" : 1, }');
```

### JSON.stringify方法

语法
```js
JSON.stringify(value[, replacer [, space]]) // 返回一个表示给定值的JSON字符串。
```

|参数|描述|
|:-|:-|
|value|将要序列化成 一个 JSON 字符串的值|
|replacer|可选，如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化；|
|space|可选，指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。|

#### 第一个参数`value`
JSON.stringify() 将值转换为相应的JSON格式规则：
* 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化。
```js
class t {
	constructor (a, b) {
		this.a = a;
        this.b = b;
	}
	toJSON () { // 如果一个被序列化的对象拥有 toJSON 方法，那么该 toJSON 方法就会覆盖该对象默认的序列化行为：不是该对象被序列化，而是调用 toJSON 方法后的返回值会被序列化
		return {
			ab: this.a + this.b
		}
	}
}
JSON.stringify(new t(1, 2)) //'{"ab":3}'
```
* 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
* 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
```js
JSON.stringify([new Number(1), new String("false"), new Boolean(false)]); // '[1,"false",false]'
```
* undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。函数、undefined 被单独转换时，会返回 undefined
```js
JSON.stringify({
	a: undefined,
	b: ()=>{},
	c: Symbol(),
	d: [undefined, ()=>{}, Symbol(), 1],
	e: 2
}) // '{"d":[null,null,null,1],"e":2}''
JSON.stringify(function(){}) // undefined
JSON.stringify(undefined). // undefined
```
* 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
```js
let a = {}, b = {};
a.friend = b;
b.friend = a;
JSON.stringify({a, b}); // VM430:1 Uncaught TypeError: Converting circular structure to JSON
                               --> starting at object with constructor 'Object'
                               |     property 'friend' -> object with constructor 'Object'
                               --- property 'friend' closes the circle
```
* 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
```js
let o = {
    name: 'a'
}
o[Symbol()] = 1;
JSON.stringify(o); // '{"name":"a"}'

JSON.stringify(
    {[Symbol.for("foo")]: "foo"},
    function (k, v) {
        if (typeof k === "symbol"){
            return "a symbol";
        }
    }
); // undefined
```
* Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理。
```js
JSON.stringify(new Date('2018-12-10')) // '"2018-12-10T00:00:00.000Z"'
```
* NaN 和 Infinity 格式的数值及 null 都会被当做 null。
```js
JSON.stringify({
    a: NaN,
    b: Infinity,
    c: -Infinity,
    d: null
}) // '{"a":null,"b":null,"c":null,"d":null}'
```
* 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。
```js
// 不可枚举的属性默认会被忽略：
JSON.stringify(
    Object.create(
        null,
        {
            x: { value: 'x', enumerable: false },
            y: { value: 'y', enumerable: true }
        }
    )
); // "{"y":"y"}"

JSON.stringify({
    a: new Map([[0, 'xiaoming'], [1, 'xiaohong']]),
    b: new Set([1, 1, 23, 3]),
    c: 1
}) // '{"a":{},"b":{},"c":1}'
```

#### 第二个参数`replacer`
replacer 参数可以是一个函数或者一个数组。

1. 若replacer为一个数组
如果 replacer 是一个数组，数组的值代表将被序列化成 JSON 字符串的属性名。
```js
JSON.stringify({
    a: 1,
    b: [1, 2, {a: 2}],
    c: {
        a: 3,
        b: [1, 23, 32],
        c: 4
    }
}, ['a']) // '{"a":1}'，仅是第一层对应的属性名

```

2. 作为函数，它有两个参数，键（key）和值（value），它们都会被序列化。

* 如果返回一个 Number, 转换成相应的字符串作为属性值被添加入 JSON 字符串。
```js
JSON.stringify({
    a: 1,
    b: '2'
}, (key, value) => {
    console.log(value, typeof value);
    if (typeof value === 'string') {
        return new Number(value);
    }
    return value;
})
// { a: 1, b: '2' } 'object'
   1 'number'
   2 string
   '{"a":1,"b":2}'

```
* 如果返回一个 String, 该字符串作为属性值被添加入 JSON 字符串。
* 如果返回一个 Boolean, "true" 或者 "false" 作为属性值被添加入 JSON 字符串。
* 如果返回任何其他对象，该对象递归地序列化成 JSON 字符串，对每个属性调用 replacer 方法。除非该对象是一个函数，这种情况将不会被序列化成 JSON 字符串。
```js
class t {
	constructor (a, b) {
		this.a = a;
        this.b = b;
	}
	toJSON () {
		return {
			ab: '' + this.a + this.b
		}
	}
}
let a = new t(1, 2);
let b = {
    t: new t(5, 6),
    func: () => {}
};
JSON.stringify({
    a,
    b
}) // '{"a":{"ab":"12"},"b":{"t":{"ab":"56"}}}'
```
* 如果返回 undefined，该属性值不会在 JSON 字符串中输出。

!> 注意: 不能用 replacer 方法，从数组中移除值（values），如若返回 undefined 或者一个函数，将会被 null 取代。

#### 第三个参数`space`
space 参数用来控制结果字符串里面的间距。如果是一个数字, 则在字符串化时每一级别会比上一级别缩进多这个数字值的空格（最多10个空格）；如果是一个字符串，则每一级别会比上一级别多缩进该字符串（或该字符串的前10个字符）。
```js
JSON.stringify({a: 1, b: 2}, null, 4) // '{\n    "a": 1,\n    "b": 2\n}'
JSON.stringify({a: 1, b: 2}, null, '--') // '{\n--"a": 1,\n--"b": 2\n}'
// 使用制表符（\t）来缩进
JSON.stringify({a: 1, b: 2}, null, '\t') // '{\n\t"a": 1,\n\t"b": 2\n}'
```

## JSON.stringify用作 JavaScript
注意 JSON 不是 JavaScript 严格意义上的子集，在 JSON 中不需要省略两条终线（Line separator 和 Paragraph separator），但在 JavaScript 中需要被省略。因此，如果 JSON 被用作 JSONP 时，下面方法可以使用：
```js
function jsFriendlyJSONStringify (s) {
    return JSON.stringify(s).
        replace(/\u2028/g, '\\u2028'). //编码为2028的字符为行分隔符，会被浏览器理解为换行，而在Javascript的字符串表达式中是不允许换行
        replace(/\u2029/g, '\\u2029'); // 编码为2028的字符为行段落分隔符
}

var s = {
    a: String.fromCharCode(0x2028),
    b: String.fromCharCode(0x2029)
};
try {
    eval('(' + JSON.stringify(s) + ')');
} catch (e) {
    console.log(e); // "SyntaxError: unterminated string literal"
}

// No need for a catch
eval('(' + jsFriendlyJSONStringify(s) + ')');

// console.log in Firefox unescapes the Unicode if
//   logged to console, so we use alert
alert(jsFriendlyJSONStringify(s)); // {"a":"\u2028","b":"\u2029"}
```


## 参考
> [MDN-JSON.stringify()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
> [MDN-JSON.parse()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

