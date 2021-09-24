<!-- 项目列表 -->
<template>
  <div class="ys-container">
    <div class="module-container-two" style="margin-bottom: 0px;">
      <div class="title">
        <h1>变量选择</h1>
        <span class="right right-button">
          <el-button size="mini" @click.native="goPrev">上一步</el-button>
          <!-- <el-button size="mini"
                     type="primary"
                     @click.native="pullDatas"
                     >完成</el-button> -->
          <el-button
            size="mini"
            type="primary"
            @click.native="pullDatas"
            v-if="projectType === 1"
            >完成</el-button
          >
          <el-button size="mini" type="primary" v-else @click.native="nextStep"
            >下一步</el-button
          >
        </span>
      </div>
    </div>
    <div class="main-content">
      <el-container>
        <el-aside width="400px">
          <div class="left">
            <PageTwoLeftLists />
          </div>
        </el-aside>
        <el-main>
          <div class="right">
            <div class="tab">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane
                  v-for="(item, index) in stepDatas"
                  :key="index"
                  :label="item.label + (index + 1)"
                  :name="item.name + (index + 1)"
                >
                </el-tab-pane>
              </el-tabs>
              <el-button
                type="text"
                size="medium"
                disabled
                @click.native="addButton"
                class="el-icon-circle-plus-outline add-button"
              >
                新增阶段
              </el-button>
            </div>
            <div>
              <PageTwoRightDrag :tabIndex="tabIndex" />
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import PageTwoLeftLists from './components/PageTwoLeftLists' //
import PageTwoRightDrag from './components/PageTwoRightDrag' //
import { getPullDatas } from '@/api/projectsMangement'

export default {
  name: 'ResearchComPageTwo',
  data () {
    return {
      projectType: null,
      activeName: 'step1',
      tabIndex: 0,
      stepDatas: [
        {
          label: '阶段',
          name: 'step',
          id: 1
        }
      ]
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  watch: {},
  components: { PageTwoLeftLists, PageTwoRightDrag },
  created () {},
  mounted () {
    this.projectType = this.$Storage.sessionGet('projectType')
  },
  destroyed () {
    this['projectsMangement/storedragdata'](null)
  },
  methods: {
    ...mapMutations(['projectsMangement/storedragdata']),
    goPrev () {
      this.$emit('next', 1)
    },
    nextStep () {
      this.$emit('next', 3)
    },
    handleClick (tab) {
      // console.log(tab.index)
      this.tabIndex = Number(tab.index)
    },
    addButton () {
      this.stepDatas.push({
        label: '阶段',
        name: 'step'
      })
    },

    // 点击完后抽取数据
    pullDatas () {
      const data = {
        projectId: this.$Storage.sessionGet('projectId')
      }
      getPullDatas(data)
        .then(res => {
          if (res) {
            this.$confirm('数据正在抽取中，请耐心等待...', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                this.$router.push('/PM/ProjectLists')
              })
              .catch(() => {})
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.ys-container {
  .right-button {
    top: 9px;
  }
  .main-content {
    margin-top: 20px;
    width: 100%;
    .left {
      width: 400px;
      height: 800px;
    }
    .right {
      background: #ffffff;
      .tab {
        padding: 20px 105px 5px 20px;
        border-bottom: solid 1px #e6e6e6;
        position: relative;
        .add-button {
          position: absolute;
          right: 20px;
          top: 8px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.main-content {
  .el-main {
    padding-top: 0;
    padding-right: 0;
  }
  .right {
    .el-tabs__nav-wrap::after {
      height: 0px;
    }
    .el-tabs__active-bar {
      height: 0px;
    }
    .el-tabs__item {
      // font-size: 16px!important;
    }
    .el-tabs__header {
      margin: 0 0 0;
    }
  }
}
</style>
