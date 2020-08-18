<template>
    <div class="team">
      <div class="team-desp">
        <div class="team-desp-title">Teams</div>
        <div class="team-desp-content">如果和别人一同合作创建你们的应用程序实例能让你事半功倍，那创建一个合适的团队便是你最佳的选择，在下面创建由你命名和管理的团队吧！</div>
      </div>
      <div class="team-title">My Teams</div>
      <el-row :gutter="20" class="teams">
        <div v-for="(team, index) in appCards" :key=index>
          <router-link :to="{ path:'/team/' + team.id + '/settings', params: { team: team } }">
            <div v-if="team.id">
              <div class="team-item" :href="team.href">
                <img class="team-img" :src="team.img" />
                <span class="team-name">{{ team.name }}</span>
              </div>
            </div>
          </router-link>
        </div>
        <router-link to="/newteam">
          <div class="team-new">
            <img id="new-logo" src="../assets/img/team-img.png" />
            <span id="new-text">创建你的 Team</span>
          </div>
        </router-link>
      </el-row>
    </div>
</template>

<script>
import Axios from 'axios'

import env from '../../env.json'

export default {
  props: {
    userId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      appCards: []
    }
  },
  created () {
  },
  mounted () {
    if (this.userId) {
      Axios.get(env.DEVELOPERAPI + '/user/team?id=' + this.userId).then(appData => {
        const teams = appData.data.teams
        teams.forEach(id => {
          Axios(env.DEVELOPERAPI + '/team/detail?teamId=' + id).then(team => {
            let appObject = { img: '', name: '', id: id }
            appObject.img = team.data.img === '' || team.data.img === undefined ? require('@/assets/img/team-default.png') : env.DEVELOPERAPI + '/img/' + team.data.img
            appObject.name = team.data.detail.name
            this.appCards.push(appObject)
          })
        })
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

.team {
  font-family:'PingFangSC-Medium','PingFang SC', Arial, Helvetica, sans-serif;
  padding: 2rem 2rem 0;

}

.team-desp-title {
  font-size: 26px;
}

.team-desp-content {
  font-size: 16px;
  word-break: break-all;
  margin-top: 20px;
  color: #B2B2B2;
}

.team-title {
  margin-top: 20px;
  font-size: 24px;
}

.teams {
  // margin-top: 20px;
  padding: 20px 0 40px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.team-img {
  margin-top: 10px;
  height: 128px;
  width: 128px;
  object-fit: cover;
}

.team-item {
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

.team-name {
  margin-top: 0.5rem;
  font-size: 16px;
}

.team-new {
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
