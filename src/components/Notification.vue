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
          <div v-if="index === 0" class="notification-container" style="padding-top: 12px">
            <div class="notification-name"><i class="el-icon-lock"></i> {{ value.key }}</div>
            <div class="notification-mid"></div>
          </div>
          <div v-if="index !== 0" class="notification-container">
            <div class="notification-name"><i class="el-icon-lock"></i> {{ value.key }}</div>
            <div class="notification-mid"></div>
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
    ...mapActions(['setLoggedIn', 'setCurrentAppId'])
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
    Axios.get(env.DEVELOPERAPI + '/notification/push?id=' + this.userId).then(res =>
      console.log(res.data)
    )
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

.notification-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #22863A;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  word-break: break-all;
  margin-right: 5px;
}

/deep/ .el-icon-lock {
  font-weight: 800;
}
</style>
