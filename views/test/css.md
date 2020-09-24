# css相关
## display的取值和各种值的区别？
## 相邻的两个inline-block节点为什么会出现间隔，该如何解决？
## css div 垂直水平居中，并完成 div 高度永远是宽度的一半（宽度可以不指定）
```sass
height: 0
padding: 25% 0
```
## 3个div，第一个高度100px，第三个高度100px，要求第二个高度自适应
> 解法一: 通过计算属性高度使第二个高度自适应
```html
<style>
.d {
    &:nth-of-type(1) {
        height: 100px;
        background: #ff0000;
    }
    &:nth-of-type(2) {
        height: calc(100vh - 200px);
        background: #00ff00;
    }
    &:nth-of-type(3) {
        height: 100px;
        background: #0000ff;
    }
}
</style>
<div class="d">A</div>
<div class="d">B</div>
<div class="d">C</div>
```
> 通过flex布局
```html
<style>
.flex{
    display:flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    height: 500px;
}
.d {
    &:nth-of-type(1) {
        height: 100px;
        background: #ff0000;
    }
    &:nth-of-type(2) {
        flex-grow: 1;
        background: #00ff00;
    }
    &:nth-of-type(3) {
        height: 100px;
        background: #0000ff;
    }
}
</style>
<div class="flex">
    <div class="d">A</div>
    <div class="d">B</div>
    <div class="d">C</div>
</div>
```

# 移动端
## H5 项目如何适配
