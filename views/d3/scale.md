# [比例尺](https://github.com/d3/d3/wiki/%E6%AF%94%E4%BE%8B%E5%B0%BA)

>比例尺 是将定义域映射为值域的函数 数值比例尺 有连续的定义域，例如一系列数字或时间。序数比例尺有离散的定义域，例如一组名称或类别。

!> 比例尺对象（例如，由d3.scale.linear返回的对象）的返回值既是一个对象也是一个函数。

### 线性比例尺`d3.scale.linear()`
> 默认域[0,1]构造一个新的比例尺，默认的范围为[0,1]。因此，默认比例尺相当于数字恒等函数；例如linear(0.5)返回0.5。

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

## 序数比例尺 Ordinal Scales

序数比例尺输入域和输出域都使用离散的数据。例如：序数比例尺可以将一组类别映射到一组颜色。

```js
var ordinal = d3.scaleOrdinal()
                .domain([0, 1, 2, 3, 4])  // 输入域
                .range(["red", "blue", "green", "yellow", "black"]); // 输出域

ordinal(0); //返回 red
ordinal(2); //返回 green
ordinal(4); //返回 black
```

如果输入域长度大于输出域的长度，则按照顺序循环依次对应`range()`的值


```js
var ordinal = d3.scaleOrdinal()
                .domain([0, 1, 2, 3])  // 输入域
                .range(["red", "blue"]); // 输出域

ordinal(0); //返回 red
ordinal(1); //返回 blue
ordinal(2); //返回 red
ordinal(3); //返回 blue
```

### 语法

#### d3.scaleOrdinal([[domain, ]range])

构造具有指定域和范围的新序数比例尺。
* 如果未指定域，则默认为空数组。
* 如果未指定范围，则默认为空数组；
* 在定义非空范围之前，序数刻度始终返回未定义。

```js
color = d3.scaleOrdinal(d3.schemeCategory10)
color('a') === color('a')

// 可以不指定输入域
color = d3.scaleOrdinal().range(['red', 'green', 'yellow']);
color(1) // red
color('a') // green
color('a') // green
```

#### ordinal.domain([domain])

* 如果指定了域，则将域设置为指定的值数组。域中的第一个元素将映射到范围中的第一个元素，第二个域值映射到第二个范围值，依此类推。域值存储在从字符串化值到索引的映射中；然后使用生成的索引从范围中检索值。因此，序标度的值必须可以强制为字符串，并且域值的字符串化版本唯一地标识相应的范围值。
* 如果未指定域，则此方法返回当前域。
