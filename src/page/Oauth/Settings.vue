<template>
  <PhotoFrame>
    <template v-slot:sidebar>
      <AppMenu />
    </template>
    <OauthSettings />
  </PhotoFrame>
</template>

<script>
import PhotoFrame from '@/components/PhotoFrame'
import AppMenu from '@/components/AppMenu'
import OauthSettings from '@/components/OauthSettings.vue'

import { mapState, mapActions } from 'vuex'
import { getCookie, disassemble } from '../../util/cookie'

export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  components: {
    AppMenu,
    PhotoFrame,
    OauthSettings
  },
  data () {
    return {
      app: {
        id: '',
        img: '',
        form: null,
        clientId: '',
        clientSecret: ''
      },
      userId: 0
    }
  },
  computed: {
    ...mapState(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['setLoggedIn', 'setCurrentAppId'])
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
