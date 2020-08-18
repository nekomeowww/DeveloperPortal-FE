<template>
  <div class="sidebar-menu">
    <div class="sidebar-menu-back">
      <router-link :to="{path: '/teams'}">
        <i class="el-icon-arrow-left" />
        Back to Teams
      </router-link>
    </div>
    <el-menu
      class="el-menu-vertical"
      :default-active="$route.path"
      router
    >
      <el-menu-item
        v-for="(item, index) in menu"
        :key="index"
        class="menu-item"
        :index="item.path"
      >
        <img class="menu-icon" :src="item.icon" />
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import infoIcon from '@/assets/img/info.png'
import appIcon from '@/assets/img/app.png'

export default {
  name: 'Menu',
  data () {
    return {
      menu: [
        {
          title: '基本信息 Information',
          icon: infoIcon,
          path: `/team/${this.$route.params.id}/settings`
        },
        {
          title: '应用 Application',
          icon: appIcon,
          path: `/team/${this.$route.params.id}`
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>

.sidebar-menu {
  background:rgba(247,247,247,1);
  box-shadow:1px 0px 0px 0px rgba(219,219,219,1);
  height: 100%;
  padding: 40px 40px 0;
  &-back {
    padding-left: 10px;
    a {
      font-size: 16px;
      font-weight: 500;
      color: black;
      line-height: 22px;
      &:hover {
        color: #542DE0;
      }
    }
  }
}

.el-menu-vertical {
  display: flex;
  flex-direction: column;
  width:350px;
  min-height: 400px;
  height: auto;
  width: 100%;
  height: 100%;
  background:rgba(247,247,247,1);
  box-sizing: border-box;
  padding-top: 20px;
  border: none;
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
  width: 20px;
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
  .sidebar-menu {
    padding: 40px 0 0;
  }
}
</style>
