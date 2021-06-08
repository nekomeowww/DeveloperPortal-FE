<template>
  <div class="team">
    <div class="team-desp">
      <div v-if="notNew" class="team-desp-title">{{ $t('comp.newTeam.titleNotNew') }}</div>
      <div v-else class="team-desp-title">{{ $t('comp.newTeam.title') }}</div>
      <div class="team-desp-content">{{ $t('comp.newTeam.desc') }}</div>
    </div>
    <div v-if="isOwner">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ruleForm">
        <div>
          <span class="icon-title">{{ $t('comp.newTeam.icon') }}</span>
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
                {{ $t('common.icon') }}
              </div>
              <img
                id="avatar"
                v-if="getAvatar()"
                slot="description"
                :src="avatar"
                alt="avatar"
              >
              <img v-else id="new-logo" src="../../assets/img/team-img.png" style="height:40px;width: 42.96px;"/>
            </div>
          </img-upload>
        </div>
        <div>
          <el-form-item label=' ' prop="name">
            <span class="form-label">{{ $t('comp.newTeam.form.name') }}</span>
            <el-input :placeholder="place.name" maxlength="20" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label=' ' prop="desp">
            <span class="form-label">{{ $t('comp.newTeam.form.desc') }}</span>
            <el-input :placeholder="place.desc" type="textarea" maxlength="1000" v-model="ruleForm.desp" :rows="6"></el-input>
          </el-form-item>
          <el-form-item prop="orglink">
            <span class="form-label">{{ $t('comp.newTeam.form.site') }}</span>
            <el-input :placeholder="place.site" v-model="ruleForm.orglink"></el-input>
          </el-form-item>
          <el-form-item prop="orgname">
            <span class="form-label">{{ $t('comp.newTeam.form.org') }}</span>
            <el-input :placeholder="place.org" v-model="ruleForm.orgname"></el-input>
          </el-form-item>
          <el-form-item prop="usage">
            <span class="form-label">{{ $t('comp.newTeam.form.usage') }}</span>
            <el-input :placeholder="place.usage" v-model="ruleForm.usage"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="notNew" type="primary" @click="submitForm('ruleForm')">{{ $t('comp.newTeam.save') }}</el-button>
            <el-button v-if="notNew && isOwner" type="danger" @click="openDeletionConfirm">{{ $t('comp.newTeam.delete') }}</el-button>
            <el-button v-if="!notNew" type="primary" @click="submitForm('ruleForm')">{{ $t('comp.newTeam.create') }}</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>{{ $t('comp.newTeam.dialog.content') }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">{{ $t('comp.newTeam.dialog.cancel') }}</el-button>
          <el-button type="primary" @click="removeTeam">{{ $t('comp.newTeam.dialog.confirm') }}</el-button>
        </span>
      </el-dialog>
    </div>
    <div v-if="!isOwner" class="info-container">
      <div class="avatar-container">
        <span class="info-label">{{ $t('comp.newTeam.icon') }}</span>
        <img id="avatar" v-if="getAvatar()" slot="description" :src="avatar" alt="avatar">
      </div>
      <div class="detail">
        <div class="detail-container">
          <span class="info-label">{{ $t('comp.newTeam.form.name') }}</span>
          <span class="info-detail">{{ ruleForm.name }}</span>
        </div>
        <div class="detail-container">
          <span class="info-label">{{ $t('comp.newTeam.form.desc') }}</span>
          <span class="info-detail">{{ ruleForm.desp }}</span>
        </div>
        <div class="detail-container">
          <span class="info-label">{{ $t('comp.newTeam.form.site') }}</span>
          <span class="info-detail">{{ ruleForm.orglink }}</span>
        </div>
        <div class="detail-container">
          <span class="info-label">{{ $t('comp.newTeam.form.org') }}</span>
          <span class="info-detail">{{ ruleForm.orgname }}</span>
        </div>
        <div class="detail-container">
          <span class="info-label">{{ $t('comp.newTeam.form.usage') }}</span>
          <span class="info-detail">{{ ruleForm.usage }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import imgUpload from '@/components/imgUpload/imgUpload.vue'
import { mapState } from 'vuex'
import Axios from 'axios'

import env from '../../../env.json'

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
    },
    admins: {
      type: Array,
      default: () => []
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
          { required: true, message: this.$t('comp.newTeam.rules.name'), trigger: 'change' }
        ],
        callback: [
          { required: true, message: this.$t('comp.newTeam.rules.callback'), trigger: 'change' }
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
          { required: true, message: this.$t('comp.newTeam.rules.desc'), trigger: 'change' }
        ]
      },
      centerDialogVisible: false,
      requestCount: 0,
      isOwner: false,
      place: {
        name: this.$t('comp.newTeam.place.name'),
        desc: this.$t('comp.newTeam.place.desc'),
        site: this.$t('comp.newTeam.place.site'),
        org: this.$t('comp.newTeam.place.org'),
        usage: this.$t('comp.newTeam.place.usage')
      },
      dialogTitle: this.$t('comp.newTeam.dialog.title')
    }
  },
  watch: {
    id (val) {
      this.id = val
    },
    teamData (val) {
      this.ruleForm = val
    },
    admins (val) {
      this.admins = val

      if (val.indexOf(parseInt(this.userId)) !== -1) {
        this.isOwner = true
      }
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
                message: this.$t('elMessage.success.teamCreate'),
                type: 'success',
                duration: 4000
              })

              this.$router.push({ name: 'Teams' })
            } else {
              this.$message({
                message: this.$t('elMessage.error.unknow'),
                type: 'error',
                duration: 4000
              })
            }
          })
        } else {
          this.$message({
            message: this.$t('elMessage.error.unknow'),
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
        message: this.$t('elMessage.success.imageUpload'),
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
            message: this.$t('elMessage.success.teamDelete'),
            type: 'success',
            duration: 4000
          })
          this.$router.push({ name: 'Teams' })
        } else if (res.data.code === 1) {
          this.centerDialogVisible = false
          this.$message({
            message: this.$t('elMessage.error.team'),
            type: 'warning',
            duration: 4000
          })
          this.$router.push({ name: 'Teams' })
        } else {
          this.centerDialogVisible = false
          this.$message({
            message: this.$t('elMessage.error.team'),
            type: 'success',
            duration: 4000
          })
          this.$router.push({ name: 'Teams' })
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
.avatar-container {
  display: flex;
  flex-direction: column;
}
#avatar {
  width: 128px;
  height: 128px;
  border-radius: 10px;
  color: #bbb;
}

.info-container {
  display: flex;
  flex-direction: row;
}

.detail-container {
  margin-left: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
}
.info-label {
  color: #B2B2B2;
  margin-bottom: 0.5rem;
}
</style>
