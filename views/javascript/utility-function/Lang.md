## Lang

### isType
```js
function isType (value, type) {
  return Object.prototype.toString.call(value) === '[object ' + type + ']';
}
```
### isNil
检查 value 是否是 null 或者 undefined。
```js
function isNil (value) {
    /**
    * isNil(null) => true
    * isNil() => true
    */
    return value === null || value === undefined;
    // lodash中
    // return value == null
}
```
### isObject
```js
function isObject (value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
```
### cloneDeep
[如何写出一个惊艳面试官的深拷贝](https://juejin.im/post/5d6aa4f96fb9a06b112ad5b1?utm_source=gold_browser_extension)
