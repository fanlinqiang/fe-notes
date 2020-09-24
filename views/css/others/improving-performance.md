## 提高性能

### 浏览器会从右到左解析 CSS 选择器
```css
.content_box p a {
    // ...
}
```
浏览器会对上面的例子做如下的步骤处理：
1. 首先找到页面所有的 `<a>` 元素
2. 然后向上找到被 `<p> `元素包裹的 `<a> `元素
3. 再向上查找到一直到 `.content_box` 的元素

从上面的步骤我们可以看出，越靠右的选择器越具有唯一性，浏览器解析 CSS 属性的效率就越高。建议换成使用具体的 class 编写 CSS 代码。

### 避免 reflow 风险
修改某些 CSS 属性会导致整个页面布局的重绘( repaint )/重排( reflow )。
repaint 的速度远快于 reflow，所以避免 reflow 更重要
导致 repaint 和 reflow 的原因：
1. DOM 元素的添加、修改、删除（repaint、reflow）
2. 仅仅修改 DOM 元素的字体颜色（repaint，不需要调整布局）
3. 应用新的样式或者修改任何影响元素外观的属性（repaint、reflow）resize，页面滚动（repaint、reflow）
4. 读取元素的某些属性（offsetTop/Left/Width/Height、getComputedStyle、scrollTop/Left/Width/Height、clientTop/Left/Width/Height等）（repaint、reflow）

如果在大量的元素上更改这些属性，那么计算和更新他们的位置/大小需要花费很长的时间。
