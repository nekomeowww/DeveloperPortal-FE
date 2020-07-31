<template>
    <div>
      <Header
        :showLoginBtn="!isLoggedIn"
        :showAvatar="true"
      />
      <Menu />
      <Applications />
    </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import Applications from '@/components/Applications.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Header,
    Menu,
    Applications
  },
  computed: {
    ...mapState(['isLoggedIn', 'userProfile'])
  },
  mounted () {
    console.log(this.userProfile)
  }
}
</script>
