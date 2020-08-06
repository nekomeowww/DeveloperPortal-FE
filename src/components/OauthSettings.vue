<template>
  <div>
    <div class="application">
      <div class="app-desp">
        <div class="app-desp-title">Oauth Permission Control</div>
        <div class="app-desp-content">在这里，你可以控制你的 App 请求什么样的权限，或者是强制要求一些数据获取的权限。</div>
      </div>
      <br>
      <div class="check-list">
        <div class="check-group">
          <div class="check-title">对文章的权限</div>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="读取权限"></el-checkbox>
            <el-checkbox label="编辑权限"></el-checkbox>
            <el-checkbox label="发布权限"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="check-group">
          <div class="check-title">对 Fan 票的权限</div>
          <el-checkbox-group v-model="checkList2">
            <el-checkbox label="读取权限"></el-checkbox>
            <el-checkbox label="编辑权限"></el-checkbox>
            <el-checkbox label="修改协作者权限"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <div class="check-title">对账户信息内容的权限</div>
          <el-checkbox-group v-model="checkList3">
            <el-checkbox label="读取权限"></el-checkbox>
            <el-checkbox label="编辑权限"></el-checkbox>
            <el-checkbox label="删改权限"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <el-button class="save" type="primary" @click="submitForm">保存</el-button>
    </div>
  </div>
</template>

<script>
import env from '../../env.json'
import Axios from 'axios'

export default {
  data () {
    return {
      checkList: [],
      checkList2: [],
      checkList3: []
    }
  },
  methods: {
    submitForm () {
      Axios.post(env.DEVELOPERAPI)
      this.$message({
        message: '保存成功',
        type: 'success',
        duration: 4000
      })
    }
  }
}
</script>

<style lang="less" scoped>
.application {
  font-family:PingFangSC-Medium,PingFang SC, Arial, Helvetica, sans-serif;
  height: 120%;
  padding: 2rem 2rem 40px;
}

.app-desp-title {
  font-size: 26px;
}

.app-desp-content {
  font-size: 16px;
  word-break: break-all;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #B2B2B2;
}

.check-list {
  padding: 1rem 1rem;
  background:rgba(241,241,241,1);
  border-radius:4px;
  border:1px solid rgba(219,219,219,1);
}

.check-group {
  margin-bottom: 1rem;
}

.check-title {
  margin-bottom: 1rem;
}

.save {
  margin-top: 2rem;
}
</style>

<style lang="less">
.slot-div {
  height: auto !important;
}
</style>
