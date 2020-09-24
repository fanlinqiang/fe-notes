## 计算两个颜色之间的渐变色值

```js
let colorManager = { // 颜色管理
    start: '#FCBA67',
    end: '#DF0902',
    current: ''
}
let status = {
    bin: 1, // 当前所在
    total_bins: 4 // 总长度，总份数
}
// 十六进制转rgb
function hexToRgb(hex) {
    let rgb = [];
    for(let i = 1; i < 7; i += 2){
        rgb.push(parseInt("0x" + hex.slice(i,i+2)));
    }
    return rgb;
}
// rgb转十六进制
function rgbToHex(r, g, b) {
    let hex = ((r<<16) | (g<<8) | b).toString(16);
    return "#" + new Array(Math.abs(hex.length-7)).join("0") + hex;
}
// 计算当前状态渐变颜色值
let {start, end} = colorManager;
let {total_bins, bin} = status;
//将hex转换为rgb
let sColor = hexToRgb(start),
    eColor = hexToRgb(end);
//计算R\G\B每一步的差值
let rStep = (eColor[0] - sColor[0]) / total_bins,
    gStep = (eColor[1] - sColor[1]) / total_bins,
    bStep = (eColor[2] - sColor[2]) / total_bins;
// 打表
/*let gradientColorArr = [];
for(let i = 0; i < total_bins; i++){
    //计算每一步的hex值
    gradientColorArr.push(rgbToHex(parseInt(rStep * i + sColor[0]), parseInt(gStep * i + sColor[1]), parseInt(bStep * i + sColor[2])));
}*/
// 获取当前阶段的色值
colorManager.current = rgbToHex(parseInt(rStep * bin + sColor[0]), parseInt(gStep * bin + sColor[1]), parseInt(bStep * bin + sColor[2]))
```
