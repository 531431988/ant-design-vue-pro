<template>
  <div>
    有个下载按钮，无权限操作，所以看不到
    <a-button v-action:add>新增</a-button>
    <a-button v-action:download>下载</a-button>
  </div>
</template>

<script>
export default {
  name: 'Monitor'
}
</script>

<style scoped>
</style>
