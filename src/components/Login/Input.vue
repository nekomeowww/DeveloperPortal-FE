<template>
  <div class="input">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="ruleForm" @keyup.enter="submitForm('ruleForm')">
      <el-form-item prop="email">
        <el-input type="email" placeholder="请输入电子邮箱..." v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input type="password" placeholder="请输入密码..." v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%;">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    let validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电子邮箱地址'))
      } else {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
          callback(new Error('电子邮箱格式不正确'))
        }
        callback()
      }
    }
    return {
      ruleForm: {
        email: '',
        pass: ''
      },
      rules: {
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login(this.ruleForm).then(res => {
            if (res) {
              console.log('success')
              this.$message({
                message: '登录成功，现在为你跳转到管理页面...',
                type: 'success',
                duration: 4000
              })
              this.$router.push({ name: 'Home' })
            } else {
              console.log('failed')
              this.$message({
                message: '电子邮件或密码错误',
                type: 'error',
                duration: 4000
              })
            }
          })
        } else {
          this.$message({
            message: '出现了错误，请重试。'
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.input {
  width: 60%;
}
</style>
