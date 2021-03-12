// with polyfills
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Viser from 'viser-vue'
import Vue from 'vue'
import VueCropper from 'vue-cropper'
import App from './App.vue'
import Dialog from './components/Dialog'
import MultiTab from './components/MultiTab'
import PageLoading from './components/PageLoading'
import bootstrap from './core/bootstrap'
// ext library
import './core/directives/action'
import './core/lazy_use' // use lazy load components
import PermissionHelper from './core/permission/permission'
import './global.less' // global style
// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'
import './permission' // permission control
import router from './router'
import store from './store/'
import './utils/filter' // global filter
import { VueAxios } from './utils/request'

Vue.use(Dialog) // this.$dialog func
Vue.use(MultiTab)
Vue.use(PageLoading)
Vue.use(PermissionHelper)
Vue.use(VueCropper)
Vue.use(Viser)
// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)
Vue.config.productionTip = false

// window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
