<template>
  <PhotoFrame>
    <NewAppForm />
  </PhotoFrame>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Axios from 'axios'

import PhotoFrame from '@/components/PhotoFrame.vue'
import NewAppForm from '@/components/NewAppForm.vue'

import { getCookie, disassemble } from '../util/cookie'
import env from '../../env.json'

export default {
  components: {
    PhotoFrame,
    NewAppForm
  },
  computed: {
    ...mapState(['isLoggedIn', 'userId'])
  },
  methods: {
    ...mapActions(['setLoggedIn', 'setCurrentAppId'])
  },
  mounted () {
    const c = getCookie('ACCESS-TOKEN')
    if (c) {
      const res = disassemble(c)
      res.status = true
      this.setLoggedIn(res)

      Axios.get(env.DEVELOPERAPI + '/user/app?id=' + res.id).then(apps => {
        if (apps.data.id) {
          let id = apps.data.id
          id = id + 1
          this.setCurrentAppId(id)
        }
      }).catch(e => {
        this.setCurrentAppId(1)
      })
    } else {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
