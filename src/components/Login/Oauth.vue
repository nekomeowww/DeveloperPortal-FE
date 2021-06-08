<template>
  <div class="oauth-box">
    <div class="upper-box">
      <span class="login-title">{{ $t('comp.oauth.title') }}</span><br>
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
      <i18n path="comp.oauth.desp" tag="div" class="oauth-desp">
        <span place="appName">{{app.name}}</span>
        <br place="break">
        <strong place="avatar">{{ $t('common.avatar') }}</strong>
        <strong place="email">{{ $t('common.email') }}</strong>
        <strong place="username">{{ $t('common.username') }}</strong>
      </i18n>
      <div>
        <div class="ruleForm">
          <el-switch class="rule-switch" :active-text="text.post" v-model="ruleForm.document" :disabled="rules.document"></el-switch>
          <el-switch class="rule-switch" :active-text="text.profile" v-model="ruleForm.profile" :disabled="rules.profile"></el-switch>
          <el-switch class="rule-switch" :active-text="text.token" v-model="ruleForm.fantoken" :disabled="rules.fantoken"></el-switch>
          <el-button type="primary" v-if="!userData" @click="submitForm('ruleForm')">{{ $t('comp.oauth.login') }}</el-button>
          <el-button type="primary" v-else @click="submitForm('ruleForm')">{{ $t('comp.oauth.loginOAuth') }}</el-button>
        </div>
      </div>
    </div>
    <el-collapse>
      <el-collapse-item :title="text.more" class="collapse">
        <div class="info-unit">
          <h3>
            {{ $t('comp.oauth.desc') }}
          </h3>
          <p class="pre-line" v-html="app.desp || $t('comp.oauth.none')" />
        </div>
        <div v-if="app.orglink" class="info-unit">
          <h3>
            {{ $t('comp.oauth.site') }}
          </h3>
          <p>
            <a :href="formatUrl(app.orglink)" target="_blank">
              {{ app.orglink }}
            </a>
          </p>
        </div>
        <div class="info-unit">
          <h3>
            {{ $t('comp.oauth.org') }}
          </h3>
          <p>
            {{ app.orgname || $t('comp.oauth.none') }}
          </p>
        </div>
        <div v-if="app.toslink" class="info-unit">
          <h3>
            {{ $t('comp.oauth.tos') }}
          </h3>
          <p>
            <a :href="formatUrl(app.toslink)" target="_blank">
              {{ app.toslink }}
            </a>
          </p>
        </div>
        <div v-if="app.pplink" class="info-unit">
          <h3>
            {{ $t('comp.oauth.pri') }}
          </h3>
          <p>
            <a :href="formatUrl(app.pplink)" target="_blank">
              {{ app.pplink }}
            </a>
          </p>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>

import env from '../../../env.json'
import Axios from 'axios'
import { mapState } from 'vuex'

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
        document: true,
        profile: true,
        fantoken: true
      },
      rules: {
        document: false,
        profile: false,
        fantoken: false
      },
      text: {
        post: this.$t('comp.oauth.post'),
        profile: this.$t('comp.oauth.profile'),
        token: this.$t('comp.oauth.token'),
        more: this.$t('comp.oauth.more')
      },
      showTip: false
    }
  },
  computed: {
    ...mapState(['thirdPartyUserId'])
  },
  watch: {
    app (val) {
      this.app = val
    }
  },
  methods: {
    submitForm (formName) {
      if (this.userData) {
        Axios.post(env.DEVELOPERAPI + '/app/authorize', { id: this.app.id, body: this.ruleForm, user: this.thirdPartyUserId })
        const token = window.location.pathname.replace(/\/app\/.*\/callback\/type=token&token=/, '')
        this.$router.push(
          { name: 'Redirect',
            params: {
              id: this.app.id,
              callback: this.app.callback + '&token=' + token
            }
          }
        )
      } else {
        const domain = this.$route.query.network === 'test' ? 'https://test.matataki.io' : env.MATATAKI
        window.location = domain + '/login/oauth/' + encodeURIComponent('app/' + this.app.id + '/callback')
      }
    },
    // 自动补全 http://
    formatUrl (url) {
      const isHttp = url.indexOf('http://')
      const isHttps = url.indexOf('https://')
      if (isHttp !== 0 && isHttps !== 0) url = 'http://' + url
      return url
    }
  },
  mounted () {
    Axios.get(env.DEVELOPERAPI + '/app/permission?appId=' + this.$route.params.id + '&userId=' + this.userId).then(res => {
      if (res.data.permission === undefined) {
        return
      }
      const permission = res.data.permission
      const post = permission.post
      const token = permission.token
      const profile = permission.profile

      // 为文章权限设置开关
      if (post.indexOf('读取权限') !== -1 && post.indexOf('编辑权限') !== -1) {
        this.ruleForm.document = true
        this.rules.document = true
      }
      if (post.indexOf('发布权限') !== -1) {
        this.ruleForm.document = true
        this.rules.document = true
      }

      // 为 Fan 票设置开关
      if (token.indexOf('读取权限') !== -1 && token.indexOf('编辑权限') !== -1) {
        this.ruleForm.fantoken = true
        this.rules.fantoken = true
      }
      if (token.indexOf('修改协作者权限') !== -1) {
        this.ruleForm.fantoken = true
        this.rules.fantoken = true
      }
      if (token.indexOf('修改增发数量') !== -1) {
        this.ruleForm.fantoken = true
        this.rules.fantoken = true
      }

      // 为 个人资料 设置开关
      if (profile.indexOf('读取权限') !== -1 && profile.indexOf('编辑权限') !== -1) {
        this.ruleForm.fantoken = true
        this.rules.fantoken = true
      }
      if (profile.indexOf('删改权限') !== -1) {
        this.ruleForm.fantoken = true
        this.rules.fantoken = true
      }

      Object.entries(this.rules).forEach(item => {
        if (item[1]) this.showTip = true
      })
    })
  }
}
</script>

<style lang="less" scoped>

.oauth-box {
  font-family: Arial, Helvetica, sans-serif;
  width:500px;
  box-shadow:0px 10px 40px 0px rgba(0,0,0,0.1);
  border-radius:10px;
  overflow: hidden;
  .upper-box {
    height: 550px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
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
  width: 100px;
}

.allow {
  font-size: 2.5rem;
  color: #67C23A;
  margin-bottom: 50%;
  padding-left: 1rem;
  padding-right: 1rem;
}

.rule-switch {
  margin-bottom: 1rem;
}

.app-container {
  margin-bottom: 1rem;
  border-radius: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100px;
}

.containers {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
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
  margin-top: 0.3rem;
  font-size: 0.8rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  word-break: break-all;
  width: 100%;
  text-align: center;
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
  margin-top: 0.3rem;
  font-size: 0.8rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  word-break: break-all;
  width: 100%;
  text-align: center;
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
  color: #542DE0;
}

.collapse {
  /deep/ .el-collapse-item__header {
    justify-content: center;
    .el-collapse-item__arrow {
          margin-left: 5px;
    }
  }
}

.info-unit {
  padding: 0 20px;
  margin: 10px 0 40px;
  &:last-child {
    margin-bottom: 0;
  }
  h3 {
    font-size: 16px;
    margin: 0;
    color: black;
  }
  p {
    font-size: 14px;
    margin: 0;
    color: black;
    &.pre-line {
      white-space: pre-line;
    }
    a {
      color: #542DE0;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
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
