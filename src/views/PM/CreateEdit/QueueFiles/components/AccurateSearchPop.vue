<!-- 精确搜索弹窗 -->
<template>
  <!-- 弹窗 -->
  <div class="tree-container">
    <el-dialog fullscreen
               title="精确检索"
               :before-close="handleClose"
               :visible.sync="accurDialogVisible">
      <p class="message-bar">
        <span>项目标题：<i>{{projectItemDatas.projectName}}</i> </span>
        <span>入排标注：<i>{{groupData&&groupData.type===2?'排除标准':'纳入标准'}}</i> </span>
        <span>队列名称：<i>{{groupData&&groupData.groupName}}</i> </span>
      </p>
      <div class="tree-container">
        精确搜索
        <!-- 搜索框 -->
        <div style="padding:0px 25%;margin-bottom:20px;">
          <el-row>
            <el-col :span="22">
              <el-input placeholder="输入您要搜索的内容"
                        v-model.trim="searchs"
                        size="medium"
                        @keyup.enter.native="serachFn">
              </el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary"
                         class="btn"
                         size="medium"
                         @click.native="serachFn">
                搜索
              </el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { preciseSearch } from '@/api/projectsMangement'
// import { ConditionTrees, EventSearch } from './comChildren'

export default {
  name: 'AccurateSearchPop',
  data () {
    return {
      projectItemDatas: this.$Storage.sessionGet('projectItemDatas'),
      searchs: '', // 搜索条件关键字的值,
      loading: ''
    }
  },
  props: {
    data: {
      type: String,
      default: ''
    },
    accurDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['groupData'])
  },
  watch: {},
  components: {},
  created () {
  },
  mounted () {
    this.searchs = this.data
  },
  destroyed () { },
  methods: {
    ...mapMutations(['']),
    serachFn () {
      if (this.searchs.length > 0) {
        const newData = {
          exactSearch: this.searchs,
          groupId: this.groupData.groupId,
          id: this.groupData.id,
          projectId: this.groupData.projectId,
          totalCount: 0,
          type: this.groupData.type
        }
        this.loading = true
        preciseSearch(newData).then(res => {
          this.$emit('accurDialogEmit', false)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.$message({
          message: '搜索关键字不能为空~',
          type: 'warning'
        })
      }
    },

    handleClose (val) {
      this.searchs = ''
      this.$emit('accurDialogEmit', false)
    }

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.queue-container {
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
  .tree-container {
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
