## IntersectionObserver

https://github.com/justjavac/the-front-end-knowledge-you-may-not-know/issues/10
https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API

#### 简介
------
* 你想跟踪 DOM 树里的一个元素，当它进入可视区域时得到通知(曝光埋点等)。
* 你想实现延迟加载图片功能
* 你需要知道用户是否真的在看一个广告 banner。

你可以通过绑定 `scroll` 事件或者用一个周期性的定时器，然后在回调函数中调用元素的`getBoundingClientRect()`获取元素位置实现这个功能。但是，这种实现方式性能极差，因为每次调用 `getBoundingClientRect()` 都会强制浏览器 重新计算整个页面的布局 ，可能给你的网站造成相当大的闪烁。
`IntersectionObserver` 就是为此而生的，它可以检测一个元素是否可见，`IntersectionObserver` 能让你知道一个被观测的元素什么时候进入或离开浏览器的视口。
