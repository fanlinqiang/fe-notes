## 页面隐藏

不知道用户是不是正在与页面交互，这是困扰广大 Web 开发人员的一个主要问题。如果页面最小 化了或者隐藏在了其他标签页后面，那么有些功能是可以停下来的，比如轮询服务器或者某些动画效果。 而 Page Visibility API(页面可见性 API)就是为了让开发人员知道页面是否对用户可见而推出的。

|API|描述|
|:-|:-|
|document.hidden|表示页面是否隐藏的布尔值。页面隐藏包括页面在后台标签页中或者浏览器最小化。|
|document.visibilityState|4 个可能状态的值：1. 页面在后台标签页中或浏览器最小化；2. 页面在前台标签页中。3. 实际的页面已经隐藏，但用户可以看到页面的预览(就像在 Windows 7 中，用户把鼠标移动到任务栏的图标上，就可以显示浏览器中当前页面的预览)。4. 页面在屏幕外执行预渲染处理。同一状态在不同浏览器下返回的值可能不同|
|visibilitychange 事件|当文档从可见变为不可见或从不可见变为可见时，触发该事件。|

IE 的版本是在每个属性或事件前面加 上 ms 前缀，而 Chrome 则是加上 webkit 前缀。因此 document.hidden 在 IE 的实现中就是 document.msHidden，而在 Chrome 的实现中则是 document.webkitHidden。检查浏览器是否支持
这个 API 的最佳方式如下:

```
function isHiddenSupported(){
    return typeof (document.hidden || document.msHidden ||
}
```

类似地，使用同样的模式可以检测页面是否隐藏:

```
if (document.hidden || document.msHidden || document.webKitHidden){ 
    //页面隐藏了
} 
else { 
    //页面未隐藏
}
```

!> 注意，以上代码在不支持该 API 的浏览器中会提示页面未隐藏。这是 Page Visibility API 有意设计的 结果，目的是为了向后兼容。

为了在页面从可见变为不可见或从不可见变为可见时收到通知，可以侦听 visibilitychange 事 件。在 IE 中，这个事件叫 msvisibilitychange，而在 Chrome 中这个事件叫 webkitvisibilitychange。为了在两个浏览器中都能侦听到该事件，可以像下面的例子一样，为每个事件都指定相同的 事件处理程序:

```
function handleVisibilityChange(){
    let output = document.getElementById("output"),
    let msg = null;
    if (document.hidden || document.msHidden || document.webkitHidden){ 
        msg = "Page is now  hidden. " + (new Date()) + "<br>";
    } else {
        msg = "Page is now visible. " + (new Date()) + "<br>";
    }
    output.innerHTML += msg;
}
document.addEventListener('msvisibilitychange', handleVisibilityChange);
document.addEventListener('webkitvisibilitychange', handleVisibilityChange);
```
