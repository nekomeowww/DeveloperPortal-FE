<template>
  <div class="application">
    <div class="app-desp">
      <div v-if="notNew" class="app-desp-title">General Information</div>
      <div v-else class="app-desp-title">Creating New App</div>
      <div class="app-desp-content">填写基本的 App 信息</div>
    </div>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <span class="icon-title">App 图标</span>
        <img-upload
          :img-upload-done="imgUploadDone"
          :update-type="'avatar'"
          class="app-icon"
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
            <img v-else id="new-logo" src="../assets/img/newapp.png" style="height:40px;width: 42.96px;"/>
          </div>
        </img-upload>
        <div style="position: absolute;margin-left: 6rem;">
          <el-form-item label=' ' prop="name">
            <span class="form-label">名称 Name</span>
            <el-input placeholder="请输入名称..." v-model="ruleForm.name"></el-input>
          </el-form-item>
          <div v-if="showSecretRow" class="el-form-item" style="margin-left: 100px;display: flex;">
            <div class="cid">
              <span class="form-label">Client ID</span><br>
              <span class="secret-text">{{ clientId }}</span><br>
              <el-button type="primary" size="small" class="secret-btn" @click="copyToClipboard(clientId)">复制</el-button>
            </div>
            <div class="cet">
              <span class="form-label">Client Secret</span><br>
              <span class="secret-text toShow" id="secret" @click="reveal">点击以显示</span><br>
              <el-button type="primary" size="small" class="secret-btn" @click="copyToClipboard(clientSecret)">复制</el-button>
              <el-button type="primary" size="small" class="secret-btn">重新生成</el-button>
            </div>
          </div>
          <el-form-item label=' ' prop="desp">
            <span class="form-label">简介 Description</span>
            <el-input placeholder="请输入简介... " type="textarea" v-model="ruleForm.desp" :rows="6"></el-input>
          </el-form-item>
          <el-form-item label=' ' prop="callback">
            <span class="form-label">回调链接 Callback URL</span>
            <el-input placeholder="请输入回调链接... " v-model="ruleForm.callback"></el-input>
          </el-form-item>
          <el-form-item prop="orglink">
            <span class="form-label">个人或组织网站 Website Link</span>
            <el-input placeholder="请输入您的个人或组织网站... " v-model="ruleForm.orglink"></el-input>
          </el-form-item>
          <el-form-item prop="orgname">
            <span class="form-label">组织或公司名称 Organization or Corporation Name</span>
            <el-input placeholder="请输入您的组织或者是公司名称... " v-model="ruleForm.orgname"></el-input>
          </el-form-item>
          <el-form-item prop="toslink">
            <span class="form-label">用户协议链接 Term of Service URL</span>
            <el-input placeholder="请输入用户协议链接（方便展示）... " v-model="ruleForm.toslink"></el-input>
          </el-form-item>
          <el-form-item prop="pplink">
            <span class="form-label">隐私协定 Privacy Policy URL</span>
            <el-input placeholder="请输入隐私协定（方便展示）... " v-model="ruleForm.pplink"></el-input>
          </el-form-item>
          <el-form-item prop="usage">
            <span class="form-label">App 使用目的 App Usage</span>
            <el-input placeholder="您用这个 App 做什么呢？... " v-model="ruleForm.usage"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="notNew" type="primary" @click="submitForm('ruleForm')">保存更改</el-button>
            <el-button v-else type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

import imgUpload from '@/components/imgUpload/imgUpload.vue'
import { mapActions, mapState } from 'vuex'
import Axios from 'axios'

import env from '../../env.json'

export default {
  components: {
    imgUpload
  },
  props: {
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
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  computed: {
    ...mapState(['currentAppId', 'isLoggedIn', 'userId', 'currentAppIcon'])
  },
  created () {
    if (!this.isLoggedIn) {
      this.$router.push({ name: 'Login' })
    }
    if (this.appData) this.ruleForm = this.appData
  },
  methods: {
    ...mapActions(['setCurrentAppId']),
    reveal () {
      let elem = document.getElementById('secret')
      this.defaultCss = elem.style.cssText
      if (elem.innerHTML === '点击以显示') {
        elem.innerHTML = this.clientSecret
        let elClassName = ' ' + elem.className + ' '
        while (elClassName.indexOf(' toShow ') !== -1) {
          elClassName = elClassName.replace(' toShow ', '')
        }
        elem.className = elClassName
      } else {
        elem.className += ' ' + 'toShow'
        elem.innerHTML = '点击以显示'
      }
    },
    getAvatar () {
      if (this.userId && this.currentAppId) {
        Axios(env.DEVELOPERAPI + '/app/appIcon?appId=' + this.currentAppId + '&userId=' + this.userId).then(res => {
          this.avatar = env.DEVELOPERAPI + '/app/appIcon?appId=' + this.currentAppId + '&userId=' + this.userId
        })
      }

      if (this.showSecretRow) {
        this.avatar = this.icon
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
          Axios.post(env.DEVELOPERAPI + '/app/new', { form: this.ruleForm, appId: this.currentAppId, userId: this.userId }).then(res => {
            if (res.data.code === 0 || res.data.code === 1) {
              this.$message({
                message: '创建成功... 现在返回 App 列表',
                type: 'success',
                duration: 4000
              })

              this.$router.push({ name: 'Home' })
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
            title: '复制成功',
            message: '内容已经成功复制到剪贴板'
          })
          return document.execCommand('copy') // Security exception may be thrown by some browsers.
        } catch (ex) {
          this.$notify.error({
            title: '复制失败',
            message: '请手动复制内容'
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
        message: '图片上传成功',
        type: 'success',
        duration: 4000
      })
      this.avatar = env.DEVELOPERAPI + '/img' + this.currentAppIcon
    }
  },
  mounted () {
    if (this.showSecretRow) {
      if (this.icon !== '') this.avatar = this.icon
    }
  }
}
</script>
<style lang="less" scoped>

.application {
  font-family:PingFangSC-Medium,PingFang SC, Arial, Helvetica, sans-serif;
  padding: 2rem 2rem 0;
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
}

.avatar-shift {
  margin-bottom: 20px;
}

.app-icon {
  cursor: pointer;
  margin-top: 1rem;
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
  flex-direction: column;
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
</style>
