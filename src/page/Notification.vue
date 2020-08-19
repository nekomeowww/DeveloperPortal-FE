<template>
  <PhotoFrame>
    <template v-slot:sidebar>
      <div class="sidebar-menu">
        <router-link :to="{path: '/teams'}">
          <i class="el-icon-arrow-left" />
          Back to Home
        </router-link>
      </div>
    </template>
  </PhotoFrame>
</template>

<script>

import PhotoFrame from '@/components/PhotoFrame.vue'
import Applications from '@/components/Applications.vue'
import { mapState, mapActions } from 'vuex'
import { getCookie, disassemble } from '../util/cookie'

export default {
  components: {
    PhotoFrame,
    Applications
  },
  data () {
    return {
      userId: 0
    }
  },
  computed: {
    ...mapState(['isLoggedIn', 'userProfile'])
  },
  methods: {
    ...mapActions(['setLoggedIn'])
  },
  created () {
    document.title = 'App 列表 - Matataki 开发者中心'
    const c = getCookie('ACCESS-TOKEN')
    if (c) {
      const res = disassemble(c)
      res.status = true
      this.setLoggedIn(res)
      this.userId = parseInt(res.id)
    } else {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar-menu {
  background:rgba(247,247,247,1);
  box-shadow:1px 0px 0px 0px rgba(219,219,219,1);
  width: 290px;
  height: 100%;
  padding: 40px 40px 0;
  a {
    padding-left: 10px;
    font-size: 16px;
    font-weight: 500;
    color: black;
    line-height: 22px;
    text-decoration: none;
    &:hover {
      color: #542DE0;
    }
  }
}
@media screen and (max-width: 1200px) {
  .sidebar-menu {
    padding: 40px 0 0;
  }
}
</style>
