## transition

教程： [CSS3 transition 属性](http://www.w3school.com.cn/cssref/pr_transition.asp)


在浏览器中，一个元素从一个状态转变成另一个状态，我们称发生了过渡(transition)。浏览器负责来渲染状态变化过程中的每一帧从而创建一个动画效果。

语法：
```css
transition: property duration timing-function delay
```

|值	|描述|
|:-|:-|
|transition-property	|规定设置过渡效果的 CSS 属性的名称。|
|transition-duration|	规定完成过渡效果需要多少秒或毫秒(如：5s)。默认值是 0，意味着不会有效果|
|transition-timing-function	|规定速度效果的速度曲线。|
|transition-delay	|定义过渡效果何时开始，值以秒或毫秒计。默认值为0|

### transition-property

语法：
```css
transition-property: none|all|property;
```
|值	|描述|
|:-|:-|
|none	|没有属性会获得过渡效果。|
|all	|所有属性都将获得过渡效果。|
|property	|定义应用过渡效果的 CSS 属性名称列表，列表以逗号分隔。|

### transition-timing-function

语法：
```css
transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n)
```

|值	|描述|
|:-|:-|
|linear	|规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。|
|ease	|规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。|
|ease-in	|规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。|
|ease-out	|规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。|
|ease-in-out	|规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。|
|cubic-bezier(n,n,n,n)	|在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。可以使用[https://cubic-bezier.com/](https://cubic-bezier.com/)生成|
|step(n, start|end)|steps有两个参数，第一个参数指的是将动画分成的帧数，第二个参数默认值是end。start 表示要过渡的属性值会在开始时就立马变成第一个步进点(this first step)对应的属性值，并保持一个步进的时间(step duration)，而 end 表示要过渡的属性值在开始的时候并不会立马改变，而是在保持一个步进时间之后，变成第一个步进点的属性值|




### shiny
<iframe height="168" style="width: 100%;" scrolling="no" title="transition-shiny" src="https://codepen.io/fanlinqiang/embed/abNarBO?height=168&theme-id=light&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/abNarBO'>transition-shiny</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
