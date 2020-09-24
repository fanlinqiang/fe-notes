## `transform`变换

### `translate`平移
```
<svg width="200" height="50">
    <rect x="0" y="0" width="20" height="10" fill="red "/>
    <rect x="0" y="0" width="20" height="10" transform="translate(10, 20)"/>
</svg>
```
<iframe height="178" style="width: 100%;" scrolling="no" title="svg-example-17" src="https://codepen.io/fanlinqiang/embed/KKKeeWM?height=178&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/KKKeeWM'>svg-example-17</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### `rotate`旋转
```
// angle 旋转角度，>0 顺时针
// [centerX, centerY] 旋转中心点
rotate(angle, [centerX, centerY]) 
```
```html
<svg width="200" height="50">
    <rect x="20" y="0" width="20" height="10" fill="red "/>
    <rect x="20" y="0" width="20" height="10" transform="rotate(30)" fill="green"/>
    <rect x="20" y="0" width="20" height="10" transform="rotate(-180, 20, 10)"/>
</svg>
```

<iframe height="152" style="width: 100%;" scrolling="no" title="svg-example-18" src="https://codepen.io/fanlinqiang/embed/zYYaaZE?height=152&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/zYYaaZE'>svg-example-18</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### `scale`缩放
```
// scaleX,scaleY分别表示水平垂直方向的缩放比例，如0.5表示缩小半
// 若无scaleY则，其值默认等于scaleX
scale(scaleX [, scaleY]) 
```
```html
<svg width="200" height="50">
    <rect x="20" y="0" width="20" height="10" fill="red "/>
    <rect x="40" y="0" width="20" height="10" transform="scale(0.8)" fill="green"/>
    <rect x="60" y="0" width="20" height="10" transform="scale(1, 2)"/>
</svg>
```

<iframe height="202" style="width: 100%;" scrolling="no" title="svg-example-19" src="https://codepen.io/fanlinqiang/embed/RwwJJpv?height=202&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/RwwJJpv'>svg-example-19</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### `skewX`和`shewY`斜切
```
skewY(angle)
skewX(angle)
```
```html
<svg width="200" height="50">
    <rect x="20" y="0" width="20" height="40" fill="red" transform="skewY(10) skewX(10)"/>
    <rect x="40" y="0" width="20" height="40" fill="green" transform="skewY(10)"/>
    <rect x="60" y="0" width="20" height="40" transform="skewX(10)"/>
</svg>
```

<iframe height="165" style="width: 100%;" scrolling="no" title="svg-example-20" src="https://codepen.io/fanlinqiang/embed/GRRGGWL?height=165&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/GRRGGWL'>svg-example-20</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


