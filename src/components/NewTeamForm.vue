<template>
  <div class="team">
    <div class="team-desp">
      <div v-if="notNew" class="team-desp-title">General Information</div>
      <div v-else class="team-desp-title">Creating New Team</div>
      <div class="team-desp-content">填写基本的团队信息</div>
    </div>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ruleForm">
        <div>
          <span class="icon-title">团队图标</span>
          <img-upload
            :img-upload-done="imgUploadDone"
            :update-type="'team'"
            class="team-icon"
            @doneImageUpload="doneImageUpload"
          >
            <div
              slot="uploadButton"
              class="user-avatar"
            >
              <div class="edit">
                <i class="el-icon-camera" />
                图标
              </div>
              <img
                id="avatar"
                v-if="getAvatar()"
                slot="description"
                :src="avatar"
                alt="avatar"
              >
              <img v-else id="new-logo" src="../assets/img/team-img.png" style="height:40px;width: 42.96px;"/>
            </div>
          </img-upload>
        </div>
        <div>
          <el-form-item label=' ' prop="name">
            <span class="form-label">名称 Name</span>
            <el-input placeholder="请输入名称..." maxlength="20" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label=' ' prop="desp">
            <span class="form-label">简介 Description</span>
            <el-input placeholder="请输入简介... " type="textarea" maxlength="1000" v-model="ruleForm.desp" :rows="6"></el-input>
          </el-form-item>
          <el-form-item prop="orglink">
            <span class="form-label">组织网站 Website Link</span>
            <el-input placeholder="请输入您的个人或组织网站... " v-model="ruleForm.orglink"></el-input>
          </el-form-item>
          <el-form-item prop="orgname">
            <span class="form-label">组织或公司名称 Organization or Corporation Name</span>
            <el-input placeholder="请输入您的组织或者是公司名称... " v-model="ruleForm.orgname"></el-input>
          </el-form-item>
          <el-form-item prop="usage">
            <span class="form-label">团队使用目标 Team Objective</span>
            <el-input placeholder="您用这个 App 做什么呢？... " v-model="ruleForm.usage"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="notNew" type="primary" @click="submitForm('ruleForm')">保存更改</el-button>
            <el-button v-if="notNew" type="danger" @click="openDeletionConfirm">删除 App</el-button>
            <el-button v-else type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-dialog
        title="请确认操作"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>确定要删除这个 Team 吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="removeTeam">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import imgUpload from '@/components/imgUpload/imgUpload.vue'
import { mapState } from 'vuex'
import Axios from 'axios'

import env from '../../env.json'

