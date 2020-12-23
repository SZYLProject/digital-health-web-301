<template>
  <div class="specialDisease">
    <el-row :gutter="15" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel card-1">
          <div style="font-size: 24px; font-weight: bold">胃癌</div>
          <div style="margin-top: 18px; color: #a0a0a0">Stomach cancer</div>
          <div class="stomach-2">
            <i class="iconfont icon-weijingke-S"></i>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-top">
            <div class="card-panel-title">总病例数</div>
            <!-- <div class="card-panel-info">
              <span>周同比:
                <span style="color:#73d7b5">
                  24％<i class="el-icon-top"></i>
                </span>
              </span>
              <span style="margin-left:5px">日环比:
                <span style="color:#ff943e">
                  13％
                  <i class="el-icon-bottom"></i>
                </span>
              </span>
            </div> -->
          </div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="209312" :duration="3600" />
          </div>
          <div class="card-panel-bottom">
            <img src="@/assets/case_num.png" height="84" alt="" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-top">
            <div class="card-panel-title">手术数量</div>
          </div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="199826" :duration="3600" />
          </div>
          <div class="card-panel-bottom">
            <img src="@/assets/surgery.png" height="73" alt="" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-top">
            <div class="card-panel-title">放疗数量</div>
          </div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="201468" :duration="3600" />
          </div>
          <div class="card-panel-bottom">
            <img src="@/assets/radiation.png" height="58" alt="" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-top">
            <div class="card-panel-title">总住院数</div>
          </div>
          <div
            class="card-panel-num"
            style="display: flex; justify-content: space-between"
          >
            <p>
              <count-to :start-val="0" :end-val="209312" :duration="3600" />
            </p>
            <p style="font-size: 13px; color: #999999; padding-top: 8px">
              日均住院数：
              <span style="color: #0070f4">
                <count-to :start-val="0" :end-val="12834" :duration="3600" />
              </span>
            </p>
          </div>
          <div class="card-panel-bottom">
            <div style="font-size: 13px; color: #999999">
              <span
                >周同比:
                <span style="color: #73d7b5">
                  24％
                  <i class="el-icon-top"></i>
                </span>
              </span>
              <span style="margin-left: 5px"
                >日环比:
                <span style="color: #ff943e">
                  13％
                  <i class="el-icon-bottom"></i>
                </span>
              </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-top" style="justify-content: flex-start">
            <div class="card-panel-title" style="margin-right: 20px">化疗数量</div>
            <div class="card-panel-info">
              <span
                >日化疗数量：
                <count-to :start-val="0" :end-val="12432" :duration="3600" />
              </span>
            </div>
          </div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="30148" :duration="3600" />
          </div>
          <div class="card-panel-bottom">
            <img src="@/assets/chemotherapy.png" height="58" alt="" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-top" style="justify-content: flex-start">
            <div class="card-panel-title" style="margin-right: 20px">化验数量</div>
            <div class="card-panel-info">
              <span
                >转换率： <count-to :start-val="0" :end-val="60" :duration="3600" />%
              </span>
            </div>
          </div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="130148" :duration="3600" />
          </div>
          <div class="card-panel-bottom">
            <img src="@/assets/chemical.png" height="54" alt="" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-top">
            <div class="card-panel-title">检查数量</div>
            <!-- <div class="card-panel-info">
              <span>周同比：
                <span style="color:#73d7b5">
                  35％
                  <i class="el-icon-top"></i>
                </span>
              </span>
              <span style="margin-left:5px">日环比：
                <span style="color:#ff943e">
                  8％
                  <i class="el-icon-bottom"></i>
                </span>
              </span>
            </div> -->
          </div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="78.09" :decimals="2" :duration="3600" />%
          </div>
          <div class="card-panel-bottom">
            <img src="@/assets/check.png" height="54" alt="" />
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 病例数量 -->
    <!-- module-con-1 -->
    <div class="module-container-two">
      <div class="title">
        <h1>病例数量</h1>
      </div>
      <div class="con">
        <el-row :gutter="25">
          <el-col :span="18">
            <div class="chartTitle">
              <div class="right">
                <el-radio-group v-model="timeRadio" size="small">
                  <!-- <el-radio-button label="今日"></el-radio-button> -->
                  <el-radio label="本周"></el-radio>
                  <el-radio label="本月"></el-radio>
                  <el-radio label="全年"></el-radio>
                </el-radio-group>
              </div>
            </div>
            <line-mul
              id="line_charts"
              :chart-data="casesNumY"
              :data-x="casesNumX"
              :color="['#0070F4', '#15BC83']"
            />
          </el-col>
          <el-col :span="6">
            <div class="caseNum">
              <el-date-picker
                v-model="timeValue"
                size="small"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 100%"
              >
              </el-date-picker>
              <div class="card-top">
                <div class="card-panel-title">累计导入病例数</div>
                <div class="card-panel-info">
                  <span
                    >周同比：
                    <span style="color: #73d7b5">
                      12％
                      <i class="el-icon-top"></i>
                    </span>
                  </span>
                </div>
              </div>
              <div class="card-panel-num">
                <count-to :start-val="0" :end-val="43207" :duration="3600" />
              </div>
              <el-progress
                :text-inside="true"
                :stroke-width="18"
                color="#79b1f3"
                :percentage="70"
              ></el-progress>
              <!-- 本周新入病例数 -->
              <div class="card-top">
                <div class="card-panel-title">本周新入病例数</div>
                <div class="card-panel-info">
                  <span style="margin-left: 15px"
                    >日环比：
                    <span style="color: #ff943e">
                      10％
                      <i class="el-icon-bottom"></i>
                    </span>
                  </span>
                </div>
              </div>
              <div class="card-panel-num" style="color: #4ccca1">
                <count-to :start-val="0" :end-val="478" :duration="3600" />
              </div>
              <el-progress
                :text-inside="true"
                :stroke-width="18"
                color="#4ccca1"
                :percentage="15"
              ></el-progress>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="module-container-two">
      <div class="title">
        <h1>诊疗数据</h1>
      </div>
      <div class="con">
        <el-row :gutter="15">
          <el-col :span="8">
            <Pie
              height="400px"
              width="100%"
              title="首诊分期"
              id="diagnosis"
              titleLocal="40px"
              labelPosition="center"
              :data="diagnosisData"
            />
          </el-col>
          <el-col :span="16">
            <Bar
              height="400px"
              width="100%"
              id="treatment"
              title="治疗方式"
              titleLocal="left"
              :dataX="treatmentDataX"
              :dataY="treatmentDataY"
              direction
            />
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="module-container-two">
      <div class="title">
        <h1>患者数据</h1>
      </div>
      <div class="con">
        <el-row :gutter="20">
          <el-col :span="8">
            <Pie
              height="400px"
              width="100%"
              title="年龄"
              id="age"
               titleLocal="40px"
              labelPosition="center"
              :data="ageData"
              label
            />
          </el-col>
          <el-col :span="16">
            <Scatter height="400px" width="100%" title="患者bmi" titleLocal="40px" />
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="module-container-two">
      <div class="title">
        <h1>患者数据</h1>
      </div>
      <div class="con">
        <ChinaMap height="500px" width="100%" />
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import LineMul from '@/components/Charts/LineMul'
import Pie from '@/components/Charts/Pie'
import Bar from '@/components/Charts/Bar'
import Scatter from '@/components/Charts/Scatter'
import ChinaMap from '@/components/Charts/ChinaMap'
export default {
  name: 'HomeSpecialDisease',
  components: { CountTo, LineMul, Pie, Bar, Scatter, ChinaMap },
  data () {
    return {
      // 患者数量线状图
      timeRadio: '全年',
      timeValue: '',
      casesNumY: [
        [3231, 3451, 2817, 2846, 3014, 3467, 3012, 1978, 1879, 3820, 4167, 3617],
        [2331, 3241, 2513, 2332, 2178, 2908, 1408, 1567, 1243, 3007, 2089, 3356]
      ],
      casesNumX: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ],

      // 首诊分期
      diagnosisData: [
        { name: '1期', value: 12 },
        { name: '2期', value: 2 },
        { name: '3期', value: 10 },
        { name: '4期', value: 5 }
      ],

      // 年龄分布
      ageData: [
        { name: '0-6', value: 12 },
        { name: '7-12', value: 12 },
        { name: '13-17', value: 10 },
        { name: '18-45', value: 10 },
        { name: '16-69', value: 3 },
        { name: '>69', value: 20 }
      ],
      // 治疗方式
      treatmentDataY: ['细胞', '靶向', '手术', '治疗', '化疗'],
      treatmentDataX: [123, 456, 1102, 4230, 3520]
    }
  },
  created () {},
  methods: {}
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.specialDisease {
  .panel-group {
    .card-panel {
      height: 160px;
      padding: 15px 25px;
      background: #ffffff;
      position: relative;
      margin-bottom: 15px;
      .stomach-2 {
        width: 80px;
        height: 80px;
        background: #e5f0fe;
        position: absolute;
        border-radius: 50%;
        top: 40px;
        right: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 60px;
          color: #0070f4;
        }
      }
      .card-top {
        display: flex;
        justify-content: space-between;
        color: #adadad;
        .card-panel-title {
          font-size: 15px;
          font-weight: 800;
        }
        .card-panel-info {
          padding-top: 3px;
          font-size: 13px;
        }
      }
      .card-panel-num {
        padding-top: 10px;
        font-size: 24px;
      }
      .card-panel-bottom {
        position: absolute;
        bottom: 15px;
        left: 25px;
        right: 25px;
        img {
          width: 100%;
        }
      }
    }
    .card-1 {
      background: #ffffff url(../../assets/stomach.png) no-repeat 25px;
    }
  }
  .chartTitle {
    position: relative;
    // margin-bottom: 15px;
    z-index: 999;
    .right {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .caseNum {
    .card-top {
      display: flex;
      justify-content: space-between;
      color: #5c5c5c;
      margin-top: 35px;
      font-size: 14px;
      .card-panel-title {
        font-weight: 800;
      }
    }
    .card-panel-num {
      padding-top: 10px;
      font-size: 24px;
      color: #0070f4;
      margin-bottom: 30px;
    }
  }
}
</style>
<style lang="scss">
.chartTitle {
  .el-radio {
    margin-right: 10px;
  }
  .el-radio__input {
    display: none;
  }
}
</style>
