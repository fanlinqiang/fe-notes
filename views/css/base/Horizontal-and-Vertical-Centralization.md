## 水平垂直居中
### 内联块元素方法`display: inline-block`
```pug
.parent
	.child
```
```sass
.parent
	width: 100px
	height: 100px
	border: 1px solid red
	text-align: center // 水平居中
	font-size: 0
	&::after
		content: ''
		display: inline-block
		vertical-align: middle
		width: 0
		height: 100%
.child
	display: inline-block
	vertical-align: middle
	width: 50px
	height: 50px
	border: 1px solid blue
```
!> 可能会在水平方向会有一定的偏移量，《css世界》里面提到‘幽灵节点’，给父容器加了一个font-size:0 解决
<iframe height="276" style="width: 100%;" scrolling="no" title="水平垂直居中display:inline-block" src="//codepen.io/fanlinqiang/embed/pmBxxz/?height=276&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/pmBxxz/'>水平垂直居中display:inline-block</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 表格元素方法`dispaly: table-cell`
```pug
.parent
	.child
```
```sass
.parent
	width: 100px
	height: 100px
	border: 1px solid red
	font-size: 0
	display: table-cell
	vertical-align: middle
.child
	width: 50px
	height: 50px
	border: 1px solid blue
	margin: 0 auto
```
<iframe height="245" style="width: 100%;" scrolling="no" title="水平垂直居中display: table-cell" src="//codepen.io/fanlinqiang/embed/xNeQgP/?height=245&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/xNeQgP/'>水平垂直居中display: table-cell</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 相对定位`position: absolute`
```pug
.parent
	.child
```
```sass
.parent
	width: 100px
	height: 100px
	border: 1px solid red
	position: relative
.child
	width: 50px
	height: 50px
	border: 1px solid blue
	position: absolute
	top: 0
	bottom: 0
	left: 0
	right: 0
	margin: auto
```
<iframe height="232" style="width: 100%;" scrolling="no" title="水平垂直居中-position" src="//codepen.io/fanlinqiang/embed/MdRzEJ/?height=232&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/MdRzEJ/'>水平垂直居中-position</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 相对定位`position + transform`
```pug
.parent
	.child
```
```sass
.parent
	width: 100px
	height: 100px
	border: 1px solid red
	position: relative
.child
	width: 50px
	height: 50px
	border: 1px solid blue
	position: absolute
	top: 50%
	left: 50%
	transform: translate(-50%, -50%)
```
<iframe height="215" style="width: 100%;" scrolling="no" title="水平垂直居中position+transform" src="//codepen.io/fanlinqiang/embed/QRPJQN/?height=215&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/QRPJQN/'>水平垂直居中position+transform</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### flex布局
```pug
.parent
	.child
```
```sass
.parent
	width: 100px
	height: 100px
	border: 1px solid red
	display: flex
	justify-content: center
	align-items: center
.child
	width: 50px
	height: 50px
	border: 1px solid blue
```
<iframe height="212" style="width: 100%;" scrolling="no" title="水平垂直居中flex" src="//codepen.io/fanlinqiang/embed/LovXBJ/?height=212&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/LovXBJ/'>水平垂直居中flex</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### flex + margin
```pug
.parent
	.child
```
```sass
.parent
    width: 100px
    height: 100px
    border: 1px solid red
    display: flex
.child
    width: 50px
    height: 50px
    border: 1px solid blue
    margin: auto
```

<iframe height="190" style="width: 100%;" scrolling="no" title="水平垂直居中-flex-margin" src="//codepen.io/fanlinqiang/embed/KKPVroP/?height=265&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/KKPVroP/'>水平垂直居中-flex-margin</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### grid布局

```pug
.parent
	.child
```
```sass
.parent
	width: 100px
	height: 100px
	border: 1px solid red
	display: grid
.child
	width: 50px
	height: 50px
	border: 1px solid blue
	margin: auto
```

<iframe height="222" style="width: 100%;" scrolling="no" title="水平垂直居中-grid" src="https://codepen.io/fanlinqiang/embed/LYYzyMO?height=222&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/LYYzyMO'>水平垂直居中-grid</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
