# Vue

## 组件通信

* `v-bind:`(简写`:`)与`props`
例：
```
Child(v-bind:title="post.title")
```

* `v-on:`(简写`@`)与`$emit`,例：`button(v-on:[event]="doThis")`
* `$root`、`$parent`和 `$children`
* `$attrs`和 `$listeners`,
    * `$attrs`包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。
    * `$listeners`包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。

例：
```
Child(v-bind="$attrs", v-on="$listeners")
```

* Provide & Inject
> https://cn.vuejs.org/v2/api/#provide-inject

!> provide 和 inject 主要在开发高阶插件/组件库时使用。并不推荐用于普通应用程序代码中。
!> 提示：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。

这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。

```js
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}

// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
```

* ref
* EventBus
* Vuex
* Vue.observable
```js
const state = Vue.observable({ count: 0 })

const Demo = {
  render(h) {
    return h('button', {
      on: { click: () => { state.count++ }}
    }, `count is: ${state.count}`)
  }
}
```
