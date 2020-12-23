<!-- 条件树 -->
<template>
  <div class="condition-tree-search">
    <!-- :flatten-data="flattenData" -->
    <SvgTree :tree-data="treeData"
             :is-flatten="isFlatten"
             :horizontal="horizontal"
             :width="width"
             :height="height"
             />

  </div>
</template>

<script>
// import { mapGetters, mapMutations } from 'vuex'
import SvgTree from '@/components/SvgTree'
export default {
  name: 'conditionTree',
  components: {
    SvgTree
  },
  data () {
    return {
      isFlatten: true,
      horizontal: true,
      width: 0,
      height: 0,
      // 数据是嵌套好的使用 d3.hierarchy
      treeData: {
        id: 'root',
        name: 'root',
        children: [{
          name: '包括',
          children: [{
            name: '检验结果'
          }, {
            name: '包括',
            children: [{
              name: '检验结果'
            }, {
              name: '检验结果'
            }]
          }]
        },
        {
          name: '包括',
          children: [{
            name: '检验结果'

          }]
        }, {
          name: '检验结果'
        }]
      },
      // 数据是扁平的使用 d3.stratify
      flattenData: [{
        name: '中国',
        parent: ''
      }, {
        name: '北京',
        parent: '中国'
      }, {
        name: '上海',
        parent: '中国'
      }, {
        name: '海淀',
        parent: '北京'
      }, {
        name: '朝阳',
        parent: '北京'
      }]
    }
  },
  props: {},
  computed: {
    // ...mapGetters(['flattenData'])
  },
  watch: {

  },

  created () {
    this.bodyWidth()
    this.bodyHeight()
  },
  mounted () {
  },
  destroyed () {

  },
  methods: {
    // ...mapMutations([''])
    bodyWidth () {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      // console.log(width)
      this.width = width - 100
    },
    bodyHeight () {
      const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      console.log(height)
      this.height = height - 170
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.condition-tree-search {
  width: 100%;
  height:100%
}
</style>
