## CSS变量

> [自定义属性 (--*)：CSS变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*)
> [CSS 变量教程](http://www.ruanyifeng.com/blog/2017/05/css-variables.html)

 CSS 变量（CSS variable）又叫做"CSS 自定义属性"（CSS custom properties）。所有主要浏览器已经都支持了CSS变量(详见：[can i use --*](https://www.caniuse.com/#search=--*))，表现形式为带有前缀--的属性名，比如`--example--name`，表示的是带有值的自定义属性，其可以通过 `var` 函数在全文档范围内复用的。`CSS` 自定义属性是可以级联的：每一个自定义属性可以多次出现，并且变量的值将会借助级联算法和自定义属性值运算出来。


### 变量的声明

```
--somekeyword: left;
--somecolor: #0000ff;
--somecomplexvalue: 3px 6px rgb(20, 32, 54);
```

声明变量的时候，变量名前面要加两根连词线`--`, 变量后这个值将会由一个或者多个语法执行出来，只要这些语法是正确合理的，不包含非法语句。这个值就理应是有效语法执行出来的值。

例如：

```css
:root{
  --main-color: #4d4e53;
  --main-bg: rgb(255, 255, 255);
  --logo-border-color: rebeccapurple;

  --header-height: 68px;
  --content-padding: 10px 20px;

  --base-line-height: 1.428571429;
  --transition-duration: .35s;
  --external-link: "external link";
  --margin-top: calc(2vh + 20px);
}
```

!> 变量名大小写敏感，--header-color和--Header-Color是两个不同变量

### 变量的使用

`var()`函数用于读取变量

语法：

```
proprerty: var(--variable [, default])
```

* 第一个参数用于指定要读取的变量名。
* 第二参数可选，表示变量的默认值。如果该变量不存在，就会使用这个默认值。且不处理内部的逗号或空格，都视作参数的一部分。

```css
color: var(--foo, #7F583F);
var(--font-stack, "Roboto", "Helvetica");
var(--pad, 10px 15px 20px);
```

var()函数还可以用在变量的声明

```css
:root {
  --primary-color: red;
  --logo-text: var(--primary-color);
}
```

注意，变量值只能用作属性值，不能用作属性名。

```css
.foo {
  --side: margin-top;
  /* 无效 */
  var(--side): 20px;
}
```

如果变量值是一个字符串，可以与其他字符串拼接。

```css
--bar: 'hello';
--foo: var(--bar)' world';
```

如果变量值是数值，不能与数值单位直接连用。

```css
.foo {
  --gap: 20;
  /* 无效 */
  margin-top: var(--gap)px;
  /* 须使用calc()函数，将它们连接 */
  margin-top: calc(var(--gap) * 1px);
}
```

如果变量值带有单位，就不能写成字符串。

```css
/* 无效 */
.foo {
  --foo: '20px';
  font-size: var(--foo);
}

/* 有效 */
.foo {
  --foo: 20px;
  font-size: var(--foo);
}
```

### 作用域

同一个 CSS 变量，可以在多个选择器内声明。读取的时候，优先级最高的声明生效。这与 CSS 的"层叠"（cascade）规则是一致的。变量的作用域就是它所在的选择器的有效范围。

```html
<style>
/* 全局的变量通常放在根元素:root里面，确保任何选择器都可以读取它们 */
  :root { --color: blue; }
  div { --color: green; }
  #alert { --color: red; }
  * { color: var(--color); }
</style>

<p>蓝色</p>
<div>绿色</div>
<div id="alert">红色</div>
```

### 响应式布局

CSS 是动态的，页面的任何变化，都会导致采用的规则变化。

利用这个特点，可以在响应式布局的media命令里面声明变量，使得不同的屏幕宽度有不同的变量值。
```css
body {
  --primary: #7F583F;
  --secondary: #F7EFD2;
}

a {
  color: var(--primary);
  text-decoration-color: var(--secondary);
}

@media screen and (min-width: 768px) {
  body {
    --primary:  #F7EFD2;
    --secondary: #7F583F;
  }
}
```

### 兼容性处理

对于不支持 CSS 变量的浏览器，可以采用下面的写法。

```css
a {
  color: #7F583F;
  color: var(--primary);
}
```

也可以使用@support命令进行检测。

```
@supports ( (--a: 0)) {
  /* supported */
}

@supports ( not (--a: 0)) {
  /* not supported */
}
```

### JavaScript 操作

JavaScript 也可以检测浏览器是否支持 CSS 变量。

```js
const isSupported =
  window.CSS &&
  window.CSS.supports &&
  window.CSS.supports('--a', 0);

if (isSupported) {
  /* supported */
} else {
  /* not supported */
}
```

JavaScript 操作 CSS 变量的写法如下。

```js
// 设置变量
document.body.style.setProperty('--primary', '#7F583F');

// 读取变量
document.body.style.getPropertyValue('--primary').trim();
// '#7F583F'

// 删除变量
document.body.style.removeProperty('--primary');
```

这意味着，JavaScript 可以将任意值存入样式表。下面是一个监听事件的例子，事件信息被存入 CSS 变量。

```js
const docStyle = document.documentElement.style;

document.addEventListener('mousemove', (e) => {
  docStyle.setProperty('--mouse-x', e.clientX);
  docStyle.setProperty('--mouse-y', e.clientY);
});
```
那些对 CSS 无用的信息，也可以放入 CSS 变量。

```css
--foo: if(x > 5) this.width = 10;
```

上面代码中，--foo的值在 CSS 里面是无效语句，但是可以被 JavaScript 读取。这意味着，可以把样式设置写在 CSS 变量中，让 JavaScript 读取。

所以，CSS 变量提供了 JavaScript 与 CSS 通信的一种途径。
