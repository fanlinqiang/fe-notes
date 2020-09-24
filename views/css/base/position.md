## position

> 详见[MDN:position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)
> [css-position-sticky](https://www.zhangxinxu.com/wordpress/2018/12/css-position-sticky/)

### static

该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。

### relative

生成相对定位的元素，相对于其正常位置进行定位。一般用作标识绝对定位的参照物， 不脱离⽂档流的布局，只改变⾃身的位置，在⽂档流原先的位置遗留空⽩区域。定位的起始位置为此元素原先在⽂档流的位置。例如：

```sass
// 相对于正常位置平移20像素，原位置空间仍保留
position: relative
left: 20px
```

!> position:relative 对 `table-*-group`, `table-row`, `table-column`, `table-cell`, `table-caption` 元素无效。

### absolute

绝对定位的元素，脱离文档流，相对于定义或通过继承后属性(计算后位置属性)为`relative`、`absolute`、`fixed`、`sticky`最近一个祖先元素进行定位，否则为Body⽂档本身。若元素无固定的宽/高声明则会对该元素进行拉伸。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。

### fixed

元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。

### sticky

粘性定位元素,元素根据正常文档流进行定位，然后相对它的最近滚动祖先（nearest scrolling ancestor）和 containing block (最近块级祖先 nearest block-level ancestor)，包括table-related元素，基于top, right, bottom, 和 left的值进行偏移。偏移值不会影响任何其他元素的位置。
该值总是创建一个新的层叠上下文（stacking context）。注意，一个sticky元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的overflow 是 hidden, scroll, auto, 或 overlay时），即便这个祖先不是真的滚动祖先。

position:sticky是一个新的css3属性，它的表现类似position:relative和position:fixed的合体，在目标区域在屏幕中可见时，它的行为就像position:relative; 而当页面滚动超出目标区域时，它的表现就像position:fixed，它会固定在目标位置。

### inherit

规定应该从父元素继承 position 属性的值。若父元素没有定义定位即默认值static

### initial

initial 关键字用于设置 CSS 属性为它的默认值，可作用于任何 CSS 样式。（IE 不支持该关键字）

### unset

名如其意，unset 关键字我们可以简单理解为不设置。其实，它是关键字 `initial` 和 `inherit` 的组合。当我们给一个 CSS 属性设置了 `unset` ，则：

* 如果该属性是默认继承属性，该值等同于 inherit
* 如果该属性是非继承属性，该值等同于 initial
