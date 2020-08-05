<template>
  <div>
    <Header
      :show-login-btn="!notLoginBtn && !isLoggedIn"
      :unfold.sync="unfold"
      enable-unfold-btn
    />
    <div class="sidebar" :class="unfold && 'unfold'">
      <slot name="sidebar">
        <Menu />
      </slot>
    </div>
    <div
      class="sidebar-mask"
      :class="unfold && 'unfold-mask'"
      @click.stop="unfold = !unfold"
    />
    <div class="slot-div">
      <slot />
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Header,
    Menu
  },
  props: {
    /** 隐藏登录按钮 */
    notLoginBtn: Object
  },
  data () {
    return {
      unfold: false
    }
  },
  computed: {
    ...mapState(['isLoggedIn'])
  },
  methods: {
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.slot-div {
  padding-top: 60px;
  margin-left: 390px;
}
.sidebar {
  transition: width 0.28s;
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
}
.sidebar-mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0,0,0,.4);
  z-index: 100;
  display: none;
}

@media screen and (max-width: 1200px) {
  .slot-div {
    margin-left: 291px;
  }
}

@media screen and (max-width: 992px) {
  .slot-div {
    margin-left: 0px;
  }
  .sidebar {
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    z-index: 1001;
    overflow: hidden;
    width: 0px;
    &.unfold {
      width: 291px;
    }
  }
  .sidebar-mask {
    &.unfold-mask {
      display: block;
    }
  }
}
</style>
