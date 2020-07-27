<template>
  <div class="application" style="position: absolute;top: 61px;left: 390px;margin-left: 2rem;margin-top: 2rem;width: 60%;">
    <div class="app-desp">
      <div class="app-desp-title">General Information</div>
      <div class="app-desp-content">填写基本的 App 信息</div>
    </div>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <span class="icon-title">App 图标</span>
        <div class="app-icon">
          <img id="new-logo" src="../assets/img/newapp.png" />
          <span id="new-text">上传图标</span>
        </div>
        <div style="position: absolute;left: 6rem;">
        <el-form-item label=' ' prop="name">
          <span class="form-label">名称 Name</span>
          <el-input placeholder="请输入名称..." v-model="ruleForm.name"></el-input>
        </el-form-item>
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
export default {
  data () {
    return {
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
          { required: true, message: '请输入回调链接', trigger: 'change' }
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
  methods: {
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
    handleRemove (file) {
      console.log(file)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
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
  margin-top: 1rem;
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
}

.ruleForm {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 16px;
}
</style>
