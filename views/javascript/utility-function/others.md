## 其他

### isIE6
IE6判定
```js
function isIE6 () {
    //在IE6中[-1,].toString()为“1，”，‘-’会进行类型转换（转成数字类型），-"1,"  为NaN，所以返回！false
    //非IE6   非IE6中[-1,].toString()为“1”，‘-’会进行类型转换（转成数字类型），-"1"  为-1，所以返回！true
    return !-[1,];
}
```

### isIE
判定IE浏览器
```js
function isIE () {
    //因为VB是微软发明的，其他浏览器无VBArray，至少可判定IE 6/7/8/9/10
    return !!window.VBArray;
}
```

### 手机端判断浏览器类型
```js
BrowserInfo = {      
  isAndroid: Boolean(navigator.userAgent.match(/android/ig)),      
  isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),      
  isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),      
  isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),      
  isAli: Boolean(navigator.userAgent.match(/AlipayClient/ig)),
  isPhone: Boolean(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent))
}
```

### log键盘
```js
(_=>[..."`1234567890-=~~QWERTYUIOP[]\\~ASDFGHJKL;'~~ZXCVBNM,./~"].map(x=>(o+=`/${b='_'.repeat(w=x<y?2:' 667699'[x=["Bs","Tab","Caps","Enter"][p++]||'Shift',p])}\\|`,m+=y+(x+'    ').slice(0,w)+y+y,n+=y+b+y+y,l+=' __'+b)[73]&&(k.push(l,m,n,o),l='',m=n=o=y),m=n=o=y='|',p=l=k=[])&&k.join`
`)()
```

### 解析url

```js
function parseURL (url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}
```

### 禁止别人以iframe加载你的页面

```js
if (window.location != window.parent.location) window.parent.location = window.location;
```
