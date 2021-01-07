<!-- 研究对象 -->
<template>
  <div class="research-object">
    <!-- 面包削 -->
    <div class="breadcrumb-bar">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/PM/ProjectLists' }"
          >项目列表</el-breadcrumb-item
        >
        <el-breadcrumb-item class="active-breadcrumb"
          >研究对象</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <!-- 进度条 -->
    <div class="progress-bar">
      <el-steps :active="step" align-center>
        <el-step
          v-for="(item, index) in stepList.filter(item => item.show)"
          :title="item.title"
          :key="index"
        ></el-step>
      </el-steps>
    </div>
    <!-- 组件切换 -->
    <component :is="whichCom" @next="nextStep"></component>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
// import { } from '@/api/caseSearch'
import {
  ProjectCreate,
  ResearchComPageOne,
  ResearchComPageTwo,
  FollowUpVisit
} from './CreateEdit'

export default {
  name: 'ResearchObject',
  data () {
    return {
      projectType: null,
      step: 0,
      whichCom: this.$route.params.stepName,
      stepList: [
        {
          title: '项目信息',
          component: 'ProjectCreate',
          show: true
        },
        {
          title: '队列入排',
          component: 'ResearchComPageOne',
          show: true
        },
        {
          title: '变量选择',
          component: 'ResearchComPageTwo',
          show: true
        },
        {
          title: '访视设计',
          component: 'FollowUpVisit',
          show: false
        }
      ]
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  watch: {
    step (val) {
      window.history.replaceState(
        {},
        '',
        `#/ResearchObject/${this.stepList[val].component}`
      )
      this.whichCom = this.stepList[val].component
    },
    projectType: {
      immediate: true,
      deep: true,
      handler: function (newValue, oldValue) {
        this.stepList[3].show = newValue === 2
      }
    }
  },
  components: {
    ProjectCreate,
    ResearchComPageOne,
    ResearchComPageTwo,
    FollowUpVisit
  },
  created () {
    this.step = this.stepList.findIndex(
      item => item.component === this.$route.params.stepName
    )
  },
  mounted () {
    this.projectType = this.$Storage.sessionGet('projectType')
    window.addEventListener('setItem', () => {
      this.projectType = this.$Storage.sessionGet('projectType')
    })
  },
  destroyed () {},
  methods: {
    ...mapMutations(['']),
    nextStep (val) {
      this.step = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.research-object {
  .progress-bar {
    padding: 20px 10px;
  }
}
</style>
<style lang="scss">
.research-object {
  .progress-bar {
    .el-step__icon {
      width: 18px !important;
      height: 18px !important;
    }
    .el-step.is-horizontal .el-step__line {
      top: 8px;
    }

    .el-step__head.is-success {
      // color: #0070f4;
      // border-color: #0070f4;
    }
  }
}
</style>
