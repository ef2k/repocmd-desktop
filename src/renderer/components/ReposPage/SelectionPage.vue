<template>
<div class="selection-page">
  <div id="selection-header" class="selection-header">
    <h3>Selected Repositories ({{selectedLen}}) <a href="#" @click="clearAll()">Clear Selection</a></h3>
  </div>
  <div class="wrapper">
    <selection-list :repos="repos" :height="listHeight" @unchecked="unchecked" />
    <selection-actions :repos="repos" @action="emitAction"/>
  </div>
</div>
</template>

<script>
import SelectionList from './SelectionList'
import SelectionActions from './SelectionActions'

export default {
  name: 'SelectionPage',
  components: {
    SelectionList,
    SelectionActions
  },
  props: ['repos'],
  data () {
    return {
      listHeight: 300
    }
  },
  computed: {
    selectedLen () {
      if (this.repos) {
        return Object.keys(this.repos).length
      }
      return 0
    }
  },
  mounted () {
    this.calculateListHeight()
    window.addEventListener('resize', this.calculateListHeight)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calculateListHeight)
  },
  methods: {
    unchecked (repo) {
      this.$emit('unchecked', repo)
    },
    clearAll () {
      this.$emit('uncheckAll')
    },
    emitAction (action) {
      this.$emit('action', action)
    },
    getRealHeight (el) {
      const clientHeight = el.clientHeight
      const styles = window.getComputedStyle(el)
      return clientHeight + parseFloat(styles.marginTop) + parseFloat(styles.marginBottom)
    },
    calculateListHeight () {
      const winHeight = this.getRealHeight(document.documentElement)
      const navbarHeight = this.getRealHeight(document.getElementById('navbar'))
      const headerHeight = this.getRealHeight(document.getElementById('selection-header'))
      this.listHeight = winHeight - navbarHeight - headerHeight
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/_globals";

.selection-page {
  padding-right: 20px;
}
.wrapper {
  display: grid;
  grid-template-columns: minmax(400px, auto) minmax(200px, 300px);
  grid-column-gap: 20px;
}
.selection-header {
  overflow: auto;
  padding: 0;
  text-align: left;
  h3 {
    font-size: 20px;
    a {
      margin-left: 10px;
      font-size: 14px;
      color: $bright-blue;
      text-decoration: none;
    }
  }
  .selection-links {
    .feather {
      vertical-align: middle;
      height: 18px;
    }
    a {
      color: $bright-blue;
      font-weight: bold;
      text-decoration: none;
      vertical-align: middle;
      margin-left: 3px;
    }
  }
}
</style>
