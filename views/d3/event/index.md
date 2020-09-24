## Event

### 事件委托

```js
svg.on('click', function () {
    let event = d3.event;
    let target =  event.srcElement;  //  获取事件发生源
    let tagName = target.tagName;
    let isCircle = tagName === 'circle';
    let isLine = tagName === 'line';
    if (isCircle || isLine) {
        let {offsetX: left, offsetY: top} = event;
        let {color} = d3.select(target).datum(); //  获取事件发生源的数据
        if (isCircle) { // 节点类型
            let labelBg = d3.color(color);
            labelBg.opacity = 0.1;
            tooltip.innerHTML = `
                <div class="label" style="color:${color};background:${labelBg}">Colleague</div>
                <div class="title">UNIT 11 SPG 34 TAMAN ALAM KG BERIBI JLN TELANAI</div>
                <div class="info">MASZALINA EVENT MANAGEMENT & SERVICES</div>
            `
        } else if (isLine) { // 连线类型
            tooltip.innerHTML = `
                <div class="title">Kelvin Ling Guong Chi</div>
                <div class="info">ICMale Age 18</div>
            `
        }
        // 切换样式
        tooltip.classList.toggle("circle", isCircle);
        tooltip.classList.toggle("line", isLine);
        let transformY = `0`;
        let transformX = `0`;
        if (left + 300 > WIDTH) {
            transformX = `-100%`;
            left -= 10;
        } else {
            left += 10;
        }
        if (top + 100 > HEIGHT) {
            transformY = `-100%`;
            top -= 10;
        } else {
            top += 10;
        }
        Object.assign(tooltip.style, {
            borderColor: color,
            display: 'block',
            top: `${top}px`,
            left: `${left}px`,
            transform: `translate(${transformX}, ${transformY})`
        });
    } else {
        tooltip.style.display = 'none';
    }
});
```

### 按需引入时`d3.event === null`

按需引入：
```js
const d3  = Object.assign({}, require('d3-selection'), require('d3-force'));
```

发现在触发事件时无法拿到对应的event为null，这是因为官方说明:：
> If you use Babel, Webpack, or another ES6-to-ES5 bundler, be aware that the value of d3.event changes during an event! An import of d3.event must be a live binding, so you may need to configure the bundler to import from D3’s ES6 modules rather than from the generated UMD bundle; not all bundlers observe jsnext:main. Also beware of conflicts with the window.event global.

如果你使用 Babel, Webpack 或者其他的 ES6 转 ES5 的打包工具，要注意 d3.event 的值在事件中的变化！导入的 d3.event 必须是 live binding(动态绑定) 的，因此你需要将打包配置设置为引入 D3 的 ES6 模块而不是生成的 UMD；并不是所有的打包工具都识别 jsnext:main。也要注意与 window.event 的冲突。

解决方法一：

文档说的动态绑定就是在事件处理函数里面手动引入d3.event, 而不是在全局引入, 如下:
```js
function dragged() {
    const { event } = require("d3-selection");//动态引入event
    self.view
      .select(".output")
      .attr("transform", `translate(0, ${event.y - self.y0 + self.viewY})`);
}
```

解决方法二：

```js
const d3Selection = require("d3-selection")
const d3  = Object.assign({}, require('d3-selection'), require('d3-force'));

// 使用时
selection.on('click', (d, i)={
   const event = d3Selection.event;
})
```
