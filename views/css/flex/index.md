## flex

### overflow失效

左右布局：左边宽度要自适应，而且需求是当内容超出时需要滚动条
```css
.container {
    display: flex;
}
.left {
    flex: 1;
    overflow: auto;
    width: 0 // 可以通过添加width等于0解决
}
.right {
    width: 500px;
}
```
