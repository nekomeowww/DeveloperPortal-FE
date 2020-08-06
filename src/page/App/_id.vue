<template>
  <PhotoFrame>
    <template v-slot:sidebar>
      <AppMenu />
    </template>
    <NewAppForm
      :notNew="true"
      :showSecretRow="true"
      :id="app.id"
      :appData="app.form"
      :icon="app.img"
      :clientId="app.clientId"
      :clientSecret="app.clientSecret"
    />
  </PhotoFrame>
</template>

<script>
import PhotoFrame from '@/components/PhotoFrame'
import AppMenu from '@/components/AppMenu'
import NewAppForm from '@/components/NewAppForm.vue'

import { mapState, mapActions } from 'vuex'
import { getCookie, disassemble } from '../../util/cookie'
import Axios from 'axios'

import env from '../../../env.json'

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
    NewAppForm
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
      Axios.get(env.DEVELOPERAPI + '/app/detail?appId=' + this.$route.params.id).then(app => {
        this.setCurrentAppId(this.$route.params.id)
        this.app.id = this.$route.params.id
        this.app.img = app.data.img === '' || app.data.img === undefined ? require('@/assets/img/app-default.png') : env.DEVELOPERAPI + '/img/' + app.data.img
        this.app.form = app.data.detail
      })
      Axios.get(env.DEVELOPERAPI + '/app/secret?appId=' + this.$route.params.id + '&userId=' + this.userId).then(app2 => {
        this.app.clientId = app2.data.clientId
        this.app.clientSecret = app2.data.clientSecret
      })
    } else {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
