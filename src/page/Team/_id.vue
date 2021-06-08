<template>
  <PhotoFrame>
    <template v-slot:sidebar>
      <TeamMenu />
    </template>
    <Applications
      :userId="userId"
      :isTeam="true"
    />
  </PhotoFrame>
</template>

<script>

import PhotoFrame from '@/components/PhotoFrame.vue'
import Applications from '@/components/Team/Applications.vue'
import TeamMenu from '@/components/Team/Menu.vue'
import { mapState, mapActions } from 'vuex'
import { getCookie, disassemble } from '../../util/cookie'
import i18n from '../../locale'

export default {
  components: {
    PhotoFrame,
    Applications,
    TeamMenu
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
    document.title = i18n.t('siteTitle.app.list')
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
