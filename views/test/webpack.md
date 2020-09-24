# webpack
## 简单说一下项目中webpack plugin的应用，实现
> 实际在应用sentry时，将每个入口文件需要打入的sentry.init({}),通过自定义plugin，entryOption钩子中应用
```js
class SentryInit () {
    apply (compiler) {
        compiler.hooks.entryOption.tap('sentry-init', () => {
            ...
        })
    }
}
// 参考vconsole-webpack-plugin
```
## webpack 打包优化
> dll、多线程...
## 你认为 webpack 哪里打包慢
