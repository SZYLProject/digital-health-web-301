<template>
  <div class="base-info module-container">
    <div class="title">
      <h2>患者人口学信息</h2>
    </div>
    <div class="con">
      <div class="baseBlock inlineBlock"
           v-for="(item,index) in baseData"
           :key="index">
        <p><b>{{item.name}}</b></p>
        <span>{{item.value}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInfo',
  props: ['baseData'],
  data () {
    return {
      activeName: 'first',
      tableData: [],
      // 分页数据
      total: 0,
      pageNo: 1, // 页码
      pageSize: 10 // 每页显示的数据条数
    }
  },
  mounted () {
    console.log(this.baseData)
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.base-info {
  .baseBlock{
    margin:15px;
    width: 150px;
    line-height: 25px;
    vertical-align: top;
  }
}
</style>
