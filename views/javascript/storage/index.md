随着 Web 应用程序的出现，也产生了对于能够直接在客户端上存储用户信息能力的要求。想法很 合乎逻辑，属于某个特定用户的信息应该存在该用户的机器上。无论是登录信息、偏好设定或其他数据， Web 应用提供者发现他们在找各种方式将数据存在客户端上。这个问题的第一个方案是以 cookie 的形式 出现的，cookie 是原来的网景公司创造的。一份题为“Persistent Client State: HTTP Cookes”(持久客户 端状态:HTTP Cookies)的标准中对 cookie 机制进行了阐述(该标准还可以在这里看到: http://curl.haxx.se/rfc/cookie_spec.html)。今天，cookie 只是在客户端存储数据的其中一种选项。

## Cookie

HTTP Cookie，通常直接叫做 cookie，最初是在客户端用于存储会话信息的。该标准要求服务器对 任意 HTTP 请求发送 Set-Cookie HTTP 头作为响应的一部分，其中包含会话信息。例如，这种服务器响 应的头可能如下:

```
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value
Other-header: other-header-value
```

这个 HTTP 响应设置以 name 为名称、以 value 为值的一个 cookie，名称和值在传送时都必须是 URL 编码的。浏览器会存储这样的会话信息，并在这之后，通过为每个请求添加 Cookie HTTP 头将信 息发送回服务器，如下所示:

```
GET / index.html HTTP/1.1
Cookie: name=value
Other-header: other-header-value
```

发送回服务器的额外信息可以用于唯一验证客户来自于发送的哪个请求。

### 限制

受浏览器同源策略保护和限制，cookie 在性质上是绑定在特定的域名下的。当设定了一个 cookie 后，再给创建它的域名发送请求时， 都会包含这个 cookie。这个限制确保了储存在 cookie 中的信息只能让批准的接受者访问，而无法被其他 域访问。

每个域的 cookie 总数是有限的，不过浏览器之间各有不同。当超过单个域名限制之后还要再设置 cookie，浏览器就会清除以前设置的 cookie。IE 和 Opera 会删 除最近最少使用过的(LRU，Least Recently Used)cookie，腾出空间给新设置的 cookie。Firefox 看上去 好像是随机决定要清除哪个 cookie，所以考虑 cookie 限制非常重要，以免出现不可预期的后果。
浏览器中对于 cookie 的尺寸也有限制。大多数浏览器都有大约 4096B(加减 1)的长度限制。为了 最佳的浏览器兼容性，最好将整个 cookie 长度限制在 4095B(含 4095)以内。尺寸限制影响到一个域 下所有的 cookie，而并非每个 cookie 单独限制。
如果你尝试创建超过最大尺寸限制的 cookie，那么该 cookie 会被悄无声息地丢掉。注意，虽然一个 字符通常占用一字节，但是多字节情况则有不同。

###  cookie 的构成

* 名称:一个唯一确定 cookie 的名称。cookie 名称是不区分大小写的，所以 myCookie 和 MyCookie 被认为是同一个 cookie。然而，实践中最好将 cookie 名称看作是区分大小写的，因为某些服务器会这样处理 cookie。cookie 的名称必须是经过 URL 编码的。
* 值:储存在 cookie 中的字符串值。值必须被 URL 编码。
* 域:使用domain标识，cookie 对于哪个域是有效的。所有向该域发送的请求中都会包含这个 cookie 信息。这个值可以包含子域(subdomain，如 www.wrox.com)，也可以不包含它(如.wrox.com，则对于 wrox.com的所有子域都有效)。如果没有明确设定，那么这个域会被认作来自设置 cookie 的那个域。
* 路径:使用path标识，对于指定域中的那个路径，应该向服务器发送 cookie。例如，你可以指定 cookie 只有从 http://www.wrox.com/books/中才能访问，那么 http://www.wrox.com 的页面就不会发送 cookie 信息，即使请求都是来自同一个域的。
* 失效时间:使用expires标识，表示 cookie 何时应该被删除的时间戳(也就是，何时应该停止向服务器发送这个cookie)。默认情况下，浏览器会话结束时即将所有 cookie 删除;不过也可以自己设置删除时间。 这个值是个 GMT 格式的日期(Wdy, DD-Mon-YYYY HH:MM:SS GMT)，用于指定应该删除 cookie 的准确时间。因此，cookie 可在浏览器关闭后依然保存在用户的机器上。如果你设置的失 效日期是个以前的时间，则 cookie 会被立刻删除。
* 安全标志:使用secure 标志，指定后，cookie 只有在使用 SSL 连接的时候才发送到服务器。例如，cookie 信息只 能发送给 https://www.wrox.com，而 http://www.wrox.com 的请求则不能发送 cookie。secure 标志是 cookie 中唯一一个非名值对儿的部分，直接包含一个 secure 单词。
* HttpOnly: 客户端 JavaScript 脚本是否可以访问此cookie


每一段信息都作为 Set-Cookie 头的一部分，使用分号加空格分隔每一段，如下例所示。

```
Set-Cookie: name=value; expires=Mon, 22-Jan-07 07:10:24 GMT; domain=.wrox.com; path=/; secure
```

!> 尤其要注意，域、路径、失效时间和 secure 标志都是服务器给浏览器的指示，以指定何时应该发 送 cookie。这些参数并不会作为发送到服务器的 cookie 信息的一部分，只有名值对儿才会被发送。

#### JavaScript 中的 cookie

在 JavaScript 中处理 cookie 有些复杂，因为其众所周知的蹩脚的接口，即 BOM 的 document. cookie 属性。这个属性的独特之处在于它会因为使用它的方式不同而表现出不同的行为。当用来获取属性值时， document.cookie 返回当前页面可用的(根据 cookie 的域、路径、失效时间和安全设置)所有 cookie 的字符串，一系列由分号隔开的名值对儿，如下例所示。
```
name1=value1;name2=value2;name3=value3
```
所有名字和值都是经过 URL 编码的，所以必须使用 decodeURIComponent()来解码。 当用于设置值的时候，document.cookie 属性可以设置为一个新的 cookie 字符串。这个 cookie 字符串会被解释并添加到现有的 cookie 集合中。设置 document.cookie 并不会覆盖 cookie，除非设置的cookie 的名称已经存在。设置 cookie 的格式如下，和 Set-Cookie 头中使用的格式一样。 

```
name=value; expires=expiration_time; path=domain_path; domain=domain_name; secure 
````

这些参数中，只有 cookie 的名字和值是必需的。下面是一个简单的例子。

```
 document.cookie = encodeURIComponent("name") + "=" + encodeURIComponent("Nicholas");
```

一个cookie的工具函数

```
var CookieUtil = {
    get: function (name){
        cookieStart = document.cookie.indexOf(cookieName),
        cookieValue = null;
        if (cookieStart > -1){
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1){
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
            cookieEnd = document.cookie.length;
        }
            return cookieValue;
        }
    },
    getAll: function(name){
        var cookieName = encodeURIComponent(name) + "=",
        cookieStart = document.cookie.indexOf(cookieName),
        cookieValue = null,
        cookieEnd,
        subCookies, 11 i,
            parts,
            result = {};
        if (cookieStart > -1){
            cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
            if (cookieValue.length > 0){
                subCookies = cookieValue.split("&");
                    for (i=0, len=subCookies.length; i < len; i++){
                        parts = subCookies[i].split("=");
                        result[decodeURIComponent(parts[0])] =
                            decodeURIComponent(parts[1]);
                    }
                return result;
            }
        }
        return null;
    },
    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" +
                        encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
            if (path) {
                cookieText += "; path=" + path;
        }
        if (domain) {
                    cookieText += "; domain=" + domain;
        }
                if (secure) {
                    cookieText += "; secure";
        }
                document.cookie = cookieText;
    },
    setAll: function(name, subcookies, expires, path, domain, secure){
        var cookieText = encodeURIComponent(name) + "=",
            subcookieParts = new Array(),
            subName;
        for (subName in subcookies){
            if (subName.length > 0 && subcookies.hasOwnProperty(subName)){
                subcookieParts.push(encodeURIComponent(subName) + "=" +
                    encodeURIComponent(subcookies[subName]));
            }
        }
        if (cookieParts.length > 0){
            cookieText += subcookieParts.join("&");
            if (expires instanceof Date) {
                cookieText += "; expires=" + expires.toGMTString();
            }
            if (path) {
                cookieText += "; path=" + path;
            }
            if (domain) {
                cookieText += "; domain=" + domain;
            }
            if (secure) {
                        cookieText += "; secure";
            }
        } else {
                    cookieText += "; expires=" + (new Date(0)).toGMTString();
                document.cookie = cookieText;
        }
    },
    unset: function (name, path, domain, secure){
        this.set(name, "", new Date(0), path, domain, secure);
    },
    unsetAll: function(name, path, domain, secure){
        this.setAll(name, null, new Date(0), path, domain, secure);
    }
};
```

!> 一定不要在 cookie 中存储重要和敏感的数据。cookie 数据并非存储在一个安全环 6 境中，其中包含的任何数据都可以被他人访问。所以不要在 cookie 中存储诸如信用卡 号或者个人地址之类的数据。


## Web存储机制

Web Storage 的目的是克服由 cookie 带来的一些限 制，当数据需要被严格控制在客户端上时，无须持续地将数据发回服务器。Web Storage 的两个主要目 标是:

* 提供一种在 cookie 之外存储会话数据的途径;
* 提供一种存储大量可以跨会话存在的数据的机制

### Storage 类型
Storage 类型提供最大的存储空间(因浏览器而异)来存储名值对儿。Storage 的实例与其他对象类似，有如下方法。

|方法|描述|
|:-|:-|
|clear()|删除所有值;Firefox 中没有实现 |
|getItem(name)|根据指定的名字 name 获取对应的值。|
|key(index)|获得 index 位置处的值的名字。|
|removeItem(name)|删除由 name 指定的名值对儿。|
|setItem(name, value)|为指定的 name 设置一个对应的值。|

其中，getItem()、removeItem()和 setItem()方法可以直接调用，也可通过 Storage 对象间 接调用。因为每个项目都是作为属性存储在该对象上的，所以可以通过点语法或者方括号语法访问属性 来读取值，设置也一样，或者通过 delete 操作符进行删除。不过，我们还建议读者使用方法而不是属 性来访问数据，以免某个键会意外重写该对象上已经存在的成员。
还可以使用 length 属性来判断有多少名值对儿存放在 Storage 对象中。


 !> Storage 类型只能存储字符串。非字符串的数据在存储之前会被转换成字符串。
 

 ### sessionStorage 对象

 sessionStorage 对象是 Storage 的一个实例，所以可以使用Storage的方法。sessionStorage 对象存储特定于某个会话的数据，也就是该数据只保持到浏览器关闭。这个对象就像会话 cookie，也会在浏览器关闭后消失。存储在 sessionStorage 中的数据可以跨越页面刷新而存在，同时如果浏览器支持，浏览器崩溃并重启之后依然可用(Firefox 和 WebKit 都支持，IE 则不行)。
因为 seesionStorage 对象绑定于某个服务器会话，所以当文件在本地运行的时候是不可用的。存 储在 sessionStorage 中的数据只能由最初给对象存储数据的页面访问到，所以对多页面应用有限制。

### localStorage 对象
localStorage 对象也是是 Storage 的一个实例，所以可以使用Storage的方法。localStorage用于跨会话持久化数据并 遵循跨域安全策略。要访问同一个 localStorage 对象，页面必须来自同一个域名(子域名无效)，使用同一种 协议，在同一个端口上。

为方便管理同域下不同项目的管理，封装一个管理函数

```
class StorageManager {
    constructor (namespace) {
        this.namespace = namespace;
        this.storage = null;
        this.load();
    }
    save () {
        let {namespace, storage} = this;
        window.localStorage.setItem(namespace, JSON.stringify(storage));
    }
    load () {
        let {namespace} = this;
        let tmp  = localStorage.getItem(namespace);
        this.storage = tmp ? JSON.parse(tmp) : {};
    }
    get (key, newest) {
        if (newest) {
            this.load();
        }
        return this.storage[key];
    }
    set (key, value) {
        this.storage[key] = value;
        this.save();
    }
    push (key, value, maxLength) {
        var array = this.get(key);
        if (!array) {
            array = [];
        }
        array.push(value);
        if (maxLength && array.length > maxLength) {
            array = array.slice(array.length - 1 - maxLength, array.length - 1);
        }
        this.set(key, array);
    }
    unshift (key, value, maxLength) {
        let array = this.get(key);
        if (!array) {
            array = [];
        }
        array.unshift(value);
        if (maxLength && array.length > maxLength) {
            array = array.slice(0, maxLength);
        }
        this.set(key, array);
    }
    remove (key) {
        delete this.storage[key];
        this.save();
    }
}

export const new StorageManager('appName');
```