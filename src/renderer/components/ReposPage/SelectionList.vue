<template>
  <div class="selection-list" :style="{ height: height+'px', maxHeight: height+'px'}">
    <selection v-for="repo of repos" v-bind:key="repo.id" :repo="repo" @unchecked="unchecked"/>
  </div>
</template>

<script>
import Selection from './Selection'

export default {
  components: {
    Selection
  },
  props: [
    'repos',
    'height'
  ],
  data () {
    return {
    }
  },
  methods: {
    unchecked (repo) {
      this.$emit('unchecked', repo)
    }
  }
}
</script>

<style lang="scss" scoped>
  .selection-list {
    overflow: auto;
  }
</style>
