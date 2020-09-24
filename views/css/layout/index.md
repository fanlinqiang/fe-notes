## 圣杯布局
### 要求

- 上部(header)和下部(footer)各自占领屏幕所有宽度。
- 上下部之间的部分(container)是一个三栏布局。
- 三栏布局两侧宽度不变，中间部分自动填充整个区域。
- 中间部分的高度是三栏中最高的区域的高度。

!> 圣杯布局的核心：重要的内容先加载

```pug
.header
    h4 header
.container
    .middle
        h4 middle
        p middle-content
    .left
        h4 left
        p left-content
    .right
        h4 right
        p right-content
.footer
    h4 footer
```
### 实现方法1：浮动+负边距
!> 浮动方法，当页面宽度小到一定程度（两侧固定宽度之和+中间最小宽度（再小就换行））时，圣杯布局是要乱掉的。

```sass
.header, .footer
    border: 1px solid #333
    background: #ccc
    text-align: center
.footer
    clear: both
.container
    padding: 0 220px 0 200px
    overflow: hidden
.left, .middle, .right
    position: relative
    float: left
    min-height: 130px
.middle
    width: 100%
    background: blue
.left
    margin-left: -100%
    left: -200px
    width: 200px
    background: red
.right
    margin-left: -220px
    right: -220px
    width: 220px
    background: green
```
<iframe height="387" style="width: 100%;" scrolling="no" title="圣杯布局" src="//codepen.io/fanlinqiang/embed/preview/qLeyPg/?height=387&theme-id=0&default-tab=css,resultundefined" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/qLeyPg/'>圣杯布局</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 实现方法2：flex弹性盒子
弹性布局是最适合实现圣杯布局的方法了，相较浮动，弹性布局的结构更清楚，更好理解，也不用担心移动端的适配问题。

!> 因为圣杯布局的一个核心是重要的内容先加载，因此这里使用了flex布局的order属性来定义容器的优先级

```sass
.header, .footer
    border: 1px solid #333
    background: #ccc
    text-align: center
.container
    display: flex
.left
    width: 200px
    background: red
    order: 0
.middle
    flex: 1
    order: 1
    background: blue
.right
    width: 220px
    background: green
    order: 2
```

<iframe height="342" style="width: 100%;" scrolling="no" title="pqMZOp" src="//codepen.io/fanlinqiang/embed/preview/pqMZOp/?height=342&theme-id=0&default-tab=css,resultundefined" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/fanlinqiang/pen/pqMZOp/'>pqMZOp</a> by flqbestboy
  (<a href='https://codepen.io/fanlinqiang'>@fanlinqiang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

