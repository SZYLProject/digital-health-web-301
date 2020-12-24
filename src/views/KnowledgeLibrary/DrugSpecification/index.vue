<!-- 药品说明书  -->
<template>
  <div class="drug-specification">
    <div class="module-container-three">
      <div class="title">
        <h1>药品说明书搜索</h1>
        <span class="right">
          <el-link type="primary" :underline="false" disabled>高级搜索</el-link>
        </span>
      </div>
      <div class="con">
        <el-input
          placeholder="请输入疾病名称"
          v-model="input"
          class="input-with-select"
        >
          <el-button slot="append" type="primary">搜索</el-button>
        </el-input>
      </div>
    </div>
    <div class="module-container-three">
      <div class="title">
        <h1>常用药</h1>
        <span class="right">
          <el-link
            type="primary"
            :underline="false"
            icon="el-icon-refresh-right"
            disabled
            >换一批</el-link
          >
        </span>
      </div>
      <div class="con-1">
        <el-button size="mini" v-for="(item, index) in dugname" :key="index">
          {{ item }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'DrugSpecification',
  components: {},
  computed: {
    ...mapGetters(['title'])
  },
  data () {
    return {
      input: '',
      dugname: [
        '美托洛尔',
        '阿司匹林',
        '复方丹参滴丸',
        '阿托伐他汀'
      ]
    }
  },
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    ...mapMutations([''])
  }
}
</script>

<style lang="scss" scoped>
.drug-specification {
  .con-1 {
    padding: 0px 35px 10px 45px;
    .el-button{
      height: 24px;
      line-height: 10px;
      border: none;
      color:#0070F4;
      margin: 10px 10px 0px 0px;
      background: rgba(0,112,244,0.1);
      border-radius: 0;
    }
  }
}
</style>
<style lang="scss">
</style>
