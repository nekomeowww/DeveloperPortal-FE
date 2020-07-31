<template>
    <div class="application" style="position: absolute;top: 61px;left: 390px;margin-left: 2rem;margin-top: 2rem;">
      <div class="app-desp">
        <div class="app-desp-title">Application</div>
        <div class="app-desp-content">Find the perfect feature set for your game in our Game SDK, and sign up for Server Commerce to start selling directly in your server. Get started by creating a new application. We can't wait to see what you make!</div>
      </div>
      <div class="app-title">My Application</div>
      <el-row :gutter="20" class="apps">
        <div v-for="(app, index) in appCards" :key=index>
          <router-link :to="'/app/' + app.id">
            <div v-if="app.id">
              <div class="app-item" :href="app.href">
                <img class="app-img" :src="app.img" />
                <span class="app-name">{{ app.name }}</span>
              </div>
            </div>
          </router-link>
        </div>
        <router-link to="/newapp">
          <div class="app-new">
            <img id="new-logo" src="../assets/img/newapp.png" />
            <span id="new-text">Start your app</span>
          </div>
        </router-link>
      </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      appCards: [
        {
          img: require('@/assets/img/test/app01.png'),
          name: `Neko's App`,
          id: 1
        },
        {
          img: require('@/assets/img/test/app02.png'),
          name: `Neko's App`,
          id: 2
        },
        {
          img: require('@/assets/img/test/app03.png'),
          name: `Neko's App`,
          id: 3
        },
        {
          img: require('@/assets/img/test/app04.png'),
          name: `Neko's App`,
          id: 4
        },
        {
          img: require('@/assets/img/test/app05.png'),
          name: `Neko's App`,
          id: 5
        },
        {
          img: require('@/assets/img/test/app06.png'),
          name: `Neko's App`,
          id: 6
        },
        {
          img: require('@/assets/img/test/app07.png'),
          name: `Neko's App`,
          id: 7
        },
        {
          img: require('@/assets/img/test/app08.png'),
          name: `Neko's App`,
          id: 8
        },
        {
          img: null,
          name: null,
          href: null
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>

a {
  text-decoration: none;
  color: black;
}

.application {
  font-family:'PingFangSC-Medium','PingFang SC', Arial, Helvetica, sans-serif;
  padding-right: 2rem;
}

.app-desp-title {
  font-size: 26px;
}

.app-desp-content {
  font-size: 16px;
  word-break: break-all;
  margin-top: 20px;
  color: #B2B2B2;
}

.app-title {
  margin-top: 20px;
  font-size: 24px;
}

.apps {
  // margin-top: 20px;
  padding: 20px 0 40px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.app-img {
  margin-top: 10px;
  height: 128px;
  width: 128px;
  object-fit: cover;
}

.app-item {
  margin-bottom: 1rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  width:148px;
  height:180px;
  background:rgba(241,241,241,1);
  border-radius:8px;
  &:hover {
    background-color: #E5E5E5;
  }
  a {
    text-decoration: none;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.app-name {
  margin-top: 0.5rem;
  font-size: 16px;
}

.app-new {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width:148px;
  height:180px;
  background:rgba(241,241,241,1);
  border-radius:8px;
  &:hover {
    background-color: #E5E5E5;
  }
}

#new-logo {
  height: 40px;
}

#new-text {
  margin-top: 20px;
  font-size: 14px;
  color: #B2B2B2;
  text-decoration: none;
}
</style>
