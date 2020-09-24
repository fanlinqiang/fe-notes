## Array类型
ECMAScript 数组的每一项可以保存任何类型的数据。而且，ECMAScript 数组的大小是可以动态调整的，即可以随着数据的添加自动增长以容 纳新增数据。
### 数组的创建

```js
// 一、构造函数方式
new Array() // 创建一个空数组, 即：[]
// 传入一个参数且为一个>=0的整数时，例： 
new Array(2) // 创建一个长度为2的，空数组,即[undefined, undefined]
// 传入一个参数且其值为负数或非整数时
new Array(-1) // Uncaught RangeError: Invalid array length
new Array(2.3) // Uncaught RangeError: Invalid array length
// 传入一个参数且为非数值时
new Array('blue') // ['blue']
// 当传入参数的个数大于1时，例：[1, 2]
new Array(1, 2) 
// 在使用 Array 构造函数时也可以省略 new 操作符
let a2 = Array()
// 二、字面量方式
let a = []
let b = [1, 2, 3]
let c = [1, 2, ] // IE8及之前会生成[1, 2, undefined],其他浏览器中[1, 2]
```

因为IE8之前，这样的表达式：`[1,]`会被解析成`[1, undefined]`,因此我们有了检验是否式IE8及以下的浏览器的方法
```js
if (+[1,] !== 1) {
    return '浏览器版本<=ie8'
}
```

数组的索引时从`0`开始的，数组的长度`length`始终等于最后一个索引+1，数组的 length 属性很有特点——它不是只读的。因此，通过设置这个属性，可以从数组的末尾移 除项或向数组中添加新项。
```js
let a = [1, 2]
a.length = 0
console.log(a) // []

let b = [1, 2]
b.length = 3
console.log(b) // [1, 2, undefined]

let c = [1, 2]
c.length = 1
console.log(c) // [1]

let d = [1, 2]
d[5] = 3;
console.log(d, d.length) // [1, 2, undefined, undefined, undefined, 3], 6
```

!> 检测一个值是否是数组，ES5中新增 `Array.isArray()`方法来进行判断

### 转换方法

```js
let a = [1, 2, 3]
a.toString() // 每一项调用自身的toString方法后，用,拼接成的字符串
a.valueOf() // 返回的数组本身，[1, 2, 3]
a.toLocaleString() // 每一项调用自身的toLocaleString方法后，用,拼接成的字符串
a.join(',') // 每一项调用自身的toString方法后，用传入的字符,拼接成的字符串

class t {
    constructor (name) {
        this.name = name;
    }
    toString () {
        return `^__toString__${this.name}$`;
    }
    toLocaleString () {
        return `^__toLocaleString__${this.name}$`;
    }
}
let test = [new t('t1'), new t('t2')];
console.log(test.toString()); // ^__toString__t1$,^__toString__t2$
console.log(test.toLocaleString()); // ^__toLocaleString__t1$,^__toLocaleString__t2$
console.log(test.join('&&')); // ^__toLocaleString__t1$&&^__toLocaleString__t2$

// 如果数组中的某一项的值是 null 或者 undefined，那么该值在 join()、 toLocaleString()、toString()和 valueOf()方法返回的结果中以空字符串表示。
let test2 = [null, 123, undefined]
test2.toString() // ",123,"
test2.valueOf() // [null, 123, undefined]
test2.toLocaleString() // ",123,"
test2.join(',') //",123,"
```

### 数组与伪数组

把符合以下条件的对象称为伪数组：
* 具有length属性
* 按索引方式存储数据
* 不具有数组的push,pop等方法

伪数组（类数组）：无法直接调用数组方法或期望length属性有什么特殊的行为，不具有数组的push,pop等方法，但仍可以用数组遍历方法来遍历它们。典型的是函数的`argument`参数，还有像调用`document.getElementsByTagName`, `document.childNodes`之类的,它们返回的`NodeList`对象都属于伪数组。

可以使用以下方法将伪数组转化为真正的Array对象。

#### Array.prototype.slice

```js
function  makeArray (c) {
    try{
        return Array.prototype.slice.call(c);
    }catch(e){
        var ret = [],i, len = c.length;
        for(i = 0; i < len; i++) {
            ret[i] = (c[i]);
        }
        return ret;
    }
}
```
#### ES6中数组的新方法 `Array.from()`
```js
function test(){
    var arg = Array.from(arguments);
    arg.push(5);
    console.log(arg);
}
test(1,2,3,4); //1,2,3,4,5
```

#### ES6展开操作符

es6中，展开操作符对于实现了 Iterator 接口的对象转为真正的数组
任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组。
```js
let nodeList = document.querySelectorAll('div');
let array = [...nodeList];
```
上面代码中，querySelectorAll方法返回的是一个nodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了 Iterator 。
对于那些没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。
```js
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];
```
上面代码中，arrayLike是一个类似数组的对象，但是没有部署 `Iterator` 接口，扩展运算符就会报错。这时，可以改为使用`Array.from`方法将`arrayLike`转为真正的数组。

#### concat+apply

```js
let nodeList = document.querySelectorAll('div');
let nodeArray = Array.prototype.concat.apply([], nodeList); // apply会将nodeList展开
```

#### jquery中的，`jQuery.toArray()`方法
```js
alert($('li').toArray());
```
`jquery`中，`jQuery.makeArray(obj)`
将类数组对象转换为数组对象。
类数组对象有 length 属性，其成员索引为 0 至 length - 1。实际中此函数在 jQuery 中将自动使用而无需特意转换。
```js
var arr = jQuery.makeArray(document.getElementsByTagName("div"));
```

### 数组使用技巧

#### 数组去重
```js
let arr = [1, 2, 3, 2, 1, 3];
// 一
Array.from(new Set(arr));
// 二
[... new Set(arr)]
```

#### `Array.from`达到`map`效果
```js
let arr = [1, 2, 3, 2, 1, 3];
Array.from(arr, (i) => i + 1);
```

#### 清空数组
```js
let arr = [1, 2, 3, 2, 1, 3];
arr.length = 0;
```

#### 将数组转换为对象
```js
let arr = [1, 2, 3, 2, 1, 3];
let obj = {...arr}; // {0: 1, 1: 2, 2: 3, 3: 2, 4: 1, 5: 3}
```

#### 填充数组
```js
let arr = (new Array(8)).fill(0);
```

#### 中断forEach循环

在forEach方法对数组的每个元素执行一次提供的函数，用return不会返回，函数会继续执行。
中断方法：
1. 使用try监视代码块，在需要中断的地方抛出异常。

```js
let arr = [1, 2, 3];


try {
    arr.forEach((item) => {
        if (item === 2) {
            throw new Error(`break-${item}`);
        }
        console.log(item);
    })
} catch (e) {
    // console.log(e)     
}
```

2. 官方推荐方法（替换方法）：用every和some替代forEach函数。every在碰到return false的时候，中止循环。some在碰到return true的时候，中止循环


