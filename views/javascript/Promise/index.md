Promise 是异步编程的一种解决方案，它代表了一个异步操作的最终完成或者失败，比传统的解决方案——回调函数和事件——更合理和更强大。

经典的回调地狱问题：
```js
// 多个(异步)任务有序执行，往往通过回调函数的方式实现
job1 (function () {
    job2 (function () {
        job3 (function (){
            ... ...
        });
    });
});
```
使用promise实现：
```js
new Promise(function (resolve, reject) => {
    job1();
    resolve();
}).then(() => {
    jb2();
}).then(() => {
    jb3();
});
```

在使用 Promise 时，会有以下约定：
* 在 本轮 [Javascript event loop（事件循环）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)运行完成 之前，回调函数是不会被调用的。
* 通过 then() 添加的回调函数总会被调用，即便它是在异步操作完成之后才被添加的函数。
* 通过多次调用 then()，可以添加多个回调函数，它们会按照插入顺序一个接一个独立执行。

## 手写Promise

可以把 Promise 看成一个状态机。初始是 pending 状态，可以通过函数 resolve 和 reject ，将状态转变为 resolved 或者 rejected 状态，状态一旦改变就不能再次 变化。
then 函数会返回一个 Promise 实例，并且该返回值是一个新的实例而不是之前的 实例。因为 Promise 规范规定除了 pending 状态，其他状态是不可以改变的，如果返回的是一个相同实例的话，多个 then 调用就失去意义了。
对于 then 来说，本质上可以把它看成是 flatMap

```js
// 三种状态
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

// promise 接收一个函数参数，该函数会立即执行


```
