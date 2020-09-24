## 监听滚动条滚动停止

#### 需求

> 监听dom元素滚动结束

#### 思路
* 当前JavaScript并没有提供对应的监听api
* 监听浏览器滚动事件( onscroll )
* 事件触发的时候获取当前的scrollTop( t1 )，执行isScrollEnd函数( 建议延迟500 )
* 在isScrollEnd函数种再获取当前的scrollTop( t2 )
* 拿t2跟t1进行比较，看是否相等，相等的话说明滚动条停止了滚动

```js
let t1 = 0;
let t2 = 0;
let timer = null; // 定时器

// scroll监听
document.onscroll = function() {
  clearTimeout(timer);
  timer = setTimeout(isScrollEnd, 1000);
  t1 = document.documentElement.scrollTop || document.body.scrollTop;
}

function isScrollEnd() {
  t2 = document.documentElement.scrollTop || document.body.scrollTop;
  if(t2 == t1){
    console.log('滚动结束了')
  }
}
```
