<template>
  <div>
    <Header
      :showLoginBtn="false"
    />
    <div class="oauth-login">
      <Oauth
        :app="app"
      />
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Oauth from '@/components/Login/Oauth.vue'

import Axios from 'axios'

import env from '../../../env.json'

export default {
  components: {
    Header,
    Oauth
  },
  data () {
    return {
      app: {
        img: null,
        name: '',
        id: 0
      }
    }
  },
  created () {
    Axios(env.DEVELOPERAPI + '/app/detail?appId=' + this.$route.params.id).then(app => {
      this.app.img = env.DEVELOPERAPI + '/img/' + app.data.img
      this.app.name = app.data.detail.name
      this.app.id = this.$route.params.id

      document.title = '使用你的账号登录 - Matataki 开发者中心'
    })
  }
}
</script>

<style lang="less" scoped>
.oauth-login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 500px) {
  .header {
    display: none;
  }
}
</style>
