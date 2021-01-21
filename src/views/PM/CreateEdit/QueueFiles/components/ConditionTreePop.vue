<!-- 项目列表 -->
<template>
  <!-- 弹窗 -->
  <div class="tree-container">
    <el-dialog fullscreen
               title="树形检索"
               :before-close="handleClose"
               :visible.sync="treeDialogVisible">
      <div class="message-bar">
        <div>
          <span>项目标题：<i>{{projectItemDatas.projectName}}</i> </span>
          <span>入排标注：<i>{{groupData&&groupData.type===2?'排除标准':'纳入标准'}}</i> </span>
          <span>队列名称：<i>{{groupData&&groupData.groupName}}</i> </span>
        </div>
        <el-button type="primary"
                   size="medium"
                   @click="handleSubmit"
                   style="margin-right:20px">提交</el-button>
      </div>
      <div class="tree-com">
        <condition-tree />
      </div>

    </el-dialog>
  </div>

</template>

<script>
import { mapGetters, createNamespacedHelpers } from 'vuex'
import { } from '@/api/projectsMangement'
import ConditionTree from './ConditionTree'
import { getFormType } from '@/utils/searchRelation'
import { stringToArr, deepClone } from '@/utils/index'
const { mapMutations, mapActions } = createNamespacedHelpers('queueSearch')

export default {
  name: 'conditionTreePop',
  data () {
    return {
      projectItemDatas: this.$Storage.sessionGet('projectItemDatas')
    }
  },
  props: {
    treeDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['groupData', 'flattenData'])
  },
  watch: {},
  components: {
    ConditionTree
  },
  created () { },
  mounted () {

  },
  destroyed () {
    this.syncFlattenData([{
      id: 'root',
      name: 'root',
      parentId: '',
      edit: false,
      value: '',
      opt: 'AND'
    }])
  },
  methods: {
    ...mapMutations(['syncFlattenData']),
    ...mapActions(['updateFlattenData']),
    handleSubmit (val) {
      const summitData = deepClone(this.flattenData)
      summitData.map((item, index) => {
        if (getFormType(item.dataOptionType) === 'date' &&
          (item.type === '区间外' || item.type === '区间内')) {
          item.value = [item.date1, item.date2]
        } else {
          item.value = stringToArr(item.value, 'toArray')
        }
        if (item.dataOptionType === 1 &&
          (item.type === '区间外' || item.type === '区间内')) {
          item.value = [item.date1, item.date2]
        }
      })
      const newData = {
        type: 'all',
        data: summitData
      }
      this.updateFlattenData(newData)
      // this.$emit('treeDialogEmit', false)
    },
    handleClose (val) {
      this.$emit('treeDialogEmit', false)
    }

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.queue-container {
  .message-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    span {
      color: #666666;
      font-size: 14px;
      margin-right: 50px;
      i {
        color: #333333;
      }
    }
  }
  .tree-com {
    width: 100%;
    padding: 20px;
    // height: calc(100% - 15px);
    background: rgba(0, 112, 244, 0.05);
    border: 1px solid #e6e6e6;
  }
}
</style>
<style lang="scss">
.tree-container {
  .el-dialog__header {
    border: solid 1px #e6e6e6;
    padding: 10px;
    .el-dialog__headerbtn {
      top: 15px;
    }
  }
}
</style>
