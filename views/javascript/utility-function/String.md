## String
### contains
```js
function contains (target, str, separator) {
    return separator ? (separator + target + separator).indexOf(separator + str + separator) > -1 : target.indexOf(str) > -1;
}
```
### startsWith
```js
function startsWith (target, str, ignorecase) {
    var start_str = target.substr(0, str.length);
    return ignorecase ? start_str.toLowerCase() === str.toLowerCase() : start_str === str;
}
```
### endsWith
```js
function endsWith (target, str, ignorecase) {
    var end_str = target.substring(target.length - str.length);
    return ignorecase ? end_str.toLowerCase() === str.toLowerCase() : end_str === str;
}
```
### repeat
```js
function repeat (target, n) {
    var s = target,
        total = "";
    while (n > 0) {
        if (n % 2 == 1)
            total += s;
        if (n == 1)
            break;
        s += s;
        n = n >> 1;
    }
    return total;
}
```
### byteLen
byteLen: 取得一个字符串所有字节的长度(来自腾讯的解决方案。腾讯通过多子域名+postMessage+manifest 离线 proxy 页面的 方式扩大 localStorage 的存储空间，在这过程中需要知道用户已经存了多少东西，因此，我们就 必须编写一个严谨的 byteLen 方法。)
```js
/** *
* http://www.alloyteam.com/2013/12/js-calculate-the-number-of-bytes-occupied-by-a-str ing/
* 计算字符串所占的内存字节数，默认使用 UTF-8 的编码方式计算，也可制定为 UTF-16
* UTF-8 是一种可变长度的 Unicode 编码格式，使用 1 至 4 个字节为每个字符编码 *
* 000000 - 00007F(128个代码)
* 000080 - 0007FF(1920个代码)
* 000800 - 00D7FF 00E000 - 00FFFF(61440个代码) 0zzzzzzz(00-7F) 一个字节 110yyyyy(C0-DF) 10zzzzzz(80-BF) 两个字节 1110xxxx(E0-EF) 10yyyyyy 10zzzzzz 3个字节
* 010000 - 10FFFF(1048576 个代码) 11110www(F0-F7) 10xxxxxx 10yyyyyy 10zzzzzz 4 个字节 *
* 注: Unicode 在范围 D800-DFFF 中不存在任何字符
* {@link <a onclick="javascript:pageTracker._trackPageview('/outgoing/zh.wikipedia.org/wiki/UTF -8');"
* href="http://zh.wikipedia.org/wiki/UTF-8">http://zh.wikipedia.org/wiki/UTF-8</a>} *
* UTF-16 大部分使用两个字节编码，编码超出 65535 的使用 4 个字节
* 000000 - 00FFFF 两个字节
* 010000 - 10FFFF 4 个字节
* {@link <a onclick="javascript:pageTracker._trackPageview('/outgoing/zh.wikipedia.org/wiki/UTF-16');"
* href="http://zh.wikipedia.org/wiki/UTF-16">http://zh.wikipedia.org/wiki/UTF-16</a>} * @param {String} str
* @param {String} charset utf-8, utf-16
* @return {Number}
*/
function byteLen(str, charset) {
    var total = 0,
        charCode,
        i,
        len;
    charset = charset ? charset.toLowerCase() : '';
    if (charset === 'utf-16' || charset === 'utf16') {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0xffff) {
                total += 2;
            } else {
                total += 4;
            }
        }
    } else {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0x007f) {
                total += 1;
            } else if (charCode <= 0x07ff) {
                total += 2;
            } else if (charCode <= 0xffff) {
                total += 3;
            } else {
                total += 4;
            }
        }
    }
    return total;
}
```
### truncate
用于对字符串进行截断处理，当超过限定长度，默认添加三个点号。
```js
function truncate (target, length, truncation) {
    length = length || 30;
    truncation = truncation === void(0) ? '...' : truncation;
    return target.length > length ? target.slice(0, length - truncation.length) + truncation : String(target);
}
```
### camelize
转换为驼峰风格
```js
function camelize (target) {
    if (target.indexOf('-') < 0 && target.indexOf('_') < 0) {
        return target; //提前判断，提高getStyle等的效率
    }
    return target.replace(/[-_][^-_]/g, function(match) {
        return match.charAt(1).toUpperCase();
    });
}
```
### underscored
转换为下划线风格
```js
function underscored (target) {
    return target.replace(/([a-z\d])([A-Z])/g, '$1_$2').
    replace(/\-/g, '_').toLowerCase();
}
```
### dasherize
```js
function dasherize (target) {
    return underscored(target).replace(/_/g, '-');
}
```
### capitalize
首字母大写
```js
function capitalize(target) {
    return target.charAt(0).toUpperCase() + target.substring(1).toLowerCase();
}
```
### stripTags
移除字符串中的 html 标签，但这方法有缺陷，如里面有 script 标签，会把这 些不该显示出来的脚本也显示出来。在 Prototype.js 中，它与 strip、stripScripts 是一组方法。
```js
function stripTags (target) {
    return String(target || "").replace(/<[^>]+>/g, '');
}
```
### stripScripts
移除字符串中所有的 script 标签。弥补 stripTags 方法的缺陷。此方法应 在 stripTags 之前调用。
```js
function stripScripts (target) {
    return String(target || "").replace(/<script[^>]*>([\S\s]*?)<\/script>/img, '')
}
```
### escapeHTML
将字符串经过 html 转义得到适合在页面中显示的内容，如将<替换 为 &lt;。
```js
function escapeHTML (target) {
    return target.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
```
### unescapeHTML
将字符串中的 html 实体字符还原为对应字符。
```js
function escapeHTML (target) {
    return target.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;"); //IE下不支持&apos;(单引号)转义
}
```
### escapeRegExp
```js
function escapeRegExp (target) {
    return target.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
}
```
### trim
```js
// 简洁
function trim (str) {
    return str.replace(/^\s+|\s+$/g, '');
}
function trim (string) {
    // uFEFF:字节顺序标记（英语：byte-order mark，BOM）是位于码点U+FEFF的统一码字符的名称。当以UTF-16或UTF-32来将UCS/统一码字符所组成的字符串编码时，这个字符被用来标示其字节序。它常被用来当做标示文件是以UTF-8、UTF-16或UTF-32编码的记号。
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
// 速度快
function trim (str) {
    var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\n\
\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    for (var i = 0; i < str.length; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i);
            break;
        }
    }
    for (i = str.length - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}
```
### pad
与 trim 相反，pad 可以为字符串的某一端添加字符串。
```js
function pad (target, n, filling, right, radix) {
    var num = target.toString(radix || 10);
    filling = filling || "0";
    while (num.length < n) {
        if (!right) {
            num = filling + num;
        } else {
            num += filling;
        }
    }
    return num;
}
```
### wbr
为目标字符串添加 wbr 软换行。不过需要注意的是，它并不是在每个字符之后都 插入<wbr>字样，而是相当于在组成文本节点的部分中的每个字符后插入<wbr>字样。如 aa<span>bb</span>cc，返回 a<wbr>a<wbr><span>b<wbr>b<wbr></span>c<wbr>c<wbr>。另外， 在 Opera 下，浏览器默认 css 不会为 wbr 加上样式，导致没有换行效果，可以在 css 中加上 wbr: after { content: "\00200B" } 解决此问题。
```js
function wbr (target) {
    return String(target).replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi, '$&<wbr>').replace(/><wbr>/g, '>');
}
```
!> 注：IE仅6-7兼容此标签 https://caniuse.com/#search=wbr
### format
轻量字符串模版
```js
function format (str, object) {
    var array = Array.prototype.slice.call(arguments, 1);
    return str.replace(/\\?\#{([^{}]+)\}/gm, function(match, name) {
        if (match.charAt(0) == '\\')
            return match.slice(1);
        var index = Number(name)
        if (index >= 0)
            return array[index];
        if (object && object[name] !== void 0)
            return object[name];
        return '';
    });
}
```
**Example:**
```js
var a = format("Result is #{0},#{1}", 22, 33);
console.log(a); //"Result is 22,33"
var b = format("#{name} is a #{sex}", {
    name: "Jhon",
    sex: "man"
});
console.log(b); //"Jhon is a man"
```
### quote
在字符串两端添加双引号，然后内部需要转义的地方都要转义，用于接装 JSON 的键名或模析系统中。
```js
// 原生方法，需要浏览器支持原生JSON
JSON.stringify
//http://code.google.com/p/jquery-json/
var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
    meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
    };

function quote (target) {
    if (target.match(escapeable)) {
        return '"' + target.replace(escapeable, function(a) {
            var c = meta[a];
            if (typeof c === 'string') {
                return c;
            }
            return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4)
        }) + '"';
    }
    return '"' + target + '"';
}
//https://github.com/ecomfe/etpl/blob/2.1.0/src/main.js#L207
function stringLiteralize (source) {
    return '"' +
        source
        .replace(/\x5C/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\x0A/g, '\\n')
        .replace(/\x09/g, '\\t')
        .replace(/\x0D/g, '\\r') + '"';
}
```
### URLSearchParams

