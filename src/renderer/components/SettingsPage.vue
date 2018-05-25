<template>
  <div class="settings-page">
    <div class="settings-wrapper">
      <div v-if="token">
        <h3>Manage GitHub Access</h3>
        <p>Your personal access token is stored within your operating system's keychain. Deleting it will remove the key from this machine but will not destroy the key. Remember to destroy the key from your <a class="generate-link" href="#" @click="open('https://github.com/settings/tokens')">GitHub profile settings</a> <external-link-icon/>.</p>
        <p><code>{{token}}</code> <a href="#" class="delete-link" @click="deleteToken()">Delete</a></p>
      </div>
      <div v-else>
        <h3>Connecting to GitHub</h3>
        <p>
          To get started, <a class="generate-link" href="#" @click="open('https://github.com/settings/tokens')">generate a Personal Access Token</a> <external-link-icon/> through your GitHub profile settings. Your token will be stored within your native keychain and used
          to access the GitHub API.
        </p>
        <form @submit="onSubmit">
          <div class="guide-image">
            <img src="@/assets/scope-preview.png" title="repo scope is needed" style="{ height: 86px }"/>
          </div>
          <div class="input-group">
            <input type="text" v-model="form.accessToken" placeholder="Your GitHub Access Token" required/>
          </div>
          <div class="input-group">
            <button type="submit">Grant Access</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { ExternalLinkIcon } from 'vue-feather-icons'
  export default {
    name: 'settings-page',
    components: { ExternalLinkIcon },
    props: ['token'],
    data () {
      return {
        form: {
          accessToken: ''
        }
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      onSubmit (event) {
        event.preventDefault()
        event.target.reset()
        this.$emit('tokenChanged', this.form.accessToken)
      },
      deleteToken () {
        this.$emit('deleteToken')
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "~@/assets/_globals";

.settings-page {

  .settings-wrapper{
    width: 600px;
    padding: 0 20px;
    margin-top: 60px;
    margin-left: auto;
    margin-right: auto;

    h3 {
      font-size: 24px;
      font-weight: 300;
    }
    p {
      font-size: 16px;
      line-height: 1.5;

      .feather {
        height: 12px;
        width: 12px;
        margin-top: 2px;
        margin-right: 5px;
      }
      code {
        padding: 5px;
        background: #F9F9F9;
        font-weight: bold;
      }
      .delete-link {
        text-decoration: none;
        color: #FF4D5E;
        font-size: 12px;
        font-weight: 600;
      }
      .generate-link {
        color: $bright-blue;
        font-weight: 600;
        text-decoration: none;
        padding-bottom: 2px;
        border-bottom: 1px solid #d8d8d8;
      }
    }
    form {
      .guide-image {
        margin-top: 50px;
        display: block;
        text-align: center;
        img {
          height: 88px;
          padding: 18px;
          background: #f9f9f9;
        }
      }
      .input-group {
        text-align: center;
        input[type=text] {
          margin-top: 20px;
          font-size: 16px;
          padding: 10px 14px;
          width: 100%;
          max-width: 312px;
          background: #f9f9f9;
          border: 1px solid #f9f9f9;
          border-radius: 3px;
          box-sizing: border-box;
          outline: 0;
          margin-bottom: 12px;
        }
        button {
          background: linear-gradient(#FFFFFF, #EFF3F6);
          border: 1px solid #E1E4E8;
          border-radius: 3px;
          padding: 10px 24px;
          font-size: 14px;
          font-weight: 600;
          margin-top: 10px;
          cursor: pointer;
          outline: 0;
        }
      }
    }
  }
}
</style>
