# js相关
## 下面代码执行顺序，并解释
```js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(function () {
    console.log('setTimeout');
}, 0);

async1();

new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});

console.log('script end');
```

```js
function Byte () {
    getName = function () {
        console.log(1);
    }
    return this;
}
Byte.getName = function () {
    console.log(2);
}
Byte.prototype.getName = function () {
    console.log(3);
}
var getName = function () {
    console.log(4);
}
function getName () {
    console.log(5);
}
Byte.getName();
getName();
Byte().getName();
getName();
new Byte.getName();
new Byte().getName();
```

## 实现函数能够深度克隆任何基本类型。附加题：实现对象中嵌套数组，数组中嵌套对象


## 用过nodejs中的EventEmitter吗？详细讲讲。
## 实现一个类可以完成事件 on, once, trigger, off（订阅-发布模式）
## 讲讲订阅-发布模式，有几种实现方式


## 事件流
## 发布新闻时需要提醒发布的时间。写一个函数，传递一个参数为时间戳，完成时间的格式化。如果发布一分钟内，输出：刚刚；n 分钟前发布，输出：n分钟前；超过一个小时，输出：n小时前；超过一天，输出：n天前；但超过一个星期，输出发布的准确时间
## 格式化数字。输入：12345，输出：12,234；输入：2345.6789，输出：2,345.6789。要求：使用正则和非正则两种方式实现
## 给一段文本，将文本数组化，示例如下：
```js
asd ehe  rjr
d  erregrnt eruk
rth sthst ar   gae

// 输出
[asd, ehe, rjr]
[d, erregrnt, eruk]
[rth, sthst, ar, gae]
```

## new 一个构造函数发生了什么
## new 一个构造函数，如果构造函数返回 return {}、return null，会出现什么情况

## 请实现一个instanceof
```js
/**
  自定义instanceof
*/
function instanceOf(left, right) {
  let proto = left.__proto__
  while(proto){
    if(proto === right.prototype){
       return true
    }
    proto = proto.__proto__
  }  
  return false
}

class A{}
class B extends A {}
class C{}

const b = new B()
// 输出 true
console.log(instanceOf(b,B))
// 输出 true
console.log(instanceOf(b,A))
// 输出 false
console.log(instanceOf(b,C))


```

## 顺序发送 4 个请求 a，b，c，d，要求按照顺序输出，即如果先返回 b，则不输出，再返回 a，输出 a，b
## V8 内存回收机制
> 关键词：老生代，新生代。引用计数、标记清理

## 实现`_.get`
```js
_.get = function (obj, path) {

}
```
## 实现_.cloneDeep

## 长列表优化

## 给定一个JSON 数据，将下划线命名格式的key值转化为驼峰格式的key,如下所示
```js
{
    a_b:{}
    a_c:[]
}
// 转换为
{
    aB:{}
    aC:[]
}
```

## Promise

### 蚂蚁金服createFlow

```js
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const subFlow = createFlow([() => delay(1000).then(() => log("c"))]);

createFlow([
  () => log("a"),
  () => log("b"),
  subFlow,
  [() => delay(1000).then(() => log("d")), () => log("e")],
]).run(() => {
  console.log("done");
});

// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印
```

按照上面的测试用例，实现 createFlow：

* flow 是指一系列 effects 组成的逻辑片段。
* flow 支持嵌套。
* effects 的执行只需要支持串行。

```js
function createFlow(effects = []) {
  let sources = effects.slice().flat();
  function run(callback) {
    while (sources.length) {
      const task = sources.shift();
      if (typeof task === "function") {
        const res = task();
        if (res?.then) {
          res.then(createFlow(sources).run);
          break;
        }
      } else if (task?.isFlow) {
        task.run(createFlow(sources).run);
        break;
      }
    }
    // 在所有任务执行完毕后 执行传入的回调函数
    callback?.();
  }
  return {
    run,
    isFlow: true,
  };
}

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));
createFlow([
  () => console.log("a"),
  () => console.log("b"),
  createFlow([() => console.log("c")]),
  [() => delay().then(() => console.log("d")), () => console.log("e")],
]).run();
```

```js
function isFunction (arg) {
    return Object.prototype.toString.call(arg) === '[object Function]';
}
function isFlow (arg) {
    return arg instanceof Flow;
}
class Flow {
    constructor(effects) {
        this.effects = effects;
    }
    async run (callBack) {
        let {effects} = this;
        await effects.reduce((res, item) => {
            return res.then(() => {
                if (isFunction(item)) {
                    return Promise.resolve(item());
                } else if (isFlow(item)) {
                    return Promise.resolve(item.run());
                } else if (Array.isArray(item)) {
                    return Promise.resolve(new Flow(item).run());
                }
            });
        }, Promise.resolve());
        callBack && callBack();
    }
}

function createFlow (effects) {
    return new Flow(effects);
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const subFlow = createFlow([() => delay(1000).then(() => log("c"))]);
const log = console.log;

createFlow([
  () => log("a"),
  () => log("b"),
  subFlow,
  [() => delay(1000).then(() => log("d")), () => log("e")],
]).run(() => {
  console.log("done");
});
```

### 如何让display出现“动画”

```js
test.onclick = function () {
    const app = document.querySelector('#app')
    console.log(app, 'app')
    app.style.display = "block"
    // 读取dom的这些特殊属性时，浏览器就会强制清空渲染队列一次，拿到最新的值。也就是说读取的时候，其实已经是display为"block"了，因此。出现了过渡动画
    const height = app.offsetHeight
    app.style.transform = "translateX(200px)"
    // 要注意的一点是，除了手动读取特殊属性清空浏览器渲染队列外，浏览器也会有自己的一个队列阀值，当达到后，会自动清空。这就是为什么在一个for循环里面多次操作DOM，但是它不会真的渲染那么多次的原因，因为浏览器帮我们维护了一个队列，择机渲染。
}
```
