<!-- 事件检索弹窗 -->
<template>
<!-- 弹窗 -->
  <div class="event-container">
    <el-dialog fullscreen
               title="事件检索"
               :before-close="handleClose"
               :visible.sync="eventDialogVisible">
      <p class="message-bar">
        <span>项目标题：<i>DCH202003184500</i> </span>
        <span>入排标注：<i>纳入标准</i>  </span>
        <span>队列名称：<i>队列</i> </span>
      </p>
      <div class="event-com">
        事件检索
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { } from '@/api/projectsMangement'
// import { ConditionTrees, EventSearch } from './comChildren'

export default {
  name: 'EventSearch',
  data () {
    return {}
  },
  props: {
    eventDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  watch: {},
  components: {},
  created () { },
  mounted () {},
  destroyed () { },
  methods: {
    ...mapMutations(['']),
    handleClose (val) {
      this.$emit('eventDialogEmit', false)
    }

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.event-container {
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
  .event-com{
    width: 100%;
    padding: 20px;
    // height: calc(100% - 15px);
    background: rgba(0,112,244,0.05);
    border: 1px solid #e6e6e6;
  }
}
</style>
<style lang="scss">

.event-container {
  .el-dialog__header{
    border: solid 1px #e6e6e6;
    padding: 10px;
    .el-dialog__headerbtn{
      top: 15px;
    }
  }
}
</style>
