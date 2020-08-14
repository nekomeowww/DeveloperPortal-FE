<template>
  <div class="newvault">
    <div class="newvault-desp">
      <div class="newvault-desp-title">创建一个新的 Vault</div>
      <div class="newvault-desp-content">在下面输入你的键值名称和键值内容</div>
    </div>
    <el-form label-position="top" :rules="rules" :model="form" ref="form">
      <el-form-item>
        <div class="item-label">名称 <span>最长 20 个字符</span></div>
        <el-input v-model="form.name" prop="name" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="item-label">内容 <span>最长 2000 个字符</span></div>
        <el-input v-model="form.value" type="textarea" :rows="20" maxlength="2000" prop="value"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Axios from 'axios'

import env from '../../../env.json'

export default {
  data () {
    return {
      form: {
        name: '',
        value: ''
      },
      rules: {
        name: [
          { required: true, message: '', trigger: 'blur' },
          { min: 1, max: 20, message: '长度最长 20 个字符哦', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '', trigger: 'blur' },
          { min: 1, max: 2000, message: '长度最长 2000 个字符哦', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['currentAppId', 'userId'])
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.name === '') {
            this.$notify.error({
              title: '名称不可以为空哦',
              message: '请填写一个合适的名称'
            })
          } else if (this.form.value === '') {
            this.$notify.error({
              title: '内容不可以为空哦',
              message: '请填写你需要创建的内容'
            })
          } else {
            Axios.post(env.DEVELOPERAPI + '/app/addvault', { appId: this.currentAppId, userId: this.userId, form: this.form })
            this.$message({
              message: '创建成功... 现在返回 Vault 页面',
              type: 'success',
              duration: 4000
            })
            this.$router.push({ path: '/app/' + this.currentAppId + '/vault' })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.newvault {
  font-family:PingFangSC-Medium,PingFang SC, Arial, Helvetica, sans-serif;
  height: 120%;
  padding: 2rem 2rem 40px;
}

.newvault-desp-title {
  display: flex;
  align-items: center;
  font-size: 26px;
}

.newvault-desp-content {
  font-size: 16px;
  word-break: break-all;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #B2B2B2;
}

.item-label {
  font-size: 1rem;
  span {
    color: #909399;
  }
}
</style>
