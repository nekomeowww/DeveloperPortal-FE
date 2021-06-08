<template>
  <PhotoFrame>
    <template v-slot:sidebar>
      <div class="sidebar-menu">
        <router-link :to="{path: '/teams'}">
          <i class="el-icon-arrow-left" />
          {{ $t('backToTeam') }}
        </router-link>
      </div>
    </template>
    <NewTeamForm
      :admins="[parseInt(userId)]"
    />
  </PhotoFrame>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Axios from 'axios'

import PhotoFrame from '@/components/PhotoFrame.vue'
import NewTeamForm from '@/components/Team/NewTeamForm.vue'

import { getCookie, disassemble } from '../util/cookie'
import env from '../../env.json'
import i18n from '../locale'

export default {
  components: {
    PhotoFrame,
    NewTeamForm
  },
  data () {
    return {
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
    document.title = i18n.t('siteTitle.team.new')
  },
  mounted () {
    const c = getCookie('ACCESS-TOKEN')
    if (c) {
      const res = disassemble(c)
      res.status = true
      this.setLoggedIn(res)
      this.userId = res.id

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

<style lang="less" scoped>
.sidebar-menu {
  background:rgba(247,247,247,1);
  box-shadow:1px 0px 0px 0px rgba(219,219,219,1);
  width: 290px;
  height: 100%;
  padding: 40px 40px 0;
  a {
    padding-left: 10px;
    font-size: 16px;
    font-weight: 500;
    color: black;
    line-height: 22px;
    text-decoration: none;
    &:hover {
      color: #542DE0;
    }
  }
}
@media screen and (max-width: 1200px) {
  .sidebar-menu {
    padding: 40px 0 0;
  }
}
</style>
