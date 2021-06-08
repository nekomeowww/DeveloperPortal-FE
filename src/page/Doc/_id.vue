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
import i18n from '../../locale'
import { getCookie, disassemble } from '../../util/cookie'
import { mapActions } from 'vuex'

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
      markdown: ''
    }
  },
  watch: {
    $route (val) {
      this.getMarkdown()
    }
  },
  methods: {
    ...mapActions(['setLoggedIn']),
    async getMarkdown () {
      const ls = window.localStorage || localStorage
      const lang = ls.getItem('APP_LANG') || this.$root.$i18n.locale
      this.markdown = await import(`../../../doc/${lang}/${this.$route.params.name}.md`)
      if (!this.markdown) {
        this.$message({
          message: i18n.t('elMessage.error.noDoc'),
          type: 'warning',
          duration: 4000
        })
        this.$router.push({ name: 'Doc' })
      }
    }
  },
  async created () {
    const c = getCookie('ACCESS-TOKEN')
    if (c) {
      const res = disassemble(c)
      res.status = true
      this.setLoggedIn(res)
    }

    await this.getMarkdown()
  }
}
</script>
