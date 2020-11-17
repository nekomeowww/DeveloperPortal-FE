<template>
  <div>
    <div class="application">
      <div class="app-desp">
        <div class="app-desp-title">Oauth App</div>
        <div class="app-desp-content">请将你的网站链接到下面的地址来使用 Oauth 登录</div>
      </div>
      <div style="display: flex;">
       <el-input :placeholder="link" class="link" :disabled="true"></el-input>
       <el-button @click="copyToClipboard(link)" type="primary">复制</el-button>
      </div>
      <br>
      <el-checkbox label="测试网 Test Network" v-model="testEnabled"></el-checkbox>
      <br>
      <br>
      <div class="app-desp">
        <div class="app-desp-title">Oauth Permission Control</div>
        <div class="app-desp-content">在这里，你可以控制你的 App 请求什么样的权限，或者是强制要求一些数据获取的权限。</div>
      </div>
      <br>
      <div class="check-list">
        <div class="check-group">
          <div class="check-title">对文章的权限</div>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="读取权限"></el-checkbox>
            <el-checkbox label="编辑权限"></el-checkbox>
            <el-checkbox label="发布权限"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="check-group">
          <div class="check-title">对 Fan 票的权限</div>
          <el-checkbox-group v-model="checkList2">
            <el-checkbox label="读取权限"></el-checkbox>
            <el-checkbox label="编辑权限"></el-checkbox>
            <el-checkbox label="修改协作者权限"></el-checkbox>
            <el-checkbox label="修改增发数量"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <div class="check-title">对账户信息内容的权限</div>
          <el-checkbox-group v-model="checkList3">
            <el-checkbox label="读取权限"></el-checkbox>
            <el-checkbox label="编辑权限"></el-checkbox>
            <el-checkbox label="删改权限"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <el-button class="save" type="primary" @click="submitForm">保存</el-button>
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
      link: window.location.origin + '/app/' + this.$route.params.id + '/oauth'
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
        message: '保存成功',
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
            title: '复制成功',
            message: '内容已经成功复制到剪贴板'
          })
          return document.execCommand('copy') // Security exception may be thrown by some browsers.
        } catch (ex) {
          this.$notify.error({
            title: '复制失败',
            message: '请手动复制内容'
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
