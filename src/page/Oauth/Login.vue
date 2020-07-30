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

export default {
  components: {
    Header,
    Oauth
  },
  data () {
    return {
      app: {
        img: require('@/assets/img/test/app01.png'),
        name: `Neko's App`,
        id: 1
      }
    }
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
