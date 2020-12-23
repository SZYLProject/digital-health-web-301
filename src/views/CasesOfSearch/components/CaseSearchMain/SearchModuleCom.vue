<!-- 搜索模块组件  -->
<template>
<div class="scrollbar-wraps"
       v-loading="loading"
       element-loading-text="数据加载中..."
       element-loading-spinner="el-icon-loading"
  >
  <el-scrollbar style="height:100%" ref="scroll">
    <div class="search-module-com">
      暂无数据
    </div>
  </el-scrollbar>
</div>
</template>

<script>
export default {
  name: 'SearchModuleCom',
  data () {
    return {
      loading: false
    }
  },
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.search-module-com{
  text-align: center;
  font-size: 30px;
  padding: 100px 0px;
}
</style>
