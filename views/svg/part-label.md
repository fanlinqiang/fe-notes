## 标签
### 直线`<line>`
`<line>` 标签用来创建线条。

|属性|含义|
|:--:|:--:|
|x1| 属性在 x 轴定义线条的开始|
|y1| 属性在 y 轴定义线条的开始|
|x2| 属性在 x 轴定义线条的结束|
|y2| 属性在 y 轴定义线条的结束|

### 折线`<polyline>`
`<polyline>` 标签用来创建仅包含直线的形状。

|属性|含义|
|:--:|:--:|
|`points`|指定了每个端点的坐标，横坐标与纵坐标之间与逗号分隔，点与点之间用空格分隔|

```html
<svg width="100" height="50">
  <polyline stroke="red" fill="black" stroke-width="2" points="0,0 10,10 20,10 100,50"/>
</svg>
```

<iframe height="187" style="width: 100%;" scrolling="no" title="svg-example-4" src="https://codepen.io/fanlinqiang/embed/ZEERozN?height=187&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/ZEERozN'>svg-example-4</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 圆`<circle>`
|属性|含义|
|:--:|:--:|
|`cx`|圆心`x`轴坐标|
|`cy`|圆心`y`轴坐标|
|`r`|半径|


```html
<svg width="100" height="50">
  <circle cx="50"  cy="25" r="25" />
</svg>
```
<iframe height="166" style="width: 100%;" scrolling="no" title="svg-example-5" src="https://codepen.io/fanlinqiang/embed/zYYajYY?height=166&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/zYYajYY'>svg-example-5</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 矩形`<rect>`
<rect> 标签可用来创建矩形，以及矩形的变种。

|属性|含义|
|:--:|:--:|
|`x`|左上角`x`轴坐标，默认值为0|
|`y`|左上角`y`轴坐标，默认值为0|
|`width`|宽|
|`height`|高|
|`rx`|圆角弧度|
|`ry`|圆角弧度|

```html
<svg width="100" height="50">
  <rect width="100" height="50" rx="10" ry="20"/>
</svg>
```
<iframe height="161" style="width: 100%;" scrolling="no" title="svg-example-6" src="https://codepen.io/fanlinqiang/embed/LYYrmYZ?height=161&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/LYYrmYZ'>svg-example-6</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 椭圆`<ellipse>`
`<ellipse>` 标签可用来创建椭圆。椭圆与圆很相似。不同之处在于椭圆有不同的 `x` 和 `y` 半径，而圆的 `x` 和 `y` 半径是相同的。

|属性|含义|
|:--:|:--:|
|`cx`|圆心`x`轴坐标|
|`cy`|圆心`y`轴坐标|
|`rx`|水平半径|
|`ry`|垂直半径|

```html
<svg width="100" height="50">
  <ellipse cx="50" cy="25" rx="50" ry="25"/>
</svg>
```

<iframe height="149" style="width: 100%;" scrolling="no" title="svg-example-7" src="https://codepen.io/fanlinqiang/embed/mddKLdM?height=149&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/mddKLdM'>svg-example-7</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 路径`<path>`
`<path>` 标签用来定义路径。[MDN 详解](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths)

|属性|含义|
|:--:|:--:|
|`d`|表示绘制顺序，它的值是一个长字符串，每个字母表示一个绘制动作，后面跟着坐标。|

