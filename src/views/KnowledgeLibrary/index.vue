<!-- 临床试验 -->
<template>
  <div class="knowladge-library">
    <div class="module-container-two" style="margin-bottom: 0px">
      <div class="title">
        <h1>知识库</h1>
      </div>
    </div>
    <!-- tab 切换 -->
    <div class="tab-header">
      <el-radio-group v-model="tabRadio">
        <el-radio
          :label="index"
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
  FirstPage,
  Literature,
  GuideConsensus,
  ClinicalPathway,
  DrugSpecification,
  ClinicTrial,
  MisdiagnosisMistreatment
} from './index'

export default {
  name: 'knowladgeLibrary',
  components: {
    FirstPage,
    Literature,
    GuideConsensus,
    ClinicalPathway,
    DrugSpecification,
    ClinicTrial,
    MisdiagnosisMistreatment
  },
  computed: {
    ...mapGetters(['title'])
  },
  data () {
    return {
      // tabRadio: this.$route.params.comName ? 0 : this.$route.params.comName,
      // whichCom: this.$route.params.comName ? 'FirstPage' : this.$route.params.comName,
      tabRadio: 0,
      whichCom: 'FirstPage',
      comList: [
        {
          title: '首页',
          component: 'FirstPage',
          show: true
        },
        {
          title: '文献',
          component: 'Literature',
          show: true
        },
        {
          title: '指南共识',
          component: 'GuideConsensus',
          show: true
        },
        {
          title: '临床路径',
          component: 'ClinicalPathway',
          show: true
        },
        {
          title: '药品说明书',
          component: 'DrugSpecification',
          show: true
        },
        {
          title: '临床试验',
          component: 'ClinicTrial',
          show: true
        },
        {
          title: '误诊误治',
          component: 'MisdiagnosisMistreatment',
          show: true
        }
      ]
    }
  },
  watch: {
    tabRadio (val) {
      // console.log(val)
      this.whichCom = this.comList[val].component
      // window.history.replaceState(
      //   {},
      //   '',
      //   `#/index/${this.comList[val].component}`
      // )
      // this.whichCom = this.comList[val].component
    }
  },
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    ...mapMutations([''])
  }
}
</script>

<style lang="scss" scoped>
.knowladge-library {
  .tab-header {
    background: #fff;
    padding: 15px 15px;
    margin-top: 15px;
  }
}
</style>
<style lang="scss">
.knowladge-library {
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
