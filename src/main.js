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
import '@/directives' // 全局自定义指令
import '@/utils/myselfStorage' // vue 自定义监听本地存储
import Storage from '@/utils/storage'
import { DatePicker, ConfigProvider } from 'ant-design-vue'

import * as d3 from 'd3'

Vue.use(DatePicker)
Vue.use(ConfigProvider)
Vue.prototype.$Storage = Storage
Vue.config.productionTip = false
Vue.prototype.$d3 = d3
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
