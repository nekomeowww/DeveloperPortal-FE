<template>
    <div>
      <Header
        :showLoginBtn="!isLoggedIn"
      />
      <Menu />
      <Applications />
    </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import Applications from '@/components/Applications.vue'
import { mapState, mapActions } from 'vuex'
import { getCookie, disassemble } from '../util/cookie'

export default {
  components: {
    Header,
    Menu,
    Applications
  },
  computed: {
    ...mapState(['isLoggedIn', 'userProfile'])
  },
  methods: {
    ...mapActions(['setLoggedIn'])
  },
  mounted () {
    const c = getCookie('ACCESS-TOKEN')
    if (c) {
      const res = disassemble(c)
      res.status = true
      this.setLoggedIn(res)
    }
  }
}
</script>
