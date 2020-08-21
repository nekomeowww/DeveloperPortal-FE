<template>
  <div>
    <div class="application">
      <div class="member-desp">
        <div class="member-desp-title">
            <span>成员管理 Members</span>
            <div class="member-mid"></div>
            <el-button v-if="isAdmin" type="primary" @click="centerDialogVisible = true">邀请成员</el-button>
        </div>
        <div v-if="isAdmin" class="member-desp-content">在这里你可以管理成员的权限和邀请和删除你的团队的成员。</div>
        <div v-else class="member-desp-content">在这里你可以看到团队的成员</div>
      </div>
      <div class="user-key-value">
        <div v-for="(value, index) in userData" :key=index>
          <div v-if="index === 0" class="user-slot-container" style="padding-top: 12px">
            <div :id="value.id" class="user-container">
              <img class="user-avatar" :src="value.avatar" />
              <div class="user-name-container">
                <span class="user-nickname">{{ value.nickname }}</span>
                <span class="user-email">{{ value.email }}</span>
              </div>
            </div>
            <div class="user-mid"></div>
            <div v-if="value.isOwner">所有者 Owner</div>
            <el-button v-else-if="value.isSelf" type="danger" icon="el-icon-close" circle @click="quit(value)"></el-button>
            <el-button v-else type="danger" icon="el-icon-delete" circle @click="quit(value)"></el-button>
            <el-dialog
              title="请确认操作"
              :visible.sync="quitDialogVisible"
              width="30%"
              center>
              <span v-if="!isAdmin">确定要退出这个团队吗？</span>
              <span v-else>确定要删除这个成员吗？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="quitDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="quitTeam(value)">确 定</el-button>
              </span>
            </el-dialog>
          </div>
          <div v-if="index !== 0" class="user-slot-container">
            <div :id="value.id" class="user-container">
              <img class="user-avatar" :src="value.avatar" />
              <div class="user-name-container">
                <span class="user-nickname">{{ value.nickname }}</span>
                <span class="user-email">{{ value.email }}</span>
              </div>
            </div>
            <div class="user-mid"></div>
            <div v-if="value.isOwner">所有者 Owner</div>
            <el-button v-else-if="value.isSelf" type="danger" icon="el-icon-close" circle @click="quit(value)"></el-button>
            <el-button v-if="isAdmin" type="danger" icon="el-icon-delete" circle @click="quit(value)"></el-button>
            <el-dialog
              title="请确认操作"
              :visible.sync="quitDialogVisible"
              width="30%"
              center>
              <span v-if="!isAdmin">确定要退出这个团队吗？</span>
              <span v-else>确定要删除这个成员吗？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="quitDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="quitTeam(value)">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :title="inviteMessage"
      :visible.sync="centerDialogVisible"
      width="50%"
      center
    >
      <div style="display: flex">
      <el-select v-model="value" filterable placeholder="搜索成员的昵称，或是电子邮件地址" style="width: 100%;">
        <el-option
          v-for="item in userList"
          :key="item.nickname"
          :label="item.nickname"
          :value="item.id"
          >
          {{ item.nickname +' - '+ item.email }}
        </el-option>
      </el-select>
        <el-button type="primary" @click="invite">邀请</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import { getCookie, disassemble } from '../../util/cookie'
import env from '../../../env.json'
import Axios from 'axios'

