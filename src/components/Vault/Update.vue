<template>
  <div class="newvault">
    <div class="newvault-desp">
      <div class="newvault-desp-title"></div>
      <div class="newvault-desp-content"></div>
    </div>
    <el-form label-position="top" :rules="rules" :model="form" ref="form">
      <el-form-item>
        <i18n path="comp.vault.new.key" tag="div" class="item-label">
          <span place="max">{{ $t('comp.vault.new.keyMax') }}</span>
        </i18n>
        <el-input v-model="form.name" prop="name" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item>
        <i18n path="comp.vault.new.value" tag="div" class="item-label">
          <span place="max">{{ $t('comp.vault.new.valueMax') }}</span>
        </i18n>
        <el-input v-model="form.value" type="textarea" :rows="20" maxlength="2000" prop="value"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">{{ $t('comp.vault.update.update') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Axios from 'axios'

import env from '../../../env.json'

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    vaultId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      form: {
        name: '',
        value: ''
      },
      rules: {
        name: [
          { required: true, message: this.$t('elNotify.error.vaultKeyReq'), trigger: 'blur' },
          { min: 1, max: 20, message: this.$t('elNotify.error.vaultKeyMax'), trigger: 'blur' }
        ],
        value: [
          { required: true, message: this.$t('elNotify.error.vaultValReq'), trigger: 'blur' },
          { min: 1, max: 2000, message: this.$t('elNotify.error.vaultValMax'), trigger: 'blur' }
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
              title: this.$t('elNotify.error.vaultKeyReq'),
              message: this.$t('elNotify.error.vaultKeyReqMsg')
            })
          } else if (this.form.value === '') {
            this.$notify.error({
              title: this.$t('elNotify.error.vaultValReq'),
              message: this.$t('elNotify.error.vaultValReqMsg')
            })
          } else {
            Axios.post(env.DEVELOPERAPI + '/app/updatevault', { appId: this.currentAppId, vaultId: this.vaultId, userId: this.userId, form: this.form })
            this.$message({
              message: this.$t('elMessage.success.vaultUpdate'),
              type: 'success',
              duration: 4000
            })
            this.$router.push({ path: '/app/' + this.currentAppId + '/vault' })
          }
        } else {
          this.$message({
            message: this.$t('elMessage.error.vaultInput'),
            type: 'error',
            duration: 4000
          })
          return false
        }
      })
    }
  },
  created () {
    Axios.get(env.DEVELOPERAPI + '/app/vault?appId=' + this.id + '&id=' + this.vaultId + '&userId=' + this.userId).then(res => {
      this.form.name = res.data.name
    })
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
