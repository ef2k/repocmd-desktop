<template>
  <div id="app">
    <navbar :token="token" />
    <div v-if="initialized">
      <router-view :token="token" @tokenChanged="setToken" @deleteToken="deleteToken"/>
    </div>
    <div v-else>
      <h1>Loading...</h1>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Navbar from './components/Navbar'
import TokenStore from '@/services/token-store'

export default {
  name: 'App',
  props: ['initialized'],
  data () {
    return {
      token: ipcRenderer.sendSync('keychain-get-token', 'gh')
    }
  },
  components: { Navbar },
  methods: {
    setToken (token) {
      TokenStore.setToken(token)
      this.token = token
    },
    deleteToken () {
      TokenStore.deleteToken()
      this.token = ''
    }
  }
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
