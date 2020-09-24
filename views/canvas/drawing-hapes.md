## 绘制形状
canvas元素默认被网格所覆盖。通常来说网格中的一个单元相当于canvas元素中的一像素。栅格的起点为左上角（坐标为（0,0））。所有元素的位置都相对于原点定位。所以图中蓝色方形左上角的坐标为距离左边（X轴）x像素，距离上边（Y轴）y像素（坐标为（x,y））。

<div><img src="./_statics/images/Canvas_default_grid.png" style="height: 220px"></div>

### 路径path

路径绘制图形步骤：
1. 创建路径起始点, `beginPath()`新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
2. 使用画图命令去画出路径,如：`ctx.strokeRect(50, 50, 50, 50)`
3. 封闭路径，`closePath()`闭合路径之后图形绘制命令又重新指向到上下文中,不是必需的。这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做。
4. 一旦路径生成，就能通过描边或填充路径区域来渲染图形。`stroke()`通过线条来绘制图形轮廓;`fill()`通过填充路径的内容区域生成实心的图形。

### 直线lineTo
语法：
```js
context.lineTo(x, y);
```
|参数|描述|
|:-|:-|
|x	|路径的目标位置x坐标|
|y	|路径的目标位置y坐标|

```js
var canvas = document.getElementById('canvas');
if (canvas.getContext){
	var ctx = canvas.getContext('2d');

	// 填充三角形
	ctx.beginPath();
	ctx.moveTo(25,25);
	ctx.lineTo(105,25);
	ctx.lineTo(25,105);
	ctx.fill();

	// 描边三角形
	ctx.beginPath();
	ctx.moveTo(125,125);
	ctx.lineTo(125,45);
	ctx.lineTo(45,125);
	ctx.closePath();
	ctx.stroke();
}
```

<iframe height="212" style="width: 100%;" scrolling="no" title="canva-lineTo" src="//codepen.io/fanlinqiang/embed/MNyVer/?height=212&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/MNyVer/'>canva-lineTo</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 矩形rect

语法：
```js
context.rect(x, y, width, height);

context.fillRect(x, y, width, height);
context.clearRect(x, y, width, height);
context.strokeRect(x, y, width, height);
```
参数值：

|参数|描述|
|:-|:-|
|x	|矩形左上角的 x 坐标|
|y	|矩形左上角的 y 坐标|
|width	|矩形的宽度，以像素计|
|height	|矩形的高度，以像素计|

```js
var canvas = document.getElementById('canvas');
if (canvas.getContext) {
	var ctx = canvas.getContext('2d');

	ctx.fillRect(25, 25, 100, 100);
	ctx.clearRect(45, 45, 60, 60);
	ctx.strokeRect(50, 50, 50, 50);

	// 红色矩形
	ctx.beginPath();
	ctx.lineWidth="6";
	ctx.strokeStyle="red";
	ctx.rect(0,0,150,150);
	ctx.stroke();
}
```

<iframe height="228" style="width: 100%;" scrolling="no" title="canvas-rect" src="//codepen.io/fanlinqiang/embed/bXpaox/?height=228&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/bXpaox/'>canvas-rect</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

`fillRect()`函数绘制了一个边长为100px的黑色正方形。`clearRect()`函数从正方形的中心开始擦除了一个60*60px的正方形，接着`strokeRect()`在清除区域内生成一个50*50的正方形边框。

### 绘制三角形

```js
var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(75, 50); //moveTo(x, y) 将笔触移动到指定的坐标x以及y上。
        ctx.lineTo(100, 75);
        ctx.lineTo(100, 25);
        ctx.fill();
    }
```
<iframe height="171" style="width: 100%;" scrolling="no" title="canvas-triangle" src="//codepen.io/fanlinqiang/embed/LwNeoj/?height=171&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/LwNeoj/'>canvas-triangle</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 圆形arc
语法：
```js
context.arc(x,y,r,sAngle,eAngle,counterclockwise);
```
参数值：

