## 点击按钮波纹
>`:active` CSS伪类匹配被用户激活的元素。它让页面能在浏览器监测到激活时给出反馈。当用鼠标交互时，它代表的是用户按下按键和松开按键之间的时间。 :active 伪类通常用来匹配tab键交互。通常用于但并不限于 `<a>` 和 `<button>` HTML元素。
这个样式可能会被后声明的其他链接相关的伪类覆盖，这些伪类包括 `:link`，`:hover`和 `:visited`。为了正常加上样式，需要把 `:active`的样式放在所有链接相关的样式后，这种链接伪类先后顺序被称为LVHA顺序: `:link`
 — `:visited` — `:hover` — `:active`。

---

```pug
.btn.ripple  Button
```
```sass

.btn
  width: 200px
  height: 40px
  border-radius: 4px
  text-align: center
  line-height: 40px
  border: 1px solid #ccc
.ripple
    position: relative
    //隐藏溢出的径向渐变背景
    overflow: hidden

.ripple:after
    content: ""
    display: block
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
    pointer-events: none
    //设置径向渐变
    background-image: radial-gradient(circle, #A7A6DD 10%, transparent 10.01%)
    background-repeat: no-repeat
    background-position: 50%
    transform: scale(10, 10)
    opacity: 0
    transition: transform .3s, opacity .5s

.ripple:active:after
    transform: scale(0, 0)
    opacity: .3
    //设置初始状态
    transition: 0s

```
<iframe height="265" style="width: 100%;" scrolling="no" title="CSS实现按钮点击波纹效果" src="//codepen.io/fanlinqiang/embed/gEJvrj/?height=265&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/gEJvrj/'>CSS实现按钮点击波纹效果</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 文字滚屏效果
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


[underline-wave](./underline-wave.md ':include')

[text-neon-light](./text-neon-light.md ':include')



[others](./others.md ':include')

