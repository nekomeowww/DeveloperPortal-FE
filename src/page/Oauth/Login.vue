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
    Axios(env.DEVELOPERAPI + '/app/basic?appId=' + this.$route.params.id).then(app => {
      const ls = window.localStorage || localStorage
      ls.removeItem(this.$route.params.id)
      if (this.$route.query.network) {
        ls.setItem(this.$route.params.id, JSON.stringify(this.$route.query))
      } else {
        ls.setItem(this.$route.params.id, JSON.stringify({ network: 'main' }))
      }

      this.app = {
        id: this.$route.params.id,
        img: app.data.img === '' || app.data.img === undefined ? require('@/assets/img/app-default.png') : env.DEVELOPERAPI + '/img/' + app.data.img,
        ...app.data.detail
      }

      document.title = '使用你的账号登录 - Matataki 开发者中心'
    })
  }
}
</script>

<style lang="less" scoped>
.oauth-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 70px 0 10px;
  box-sizing: border-box;
}

@media screen and (max-width: 500px) {
  .oauth-login {
    padding: 10px 0 10px;
  }
  .header {
    display: none;
  }
}
</style>
