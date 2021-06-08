
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

import i18n from '../locale'

export default {
  components: {
    PhotoFrame,
    VueMarkdown,
    DocumentationMenu
  },
  data () {
    return {
      markdown: ''
    }
  },
  methods: {
    ...mapActions(['setLoggedIn', 'setMenuItems'])
  },
  async created () {
    const c = getCookie('ACCESS-TOKEN')
    if (c) {
      const res = disassemble(c)
      res.status = true
      this.setLoggedIn(res)
    }

    const ls = window.localStorage || localStorage
    const lang = ls.getItem('APP_LANG') || this.$root.$i18n.locale
    this.markdown = await import(`../../doc/${lang}/hello.md`)
  },
  mounted () {
    document.title = i18n.t('siteTitle.doc')
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
