<template>
  <div>
    <PhotoFrame>
      <template v-slot:sidebar>
        <AppMenu />
      </template>
      <UpdateVault
        :id="$route.params.id"
        :vaultId="$route.params.vaultId"
      />
    </PhotoFrame>
  </div>
</template>

<script>
import PhotoFrame from '@/components/PhotoFrame.vue'
import AppMenu from '@/components/AppMenu.vue'
import UpdateVault from '@/components/Vault/Update.vue'

import { mapActions, mapState } from 'vuex'
import { getCookie, disassemble } from '../../util/cookie'

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    vaultId: {
      type: String,
      default: () => {}
    }
  },
  components: {
    PhotoFrame,
    AppMenu,
    UpdateVault
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