export default {
  props: {
    admin: {
      type: Array,
      default: () => []
    },
    users: {
      type: Array,
      default: () => []
    },
    teamData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      value: '',
      userId: 0,
      userData: [],
      userList: [],
      isAdmin: false,
      inviteMessage: '',
      centerDialogVisible: false,
      quitDialogVisible: false
    }
  },
  watch: {
    admin (val) {
      val.forEach(id => {
        Axios.get(env.DEVELOPERAPI + '/user/info?id=' + id).then(res => {
          this.userData.push({
            id: id,
            nickname: res.data.nickname,
            email: res.data.email,
            avatar: env.MTTKIMGCDN + res.data.avatar,
            isOwner: true
          })
        })
      })
      this.admin = val
      if (this.admin.indexOf(parseInt(this.userId)) === -1) {
        Axios.get(env.DEVELOPERAPI + '/user/info?id=' + this.userId).then(res => {
          this.userData.push({
            id: this.userId,
            nickname: res.data.nickname,
            email: res.data.email,
            avatar: env.MTTKIMGCDN + res.data.avatar,
            isOwner: false,
            isSelf: true
          })
        })
      } else {
        this.isAdmin = true
      }
    },
    userId (val) {
      this.userId = val
    },
    teamData (val) {
      this.teamData = val
      this.inviteMessage = '邀请你的成员加入 ' + val.name
    },
    users (val) {
      val.forEach(id => {
        if (id === parseInt(this.userId)) {
          return
        }
        Axios.get(env.DEVELOPERAPI + '/user/info?id=' + id).then(res => {
          this.userData.push({
            id: id,
            nickname: res.data.nickname,
            email: res.data.email,
            avatar: env.MTTKIMGCDN + res.data.avatar,
            isOwner: false,
            isSelf: false
          })
        })
      })
    }
  },
  computed: {
    ...mapState(['currentTeamId', 'userProfile'])
  },
  methods: {
    ...mapActions(['setLoggedIn', 'setCurrentAppId']),
    newMember () {
      this.drawer = true
    },
    invite () {
      Axios.get(env.DEVELOPERAPI + '/invite?id=' + this.userId + '&teamId=' + this.$route.params.id + '&inviteId=' + this.value).then(res => {
        if (res.data.title) {
          this.$message({
            message: '邀请成功',
            type: 'success',
            duration: 4000
          })
        }
        this.centerDialogVisible = false
      })
    },
    quit () {
      this.quitDialogVisible = true
    },
    quitTeam (value) {
      console.log(value)
      Axios.get(env.DEVELOPERAPI + '/team/quit?userId=' + value.id + '&teamId=' + this.$route.params.id).then(res => {
        if (res.data.code === 0 && !this.isAdmin) {
          this.quitDialogVisible = false
          this.$message({
            message: '成功，现在返回 Team 列表',
            type: 'success',
            duration: 4000
          })
          this.$router.push({ name: 'Teams' })
        }
      })
    }
  },
  created () {
    Axios.get(env.DEVELOPERAPI + '/user/all').then(res => {
      this.userList = res.data.users
    })
  },
  mounted () {
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

    const iCLassElem = document.createElement('i')
    iCLassElem.className = 'el-icon-message'
    iCLassElem.style.fontSize = '2rem'
    iCLassElem.style.marginTop = '2rem'
    const mainHeaderElem = document.getElementsByClassName('el-dialog__header')[0]
    mainHeaderElem.appendChild(iCLassElem)
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
  margin-right: 2rem;

}

.member-desp-title {
  display: flex;
  align-items: center;
  font-size: 26px;
}

.member-mid {
  flex: 1;
}

.member-desp-content {
  font-size: 16px;
  word-break: break-all;
  margin-top: 20px;
  color: #B2B2B2;
}

.member-title {
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

.member-img {
  margin-top: 10px;
  height: 128px;
  width: 128px;
  object-fit: cover;
}

.member-item {
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

.member-name {
  margin-top: 0.5rem;
  font-size: 16px;
}

.member-new {
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

.user-key-value {
  margin-top: 2rem;
  border: 2px solid #EBEBEB;
  border-radius: 12px;
}

.user-slot-container {
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 12px;
  .user-container {
    display: flex;
    align-items: center;
  }
}

.user-mid {
  flex: 1;
}

.user-avatar {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 50%;
}

.user-name-container {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  .user-email {
    color: #909399;
  }
}

/deep/ .el-dialog {
  border-radius: 20px;
}

/deep/ .el-dialog__header {
  display: flex;
  flex-direction: column;
}

/deep/ .el-dialog__title {
  margin-top: 2rem;
  order: 100;
}
</style>
