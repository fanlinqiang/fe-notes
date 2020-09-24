# BOM

BOM(Browser Object Mode) 即浏览器对象模型。

## 浏览器中的js

### `<script>`元素
浏览器中应用JavaScript，引入方式通过`<script>`标签，其定义了下列 6 个属性。

1. 嵌入页面

```html
<script type="text/javascript">
    console.log('hello javascript');
    // 包含在<script>元素内部的 JavaScript 代码将被从上至下依次解释。
    // 在解释器对<script>元素内部的所 有代码求值完毕以前，页面中的其余内容都不会被浏览器加载或显示。
</script>

<script type="text/javascript">
    //在使用<script>嵌入 JavaScript 代码时，记住不要在代码中的任何地方出现"</script>"字符串。
    console.log('</script>'); // 会产生错误
    //因为按照解析嵌入式代码的规则，当浏览器遇到字符串"</script>"时，就会认为那是结束的</script>标签。而通过转义字符“/”可以解决这个问题
    console.log('<\/script>');
</script>
```

2. 外部文件 （在引用了外部文件的情况下，在标签里写js代码是无效的）

```html
// 优点：可维护性强、可缓存（多个页面使用同一文件时，浏览器会有缓存）
// 外部文件 test.js 将被加载到当前页面中。外部文件只须包含通常要放在开始 的<script>和结束的</script>之间的那些 JavaScript 代码即可。
// 与解析嵌入式 JavaScript 代码一样， 在解析外部 JavaScript 文件(包括下载该文件)时，页面的处理也会暂时停止。
<script src="test.js"></script>

<script src="test.js">
    // 带有 src 属性的<script>元素不应该在其<script>和</script>标签之间再 包含额外的 JavaScript 代码。如果包含了嵌入的代码，则只会下载并执行外部脚本文件，嵌入的代码 会被忽略。
    document.write("这句代码无法执行！");
</script>
```

!> 按照惯例，外部 JavaScript 文件带有.js 扩展名。但这个扩展名不是必需的，因为 浏览器不会检查包含 JavaScript 的文件的扩展名。这样一来，使用 JSP、PHP 或其他 服务器端语言动态生成 JavaScript 代码也就成为了可能。但是，服务器通常还是需要 看扩展名决定为响应应用哪种 MIME 类型。如果不使用.js 扩展名，请确保服务器能 返回正确的 MIME 类型。

通过`<script>`元素的 src 属性还可以包含来自外部域的 JavaScript 文件。这个特性使得我们可以使用来自不同域的JavaScript，但其把双棱剑，既让我们能使用CDN服务优化web应用、jsonp解决跨域问题等有利应用的一面，但保证提供安全的JavaScript的又是一个难题。只要不存在 defer 和 async 属性，浏览器都会按照`<script>`元素在页面中 出现的先后顺序对它们依次进行解析。

|属性名|说明|
|:----|:--|
|async:可选。|表示应该立即下载脚本，但不应妨碍页面中的其他操作，比如下载其他资源或 等待加载其他脚本。只对外部脚本文件有效。|
|charset:可选。|表示通过 src 属性指定的代码的字符集。由于大多数浏览器会忽略它的值， 因此这个属性很少有人用。|
|defer:可选。|表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有 效。IE7 及更早版本对嵌入脚本也支持这个属性。|
|language:已废弃。|原来用于表示编写代码使用的脚本语言(如 JavaScript、JavaScript1.2 或 VBScript)。大多数浏览器会忽略这个属性，因此也没有必要再用了。|
|src:可选。|表示包含要执行代码的外部文件。|
|type:可选。|可以看成是 language 的替代属性;表示编写代码使用的脚本语言的内容类型(也称为 MIME 类型)。虽然 text/javascript 和 text/ecmascript 都已经不被推荐使用，但人 们一直以来使用的都还是 text/javascript。实际上，服务器在传送 JavaScript 文件时使用的 MIME 类型通常是 application/x–javascript，但在 type 中设置这个值却可能导致脚本被 忽略。另外，在非 IE 浏览器中还可以使用以下值:application/javascript 和 application/ecmascript。考虑到约定俗成和最大限度的浏览器兼容性，目前 type 属性的值依旧还是 text/javascript。不过，这个属性并不是必需的，如果没有指定这个属性，则其默认值仍为 text/javascript。|

#### 标签位置

传统的做法是将所有的`<script>`元素放在页面的`<head>`元素中，这意味着必须等到全部 JavaScript 代码都被下载、 解析和执行完成以后，才能开始呈现页面的内容，这会导致浏览器在呈现页面时出现明显的延迟，而延迟期间的浏览器窗口中将是一片空白。为了避免这个问题，现代 Web 应用程序一般都把全部 JavaScript 引 用放在`<body>`元素中页面内容的后面

#### 延迟脚本

`<script>`元素中设置 defer 属性，即告诉浏览器立即下载，但延迟到整个页面都解析完毕后再运行。延迟脚本总是按照指定它们的顺序执行。

#### 异步脚本

同样与defer类似，async只适用于外部脚本文件，并告诉浏览器立即下载文件。但与defer不同的是，标记为 async 的脚本并不保证按照指定它们的先后顺序执行。异步脚本一定会在页面的 load 事件前执行，但可能会在 DOMContentLoaded 事件触发之前或之 后执行。支持异步脚本的浏览器有 Firefox 3.6、Safari 5 和 Chrome。

### 文档模式
最初的两种文档模式是:混杂模式(quirks mode)1和标准模式(standards mode)。混杂模式会让 IE 的行为与(包 含非标准特性的)IE5 相同，而标准模式则让 IE 的行为更接近标准行为。虽然这两种模式主要影响 CSS 内容的呈现，但在某些情况下也会影响到 JavaScript 的解释执行。
对于标准模式，可以通过使用下面任何一种文档类型来开启:

```html

<!-- HTML 4.01 严格型 -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<!-- XHTML 1.0 严格型 -->
<!DOCTYPE html PUBLIC
"-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!-- HTML 5 -->
<!DOCTYPE html>

```

### `<noscript>`元素

在不支持 JavaScript 的浏览器中显示替代 的内容。这个元素可以包含能够出现在文档`<body>`中的任何 HTML 元素——`<script>`元素除外。包含 在`<noscript>`元素中的内容只有在下列情况下才会显示出来:

1. 浏览器不支持脚本;
2. 浏览器支持脚本，但脚本被禁用。



[window](./window.md ':include')

[location](./location.md ':include')

[navigator](./navigator.md ':include')

[screen](./screen.md ':include')

[history](./history.md ':include')

