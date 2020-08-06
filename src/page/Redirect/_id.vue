<template>
  <div style="height: 100%">
    <Header
      :showLoginBtn="false"
    />
    <div class="loading">
      <div class="loader flat-03">
        <div class='loader-container'>
          <div class='cube'></div>
          <div class='cube'></div>
          <div class='cube'></div>
          <div class='cube'></div>
        </div>
      </div>
      <div class="title">跳转中...</div>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Header
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    callback: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['userInfo', 'isLoggedIn'])
  },
  methods: {
    ...mapActions(['setUserInfo', 'setLoggedIn'])
  },
  created () {
    document.title = '跳转中...'
  },
  mounted () {
    if (/^(http|https):\/\/(([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])(:[0-9]+)?(\/.*)?$/.test(decodeURIComponent(this.callback))) {
      setTimeout(() => {
        window.location = decodeURIComponent(this.callback)
      }, 5000)
    } else {
      this.$message({
        message: 'App 设定的回调参数不是有效的，请联系 App 作者，现在返回 App 授权页面',
        type: 'error',
        duration: 4000
      })
      this.$router.push({ name: 'OauthLogin', params: { id: this.id } })
    }
  }
}
</script>

<style lang="less" scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
}

.title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2rem;
  margin-top: 2rem;
  font-weight: 800;
}
</style>

<style scoped>
/* loader flat-03 */
.flat-03 .loader-container {
  width: 80px;
  height: 80px;
  transform: translate(-10%, -10%) rotate(45deg);
  perspective: 150px;
}
.flat-03 .cube {
  position: absolute;
  width: 50%;
  height: 50%;
  transform-style: preserve-3d;
  background-color: #542DE0;
}
.flat-03 .cube:nth-of-type(1) {
  top: 0;
  left: 0;
  transform-origin: bottom right;
  animation: flat3-1 4s infinite ease-in-out;
}
.flat-03 .cube:nth-of-type(2) {
  top: 0;
  left: 50%;
  opacity: 0.9;
  transform-origin: bottom left;
  animation: flat3-2 4s infinite ease-in-out;
}
.flat-03 .cube:nth-of-type(3) {
  top: 50%;
  right: 0;
  opacity: 0.8;
  transform-origin: top left;
  animation: flat3-3 4s infinite ease-in-out;
}
.flat-03 .cube:nth-of-type(4) {
  top: 50%;
  left: 0;
  opacity: 0.7;
  transform-origin: top right;
  animation: flat3-4 4s infinite ease-in-out;
}
@keyframes flat3-1 {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  12.5% {
    transform: rotateX(0deg) rotateY(180deg);
  }
  25% {
    transform: rotateX(-180deg) rotateY(180deg);
  }
  37.5% {
    transform: rotateX(-180deg) rotateY(360deg);
  }
  50% {
    transform: rotateX(0deg) rotateY(360deg);
  }
  100% {
    transform: rotateX(0deg) rotateY(360deg);
  }
}
@keyframes flat3-2 {
  12.5% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  25% {
    transform: rotateX(-180deg) rotateY(0deg);
  }
  37.5% {
    transform: rotateX(-180deg) rotateY(180deg);
  }
  50% {
    transform: rotateX(0deg) rotateY(180deg);
  }
  62.5% {
    transform: rotateX(0deg) rotateY(360deg);
  }
  100% {
    transform: rotateX(0deg) rotateY(360deg);
  }
}
@keyframes flat3-3 {
  25% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  37.5% {
    transform: rotateX(0deg) rotateY(-180deg);
  }
  50% {
    transform: rotateX(180deg) rotateY(-180deg);
  }
  62.5% {
    transform: rotateX(180deg) rotateY(-360deg);
  }
  75% {
    transform: rotateX(0deg) rotateY(-360deg);
  }
  100% {
    transform: rotateX(0deg) rotateY(-360deg);
  }
}
@keyframes flat3-4 {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  37.5% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: rotateX(180deg) rotateY(0deg);
  }
  62.5% {
    transform: rotateX(180deg) rotateY(-180deg);
  }
  75% {
    transform: rotateX(0deg) rotateY(-180deg);
  }
  87.5% {
    transform: rotateX(0deg) rotateY(-360deg);
  }
  100% {
    transform: rotateX(0deg) rotateY(-360deg);
  }
}
</style>
