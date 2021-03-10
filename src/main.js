// with polyfills
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import themePluginConfig from '../config/themePluginConfig'
import App from './App.vue'
import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
import './global.less' // global style
// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'
import './permission' // permission control
import router from './router'
import store from './store/'
import './utils/filter' // global filter
import { VueAxios } from './utils/request'

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
