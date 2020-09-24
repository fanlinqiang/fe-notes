## 选择器

### 选择器列表

|选择器|	示例|示例说明|CSS|
|:----|:---|:------|:--|
|`.class`|	`.intro`|	类选择器，选择所有`class="intro"`的元素|	1|
|`#id`|	`#item`	|`id`选择器，选择所有`id="item"`的元素|	1|
|`*`|	`*`|	选择所有元素|2|
|`element`|	`p`|	标签选择器，选择所有`<p>`元素|	1|
|`element,element`|	   `div,p`	|选择所有`<div>`元素和`<p>`元素	|1|
|`element element`|	`div p`|	选择`<div>`元素内的所有`<p>`元素	|1|
|`element>element`|	`div>p`|	后代选择器，选择所有父级是 `<div>` 元素的 `<p> `元素	|2|
|`element+element`|	`div+p`	|选择所有紧接着`<div>`元素之后的`<p>`元素	|2|
|`[attribute]`|	`[target]`	|选择所有带有target属性元素	|2|
|`[attribute=value]`|	`[target=-blank]`|	选择所有使用target="-blank"的元素	|2|
|`[attribute~=value]`|	`[title~=flower]`|	选择标题属性包含单词"flower"的所有元素	|2|
|`[attribute\|=language]`|	`[lang\|=en]`|	选择 `lang` 属性以 `en` 为开头的所有元素	|2|
|`:link`|	`a:link`	|选择所有未访问链接	|1|
|`:visited`|	`a:visited`|	选择所有访问过的链接	|1|
|`:active`|	`a:active`|	选择活动链接	|1|
|`:hover`|	`a:hover`|	选择鼠标在链接上面时	|1|
|`:focus`|	`input:focus`|	选择具有焦点的输入元素	|2|
|`:first-letter`|	`p:first-letter`|	选择每一个`<P>`元素的第一个字母	|1|
|`:first-line`|	`p:first-line`|	选择每一个`<P>`元素的第一行	|1|
|`:first-child`|	`p:first-child`|	指定只有当<p>元素是其父级的第一个子级的样式。	|2|
|`:before`|	`p:before`|	在每个`<p>`元素之前插入内容	|2|
|`:after`|	`p:after`|	在每个`<p>`元素之后插入内容	|2|
|`:lang(language)`|	`p:lang(it)`	|选择一个lang属性的起始值="it"的所有<p>元素	|2|
|`element1~element2`|	`p~ul`|	选择p元素之后的每一个ul元素	|3|
|`[attribute^=value]`|	`a[src^="https"]`|	选择每一个src属性的值以"https"开头的元素	|3|
|`[attribute$=value]`|	`a[src$=".pdf"]`|	选择每一个src属性的值以".pdf"结尾的元素	|3|
|`[attribute*=value]`|	`a[src*="runoob"]`|	选择每一个src属性的值包含子字符串"runoob"的元素	|3|
|`:first-of-type`|	`p:first-of-type`|	选择每个p元素是其父级的第一个p元素	|3|
|`:last-of-type`|	`p:last-of-type`|	选择每个p元素是其父级的最后一个p元素	|3|
|`:only-of-type`|	`p:only-of-type`|	选择每个p元素是其父级的唯一p元素	|3|
|`:only-child`|	`p:only-child`|	选择每个p元素是其父级的唯一子元素	|3|
|`:nth-child(n)`|	`p:nth-child(2)`	|选择每个p元素是其父级的第二个子元素	|3|
|`:nth-last-child(n)`|	`p:nth-last-child(2)`|	选择每个p元素的是其父级的第二个子元素，从最后一个子项计数	|3|
|`:nth-of-type(n)`|	`p:nth-of-type(2)`|	选择每个p元素是其父级的第二个p元素	|3|
|`:nth-last-of-type(n)`|	`p:nth-last-of-type(2)`|	选择每个p元素的是其父级的第二个p元素，从最后一个子项计数	|3|
|`:last-child`|	`p:last-child`|	选择每个p元素是其父级的最后一个子级。	|3|
|`:root`|	`:root`|	选择文档的根元素	|3|
|`:empty`|	`p:empty`|	选择每个没有任何子级的p元素（包括文本节点）	|3|
|`:target`|	`#news:target`|	选择当前活动的#news元素（包含该锚名称的点击的URL）	|3|
|`:enabled`|	`input:enabled`|选择每一个已启用的输入元素	|3|
|`:disabled`|	`input:disabled	`|选择每一个禁用的输入元素	|3|
|`:checked`|	`input:checked`|	选择每个选中的输入元素	|3|
|`:not(selector)`|	`:not(p)`|	选择每个并非p元素的元素	|3|
|`::selection`|	`::selection`|	匹配元素中被用户选中或处于高亮状态的部分	|3|
|`:out-of-range`|	`:out-of-range`|	匹配值在指定区间之外的input元素	|3|
|`:in-range`|	`:in-range`|	匹配值在指定区间之内的input元素	|3|
|`:read-write`	|`:read-write`|	用于匹配可读及可写的元素	|3|
|`:read-only`|	`:read-only`|	用于匹配设置 "readonly"（只读） 属性的元素	|3|
|`:optional`|	`:optional`|	用于匹配可选的输入元素	|3|
|`:required`|	`:required`|	用于匹配设置了 "required" 属性的元素	|3|
|`:valid`|	`:valid`|	用于匹配输入值为合法的元素	|3|
|`:invalid`|	`:invalid`|	用于匹配输入值为非法的元素	|3|