支持绘制的动作包括：
> [https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/d](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/d)
* M：移动到（moveto）,后紧跟点x坐标及y坐标，用空格分割
* L：画直线到（lineto），后紧跟点x坐标及y坐标，用空格分割，坐标必须成对存在，多个坐标用空格分割
* H：水平画直线到（horizontal lineto），后紧跟需要水平移动到的X轴坐标
* V：垂直画直线到（vertical lineto），后紧跟需要水平移动到的Y轴坐标
* C：立方贝赛尔曲线(curveto),它需要考虑两个控制点。立方贝塞尔曲线的句法是：”C c1x,c1y c2x,c2y x,y“或者”c dc1x,dc1y dc2x,dc2y dx,dy“，在这里，c1x、c1y和c2x、c2y是分别是初始点和结束点的控制点的绝对坐标。dc1x、dc1y和dc2x、dc2y都是相对于初始点，而不是相对于结束点的。dx和dy分别是向右和向下的距离
* S：平滑的贝塞尔曲线(smooth curveto),语法是”S cx,cy x,y“或者”s dcx,dcy dx,dy“，在这里(d)cx指定第二个控制点。
* Q： 二次方贝塞尔曲线(quadratic Belzier curve), 控制点的两端是相同的。二次方贝塞尔曲线的句法是”Q cx, cy  x, y“或”q dcx, dcy dx, dy“。cx和cy都是控制点的绝对坐标，而dcx和dcy分别是控制点在x和y方向上的距离。
* T：二次方贝塞尔平滑曲线smooth quadratic Belzier curveto，它假定第一个控制点是从前一个控制点关于前一个点的反射，或者说如果没有前一个控制点的话它实际上就是前一个点。T的句法是”T x,y“或者”t dx,dy“，分别对应于绝对坐标和相对距离，用来创建二次方贝塞尔曲线。
* A：椭圆弧曲线路径（elliptical Arc），”A rx,ry xAxisRotate,LargeArcFlag,SweepFlag x,y“。解构它，rx和ry分别是x和y方向的半径，而LargeArcFlag的值要到是0要么是1，用来确定是要画小弧（0）还是画大弧（1）。SweepFlag也要么是0要么是1，用来确定弧是顺时针方向（1）还是逆时针方向（0）。x和y是目的地的坐标。
* Z：闭合路径（closepath）

!> 注释：以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。

```html
<svg width="100" height="50">
  <path d="M 0 0
   H 10
   V 10
   H 20
   V 20
   L 0 10 0 20
   C 100,0 " stroke="red"/>
</svg>
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" stroke="red"
    d="M 10,30
       A 20,20 0,0,1 50,30
       A 20,20 0,0,1 90,30
       Q 90,60 50,90
       Q 10,60 10,30 z" />
</svg>
```

<iframe height="498" style="width: 100%;" scrolling="no" title="svg-example-8" src="https://codepen.io/fanlinqiang/embed/bGGKMGK?height=498&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/bGGKMGK'>svg-example-8</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 文本`<text>`

|属性|含义|
|:--:|:--:|
|`x`|文本起始横坐标|
|`y`|文本起始纵坐标|
|`text-anchor`|文本锚点属性被用来描述该文本与所给点的对齐方式 (开头`start`、中间`middle`、末尾对齐`end`) |

`<text>` 元素可以通过`<tspan>` 元素来分组成多行来显示。每个 `tspan` 元素可以定义自己独特的格式和位置。

!> 文字的样式可以用class或style属性指定，如：`style="font-family: Times New Roman;font-size : 24;stroke: #00ff00;fill: #0000ff;"`。

```html
<svg width="200" height="50" xmlns:xlink="https://www.w3.org/1999/xlink">
    <text x="0" y="25">
        <tspan>hello svg</tspan>
        <tspan x="10" y="40">多行文本</tspan>
        <a xlink:href="www.baidu.com" target="_blank">
            <text x="0" y="15" fill="red">链接文本</text>
        </a>
    </text>
    <circle cx="100" cy="25" r="25" fill="#ff5e5e1a" />
    <text x="100" y="25" fill="red" style="dominant-baseline:middle;text-anchor:middle;">居中</text>
</svg>
```

> xmlns:xlink=""这一句引入了xlink命名空间，以支持链接元素属性定义。
> xlink:href和html中的a链接类似，只是多了xlink的命名空间前缀，用来表示链接的目的地址。

