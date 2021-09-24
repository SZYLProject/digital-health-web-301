<!-- 项目列表详情 -->
<template>
  <div class="project-lists-details">
    <!-- 面包削 -->
    <div class="breadcrumb-bar">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/PM/ProjectLists' }"
          >项目列表</el-breadcrumb-item
        >
        <el-breadcrumb-item class="active-breadcrumb"
          >项目详情</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <!-- tab 切换 -->
    <div class="tab-header">
      <el-radio-group v-model="tabRadio">
        <el-radio
          :label="item.component"
          v-for="(item, index) in comList"
          :key="index"
          v-show="item.show"
          >{{ item.title }}
          <i
            v-if="index !== comList.length - 1"
            style="color: #e6e6e6; padding-left: 10px"
          >
            |</i
          >

          <!-- <p>研究对象</p> -->
          <a
            v-if="item.title === '研究对象'"
            href="http://49.233.56.175:18080/#/login?redirect=%2FCasesOfSearch%2FCaseSearchHome"
            >专病平台</a
          >

        </el-radio>
      </el-radio-group>
    </div>
    <div style="margin-top: 15px">
      <!-- 组件切换 -->
      <el-collapse-transition name="el-zoom-in-bottom">
        <component :is="whichCom"></component>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import {
  SearchObjectCom,
  FollowUpVisitCom,
  ProjectScheduleCom,
  StatisticAnalysisCom
} from './Details'
import {} from '@/api/caseSearch'
export default {
  name: 'ProjectListsDetails',
  data () {
    return {
      tabRadio: this.$route.params.comName,
      whichCom: this.$route.params.comName,
      projectType: this.$route.params.projectType,
      comList: [
        {
          title: '研究对象',
          component: 'SearchObjectCom',
          show: true
        }
        // {
        //   title: '随访管理',
        //   component: 'FollowUpVisitCom',
        //   show: false
        // },
        // {
        //   title: '项目进度',
        //   component: 'ProjectScheduleCom',
        //   // show: this.$route.params.projectType !== 1
        //   show: false
        // },
        // {
        //   title: '统计分析',
        //   component: 'StatisticAnalysisCom',
        //   show: false
        // }
      ]
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  watch: {
    tabRadio (val) {
      // console.log(val)
      window.history.replaceState(
        {},
        '',
        `#/ProjectListsDetails/${val}/${this.$route.params.projectType}`
      )
      this.whichCom = val
    }
  },
  components: {
    SearchObjectCom,
    FollowUpVisitCom,
    ProjectScheduleCom,
    StatisticAnalysisCom
  },
  created () {},
  mounted () {
    window.sessionStorage.setItem('projectType', this.projectType)
  },
  destroyed () {},
  methods: {
    ...mapMutations(['']),
    // 返回项目列表
    goBackLists () {
      this.$router.push('ProjectLists')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.project-lists-details {
  padding-right: 8px;
  .tab-header {
    background: #fff;
    padding: 15px 10px;
    margin-top: 15px;
  }
}
</style>
<style lang="scss">
.project-lists-details {
  .el-tabs--border-card > .el-tabs__content {
    padding: 0px;
  }
  .el-tabs {
    margin-top: 0px;
  }
  .tab-header {
    .el-radio {
      margin-right: 0px;
    }
    .el-radio__input {
      display: none;
    }
    // .el-radio-group{
    //   .el-radio{

    //   }
    // }
  }
}
</style>
