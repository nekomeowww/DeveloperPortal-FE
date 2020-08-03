<template>
    <div>
      <div v-if="id!==0">
        <Header />
        <AppMenu />
        <NewAppForm
          :showSecretRow="true"
          :appData="app"
        />
      </div>
    </div>
</template>

<script>

import Header from '@/components/Header.vue'
import AppMenu from '@/components/AppMenu.vue'
import NewAppForm from '@/components/NewAppForm.vue'

export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  components: {
    Header,
    AppMenu,
    NewAppForm
  },
  data () {
    return {
      app: {
        img: null,
        name: 'App',
        clientId: '127272782',
        clientSecret: 'KDE47XGdbGGlmUmQ',
        callback: 'text'
      }
    }
  }
}
</script>
