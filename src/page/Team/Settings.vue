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
    />
  </PhotoFrame>
</template>

<script>
import PhotoFrame from '@/components/PhotoFrame'
import TeamMenu from '@/components/TeamMenu'
import NewTeamForm from '@/components/NewTeamForm.vue'

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
    TeamMenu,
    PhotoFrame,
    NewTeamForm
  },
  data () {
    return {
      team: {
        id: '',
        img: '',
        form: null
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
        this.setCurrentTeamId(this.$route.params.id)
        this.team.id = this.$route.params.id
        this.team.img = team.data.img === '' || team.data.img === undefined ? require('@/assets/img/team-default.png') : env.DEVELOPERAPI + '/img/' + team.data.img
        this.team.form = team.data.detail
      })
    } else {
      this.$router.push({ name: 'Login' })
    }
  },
  mounted () {
    document.title = '基本信息 - Matataki 开发者中心'
  }
}
</script>