|参数|描述|
|:-|:-|
|x	|圆的中心的 x 坐标。|
|y	|圆的中心的 y 坐标。|
|r	|圆的半径。|
|sAngle	|起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。|
|eAngle	|结束角，以弧度计。|
|counterclockwise	|可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。|

```js
var canvas = document.getElementById('canvas');
if (canvas.getContext){
	var ctx = canvas.getContext('2d');

	ctx.beginPath();
	ctx.arc(75,75,50,0,Math.PI*2,true); // 绘制
	ctx.moveTo(110,75);
	ctx.arc(75,75,35,0,Math.PI,false);   // 口(顺时针)
	ctx.moveTo(65,65);
	ctx.arc(60,65,5,0,Math.PI*2,true);  // 左眼
	ctx.moveTo(95,65);
	ctx.arc(90,65,5,0,Math.PI*2,true);  // 右眼
	ctx.stroke();

	// 无moveTo则展现完整路径
	ctx.beginPath();
	ctx.strokeStyle="red";
	ctx.arc(175,75,50,0,Math.PI*2,true); // 绘制
	//ctx.moveTo(210,75);
	ctx.arc(175,75,35,0,Math.PI,false);   // 口(顺时针)
	//ctx.moveTo(165,65);
	ctx.arc(160,65,5,0,Math.PI*2,true);  // 左眼
	//ctx.moveTo(195,65);
	ctx.arc(190,65,5,0,Math.PI*2,true);  // 右眼
	ctx.stroke();

}
```

<iframe height="219" style="width: 100%;" scrolling="no" title="canvas-arc" src="//codepen.io/fanlinqiang/embed/NQNyzq/?height=219&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/NQNyzq/'>canvas-arc</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 圆弧arcTo

语法：
````js
arcTo(x1, y1, x2, y2, radius)
````

|参数|描述|
|:-|:-|
|x1	|切线起点的 x 坐标。|
|y1	|切线起点的 y 坐标。|
|x2	|切线终点的 x 坐标。|
|y2	|切线终点的 y 坐标。|
|r	|圆的半径。|

点`(x1, y1)`分别与点`(x2, y2)`及当前笔触点`(x0, y0)`构成两条切线，绘制的弧线是两个切点之间以r为半径的最短圆弧。

