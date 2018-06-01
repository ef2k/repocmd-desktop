<template>
<div class="repos-page">
  <div class="side-pane" :style="{ height: winHeight+'px', maxHeight: winHeight+'px'}">
    <p v-if="loading">Fetching the latest repo data...</p>
    <div v-else-if="error">
      <p v-if="error.status === 0">The proxy server is offline.</p>
      <p v-else>There was a problem connecting to the GitHub API.</p>
      <pre>
        {{error}}
      </pre>
      <a href="#" @click="retryServer()">Retry the server</a>
    </div>
    <div v-else>
      <h2>Repositories ({{repoLen}})</h2>
      <p class="filter-options">
        Filter by:
        <a href="#" @click="filterBy('all')" :disabled="isFilteredAll">All</a> |
        <a href="#" @click="filterBy('public')" :disabled="isFilteredPublic">Public</a> |
        <a href="#" @click="filterBy('private')" :disabled="isFilteredPrivate">Private</a> |
        <a href="#" @click="filterBy('fork')" :disabled="isFilteredFork">Fork</a> |
        <a href="#" @click="filterBy('archived')" :disabled="isFilteredArchived">Archived</a>
      </p>
      <p class="sort-options">
        Sort by:
        <a href="#" @click="sortBy('recent')" :disabled="isSortedRecent">Recent commit</a> |
        <a href="#" @click="sortBy('oldest')" :disabled="isSortedOldest">Oldest commit</a>
      </p>
      <div class="search-bar">
        <input v-model="search" type="text" placeholder="Search"/>
      </div>
      <div class="repositories">
        <repo v-for="repo in filteredList" v-bind:key="repo.id" :repo="repo" @checked="checkRepo" @unchecked="uncheckRepo"></repo>
      </div>
    </div>
  </div>
  <div class="main-pane" :style="{ height: winHeight+'px', maxHeight: winHeight+'px'}">
    <transition name="fade">
      <selection-page v-if="hasSelected" :repos="selected" @action="doAction" @unchecked="uncheckRepo" @uncheckAll="uncheckAll"/>
    </transition>
  </div>
  <progress-modal></progress-modal>
</div>
</template>

<script>
import Repo from '@/components/ReposPage/Repo'
import SelectionPage from '@/components/ReposPage/SelectionPage'
import ProgressModal from '@/components/ReposPage/ProgressModal'
import { APIServer } from '@/services/ipc'

export default {
  props: [
    'token',
    'port'
  ],
  components: {
    Repo,
    SelectionPage,
    ProgressModal
  },
  data () {
    return {
      baseURL: `http://127.0.0.1:${this.port}`,
      loading: false,
      error: '',
      filterOption: 'all',
      sortOption: 'recent',
      search: '',
      repos: [],
      selected: {},
      winHeight: document.documentElement.clientHeight
    }
  },
  computed: {
    hasSelected () {
      return Object.keys(this.selected).length > 0
    },
    repoLen () {
      if (this.filteredList) {
        return this.filteredList.length
      }
      return ''
    },
    isFilteredAll () {
      return this.filterOption === 'all'
    },
    isFilteredPublic () {
      return this.filterOption === 'public'
    },
    isFilteredPrivate () {
      return this.filterOption === 'private'
    },
    isFilteredFork () {
      return this.filterOption === 'fork'
    },
    isFilteredArchived () {
      return this.filterOption === 'archived'
    },
    isSortedRecent () {
      return this.sortOption === 'recent'
    },
    isSortedOldest () {
      return this.sortOption === 'oldest'
    },
    filteredList () {
      let list = this.repos.slice(0)

      if (this.sortOption === 'oldest') {
        list = list.reverse()
      }

      if (this.filterOption === 'private') {
        list = list.filter(repo => repo.isPrivate)
      } else if (this.filterOption === 'public') {
        list = list.filter(repo => !repo.isPrivate)
      } else if (this.filterOption === 'fork') {
        list = list.filter(repo => repo.isFork)
      } else if (this.filterOption === 'archived') {
        list = list.filter(repo => repo.isArchived)
      }

      if (this.search) {
        list = list.filter(repo => repo.name.includes(this.search))
      }

      return list
    }
  },
  created () {
    this.fetchRepos()
  },
  mounted () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    retryServer () {
      APIServer.start(this.token)
      this.fetchRepos()
    },
    fetchRepos () {
      this.loading = true
      this.$http.get(`${this.baseURL}/repos`)
        .then(response => {
          this.repos = response.data
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this.error = err
        })
    },
    doAction (action) {
      const selected = this.selected
      if (action === 'archive') {
        this.$modal.show('progress-modal')

        const requests = []
        for (let k in selected) {
          const item = selected[k]
          const req = this.$http.post(`${this.baseURL}/repos`, {
            nameWithOwner: item.nameWithOwner,
            isArchived: true
          })
          req.then(() => {
            this.$set(item, 'isArchived', true)
          })
          requests.push(req)
        }

        Promise.all(requests)
          .then(response => {
            console.log(response)
          })
          .catch(err => {
            console.error(err)
          })
          .finally(() => {
            setTimeout(() => {
              this.$modal.hide('progress-modal')
            }, 2 * 1000)
          })
      }
    },
    checkRepo (repo) {
      const item = this.repos.find(item => item.id === repo.id)
      this.$set(item, 'checked', true)
      this.addToSelectList(repo)
    },
    uncheckRepo (repo) {
      const item = this.repos.find(item => item.id === repo.id)
      this.$set(item, 'checked', false)
      this.removeFromSelectList(repo)
    },
    uncheckAll () {
      this.repos.filter(item => item.checked).forEach(item => {
        this.$set(item, 'checked', false)
        this.removeFromSelectList(item)
      })
    },
    filterBy (option) {
      this.filterOption = option
    },
    sortBy (option) {
      this.sortOption = option
    },
    addToSelectList (repo) {
      this.$set(this.selected, repo.id, repo)
    },
    removeFromSelectList (repo) {
      this.$delete(this.selected, repo.id)
    },
    handleResize () {
      const navHeight = document.getElementById('navbar').clientHeight
      this.winHeight = document.documentElement.clientHeight - navHeight
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/_globals";

  .repos-page {
    display: grid;
    grid-template-columns: 400px auto;
    grid-column-gap: 20px;

    .side-pane {
      padding-left: 20px;
      padding-right: 20px;
      border-right: 1px solid #D8D8D8;
      overflow-y: scroll;

      h2 {
        font-size: 20px;
      }
      .sort-options, .filter-options {
        font-size: 14px;

        a {
          color: $bright-blue;
          text-decoration: none;
          font-weight: bold;
        }
        a[disabled=disabled] {
          color: $black;
        }
      }
      .search-bar {
        width: 100%;
        margin-bottom: 10px;

        input[type="text"] {
          padding: 10px;
          box-sizing: border-box;
          width: 100%;
        }
      }
    }
    .main-pane {
      position: relative;
    }
  }
</style>
