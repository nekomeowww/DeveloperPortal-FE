<template>
    <div>
      <Header
        :showLoginBtn="!isLoggedIn"
      />
      <Menu />
      <NewAppForm />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Axios from 'axios'

import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import NewAppForm from '@/components/NewAppForm.vue'

import { getCookie, disassemble } from '../util/cookie'
import env from '../../env.json'

export default {
  components: {
    Header,
    Menu,
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
    }
  }
}
</script>
