<template>
  <div style="overflow:hidden">
    <Header
      :showLoginBtn="false"
    />
    <div class="wrapper">
      <img src="@/assets/img/landing-img.png" class="kv"/>
      <div class="login-box">
        <i18n path="login" tag="span" class="login-title">
          <br place="break">
          <span place="name" class="purple">Matataki</span>
        </i18n>
        <br>
        <Input />
      </div>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Input from '@/components/Login/Input.vue'
import { mapState, mapActions } from 'vuex'

import { getCookie, disassemble } from '../util/cookie'

export default {
  components: {
    Header,
    Input
  },
  computed: {
    ...mapState(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['setLoggedIn'])
  },
  watch: {
    isLoggedIn (val) {
    }
  },
  mounted () {
    const c = getCookie('ACCESS-TOKEN')
    if (c) {
      const res = disassemble(c)
      res.status = true
      this.setLoggedIn(res)
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style lang="less" scoped>

.wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kv {
  height: 486px;
  margin-right: 2rem;
}

.login-title {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 800;
}

.purple {
  color: #542DE0
}

.login-box {
  box-shadow:0px 10px 40px 0px rgba(0,0,0,0.1);
  width: 500px;
  height: 400px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

@media screen and (max-width: 1200px) {
  .kv {
    width: 50%;
    height: 50%;
    margin-right: 0;
  }
}
@media screen and (max-width: 900px) {
  .kv {
    display: none;
  }
}
</style>
