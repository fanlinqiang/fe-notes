## Object

### get
用法同lodash的get
```js
function get (object, path, defaultValue) {
    return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
            .reduce((obj, key) => (obj || {})[key], object) || defaultValue;
}
```
### toQueryString
```js
const toQueryString = obj => Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
```
