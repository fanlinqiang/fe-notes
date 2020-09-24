参考：
[媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries)
[CSS3 @media 查询](https://www.runoob.com/cssref/css3-pr-mediaquery.html)

一个媒体查询由一个可选的媒体类型和零个或多个使用媒体功能的限制了样式表范围的表达式组成，例如宽度、高度和颜色。媒体查询，添加自CSS3，允许内容的呈现针对一个特定范围的输出设备而进行裁剪，而不必改变内容本身。

## 语法

媒体查询包含一个可选的媒体类型和媒体特性表达式(0或多个)最终会被解析为true或false。如果媒体查询中指定的媒体类型匹配展示文档所使用的设备类型，并且所有的表达式的值都是true，那么该媒体查询的结果为true。

```html
<!-- link元素中的CSS媒体查询 -->
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />

<!-- 样式表中的CSS媒体查询 -->
<style>
@media (max-width: 600px) {
  .facet_sidebar {
    display: none;
  }
}
</style>
```
当媒体查询为true时，其对应的样式表或样式规则就会遵循正常的级联规则进行应用。即使媒体查询返回false，<link> 标签指向的样式表也将会被下载(但是它们不会被应用)
除非使用not或only操作符，否则媒体类型是可选的，默认值是all(全部).

## 逻辑操作符

使用逻辑操作符，包括not、and和only等，构建复杂的媒体查询。

* `and`操作符用来把多个媒体属性组合成一条媒体查询，对成链式的特征进行请求，只有当每个属性都为真时，结果才为真。
* `not`操作符用来对一条媒体查询的结果进行取反。
* `only`操作符仅在媒体查询匹配成功的情况下被用于应用一个样式，这对于防止让选中的样式在老式浏览器中被应用到。
* 媒体查询不提供'或操作符'，但将多个媒体查询以逗号分隔放在一起；只要其中任何一个为真，整个媒体语句就返回真。相当于`or`操作符。

### and
`and`关键字用于合并多个媒体属性或合并媒体属性与媒体类型。一个基本的媒体查询，即一个媒体属性与默认指定的all媒体类型
```css
@media (min-width: 700px) { ... }
@media (min-width: 700px) and (orientation: landscape) { ... } // 宽度>=700像素且横屏时
@media tv and (min-width: 700px) and (orientation: landscape) { ... } // 仅在电视媒体上，可视区域不小于700像素宽度并且是横屏时有效
```

### not
not关键字仅能应用于整个查询，而不能单独应用于一个独立的查询。
```css
@media not all and (monochrome) { ... }
// 等价于
@media not (all and (monochrome)) { ... }

@media not screen and (color), print and (color)
// 等价于
@media (not (screen and (color))), print and (color)
```

### only
only关键字防止老旧的浏览器不支持带媒体属性的查询而应用到给定的样式
```html
<link rel="stylesheet" media="only screen and (color)" href="example.css" />
```

### 逗号分隔列表

媒体查询中使用逗号分隔效果等同于or逻辑操作符。当使用逗号分隔的媒体查询时，如果任何一个媒体查询返回真，样式就是有效的。逗号分隔的列表中每个查询都是独立的，一个查询中的操作符并不影响其它的媒体查询。这意味着逗号媒体查询列表能够作用于不同的媒体属性、类型和状态。
```css
@media (min-width: 700px), handheld and (orientation: landscape) { ... } // 最小宽度为700像素或是横屏的手持设备上应用
```

## 伪范式
```
media_query_list: <media_query> [, <media_query> ]*
media_query: [[only | not]? <media_type> [ and <expression> ]*]
  | <expression> [ and <expression> ]*
expression: ( <media_feature> [: <value>]? )
media_type: all | aural | braille | handheld | print |
  projection | screen | tty | tv | embossed
media_feature: width | min-width | max-width
  | height | min-height | max-height
  | device-width | min-device-width | max-device-width
  | device-height | min-device-height | max-device-height
  | aspect-ratio | min-aspect-ratio | max-aspect-ratio
  | device-aspect-ratio | min-device-aspect-ratio | max-device-aspect-ratio
  | color | min-color | max-color
  | color-index | min-color-index | max-color-index
  | monochrome | min-monochrome | max-monochrome
  | resolution | min-resolution | max-resolution
  | scan | grid
```

!> 媒体查询是大小写不敏感的，包含未知媒体类型的查询通常返回假。表达式需要用圆括号。没有使用的会引起错误。

### 媒体类型

|值|描述|
|:-|:-|
|all	|用于所有设备|
|aural	|已废弃。用于语音和声音合成器|
|braille	|已废弃。 应用于盲文触摸式反馈设备|
|embossed	|已废弃。 用于打印的盲人印刷设备|
|handheld	|已废弃。 用于掌上设备或更小的装置，如PDA和小型电话|
|print	|用于打印机和打印预览|
|projection	|已废弃。 用于投影设备|
|screen	|用于电脑屏幕，平板电脑，智能手机等。|
|speech	|应用于屏幕阅读器等发声设备|
|tty	|已废弃。 用于固定的字符网格，如电报、终端设备和对字符有限制的便携设备|
|tv	|已废弃。 用于电视和网络电视|

### 媒体功能
|值|描述|
|:-|:-|
|aspect-ratio|	定义输出设备中的页面可见区域宽度与高度的比率|
|color|	定义输出设备每一组彩色原件的个数。如果不是彩色设备，则值等于0|
|color-index|	定义在输出设备的彩色查询表中的条目数。如果没有使用彩色查询表，则值等于0|
|device-aspect-ratio|	定义输出设备的屏幕可见宽度与高度的比率。|
|device-height|	定义输出设备的屏幕可见高度。|
|device-width|	定义输出设备的屏幕可见宽度。|
|grid|	用来查询输出设备是否使用栅格或点阵。如果设备是基于网格的（例如电传打字机终端或只能显示一种字形的电话），该值为1，否则为0。|
|height	|定义输出设备中的页面可见区域高度。整个屏幕或页的高度，而不是仅仅像文档窗口一样的渲染区域）。|
|max-aspect-ratio|	定义输出设备的屏幕可见宽度与高度的最大比率。|
|max-color|	定义输出设备每一组彩色原件的最大个数。|
|max-color-index|	定义在输出设备的彩色查询表中的最大条目数。|
|max-device-aspect-ratio	|定义输出设备的屏幕可见宽度与高度的最大比率。|
|max-device-height|	定义输出设备的屏幕可见的最大高度。|
|max-device-width|	定义输出设备的屏幕最大可见宽度。|
|max-height	|定义输出设备中的页面最大可见区域高度。|
|max-monochrome|	定义在一个单色框架缓冲区中每像素包含的最大单色原件个数。|
|max-resolution	|定义设备的最大分辨率。|
|max-width|	定义输出设备中的页面最大可见区域宽度。|
|min-aspect-ratio|	定义输出设备中的页面可见区域宽度与高度的最小比率。|
|min-color|	定义输出设备每一组彩色原件的最小个数。|
|min-color-index|	定义在输出设备的彩色查询表中的最小条目数。|
|min-device-aspect-ratio|	定义输出设备的屏幕可见宽度与高度的最小比率。|
|min-device-width|	定义输出设备的屏幕最小可见宽度。|
|min-device-height|	定义输出设备的屏幕的最小可见高度。|
|min-height|	定义输出设备中的页面最小可见区域高度。|
|min-monochrome	|定义在一个单色框架缓冲区中每像素包含的最小单色原件个数|
|min-resolution|	定义设备的最小分辨率。|
|min-width|	定义输出设备中的页面最小可见区域宽度。|
|monochrome|	定义在一个单色框架缓冲区中每像素包含的单色原件个数。如果不是单色设备，则值等于0|
|orientation|	定义输出设备中的页面可见区域高度是否大于或等于宽度。|
|resolution	|定义设备的分辨率。如：96dpi, 300dpi, 118dpcm|
|scan|	定义电视类设备的扫描工序。|
|width|	定义输出设备中的页面可见区域宽度。|

### js的媒体查询
[Window.matchMedia()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia)

语法：
```js
mql = window.matchMedia(mediaQueryString)
```
返回一个新的MediaQueryList 对象，表示指定的媒体查询字符串解析后的结果。

```js
/**
window.matchMedia("(min-width: 400px)")

return {
    matches: true
    media: "(min-width: 400px)"
    onchange: null
}
*/
if (window.matchMedia("(min-width: 400px)").matches) { //
  /* the view port is at least 400 pixels wide */
} else {
  /* the view port is less than 400 pixels wide */
}

```

### js 查询当前dpr

```js
window.devicePixelRatio
```
