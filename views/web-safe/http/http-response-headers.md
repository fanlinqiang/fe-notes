## HTTP响应头
>参考：[http://www.ruanyifeng.com/blog/2016/08/http.html](http://www.ruanyifeng.com/blog/2016/08/http.html)

|应答头|	说明|
|:-|:-|
|Allow|	服务器支持哪些请求方法（如GET、POST等）。|
|Content-Encoding|	常见值有：`gzip`、`compress`、`deflate`，文档的编码（Encode）方法,由于发送的数据可以是任何格式，因此可以把数据压缩后再发送。Content-Encoding字段说明数据的压缩方法。。只有在解码之后才可以得到Content-Type头指定的内容类型。利用gzip压缩文档能够显著地减少HTML文档的下载时间。Java的GZIPOutputStream可以很方便地进行gzip压缩，但只有Unix上的Netscape和Windows上的IE 4、IE 5才支持它。因此，Servlet应该通过查看Accept-Encoding头（即request.getHeader("Accept-Encoding")）检查浏览器是否支持gzip，为支持gzip的浏览器返回经gzip压缩的HTML页面，为其他浏览器返回普通页面。|
|Content-Length|	表示内容长度。一个TCP连接现在可以传送多个回应，势必就要有一种机制，区分数据包是属于哪一个回应的。这就是Content-length字段的作用，声明本次回应的数据长度。只有当浏览器使用持久HTTP连接时才需要这个数据。如果你想要利用持久连接的优势，可以把输出文档写入 ByteArrayOutputStream，完成后查看其大小，然后把该值放入Content-Length头，最后通过byteArrayStream.writeTo(response.getOutputStream()发送内容。|
|Transfer-Encoding|使用Content-Length字段的前提条件是，服务器发送回应之前，必须知道回应的数据长度。对于一些很耗时的动态操作来说，这意味着，服务器要等到所有操作完成，才能发送数据，显然这样的效率不高。更好的处理方法是，产生一块数据，就发送一块，采用"流模式"（stream）取代"缓存模式"（buffer）。因此，1.1版规定可以不使用Content-Length字段，而使用"分块传输编码"（chunked transfer encoding）。只要请求或回应的头信息有Transfer-Encoding字段，就表明回应将由数量未定的数据块组成。`Transfer-Encoding: chunked`|
|Content-Type|	表示后面的文档属于什么MIME类型。Servlet默认为text/plain，但通常需要显式地指定为text/html。由于经常要设置Content-Type，因此HttpServletResponse提供了一个专用的方法setContentType。|
|Date|	当前的GMT时间。你可以用setDateHeader来设置这个头以避免转换时间格式的麻烦。|
|Expires|	应该在什么时候认为文档已经过期，从而不再缓存它？|
|Last-Modified|	文档的最后改动时间。客户可以通过If-Modified-Since请求头提供一个日期，该请求将被视为一个条件GET，只有改动时间迟于指定时间的文档才会返回，否则返回一个304（Not Modified）状态。Last-Modified也可用setDateHeader方法来设置。|
|Location|	表示客户应当到哪里去提取文档。Location通常不是直接设置的，而是通过HttpServletResponse的sendRedirect方法，该方法同时设置状态代码为302。|
|Refresh|	表示浏览器应该在多少时间之后刷新文档，以秒计。除了刷新当前文档之外，你还可以通过`setHeader("Refresh", "5; URL=http://host/path")`让浏览器读取指定的页面。注意这种功能通常是通过设置HTML页面HEAD区的`＜META HTTP-EQUIV="Refresh" CONTENT="5;URL=http://host/path"＞`实现，这是因为，自动刷新或重定向对于那些不能使用CGI或Servlet的HTML编写者十分重要。但是，对于Servlet来说，直接设置Refresh头更加方便。注意Refresh的意义是"N秒之后刷新本页面或访问指定页面"，而不是"每隔N秒刷新本页面或访问指定页面"。因此，连续刷新要求每次都发送一个Refresh头，而发送204状态代码则可以阻止浏览器继续刷新，不管是使用Refresh头还是＜META HTTP-EQUIV="Refresh" ...＞。注意Refresh头不属于HTTP 1.1正式规范的一部分，而是一个扩展，但Netscape和IE都支持它。|
|Server|	服务器名字。Servlet一般不设置这个值，而是由Web服务器自己设置。|
|Set-Cookie|	设置和页面关联的Cookie。Servlet不应使用response.setHeader("Set-Cookie", ...)，而是应使用HttpServletResponse提供的专用方法addCookie。|
|WWW-Authenticate|	客户应该在Authorization头中提供什么类型的授权信息？在包含401（Unauthorized）状态行的应答中这个头是必需的。例如，response.setHeader("WWW-Authenticate", "BASIC realm=＼"executives＼"")。注意Servlet一般不进行这方面的处理，而是让Web服务器的专门机制来控制受密码保护页面的访问（例如.htaccess）。|
|cache-control|


### 常见的Content-Type

关于字符的编码，1.0版规定，头信息必须是 ASCII 码，后面的数据可以是任何格式。因此，服务器回应的时候，必须告诉客户端，数据是什么格式，这就是Content-Type字段的作用
```
text/plain
text/html
text/css
image/jpeg
image/png
image/svg+xml
audio/mp4
video/mp4
application/javascript
application/pdf
application/zip
application/atom+xml
```

> 详细列表可见:(https://tool.oschina.net/commons/)[https://tool.oschina.net/commons/]

这些数据类型总称为MIME(Multipurpose Internet Mail Extensions, 多用途互联网邮件扩展类型) type，每个值包括一级类型和二级类型，之间用斜杠分隔。
除了预定义的类型，厂商也可以自定义类型。
```
application/vnd.debian.binary-package
```
上面的类型表明，发送的是Debian系统的二进制数据包。
MIME type还可以在尾部使用分号，添加参数。
```
Content-Type: text/html; charset=utf-8
```
上面的类型表明，发送的是网页，而且编码是UTF-8。
客户端请求的时候，可以使用Accept字段声明自己可以接受哪些数据格式。
```
Accept: */*

Accept: application/json, text/javascript, */*; q=0.01
```

MIME type不仅用在HTTP协议，还可以用在其他地方，比如HTML网页。
```
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!-- 等同于 -->
<meta charset="utf-8" />
```

### gzip 的原理是什么,可以对图片开启 gzip 压缩吗，为什么

gzip 使用了 LZ77 算法与 Huffman 编码来压缩文件，重复度越高的文件可压缩的空间就越大。
不需要开启，如果开启的话，有可能使图片变的更大。如果你注意一些网站的 img 资源时，就会发现他们都没有开启 gzip
参考: [https://webmasters.stackexchange.com/questions/8382/is-gzipping-images-worth-it-for-a-small-size-reduction-but-overhead-compressing](https://webmasters.stackexchange.com/questions/8382/is-gzipping-images-worth-it-for-a-small-size-reduction-but-overhead-compressing)

> Don't use gzip for image or other binary files.Image file formats supported by the web, as well as videos, PDFs and other binary formats, are already compressed; using gzip on them won't provide any additional benefit, and can actually make them larger. To compress images, see Optimize images.

### http 响应头中的 ETag 值是如何生成的

(ETag说明)[https://baike.baidu.com/item/ETag/4419019?fr=aladdin]

关于 etag 的生成需要满足几个条件:
* 当文件不会更改时，etag 值保持不变。所以不能单纯使用 inode
* 便于计算，不会特别耗 CPU。这样子 hash 不是特别合适
* 便于横向扩展，多个 node 上生成的 etag 值一致。这样子 inode 就排除了

关于服务器中 etag 如何生成可以参考 [https://stackoverflow.com/questions/4533/http-generating-etag-header](https://stackoverflow.com/questions/4533/http-generating-etag-header)

那么在 nginx 中的 etag 是如何生成的？
nginx 中 etag 由响应头的 Last-Modified 与 Content-Length 表示为十六进制组合而成。

如果 http 响应头中 ETag 值改变了，是否意味着文件内容一定已经更改

不一定，由服务器中 ETag 的生成算法决定。
比如 nginx 中的 etag 由 last_modified 与 content_length 组成，而 last_modified 又由 mtime 组成
当编辑文件却未更改文件内容时，或者 touch file，mtime 也会改变，此时 etag 改变，但是文件内容没有更改。

### 我们如何从 http 的报文中得知该服务使用的技术栈

一般有两个 response header，有时服务端为了隐蔽自己真实的技术栈会隐蔽这两个字段
* X-Powerd-By
* Server (Apache/nginx)

### http 响应头中的 Date 与 Last-Modified 有什么不同，网站部署时需要注意什么

LM-Factor 与它俩有关。
简而言之，一个静态资源没有设置 Cache-Control 时会以这两个响应头来设置强制缓存时间，而非直接进行协商缓存。在涉及到 CDN 时，表现更为明显，体现在更新代码部署后，界面没有更新。

### http 1.1 中的 keep-alive 有什么作用

在 http 1.1 中，在响应头中设置 keep-alive 可以在一个 TCP 连接上发送多个 http 请求

避免了重开 TCP 连接的开销(包括响应时间、CPU 资源、减少拥堵等)
避免了刷新时重新建立 SSL 连接的开销
避免了QPS过大时，服务器的连接数过大

在服务器端使用响应头开启 keep-alive

```css
Connection: Keep-Alive
Keep-Alive: timeout=5, max=1000
```
