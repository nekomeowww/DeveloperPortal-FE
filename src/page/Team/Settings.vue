<template>
  <PhotoFrame>
    <template v-slot:sidebar>
      <TeamMenu />
    </template>
    <NewTeamForm
      :notNew="true"
      :id="team.id"
      :teamData="team.form"
      :icon="team.img"
      :admins="team.admin"
    />
  </PhotoFrame>
</template>

<script>
import PhotoFrame from '@/components/PhotoFrame.vue'
import TeamMenu from '@/components/Team/Menu.vue'
import NewTeamForm from '@/components/Team/NewTeamForm.vue'

import { mapState, mapActions } from 'vuex'
import { getCookie, disassemble } from '../../util/cookie'
import Axios from 'axios'

import env from '../../../env.json'
import i18n from '../../locale'

export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  components: {
    TeamMenu,
    PhotoFrame,
    NewTeamForm
  },
  data () {
    return {
      team: {
        id: '',
        img: '',
        form: null,
        admin: []
      },
      userId: 0
    }
  },
  computed: {
    ...mapState(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['setLoggedIn', 'setCurrentTeamId'])
  },
  created () {
    const c = getCookie('ACCESS-TOKEN')
    if (c) {
      const res = disassemble(c)
      res.status = true
      this.setLoggedIn(res)
      this.userId = parseInt(res.id)
      Axios.get(env.DEVELOPERAPI + '/team/detail?teamId=' + this.$route.params.id).then(team => {
        if (team.data === false) {
          this.$message({
            message: i18n.t('elMessage.error.team'),
            type: 'error',
            duration: 4000
          })
          this.$router.push({ name: 'Teams' })
        }
        this.setCurrentTeamId(this.$route.params.id)
        this.team.id = this.$route.params.id
        this.team.img = team.data.img === '' || team.data.img === undefined ? require('@/assets/img/team-default.png') : env.DEVELOPERAPI + '/img/' + team.data.img
        this.team.form = team.data.detail
        this.team.admin = team.data.admins
        if (this.team.admin.indexOf(team.data.userId) === -1) {
          this.team.admin.push(team.data.userId)
        }
      })
    } else {
      this.$router.push({ name: 'Login' })
    }
  },
  mounted () {
    document.title = i18n.t('siteTitle.basic')
  }
}
</script>