### 组合使用
```css
/* 非最后一个元素 */
div:not(:last-child)
```

### `:before`和`::before`异同
首先要明白伪类和伪元素。
CSS3规定单冒号`:`用于伪类，伪类如：
* `:active`
* `:focus`
* `:hover`
* `:link`
* `:visited`
* `:first-child`
* `:lang`

CSS3规定双冒号`::`伪元素如：
* `:first-letter`
* `:first-line`
* `::before`
* `::after`

伪元素和伪类之所以这么容易混淆，是因为他们的效果类似而且写法相仿，但实际上 css3 为了区分两者，已经明确规定了伪类用一个冒号来表示，而伪元素则用两个冒号来表示。但因为兼容性的问题，所以现在大部分还是统一的单冒号，但是抛开兼容性的问题，我们在书写时应该尽可能养成好习惯，区分两者。双冒号是在当前规范中引入的，用于区分伪类和伪元素。不过浏览器需要同时支持旧的已经存 在的伪元素写法，比如`:first-line`、`:first-letter`、`:before`、`:after`等，而新的在CSS3中引入的伪元素则不允许再支持旧的单冒号的写法。那么现在就可以完整的回答标题中的问题了，对于CSS2之前已有的伪元素，比如`:before`，单冒号和双冒号的写法`::before`作用一样的。所以，如果你的网站只需要兼容webkit、firefox、opera等浏览器，建议对于伪元素采用双冒号的写法，如果不得不兼容IE浏览器，还是用CSS2的单冒号写法比较安全。

伪类与伪元素的特性及其区别：
* 伪类本质上是为了弥补常规CSS选择器的不足，以便获取到更多信息；
* 伪元素本质上是创建了一个有内容的虚拟容器；
* CSS3中伪类和伪元素的语法不同；   伪类  :link  :hover         伪元素  ::before    ::after
* 可以同时使用多个伪类，而只能同时使用一个伪元素；
* 其中伪类和伪元素的根本区别在于：它们是否创造了新的元素,这个新创造的元素就叫  "伪无素" 。
* 伪元素/伪对象：不存在在DOM文档中，是虚拟的元素，是创建新元素。 这个新元素(伪元素)  是某个元素的子元素，这个子元素虽然在逻辑上存在，但却并不实际存在于文档树中.
* 伪类：存在DOM文档中，(无标签,找不到,  只有符合触发条件时才能看到 ),  逻辑上存在但在文档树中却无须标识的“幽灵”分类。
* 因为伪类是类似于添加类所以可以是多个，而伪元素在一个选择器中只能出现一次，并且只能出现在末尾

### 选择符的权重

css中用四位数字表示权重，权重的表达方式如：0，0，0，0

* 重要性声明的特殊性总是胜过非重要性声明: `color: red !important`
* 标签选择符的权重为0001: `div`
* class选择符的权重为0010: `.wrap`
* id选择符的权重为0100: `#chart`
* 属性选择符的权重为0010: `[type^=a]`
* 伪类选择符的权重为0010: `:hover`
* 伪元素选择符的权重为0001: `::after`
* 包含选择符的权重：为包含选择符的权重之和
* 内联样式的权重为1000
* 相邻选择器、同胞选择器、通配选择器、子选择符的权重为0000
* 继承样式的权重低于0000

### LVHT

“LVHT”指的是我们写 CSS 时常使用的“a:link、a:visited、a:hover、a:active”顺序，主要是依靠级联的最后一条规则“声明出现在文档中的顺序越后，权重越大”。
一般来说，我们不会使用“a:active:hover、a:hover:link”等选择器。由于我们总是这四个状态的重要性依次递增，所以推荐“LVHT”顺序，也可以记为“Love&Hate”。
从“LVHT”这个例子可以看出我为什么觉得“级联”是CSS最吸引人的地方。级联概念能体现出一种简单但深刻的理念——设计人员总是希望用户在浏览器中与网页交互得到正确的反馈，就好比悬浮按钮时有样式反馈，点击按钮时有激活提示——级联迫使设计人员（开发者）思考“我们能提供什么信息”、“我们鼓励用户做什么”。
