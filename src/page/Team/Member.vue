<template>
  <PhotoFrame>
    <template v-slot:sidebar>
      <TeamMenu />
    </template>
    <Member
      :users="team.users"
      :admin="team.admin"
      :teamData="team.form"
    />
  </PhotoFrame>
</template>

<script>
import PhotoFrame from '@/components/PhotoFrame.vue'
import TeamMenu from '@/components/Team/Menu.vue'
import Member from '@/components/Team/Member.vue'

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
    Member
  },
  data () {
    return {
      team: {
        id: '',
        img: '',
        form: null,
        admin: [],
        users: []
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
        this.team.users = team.data.users
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
    document.title = '成员管理 - Matataki 开发者中心'
  }
}
</script>
