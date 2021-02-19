<!-- 高级检索弹窗 -->
<template>
  <!-- 弹窗 -->
  <div class="event-container">
    <el-dialog fullscreen
               title="高级检索"
               :before-close="handleClose"
               :visible.sync="advencedDialogVisible">
      <p class="message-bar">
        <span>项目标题：<i>{{projectItemDatas.projectName}}</i> </span>
        <span>入排标注：<i>{{groupData&&groupData.type===2?'排除标准':'纳入标准'}}</i> </span>
        <span>队列名称：<i>{{groupData&&groupData.groupName}}</i> </span>
      </p>
      <div class="event-com">
        <advanced-search :advancedData="data" />
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { } from '@/api/projectsMangement'
import AdvancedSearch from './AdvancedSearch'
// import { ConditionTrees, EventSearch } from './comChildren'

export default {
  name: 'EventSearchPop',
  data () {
    return {
      projectItemDatas: this.$Storage.sessionGet('projectItemDatas')
    }
  },
  props: ['data', 'advencedDialogVisible'],
  computed: {
    ...mapGetters(['groupData'])
  },
  watch: {},
  components: {
    AdvancedSearch
  },
  created () { },
  mounted () { },
  destroyed () { },
  methods: {
    ...mapMutations(['']),
    handleClose (val) {
      this.$emit('advencedDialogEmit', false)
    }

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.event-container {
  .message-bar {
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
  .event-com {
    width: 100%;
    padding: 20px;
    // height: calc(100% - 15px);
    background: rgba(0, 112, 244, 0.05);
    border: 1px solid #e6e6e6;
  }
}
</style>
<style lang="scss">
.event-container {
  .el-dialog__header {
    border: solid 1px #e6e6e6;
    padding: 10px;
    .el-dialog__headerbtn {
      top: 15px;
    }
  }
}
</style>
