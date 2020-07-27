<template>
    <div>
      <Header />
      <Menu />
      <Applications />
    </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import Applications from '@/components/Applications.vue'

export default {
  components: {
    Header,
    Menu,
    Applications
  }
}
</script>
