// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'
import './assets/iconfont.css'
import store from '@/store/index.js'
import '@/permission' // 路由守卫处理权限
import '@/utils/rem'

//promise兼容IE？
require('es6-promise').polyfill();

Vue.config.productionTip = false
Vue.use(ElementUI)


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
