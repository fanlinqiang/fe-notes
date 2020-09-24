## 容器`svg`
### 标签`<svg>`

SVG 代码以 `<svg>` 元素开始，包括开启标签 `<svg>` 和关闭标签 `</svg>`, 这是根元素。

|属性|含义|
|:--:|:--:|
|`width`|宽度，默认值为`300px`, 可使用百分比或像素(单位`px`)|
|`height`|高度，默认值为`150px`, 可使用百分比或像素(单位`px`)|
|`version`|可定义所使用的 `SVG` 版本|
|`xmlns` |可定义 `SVG` 命名空间|
|`viewBox`|可定义视口位置，属性的值有四个数字，分别是左上角的横坐标和纵坐标、视口的宽度和高度|

例：
```html
<svg width="100" height="100" viewBox="50 50 50 50">
  <circle id="mycircle" cx="50" cy="50" r="50" />
</svg>
```

<iframe height="198" style="width: 100%;" scrolling="no" title="svg-example-2" src="https://codepen.io/fanlinqiang/embed/RwwJybV?height=198&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/RwwJybV'>svg-example-2</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

上面代码中，SVG 图像是100像素宽 x 100像素高，viewBox属性指定视口从(50, 50)这个点开始。所以，实际看到的是右下角的四分之一圆。
注意，视口必须适配所在的空间。上面代码中，视口的大小是 50 x 50，由于 SVG 图像的大小是 100 x 100，所以视口会放大去适配 SVG 图像的大小，即放大了四倍。
如果不指定width属性和height属性，只指定viewBox属性，则相当于只给定 SVG 图像的长宽比。这时，SVG 图像的默认大小将等于所在的 HTML 元素的大小。

### SVG嵌在SVG内部

比之HTML，SVG允许你无缝嵌入别的svg元素。因此你可以利用内部svg元素的属性`viewBox`、属性`width`和属性`height`简单创建一个新的坐标系统。

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <svg width="100" height="100" viewBox="0 0 50 50">
    <rect width="50" height="50" />
  </svg>
</svg>
```

<iframe height="197" style="width: 100%;" scrolling="no" title="svg-example-3" src="https://codepen.io/fanlinqiang/embed/BaaVxBY?height=197&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/BaaVxBY'>svg-example-3</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

矩形将是指定的两倍大。

## 元素通用属性
SVG 的 CSS 属性与网页元素有所不同。
### `fill`
填充色
### `fill-opacity`
填充色透明度（合法的范围是：0 - 1）
### `stroke`
描边色
### `stroke-width`
描边色宽
### `stroke-linecap`
表示描边端点表现方式。可用值有：`butt`, `round`, `square`, `inherit`. 

### `stroke-linejoin`

表示描边转角的表现方式。可用值有：`miter`, `round`, `bevel`, `inherit`.


### `stroke-opacity`
笔触颜色的透明度（合法的范围是：0 - 1）
### `stroke-miterlimit`
表示描边相交（锐角）的表现方式。默认大小是4. 什么斜角转斜面的角度损耗之类的意思，值越大，损耗越小。
### `stroke-dasharray`
控制用来描边的点划线的图案范式,它是一个`<length>`和`<percentage>`数列，数与数之间用逗号或者空白隔开，指定**短划线**和**缺口**的长度。如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值。因此，5,3,2等同于5,3,2,5,3,2。
### `stroke-dashoffset`
表示虚线的起始偏移。可选值为：`<percentage>`, `<length>`, `inherit`. 百分比值，长度值，继承。
### `opacity`
定义整个元素的透明值（合法的范围是：0 - 1）


