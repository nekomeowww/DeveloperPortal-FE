
<template>
  <div>
    <PhotoFrame>
      <template v-slot:sidebar>
        <DocumentationMenu />
      </template>
      <vue-markdown class="markdown" :source="markdown"></vue-markdown>
    </PhotoFrame>
  </div>
</template>

<script>

import PhotoFrame from '@/components/PhotoFrame.vue'
import DocumentationMenu from '@/components/Documentation/DocumentationMenu.vue'
import { getCookie, disassemble } from '../util/cookie'
import { mapActions } from 'vuex'

import VueMarkdown from 'vue-markdown'

import appIcon from '@/assets/img/app.png'
import docIcon from '@/assets/img/doc.png'
import getStarted from '@/doc/hello.md'

export default {
  components: {
    PhotoFrame,
    VueMarkdown,
    DocumentationMenu
  },
  data () {
    return {
      markdown: getStarted,
      menuItem: [
        {
          title: '应用 Application',
          icon: appIcon,
          path: '/apps'
        },
        {
          title: '开发文档 Documentation',
          icon: docIcon,
          path: '/doc'
        },
        {
          title: '起步',
          elicon: 'el-icon-success',
          path: '/doc/getstarted'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['setLoggedIn'])
  },
  created () {
    const c = getCookie('ACCESS-TOKEN')
    if (c) {
      const res = disassemble(c)
      res.status = true
      this.setLoggedIn(res)
    }
  },
  mounted () {
    document.title('开发文档 - Matataki 开发者中心')
  }
}
</script>

<style lang="less" scoped>
.markdown {
  font-family:PingFangSC-Medium,PingFang SC, Arial, Helvetica, sans-serif;
  height: 120%;
  padding: 2rem 3rem 4rem 2rem;
}

/deep/ h1 {
  line-height: 3rem;
}

/deep/ p {
  font-family:PingFangSC-Medium,PingFang SC, Arial, Helvetica, sans-serif;
  font-size: 16px;
  word-break: break-all;
  margin-top: 20px;
  margin-bottom: 20px;
}

/deep/ a {
  text-decoration: none;
  color: #542DE0;
}

/deep/ p > img {
  width: 100%;
}
</style>
