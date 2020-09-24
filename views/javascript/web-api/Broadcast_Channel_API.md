## Broadcast_Channel_API

> [MDN: Broadcast_Channel_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Channel_Messaging_API)

Broadcast Channel API 可以实现同 源 下浏览器不同窗口，Tab页，frame或者 iframe 下的 浏览器上下文 (通常是同一个网站下不同的页面)之间的简单通讯。

!> Note: 此特性在 Web Worker 中可用。

广播频道会被命名和绑定到指定的源。

通过创建一个监听某个频道下的 BroadcastChannel 对象，你可以接收发送给该频道的所有消息。一个有意思的点是，你不需要再维护需要通信的 iframe 或 worker 的索引。它们可以通过构造 BroadcastChannel 来简单地“订阅”特定频道，并在它们之间进行全双工（双向）通信。
