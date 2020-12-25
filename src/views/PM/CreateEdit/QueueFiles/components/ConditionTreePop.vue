<!-- 项目列表 -->
<template>
<!-- 弹窗 -->
  <div class="tree-container">
    <el-dialog fullscreen
               title="树形检索"
               :before-close="handleClose"
               :visible.sync="treeDialogVisible">
      <p class="message-bar">
        <span>项目标题：<i>DCH202003184500</i> </span>
        <span>入排标注：<i>纳入标准</i>  </span>
        <span>队列名称：<i>队列</i> </span>
      </p>
      <div class="tree-container">
        <condition-tree />
      </div>

    </el-dialog>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { } from '@/api/projectsMangement'
import ConditionTree from '../../components/ConditionTree'
// import { ConditionTrees, EventSearch } from './comChildren'

export default {
  name: 'conditionTreePop',
  data () {
    return {}
  },
  props: {
    treeDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  watch: {},
  components: {
    ConditionTree
  },
  created () { },
  mounted () {

  },
  destroyed () { },
  methods: {
    ...mapMutations(['']),
    handleClose (val) {
      this.$emit('treeDialogEmit', false)
    }

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.queue-container {
  .message-bar{
    margin-bottom: 20px;
    span{
      color: #666666;
      font-size: 14px;
      margin-right: 50px;
      i{
        color: #333333;
      }
    }
  }
  .tree-container{
    width: 100%;
    padding: 20px;
    // height: calc(100% - 15px);
    background: rgba(0,112,244,0.05);
    border: 1px solid #e6e6e6;
  }
}
</style>
<style lang="scss">

.tree-container {
  .el-dialog__header{
    border: solid 1px #e6e6e6;
    padding: 10px;
    .el-dialog__headerbtn{
      top: 15px;
    }
  }
}
</style>
