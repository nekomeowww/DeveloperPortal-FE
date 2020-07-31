<template>
    <div>
      <header class="header home-fixed">
        <a href="/" style="display: flex;align-items: center;">
          <img id='logo' src="../assets/img/logo.png" style="height: 30px;"/>
          <div id='divider'></div>
          <img id='developer' src="../assets/img/developer.png" style="height: 14px;"/>
        </a>
        <div style="flex: 1;"> </div>
        <div v-if="showLoginBtn">
          <router-link to="/login">
            <el-button type="primary" class="login-btn">登录</el-button>
          </router-link>
        </div>
          <img class="avatar" v-if="showAvatar && isLoggedIn" :src="userAvatar" />
      </header>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Header',
  components: {
  },
  props: {
    showAvatar: {
      type: Boolean,
      default: false
    },
    showLoginBtn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['userAvatar', 'isLoggedIn'])
  },
  watch: {
  },
  created () {

  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}

.avatar {
  height: 48px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 50%;
}

#logo {
  margin-right: 10px;
}

#developer  {
  margin-left: 11px;
}

#divider {
  height: 30px;
  width: 1px;
  background-color: #DBDBDB;
}

header {
  display: flex;
  align-items: center;
  padding-left: 40px;
  border-bottom: 1px;
  height:60px;
  background:rgba(247,247,247,1);
  box-shadow:0px 1px 0px 0px rgba(219,219,219,1);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 99;
}

.login-btn {
  margin-right: 2rem;
}

</style>