<iframe height="161" style="width: 100%;" scrolling="no" title="svg-example-9" src="https://codepen.io/fanlinqiang/embed/rNNKvNX?height=161&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/rNNKvNX'>svg-example-9</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 复用`<use>`
use元素在SVG文档内取得目标节点，并在别的地方复制它们。它的效果等同于这些节点被深克隆到一个不可见的DOM中，然后将其粘贴到use元素的位置，很像HTML5中的克隆模板元素。因为克隆的节点是不可见的，所以当使用CSS样式化一个use元素以及它的隐藏的后代元素的时候，必须小心注意。隐藏的、克隆的DOM不能保证继承CSS属性，除非你明文设置使用CSS继承。
出于安全原因，一些浏览器可能在use元素上应用同源策略，还有可能拒绝载入xlink:href属性内的跨源URI。

|属性|含义|
|:--:|:--:|
|`x`|左上角横坐标|
|`y`|左上角纵坐标|
|`width`|区域宽|
|`height`|区域高|
|`xlink:href`|引入复制节点|

```html
<svg width="100" height="50">
  <text id="useText" x="0" y="10">hello svg</text>
  <use xlink:href="#useText" x="0" y="20"/>
</svg>

```

<iframe height="170" style="width: 100%;" scrolling="no" title="svg-example-10" src="https://codepen.io/fanlinqiang/embed/JjjZvoG?height=170&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/JjjZvoG'>svg-example-10</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 多边形`<polygon>`

|属性|含义|
|:--:|:--:|
|`points`|定义多边形每个角的`x`和`y`坐标, `x`和`y`用`,`分割，坐标之间用空格分割|

```html
<svg width="100" height="50">
  <polygon points="50,0 0,50 100,50"/>
</svg>
```

<iframe height="171" style="width: 100%;" scrolling="no" title="svg-example-11" src="https://codepen.io/fanlinqiang/embed/YzzvLPZ?height=171&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/YzzvLPZ'>svg-example-11</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 分组`<g>`
`<g>`标签用于将多个形状组成一个组（group），方便复用和管理。 `<g>`元素没有x和y属性。 要移动`<g>`元素的内容，只能使用transform属性使用“ translate”函数，例如：`transform ="translate(x,y)"`。
```html
<svg width="300" height="100">
  <g id="myCircle">
    <text x="25" y="20">圆形</text>
    <circle cx="50" cy="50" r="20"/>
  </g>

  <use href="#myCircle" x="100" y="0" fill="blue" />
  <use href="#myCircle" x="200" y="0" fill="white" stroke="blue" />
</svg>
```

<iframe height="210" style="width: 100%;" scrolling="no" title="svg-example-12" src="https://codepen.io/fanlinqiang/embed/mddKLyM?height=210&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/mddKLyM'>svg-example-12</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 预定义`<defs>`
`<defs>`标签用于自定义形状，它内部的代码不会显示，仅供引用。

```html
<svg width="300" height="100">
  <defs>
    <g id="myCircle">
      <text x="25" y="20">圆形</text>
      <circle cx="50" cy="50" r="20"/>
    </g>
  </defs>

  <use href="#myCircle" x="0" y="0" />
  <use href="#myCircle" x="100" y="0" fill="blue" />
  <use href="#myCircle" x="200" y="0" fill="white" stroke="blue" />
</svg>
```

<iframe height="186" style="width: 100%;" scrolling="no" title="svg-example-13" src="https://codepen.io/fanlinqiang/embed/QWWxrwZ?height=186&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/QWWxrwZ'>svg-example-13</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### `<pattern>`
`<pattern>`标签用于自定义一个形状，该形状可以被引用来平铺一个区域。

```html
<svg width="500" height="500">
  <defs>
    <pattern id="dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <circle fill="#bee9e8" cx="50" cy="50" r="35" />
    </pattern>
  </defs>
  <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
</svg>
```
上面代码中，`<pattern>`标签将一个圆形定义为dots模式。patternUnits="userSpaceOnUse"表示<pattern>的宽度和长度是实际的像素值。然后，指定这个模式去填充下面的矩形。

<iframe height="204" style="width: 100%;" scrolling="no" title="svg-example-14" src="https://codepen.io/fanlinqiang/embed/pooKVvG?height=204&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/pooKVvG'>svg-example-14</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 图片`<image>`
<image>标签用于插入图片文件。

|属性|含义|
|:--:|:--:|
|`xlink:href`|文件来源|
|`width`|宽|
|`height`|高|

