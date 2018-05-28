<template>
  <repo-list :token="token"/>
</template>

<script>
  import RepoList from './ReposPage/RepoList'
  export default {
    name: 'repos-page',
    props: [
      'token'
    ],
    components: {RepoList},
    methods: {}
  }
</script>

<style>
</style>
