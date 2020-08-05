<template>
  <PhotoFrame>
    <Applications
      :userId="userId"
    />
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
