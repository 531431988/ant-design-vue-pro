<template>
  <pro-layout :menus="menus" :collapsed="collapsed" :mediaQuery="query" :isMobile="isMobile" :handleMediaQuery="handleMediaQuery" :handleCollapse="handleCollapse" :i18nRender="t => t" v-bind="settings">

    <!-- layout content -->
    <a-layout-content :style="{ height: '100%', paddingTop: fixedMultiTab ? '64px' : '0' }">
      <multi-tab v-if="multiTab && !isMobile" :class="{'fixed-multi-tab':fixedMultiTab}" :style="style"></multi-tab>
      <transition name="page-transition">
      </transition>
    </a-layout-content>

    <!-- 1.0.0+ 版本 pro-layout 提供 API，
          我们推荐使用这种方式进行 LOGO 和 title 自定义
    -->
    <template v-slot:menuHeaderRender>
      <div>
        <logo-svg />
        <h1>{{ title }}</h1>
      </div>
    </template>
    <!-- 1.0.0+ 版本 pro-layout 提供 API,
          增加 Header 左侧内容区自定义
    -->
    <template v-slot:headerContentRender>
      <div>
        <a-tooltip title="刷新页面">
          <a-icon type="reload" style="font-size: 18px;cursor: pointer;" @click="() => { $message.info('只是一个DEMO') }" />
        </a-tooltip>
      </div>
    </template>
    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" />
    </template>
    <!-- custom footer / 自定义Footer -->
    <template v-slot:footerRender>
      <global-footer />
    </template>
    <router-view />
  </pro-layout>
</template>

<script>

import { updateTheme } from '@ant-design-vue/pro-layout'
import { mapState } from 'vuex'
import { CONTENT_WIDTH_TYPE, SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'

import defaultSettings from '@/config/defaultSettings'
import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from '@/components/GlobalFooter'
import LogoSvg from '../assets/logo.svg?inline'

export default {
  name: 'BasicLayout',
  components: {
    RightContent,
    GlobalFooter,
    LogoSvg
  },
  data () {
    return {
      // preview.pro.antdv.com only use.
      isProPreviewSite: process.env.VUE_APP_PREVIEW === 'true' && process.env.NODE_ENV !== 'development',
      // end
      multiTab: defaultSettings.multiTab,
      fixedMultiTab: defaultSettings.fixedHeader,

      // base
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      title: defaultSettings.title,
      settings: {
        // 布局类型
        layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
        // CONTENT_WIDTH_TYPE
        contentWidth: defaultSettings.layout === 'sidemenu' ? CONTENT_WIDTH_TYPE.Fluid : defaultSettings.contentWidth,
        // 主题 'dark' | 'light'
        theme: defaultSettings.navTheme,
        // 主色调
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,
        multiTab: defaultSettings.multiTab,
        hideHintAlert: false,
        hideCopyButton: false
      },
      // 媒体查询
      query: {},

      // 是否手机模式
      isMobile: false
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    style () {
      const { settings: { layout }, collapsed } = this
      return {
        width: (layout === 'sidemenu' && collapsed) || layout === 'topmenu' ? '100%' : 'calc(100% - 250px)'
      }
    }
  },
  created () {
    const routes = this.mainMenu.find(item => item.path === '/')
    this.menus = (routes && routes.children) || []
    // 处理侧栏收起状态
    this.$watch('collapsed', () => {
      this.$store.commit(SIDEBAR_TYPE, this.collapsed)
    })
    this.$watch('isMobile', () => {
      this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
    })
  },
  mounted () {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }

    // first update color
    // TIPS: THEME COLOR HANDLER!! PLEASE CHECK THAT!!
    if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
      updateTheme(this.settings.primaryColor)
    }
  },
  methods: {
    handleMediaQuery (val) {
      this.query = val
      if (this.isMobile && !val['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
        // this.settings.fixSiderbar = false
      }
    },
    handleCollapse (val) {
      this.collapsed = val
    },
    handleSettingChange ({ type, value }) {
      console.log('type', type, value)
      type && (this.settings[type] = value)
      switch (type) {
        case 'contentWidth':
          this.settings[type] = value
          break
        case 'layout':
          if (value === 'sidemenu') {
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
          } else {
            this.settings.fixSiderbar = false
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed
          }
          break
      }
    }
  }
}
</script>

<style lang="less">
@import './BasicLayout.less';
.ant-pro-multi-tab.fixed-multi-tab {
  position: fixed;
  top: 64px;
  right: 0;
  z-index: 9;
  width: 100%;
  height: 62px;
  transition: width 0.2s;
  margin: 0;
}
.ant-pro-top-nav-header-menu {
  max-width: inherit !important;
}
.ant-pro-top-nav-header {
  .ant-menu {
    background: transparent;
  }
}
</style>
<style lang="less">
.ant-menu {
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.2);
  }
}
/* .ant-pro-sider-menu-logo,
.ant-pro-top-nav-header,
.ant-menu-dark,
.ant-menu-dark .ant-menu-sub,
.ant-menu-dark .ant-menu-inline.ant-menu-sub {
  background: linear-gradient(90deg, #006cff, #399efd);
}
.ant-menu-dark .ant-menu-inline.ant-menu-sub {
  box-shadow: none;
}
.ant-menu-submenu {
  color: #fff;
  .ant-menu-sub {
    .ant-menu-submenu,
    .ant-menu-item > a {
      color: #fff;
    }
  }
} */
</style>
