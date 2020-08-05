<template>
  <div class="oauth-box">
    <span class="login-title">授权登录</span><br>
    <div class="containers">
      <div v-if="userData" class="user-container">
        <img class="user-img" :src="userData.avatar" />
        <span class="user-name">{{ userData.nickname }}</span>
      </div>
      <div v-if="userData">
        <i class="el-icon-success allow" />
      </div>
      <div class="app-container">
        <img class="app-img" :src="app.img" />
        <span class="app-name">{{ app.name }}</span>
      </div>
    </div>
    <div class="oauth-desp">
      授权代表你同意 {{app.name}} 读取和使用<br>
      你的<strong>头像</strong>，<strong>电子邮件</strong>，以及<strong>用户名</strong>
    </div>
    <div style="width: 100%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="ruleForm">
        <el-form-item prop="fantoken">
          <span class="form-label">读取和修改你发行的 Fan 票内容</span>
          <el-switch v-model="ruleForm.fantoken"></el-switch>
        </el-form-item>
        <el-form-item prop="document">
          <span class="form-label">读取和修改你的文章</span>
          <el-switch v-model="ruleForm.document"></el-switch>
        </el-form-item>
        <el-form-item prop="profile">
          <span class="form-label">读取和修改你的个人资料</span>
          <el-switch v-model="ruleForm.profile"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">使用 Matataki.io 账号授权登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import env from '../../../env.json'

export default {
  props: {
    app: {
      type: Object,
      default: () => {}
    },
    userData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      ruleForm: {
        document: false,
        profile: false,
        fantoken: false
      },
      rules: {
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.userData) {
            this.$router.push(
              { name: 'Redirect',
                params: {
                  id: this.app.id,
                  callback: this.app.callback + '&token=' + this.app.token
                }
              })
          } else {
            window.location = env.MATATAKI + '/login/oauth/' + encodeURIComponent('app/' + this.app.id + '/callback')
          }
        } else {
          this.$message({
            message: '出现了问题，请重试',
            type: 'error',
            duration: 4000
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

.oauth-box {
  font-family: Arial, Helvetica, sans-serif;
  width:500px;
  height:600px;
  box-shadow:0px 10px 40px 0px rgba(0,0,0,0.1);
  border-radius:10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 800;
}

.user-container {
  margin-bottom: 1rem;
  border-radius: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.allow {
  font-size: 2.5rem;
  color: #67C23A;
  margin-bottom: 50%;
  padding-left: 1rem;
  padding-right: 1rem;
}

.app-container {
  margin-bottom: 1rem;
  border-radius: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.containers {
  display: flex;
  align-items: center;
}

.user-img {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  margin-top: 0.5rem;
  font-size: 1.2rem;
}

.app-img {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 100px;
  width: 100px;
  border-radius: 10px;
  object-fit: cover;
}

.app-name {
  margin-top: 0.5rem;
  font-size: 1.2rem;
}

.ruleForm {
  width: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;
  font-size: 1rem;
}

.oauth-desp {
  margin-bottom: 1rem;
  padding-left: 40px;
  padding-right: 40px;
  text-align: center;
}

.form-label {
  font-size: 1rem;
}

strong {
  color: #542DE0
}

@media screen and (max-width: 500px) {
  .form-label {
    font-size: 0.8rem;
  }
  .oauth-desp {
    font-size: 0.8rem;
  }

  .el-form-item__content {
    line-height: 0px !important;
  }
}
</style>
