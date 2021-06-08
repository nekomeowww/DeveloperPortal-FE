// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import '../static/theme/index.css'
import store from '@/store/index.js'
import router from './router'
import i18n from './locale'

require('dotenv').config()

Vue.use(ElementUI)
Vue.prototype.$message = ElementUI.Message
Vue.prototype.$notify = ElementUI.Notification
Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
