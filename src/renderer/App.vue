<template>
  <div id="app">
    <navbar id="navbar" :token="token" />
    <router-view v-if="initialized" :token="token" :port="port" @tokenChanged="setToken" @deleteToken="deleteToken"/>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import { TokenStore } from '@/services/ipc'

export default {
  name: 'App',
  props: [
    'initialized',
    'port'
  ],
  data () {
    return {
      token: TokenStore.getToken()
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
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Stop image dragging */
img, img::after, img::before {
	-webkit-user-select: none;
	-webkit-user-drag: none;
	-webkit-app-region: no-drag;
	cursor: default;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $black;
  display: grid;
  grid-template-rows: auto auto;
  grid-row-gap: 0;
}
</style>
