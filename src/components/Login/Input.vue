<template>
  <div class="input" @keyup.enter="submitForm('ruleForm')">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="ruleForm">
      <el-form-item prop="email">
        <el-input type="email" :placeholder="placeholder.email" v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input type="password" :placeholder="placeholder.password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%;">{{ $t('comp.input.login') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import i18n from '../../locale'

export default {
  data () {
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        const message = i18n.t('elMessage.error.noEmail')
        callback(new Error(message))
      } else {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
          const message = i18n.t('elMessage.error.wrongEmail')
          callback(new Error(message))
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
          { required: true, message: this.$t('elMessage.error.noPassword'), trigger: 'blur' }
        ]
      },
      placeholder: {
        email: this.$t('comp.input.email'),
        password: this.$t('comp.input.pass')
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
              this.$message({
                message: i18n.t('elMessage.success.login'),
                type: 'success',
                duration: 4000
              })
              setTimeout(() => {
                this.$router.push({ name: 'Home' })
              }, 3000)
            } else {
              this.$message({
                message: i18n.t('elMessage.error.loginFail'),
                type: 'error',
                duration: 4000
              })
            }
          })
        } else {
          this.$message({
            message: i18n.t('elMessage.error.unknow'),
            type: 'error',
            duration: 4000
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
