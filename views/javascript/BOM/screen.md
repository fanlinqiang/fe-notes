## screen对象

screen 对象基本上只 用来表明客户端的能力，其中包括浏览器窗口外部的显示器的信息，如像素宽度和高度等。每个浏览器 中的 screen 对象都包含着各不相同的属性，下表列出了所有属性及支持相应属性的浏览器。

|属 性|说明|IE|Firefox|Safari/ Chrome|Opera
|:-|:-|:-|:-|:-|:-|
|availHeight|IE 屏幕的像素高度减系统部件高度之后的值(只读)|T|T|T|T|
|availLeft|未被系统部件占用的最左侧的像素值(只读)||T|T||
|availTop|未被系统部件占用的最上方的像素值(只读)||T|T||
|availWidth|屏幕的像素宽度减系统部件宽度之后的值(只读)|T|T|T|T|
|bufferDepth|读、写用于呈现屏外位图的位数|T||||
|colorDepth|用于表现颜色的位数;多数系统都是32(只读)|T|T|T|T|
|deviceXDPI|屏幕实际的水平DPI(只读)|T||||
|deviceYDPI|屏幕实际的垂直DPI(只读)|T||||
|fontSmooth- ingEnabled|表示是否启用了字体平滑(只读)|T||||
|height|屏幕的像素高度|T|T|T|T|
|left|当前屏幕距左边的像素距离||T||| 
|logicalXDPI|屏幕逻辑的水平DPI(只读)|T|||| 
|logicalYDPI|屏幕逻辑的垂直DPI(只读)|T|||| 
|pixelDepth|屏幕的位深(只读)||T|T|T|
|top|当前屏幕距上边的像素距离||||| 
|updateInterval||T|||| 
|width|读、写以毫秒表示的屏幕刷新时间间隔|T|T|T|T|

这些信息经常集中出现在测定客户端能力的站点跟踪工具中，但通常不会用于影响功能。不过，有 时候也可能会用到其中的信息来调整浏览器窗口大小，使其占据屏幕的可用空间，例如:

```js
window.resizeTo(screen.availWidth, screen.availHeight);
```
前面曾经提到过，许多浏览器都会禁用调整浏览器窗口大小的能力，因此上面这行代码不一定在所 有环境下都有效。
涉及移动设备的屏幕大小时，情况有点不一样。运行 iOS 的设备始终会像是把设备竖着拿在手里一 样，因此返回的值是 768×1024。而 Android 设备则会相应调用 screen.width 和 screen.height 的值。
 
