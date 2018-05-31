<template>
  <div id="app">
    <navbar :token="token" />
    <div v-if="initialized">
      <router-view :token="token" :port="port" @tokenChanged="setToken" @deleteToken="deleteToken"/>
    </div>
    <div v-else>
      <h1>Loading...</h1>
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
  grid-template-rows: 50px auto;
  grid-row-gap: 12px;
}
</style>
