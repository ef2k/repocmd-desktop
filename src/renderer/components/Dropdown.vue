<template>
  <div class="dropdown">
    <div class="selection" @click="show">
      <slot name="selection" :text="current"></slot>
    </div>
    <div v-if="showOptions" class="options">
      <div v-for="v, k of items" class="option" :class="{}" @click="emitSelection(k)">
        <slot name="option" :id="k" :value="v" :isCurrent="isCurrent(k)"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dropdown',
  props: ['items', 'value'],
  data () {
    return {
      selected: '',
      showOptions: false
    }
  },
  computed: {
    current () {
      const curr = this.selected ? this.selected : this.value
      return this.items[curr]
    }
  },
  methods: {
    show (event) {
      event.stopPropagation()
      if (this.showOptions) {
        this.showOptions = false
        document.body.removeEventListener('click', this.clickAway)
        return
      }
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
    },
    isCurrent (k) {
      return this.current === this.items[k]
    }
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this.clickAway)
  }
}
</script>
