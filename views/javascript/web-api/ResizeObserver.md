## ResizeObserver

> [MDN: ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)

ResizeObserver 接口可以监听到 Element 的内容区域或 SVGElement的边界框改变。内容区域则需要减去内边距padding。
ResizeObserver避免了在自身回调中调整大小，从而触发的无限回调和循环依赖。它仅通过在后续帧中处理DOM中更深层次的元素来实现这一点。如果（浏览器）遵循规范，只会在绘制前或布局后触发调用。

### 语法

* ResizeObserver()，创建并返回一个ResizeObserver对象。
* ResizeObserver.disconnect()， 取消和结束目标对象上所有对 Element或 SVGElement 观察。
* ResizeObserver.observe()，开始观察指定的 Element或 SVGElement。
* ResizeObserver.unobserve()，结束观察指定的Element或 SVGElement。

### 示例

```
const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    entry.target.style.borderRadius = Math.max(0, 250 - entry.contentRect.width) + 'px';
  }
});
resizeObserver.observe(document.querySelector('.box:nth-child(2)'));
```

### 兼容性

[element-resize-detector](https://github.com/wnr/element-resize-detector)
