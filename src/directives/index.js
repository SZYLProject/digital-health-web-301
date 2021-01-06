import Vue from 'vue'

// 普通<input>的自定义指令操作
// 【普通<input>的自定义指令使用】：v-"+指令名"
// <input v-focus placeholder="因为有v-focus,所以我聚焦了" />

Vue.directive('focus', {
  inserted (el, binding, vnode) {
    // 聚焦元素
    el.focus()
  }
})

// <el-input>的自定义指令操作
// 【<el-input>的自定义指令使用】：v-"+指令名"
// <el-input v-fo placeholder="因为有v-fo,所以我聚焦了"></el-input>

Vue.directive('fo', {
  inserted (el, binding, vnode) {
    // 聚焦元素
    el.querySelector('input').focus()
  }
})
