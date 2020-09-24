## Object类型

> [MDN-Object类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

ECMAScript 中的对象其实就是一组数据和功能的集合。创建对象的方式：

```
let a = new Object()
let b = new Object // 如果不给构造函数传递参数，则可 以省略后面的那一对圆括号。不推荐

let person = { // 字面量表示法
    name: 'xiaoming',
    6: '数值属性名会自动转换为字符串，但仍可直接通过该数值访问到属性值',
    '7': 'test',
    '8a': 'test',
    'is leader': true,
    undefined: 'value undefined'
}
// 访问对象属性值通常有两种方式：obj.attr、obj[attr]
// 方括号语法的主要优点是可以通过变量 来访问属性;如果属性名中包含会导致语法错误的字符，或者属性名使用的是关键字或保留字，也可以使用方括 号表示法。
console.log(person['is leader'], person['undefined']);
console.log(person[6], person['6']);
console.log(person.6) // Uncaught SyntaxError: Unexpected number
console.log(person.7) // Uncaught SyntaxError: Unexpected number
console.log(person.8a) // Uncaught SyntaxError: Invalid or unexpected token, javascript中使用数字或已数字开头的字符串作为属性值时只能使用`[attr]`的方式获取属性值
```

在 ECMAScript 中， (就像 Java 中的 java.lang.Object 对象一样)Object 类型是所有它的实例的基础。换句话说，
Object 类型所具有的任何属性和方法也同样存在于更具体的对象中。Object 的每个实例都具有下列属性和方法。

```
constructor:保存着用于创建当前对象的函数。对于前面的例子而言，构造函数(constructor) 8 就是 Object()。
hasOwnProperty(propertyName):用于检查给定的属性在当前对象实例中(而不是在实例 的原型中)是否存在。其中，作为参数的属性名(propertyName)必须以字符串形式指定(例 如:o.hasOwnProperty("name"))。
isPrototypeOf(object):用于检查传入的对象是否是传入对象的原型(第 5 章将讨论原 型)。
propertyIsEnumerable(propertyName):用于检查给定的属性是否能够使用 for-in 语句 (本章后面将会讨论)来枚举。与 hasOwnProperty()方法一样，作为参数的属性名必须以字符
串形式指定。
toLocaleString():返回对象的字符串表示，该字符串与执行环境的地区对应。
toString():返回对象的字符串表示。
valueOf():返回对象的字符串、数值或布尔值表示。通常与 toString()方法的返回值相同。
```