获取url中query带的参数，js原生支持[URLSearchParams对象](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)，考虑兼容性的化可以看这个包：
[url-search-params-polyfill](https://github.com/jerrybendy/url-search-params-polyfill/blob/master/index.js)，纯js实现mdn文档的URLSearchParams对象

### parseURL

创建一个 `a` 标签将需要解析的 `URL` 赋值给 `a` 的 `href` 属性，然后就能很方便的拿到`url`里的信息

```js
function parseURL(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
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
        hash: a.hash.replace('#','')
    };
}
```

### hexToRgb

```js
function hexToRgb(hex) {
    let rgb = [];
    for(let i = 1; i < 7; i += 2){
        rgb.push(parseInt("0x" + hex.slice(i,i+2)));
    }
    return rgb;
}
```

### rgbToHex

```js
function rgbToHex(r, g, b) {
    var hex = ((r<<16) | (g<<8) | b).toString(16);
    return "#" + new Array(Math.abs(hex.length-7)).join("0") + hex;
}
```
### 生成随机HEX色值
```js
function randomColor () {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
}
```

### calcStrLen
```js
/**
   * 计算字符串的长度
   * @param {string} str 指定的字符串
   */
function calcStrLen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
        len++;
      } else {
        len += 2;
      }
    }
    return len;
}
```


