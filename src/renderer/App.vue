<template>
  <div id="app">
    <navbar :token="token" />
    <router-view :token="token" />
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Navbar from './components/Navbar'

export default {
  name: 'App',
  data () {
    return {
      token: ipcRenderer.sendSync('keychain-get-token', 'gh')
    }
  },
  components: { Navbar }
}
</script>

<style lang="scss">
@import "~@/assets/_globals";

html, body {
  padding: 0;
  margin: 0;
  height: 100%;
  background: $white;
}

/* Fade transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $black;
  display: grid;
  grid-template-rows: 50px auto;
  grid-row-gap: 12px;
}
</style>
