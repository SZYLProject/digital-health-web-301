<!-- 条件树 -->
<template>
  <div class="condition-tree-search" v-loading="treeLoading">
    <SvgTree :flatten-data="flattenData"
             :is-flatten="isFlatten"
             :horizontal="horizontal"
             :width="width"
             :height="height"
             />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SvgTree from '@/components/SvgTree'
export default {
  name: 'conditionTree',
  components: {
    SvgTree
  },
  data () {
    return {
      isFlatten: true, // 使用扁平数据
      horizontal: true, // 横向树
      width: 0,
      height: 0
    }
  },
  props: {},
  computed: {
    ...mapGetters(['flattenData', 'treeLoading'])
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
