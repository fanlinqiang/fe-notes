# 选择器

[https://github.com/d3/d3/wiki/%E9%80%89%E6%8B%A9%E5%99%A8#d3_selection](https://github.com/d3/d3/wiki/%E9%80%89%E6%8B%A9%E5%99%A8#d3_selection)


## 选择元素

> 一个选择就是从当前文档中抽取的一组元素。D3使用CSS3来选择页面元素。例如，你可以使用的选择方式有标签 ("div")、类(“.awesome”)、唯一标识符(“#foo”)、属性(“[color=red]”)、或者包含(“parent child”)。选择器可以是交叉(".this.that" 表示逻辑与)的也可以是联合的(".this, .that" 表示逻辑或)。如果你的浏览器不支持选择器，你可以在D3前包含Sizzle来支持向后兼容。

语法:
`select`与`selectAll`这两个方法都支持接收一个选择器字符串或节点
``` js
// selector 选中与指定选择器字符串匹配的第一个元素，返回单元素选择结果。
// node 选择指定的节点。如果你已经有一个节点的引用这将是很有用的。例如事件监听器中的d3.select(this) 或者一个全局对象例如document.body。这个函数不会遍历DOM树。
d3.select(selector | node)

// selector 选中匹配指定选择器的所有的元素。这些元素会按照文档的遍历顺序（从上到下）选择。如果当前文档中没有匹配的元素则返回空的选择。
// nodes 选择指定的元素数组。如果你已经有了一些元素的引用这将是很有用的，例如事件监听器中的d3.selectAll(this.childNodes)，或者一个全局对象例如document.links。节点的参数不用恰好是数组；任何可以转化为一个数组的伪数组（例一个NodeList或者 arguments）都可以，这个函数不会遍历DOM树。
d3.selectAll(selector | nodes)
```

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">
  <template>
    <div class="wrapper">
        <div id="select"></div>
        <input type="checkbox">
        <div class="selectAll"></div>
        <div class="selectAll"></div>
    </div>
  </template>

  <script>
    module.exports = {
      mounted () {
        // d3.select(selector), 选中与指定选择器字符串匹配的第一个元素
        // d3.select(node), 选择指定的节点,这个函数不会遍历DOM树。
        d3.select('#select')
            .text('select')
            .classed('foo bar', true) //classed(name[, value]),value可以是一个对象、函数, function (前数据元素d, 和当前索引i),this指向当前dom
            .style('color', 'blue') //style(name[, value[, priority]]),value可以是一个对象、函数

        d3.select('input[type="checkbox"]')
            .property('checked', true); // property(name[, value]),一些HTML元素具有特殊的属性使用标准的属性或样式是不可寻址的。例如，表单文本（text）字段有一个value字符串属性，复选框（checkboxes）有一个checked布尔型属性。可以使用property操作符来获取或设置这些属性,或任何其他基本元素的可寻址字段，例如className。


        // d3.selectAll(selector | nodes)
        d3.selectAll('.selectAll')
            .html('<p style="color: red">selectAll</p>')
            .attr('role', 'selectAll') //attr(name[, value]) 通过指定的name为指定的value设置属性;value可以是一个函数, function (前数据元素d, 和当前索引i),this指向当前dom
            .insert('span', ":first-child") //insert(name[, before]),在当前选择与指定before选择器匹配的每个元素之前插入具有指定name的新元素，返回包含插入的元素的一个新的选择。
            .append('span') // append(name),在当前选择的每个元素最后追加具有指定名称的新元素，返回包含追加元素的新选择。
            .remove(); //删除当前选择中的元素
      }
    }
  </script>
</script>

## 操作选择

选择是一组元素。D3绑定额外的方法到数组上。所以你可以在选中的元素上应用操作，例如为所有选中的元素设置属性值。一个细微的差别是选择结果是分组的，而不是一个一维数组。每一个选择都是元素数组中的一个数组。这保留了自选择的层次结果，大多数情况下你可以忽略这个细节，这就是为什么一个单一的元素选择看起来像 [[node]] 而不是 [node] 。

### 内容

#### selection.attr(name[, value])

* 如果指定了value参数，将为所有选中的元素通过指定的name为指定的value设置属性。
    * 如果value是一个常数，那么所有的元素都将设置为相同的属性值；
    * 如果value是一个函数，那么这个函数会为每个选中的元素（按顺序）计算。入参是当前数据元素d和当前索引i，以及代表当前DOM元素的this上下文。这个函数的返回值接下来用来设置每个元素的属性。
    * null值将移除指定的属性。
* 指定的name参数也会含有一个前缀，例如xlink:href是用来指定Xlink命名空间中href属性的。默认情况下，D3支持svg、xhtml、xlink、xml和 xmlns命名空间。可以添加d3.ns.prefix来注册其他的命名空间。
* 如果value参数没有指定，就会返回为选择中第一个非空（null）元素所指定的属性值。一般来说，只有当你知道选择中恰好包含一个元素时才有用。
* name也可以是一个name和value属性对象。??

d3 暂无可同时赋值多个attr的方法，可以在原型上自定义：
```js
// 添加$attrs，支持传递obj类型
d3.selection.prototype.$attrs = function (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
        this.attr(key, value);
    });
    return this;
};
// 使用
d3.select('#content')
    .attrs({
        'data-id': 1,
        'name': 'a'
    })
```

#### selection.classed(name[, value])

它能识别class属性是一个按照空格分隔的标记集合。

* 如果value属性被指定，不论是否指定类都会与选定元素相结合。
    * 如果value是一个常量且其值为真，那么所有的元素都会被分配指定的类（还没分配的话）。
    * 如果其值为假，那么就会移除选中元素的class（已经分配过）。
    * 如果value是一个函数，那么这个函数会为每个选中的元素（按顺序）计算。入参是当前数据元素d和当前索引i，以及代表当前DOM元素的this上下文。这个函数的返回值接下来用来分配或者不分配每个元素的class。
* 如果你想一次设置多个class可以使用一个对象，文字如同：`selection.classed({'foo': true, 'bar': false})`，或者使用以空格分隔的class列表形如：`selection.classed('foo bar', true)`。
* 如果value没有被指定，当且仅当选择中首个非空值有指定的class就会返回true。一般来说，只有当你知道选择中恰好包含一个元素时才有用。

#### selection.style(name[, value[, priority]])

* 如果value参数被指定，通过指定名称和指定的值为所有选中的元素设置CSS样式属性。
    * 如果value是一个常数，那么所有的元素都设置相同的样式值；
    * 否则，如果值是一个函数，则该函数为每个选定的元件（按顺序）计算，入参是当前数据元素d和当前索引i，以及代表当前DOM元素的this上下文。该函数的返回值被用来设置每个元素的样式属性。
    * null值将删除样式属性。
    * 可选参数priority也可以指定，无论是null空或字符串“important”（不带感叹号）
* 如果你想一次设置多个样式属性，使用对象文本: `selection.style({'stroke': 'black', 'stroke-width': 2})`
* 如果未指定值，则返回在选择中的第一个非空元素指定样式属性的当前计算值。只有当你知道选择只包含一个元素时是很有用的。需要注意的是计算的值可能与先前设置的值不同，尤其是当样式属性使用了简写属性（如“font”样式，这是简写为"font-size"，"font-face",“等）。

#### selection.property(name[, value])

一些HTML元素具有特殊的属性使用标准的属性或样式是不可寻址的。例如，表单文本（text）字段有一个value字符串属性，复选框（checkboxes）有一个checked布尔型属性。可以使用property操作符来获取或设置这些属性，，或任何其他基本元素的可寻址字段，例如`className`。

* 如果指定了value，就为所有选中的元素指定名称的属性设置指定的值（value）。
    * 如果值是一个常数，那么所有的元素被给予相同的属性值；
    * 如果value是一个函数，则该函数为每个选定的元素（按顺序）计算，入参是当前数据元素d和当前索引i，以及代表当前DOM元素的this上下文。该函数的返回值被用于设置每个元素的属性。
    * 空值将删除指定的属性。
* 如果你想一次设置多个属性，可以使用对象文本，如下所示：.property({'checked':true,'disabled': false});。
* 如果未指定值，则返回在选择中第一个非空元素指定属性的值。只有当你知道选择只包含一个元素这通常是很有用的。

#### selection.text([value])

文本操作符是基于textContent属性；设置文本内容将取代任何现有的子元素。

* 如果指定了value时，设置所有选择元素的文本内容为指定的值。
    * 如果value是一个常数，那么所有的元素被赋予相同的文本内容；
    * 如果value是一个函数，则该函数被每个选定的元素（按顺序）计算，入参是当前数据元素d和当前索引i，以及代表当前DOM元素的this上下文。该函数的返回值被用于设置每个元素的文本内容。
    * null值会清除内容。
* 如果未指定value，则返回在选择中第一个非空元素的文本内容。只有当你知道选择只包含一个元素时这通常是很有用的。

#### selection.html([value])

html的操作基于innerHTML属性；设置内部HTML内容将取代任何现有的子元素。适用于少量但有丰富格式的HTML。

* 如果指定了value，为所有选择的元素设置在内部的HTML内容为指定的值。
    * 如果value是一个常数，那么所有的元素被给予相同的内部HTML内容；
    * 如果value是一个函数，则该函数为每个选定的元素（按顺序）计算，入参是当前数据元素d和当前索引i，以及代表当前DOM元素的this上下文。该函数的返回值被用于设置每个单元的内部的HTML内容。
    * null值会清除内容。
* 如果未指定value，则返回在选择中第一个非空元素的内部HTML内容。

!> 注：正如它的名字所暗示的，selection.html仅支持HTML元素。 SVG元素和其它非HTML元素不支持innerHTML属性，因此与selection.html不相容。请考虑使用XMLSerializer转换DOM树为文本。参见[innersvg polyfill](https://code.google.com/p/innersvg/)，它提供了一个垫片以支持SVG元素的innerHTML属性。

#### selection.append(name)

在当前选择的每个元素最后追加具有指定名称的新元素，返回包含追加元素的新选择。每个新的元素继承当前元素的数据（如果有的话）和select相同的方式使用子选择。

* 这个name可以被指定为一个常量字符串或一个函数，返回追加的DOM元素。
* 当name被指定为一个字符串，它可能有以下形式的命名空间前缀“namespace:tag”。例如，“svg:text”将在svg命名空间创建“text”元素。默认情况下，D3支持svg，xhtml，xlink的，xml和xmlns命名空间。
* 其他的命名空间可以通过添加到d3.ns.prefix注册。如果没有指定命名空间，那么命名空间会从封闭的元素继承；或者，如果该名称是已知的前缀之一，相应的命名空间将被使用（例如，“svg”表示“svg:svg”）。

#### selection.insert(name[, before])
在当前选择与指定before选择器匹配的每个元素之前插入具有指定name的新元素，返回包含插入的元素的一个新的选择。如果before选择器不匹配任何元素，那么新元素将用append追加为最后一个子元素。每一个新元素继承当前元素（如果有的话）的数据，子选择（subselections）和select以同样的方式。

* 这个name可以被指定为一个常量字符串或一个函数，返回追加的DOM元素。当name被指定为一个字符串，它可能有以下形式的命名空间前缀“namespace:tag”。
* before选择器可以被指定为一个选择器字符串或一个函数，它返回一个DOM元素。例如，insert("div", ":first-child")将在当前选择前面加上div子节点。对于enter选择器，before选择器在这种情况下也可以省略：输入的元素将被立即插入到更新选择紧随的兄弟元素前（如果有的话）。这使您可以插入DOM的元素与绑定的数据是一致的顺序。但是请注意，如果更新元素修改了顺序，selection.order可能仍然需要。

#### selection.remove()

删除从当前文档当前选择中的元素。返回“屏幕外（off-screen）”的当前选择（除去了相同的元素），从DOM分离。需要注意的是目前还没有一个专门的API来重新添加删除的元素到文档；然而，你可以通过一个函数来selection.append或selection.insert重新添加元素。

#### selection.clone([deep])

在所选元素之后立即插入所选元素的克隆，并返回新添加的克隆的选择。 如果deep是真实的，则所选元素的后代节点也将被克隆。 否则，将仅克隆元素本身。 相当于：
```js
selection.select(function() {
  return this.parentNode.insertBefore(this.cloneNode(deep), this.nextSibling);
});
```

### 数据

#### selection.data([values[, key]])

连接指定的一组数据的和当前选择。指定的values是一组数据值（例如，数字或对象）或一个函数返回一组值。如果没有指定key函数，则values的第一数据被分配到当前选择中第一元素，第二数据分配给当前选择的第二个元素，依此类推。当数据被分配给一个元素，它被存储在属性__data__中，从而使数据“沾粘”，从而使数据可以再选择。

data操作的结果是update选择;这表示选择的DOM元素已成功绑定到指定的数据元素。update选择还包含对enter和exit的选择，对应于添加和删除数据节点。

key函数可以被指定为控制数据是如何连接元素。这取代默认的by-index行为;key函数被新数据数组中的每个元素调用一次，并再次用于选择中的每个元素。在这两种情况下的key函数是通过传递数据d与索引i。当key 函数上被新的数据元素评价时，this上下文是数据数组；当key 函数被现有选择评估时，this上下文是相关的DOM元素。key函数，基于先前结合的数据返回一个用于连接数据和相关的元素的字符串。例如，如果每个数据都有一个唯一的字段name，该连接可以被指定为.data(data, function(d) { return d.name; })。如果指定了key函数，data操作符也影响节点的索引；该索引被作为第二个参数i作为任何运算符函数的参数。然而，请注意，现有的DOM元素不自动重新排序；根据需要使用sort或order函数。

这个values选择中的每组数据。因此，如果选择具有多个组（例如，一个d3.selectAll后跟一个selection.selectAll)），然后data应该被指定为一个函数，该函数返回一个数组（假设你对每个组想要不同的数据）。该函数将被传递的当前组数据（或undefined）和索引，组的this上下文。 例如，可以将一个二维数组和初始选择绑定，然后将包含的内部数组和每个子选择绑定。在这种情况下，values函数是标识函数：它被每个组中的子元素调用，被传递绑定到父元素的数据，并且返回这个数据数组。

```js
var matrix = [
  [11975,  5871, 8916, 2868],
  [ 1951, 10048, 2060, 6171],
  [ 8010, 16145, 8090, 8045],
  [ 1013,   990,  940, 6907]
];

var tr = d3.select("body").append("table").selectAll("tr")
    .data(matrix)
  .enter().append("tr");

var td = tr.selectAll("td")
    .data(function(d) { return d; })
  .enter().append("td")
    .text(function(d) { return d; });
```
如果未指定values，则此方法返回选择中的第一组数据的数组。返回的数组的长度，将与第一组的长度匹配，并且在返回的数组中的每个数据的索引将匹配选择中相应的索引。如果选择的某些元素为null，或者如果他们有没有相关的数据，则数组中的相应元素将是undefined。

!> 注意：data方法不能用于清除先前结合数据；可以使用selection.datum代替。

#### selection.join()

根据需要追加，删除和重新排序元素，以匹配先前由selection.data绑定的数据，返回合并的enter和update选择。 此方法是显式常规更新模式的便捷替代方法，它替换了selection.enter，selection.exit，selection.append，selection.remove和selection.order。

```js
svg.selectAll("circle")
  .data(data)
  .join("circle")
    .attr("fill", "none")
    .attr("stroke", "black");
// 完整版
svg.selectAll("circle")
  .data(data)
  .join(
    enter => enter.append("circle"),
    update => update,
    exit => exit.remove()
  )
    .attr("fill", "none")
    .attr("stroke", "black");
```

#### selection.enter()

返回输入（enter）选择：当前选择中存在但是当前DOM元素中还不存在的每个数据元素的占位符节点。

* 此方法只在由data运算符返回的更新选择中定义。
* 输入选择只定义了append（append），insert（insert），select（select）和call（call）操作符,使用这些操作符必须在修改任何内容之前实例化输入元素。

```js
var update_sel = svg.selectAll("circle").data(data)
update_sel.attr(/* operate on old elements only */)
update_sel.enter().append("circle").attr(/* operate on new elements only */)
update_sel.attr(/* operate on old and new elements */)
update_sel.exit().remove() /* complete the enter-update-exit pattern */
```

####  selection.exit()

返回退出（exit）选择：找出在当前选择存在的DOM元素中没有新的数据元素时。此方法只被定义在data运算符返回的更新选择。exit选择定义了所有的正常操作符，但通常你主要使用的是remove；其他操作符存在的主要目的是让您可以根据需要定义一个退出的过渡。请注意，exit操作符只是返回一个exit选择引用，由你来删除新节点。

```js
d3.select("body")
    .selectAll("div")
    .data([1, 2, 4, 8, 16, 32], function(d) { return d; })
    .enter()
    .append("div")
    .text(function(d) { return d; });;
```

#### selection.filter(selector)

过滤选择，返回一个新的选择只包含其指定的selector是true的元素。selector可以被指定为一个函数或作为选择的字符串，如“.foo”。和其他操作符一样，该函数被传递当前数据d和索引i，以及this上下文作为当前的DOM元素。

```js
var odds = selection.select(function(d, i) { return i & 1 ? this : null; });
// 等价于
var odds = selection.filter(function(d, i) { return i & 1; });
var odds = selection.filter(":nth-child(even)");
```
#### selection.datum([value])

如果指定value，就为所有选中的元素设置元素的绑定数据为指定的值。

* 如果value是一个常数，所有的元素被给予相同的数据；
* 否则，如果value是一个函数，则该函数为每个选定的元素计算，被传递以前的数据d与当前索引i，使用this上下文作为当前的DOM元素。该函数之后被用来确定每个元素的数据。
* null值将删除绑定的数据。该操作数对索引没有影响。

如果未指定value，则返回在选择中绑定第一个非空的元素的数据。只有当你知道选择只包含一个元素这通常是很有用的。

#### selection.sort([comparator])
与浏览器内置的数组排序方法具有相同的行为。比较器函数默认为d3.ascending，通过传递两个数据元素a和b进行比较，并返回任一负的，正的，或零值。如果为负，则a应该在b之前；如果为正，则a应该为b后；否则a和b被认为是相等的顺序是任意的。

#### selection.order()

按照已选数据重新排序文档中的元素

#### selection.raise()

按顺序将每个选定元素追加到父元素的末尾。相当于
```js
selection.each(function() {
  this.parentNode.appendChild(this);
});
```


#### selection.lower()

按顺序将每个选定元素重新插入父元素的头部。相当于
```js
selection.each(function() {
  this.parentNode.insertBefore(this, this.parentNode.firstChild);
});
```
#### d3.create(name)

给定指定的元素名称，则返回一个单元素选择，其中包含当前文档中给定名称的分离元素。 此方法采用HTML命名空间，因此在创建SVG或其他非HTML元素时，必须显式指定一个命名空间。

```js
d3.create("svg") // equivalent to svg:svg
d3.create("svg:svg") // more explicitly
d3.create("svg:g") // an SVG G element
d3.create("g") // an HTML G (unknown) element
```

#### d3.creator(name)

给定指定的元素名称，返回一个函数，该函数创建给定名称的元素，并假定它是父元素。 selection.append和selection.insert在内部使用此方法来创建新元素。

```js
selection.append("div");
// 等价于
selection.append(d3.creator("div"));
```
