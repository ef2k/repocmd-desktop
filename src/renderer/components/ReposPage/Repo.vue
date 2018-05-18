<template>
  <div class="repo" v-bind:class="{ checked: checked }">
    <div class="content">
      <h3 class="title">
        <a :href="repo.url">{{repo.name}}</a>
        <span v-if="repo.isPrivate" class="mini-badge">Private</span>
        <span v-if="repo.isFork" class="mini-badge">Fork</span>
      </h3>
      <p class="description">{{repo.description}}</p>
      <div class="stats">
        <span class="repo-stat">
          <i data-feather="eye"></i> Watchers: {{repo.watchers.totalCount}}
        </span>
        <span class="repo-stat">
          <i data-feather="star"></i> Stars: {{repo.stargazers.totalCount}}
        </span>
        <span class="repo-stat">
          <i data-feather="git-branch"></i> Forks: {{repo.forks.totalCount}}
        </span>
      </div>
      <p class="pushed-at">
        <span class="commit-info">
          <i data-feather="git-commit"></i> <strong><a :href="commitURL" :title="commitHeadline">{{commitSHA}}</a> committed {{repo.pushedAt | moment("from", "now")}}</strong>
        </span>
      </p>
    </div>
    <div class="card-aside">
      <span v-on:click="check" v-bind:class="{checked: checked}">
        <i class="checkmark" data-feather="check-circle" ></i>
      </span>
      <!-- <i class="settings" data-feather="settings"></i> -->
    </div>
 </div>
</template>

<script>
import feather from 'feather-icons'
export default {
  props: ['repo'],
  computed: {
    commitURL () {
      return `https://github.com/${this.repo.nameWithOwner}/commit/${this.commitSHA}`
    },
    commitHeadline () {
      return this.repo.ref.target.commit.message
    },
    commitSHA () {
      return this.repo.ref.target.commit.abbreviatedOid
    },
    checked () {
      return this.repo.checked
    }
  },
  methods: {
    check () {
      if (!this.repo.checked) {
        this.$emit('checked', this.repo)
      } else {
        this.$emit('unchecked', this.repo)
      }
    }
  },
  mounted () {
    feather.replace()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .repo {
    margin: 10px 0;
    padding: 24px 22px;
    background: var(--light-gray);
    overflow: auto;
    display: grid;
    max-width: 350px;
    grid-template-columns: auto 30px;
    grid-column-gap: 10px;
    transition: background 0.6s;
  }
  .repo.checked {
    background: var(--select-green);
  }
  .feather {
    width: 14px;
    height: 14px;
    line-height: 14px;
    display: inline-block;
    vertical-align: middle;
  }
  .card-aside {
    width: 40px;
    text-align: center;
    position: relative;
  }
  .card-aside .feather {
    position: relative;
    width: 22px;
    height: 22px;
    cursor: pointer;
    color: #c0c0c0;
  }
  .card-aside .checkmark {
    position: absolute;
    margin: auto;
    top: 0px;
    right: 8px;
  }
  .checked .checkmark {
    color: var(--check-green);
  }
  .card-aside .settings {
    position: absolute;
    bottom: 0px;
    right: 8px;
  }

  .content * {
    padding: 0;
    margin: 0;
  }
  .private-badge {
    margin-left: 5px;
    font-size: 12px;
    line-height: 11px;
    padding: 3px 4px;
    border: 1px solid rgba(27, 30, 34, 0.15);
    box-shadow: none;
    color: var(--black);
    display: inline-block;
    vertical-align: middle;
  }
  .mini-badge {
    margin-left: 5px;
    font-size: 12px;
    line-height: 12px;
    padding: 3px 4px;
    border: 1px solid rgba(27, 30, 34, 0.15);
    box-shadow: none;
    color: var(--black);
    display: inline-block;
    vertical-align: middle;
  }
  .repo-stat {
    border: 1px solid rgba(27, 30, 34, 0.15);
    padding: 3px 4px;
    font-size: 12px;
    font-weight: bold;
    line-height: 12px;
    color: var(--black);
    display: inline-block;
    margin-right: 5px;
  }
  .content {
    display: block;
    float: left;
    overflow: wrap;
  }
  .title {
    font-size: 18px;
    margin: 0;
    margin-bottom: 10px;
  }
  .title a {
    text-decoration: none;
    color: var(--bright-blue);
  }
  .description {
    line-height: 1.5;
    margin-bottom: 10px;
    font-size: 14px;
  }
  .stats {
    display: block;
    margin-bottom: 15px;
    font-size: 14px;
  }
  .pushed-at {
    font-size: 14px;
    margin-top: 0px;
    display: block;
  }
  .pushed-at a {
    text-decoration: none;
    color: var(--bright-blue);
    border-bottom: 1px dotted var(--black);
  }
  .pushed-at code {
    margin: 5px auto;
    display: block;
    background: #FEFFD9;
    display: none;
  }
  .pushed-at .commit-info {
    display: block;
  }
</style>