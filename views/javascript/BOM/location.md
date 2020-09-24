## location对象
location对象提供了与当前窗口中加载的文档有关的信息，还提供了一 些导航功能。事实上，location 对象是很特别的一个对象，因为它既是 window 对象的属性，也是 document 对象的属性;换句话说，window.location 和 document.location 引用的是同一个对象。 location 对象的用处不只表现在它保存着当前文档的信息，还表现在它将 URL 解析为独立的片段，让 开发人员可以通过不同的属性访问这些片段。下表列出了 location 对象的所有属性(注:省略了每个属 性前面的 location 前缀)。

|属性	|描述|
|:-|:-|
|hash	|设置或返回从井号 (#) 开始的零或多个字符 URL（锚）, 如果URL 中不包含散列，则返回空字符串。|
|host	|设置或返回主机名和当前 URL 的端口号。|
|hostname	|设置或返回当前 URL 的主机名。|
|href	|设置或返回完整的 URL。`location` 对象的 `toString`方法也返回这个值, 设置时同调用方法`assign`|
|pathname	|设置或返回当前 URL 的路径部分即URL中的目录和(或)文件名。|
|port	|设置或返回当前 URL 的端口号。如果URL中不包含端口号，则 这个属性返回空字符串|
|protocol	|设置或返回当前 URL 的协议。通常是http:或https:|
|search	|设置或返回从问号 (?) 开始的 URL（查询部分）。|

|方法	|描述|
|:-|:-|
|assign()	|加载新的文档。|
|reload()	|重新加载当前文档。|
|replace()	|用新的文档替换当前文档。|

例如：
```
origin: "https://www.cnblogs.com"
protocol: "https:"
host: "www.cnblogs.com"
hostname: "www.cnblogs.com"
port: ""
pathname: "/fanlinqiang/p/7741226.html"
search: "?query=test"
hash: ""
href: "https://www.cnblogs.com/fanlinqiang/p/7741226.html?query=test"
```




### 查询字符串参数
尽管 location.search 返回从问号到 URL 末尾的所有内容，但却没有办法逐个 访问其中的每个查询字符串参数。为此，可以像下面这样创建一个函数，用以解析查询字符串，然后返 回包含所有参数的一个对象:

```js
function getQueryStringArgs(url) {
    url = url || window.location.href;
    let query = url.match(/\?(.*)/);
    if (!query) {
        return {};
    } else {
        query = query[1].split('&');
        return query.reduce((res, cur) => {
            let [key, value] = cur.split('=');
            key = decodeURIComponent(key);
            value = decodeURIComponent(value);
            key && (res[key] = value);
            return res;
        }, {});
    }
}
```

### 位置操作

```js
location.assign("http://www.baidu.com");

// 下列两行代码与 显式调用 assign()方法的效果完全一样。
window.location = "http://www.baidu.com";
location.href = "http://www.baidu.com";

// 另外，修改 location 对象的其他属性也可以改变当前加载的页面。设置 hash、 search、hostname、pathname 和 port 属性设置为新值来改变 URL。
```

!> 每次修改 location 的属性(hash 除外)，页面都会以新 URL 重新加载。在 IE8、Firefox 1、Safari 2+、Opera 9+和 Chrome 中，修改 hash 的值会在浏览 器的历史记录中生成一条新记录。在 IE 的早期版本中，hash 属性不会在用户单击“后 退”和“前进”按钮时被更新，而只会在用户单击包含 hash 的 URL 时才会被更新。

当通过上述任何一种方式修改 URL 之后，浏览器的历史记录中就会生成一条新记录，因此用户通 过单击“后退”按钮都会导航到前一个页面。要禁用这种行为，可以使用 replace()方法。这个方法 只接受一个参数，即要导航到的 URL;结果虽然会导致浏览器位置改变，但不会在历史记录中生成新记 录。在调用 replace()方法之后，用户不能回到前一个页面，
 reload()，作用是重新加载当前显示的页面。如果调用 reload() 时不传递任何参数，页面就会以最有效的方式重新加载。也就是说，如果页面自上次请求以来并没有改 变过，页面就会从浏览器缓存中重新加载。如果要强制从服务器重新加载，则需要传递参数 true。
