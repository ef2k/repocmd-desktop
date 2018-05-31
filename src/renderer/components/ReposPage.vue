<template>
  <repo-list :token="token" :port="port"/>
</template>

<script>
  import RepoList from './ReposPage/RepoList'
  export default {
    name: 'repos-page',
    props: [
      'token',
      'port'
    ],
    components: {
      RepoList
    }
  }
</script>

<style>
</style>
