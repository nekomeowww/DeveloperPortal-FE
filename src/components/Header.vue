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
        <el-dropdown
          placement="bottom-start"
          v-if="isLoggedIn"
          class="user-menu"
        >
          <!-- <avatarComponents :size="'30px'" :src="avatar" class="home-head-avatar" /> -->
          <div class="user-avatar">
            <img
              v-if="userAvatar"
              :src="userAvatar"
              alt="user avatar"
              class="avatar"
            >
          </div>
          <el-dropdown-menu
            slot="dropdown"
            class="user-dorpdown"
          >
            <router-link to="/apps">
              <el-dropdown-item icon="el-icon-check">
                使用 <span class="purple">{{ userProfile.nickname || userProfile.name }}</span> 登录
              </el-dropdown-item>
            </router-link>
            <div
              class="link border-br-bl"
              @click="signOut"
            >
              <el-dropdown-item icon="el-icon-error">
                登出
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </header>
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

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
    ...mapState(['userAvatar', 'isLoggedIn', 'userProfile', 'userId'])
  },
  watch: {
  },
  methods: {
    ...mapActions(['logout']),
    signOut () {
      this.logout()
    }
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

.user-menu {
  margin-right: 60px;
}

.user-dorpdown {
 margin-right: 60px;
}

.avatar {
  height: 48px;
  object-fit: cover;
  border-radius: 50%;
}

.purple {
  color: #542DE0
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
