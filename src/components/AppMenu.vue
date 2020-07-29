<template>
  <div>
    <div style="height: 100vh">
      <el-menu default-active="1-4-1" class="el-menu-vertical">
        <el-menu-item class="menu-item" index="1">
          <img class="menu-icon" src="../assets/img/info.png" />
          <span slot="title">基本信息 Information</span>
        </el-menu-item>
        <el-menu-item class="menu-item" index="2">
          <img class="menu-icon" src="../assets/img/oauth.png" />
          <span slot="title">OAuth2</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.el-menu-vertical {
  display: flex;
  flex-direction: column;
  margin-top: 1px;
  padding-top: 40px;
  padding-left: 40px;
  width:350px;
  min-height: 400px;
  height: auto;
  background:rgba(247,247,247,1);
  box-shadow:1px 0px 0px 0px rgba(219,219,219,1);
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
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
</style>
