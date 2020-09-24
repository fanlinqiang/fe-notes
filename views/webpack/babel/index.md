# babel

> Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。
下面列出的是 Babel 能为你做的事情：
* 语法转换
* 通过 Polyfill 方式在目标环境中添加缺失的特性 (通过 @babel/polyfill 模块)
* 源码转换 (codemods)


## Babel 工作原理

babel的工作过程分为三个阶段：parsing(解析)、transforming（转化）、printing（生成）

* parsing阶段babel内部的 babylon 负责将es6代码进行语法分析和词法分析后转换成抽象语法树
* transforming阶段内部的 babel-traverse 负责对抽象语法树进行变换操作
* printing阶段内部的 babel-generator 负责生成对应的代码


其中第二步的转化是重中之重，babel的插件机制也是在这一步发挥作用的，plugins在这里进行操作，转化成新的AST，再交给第三步的babel-generator。
所以像我们上面说的如果没有这些plugins进驻平台，那么babel这个“平台”是不具备任何能力的。就好像这样：

```
const babel = code => code;
```

因此我们可以有信心的说出那个答案“需要”。不仅需要polyfill，还需要大量的plugins。
