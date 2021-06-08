import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhCN from './zh-CN.json'
import enUS from './en-US.json'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': {
      ...zhCN
    },
    'en-US': {
      ...enUS
    }
  }
})

export default i18n
