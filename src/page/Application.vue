<template>
    <div>
      <Header />
      <Menu />
      <NewAppForm />
    </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'

export default {
  components: {
    Header,
    Menu
  }

}
</script>
