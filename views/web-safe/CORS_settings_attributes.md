### CORS settings attributes

> 参考[CORS_settings_attributes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_settings_attributes)

在HTML5中，一些 HTML 元素提供了对 CORS 的支持， 例如 `<audio>`、`<img>`、`<link>`、`<script>` 和 `<video>` 均有一个跨域属性 (crossOrigin property)，它允许你配置元素获取数据的 CORS 请求。

这些属性是枚举的，并具有以下可能的值：

|关键字|描述|
|:-|:-|
|anonymous|对此元素的 CORS 请求将不设置凭据标志。|
|use-credentials|对此元素的CORS请求将设置凭证标志；这意味着请求将提供凭据。|
|""|设置一个空的值，如 crossorigin 或 crossorigin=""，和设置 anonymous 的效果一样。|

默认情况下（即未指定 crossOrigin 属性时），CORS 根本不会使用。在非同源情况下，设置 "anonymous" 关键字将不会通过 cookies，客户端 SSL 证书或 HTTP 认证交换用户凭据。即使是无效的关键字和空字符串也会被当作 anonymous 关键字使用。

```html
<!-- 告诉浏览器执行来自 https://example.com/example-framework.js 的脚本且不发送用户凭据。 -->
<script src="https://example.com/example-framework.js" crossorigin="anonymous"></script>

<!-- 在获取需要用户凭据的 manifest 时，属性值必须设置为 use-credentials。即使是同源的情况。 -->
<link rel="manifest" href="/app.webmanifest" crossorigin="use-credentials">
```
