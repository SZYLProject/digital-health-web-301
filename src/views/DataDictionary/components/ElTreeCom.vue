<!-- 树形控件 -->
<template>
  <div class="el-tree-com">
    <el-tree
      ref="treeList"
      :draggable="false"
      :data="treeData"
      :highlight-current="true"
      :accordion="true"
      :props="defaultProps"
      @node-click="handleNodeClick"
      node-key="id"
    ></el-tree>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ElTreeCom',
  data () {
    return {
      defaultProps: {
        children: 'dataItemEntityList',
        label: 'dataItemName'
      }
    }
  },
  props: {},
  computed: {
    ...mapGetters(['treeData'])
  },
  watch: {},
  components: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    handleNodeClick (val) {
      this.$emit('CurrentTreeData', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tree-com {
}
</style>
<style lang="scss">
.el-tree-com {
  .el-tree-node__content:hover {
    color: #0070f4;
  }
  .el-tree-node {
    padding: 5px 0;
  }
}
</style>
