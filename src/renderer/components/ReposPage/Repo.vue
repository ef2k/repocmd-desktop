<template>
  <div class="repo" v-bind:class="{ checked, archived }">
    <div class="wrap">
      <div class="content">
        <h3 class="title">
          <a href="#" @click="open(repo.url)">{{repo.nameWithOwner}}</a>
          <span v-if="repo.isPrivate" class="mini-badge">Private</span>
          <span v-if="repo.isFork" class="mini-badge">Fork</span>
          <span v-if="repo.isArchived" class="mini-badge">Archived</span>
        </h3>
        <p class="description">{{repo.description}}</p>
        <div class="stats">
          <span class="repo-stat">
            <eye-icon/> Watchers: {{repo.watchers.totalCount}}
          </span>
          <span class="repo-stat">
            <star-icon/> Stars: {{repo.stargazers.totalCount}}
          </span>
          <span class="repo-stat">
            <git-branch-icon/> Forks: {{repo.forks.totalCount}}
          </span>
        </div>
        <p class="pushed-at">
          <span class="commit-info">
            <git-commit-icon/> <strong><a href="#" @click="open(commitURL)" :title="commitHeadline">{{commitSHA}}</a> committed {{repo.pushedAt | moment("from", "now")}}</strong>
          </span>
        </p>
      </div>
      <div class="card-aside">
        <span v-on:click="check" v-bind:class="{checked: checked}">
          <check-circle-icon class="checkmark"/>
        </span>
      </div>
    </div>
 </div>
</template>

<script>
import { EyeIcon, StarIcon, GitBranchIcon, GitCommitIcon, CheckCircleIcon } from 'vue-feather-icons'

export default {
  props: ['repo'],
  components: {
    EyeIcon,
    StarIcon,
    GitBranchIcon,
    GitCommitIcon,
    CheckCircleIcon
  },
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
    },
    archived () {
      return this.repo.isArchived
    }
  },
  methods: {
    check () {
      if (!this.repo.checked) {
        this.$emit('checked', this.repo)
        return
      }
      this.$emit('unchecked', this.repo)
    },
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/_globals";

  .repo {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    overflow: auto;
    background: $light-gray;
    transition: background 0.6s;

    &.archived {
      background: $archived-bg;
      a {
        color: $black;
      }
    }
    &.checked {
      background: $select-green;
    }
  }
  .wrap {
    padding: 22px 24px;
    display: grid;
    grid-template-columns: auto 30px;
    grid-column-gap: 10px;

    .content {
      display: block;
      float: left;
      overflow: wrap;

      &* {
        padding: 0;
        margin: 0;
      }
      .title {
        font-size: 16px;
        margin: 0;
        margin-bottom: 10px;

        a {
          text-decoration: none;
          color: $bright-blue;
        }
      }
      .description {
        font-size: 14px;
        margin-bottom: 10px;
        line-height: 1.5;
      }
      .feather {
        width: 14px;
        height: 14px;
        line-height: 14px;
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
        color: $black;
        display: inline-block;
        vertical-align: middle;
      }
      .stats {
        display: block;
        margin-bottom: 15px;
        font-size: 14px;

        .repo-stat {
          border: 1px solid rgba(27, 30, 34, 0.15);
          padding: 3px 4px;
          font-size: 12px;
          font-weight: bold;
          line-height: 12px;
          color: $black;
          display: inline-block;
          margin-right: 5px;
        }
      }
      .pushed-at {
        font-size: 13px;
        margin-top: 0px;
        margin-bottom: 0px;
        display: block;

        a {
          text-decoration: none;
          color: $bright-blue;
          border-bottom: 1px dotted $black;
        }
        code {
          margin: 5px auto;
          display: block;
          background: #FEFFD9;
          display: none;
        }
        .commit-info {
          display: block;
        }
      }
    }
    .card-aside {
      width: 40px;
      text-align: center;
      position: relative;

      .feather {
        position: relative;
        width: 22px;
        height: 22px;
        cursor: pointer;
        color: #c0c0c0;
      }
      .checked .checkmark {
        color: $check-green;
      }
      .checkmark {
        position: absolute;
        margin: auto;
        top: 0px;
        right: 8px;
      }
    }
  }
</style>
