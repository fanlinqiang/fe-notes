


## animation

语法：
```css
animation: name duration timing-function delay iteration-count direction;
```

|值	|描述|
|:-|:-|
|animation-name	|规定需要绑定到选择器的 keyframe 名称。取值为：`keyframename\|none`|
|animation-duration	|规定完成动画所花费的时间，以秒或毫秒计。|
|animation-timing-function	|规定动画的速度曲线。内置`function`同`transition-timing-function`|
|animation-delay	|规定在动画开始之前的延迟。|
|animation-iteration-count	|规定动画应该播放的次数。默认值为1，可取值`n\|infinite`|
|animation-direction	|规定是否应该轮流反向播放动画。可取值`normal\|alternate`|
|animation-play-state| 规定动画是否正在运行或暂停。默认是 `running`。可取值` paused\|running`|
|animation-fill-mode|规定对象动画时间之外的状态。|

### animation-fill-mode

animation-fill-mode 属性规定动画在播放之前或之后，其动画效果是否可见。
语法：
```css
animation-fill-mode : none | forwards | backwards | both;
```
|值	|描述|
|:-|:-|
|none	|不改变默认行为。|
|forwards	|当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）。|
|backwards	|在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）。|
|both	|向前和向后填充模式都被应用。|

详解见：[animation-fill-mode](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-fill-mode)
