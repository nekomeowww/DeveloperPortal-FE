<template>
  <PhotoFrame>
    <Teams
      :userId="userId"
    />
  </PhotoFrame>
</template>

<script>

import PhotoFrame from '@/components/PhotoFrame.vue'
import Teams from '@/components/Team/Teams.vue'
import { mapState, mapActions } from 'vuex'
import { getCookie, disassemble } from '../../util/cookie'
import i18n from '../../locale'

export default {
  components: {
    PhotoFrame,
    Teams
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
    document.title = i18n.t('siteTitle.team.list')
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
