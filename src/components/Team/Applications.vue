<template>
  <div class="application">
    <div class="app-desp">
      <div class="app-desp-title">Application</div>
      <div class="app-desp-content">找到最适合你心目中 App 使用的 API SDK 和 API 设定集，然后申请创建一个由你自己服务器主持的实例。使用 Matataki API 开始构建属于你的应用程序。我们等不及想要看到你的作品了哦！</div>
    </div>
    <div v-if="isTeam" class="app-title">My Team's Application</div>
    <div v-else class="app-title">My Application</div>
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
          <span id="new-text">创建你的 App</span>
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
  margin-top: 0.5rem;
  font-size: 16px;
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
