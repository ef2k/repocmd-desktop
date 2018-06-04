<template>
  <div class="feed-page">
    <h1>Feed for {{repoName}}</h1>
  </div>
</template>

<script>
export default {
  name: 'feed-page',
  props: [
    'baseURL'
  ],
  computed: {
    repoName () {
      const params = this.$route.params
      return `${params.owner}/${params.name}`
    }
  },
  watch: {
    '$route': 'fetch'
  },
  methods: {
    fetch () {
      const params = this.$route.params
      const url = `${this.baseURL}/feed/${params.owner}/${params.name}`
      console.log('Fetching a feed from ', url)
      this.$http.get(url, { responseType: 'document' })
        .then(response => {
          console.log('The response data', response.data.getElementsByTagName('entry'))
        })
        .catch(() => {
          console.error('Error fetching feed.')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/_globals";

.feed-page {
  background: $bright-blue;
}
</style>
