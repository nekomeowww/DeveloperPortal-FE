<template>
  <div>
    <div class="application">
      <div class="app-desp">
        <div class="app-desp-title">{{ $t('comp.oaset.title') }}</div>
        <div class="app-desp-content">{{ $t('comp.oaset.desc') }}</div>
      </div>
      <div style="display: flex;">
        <el-input :placeholder="link" class="link" :disabled="true"></el-input>
        <el-button @click="copyToClipboard(link)" type="primary">{{ $t('common.copy') }}</el-button>
      </div>
      <br>
      <el-checkbox :label="testnet" v-model="testEnabled"></el-checkbox>
      <br>
      <br>
      <div class="app-desp">
        <div class="app-desp-title">{{ $t('comp.oaset.opc.title') }}</div>
        <div class="app-desp-content">{{ $t('comp.oaset.opc.desc') }}</div>
      </div>
      <br>
      <div class="check-list">
        <div class="check-group">
          <div class="check-title">{{ $t('comp.oaset.opc.forPost') }}</div>
          <el-checkbox-group v-model="checkList">
            <el-checkbox :label="perm.read" value="读取权限"></el-checkbox>
            <el-checkbox :label="perm.edit" value="编辑权限"></el-checkbox>
            <el-checkbox :label="perm.post" value="发布权限"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="check-group">
          <div class="check-title">{{ $t('comp.oaset.opc.forFan') }}</div>
          <el-checkbox-group v-model="checkList2">
            <el-checkbox :label="perm.read" value="读取权限"></el-checkbox>
            <el-checkbox :label="perm.edit" value="编辑权限"></el-checkbox>
            <el-checkbox :label="perm.creator" value="修改协作者权限"></el-checkbox>
            <el-checkbox :label="perm.number" value="修改增发数量"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <div class="check-title">{{ $t('comp.oaset.opc.forProfile') }}</div>
          <el-checkbox-group v-model="checkList3">
            <el-checkbox :label="perm.read" value="读取权限"></el-checkbox>
            <el-checkbox :label="perm.edit" value="编辑权限"></el-checkbox>
            <el-checkbox :label="perm.delete" value="删改权限"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <el-button class="save" type="primary" @click="submitForm">{{ $t('common.save') }}</el-button>
    </div>
  </div>
</template>

<script>
import env from '../../env.json'
import Axios from 'axios'

export default {
  props: {
    userId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      checkList: [],
      checkList2: [],
      checkList3: [],
      testEnabled: false,
      link: window.location.origin + '/app/' + this.$route.params.id + '/oauth',
      testnet: this.$t('comp.oaset.testnet'),
      perm: {
        read: this.$t('comp.oaset.opc.read'),
        edit: this.$t('comp.oaset.opc.edit'),
        post: this.$t('comp.oaset.opc.post'),
        delete: this.$t('comp.oaset.opc.delete'),
        creator: this.$t('comp.oaset.opc.creator'),
        number: this.$t('comp.oaset.opc.number')
      }
    }
  },
  watch: {
    testEnabled (val) {
      if (val) {
        this.link = this.link + '?network=test'
      } else {
        this.link = this.link.replace('?network=test', '')
      }
    }
  },
  methods: {
    submitForm () {
      const postPermission = this.checkList
      const tokenPermission = this.checkList2
      const profilePermission = this.checkList3
      Axios.post(env.DEVELOPERAPI + '/app/permission', { appId: this.$route.params.id, userId: this.userId, permission: { post: postPermission, token: tokenPermission, profile: profilePermission } })
      this.$message({
        message: this.$t('elMessage.success.save'),
        type: 'success',
        duration: 4000
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
            title: this.$t('elNotify.success.cpoyT'),
            message: this.$t('elNotify.success.cpoyM')
          })
          return document.execCommand('copy') // Security exception may be thrown by some browsers.
        } catch (ex) {
          this.$notify.error({
            title: this.$t('elNotify.error.cpoyT'),
            message: this.$t('elNotify.error.cpoyM')
          })
          return false
        } finally {
          document.body.removeChild(textarea)
        }
      }
    }
  },
  mounted () {
    Axios.get(env.DEVELOPERAPI + '/app/permission?appId=' + this.$route.params.id).then(res => {
      console.log('APP::Permission:', res)
      if (res.data.permission === undefined) {
        return
      }
      const permission = res.data.permission
      this.checkList = permission.post
      this.checkList2 = permission.token
      this.checkList3 = permission.profile
    })
  }
}
</script>

<style lang="less" scoped>
.application {
  font-family:PingFangSC-Medium,PingFang SC, Arial, Helvetica, sans-serif;
  height: 120%;
  padding: 2rem 2rem 40px;
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

.check-list {
  padding: 1rem 1rem;
  background:rgba(241,241,241,1);
  border-radius:4px;
  border:1px solid rgba(219,219,219,1);
}

.check-group {
  margin-bottom: 1rem;
}

.check-title {
  margin-bottom: 1rem;
}

.save {
  margin-top: 2rem;
}

.link {
  width: 50%;
  margin-right: 1rem;
}
</style>

<style lang="less">
.slot-div {
  height: auto !important;
}
</style>
