<template>
  <div class="application">
    <div class="app-desp">
      <div class="app-desp-title">{{ $t('comp.team.app.title') }}</div>
      <div class="app-desp-content">{{ $t('comp.team.app.desc') }}</div>
    </div>
    <div v-if="isTeam" class="app-title">{{ $t('comp.team.app.apps') }}</div>
    <div v-else class="app-title">{{ $t('comp.team.app.my') }}</div>
    <el-row :gutter="20" class="apps">
      <div v-for="(app, index) in appCards" :key=index>
        <router-link :to="{ path:'/team/' + currentTeamId + '/app/' + app.id, params: { app: app } }">
          <div v-if="app.id">
            <div class="app-item" :href="app.href">
              <img class="app-img" :src="app.img" />
              <span class="app-name">{{ app.name }}</span>
            </div>
          </div>
        </router-link>
      </div>
      <router-link :to="'/team/' + $route.params.id + '/newapp'">
        <div class="app-new">
          <img id="new-logo" src="../../assets/img/newapp.png" />
          <span id="new-text">{{ $t('comp.team.app.new') }}</span>
        </div>
      </router-link>
    </el-row>
  </div>
</template>

<script>
import Axios from 'axios'

import env from '../../../env.json'
import { mapState } from 'vuex'

export default {
  props: {
    userId: {
      type: Number,
      default: 0
    },
    isTeam: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      appCards: []
    }
  },
  computed: {
    ...mapState(['currentTeamId'])
  },
  created () {
  },
  mounted () {
    if (this.userId) {
      Axios.get(env.DEVELOPERAPI + '/team/app?id=' + this.currentTeamId).then(appData => {
        if (appData.data.apps) {
          const apps = appData.data.apps
          apps.forEach(id => {
            Axios(env.DEVELOPERAPI + '/team/appdetail?appId=' + id).then(app => {
              let appObject = { img: '', name: '', id: id }
              appObject.img = app.data.img === '' || app.data.img === undefined ? require('@/assets/img/app-default.png') : env.DEVELOPERAPI + '/img/' + app.data.img
              appObject.name = app.data.detail.name
              this.appCards.push(appObject)
            })
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

a {
  text-decoration: none;
  color: black;
}

.application {
  font-family:'PingFangSC-Medium','PingFang SC', Arial, Helvetica, sans-serif;
  padding: 2rem 2rem 0;

}

.app-desp-title {
  font-size: 26px;
}

.app-desp-content {
  font-size: 16px;
  word-break: break-all;
  margin-top: 20px;
  color: #B2B2B2;
}

.app-title {
  margin-top: 20px;
  font-size: 24px;
}

.apps {
  // margin-top: 20px;
  padding: 20px 0 40px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.app-img {
  margin-top: 10px;
  height: 128px;
  width: 128px;
  object-fit: cover;
}

.app-item {
  margin-bottom: 1rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  width:148px;
  height:180px;
  background:rgba(241,241,241,1);
  border-radius:8px;
  &:hover {
    background-color: #E5E5E5;
  }
  a {
    text-decoration: none;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.app-name {
  font-size: 14px;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  word-break: break-all;
  padding: 10px;
  height: 14px;
}

.app-new {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width:148px;
  height:180px;
  background:rgba(241,241,241,1);
  border-radius:8px;
  &:hover {
    background-color: #E5E5E5;
  }
}

#new-logo {
  height: 40px;
}

#new-text {
  margin-top: 20px;
  font-size: 14px;
  color: #B2B2B2;
  text-decoration: none;
}
</style>