详解：[Canvas学习：绘制圆和圆弧](https://www.cnblogs.com/qq984064199/p/9223307.html)

```js
/*
*
* ctx 画布
* x , y 左上角坐标
* width, height 矩形宽高
* r 弧形半径
* */
function drawRoundedRect(ctx, x, y, width, height, r) {
	ctx.save();
	ctx.beginPath();

	// draw top and top right corner
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + width, y, x + width, y + r, r);

	// draw right side and bottom right corner
	ctx.arcTo(x + width, y + height, x + width - r, y + height, r);

	// draw bottom and bottom left corner
	ctx.arcTo(x, y + height, x, y + height - r, r);

	// draw left and top left corner
	ctx.arcTo(x, y, x + r, y, r);

	ctx.fill();
	ctx.stroke();

	ctx.restore();
}
var canvas = document.getElementById('canvas');
if (canvas.getContext){
	var ctx = canvas.getContext('2d');
	drawRoundedRect(ctx, 20, 20, 100, 100, 10);
}
```

<iframe height="237" style="width: 100%;" scrolling="no" title="canvas-arcTo" src="//codepen.io/fanlinqiang/embed/voGRQG/?height=237&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/voGRQG/'>canvas-arcTo</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 贝塞尔曲线

[贝塞尔曲线-百度百科](https://baike.baidu.com/item/%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF/1091769?fr=aladdin)
> 贝塞尔曲线(Bézier curve)，又称贝兹曲线或贝济埃曲线，是应用于二维图形应用程序的数学曲线。一般的矢量图形软件通过它来精确画出曲线，贝兹曲线由线段与节点组成，节点是可拖动的支点，线段像可伸缩的皮筋，

#### 二阶贝塞尔

<div style="text-align: center"><img src="./_statics/images/bezier-2-1.webp" style="height: 220px"></div>
原理：AD／AB = BE／BC = DF／DE

<div style="text-align: center"><img src="./_statics/images/bezier-2.webp" style="height: 220px"></div>

语法：
```js
context.quadraticCurveTo(cpx,cpy,x,y);
```
参数值：
|参数|描述|
|:-|:-|
|cpx	|贝塞尔控制点的 x 坐标|
|cpy	|贝塞尔控制点的 y 坐标|
|x	|结束点的 x 坐标|
|y	|结束点的 y 坐标|

```js
var canvas = document.getElementById('canvas');
if (canvas.getContext) {
	var ctx = canvas.getContext('2d');

	// 二次贝塞尔曲线
	ctx.beginPath();
	ctx.moveTo(75,25);
	ctx.quadraticCurveTo(25,25,25,62.5);
	ctx.quadraticCurveTo(25,100,50,100);
	ctx.quadraticCurveTo(50,120,30,125);
	ctx.quadraticCurveTo(60,120,65,100);
	ctx.quadraticCurveTo(125,100,125,62.5);
	ctx.quadraticCurveTo(125,25,75,25);
	ctx.stroke();
}
```

<iframe height="213" style="width: 100%;" scrolling="no" title="canvas-quadraticCurveTo" src="//codepen.io/fanlinqiang/embed/EqyZpO/?height=213&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/EqyZpO/'>canvas-quadraticCurveTo</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

#### 三阶贝塞尔
<div style="text-align: center"><img src="./_statics/images/bezier-3.webp" style="height: 220px"></div>

语法：
```js
context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
```

参数值：
|参数|描述|
|:-|:-|
|cp1x	|第一个贝塞尔控制点的 x 坐标|
|cp1y	|第一个贝塞尔控制点的 y 坐标|
|cp2x	|第二个贝塞尔控制点的 x 坐标|
|cp2y	|第二个贝塞尔控制点的 y 坐标|
|x	|结束点的 x 坐标|
|y	|结束点的 y 坐标|

<iframe height="211" style="width: 100%;" scrolling="no" title="canvas-bezierCurveTo" src="//codepen.io/fanlinqiang/embed/MNeJzG/?height=211&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/MNeJzG/'>canvas-bezierCurveTo</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

#### 四阶贝塞尔
<div style="text-align: center"><img src="./_statics/images/bezier-4.webp" style="height: 220px"></div>

#### 五阶贝塞尔
<div style="text-align: center"><img src="./_statics/images/bezier-5.webp" style="height: 220px"></div>

### Path2D 对象

Path2D用来缓存或记录绘画命令，这样你将能快速地回顾路径。
Path2D()会返回一个新初始化的Path2D对象（可能将某一个路径作为变量——创建一个它的副本，或者将一个包含SVG path数据的字符串作为变量）。
```js
new Path2D();     // 空的Path对象
new Path2D(path); // 克隆Path对象
new Path2D(d);    // 从SVG建立Path对象
```
所有的路径方法比如moveTo, rect, arc或quadraticCurveTo等，如我们前面见过的，都可以在Path2D中使用。
Path2D API 添加了 addPath作为将path结合起来的方法。当你想要从几个元素中来创建对象时，这将会很实用。比如：
```js
Path2D.addPath(path [, transform])​
```
添加了一条路径到当前路径（可能添加了一个变换矩阵）。
Path2D可以使用SVG path data来初始化canvas上的路径。
```js
var p = new Path2D("M10 10 h 80 v 80 h -80 Z");
```

```js
var canvas = document.getElementById('canvas');
if (canvas.getContext){
	var ctx = canvas.getContext('2d');

	var rectangle = new Path2D();
	rectangle.rect(10, 10, 50, 50);

	var circle = new Path2D();
	circle.moveTo(125, 35);
	circle.arc(100, 35, 25, 0, 2 * Math.PI);

	ctx.stroke(rectangle);
	ctx.fill(circle);
}
```

<iframe height="171" style="width: 100%;" scrolling="no" title="canvas-path2d" src="//codepen.io/fanlinqiang/embed/qeNRze/?height=171&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/qeNRze/'>canvas-path2d</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


## 绘制文本

文本与图形总是如影随形。为此，2D 绘图上下文也提供了绘制文本的方法。绘制文本主要有两个 方法:fillText()和 strokeText()。这两个方法都可以接收 4 个参数:要绘制的文本字符串、x 坐 标、y 坐标和可选的最大像素宽度。而且，这两个方法都以下列 3 个属性为基础。

* font:表示文本样式、大小及字体，用 CSS 中指定字体的格式来指定，例如"10px Arial"。
* textAlign:表示文本对齐方式。可能的值有"start"、"end"、"left"、"right"和"center"。
建议使用"start"和"end"，不要使用"left"和"right"，因为前两者的意思更稳妥，能同时适合从左到右和从右到左显示(阅读)的语言。
* textBaseline:表示文本的基线。可能的值有"top"、"hanging"、"middle"、"alphabetic"、"ideographic"和"bottom"。

这几个属性都有默认值，因此没有必要每次使用它们都重新设置一遍值。fillText()方法使用
fillStyle 属性绘制文本，而 strokeText()方法使用 strokeStyle 属性为文本描边。相对来说，还 是使用 fillText()的时候更多，因为该方法模仿了在网页中正常显示文本。

```js
context.font = "bold 14px Arial";
context.textAlign = "center";
context.textBaseline = "middle";
context.fillText("12", 100, 20);
```

由于绘制文本比较复杂，特别是需要把文本控制在某一区域中的时候，2D 上下文提供了辅助确定 文本大小的方法 measureText()。这个方法接收一个参数，即要绘制的文本;返回一个 TextMetrics 对象。返回的对象目前只有一个 width 属性，但将来还会增加更多度量属性。
```js
var fontSize = 100;
	context.font = fontSize + "px Arial";
	while(context.measureText("Hello world!").width > 140){
		fontSize--;
		context.font = fontSize + "px Arial";
	}
	context.fillText("Hello world!", 10, 10);
	context.fillText("Font size is " + fontSize + "px", 10, 50);
```

## 变换

通过上下文的变换，可以把处理后的图像绘制到画布上。2D 绘制上下文支持各种基本的绘制变换。 创建绘制上下文时，会以默认值初始化变换矩阵，在默认的变换矩阵下，所有处理都按描述直接绘制。 为绘制上下文应用变换，会导致使用不同的变换矩阵应用处理，从而产生不同的结果。

可以通过如下方法来修改变换矩阵：

* rotate(angle):围绕原点旋转图像 angle 弧度。
* scale(scaleX, scaleY):缩放图像，在 x 方向乘以 scaleX，在 y 方向乘以 scaleY。scaleX和 scaleY 的默认值都是 1.0。
* translate(x,y):将坐标原点移动到(x,y)。执行这个变换之后，坐标(0,0)会变成之前由(x,y) 表示的点。
* transform(m1_1, m1_2, m2_1, m2_2, dx, dy):直接修改变换矩阵，方式是乘以如下矩阵。

```
m1_1 m1_2 dx
m2_1 m2_2 dy
```

* setTransform(m1_1, m1_2, m2_1, m2_2, dx, dy):将变换矩阵重置为默认状态，然后 再调用 transform()。


```js
var drawing = document.getElementById("drawing");
//确定浏览器支持<canvas>元素
if (drawing.getContext){
    var context = drawing.getContext("2d");
	//开始路径
	context.beginPath();
	//绘制外圆
	context.arc(100, 100, 99, 0, 2 * Math.PI, false);
	//绘制内圆
	context.moveTo(194, 100);
	context.arc(100, 100, 94, 0, 2 * Math.PI, false);
	//变换原点 context.translate(100, 100);
	//旋转表针 context.rotate(1);
 	//绘制分针
	context.moveTo(0,0);
    context.lineTo(0, -85);
	//绘制时针 context.moveTo(0, 0); context.lineTo(-65, 0);
	//描边路径
    context.stroke();
}
```

无论是刚才执行的变换，还是 fillStyle、strokeStyle 等属性，都会在当前上下文中一直有效， 8 除非再对上下文进行什么修改。虽然没有什么办法把上下文中的一切都重置回默认值，但有两个方法可 以跟踪上下文的状态变化。如果你知道将来还要返回某组属性与变换的组合，可以调用 save()方法。 调用这个方法后，当时的所有设置都会进入一个栈结构，得以妥善保管。然后可以对上下文进行其他修 9 改。等想要回到之前保存的设置时，可以调用 restore()方法，在保存设置的栈结构中向前返回一级， 恢复之前的状态。连续调用 save()可以把更多设置保存到栈结构中，之后再连续调用 restore()则可 以一级一级返回。

```js
context.fillStyle = "#ff0000";
context.save();
context.fillStyle = "#00ff00";
context.translate(100, 100);
context.save();
context.fillStyle = "#0000ff";
context.fillRect(0, 0, 100, 200); //从点(100,100)开始绘制蓝色矩形
context.restore();
context.fillRect(10, 10, 100, 200); //从点(110,110)开始绘制绿色矩形
context.restore();
context.fillRect(0, 0, 100, 200); //从点(0,0)开始绘制红色矩形
```

首先，将 fillStyle 设置为红色，并调用 save()保存上下文状态。接下来，把 fillStyle 修改 为绿色，把坐标原点变换到(100,100)，再调用 save()保存上下文状态。然后，把 fillStyle 修改为蓝 色并绘制蓝色的矩形。因为此时的坐标原点已经变了，所以矩形的左上角坐标实际上是(100,100)。然后 调用 restore()，之后 fillStyle 变回了绿色，因而第二个矩形就是绿色。之所以第二个矩形的起点 坐标是(110,110)，是因为坐标位置的变换仍然起作用。再调用一次 restore()，变换就被取消了，而 fillStyle 也返回了红色。所以最后一个矩形是红色的，而且绘制的起点是(0,0)。
需要注意的是，save()方法保存的只是对绘图上下文的设置和变换，不会保存绘图上下文的 内容。


## 绘制图像

最简单的调用方式 是传入一个 HTML `<img>`元素，以及绘制该图像的起点的 x 和 y 坐标

```js
var image = document.images[0];
context.drawImage(image, 10, 10);
```

drawImage()方法的这种调用方式总共需要传入 9 个参数:要绘制的图像、源图像的 x 坐标、源图像的 y 坐标、源图像的宽度、源 图像的高度、目标图像的 x 坐标、目标图像的 y 坐标、目标图像的宽度、目标图像的高度。

除了给 drawImage()方法传入 HTML `<img>`元素外，还可以传入另一个`<canvas>`元素作为其第一 个参数。这样，就可以把另一个画布内容绘制到当前画布上。结合使用 drawImage()和其他方法，可以对图像进行各种基本操作。而操作的结果可以通过 toDataURL()方法获得(toDataURL()是 Canvas 对象的方法，不是上下文对 象的方法。)。不过，有一个例外，即图像不能来自其他域。如果图像来自其他域，调用 toDataURL()会抛出一个错误。打个比方，假如位于 www.example.com 上的页面绘制的图像来自于 www.wrox.com，那当前上下文就会被认为“不干净”，因而会抛出错误。

## 阴影

2D 上下文会根据以下几个属性的值，自动为形状或路径绘制出阴影。

* shadowColor:用 CSS 颜色格式表示的阴影颜色，默认为黑色。
* shadowOffsetX:形状或路径 x 轴方向的阴影偏移量，默认为 0。
* shadowOffsetY:形状或路径 y 轴方向的阴影偏移量，默认为 0。
* shadowBlur:模糊的像素数，默认 0，即不模糊。

这些属性都可以通过 context 对象来修改。只要在绘制前为它们设置适当的值，就能自动产生阴 影。例如:

```js
var context = drawing.getContext("2d");
//设置阴影
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowBlur = 4;
context.shadowColor = "rgba(0, 0, 0, 0.5)";
//绘制红色矩形
context.fillStyle = "#ff0000";
context.fillRect(10, 10, 50, 50);
//绘制蓝色矩形
context.fillStyle = "rgba(0,0,255,1)";
context.fillRect(30, 30, 50, 50);
```

## 渐变

### 线性渐变
渐变由 CanvasGradient 实例表示，很容易通过 2D 上下文来创建和修改。要创建一个新的线性渐 变，可以调用 createLinearGradient()方法。这个方法接收 4 个参数:起点的 x 坐标、起点的 y 坐 标、终点的 x 坐标、终点的 y 坐标。调用这个方法后，它就会创建一个指定大小的渐变，并返回 CanvasGradient 对象的实例。
创建了渐变对象后，下一步就是使用 addColorStop()方法来指定色标。这个方法接收两个参数: 色标位置和 CSS 颜色值。色标位置是一个 0(开始的颜色)到 1(结束的颜色)之间的数字。例如:

```js
function createRectLinearGradient(context, x, y, width, height){
        return context.createLinearGradient(x, y, x+width, y+height);
}
var gradient = createRectLinearGradient(context, 30, 30, 50, 50);
gradient.addColorStop(0, "white");
gradient.addColorStop(1, "black");

//绘制红色矩形
context.fillStyle = "#ff0000";
context.fillRect(10, 10, 50, 50);
//绘制渐变矩形
context.fillStyle = gradient;
context.fillRect(30, 30, 50, 50);

```

### 径向渐变

从某个形状的中心点开始创建一个向外扩散的径向渐变效果，就要将两个圆定义为同心圆。 比如，就拿前面创建的矩形来说，径向渐变的两个圆的圆心都应该在(55,55)，因为矩形的区域是从(30,30) 到(80,80)。

```js
var gradient = context.createRadialGradient(55, 55, 10, 55, 55, 30);
   gradient.addColorStop(0, "white");
gradient.addColorStop(1, "black");
//绘制红色矩形
context.fillStyle = "#ff0000"; context.fillRect(10, 10, 50, 50);
//绘制渐变矩形
context.fillStyle = gradient; context.fillRect(30, 30, 50, 50);
```

## 模式

模式其实就是重复的图像，可以用来填充或描边图形。要创建一个新模式，可以调用 createPattern()方法并传入两个参数:一个 HTML `<img>`元素和一个表示如何重复图像的字符串。 其中，第二个参数的值与 CSS 的 background-repeat 属性值相同，包括"repeat"、"repeat-x"、 "repeat-y"和"no-repeat"。看一个例子。

```js
var image = document.images[0],
pattern = context.createPattern(image, "repeat");
//绘制矩形
context.fillStyle = pattern; context.fillRect(10, 10, 150, 150);
```

需要注意的是，模式与渐变一样，都是从画布的原点(0,0)开始的。将填充样式(fillStyle)设置 为模式对象，只表示在某个特定的区域内显示重复的图像，而不是要从某个位置开始绘制重复的图像。 createPattern()方法的第一个参数也可以是一个`<video>`元素，或者另一个`<canvas>`元素。
