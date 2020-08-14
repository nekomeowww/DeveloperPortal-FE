<template>
  <div>
    <vue-markdown class="markdown" :source="markdown"></vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  props: {
    markdown: {
      type: String,
      default: ''
    }
  },
  components: {
    VueMarkdown
  }
}
</script>

<style lang="less" scoped>
.markdown {
  font-family:PingFangSC-Medium,PingFang SC, Arial, Helvetica, sans-serif;
  height: 120%;
  padding: 2rem 2rem 40px;
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
