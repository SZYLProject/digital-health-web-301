<template>
  <div class="home">
    <el-row :gutter="15">
      <el-col :span="17">
        <div class="module-container">
          <div class="title">
            <h2>平台数据概览</h2>
            <span class="right">更新时间：{{baseData&&baseData.visitUpdateDate ||''}}</span>
          </div>
          <div class="con">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="home-con1">
                  <el-avatar :size="50"
                             icon="iconfont icon-shouhuanzhe"
                             :style="{'background-color': theme}">
                  </el-avatar>
                  <div class="con1-text inlineBlock">
                    <p>患者数</p>
                    <p><span style="font-size: 16px;"
                            :style="{'color': theme}">
                        <countTo :startVal='0'
                                 :endVal='baseData&&Number(baseData.personTotal)||0'
                                 :duration='1000'></countTo>
                      </span>人</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="home-con1">
                  <el-avatar :size="50"
                             icon="iconfont icon-xiangmu"
                             :style="{'background-color': theme}">
                  </el-avatar>
                  <div class="con1-text inlineBlock">
                    <p>总项目数</p>
                    <p><span style="font-size: 16px;"
                            :style="{'color': theme}">
                        <countTo :startVal='0'
                                 :endVal='baseData&&Number(baseData.projectNumber)||0'
                                 :duration='3000'></countTo>
                      </span>个</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="home-con1">
                  <el-avatar :size="50"
                             icon="iconfont icon-shijian"
                             :style="{'background-color': theme}">
                  </el-avatar>
                  <div class="con1-text inlineBlock">
                    <p>开始 <span :style="{'color': theme}">{{baseData&&baseData.visitStartDate||''}}</span></p>
                    <p>结束 <span :style="{'color': theme}">{{baseData&&baseData.visitEndDate||''}}</span></p>
                  </div>
                </div>
              </el-col>

            </el-row>
          </div>
        </div>
        <div class="module-container">
          <div class="title">
            <h2>平台信息概览</h2>
          </div>
          <div class="con">
            <el-row :gutter="10">
              <el-col v-for="(item,index) in barList"
                      :key="index"
                      :xs="24"
                      :sm="24"
                      :md="12"
                      :lg="12"
                      :xl="12">
                <div class="chartsBar">
                  <Bar height="100%"
                       width="100%"
                       :id="item.id"
                       :title="item.title"
                       :nameY='"人次"'
                       dataZoom
                       :dataX="item.dataX"
                       :dataY="item.dataY" />
                </div>
              </el-col>

            </el-row>

          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="module-container">
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label="待办事项"
                         name="first">
              <div class="home-con2">
                暂无数据
              </div>
            </el-tab-pane>
            <el-tab-pane label="数据补录"
                         name="second">
              <div class="home-con2">
                暂无数据
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="module-container">
          <div class="title">
            <h2>我收藏的患者</h2>
            <router-link :to="{ path: '/home/PatientCollect' }"
                         class="right pointer"
                         :style="{'color': theme}">{{patientTotol}}<i class="el-icon-arrow-right"></i></router-link>
          </div>
          <div class="con"
               style="height:340px">
            <Pie height="100%"
                 width="100%"
                 title="收藏分类"
                 titleLocal="center"
                 labelPosition="center"
                 id="5"
                 :data="pieData" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import Bar from '@/components/Charts/Bar'
import Pie from '@/components/Charts/Pie'
import { mapGetters } from 'vuex'
import { chartMyPersonInfo } from '@/api/patientCollect'
import { getBaseCount, getProduceCount, getVisitCount } from '@/api/home'
export default {
  name: 'Home',
  computed: {
    ...mapGetters(['theme'])
  },
  components: { Bar, Pie, countTo },
  data () {
    return {
      baseLoading: false,
      activeName: 'first',
      baseData: null,
      // 我收藏的患者
      patientTotol: 0,
      loadingPie: false,
      pieData: [],
      barList: [
        {
          id: '1',
          title: '每月手术人次',
          dataX: [],
          dataY: []
        },
        {
          id: '2',
          title: '每月就诊人次',
          dataX: [],
          dataY: []
        },
        {
          id: '3',
          title: '每月门诊人次',
          dataX: [],
          dataY: []
        },
        {
          id: '4',
          title: '每月住院人次',
          dataX: [],
          dataY: []
        }
      ]
    }
  },
  created () {
    this.getMyPersonInfo()
    this.getBaseInfo()
    this.getOperationCount()
    this.getOtherCount(1)
    this.getOtherCount(2)
    this.getOtherCount(3)
  },
  methods: {
    // 平台数据概览
    getBaseInfo () {
      this.baseLoading = true
      getBaseCount()
        .then(res => {
          this.baseData = res.obj
          this.baseLoading = false
        })
        .catch((res) => {
          this.baseLoading = false
        })
    },
    // 每月手术人次
    getOperationCount () {
      getProduceCount()
        .then(res => {
          this.barList[0].dataX = res.obj.dateList
          this.barList[0].dataY = res.obj.countList
        })
    },
    getOtherCount (type) {
      let val = ''
      if (type === 2) {
        val = '门诊'
      } else if (type === 3) {
        val = '住院'
      } else {
        val = null
      }
      getVisitCount(val)
        .then(res => {
          this.barList[type].dataX = res.obj.dateList
          this.barList[type].dataY = res.obj.countList
        })
        .catch((res) => {
        })
    },
    // 患者收藏图表数据
    getMyPersonInfo () {
      chartMyPersonInfo()
        .then(res => {
          const { data, total } = res.obj
          this.pieData = data
          this.patientTotol = total
        })
        .catch((res) => {
        })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.home {
  .module-container {
    @include space(bottom);
  }
  .chartsBar {
    height: 300px;
    margin-bottom: 25px;
  }
  .home-con1 {
    text-align: center;
    margin: 10px 0;
    .con1-text {
      text-align: left;
      vertical-align: top;
      margin-top: 5px;
      margin-left: 15px;
      line-height: 23px;
    }
  }
  .home-con2 {
    height: 380px;
  }
}
</style>
<style lang="scss">
.home-con1 {
  .iconfont {
    color: #ffffff;
    font-size: 30px !important;
  }
}
</style>
