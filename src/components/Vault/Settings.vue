<template>
  <div class="vault">
    <div class="vault-desp">
      <div class="vault-desp-title">
        <span>保险箱 Vault</span>
        <div class="vault-mid"></div>
        <el-button type="primary" @click="newVault">创建键值对</el-button>
      </div>
      <div class="vault-desp-content">
        在这里你可以创建和使用一些简单的键值对，只有提供了 Client ID 和 Client Secret 两者和用户 Token（可选）的时候才会被允许获取。<br>
        这些键值对是相当于密码一样的存储，你只可以存储字符串，留存在服务器端作为 API 附属的「密钥」进行使用，<br>
        我们不会检查你存储了什么，你的隐私都是能够被确保的，只有提供了 Client ID 和 Client Secret 才可以获取。
      </div>
      <div class="vault-key-value">
        <div v-for="(value, index) in vaultData" :key=index>
          <div v-if="index === 0" class="vault-container" style="padding-top: 12px">
            <div class="vault-name"><i class="el-icon-lock"></i> {{ value.key }}</div>
            <div class="vault-mid"></div>
            <el-button type="primary" plain @click="updateVault">更新</el-button>
            <el-button type="danger" icon="el-icon-delete" plain @click="removeVault"></el-button>
          </div>
          <div v-if="index !== 0" class="vault-container">
            <div class="vault-name"><i class="el-icon-lock"></i> {{ value.key }}</div>
            <div class="vault-mid"></div>
            <el-button type="primary" plain @click="updateVault">更新</el-button>
            <el-button type="danger" icon="el-icon-delete" plain @click="removeVault"></el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    appId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      vaultData: [
        {
          key: 'Vault',
          secret: 'vault'
        },
        {
          key: 'Secret',
          secret: 'value'
        }
      ]
    }
  },
  computed: {
    ...mapState(['currentAppId'])
  },
  methods: {
    newVault () {
      this.$router.push({ path: '/app/' + this.currentAppId + '/newvault' })
    },
    updateVault () {
    },
    removeVault () {
    }
  }
}
</script>

<style lang="less" scoped>
.vault {
  font-family:PingFangSC-Medium,PingFang SC, Arial, Helvetica, sans-serif;
  height: 120%;
  padding: 2rem 2rem 40px;
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
