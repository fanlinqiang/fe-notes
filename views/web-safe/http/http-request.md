## 请求头

> 参考：[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)

请求头可以被定义为：被用于http请求中并且和请求主体无关的那一类HTTP header。某些请求头如Accept, Accept-*,  If-*允许执行条件请求。某些请求头如：Cookie, User-Agent 和Referer描述了请求本身以确保服务端能返回正确的响应。
并非所有出现在请求中的http首部都属于请求头，例如在 POST请求中经常出现的Content-Length实际上是一个代表请求主体大小的entity header，虽然你也可以把它叫做请求头。
此外，CORS定义了一个叫做 simple headers的集合，它是请求头集合的一个子集。如果某次请求是只包含simple headers的话，则被认为是简单请求，不会触发请求预检（preflight）。

|消息头|说明|
|:-|:-|
|Accept-Encoding|客户端在请求时，用Accept-Encoding字段说明自己可以接受哪些压缩方法,如：gzip, deflate|
|Connection|值如：keep-alive，HTTP/1.0 版的主要缺点是，每个TCP连接只能发送一个请求。发送数据完毕，连接就关闭，如果还要请求其他资源，就必须再新建一个连接。TCP连接的新建成本很高，因为需要客户端和服务器三次握手，并且开始时发送速率较慢（slow start）。所以，HTTP 1.0版本的性能比较差。随着网页加载的外部资源越来越多，这个问题就愈发突出了。为了解决这个问题，有些浏览器在请求时，用了一个非标准的Connection字段。这个字段要求服务器不要关闭TCP连接，以便其他请求复用。服务器同样回应这个字段。`Connection: keep-alive`一个可以复用的TCP连接就建立了，直到客户端或服务器主动关闭连接。但是，这不是标准字段，不同实现的行为可能不一致，因此不是根本的解决办法。1.1 版引入了持久连接（persistent connection），即TCP连接默认不关闭，可以被多个请求复用，不用声明Connection: keep-alive。客户端和服务器发现对方一段时间没有活动，就可以主动关闭连接。不过，规范的做法是，客户端在最后一个请求时，发送Connection: close，明确要求服务器关闭TCP连接。目前，对于同一个域名，大多数浏览器允许同时建立6个持久连接。|
|host|1.1版客户端请求的头信息新增了Host字段，用来指定服务器的域名。有了Host字段，就可以将请求发往同一台服务器上的不同网站，为虚拟主机的兴起打下了基础。|

## HTTP 请求方法

> 参考：[http://www.ruanyifeng.com/blog/2016/08/http.html](http://www.ruanyifeng.com/blog/2016/08/http.html)

根据 HTTP 标准，HTTP 请求可以使用多种请求方法。
* HTTP/0.9 定义了一种请求方法：GET, 
> 1991年发布的，协议规定，服务器只能回应HTML格式的字符串，不能回应别的格式。

* HTTP/1.0 定义了两种请求方法：POST 和 HEAD方法。(任何格式的内容都可以发送。这使得互联网不仅可以传输文字，还能传输图像、视频、二进制文件。)
> 1996年5月，HTTP/1.0 版本发布，内容大大增加。首先，任何格式的内容都可以发送。这使得互联网不仅可以传输文字，还能传输图像、视频、二进制文件。这为互联网的大发展奠定了基础。
  其次，除了GET命令，还引入了POST命令和HEAD命令，丰富了浏览器与服务器的互动手段。
  再次，HTTP请求和回应的格式也变了。除了数据部分，每次通信都必须包括头信息（HTTP header），用来描述一些元数据。
  其他的新增功能还包括状态码（status code）、多字符集支持、多部分发送（multi-part type）、权限（authorization）、缓存（cache）、内容编码（content encoding）等。
  
* HTTP/1.1 新增了六种请求方法：OPTIONS、PUT、PATCH、DELETE、TRACE 和 CONNECT 方法。


|方法	|描述|
|:-|:-|
|GET	|请求指定的页面信息，并返回实体主体。|
|HEAD	|类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取报头|
|POST	|向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST 请求可能会导致新的资源的建立和/或已有资源的修改。|
|PUT	|从客户端向服务器传送的数据取代指定的文档的内容。|
|DELETE	|请求服务器删除指定的页面。|
|CONNECT	|HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。|
|OPTIONS	|允许客户端查看服务器的性能。|
|TRACE	|回显服务器收到的请求，主要用于测试或诊断。|
|PATCH	|是对 PUT 方法的补充，用来对已知资源进行局部更新 。|
