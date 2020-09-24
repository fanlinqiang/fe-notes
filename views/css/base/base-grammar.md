## css 语法

```
选择符 {
    属性: 属性值;
    [属性:属性值;]
}
```
说明：
```
1）每个CSS样式由两部分组成，即选择符和声明，声明又分为属性和属性值；
2）属性必须放在花括号中，属性与属性值用冒号连接。
3）每条声明用分号结束。
4）当一个属性有多个属性值的时候，属性值与属性值不分先后顺序。
5）在书写样式过程中，空格、换行等操作不影响属性显示。
```
### 样式的建立
`css`样式包括内部样式，外部样式, 和内联样式
### 内部样式
语法：
```html
<style type="text/css">
/*css语句*/
</style>
```
!> 注：使用style标记创建样式时，最好将该标记写在`<head></head>`
### 外部样式的建立及调用

1. 外部样式表的创建
2. 外部样式表的导入

* 方法 一
```html
<link rel="stylesheet" type="text/css" href="目标文件的路径及文件名全称" />
```
说明：使用link元素导入外部样式表时，需将该元素写在文档头部，即`<head>与</head>`之间。
* 方法二
```html
<style type="text/css">
    @import url(目标文件的路径及文件名全称);
</style>
```
注：@和import之间没有空格 url和小括号之间也没有空格；必须结尾以分号结束；

### link和import导入外部样式的区别
* 差别1：老祖宗的差别：link属于XHTML标签，而@import完全是CSS提供的一种方式。 link标签除了可以加载CSS外，还可以做很多其它的事情，比如定义RSS，定义rel连接属性等，@import就只能加载CSS。
* 差别2：加载顺序的差别：当一个页面被加载的时候（就是被浏览者浏览的时候），link引用的CSS会同时被加载，而@import引用的CSS 会等到页面全部被下载完再被加载。所以有时候浏览@import加载CSS的页面时开始会没有样式。
* 差别3：兼容性的差别。：@import是CSS2.1提出的，所以老的浏览器不支持，@import只在IE5以上的才能识识别，而link标签无此问题。
* 差别4：使用dom控制样式时的差别：当使用javascript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的.

### 内联样式表（行间样式，行内样式，嵌入式样式）
```
语法：<标签    style="属性：属性值;属性:属性值;"></标签>
```
### 样式表的作用域
行内样式的作用域是当前标签，内部样式的作用域 是当前文件，外部样式表的作用域是有关联的所有文件。
### 样式表的优先级
内联样式表的优先级别最高
内部样式表与外部样式表的优先级和书写的顺序有关，后书写的优先级别高。
### 可继承的样式
* 交互样式相关属性：visibility、cursor
* 文字排版相关属性：letter-spacing、word-spacing、white-space、line-height、color、font、 font-*（font-family、font-size、font-style）、text-*（text-indent、text-align、text-shadow、text-transform）
* 表格排版相关属性：border-collapse
* 列表排版相关属性：list-style、list-style-type、list-style-position、list-style-image

### 试题

#### 样式的顺序
CSS 代码：
```css
.red {
    color: red;
}
.blue {
    color: blue;
}
```
HTML 代码：
```html
<div class="red blue">这是什么颜色</div>
<div class="blue red">这是什么颜色</div>
```

<details><summary><b>答案</b></summary>
<iframe height="151" style="width: 100%;" scrolling="no" title="OeBePB" src="//codepen.io/fanlinqiang/embed/OeBePB/?height=151&theme-id=0&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/OeBePB/'>OeBePB</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
</details>
