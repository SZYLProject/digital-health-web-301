<!-- 项目列表 -->
<template>
  <div class="queue-container">
    <div class="module-container-two">
      <div class="title">
        <h1>队列入排</h1>
        <span class="right right-button">
          <el-button size="mini" @click.native="goPrev">上一步</el-button>
          <el-button size="mini" type="primary" @click.native="nextStep"
            >下一步</el-button
          >
        </span>
      </div>
      <div class="queue-content">
        <el-scrollbar style="height: 100%" ref="scroll">
          <!-- <div class=""> -->
          <ul class="ul-l">
            <li v-for="(item, index) in queueDatas" :key="index">
              <div class="ul-li-d1">
                <el-tag
                  closable
                  class="el-tags"
                  :disable-transitions="true"
                  v-if="idx !== index"
                  @close="handleClose(index)"
                >
                  <span class="sn" @click="correctTag(index)">
                    {{ item.title1 }}</span
                  >
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-else
                  placeholder="请输入修改名称"
                  v-model="item.title1"
                  ref="saveTagInput"
                  size="small"
                  @focus="handleFocus(item.title1)"
                  @keyup.enter.native="handleInputConfirm(index)"
                  @blur="handleInputConfirm(index)"
                >
                </el-input>
              </div>
              <div class="ul-li-d2">
                <span>{{ item.title2 }}</span>
              </div>
            </li>
            <li @click="addQueue">
              <span class="el-icon-plus add-button">新增分组</span>
            </li>
          </ul>
          <!-- </div> -->
        </el-scrollbar>
      </div>
    </div>

    <!-- 纳入标准 排除标准 -->
    <el-row :gutter="15">
      <el-col :span="12">
        <div class="module-container-two">
          <div class="title">
            <h1>纳入标准</h1>
            <span class="right pointer">
              <i class="el-icon-more"></i>
            </span>
          </div>
          <el-row>
            <el-col :span="18" class="table-left">
              <!-- 条件树 -->
              <el-row class="left-col">
                <el-col :span="6"><span>条件树</span></el-col>
                <el-col :span="12"><span>10,000 人</span></el-col>
                <el-col :span="6">
                  <el-button type="text" @click="openDialog('tree')"
                    >编辑</el-button
                  >
                </el-col>
              </el-row>
              <!-- 事件 -->
              <el-row class="left-col">
                <el-col :span="6"><span>事件</span></el-col>
                <el-col :span="12"><span>10,000 人</span></el-col>
                <el-col :span="6">
                  <el-button type="text">编辑</el-button>
                </el-col>
              </el-row>
              <!-- 精确搜索 -->
              <el-row class="left-col">
                <el-col :span="6"><span>精确搜索</span></el-col>
                <el-col :span="12"><span>10,000 人</span></el-col>
                <el-col :span="6">
                  <el-button type="text" @click="openDialog('accurate')"
                    >编辑</el-button
                  >
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6" class="table-right">
              <div class="text">
                <p>纳入患者总数</p>
                <p class="num">1,458</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="module-container-two">
          <div class="title">
            <h1>排除标准</h1>
            <span class="right pointer">
              <i class="el-icon-more"></i>
            </span>
          </div>
          <el-row>
            <el-col :span="18" class="table-left">
              <!-- 条件树 -->
              <el-row class="left-col">
                <el-col :span="6"><span>条件树</span></el-col>
                <el-col :span="12"><span>10,000 人</span></el-col>
                <el-col :span="6">
                  <el-button type="text">编辑</el-button>
                </el-col>
              </el-row>
              <!-- 事件 -->
              <el-row class="left-col">
                <el-col :span="6"><span>事件</span></el-col>
                <el-col :span="12"><span>10,000 人</span></el-col>
                <el-col :span="6">
                  <el-button type="text">编辑</el-button>
                </el-col>
              </el-row>
              <!-- 精确搜索 -->
              <el-row class="left-col">
                <el-col :span="6"><span>精确搜索</span></el-col>
                <el-col :span="12"><span>10,000 人</span></el-col>
                <el-col :span="6">
                  <el-button type="text">编辑</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6" class="table-right">
              <div class="text">
                <p>纳入患者总数</p>
                <p class="num">1,458</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!-- 确认纳入按钮 -->
    <div class="queue-submit">
      <el-button type="primary" style="width: 100%"
        >确认纳入<span class="n">11111</span>人</el-button
      >
    </div>
    <!-- 弹窗组件 -- 条件树 -->
    <ConditionTreePop
      :treeDialogVisible="treeDialogVisible"
      @treeDialogEmit="treeDialogEmit"
    />
    <!-- 精确搜索 -->
    <AccurateSearchPop
      :accurDialogVisible="accurDialogVisible"
      @accurDialogEmit="accurDialogEmit"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getQueueDatas } from '@/api/projectsMangement'
import { ConditionTreePop, AccurateSearchPop } from './components'

