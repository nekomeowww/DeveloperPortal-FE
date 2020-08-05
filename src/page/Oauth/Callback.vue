<template>
  <div>
    <Header
      :showLoginBtn="false"
    />
    <div class="oauth-login">
      <Oauth
        :app="app"
        :userData="userData"
      />
    </div>
    {{$route.params.callback}}
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Oauth from '@/components/Login/Oauth.vue'

import Axios from 'axios'

import env from '../../../env.json'
import { getUserProfile, getAvatarUrl } from '../../api/user'
import { disassemble } from '../../util/cookie'
import { mapActions, mapState } from 'vuex'

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
        id: 0,
        callback: '',
        token: ''
      },
      userData: {
        avatar: '',
        nickname: ''
      }
    }
  },
  computed: {
    ...mapState([])
  },
  methods: {
    ...mapActions(['setThirdPartyUserId', 'setThirdPartyUserProfile'])
  },
  created () {
    Axios(env.DEVELOPERAPI + '/app/detail?appId=' + this.$route.params.id).then(app => {
      this.app.img = env.DEVELOPERAPI + '/img/' + app.data.img
      this.app.name = app.data.detail.name
      this.app.id = this.$route.params.id
      this.app.callback = app.data.detail.callback

      document.title = '授权 ' + app.data.detail.name + ' 使用你的账号登录 - Matataki 开发者中心'
    })

    const token = this.$route.params.callback.replace('type=token&token=', '')
    const thirdPartyUser = disassemble(token)
    this.setThirdPartyUserId(thirdPartyUser.id)
    this.setThirdPartyUserProfile(thirdPartyUser)
    this.app.token = token
    getUserProfile(thirdPartyUser.id).then(res => {
      this.userData.avatar = getAvatarUrl(res.data.data.avatar)
      this.userData.nickname = res.data.data.nickname
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
