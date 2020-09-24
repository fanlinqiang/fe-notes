
>文字不换行，超出容器，滚动显示；未超出的文本不滚动；

```pug
.container
    p 昨夜雨疏风骤,浓睡不消残酒
    p 试问卷帘人,却道海棠依旧
    p 知否 知否
    p 应是绿肥红瘦
```

```sass

.container
    width: 120px
    overflow: hidden
    padding: 10px
    
    p
        white-space: nowrap
        width: fit-content
        min-width: 100%
        animation: scroll 3s linear infinite alternate
@keyframes scroll
    0%, 20%
        transform: translateX(0px)
    80%,100%
        transform: translateX(calc(-100% + 120px))

       
```

<iframe height="265" style="width: 100%;" scrolling="no" title="文字滚屏效果" src="//codepen.io/fanlinqiang/embed/bJbZwO/?height=265&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/bJbZwO/'>文字滚屏效果</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
