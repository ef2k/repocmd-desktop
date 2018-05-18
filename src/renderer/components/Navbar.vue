<template>
  <div class="navbar">
    <div class="nav-logo">
    </div>
    <div class="nav-wrap">
      <div class="nav-item">
        <router-link to="/repos">
          Repositories
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to="/settings">
          Settings
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  components: {}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/_globals.scss";
.navbar {
  background: $black;
  display: flex;
  align-items: center;
  -webkit-user-select: none;
  -webkit-app-region: drag;

  .nav-logo {
    margin-left: 20px;
    margin-right: auto;
    color: $white;
  }
  .nav-wrap {
    margin-right: 20px;
    margin-left: auto;
  }
  .nav-item {
    margin-left: 15px;
    font-size: 14px;
    line-height: 14px;
    display: inline-block;
    .feather {
      height: 14px;
    }
    a {
      text-decoration: none;
      color: $white;
      padding: 7px 10px;
      border-radius: 3px;

      &.router-link-exact-active {
        background: $dark-blue;
      }
    }
    a, .feather {
      vertical-align: middle;
      line-height: 14px;
    }
  }
}
</style>