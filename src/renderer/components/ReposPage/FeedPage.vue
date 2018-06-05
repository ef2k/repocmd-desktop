<template>
  <div class="feed-page">
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else-if="errored">
      <div class="summary">
        <h1><a href="#" @click.prevent="open(repoURL)">{{repoName}}<external-link-icon/></a></h1>
        <p>Something went terribly wrong :/</p>
        <ul>
          <li>Does your repository exist?</li>
          <li>Is it unitialized?</li>
          <li>Have you lost read permission?</li>
        </ul>
        <p>If this error persists, <a href="#" @click.prevent="open('https://github.com/ef2k/repocmd-desktop/issues/new')">please file an issue</a> and we'll work to get it resolved.</p>
        <pre>
          {{errored.message}}
        </pre>
      </div>
    </div>
    <div v-else-if="ready" class="repo-details">
      <div class="summary">
        <h1>
          <a href="#" @click.prevent="open(repoURL)">{{repoName}}<external-link-icon/></a>
          <span v-if="summary.isPrivate" class="mini-badge">Private</span>
          <span v-if="summary.isFork" class="mini-badge">Fork</span>
          <span v-if="summary.isArchived" class="mini-badge">Archived</span>
        </h1>
        <p class="description">{{summary.description}} {{summary.homepageURL}}</p>
        <div class="ssh" @click="copy(`git clone ${summary.sshURL}`)">
          <pre>{{summary.sshURL}}</pre><button><copy-icon/></button>
        </div>
      </div>

      <div class="feed">
        <div class="feed-data">
          <h2 class="feed-title">Collaborators</h2>
          <div class="collaborators">
            <div class="collaborator" v-for="collaborator in collaborators">
              <img :src="collaborator.avatarURL" :title="collaborator.login" height="50"/>
            </div>
          </div>
        </div>

        <div class="feed-data">
          <h2 class="feed-title">Latest Commits</h2>
          <div class="commits">
            <template v-if="commits.entries && commits.entries.length > 0">
              <div class="commit" v-for="entry in commits.entries" v-bind:key="entry.id" :entry="entry">
                <git-commit-icon/>
                <a href="#" class="title" @click.prevent="open(entry.links[0].href)">{{entry.title}}</a>
                <span class="date">{{entry.updated | moment("from", "now")}}</span>
              </div>
            </template>
            <template v-else>
              <div class="">No releases yet.</div>
            </template>
          </div>
        </div>

        <div class="feed-data">
          <h2 class="feed-title">Releases</h2>
          <div class="commits">
            <template v-if="releases.entries && releases.entries.length > 0">
              <div class="commit" v-for="entry in releases.entries" v-bind:key="entry.id" :entry="entry">
                <git-commit-icon/>
                <a href="#" class="title" @click.prevent="open(entry.links[0].href)">{{entry.title}}</a>
                <span class="date">{{entry.updated | moment("from", "now")}}</span>
              </div>
            </template>
            <template v-else>
              <div class="">No releases yet.</div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GitCommitIcon, ExternalLinkIcon, CopyIcon } from 'vue-feather-icons'
import { clipboard } from 'electron'

export default {
  name: 'feed-page',
  props: [
    'baseURL'
  ],
  components: {
    GitCommitIcon,
    ExternalLinkIcon,
    CopyIcon
  },
  data () {
    return {
      loading: false,
      errored: false,
      repo: null
    }
  },
  computed: {
    ready () {
      return this.repo !== null
    },
    repoName () {
      const params = this.$route.params
      return `${params.owner}/${params.name}`
    },
    repoURL () {
      return `https://github.com/${this.repoName}`
    },
    collaborators () {
      return this.repo.summary.collaborators.users
    },
    releases () {
      return this.repo.feeds.releases
    },
    commits () {
      return this.repo.feeds.commits
    },
    summary () {
      return this.repo.summary
    }
  },
  watch: {
    '$route': 'fetch'
  },
  mounted () {
    this.fetch()
  },
  methods: {
    copy (s) {
      clipboard.writeText(s)
    },
    fetch () {
      const params = this.$route.params
      const url = `${this.baseURL}/feed/${params.owner}/${params.name}`

      this.repo = null
      this.errored = null

      this.loading = true
      this.$http.get(url)
        .then(response => {
          this.repo = response.data
          console.log('This is the repo data ', this.repo)
        })
        .catch((err) => {
          this.errored = err
          console.error('Error fetching feed.')
        })
        .finally(() => {
          this.loading = false
        })
    },
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/_globals";

.feed-page {
  padding: 0 20px;

  .repo-details {
    h1 {
      font-size: 28px;
      margin: 20px 0;

      a {
        color: $black;
        text-decoration: none;
        .feather {
          margin-left: 3px;
          color: $dark-blue;
          height: 18px;
        }
      }
    }
    .summary {
      .ssh {
        display: inline-block;
        cursor: pointer;
        transition: all 0.6s;

        pre {
          margin: 0 0 10px 0;
          background: #f2f2f2;
          display: inline-block;
          font-size: 14px;
          line-height: 14px;
          padding: 4px;
        }
        button {
          cursor: pointer;
          height: 22px;
          padding: 3px;
          border: 1px solid #f2f2f2;
          outline: 0;
          background: transparent;
          .feather {
            height: 10px;
          }
        }
        &:hover {
          pre {
            background: #FFFBBE;
          }
          button {
            .feather {
              color: $bright-blue;
            }
          }
        }
      }
    }
    .feed {
      .feed-data {
        .collaborator {
          display: inline-block;
          margin-right: 5px;
          img {
            border-radius: 30px;
            border: 5px solid #f2f2f2;
          }
        }
        .feed-title {
          font-size: 18px;
          margin: 10px 0;
          padding-bottom: 8px;
          border-bottom: 1px solid #f2f2f2;
        }
        .commits {
          background: transparent;
          overflow: auto;
          padding: 0;

          .commit {
            font-size: 14px;
            padding: 7px;
            border-bottom: 1px solid #f2f2f2;

            &:nth-child(even) {
              background: #f9f9f9;
            }
            .feather {
              height: 10px;
              width: 10px;
            }
            .date {
              font-weight: 600;
            }
            .title {
              color: $bright-blue;
              text-decoration: none;
              font-weight: 600;
              margin-right: 7px;
            }
          }
        }
      }
    }
  }
}
</style>
