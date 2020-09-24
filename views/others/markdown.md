## 标题
一个`#`是一级标题，二个`#`是二级标题，以此类推，支持六级标题。`#`后紧跟空格
```
# 这是一级标题
## 这是二级标题
### 这是三级标题
#### 这是四级标题
##### 这是五级标题
###### 这是六级标题
```
## 字体
```
**加粗**
*倾斜*
***斜体加粗***
~~删除线~~
```
## 引用
```
>引用的内容
>>引用的内容2
>>>>>>>>>>引用的内容3
```

### 引用嵌套：
```
> 引用嵌套-1
>> 引用嵌套-2
```
> 引用嵌套-1
>> 引用嵌套-2

## 分割线
三个及三个以上的`*`或`-`

```
***
*****
----
---
```

## 图片
alt：显示在图片下面的文字；title：图片的标题，当鼠标hover时显示的内容，可选
```
![alt](url 'title')
```

## 超链接
name：展现的文本；url：链接地址；title：当鼠标hover时显示的内容，可选
```
[name](url "title")
```

## 列表
### 无序列表
用 - + * 任何一种都可以，- + * 紧跟一个空格
```
- 列表内容
+ 列表内容
* 列表内容
```
### 有序列表
数字加点，点后紧跟空格
```
1. 列表内容
2. 列表内容
3. 列表内容
```
### 嵌套列表
上下级之间敲三个空格
```
* 一级无序列表内容
   1. 二级有序列表内容
   2. 二级有序列表内容
```
### 表格
第二行分割表头和内容。 `-`有一个就行，为了对齐，多加了几个；文字默认居左 `-`两边加`:`表示文字居中 -右边加`:`表示文字居右
```
表头|表头|表头
---|:--:|---:
内容|内容|内容
内容|内容|内容
```

> 可视化生成表格：https://www.tablesgenerator.com/markdown_tables

## 代码
### 单行代码
```
`code in here`
```
### 代码块
<pre data-lang="">
```
code
```
</pre>
### 背景图片
```
![](_media/bg.png)
```
## 背景色
```
![color](#f0f0f0)
```

## 隐藏项

```html
<details>
    <summary>摘要</summary>
    <p>
        #### 内容项目
    </p>
</details>
```

<details><summary><b>答案</b></summary>
<p>
#### 答案: D

testtest
</p>
</details>


[流程图等](https://mermaidjs.github.io/#/README?id=flowchart)