<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
      <a-back-top />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export default {
  data () {
    return {
      locale: zhCN
    }
  }
}
</script>
