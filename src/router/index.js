import Vue from 'vue'
import Router from 'vue-router'

import Landing from '@/page/Landing.vue'
import Login from '@/page/Login.vue'
import Home from '@/page/Home'
import NewApp from '@/page/NewApplication.vue'
import Doc from '@/page/Doc.vue'
import App from '@/page/App/_id.vue'
import Redirect from '@/page/Redirect/_id.vue'
import OauthLogin from '@/page/Oauth/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/apps',
      name: 'Home',
      component: Home
    },
    {
      path: '/newapp',
      name: 'NewApp',
      component: NewApp
    },
    {
      path: '/doc',
      name: 'Doc',
      component: Doc
    },
    {
      path: '/app/:id',
      name: 'App',
      component: App,
      props: true
    },
    {
      path: '/app/:id/redirect/:callback',
      name: 'Redirect',
      component: Redirect,
      props: true
    },
    {
      path: '/app/:id/oauth',
      name: 'OauthLogin',
      component: OauthLogin,
      props: true

    },
    {
      path: '/app/:id/login/:redirect',
      name: 'LoginRedirect',
      component: Redirect,
      props: true
    }
  ]
})
