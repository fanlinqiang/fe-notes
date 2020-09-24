## float 浮动

[浮动-mdn](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Floats)

最初，引入 float 属性是为了能让 web 开发人员实现简单的布局，包括在一列文本中浮动的图像，文字环绕在它的左边或右边。后来人们将其更加广泛的用于网页的布局中。

#### 文字下沉
<iframe height="247" style="width: 100%;" scrolling="no" title="float-首字下沉例子" src="https://codepen.io/fanlinqiang/embed/ExxwXKw?height=247&theme-id=0&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/ExxwXKw'>float-首字下沉例子</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 清除浮动

浮动元素会脱离正常的文档布局流，所有在浮动下面的自身不浮动的内容都将围绕浮动元素进行包装，这样父级元素无法计算正常的高度。
<iframe height="225" style="width: 100%;" scrolling="no" title="float-浮动产生的问题" src="https://codepen.io/fanlinqiang/embed/eYYGWod?height=225&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/eYYGWod'>float-浮动产生的问题</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

* 使用clear 属性清除浮动

|值|	描述|
|left|	在左侧不允许浮动元素。|
|right|	在右侧不允许浮动元素。|
|both|	在左右两侧均不允许浮动元素。|
|none|	默认值。允许浮动元素出现在两侧。|
|inherit|	规定应该从父元素继承 clear 属性的值。|

```pug
.parent
	.left
	.right
	.content test
.footer
	
```
```sass
.parent
	background-color: gray
	.content
		clear: both
.left 
	float: left
	background-color: red
	width: 30px
	height: 30px
.right
	float: right
	background-color: blue
	width: 30px
	height: 30px
.footer
	background-color: green
	height: 40px
```
