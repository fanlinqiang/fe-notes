## koa洋葱模型
```js
function compose (middleware) {
    if (!Array.isArray(middleware)) {
        throw new Error('middleware must be array');
    }
    for (var i in middleware) {
        if (typeof middleware[i] !== 'function') {
            throw new Error('middlewares are not a function');
        }
    }
    return function (context, next) {
        let index = -1;
        return dispatch(0);
        function dispatch (i) {
            if (i <= index) {
                return Promise.reject();
            }
            index = i;
            fn = middleware[i];
            if (i === middleware.length) {
                fn = next;
            }
            if (!fn) {
                return Promise.resolve();
            }
            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
            } catch () {
                return Promise.reject();
            }
        }
    }
}

```
