<template>
  <div class="vault">
    <div class="vault-desp">
      <div class="vault-desp-title">
        <span>{{ $t('comp.vault.setting.title') }}</span>
        <div class="vault-mid"></div>
        <el-button type="primary" @click="newVault">{{ $t('comp.vault.setting.new') }}</el-button>
      </div>
      <div class="vault-desp-content">
        {{ $t('comp.vault.setting.desc[0]') }}<br>
        {{ $t('comp.vault.setting.desc[1]') }}<br>
        {{ $t('comp.vault.setting.desc[2]') }}
      </div>
      <div class="vault-key-value">
        <div v-for="(value, index) in vaultData" :key=index>
          <div v-if="index === 0" class="vault-container" style="padding-top: 12px">
            <div class="vault-name"><i class="el-icon-lock"></i> {{ value.key }}</div>
            <div class="vault-mid"></div>
            <el-button type="primary" plain @click="updateVault(value)">{{ $t('comp.vault.setting.update') }}</el-button>
            <el-button type="danger" icon="el-icon-delete" plain @click="removeVault(value)"></el-button>
          </div>
          <div v-if="index !== 0" class="vault-container">
            <div class="vault-name"><i class="el-icon-lock"></i> {{ value.key }}</div>
            <div class="vault-mid"></div>
            <el-button type="primary" plain @click="updateVault(value)">{{ $t('comp.vault.setting.update') }}</el-button>
            <el-button type="danger" icon="el-icon-delete" plain @click="removeVault(value)"></el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Axios from 'axios'

import { getCookie, disassemble } from '../../util/cookie'
import env from '../../../env.json'

export default {
  props: {
    appId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      vaultData: [],
      userId: 0
    }
  },
  computed: {
    ...mapState(['currentAppId'])
  },
  methods: {
    ...mapActions(['setLoggedIn', 'setCurrentAppId']),
    newVault () {
      this.$router.push({ path: '/app/' + this.currentAppId + '/newvault' })
    },
    updateVault (value) {
      this.$router.push({ path: '/app/' + this.currentAppId + '/updatevault/' + value.vaultId })
    },
    removeVault (value) {
      Axios.get(env.DEVELOPERAPI + '/app/removevault?id=' + value.vaultId + '&appId=' + this.currentAppId + '&userId=' + this.userId).then(res => {
        if (res.data.code === 0) {
          this.$message({
            message: this.$t('elMessage.success.delete'),
            type: 'success',
            duration: 4000
          })
          location.reload()
        }
      })
    }
  },
  mounted () {
    const c = getCookie('ACCESS-TOKEN')
    if (c) {
      const res = disassemble(c)
      res.status = true
      this.setLoggedIn(res)
      this.userId = parseInt(res.id)
    }
    if (this.userId === 0) {
      this.$message({
        message: this.$t('elMessage.error.app'),
        type: 'error',
        duration: 4000
      })
      this.$router.push({ name: 'Home' })
    } else {
      Axios.get(env.DEVELOPERAPI + '/app/vaultlist?userId=' + this.userId).then(() => {
        Axios.get(env.DEVELOPERAPI + '/app/vaultlist?userId=' + this.userId).then(res => {
          const vaults = res.data.vaults
          if (vaults.length !== 0) {
            vaults.forEach(id => {
              Axios.get(env.DEVELOPERAPI + '/app/vault?appId=' + this.currentAppId + '&id=' + id + '&userId=' + this.userId).then(res2 => {
                if (res2.data) {
                  this.vaultData.push({
                    key: res2.data.name,
                    vaultId: id
                  })
                }
              })
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.vault {
  font-family:PingFangSC-Medium,PingFang SC, Arial, Helvetica, sans-serif;
  height: 120%;
  padding: 2rem 2rem 40px;
  margin-right: 2rem;
}

.vault-desp-title {
  display: flex;
  align-items: center;
  font-size: 26px;
}

.vault-mid {
  flex: 1;
}

.vault-desp-content {
  font-size: 16px;
  word-break: break-all;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #B2B2B2;
}

.vault-key-value {
  border: 2px solid #EBEBEB;
  border-radius: 12px;
}

.vault-container {
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 12px;
}

.vault-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #22863A;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  word-break: break-all;
  margin-right: 5px;
}

/deep/ .el-icon-lock {
  font-weight: 800;
}
</style>
