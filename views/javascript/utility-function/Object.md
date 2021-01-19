## Object

### get
用法同lodash的get
```js
function get (object, path, defaultValue) {
    return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
            .reduce((obj, key) => (obj || {})[key], object) || defaultValue;
}
```

```js
function get(object, path) {
    let keys = path.replace(/\.?\[(.*)\]/g, '.$1').split('.')
    try {
        return keys.reduce((res, key) => {
            res = res[key]
            if (res === undefined) {
                throw new Error('error');
            }
            return res;
        }, object);
    } catch (e) {
        return void 0;
    }
}
```
### toQueryString
```js
const toQueryString = obj => Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
```
