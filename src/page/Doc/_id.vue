<template>
  <div>
    <PhotoFrame>
      <template v-slot:sidebar>
        <DocumentationMenu />
      </template>
    <Markdown
      :markdown="markdown"
    />
    </PhotoFrame>
  </div>
</template>

<script>

import PhotoFrame from '@/components/PhotoFrame.vue'
import DocumentationMenu from '@/components/Documentation/DocumentationMenu.vue'
import VueMarkdown from 'vue-markdown'
import Markdown from '@/components/Documentation/Markdown.vue'

import getstarted from '@/doc/getstarted.md'
import userprofile from '@/doc/userprofile.md'
import userwallet from '@/doc/userwallet.md'
import fanlocker from '@/doc/fanlocker.md'

export default {
  components: {
    PhotoFrame,
    VueMarkdown,
    DocumentationMenu,
    Markdown
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      markdown: '',
      markdownList: {
        getstarted: getstarted,
        userprofile: userprofile,
        userwallet: userwallet,
        fanlocker: fanlocker
      }
    }
  },
  watch: {
    markdownList (val) {
      this.markdown = this.markdownList[this.$route.params.name]
    },
    $route (val) {
      this.markdown = this.markdownList[val.params.name]
    }
  },
  mounted () {
    this.markdown = this.markdownList[this.$route.params.name]
    if (this.markdown === undefined) {
      this.$message({
        message: '似乎没有这个文档页面，返回到文档首页...',
        type: 'warning',
        duration: 4000
      })
      this.$router.push({ name: 'Doc' })
    }
  }
}
</script>
