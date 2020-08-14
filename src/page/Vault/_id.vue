<template>
  <div>
    <PhotoFrame>
      <template v-slot:sidebar>
        <AppMenu />
      </template>
      <VaultSettings />
    </PhotoFrame>
  </div>
</template>

<script>
import PhotoFrame from '@/components/PhotoFrame.vue'
import AppMenu from '@/components/AppMenu.vue'
import VaultSettings from '@/components/Vault/Settings.vue'

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
    PhotoFrame,
    AppMenu,
    VaultSettings
  },
  computed: {
    ...mapState(['isLoggedIn', 'userProfile'])
  },
  methods: {
    ...mapActions(['setLoggedIn', 'setCurrentAppId'])
  },
  created () {
    this.setCurrentAppId(this.$route.params.id)
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
