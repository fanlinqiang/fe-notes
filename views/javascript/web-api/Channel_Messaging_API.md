## Channel_Messaging_API

> [MDN: Channel_Messaging_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Channel_Messaging_API)

Channel Messaging API 允许两个不同的脚本运行在同一个文档的不同浏览器上下文（比如两个 iframe，或者文档主体和一个 iframe，使用 SharedWorker 的两个文档，或者两个 worker）来直接通讯，在每端使用一个端口（port）通过双向频道（channel）向彼此传递消息。

!> Note: 此特性在 Web Worker 中可用。
