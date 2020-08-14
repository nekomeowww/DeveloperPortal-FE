import Vue from 'vue'
import Router from 'vue-router'

import Landing from '@/page/Landing.vue'
import Login from '@/page/Login.vue'
import Home from '@/page/Home'
import NewApp from '@/page/NewApplication.vue'
import Settings from '@/page/Oauth/Settings.vue'
import Vault from '@/page/Vault/_id.vue'
import NewVault from '@/page/Vault/New.vue'
import Doc from '@/page/Doc.vue'
import Docs from '@/page/Doc/_id.vue'
import App from '@/page/App/_id.vue'
import Redirect from '@/page/Redirect/_id.vue'
import OauthLogin from '@/page/Oauth/Login.vue'
import OauthCallback from '@/page/Oauth/Callback.vue'

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
      path: '/app/:id/settings',
      name: 'Settings',
      component: Settings,
      props: true
    },
    {
      path: '/app/:id/vault',
      name: 'Vault',
      component: Vault,
      props: true
    },
    {
      path: '/app/:id/newvault',
      name: 'NewVault',
      component: NewVault,
      props: true
    },
    {
      path: '/doc',
      name: 'Doc',
      component: Doc
    },
    {
      path: '/doc/:name',
      name: 'Docs',
      component: Docs
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
      path: '/app/:id/login/:callback',
      name: 'LoginRedirect',
      component: Redirect,
      props: true
    },
    {
      path: '/app/:id/callback/:callback',
      name: 'Callback',
      component: OauthCallback,
      props: true
    }
  ]
})
