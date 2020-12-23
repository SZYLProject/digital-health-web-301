import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'babel-polyfill'
import './plugins/element.js'
import '@/styles/index.scss' // global css
/* ions */
import '@/icons/Iconfont/iconfont.css' // class
import '@/icons' // icon symbol
import './permission' // permission control
import '@/filters' // 引入全局过滤
import Storage from '@/utils/storage.js'
import * as d3 from 'd3'
Vue.prototype.$Storage = Storage
Vue.config.productionTip = false
Vue.prototype.$d3 = d3

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
