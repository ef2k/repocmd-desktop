<template>
  <div class="dropdown">
    <div class="selection" @click="show">{{current}}</div>
    <div v-if="showOptions" class="options">
      <div v-for="v, k of items" class="option" :class="{}" @click="emitSelection(k, v)">{{v}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dropdown',
  props: ['items', 'default'],
  data () {
    return {
      selected: '',
      showOptions: false
    }
  },
  computed: {
    current () {
      const curr = this.selected ? this.selected : this.default
      return this.items[curr]
    }
  },
  methods: {
    show (event) {
      event.stopPropagation()
      this.showOptions = true
      document.body.addEventListener('click', this.clickAway)
    },
    emitSelection (k) {
      this.showOptions = false
      this.selected = k
      this.$emit('selected', k)
    },
    clickAway (event) {
      if (!this.$el.contains(event.target)) {
        this.showOptions = false
      }
      document.body.removeEventListener('click', this.clickAway)
    }
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this.clickAway)
  }
}
</script>