export default {
  components: {
    imgUpload
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    notNew: {
      type: Boolean,
      default: false
    },
    teamData: {
      type: Object,
      default: () => {}
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      avatar: '',
      setProfile: false, // 是否编辑信息
      imgUploadDone: 0, // 图片是否上传完成
      defaultCss: '',
      ruleForm: {
        name: '',
        desp: '',
        orglink: '',
        orgname: '',
        callback: '',
        toslink: '',
        pplink: '',
        usage: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'change' }
        ],
        callback: [
          { required: true, message: '请输入回调地址', trigger: 'change' }
        ],
        toslink: [
          { required: false, message: '', trigger: 'change' }
        ],
        orgname: [
          { required: false, message: '', trigger: 'change' }
        ],
        orglink: [
          { required: false, message: '', trigger: 'change' }
        ],
        desp: [
          { required: true, message: '请输入简介', trigger: 'change' }
        ]
      },
      centerDialogVisible: false,
      requestCount: 0
    }
  },
  watch: {
    id (val) {
      this.id = val
    },
    teamData (val) {
      this.ruleForm = val
    }
  },
  computed: {
    ...mapState(['currentTeamId', 'isLoggedIn', 'userId', 'currentTeamIcon'])
  },
  created () {
    if (!this.isLoggedIn) {
      this.$router.push({ name: 'Login' })
    }
  },
  methods: {
    getAvatar () {
      if (this.icon !== '' || this.icon !== undefined) {
        if (this.currentTeamIcon) this.avatar = env.DEVELOPERAPI + '/img' + this.currentTeamIcon
        else this.avatar = this.icon
      }
      if (this.avatar !== '') {
        return true
      } else {
        return false
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Axios.post(env.DEVELOPERAPI + '/team/new', { form: this.ruleForm, teamId: this.currentTeamId, userId: this.userId }).then(res => {
            if (res.data.code === 0 || res.data.code === 1) {
              this.$message({
                message: '创建成功... 现在返回 Team 列表',
                type: 'success',
                duration: 4000
              })

              this.$router.push({ name: 'Teams' })
            } else {
              this.$message({
                message: '出现了问题，请重试',
                type: 'error',
                duration: 4000
              })
            }
          })
        } else {
          this.$message({
            message: '出现了问题，请重试',
            type: 'error',
            duration: 4000
          })
          return false
        }
      })
    },
    doneImageUpload () {
      this.imgUploadDone += Date.now()
      this.$message({
        message: '图片上传成功',
        type: 'success',
        duration: 4000
      })
      this.avatar = env.DEVELOPERAPI + '/img' + this.currentTeamIcon
    },
    openDeletionConfirm () {
      this.centerDialogVisible = true
    },
    removeTeam () {
      Axios.get(env.DEVELOPERAPI + '/team/remove?teamId=' + this.id + '&userId=' + this.userId).then(res => {
        if (res.data.code === 0) {
          this.centerDialogVisible = false
          this.$message({
            message: '删除成功，现在返回 App 列表...',
            type: 'success',
            duration: 4000
          })
          this.$router.push({ name: 'Home' })
        } else if (res.data.code === 1) {
          this.centerDialogVisible = false
          this.$message({
            message: '好像出现了点问题，现在返回 App 列表...',
            type: 'warning',
            duration: 4000
          })
          this.$router.push({ name: 'Home' })
        } else {
          this.centerDialogVisible = false
          this.$message({
            message: '出现错误，返回 App 列表...',
            type: 'success',
            duration: 4000
          })
          this.$router.push({ name: 'Home' })
        }
      })
    }
  },
  mounted () {
    if (this.notNew) {
      if (this.icon !== '') this.avatar = this.icon
      if (this.teamData) this.ruleForm = this.teamData
    }
  }
}
</script>
<style lang="less" scoped>

.team {
  font-family:PingFangSC-Medium,PingFang SC, Arial, Helvetica, sans-serif;
  height: 100%;
  padding: 2rem 2rem 2rem;
}

.team-desp-title {
  font-size: 26px;
}

.team-desp-content {
  font-size: 16px;
  word-break: break-all;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #B2B2B2;
}
.icon-title {
  font-size: 16px;
  margin-top: 8px;
  display: inline-block;
}

.avatar-shift {
  margin-bottom: 20px;
}

.team-icon {
  cursor: pointer;
  margin: 11px 20px 20px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width:148px;
  height:148px;
  object-fit: cover;
  background:rgba(241,241,241,1);
  border-radius:8px;
  &:hover {
    background-color: #E5E5E5;
  }
  .user-avatar > img {
    width: 128px;
    height: 128px;
  }
  &:hover .edit {
    display: flex;
  }
  .edit {
    border-radius: 10px;
    width: 128px;
    height: 128px;
    margin-top: 10px;
    margin-left: 10px;
    display: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    color: #eee;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    .el-icon-camera {
      font-size: 24px;
      margin-bottom: 4px;
      color: #eee;
    }
  }
}

.user-avatar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#new-logo {
  width: 42.96px;
  height: 40px;
}

#new-text {
  font-size: 16px;
  margin-top: 10px;
}

.ruleForm {
  display: flex;
}

.form-label {
  font-size: 16px;
}

.icon-avatar {
  width: 128px;
  height: 128px;
  color: #bbb;
}

.cet {
  margin-left: 3rem;
}
.secret-text {
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
  margin-top: 10px;
  display: inline-block;
}

.toShow {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px !important;
  color: #542DE0;
  font-size: 0.8rem;
}

.secret-btn {
  margin-top: 10px;
}

.d-fl {
  display: flex;
  margin-bottom: 20px;
}

@media screen and (max-width: 992px) {
  .ruleForm {
    display: block;
  }
}
</style>
