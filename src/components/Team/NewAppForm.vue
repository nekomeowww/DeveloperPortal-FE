<template>
  <div class="application">
    <div class="app-desp">
      <div v-if="notNew" class="app-desp-title">{{ $t('comp.newApp.titleNotNew') }}</div>
      <div v-else class="app-desp-title">{{ $t('comp.newApp.title') }}</div>
      <div class="app-desp-content">{{ $t('comp.newApp.desc') }} {{ currentTeamAppId }}</div>
    </div>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ruleForm">
        <div>
          <span class="icon-title">{{ $t('comp.newApp.icon') }}</span>
          <img-upload
            :img-upload-done="imgUploadDone"
            :update-type="'teamapp'"
            class="app-icon"
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
              <img v-else id="new-logo" src="../../assets/img/newapp.png" style="height:40px;width: 42.96px;"/>
            </div>
          </img-upload>
        </div>
        <div>
          <el-form-item label=' ' prop="name">
            <span class="form-label">{{ $t('comp.newApp.form.name') }}</span>
            <el-input :placeholder="place.name" maxlength="20" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <div v-if="showSecretRow" class="d-fl">
            <div class="cid">
              <span class="form-label">Client ID</span><br>
              <span class="secret-text">{{ clientId }}</span><br>
              <el-button type="primary" size="small" class="secret-btn" @click="copyToClipboard(clientId)">{{ $t('common.copy') }}</el-button>
            </div>
            <div class="cet">
              <span class="form-label">Client Secret</span><br>
              <span class="secret-text toShow" id="secret" @click="reveal">{{ $t('comp.newApp.toShow') }}</span><br>
              <el-button type="primary" size="small" class="secret-btn" @click="copyToClipboard(clientSecret)">{{ $t('common.copy') }}</el-button>
              <el-button type="primary" size="small" class="secret-btn" @click="resetSecret">{{ $t('comp.newApp.reset') }}</el-button>
            </div>
          </div>
          <el-form-item label=' ' prop="desp">
            <span class="form-label">{{ $t('comp.newApp.form.desc') }}</span>
            <el-input :placeholder="place.desc" type="textarea" maxlength="1000" v-model="ruleForm.desp" :rows="6"></el-input>
          </el-form-item>
          <el-form-item label=' ' prop="callback">
            <span class="form-label">{{ $t('comp.newApp.form.callback') }}</span>
            <el-input :placeholder="place.callback" v-model="ruleForm.callback"></el-input>
          </el-form-item>
          <el-form-item prop="orglink">
            <span class="form-label">{{ $t('comp.newApp.form.site') }}</span>
            <el-input :placeholder="place.site" v-model="ruleForm.orglink"></el-input>
          </el-form-item>
          <el-form-item prop="orgname">
            <span class="form-label">{{ $t('comp.newApp.form.org') }}</span>
            <el-input :placeholder="place.org" v-model="ruleForm.orgname"></el-input>
          </el-form-item>
          <el-form-item prop="toslink">
            <span class="form-label">{{ $t('comp.newApp.form.tos') }}</span>
            <el-input :placeholder="place.tos" v-model="ruleForm.toslink"></el-input>
          </el-form-item>
          <el-form-item prop="pplink">
            <span class="form-label">{{ $t('comp.newApp.form.pri') }}</span>
            <el-input :placeholder="place.pri" v-model="ruleForm.pplink"></el-input>
          </el-form-item>
          <el-form-item prop="usage">
            <span class="form-label">{{ $t('comp.newApp.form.usage') }}</span>
            <el-input :placeholder="place.usage" v-model="ruleForm.usage"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="notNew" type="primary" @click="submitForm('ruleForm')">{{ $t('comp.newApp.save') }}</el-button>
            <el-button v-if="notNew" type="danger" @click="openDeletionConfirm">{{ $t('comp.newApp.delete') }}</el-button>
            <el-button v-else type="primary" @click="submitForm('ruleForm')">{{ $t('comp.newApp.create') }}</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>{{ $t('comp.newApp.dialog.content') }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">{{ $t('comp.newApp.dialog.cancel') }}</el-button>
          <el-button type="primary" @click="removeApp">{{ $t('comp.newApp.dialog.confirm') }}</el-button>
        </span>
      </el-dialog>
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
    showSecretRow: {
      type: Boolean,
      default: false
    },
    appData: {
      type: Object,
      default: () => {}
    },
    icon: {
      type: String,
      default: ''
    },
    clientId: {
      type: String,
      default: ''
    },
    clientSecret: {
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
          { required: true, message: this.$t('comp.newApp.rules.name'), trigger: 'change' }
        ],
        callback: [
          { required: true, message: this.$t('comp.newApp.rules.callback'), trigger: 'change' }
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
          { required: true, message: this.$t('comp.newApp.rules.desc'), trigger: 'change' }
        ]
      },
      centerDialogVisible: false,
      requestCount: 0,
      place: {
        name: this.$t('comp.newApp.place.name'),
        desc: this.$t('comp.newApp.place.desc'),
        callback: this.$t('comp.newApp.place.callback'),
        site: this.$t('comp.newApp.place.site'),
        org: this.$t('comp.newApp.place.org'),
        tos: this.$t('comp.newApp.place.tos'),
        pri: this.$t('comp.newApp.place.pri'),
        usage: this.$t('comp.newApp.place.usage')
      },
      dialogTitle: this.$t('comp.newApp.dialog.title'),
      toShow: false
    }
  },
  watch: {
    id (val) {
      this.id = val
    },
    appData (val) {
      this.ruleForm = val
    },
    currentTeamAppIcon (val) {
      this.avatar = env.DEVELOPERAPI + '/img' + val
    }
  },
  computed: {
    ...mapState(['currentTeamAppId', 'isLoggedIn', 'userId', 'currentTeamAppIcon'])
  },
  created () {
    if (!this.isLoggedIn) {
      this.$router.push({ name: 'Login' })
    }
  },
  methods: {
    reveal () {
      let elem = document.getElementById('secret')
      this.defaultCss = elem.style.cssText
      if (!this.toShow) {
        this.toShow = true
        elem.innerHTML = this.clientSecret
        let elClassName = ' ' + elem.className + ' '
        while (elClassName.indexOf(' toShow ') !== -1) {
          elClassName = elClassName.replace(' toShow ', '')
        }
        elem.className = elClassName
      } else {
        this.toShow = false
        elem.className += ' ' + 'toShow'
        elem.innerHTML = this.$t('comp.newApp.toShow')
      }
    },
    getAvatar () {
      if (this.notNew) {
        if (!this.currentTeamAppIcon) this.avatar = this.icon
        else this.avatar = env.DEVELOPERAPI + '/img' + this.currentTeamAppIcon
        return true
      } else if (this.avatar !== '') {
        return this.avatar
      } else {
        return false
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Axios.post(env.DEVELOPERAPI + '/team/newapp', { form: this.ruleForm, appId: this.currentTeamAppId, teamId: this.$route.params.id }).then(res => {
            if (res.data.code === 0 || res.data.code === 1) {
              this.$message({
                message: this.$t('elMessage.success.appCreate'),
                type: 'success',
                duration: 4000
              })

              this.$router.push({ path: '/team/' + this.$route.params.id })
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
    copyToClipboard (text) {
      if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData('Text', text)
      } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        var textarea = document.createElement('textarea')
        textarea.textContent = text
        textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea)
        textarea.select()
        try {
          this.$notify.success({
            title: this.$t('elNotify.success.copyT'),
            message: this.$t('elNotify.success.copyM')
          })
          return document.execCommand('copy') // Security exception may be thrown by some browsers.
        } catch (ex) {
          this.$notify.error({
            title: this.$t('elNotify.error.copyT'),
            message: this.$t('elNotify.error.copyM')
          })
          return false
        } finally {
          document.body.removeChild(textarea)
        }
      }
    },
    doneImageUpload () {
      this.imgUploadDone += Date.now()
      this.$message({
        message: this.$t('elMessage.success.imageUpload'),
        type: 'success',
        duration: 4000
      })
      this.avatar = env.DEVELOPERAPI + '/img' + this.currentTeamAppIcon
    },
    openDeletionConfirm () {
      this.centerDialogVisible = true
    },
    removeApp () {
      Axios.get(env.DEVELOPERAPI + '/team/removeapp?appId=' + this.id + '&teamId=' + this.$route.params.id).then(res => {
        if (res.data.code === 0) {
          this.centerDialogVisible = false
          this.$message({
            message: this.$t('elMessage.success.appDelete'),
            type: 'success',
            duration: 4000
          })
          this.$router.push({ path: '/team/' + this.$route.params.id })
        } else if (res.data.code === 1) {
          this.centerDialogVisible = false
          this.$message({
            message: this.$t('elMessage.error.app'),
            type: 'warning',
            duration: 4000
          })
          this.$router.push({ path: '/team/' + this.$route.params.id })
        } else {
          this.centerDialogVisible = false
          this.$message({
            message: this.$t('elMessage.error.app'),
            type: 'success',
            duration: 4000
          })
          this.$router.push({ path: '/team/' + this.$route.params.id })
        }
      })
    },
    resetSecret () {
      Axios.get(env.DEVELOPERAPI + '/team/resetsecret?appId=' + this.currentTeamAppId + '&clientId=' + this.clientId).then(res => {
        this.clientSecret = res.data.clientSecret
        let elem = document.getElementById('secret')
        if (this.toShow) {
          elem.innerHTML = res.data.clientSecret
        }
      })
    }
  },
  mounted () {
    if (this.showSecretRow) {
      if (this.icon !== '') this.avatar = this.icon
      if (this.appData) this.ruleForm = this.appData
    }
  }
}
</script>
<style lang="less" scoped>

.application {
  font-family:PingFangSC-Medium,PingFang SC, Arial, Helvetica, sans-serif;
  height: 120%;
  padding: 2rem 2rem 40px;
}

.app-desp-title {
  font-size: 26px;
}

.app-desp-content {
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

.app-icon {
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

/deep/ .el-dialog {
  border-radius: 20px;
}
</style>
