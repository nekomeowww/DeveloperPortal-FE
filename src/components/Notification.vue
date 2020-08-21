<template>
  <div class="notification">
    <div class="notification-desp">
      <div class="notification-desp-title">
        <span>通知 Notification</span>
      </div>
      <div class="notification-desp-content">
        这里是通知列表，所有邀请和动态都会显示在这里。
      </div>
      <div class="notification-key-value">
        <div v-for="(value, index) in notifyData" :key=index>
          <div v-if="index === 0" class="notification-container" :id="value.notifyGlobalId" style="padding-top: 12px">
            <div class="info-container">
              <div class="notification-name-container">
              <div class="inviter-container">
                <img class="inviter-avatar" :src="value.inviter.avatar">
                <div class="inviter-name-container">
                  <span class="nickname">{{ value.inviter.nickname }}</span>
                  <span class="email">{{ value.body }}</span>
                </div>
              </div>
            </div>
            <br>
            <div class="notification-team-container">
              <div class="team-container">
                <img class="team-img" :src="value.team.img">
                  <div class="team-name-container">
                    <span class="join">加入</span>
                    <span class="name">{{ value.team.name }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="notification-mid"></div>
            <div class="selection-container">
              <el-button type="success" icon="el-icon-check" circle @click="() => { confirm(index, value.notifyGlobalId, value.userId, value.notifyId, value.teamId) }"></el-button>
              <el-button type="danger" icon="el-icon-close" circle @click="() => { deny(index, value.notifyGlobalId, value.userId, value.notifyId, value.teamId) }"></el-button>
            </div>
          </div>
          <div v-if="index !== 0" :id="value.notifyGlobalId" class="notification-container">
            <div class="info-container">
              <div class="notification-name-container">
              <div class="inviter-container">
                <img class="inviter-avatar" :src="value.inviter.avatar">
                <div class="inviter-name-container">
                  <span class="nickname">{{ value.inviter.nickname }}</span>
                  <span class="email">{{ value.body }}</span>
                </div>
              </div>
            </div>
            <br>
            <div class="notification-team-container">
              <div class="team-container">
                <img class="team-img" :src="value.team.img">
                  <div class="team-name-container">
                    <span class="join">加入</span>
                    <span class="name">{{ value.team.name }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="notification-mid"></div>
            <div class="selection-container">
              <el-button type="success" icon="el-icon-check" circle @click="() => { confirm(index, value.notifyGlobalId, value.userId, value.notifyId, value.teamId) }"></el-button>
              <el-button type="danger" icon="el-icon-close" circle @click="() => { deny(index, value.notifyGlobalId, value.userId, value.notifyId, value.teamId) }"></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Axios from 'axios'

import { getCookie, disassemble } from '../util/cookie'
import env from '../../env.json'

export default {
  props: {
    appId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      notifyData: [],
      userId: 0
    }
  },
  computed: {
    ...mapState(['currentAppId'])
  },
  methods: {
    ...mapActions(['setLoggedIn', 'setCurrentAppId']),
    confirm (index, id, uid, noId, teamId) {
      const elem = document.getElementById(id)
      let opacity = 0
      // eslint-disable-next-line no-use-before-define
      const intervalId = setInterval(frame, 5)
      function frame () {
        if (opacity === 100) {
          clearInterval(intervalId)
        } else {
          opacity++
          elem.style.opacity = opacity / 100
        }
      }
      this.notifyData.splice(index, 1)
      this.acceptInvite({ userId: uid, notifyId: noId, teamId: teamId })
    },
    deny (index, id, uid, noId, teamId) {
      const elem = document.getElementById(id)
      let opacity = 0
      // eslint-disable-next-line no-use-before-define
      const intervalId = setInterval(frame, 5)
      function frame () {
        if (opacity === 100) {
          clearInterval(intervalId)
        } else {
          opacity++
          elem.style.opacity = opacity / 100
        }
      }
      this.notifyData.splice(index, 1)
      this.denyInvite({ userId: uid, notifyId: noId, teamId: teamId })
    },
    acceptInvite ({ userId, notifyId, teamId }) {
      Axios.get(env.DEVELOPERAPI + '/invite/update?id=' + this.userId + '&result=accept&notifyId=' + notifyId + '&inviteId=' + userId + '&teamId=' + teamId)
    },
    denyInvite ({ userId, notifyId, teamId }) {
      Axios.get(env.DEVELOPERAPI + '/invite/update?id=' + this.userId + '&result=deny&notifyId=' + notifyId + '&inviteId=' + userId + '&teamId=' + teamId)
    }
  },
  created () {
    const c = getCookie('ACCESS-TOKEN')
    if (c) {
      const res = disassemble(c)
      res.status = true
      this.setLoggedIn(res)
      this.userId = parseInt(res.id)
    }
    if (this.userId === 0) {
      this.$message({
        message: '出现了问题，现在返回 App 列表',
        type: 'error',
        duration: 4000
      })
      this.$router.push({ name: 'Home' })
    }
    Axios.get(env.DEVELOPERAPI + '/notification/push?id=' + this.userId).then(res => {
      const notifications = res.data
      notifications.forEach(notification => {
        notification.team = { img: '', name: '' }
        notification.inviter = { avatar: '', nickname: '', email: '' }

        Axios.get(env.DEVELOPERAPI + '/team/detail?teamId=' + notification.teamId).then(teamres => {
          notification.team.img = env.DEVELOPERAPI + '/img/' + teamres.data.img
          notification.team.name = teamres.data.detail.name
          Axios.get(env.DEVELOPERAPI + '/user/info?id=' + notification.userId).then(userres => {
            notification.inviter.avatar = env.MTTKIMGCDN + userres.data.avatar
            notification.inviter.nickname = userres.data.nickname
            notification.inviter.email = userres.data.email
            this.notifyData.push(notification)
          })
        })
      })
    })
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.notification {
  font-family:PingFangSC-Medium,PingFang SC, Arial, Helvetica, sans-serif;
  height: 120%;
  padding: 2rem 2rem 40px;
  margin-right: 2rem;
}

.notification-desp-title {
  display: flex;
  align-items: center;
  font-size: 26px;
}

.notification-mid {
  flex: 1;
}

.notification-desp-content {
  font-size: 16px;
  word-break: break-all;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #B2B2B2;
}

.notification-key-value {
  border: 2px solid #EBEBEB;
  border-radius: 12px;
}

.notification-container {
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 12px;
}

.info-container {
  display: flex;
  flex-direction: column;
}

.notification-name-container {
  margin-right: 5px;
}

.inviter-container {
  display: flex;
  align-items: center;
}

.inviter-name-container {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  .nickname {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    word-break: break-all;
  }
  .email {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    word-break: break-all;
    color: #B2B2B2;
  }
}

.inviter-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.team-container {
  display: flex;
  align-items: center;
}

.team-name-container {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  .join {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    word-break: break-all;
    color: #B2B2B2;
  }
  .name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    word-break: break-all;
  }
}

.team-img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 5px;
}

/deep/ .el-icon-lock {
  font-weight: 800;
}
</style>
