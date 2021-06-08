<template>
  <div>
    <PhotoFrame>
      <template v-slot:sidebar>
        <AppMenu />
      </template>
      <NewVault />
    </PhotoFrame>
  </div>
</template>

<script>
import PhotoFrame from '@/components/PhotoFrame.vue'
import AppMenu from '@/components/AppMenu.vue'
import NewVault from '@/components/Vault/New.vue'

import { mapActions, mapState } from 'vuex'
import { getCookie, disassemble } from '../../util/cookie'
import i18n from '../../locale'

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
    NewVault
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
  },
  mounted () {
    document.title = i18n.t('siteTitle.vault')
  }
}
</script>
