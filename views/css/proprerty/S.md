## S
### [shape-outside](https://developer.mozilla.org/zh-CN/docs/Web/CSS/shape-outside)

定义了一个可以是非矩形的形状，相邻的内联内容应围绕该形状进行包装。 默认情况下，内联内容包围其边距框

```
/* 关键字值 */
shape-outside: none;
shape-outside: margin-box;
shape-outside: content-box;
shape-outside: border-box;
shape-outside: padding-box;

/* 函数值 */
shape-outside: circle();
shape-outside: ellipse();
shape-outside: inset(10px 10px 10px 10px);
shape-outside: polygon(10px 10px, 20px 20px, 30px 30px);

/* <url> 值 */
shape-outside: url(image.png);

/* 渐变值 */
shape-outside: linear-gradient(45deg, rgba(255, 255, 255, 0) 150px, red 150px);

/* 全局值 */
shape-outside: initial;
shape-outside: inherit;
shape-outside: unset;
```
```html
.main
	.left
	.right
	p Sometimes a web page's text content appears to be funneling your attention towards a spot on the page to drive you to follow a particular link. Sometimes you don't notice.
```
```sass
.main
	width: 500px
	margin: 0 auto
.left, .right
	width: 40%
	height: 12ex
	background: lightgray
.left
	float: left
	shape-outside: polygon(0 0, 100% 100%, 0 100%)
	clip-path: polygon(0 0, 100% 100%, 0 100%)
.right
	float: right
	shape-outside: polygon(100% 0, 100% 100%, 0 100%)
	clip-path: polygon(100% 0, 100% 100%, 0 100%)
p
	text-align: center
	
```

<iframe height="204" style="width: 100%;" scrolling="no" title="shape-outside" src="//codepen.io/fanlinqiang/embed/mdbBKbd/?height=204&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/mdbBKbd/'>shape-outside</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>