export default {
  name: 'ResearchComPageOne',
  data () {
    return {
      idx: 999,
      inputValue: null,
      oldMsg: null,
      queueDatas: [
        {
          title1: '分组一',
          title2: '未纳入患者'
        },
        {
          title1: '分组二',
          title2: '未纳入患者'
        }
      ],
      treeDialogVisible: false, // 是否条件树
      accurDialogVisible: false // 精确搜索
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  watch: {},
  components: {
    ConditionTreePop,
    AccurateSearchPop
  },
  created () {},
  mounted () {
    this.getQueueDatas()
  },
  destroyed () {},
  methods: {
    ...mapMutations(['']),
    openDialog (val) {
      if (val === 'tree') {
        this.treeDialogVisible = true
      } else if (val === 'accurate') {
        this.accurDialogVisible = true
      }
    },
    treeDialogEmit (val) {
      this.treeDialogVisible = false
    },
    accurDialogEmit (val) {
      this.accurDialogVisible = false
    },
    goPrev () {
      this.$emit('next', 0)
    },
    nextStep () {
      this.$emit('next', 2)
    },
    // 获取队列数据
    getQueueDatas () {
      const data = {
        projectId: 10
      }
      getQueueDatas(data).then((res) => {
        console.log(res)
      })
    },
    // 删除队列
    handleClose (index) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.queueDatas.splice(index, 1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    correctTag (index) {
      this.idx = index
    },
    handleFocus (val) {
      this.oldMsg = val
    },
    handleInputConfirm (index) {
      this.idx = 999
      if (!this.queueDatas[index].title1) {
        this.queueDatas[index].title1 = this.oldMsg
      }
    },
    // 新增队列
    addQueue () {
      this.queueDatas.push({
        title1: '分组二',
        title2: '未纳入患者'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.queue-container {
  .right-button {
    top: 9px;
  }
  .queue-content {
    width: 100%;
    height: 140px;
    background: #ffffff;
    // margin-bottom: 20px;
    .ul-l {
      // width: 100vh;
      // white-space: nowrap;
      padding: 20px 44px;
      // overflow: scroll;
      // padding-bottom: 10px;
      li {
        width: 160px;
        height: 80px;
        margin-right: 20px;
        border: 1px solid #e6e6e6;
        display: inline-block;
        position: relative;
        .el-tags {
          width: 160px;
          height: 32px;
          position: absolute;
          left: 0;
          top: 0;
          .sn {
            position: absolute;
            left: 0;
            top: 0;
            display: inline-block;
            width: 122px;
            height: 32px;
            padding-left: 10px;
            color: #0070f4;
            overflow: hidden; /* 溢出时不显示溢出的内容 */
            text-overflow: ellipsis; /* 发生溢出时使用省略号代替 */
            display: -webkit-box; /* chrome浏览器的私有属性。显示为box。 */
            -webkit-box-orient: vertical; /* 垂直排列元素 */
            -webkit-line-clamp: 1; /* 显示多少行 */
          }
        }
        .input-new-tag {
          position: absolute;
          left: 0;
          top: 0;
        }
        &:last-child {
          border: 1px solid #0070f4;
          background: rgba(0, 112, 244, 0.1);
          text-align: center;
          vertical-align: top;
          line-height: 80px;
          cursor: pointer;
          .add-button {
            font-size: 16px;
            color: #0070f4;
          }
        }
        .ul-li-d2 {
          color: #c4c4c4;
          font-size: 14px;
          padding: 10px;
          display: flex;
          justify-content: center;
          align-content: center;
          width: 158px;
          height: 46px;
          position: absolute;
          left: 0;
          bottom: 0;
          overflow: hidden; /* 溢出时不显示溢出的内容 */
          text-overflow: ellipsis; /* 发生溢出时使用省略号代替 */
          display: -webkit-box; /* chrome浏览器的私有属性。显示为box。 */
          -webkit-box-orient: vertical; /* 垂直排列元素 */
          -webkit-line-clamp: 1; /* 显示多少行 */
        }
      }
    }
  }
  .table-left {
    border-right: 1px solid #e9e9e9;
    vertical-align: middle;
  }
  .left-col {
    line-height: 48px;
    text-align: center;
    border-bottom: 1px solid #e9e9e9;
  }
  .table-right {
    vertical-align: middle;
    position: relative;
    height: 146px;
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      text-align: center;
      transform: translate(-50%, -50%);
      width: 100%;
      .num {
        margin-top: 5px;
        font-size: 16px;
        font-weight: 700;
        color: #0070f4;
      }
    }
  }
  .queue-submit {
    margin-top: 15px;
    .n {
      margin: 0 2px;
    }
  }
}
</style>
<style lang="scss">
//
.queue-container {
  .queue-content {
    .ul-l {
      .ul-li-d1 {
        .el-tag {
          border: none;
          border-radius: 0;
        }
        .el-tag .el-icon-close {
          top: -1px;
          right: -125px !important;
        }
        .el-input {
          input {
            border: none !important;
            background: rgba(0, 112, 244, 0.15);
            border-radius: 0;
          }
        }
      }
    }
  }
  .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
    white-space: nowrap;
  }
  // .el-scrollbar__wrap {
  //   overflow-x: hidden;
  // }
}
</style>
