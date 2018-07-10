<template>
  <div class="track-page">
    <h1></h1>
    <input type="text"/>
  </div>
</template>

<script>
  export default {
    name: 'track-page',
    props: [
      'token',
      'port'
    ],
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "~@/assets/_globals";

.track-page {
}
</style>
