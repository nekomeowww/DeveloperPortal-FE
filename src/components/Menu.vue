<template>
  <el-menu
    class="el-menu-vertical"
    :default-active="$route.path"
    router
  >
    <el-menu-item
      v-for="(item, index) in menu"
      :key="index" class="menu-item"
      :index="item.path"
    >
      <img class="menu-icon" :src="item.icon" />
      <span slot="title">{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import appIcon from '@/assets/img/app.png'
import docIcon from '@/assets/img/doc.png'

export default {
  name: 'Menu',
  data () {
    return {
      menu: [
        {
          title: '应用 Application',
          icon: appIcon,
          path: '/apps'
        },
        {
          title: '开发文档 Documentation',
          icon: docIcon,
          path: '/doc'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.el-menu-vertical {
  display: flex;
  flex-direction: column;
  width:350px;
  min-height: 400px;
  height: auto;
  background:rgba(247,247,247,1);
  box-shadow:1px 0px 0px 0px rgba(219,219,219,1);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 30px 40px 0;
}

.menu-item {
  font-size:16px;
  font-family:PingFangSC-Medium,PingFang SC, Arial, Helvetica, sans-serif;
  font-weight:500;
  display: flex;
  align-items: center;
  width:270px;
  height:40px;
  background:rgba(247,247,247,1);
  border-radius:4px;
  margin-bottom: 0.6rem;
}

.menu-icon {
  height: 20px;
  margin-right: 10px;
}

.is-active {
  color: #542DE0;
  background:rgba(219,219,219,1);
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  text-decoration: none;
  color: #333333;
}

@media screen and (max-width: 1200px) {
  .el-menu-vertical {
    padding: 30px 0 0;
  }
}
</style>
