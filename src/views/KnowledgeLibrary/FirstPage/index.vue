<!-- 首页 -->
<template>
  <div class="first-page">
    <div class="module-container-three">
      <div class="title">
        <h1>知识搜索</h1>
        <span class="right">
          <el-link type="primary" :underline="false" disabled>高级搜索</el-link>
        </span>
      </div>
      <div class="con">
        <el-input
          placeholder="标题、作者等搜索关键词"
          v-model="input"
          class="input-with-select"
        >
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="文献" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append" type="primary">搜索</el-button>
        </el-input>
      </div>
    </div>
    <div class="module-container-three">
      <div class="title">
        <h1>最新文献</h1>
        <span class="right">
          <el-link
            type="primary"
            :underline="false"
            icon="el-icon-refresh-right"
            disabled
            >换一批</el-link
          >
          <el-link
            type="primary"
            style="margin-left:20px;"
            :underline="false"
            disabled
            >更多</el-link
          >
        </span>
      </div>
      <div class="con"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'FirstPage',
  components: {},
  computed: {
    ...mapGetters(['title'])
  },
  data () {
    return {
      input: '',
      select: ''
    }
  },
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    ...mapMutations(['']),
    serachFn () {}
  }
}
</script>

<style lang="scss" scoped>
.first-page {
}
</style>
<style lang="scss">
</style>
