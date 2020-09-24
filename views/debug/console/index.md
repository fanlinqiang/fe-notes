# console

首先查看下chrome控制台中，提供了哪些console的方法

```js
Object.getOwnPropertyNames(console)
// ["debug", "error", "info", "log", "warn", "dir", "dirxml", "table", "trace", "group", "groupCollapsed", "groupEnd", "clear", "count", "countReset", "assert", "profile", "profileEnd", "time", "timeLog", "timeEnd", "timeStamp", "context", "memory"]
```

|方法|	描述|
|:-|:-|
|assert()|	如果断言为 false，则在信息到控制台输出错误信息。|
|clear()|	清除控制台上的信息。|
|count()|	记录 count() 调用次数，一般用于计数。|
|error()|	输出错误信息到控制台|
|group()|	在控制台创建一个信息分组。 一个完整的信息分组以 console.group() 开始，console.groupEnd() 结束|
|groupCollapsed()|	在控制台创建一个信息分组。 类似 console.group() ，但它默认是折叠的。|
|groupEnd()|	设置当前信息分组结束|
|info()|	控制台输出一条信息|
|log()|	控制台输出一条信息|
|table()|	以表格形式显示数据|
|time()|	计时器，开始计时间，与 timeEnd() 联合使用，用于算出一个操作所花费的准确时间。|
|timeEnd()|	计时结束|
|trace()|	显示当前执行的代码在堆栈中的调用路径。|
|warn()|	输出警告信息，信息最前面加一个黄色三角，表示警告|


## console.log
