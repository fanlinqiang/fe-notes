## 基本用法

### canvas元素
```html
<canvas id="tutorial" width="150" height="150">
    不支持canvas
</canvas>
```
```js
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d'); //  canvas元素的方法getContext()用来获得渲染上下文和它的绘画功能。getContext()只有一个参数，上下文的格式。
```
> `<canvas>` 标签只有两个属性—— width和height。这些都是可选的，并且同样利用 DOM properties 来设置。在`<canvas>`标签中提供替换内容,不支持`<canvas>`的浏览器将会忽略容器并在其中渲染后备内容。而支持`<canvas>`的浏览器将会忽略在容器中包含的内容，并且只是正常渲染canvas。

!> 注意: 如果你绘制出来的图像是扭曲的, 尝试用width和height属性为`<canvas>`明确规定宽高，而不是使用CSS。`<canvas>` 元素需要结束标签(`</canvas>`)。如果结束标签不存在，则文档的其余部分会被认为是替代内容，将不会显示出来。

### 简单例子

```pug
canvas(id="canvas" width="150" height="150")
```
```js
var canvas = document.getElementById("canvas");
if (canvas.getContext) {
	var ctx = canvas.getContext("2d");

	ctx.fillStyle = "rgb(200,0,0)";
	ctx.fillRect (10, 10, 55, 50);

	ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
	ctx.fillRect (30, 30, 55, 50);
}
```

<iframe height="200" style="width: 100%;" scrolling="no" title="canvas-demo-rect" src="//codepen.io/fanlinqiang/embed/RXrQaE/?height=200&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/RXrQaE/'>canvas-demo-rect</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
