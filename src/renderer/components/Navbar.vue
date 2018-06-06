<template>
  <div class="navbar">
    <div class="links" v-if="!!token">
      <router-link to="/track">
        Track
      </router-link>
      <router-link to="/repos">
        Manage
      </router-link>
      <router-link to="/settings">
        <settings-icon/>
        Settings
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'navbar',
  props: ['token']
}
</script>

<style lang="scss" scoped>
@import "~@/assets/_globals.scss";

.navbar {
  -webkit-user-select: none;
  -webkit-app-region: drag;

  .links {
    background: $black;
    text-align: right;

    a {
      display: inline-block;
      box-sizing: border-box;
      padding: 15px 13px;
      text-decoration: none;
      font-size: 13px;
      color: white;

      &.router-link-active {
        background: #E5E5EB;
        color: $black;
        font-weight: 600;
      }
    }
  }
}
</style>
