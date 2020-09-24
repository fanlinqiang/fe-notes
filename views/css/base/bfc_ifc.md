## BFC&IFC
布局时，会依据盒子的类型生成 块级格式化上下文BFC（Block Formatting Context） 或是 内联格式化上下文IFC（Inline Formatting Context），它们使盒子在界面上形成一个独立的，不影响外界的容器。


### BFC

最直观的感受肯定是 HTML 元素，即根元素，它是浏览器中最重要的一个独立的不影响外界的容器。根元素会创建 BFC，在一些情况下，其它元素也会。创建 BFC 的方法或者说BFC形成的条件：

* 根元素，即`html`
* 浮动元素，float属性不为none（脱离文档流）
* 绝对定位元素，position为absolute或fixed
* Overflow 不为 Visible 的块级元素，即hidden，auto，scroll
* 行内块元素，弹性元素，网格元素：inline-block,flex,inline-flex,grid
* 表格单元格，表格标题：table-cell,table-caption,
* CSS3 中新增了一种 display: flowRoot 可以用来创建无副作用的 BFC。

BFC 在布局时，会应用以下规则，需要注意：

* 内部的box会在垂直方向，一个接一个的放置
* box垂直方向的距离由margin决定，属于同一个bfc的两个相邻box的margin会发生重叠
* 每个元素的margin box的左边，与包含块border box的左边相接触（对于从做往右的格式化，否则相反）
* BFC 内部的相邻的块级盒子的垂直外边距会折叠。

<details>
    <summary>计算 BFC 的高度时，内部浮动的盒子也会参与计算。</summary>
    <div style="overflow:hidden;border:1px solid #ccc;">
        <div style="float:left;border:1px solid #aaa;line-height: 60px;">Float</div>
        BFC
    </div>
</details>

<details>
    <summary>BFC 不会和外部浮动元素重叠</summary>
    <div style="overflow:hidden;">
        <div style="float:left;border:1px solid #aaa;line-height: 60px;">Float</div>
        <div style="border: 1px solid blue;">div</div>
        <div style="display: inline-block;border: 1px solid red;">BFC</div>
    </div>
</details>

!> 规则是作用于BFC内部的元素，而条件则是作用于BFC容器的

#### bfc应用

1. 自适应两栏布局
2. 清除内部浮动
3. 防止垂直margin重叠

### IFC

如果一个块级盒内部只有行内盒子(即块级元素中仅包含内联级别元素)，那么会创建一个行内上下文，其内部的盒子按照 IFC 的规则排列。需要注意的是当IFC中有块级元素插入时，会产生两个匿名块将父元素分割开来，产生两个IFC

#### IFC布局规则

* 子元素水平方向横向排列，并且垂直方向起点为元素顶部。
* 子元素只会计算横向样式空间，【padding、border、margin】，垂直方向样式空间不会被计算，【padding、border、margin】。
* 在垂直方向上，子元素会以不同形式来对齐（vertical-align）
* 能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框（line box）。行框的宽度是由包含块（containing box）和与其中的浮动来决定。
* IFC中的“line box”一般左右边贴紧其包含块，但float元素会优先排列。
* IFC中的“line box”高度由 CSS 行高计算规则来确定，同个IFC下的多个line box高度可能会不同。
* 当 inline-level boxes的总宽度少于包含它们的line box时，其水平渲染规则由 text-align 属性值来决定。
* 当一个“inline box”超过父元素的宽度时，它会被分割成多个boxes，这些 oxes 分布在多个“line box”中。如果子元素未设置强制换行的情况下，“inline box”将不可被分割，将会溢出父元素。

#### 实例

<details>
    <summary>上下间距不生效可以使用IFC来解释</summary>
    <div>
        <div class="warp" style="border: 1px solid red; display: inline-block;">
            <span class="text" style="margin: 20px; background: green;">文本一</span>
            <span class="text" style="margin: 20px; background: green;">文本二</span>
        </div>
    <div>
</details>

<details>
    <summary>多个元素水平居中, 水平排列规则根据IFC容器的text-align值来排列，可以用来实现多个子元素的水平居中。</summary>
    <div>
        <div class="warp" style="border: 1px solid red; width: 200px; text-align: center;">
            <span class="text" style="background: green;">文本一</span>
            <span class="text" style="background: green;">文本二</span>
        </div>
    <div>
</details>

<details>
    <summary>float元素优先排列, IFC中具备float属性值的元素优先排列，在很多场景中用来在文章段落开头添加“tag”可以用到。</summary>
    <div>
        <div class="warp" style="border: 1px solid red; width: 200px;">
            <span class="text" style="background: green;">文本一</span>
            <span class="text" style="background: green;">文本二</span>
            <span class="text" style="background: green;float: left;">文本三</span>
            <span class="text" style="background: green;">文本四</span>
        </div>
    <div>
</details>

解决元素垂直居中、多个文本元素行高不一致排列混乱


### GFC（css3）

GFC(GridLayout Formatting Contexts)直译为"网格布局格式化上下文"，当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间。
那么GFC有什么用呢，和table又有什么区别呢？首先同样是一个二维的表格，但GridLayout会有更加丰富的属性来控制行列，控制对齐以及更为精细的渲染语义和控制。

### FFC（css3）

FFC(Flex Formatting Contexts)直译为"自适应格式化上下文"，display值为flex或者inline-flex的元素将会生成自适应容器（flex container），可惜这个牛逼的属性只有谷歌和火狐支持，不过在移动端也足够了，至少safari和chrome还是OK的，毕竟这俩在移动端才是王道。
Flex Box 由伸缩容器和伸缩项目组成。通过设置元素的 display 属性为 flex 或 inline-flex 可以得到一个伸缩容器。设置为 flex 的容器被渲染为一个块级元素，而设置为 inline-flex 的容器则渲染为一个行内元素。
伸缩容器中的每一个子元素都是一个伸缩项目。伸缩项目可以是任意数量的。伸缩容器外和伸缩项目内的一切元素都不受影响。简单地说，Flexbox 定义了伸缩容器内伸缩项目该如何布局。