```html
<svg width="100" height="100">
  <image xlink:href="./_statics/images/logo.jpeg" width="50%" height="50%"/>
</svg>
```


### 动画`<animate>`
`<animate>`标签用于产生动画效果。

|属性|含义|
|:--:|:--:|
|`attributeName`|发生动画效果的属性名|
|`from`|单次动画的初始值。|
|`to`| 单次动画的结束值。|
|`dur`| 单次动画的持续时间。|
|`repeatCount`| 动画的循环模式。|

<iframe height="207" style="width: 100%;" scrolling="no" title="svg-example-15" src="https://codepen.io/fanlinqiang/embed/MWWXGYR?height=207&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/MWWXGYR'>svg-example-15</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 动画`transform`变换`<animateTransform>`
`<animate>`标签对`CSS`的`transform`属性不起作用，如果需要变形，就要使用`<animateTransform>`标签

```html
<svg width="500px" height="500px">
  <rect x="250" y="250" width="50" height="50" fill="#4bc0c8">
    <animateTransform attributeName="transform" type="rotate" begin="0s" dur="10s" from="0 200 200" to="360 400 400" repeatCount="indefinite" />
  </rect>
</svg>
```

<iframe height="265" style="width: 100%;" scrolling="no" title="svg-example-16" src="https://codepen.io/fanlinqiang/embed/gOOKzpX?height=265&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/gOOKzpX'>svg-example-16</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

上面代码中，<animateTransform>的效果为旋转（rotate），这时from和to属性值有三个数字，第一个数字是角度值，第二个值和第三个值是旋转中心的坐标。from="0 200 200"表示开始时，角度为0，围绕(200, 200)开始旋转；to="360 400 400"表示结束时，角度为360，围绕(400, 400)旋转。

### 标记`markers`

实际应用中，可能需要在线段的开始或者结尾添加一个箭头或者其他类型标记。
SVG提供了`<markers>`元素可以很好的实现上述功能，可以标记一条线或路径开始、中间或结束位置。marker元素定义了在特定的`<path>`元素、`<line>`元素、`<polyline>`元素或者`<polygon>`元素上绘制的箭头或者多边标记图形。

```html
<svg width="500" height="500">
  <defs>
    <marker id="arrow"
            markerWidth="10" markerHeight="10"
            refX="0" refY="3"
            orient="auto"
            markerUnits="strokeWidth"
            viewBox="0 0 20 20">
      <path
            d="M0,0 L0,6 L9,3 z"
            fill="#f00"
            />
    </marker>
  </defs>
  <line
        x1="50" y1="50"
        x2="250" y2="50"
        stroke="#000"
        stroke-width="3"
        marker-end="url(#arrow)" />
</svg>
```

<iframe height="233" style="width: 100%;" scrolling="no" title="svg-example-21" src="https://codepen.io/fanlinqiang/embed/gOPxJGP?height=233&theme-id=light&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/gOPxJGP'>svg-example-21</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

|属性|说明|
|:-|:-|
|id|用于引用（支持css属性引用），如`marker-end="url(#arrow)"`, 引用位置有：`marker-start`、`marker-mid`、`marker-end`|
|markerWidth|标记的宽度（默认3）|
|markerHeight|标记的高度（默认3）|
|viewBox|"各点"看到"这个SVG绘图区域。由空格或逗号分隔的4个值。(min x, min y, width, height)"|
|refx|规定`<markers>`元素内创建的图形元素哪个位置与指定图形元素相连接。标记顶点连接的位置（默认为0）|
|refy|标记顶点连接的位置（默认为0）|
|markerUnits|"strokeWidth'或'userSpaceOnUse"。"strokeWidth"，那么markerWidth="10"实际尺寸就是10乘以line元素的stroke-width值，其他数据同理。"userSpaceOnUse"，那么各个数据的值你规定多少就是多少（是一个绝对值）。|
|orient|数值或"'auto'始终显示标记的角度。 "auto"将计算某个角度使得X轴一个顶点的正切值（默认为0）|
