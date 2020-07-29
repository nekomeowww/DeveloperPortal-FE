<template>
  <div class="application" style="position: absolute;top: 61px;left: 390px;margin-left: 2rem;margin-top: 2rem;width: 60%;">
    <div class="app-desp">
      <div class="app-desp-title">General Information</div>
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
              :src="getAvatar()"
              alt="avatar"
            >
            <img v-else id="new-logo" src="../assets/img/newapp.png" style="margin-top: -40px;" />
            <span v-if="showSecretRow" id="new-text">{{ appData.name }}</span>
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
            <span class="secret-text">{{ appData.clientId }}</span><br>
            <el-button type="primary" size="small" class="secret-btn" @click="copyToClipboard(appData.clientId)">Copy</el-button>
          </div>
          <div class="cet">
            <span class="form-label">Client Secret</span><br>
            <span class="secret-text toShow" id="secret" @click="reveal">点击以显示</span><br>
            <el-button type="primary" size="small" class="secret-btn" @click="copyToClipboard(appData.clientSecret)">Copy</el-button>
            <el-button type="primary" size="small" class="secret-btn">Regenerate</el-button>
          </div>
        </div>
        <el-form-item label=' ' prop="description">
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
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

import imgUpload from '@/components/imgUpload/imgUpload.vue'

export default {
  components: {
    imgUpload
  },
  props: {
    showSecretRow: {
      type: Boolean,
      default: false
    },
    appData: {
      type: Object,
      default: () => {}
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
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        callback: [
          { required: true, message: '', trigger: 'change' }
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
        description: [
          { required: true, message: '请输入简介', trigger: 'blur' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  mounted () {
    if (this.showSecretRow) {
      this.ruleForm = this.appData
    }
  },
  methods: {
    reveal () {
      let elem = document.getElementById('secret')
      this.defaultCss = elem.style.cssText
      if (elem.innerHTML === '点击以显示') {
        elem.innerHTML = this.appData.clientSecret
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
      if (this.showSecretRow) {
        this.avatar = this.appData.img
        return this.avatar
      } else {
        return false
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
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
          return document.execCommand('copy') // Security exception may be thrown by some browsers.
        } catch (ex) {
          console.warn('Copy to clipboard failed.', ex)
          return false
        } finally {
          document.body.removeChild(textarea)
        }
      }
    },
    handleRemove (file) {
      console.log(file)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
    },
    doneImageUpload () {
      this.imgUploadDone += Date.now()
      this.refreshApp({ id: this.$route.params.id })
    }
  }
}
</script>
<style lang="less" scoped>

.application {
  font-family:PingFangSC-Medium,PingFang SC, Arial, Helvetica, sans-serif;
  padding-right: 2rem;
}

.app-desp-title {
  font-size: 26px;
}

.app-desp-content {
  word-break: break-all;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #B2B2B2;
}
.icon-title {
  font-size: 16px;
}
.app-icon {
  cursor: pointer;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width:148px;
  height:180px;
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
  margin-top: 10px;
  display: inline-block;
}

.toShow {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #542DE0;
  font-size: 0.8rem;
}

.secret-btn {
  margin-top: 10px;
}
</style>
