## CSS导航栏下划线跟随效果

> 来源：[CSS导航栏下划线跟随效果](https://github.com/chokcoco/iCSS/issues/33)

```pug
// 来源https://github.com/chokcoco/iCSS/issues/33
ul
  li 不可思议的CSS
  li 导航栏
  li 光标下划线跟随
```
```sass
ul 
    display: flex
    position: absolute
    width: 800px
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
li 
    position: relative
    padding: 20px
    font-size: 24px
    color: #000
    line-height: 1
    transition: 0.2s all linear
    cursor: pointer
    &::before 
        content: ""
        position: absolute
        top: 0
        left: 100%
        width: 0
        height: 100%
        border-bottom: 2px solid #000
        transition: 0.2s all linear
    &:hover::before 
        width: 100%
        top: 0
        left: 0
        transition-delay: 0.1s
        border-bottom-color: #000
        z-index: -1
    &:hover ~ li::before 
        left: 0
    &:active 
        background: #000
        color: #fff
```

<iframe height="224" style="width: 100%;" scrolling="no" title="不可思议的CSS光标下划线跟随效果" src="https://codepen.io/fanlinqiang/embed/KKKrBWp?height=224&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/KKKrBWp'>不可思议的CSS光标下划线跟随效果</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


