# 数据绑定
[https://github.com/d3/d3/wiki/%E9%80%89%E6%8B%A9%E5%99%A8#data](https://github.com/d3/d3/wiki/%E9%80%89%E6%8B%A9%E5%99%A8#data)
### selection.data([values[, key]])

>连接指定的一组数据的和当前选择。指定的values是一组数据值（例如，数字或对象）或一个函数返回一组值。如果没有指定key函数，则values
的第一数据被分配到当前选择中第一元素，第二数据分配给当前选择的第二个元素，依此类推。当数据被分配给一个元素，它被存储在属性__data__中，从而使数据“粘贴”，从而使数据可以再选择。

!> key函数可以被指定为控制数据是如何连接元素。这取代默认的by-index行为;key函数被新数据数组中的每个元素调用一次，并再次用于选择中的每个元素。
<br/>`data`操作的结果是`update`选择;这表示选择的DOM元素已成功绑定到指定的数据元素。`update`选择还包含对`enter`和`exit`的选择，对应于添加和删除数据节点。

### selection.enter()
>返回输入（enter）选择：当前选择中存在但是当前DOM元素中还不存在的每个数据元素的占位符节点。

!> 此方法只在由data运算符返回的更新选择中定义。此外，输入选择只定义了：
<br/>`selection.append(name)`，在当前选择的每个元素最后追加具有指定名称的新元素，返回包含追加元素的新选择。
<br/>`selection.insert(name[, before])`，在当前选择与指定before选择器匹配的每个元素之前插入具有指定name的新元素，返回包含插入的元素的一个新的选择。如：`insert("div", ":first-child")`
<br/>`selection.select(selector | node)`（select）,选中与指定选择器字符串匹配的第一个元素或指定节点
<br/>`selection.call(function[, arguments…])`,调用指定的函数一次，通过在当前的选择以及任何可选参数。无论指定函数的返回值是什么，call操作符总是返回当前的选择。
<br/>使用这些操作符修改任何内容之前，必须先实例化输入元素。

### selection.exit()
> 返回退出（exit）选择：找出在当前选择存在的DOM元素中没有新的数据元素时。

!> 此方法只被定义在data运算符返回的更新选择。常用方法 `div.exit().remove()`

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">
    <template>
        <div class="wrapper" id="test"></div>
    </template>
    <script>
        module.exports = {
            mounted () {
                var matrix = [
                  [11975,  5871, 8916, 2868],
                  [ 1951, 10048, 2060, 6171],
                  [ 8010, 16145, 8090, 8045],
                  [ 1013,   990,  940, 6907]
                ];
                var tr = d3.select("#test").append("table").selectAll("tr")
                        .data(matrix) // 返回的是`update`选择
                        .enter() // 此方法只在由data运算符返回的更新选择中定义
                        .append("tr");
                var td = tr.selectAll("td")
                    .data(function(d) { return d; })
                    .enter().append("td")
                    .sort((a, b) => a - b)
                    .text(function(d) { return d; });
            }
        }
    </script>
</script>
