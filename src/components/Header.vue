<template>
  <header class="header home-fixed">
    <span v-if="enableUnfoldBtn" class="unfold" @click="switchUnfold">
      <i class="el-icon-s-unfold" />
    </span>
    <a href="/" style="display: flex;align-items: center;">
      <img id='logo' src="../assets/img/logo.png" style="height: 30px;"/>
      <div id='divider'></div>
      <img id='developer' src="../assets/img/developer.png" style="height: 14px;"/>
    </a>
    <div style="flex: 1;"> </div>
    <div v-if="showLoginBtn">
      <router-link to="/login">
        <el-button type="primary" class="login-btn">{{ $t('common.login') }}</el-button>
      </router-link>
    </div>
    <el-dropdown placement="bottom-start" @command="handleChangeLanguage">
      <div class="language"></div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh-CN">简体中文</el-dropdown-item>
        <el-dropdown-item command="en-US">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <router-link
      v-if="isLoggedIn"
      :to="{ name: 'Notification' }">
      <el-badge :value="hasNotification" class="item">
        <i class="el-icon-message-solid notification"></i>
      </el-badge>
    </router-link>
    <el-dropdown
      placement="bottom-start"
      v-if="isLoggedIn"
      class="user-menu"
    >
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
            {{ $t('comp.header.use') }} <span class="purple">{{ userProfile.nickname || userProfile.name }}</span> {{ $t('common.login') }}
          </el-dropdown-item>
        </router-link>
        <div
          class="link border-br-bl"
          @click="signOut"
        >
          <el-dropdown-item icon="el-icon-error">
            {{ $t('common.signout') }}
          </el-dropdown-item>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>

<script>

import { mapState, mapActions, mapGetters } from 'vuex'
import Axios from 'axios'

import env from '../../env.json'
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
    },
    enableUnfoldBtn: Boolean,
    unfold: Boolean
  },
  data () {
    return {
      hasNotification: undefined
    }
  },
  computed: {
    ...mapState(['userAvatar', 'isLoggedIn', 'userProfile', 'userId']),
    ...mapGetters(['getMenuItems'])
  },
  watch: {
  },
  methods: {
    ...mapActions(['logout', 'setMenuItems']),
    signOut () {
      this.logout()
      this.$router.push({ name: 'Login' })
    },
    switchUnfold () {
      this.$emit('update:unfold', !this.unfold)
    },
    handleChangeLanguage (value) {
      this.$root.$i18n.locale = value

      const newMenu = this.getMenuItems.map(menu => {
        const tempMenu = {...menu}
        if (menu.langKey) {
          tempMenu.title = this.$t(menu.langKey)
        }
        return tempMenu
      })

      const ls = window.localStorage || localStorage
      ls.setItem('APP_LANG', value)
      ls.setItem('APP_MENU_ITEM', JSON.stringify(newMenu))

      location.reload()
    }
  },
  created () {
    const ls = window.localStorage || localStorage
    const currLang = ls.getItem('APP_LANG')
    const menuItem = ls.getItem('APP_MENU_ITEM')
    if (currLang) {
      this.$root.$i18n.locale = currLang
    }
    if (menuItem) {
      this.setMenuItems(JSON.parse(menuItem))
      console.log('APP::Header::setMenuItems!', JSON.parse(menuItem))
    }

    Axios.get(env.DEVELOPERAPI + '/notification/push?id=' + this.userId).then(res => {
      if (res.data.length >= 1) this.hasNotification = res.data.length
    })
  }
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}

.user-menu {
  margin-right: 60px;
  margin-left: 1.5rem;
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

.notification {
  font-size: 1.6rem;
  color: #542DE0;
}

.unfold {
  display: none;
}

.language {
  cursor: pointer;
  height: 22px;
  width: 22px;
  background-image: url("../assets/img/translate.svg");
  background-size: cover;
  color: #542DE0;
  path {
    fill: #542DE0;
  }
  margin-right: 20px;
}

@media screen and (max-width: 992px) {
  .unfold {
    font-size: 26px;
    margin-right: 20px;
    display: inline;
  }
  .header {
    padding-left: 20px;
  }
  .user-menu {
    margin-right: 20px;
  }
}

</style>
