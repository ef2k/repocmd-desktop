<template>
  <div class="settings-page">
    <div class="settings-wrapper">
      <h3>Accessing GitHub</h3>
      <p>
        To get started, <a class="generate-link" href="#" @click="open('https://github.com/settings/tokens')">generate a Personal Access Token</a> <external-link-icon/> through your GitHub profile settings. Your token will be used
        to access the GitHub API without having to ask for your account credentials.
      </p>

      <form @submit="onSubmit">
        <div class="grid-wrap">
          <div class="fields">
            <div class="input-group">
              <input type="text" v-model="form.accessToken" placeholder="Your GitHub Access Token" required/>
            </div>
            <div class="input-group">
              <input type="password" v-model="form.passphrase" placeholder="Create a passphrase for local encryption" required/>
            </div>
          </div>
          <div class="guide-image">
            <img src="@/assets/scope-preview.png" title="repo scope is needed" style="{ height: 86px }"/>
          </div>
        </div>
        <p>Your access token will be encrypted and stored on the local machine using the given passphrase. Once encrypted, the token is unrecoverable, so make sure your passphrase is kept safe.</p>
        <div class="input-group">
          <button type="submit">I understand, grant access</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { ExternalLinkIcon } from 'vue-feather-icons'
  export default {
    name: 'settings-page',
    components: { ExternalLinkIcon },
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
        console.log(this.form)
      }
    }
  }
</script>

<style lang="scss" scoped>

@import "~@/assets/_globals";

.settings-page {
  padding: 0 20px;

  .settings-wrapper{
    width: 600px;
    margin: auto;
    margin-top: 60px;

    h3 {
      font-size: 24px;
      font-weight: 300;
    }
    p {
      font-size: 16px;
      line-height: 1.5;

      .generate-link {
        color: $bright-blue;
        font-weight: 600;
        text-decoration: none;
        padding-bottom: 2px;
        border-bottom: 1px solid #d8d8d8;
      }
      .feather {
        height: 12px;
        width: 12px;
        margin-top: 2px;
        margin-right: 5px;
      }
    }
    form {
      .grid-wrap {
        display: grid;
        grid-template-columns: 270px auto;
        grid-column-gap: 20px;

        .fields {
          margin-top: 22px;
          .input-group {
            overflow: auto;
          }
        }
        input {
          font-size: 16px;
          padding: 10px 14px;
          width: 100%;
          background: #f9f9f9;
          border: 1px solid #f9f9f9;
          border-radius: 3px;
          box-sizing: border-box;
          outline: 0;
          margin-bottom: 12px;
        }
        .guide-image {
          padding: 18px;
          background: #f9f9f9;
          display: inline-block;
          img {
            height: 88px;
          }
        }
      
      }
      p {
        margin-top: 30px;
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

</style>
