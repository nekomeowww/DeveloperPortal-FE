<template>
    <div>
      <div v-if="id!==0">
        <Header />
        <Menu />
        <NewAppForm
          :showSecretRow="true"
          :appData="app"
        />
      </div>
    </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
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
    Menu,
    NewAppForm
  },
  data () {
    return {
      app: {}
    }
  }
}
</script>
