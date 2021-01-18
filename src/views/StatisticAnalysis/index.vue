<!-- 统计分析模块 -->
<template>
  <div class="statistic-analysis-com">
    <!-- 数据展示模块 -->
    <div class="model-datas">
      <p class="p0 white-bg">
        <span>最近数据更新时间 2019-09-11</span>
      </p>
      <el-row :gutter="15">
        <el-col :span="8">
          <div class="grid-content white-bg">
            <p class="p1">全库患者数</p>
            <div class="d1">
              <span class="sn1"> 38808 <sub>位</sub></span>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content white-bg">
            <p class="p1">总项目数</p>
            <div class="d1">
              <span class="sn1"> 12 <sub>个</sub></span>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content white-bg">
            <p class="p1">就诊时间跨度</p>
            <div class="d1 d-l">
              <span class="sn1"> 7122 <sub>天</sub></span>
              <span class="sn2">
                <i class="i-1">1999-07-19</i>
                <br>
                <i class="i-2">2019-01-17</i>
              </span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 患者特征分析 -->
    <div class="model-charts">
      <div class="module-container-two">
        <div class="title">
          <h1>患者特征分析</h1>
          <el-button-group class="right" style="top:10px">
            <el-button icon="el-icon-s-fold"
                       size="mini"
                       @click.native="changeCol(8)"></el-button>
            <el-button icon="el-icon-s-unfold"
                       size="mini"
                       @click.native="changeCol(12)"></el-button>
          </el-button-group>
        </div>

      </div>
      <div class="charts-map">
        <el-row :gutter="15">
          <el-col :span="sn"
                  v-for="(item,index) in allChartDatas"
                  :key="index">
            <div class="grid-content">
              <!-- 柱状图 -->
              <StatisticBar v-if="item.type === 1"
                            :id="String(index)"
                            :sn="sn"
                            height="100%"
                            width="100%"
                            :title="item.title"
                            :data="item.data"
                            :color="['#599cef']" />

              <!-- 饼状图 -->
              <Pie v-if="item.type === 2"
                   :id="String(index)"
                   :sn="sn"
                   height="300px"
                   width="100%"
                   titleLocal="left"
                   labelPosition="center"
                   :data="item.data"
                   :title="item.title"
                   disc />
              <ul class="info-val"
                  v-if="index === 0">
                <li class="grid-con">最小值：0</li>
                <li class="grid-con">Q1：49</li>
                <li class="grid-con">中位数：58</li>
                <li class="grid-con">Q3：66</li>
                <li class="grid-con">最大值：100</li>
              </ul>

              <!-- 环状图 -->
              <Pie v-if="item.type === 3"
                   :id="String(index)"
                   :sn="sn"
                   height="300px"
                   width="100%"
                   titleLocal="left"
                   labelPosition="center"
                   :title="item.title"
                   :data="item.data" />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import { StatisticBar } from './components/echarts'
import Pie from '@/components/Charts/Pie'
import { } from '@/api/caseSearch'
export default {
  name: 'StatisticAnalysis',
  data () {
    return {
      radio: '1',
      sn: 8,
      allChartDatas: [
        // 1
        {
          type: 2,
          title: '首诊年龄',
          data: [
            { value: 1, name: '1' },
            { value: 3, name: '3' },
            { value: 10, name: '10' },
            { value: 12, name: '12' },
            { value: 13, name: '13' },
            { value: 15, name: '15' },
            { value: 18, name: '18' },
            { value: 22, name: '20' },
            { value: 30, name: '22' },
            { value: 35, name: '25' },
            { value: 10, name: '28' },
            { value: 3, name: '30' },
            { value: 10, name: '32' },
            { value: 12, name: '35' },
            { value: 13, name: '40' },
            { value: 15, name: '45' },
            { value: 18, name: '60' }]
        },
        // 2
        {
          type: 2,
          title: '性别',
          data: [
            { value: 70, name: '男' },
            { value: 30, name: '女' }
          ]
        },
        // 3
        {
          type: 2,
          title: '肿瘤纵向位置',
          data: [
            { value: 30, name: 'L' },
            { value: 20, name: 'U' },
            { value: 25, name: 'EGL' },
            { value: 20, name: 'M' },
            { value: 10, name: 'E' },
            { value: 5, name: 'D' }
          ]
        },
        // 4
        {
          type: 2,
          title: '肿瘤横截面位置',
          data: [
            { value: 45, name: 'Less' },
            { value: 20, name: 'Post' },
            { value: 15, name: 'Gre' },
            { value: 15, name: 'Pre' },
            { value: 5, name: 'Circle' }
          ]
        },
        // 5
        {
          type: 1, // 判断是柱状图还是饼状图或者环状图, 1 柱状图
          title: '组织学类型', // 标题
          data: [{ // 图表数据
            name: '乳头状腺部',
            value: '5000'
          }, {
            name: '管状腺癌', // (高分化及中等分化)
            value: '1000'
          }, {
            name: '低分化腺癌',
            value: '500'
          }, {
            name: '印戒细胞癌',
            value: '500'
          }, {
            name: '粘膜腺癌',
            value: '250'
          }, {
            name: '硬癌',
            value: '100'
          }, {
            name: '未分癌及混合型癌',
            value: '300'
          }]
        },
        // 6
        {
          type: 1, // 判断是柱状图还是饼状图或者环状图, 1 柱状图
          title: '组织学分级', // 标题
          data: [{ // 图表数据
            name: '低分化',
            value: '3300'
          }, {
            name: '中分化',
            value: '1000'
          }, {
            name: '中低分化',
            value: '800'
          }, {
            name: '高分化',
            value: '500'
          }, {
            name: '高中分化',
            value: '250'
          }, {
            name: '未分化',
            value: '100'
          }]
        },
        // 7
        {
          type: 2,
          title: 'Lauren',
          data: [
            { value: 45, name: '弥漫型' },
            { value: 35, name: '肠型' },
            { value: 20, name: '混合型' }
          ]
        },
        // 8
        {
          type: 2,
          title: 'Borrmann分型',
          data: [
            { value: 70, name: 'I型' },
            { value: 15, name: 'II型' },
            { value: 10, name: 'III型' },
            { value: 5, name: 'IV型' }

          ]
        },
        // 9
        {
          type: 2,
          title: '是否远处转移',
          data: [
            { value: 80, name: '否' },
            { value: 20, name: '是' }
          ]
        },
        // 10
        {
          type: 1, // 判断是柱状图还是饼状图或者环状图, 1 柱状图
          title: '远处转移部位', // 标题
          data: [{ // 图表数据
            name: '胰腺',
            value: '700'
          }, {
            name: '骨',
            value: '600'
          }, {
            name: '肾上腺',
            value: '400'
          }, {
            name: '脑',
            value: '200'
          }, {
            name: '皮肤',
            value: '180'
          }, {
            name: '如肝脏',
            value: '160'
          }, {
            name: '胰腺',
            value: '150'
          }, {
            name: '横结肠',
            value: '100'
          }, {
            name: '空肠',
            value: '80'
          }, {
            name: '膈肌',
            value: '60'
          }, {
            name: '大网膜及腹壁',
            value: '50'
          }, {
            name: '腹腔',
            value: '40'
          }, {
            name: '盆腔',
            value: '30'
          }, {
            name: '卵巢与直肠膀胱陷窝',
            value: '25'
          }, {
            name: '肝脏和肺',
            value: '20'
          }, {
            name: '胰腺',
            value: '15'
          }, {
            name: '骨',
            value: '10'
          }, {
            name: '肾上腺',
            value: '8'
          }, {
            name: '脑',
            value: '5'
          }, {
            name: '皮肤',
            value: '4'
          }]
        },
        // 11
        {
          type: 2,
          title: '是否复发',
          data: [
            { value: 90, name: '否' },
            { value: 10, name: '是' }
          ]
        },
        // 12
        {
          type: 2,
          title: '是否死亡',
          data: [
            { value: 95, name: '否' },
            { value: 5, name: '是' }
          ]
        },
        // 13
        {
          type: 1, // 判断是柱状图还是饼状图或者环状图, 1 柱状图
          title: 'cT分期', // 标题
          data: [{ // 图表数据
            name: 'cT1',
            value: '80'
          }, {
            name: 'cT1a',
            value: '60'
          }, {
            name: 'cT1b',
            value: '100'
          }, {
            name: 'cT2',
            value: '300'
          }, {
            name: 'cT3',
            value: '600'
          }, {
            name: 'cT4',
            value: '500'
          }, {
            name: 'cT4a',
            value: '500'
          }, {
            name: 'cT4b',
            value: '1100'
          }]
        },
        // 14
        {
          type: 1, // 判断是柱状图还是饼状图或者环状图, 1 柱状图
          title: 'cN分期', // 标题
          data: [{ // 图表数据
            name: 'cN0',
            value: '680'
          }, {
            name: 'cN1',
            value: '720'
          }, {
            name: 'cN2',
            value: '600'
          }, {
            name: 'cN3',
            value: '500'
          }, {
            name: 'cN3b',
            value: '80'
          }, {
            name: 'cN3a',
            value: '50'
          }]
        },
        // 15
        {
          type: 2,
          title: 'cM分期',
          data: [
            { value: 70, name: 'cM0' },
            { value: 30, name: 'cM1' }
          ]
        },
        // 16
        {
          type: 1, // 判断是柱状图还是饼状图或者环状图, 1 柱状图
          title: '临床分期（AJCC-7）', // 标题
          data: [{ // 图表数据
            name: '0期',
            value: '10'
          }, {
            name: 'IA期',
            value: '120'
          }, {
            name: 'IB期',
            value: '180'
          }, {
            name: 'IIA期',
            value: '250'
          }, {
            name: 'IIB期',
            value: '380'
          }, {
            name: 'IIIA期',
            value: '300'
          }, {
            name: 'IIIB期',
            value: '280'
          }, {
            name: 'IIIC期',
            value: '290'
          }, {
            name: 'IV期',
            value: '650'
          }]
        },
        // 17
        {
          type: 1, // 判断是柱状图还是饼状图或者环状图, 1 柱状图
          title: 'pT分期', // 标题
          data: [{ // 图表数据
            name: 'pTC',
            value: '10'
          }, {
            name: 'pTis',
            value: '120'
          }, {
            name: 'pT1',
            value: '180'
          }, {
            name: 'pT1a',
            value: '250'
          }, {
            name: 'pT1b',
            value: '380'
          }, {
            name: 'pT2',
            value: '300'
          }, {
            name: 'pT3',
            value: '280'
          }, {
            name: 'pT4',
            value: '290'
          }, {
            name: 'pT4a',
            value: '650'
          }, {
            name: 'pT4b',
            value: '650'
          }]
        },
        // 18
        {
          type: 1, // 判断是柱状图还是饼状图或者环状图, 1 柱状图
          title: 'pN分期', // 标题
          data: [{ // 图表数据
            name: 'pN0',
            value: '10'
          }, {
            name: 'pN1',
            value: '120'
          }, {
            name: 'pN2',
            value: '180'
          }, {
            name: 'pN3',
            value: '250'
          }, {
            name: 'pN3a',
            value: '380'
          }, {
            name: 'pN3b',
            value: '300'
          }]
        },
        // 19
        {
          type: 2,
          title: 'pM分期',
          data: [
            { value: 80, name: 'pM0' },
            { value: 20, name: 'pM1' }
          ]
        },
        // 20
        {
          type: 1, // 判断是柱状图还是饼状图或者环状图, 1 柱状图
          title: '病理分期（AJCC-7）', // 标题
          data: [{ // 图表数据
            name: '0期',
            value: '10'
          }, {
            name: 'IB期',
            value: '180'
          }, {
            name: 'IIA期',
            value: '250'
          }, {
            name: 'IIIA期',
            value: '300'
          }, {
            name: 'IIB期',
            value: '360'
          }, {
            name: 'IV期',
            value: '380'
          }, {
            name: 'IA期',
            value: '480'
          }, {
            name: 'IIIC期',
            value: '500'
          }, {
            name: 'IIB期',
            value: '650'
          }]
        },
        // 21
        {
          type: 2,
          title: '是否行化疗',
          data: [
            { value: 70, name: '否' },
            { value: 30, name: '是' }
          ]
        },
        // 22
        {
          type: 2,
          title: '是否行靶向治疗',
          data: [
            { value: 90, name: '否' },
            { value: 10, name: '是' }
          ]
        },
        // 23
        {
          type: 2,
          title: '是否行放疗',
          data: [
            { value: 95, name: '否' },
            { value: 5, name: '是' }
          ]
        },
        // 24
        {
          type: 2,
          title: '是否行胃癌手术治疗',
          data: [
            { value: 60, name: '否' },
            { value: 40, name: '是' }
          ]
        },
        // 25
        {
          type: 2,
          title: '术前治疗类型',
          data: [
            { value: 85, name: '化疗' },
            { value: 10, name: '靶向' },
            { value: 5, name: '放疗' }
          ]
        },
        // 26
        {
          type: 2,
          title: '手术方式',
          data: [
            { value: 60, name: '开腹' },
            { value: 20, name: '双腹腔镜' },
            { value: 8, name: '胸腔镜辅助' },
            { value: 6, name: '内镜' },
            { value: 2, name: '中转开腹' },
            { value: 1, name: '双镜子联合' }
          ]
        },
        // 27
        {
          type: 2,
          title: '手术评价',
          data: [
            { value: 60, name: '根治性' },
            { value: 20, name: '姑息性' },
            { value: 8, name: '探查性' },
            { value: 6, name: '减症性' }
          ]
        },
        // 28
        {
          type: 2,
          title: '手术切除方式',
          data: [
            { value: 60, name: '远端胃大' },
            { value: 30, name: '全胃切除' },
            { value: 10, name: '近端胃人' }
          ]
        },
        // 29
        {
          type: 2,
          title: '主要重建方式',
          data: [
            { value: 30, name: 'Billroth-Ⅰ' },
            { value: 20, name: 'Billroth-Ⅱ' },
            { value: 15, name: 'Roux-en-Y' },
            { value: 10, name: '保留幽门的胃大部切除术' },
            { value: 8, name: '近端胃大部切除术' },
            { value: 5, name: '内镜下支架置入' },
            { value: 2, name: 'Devine' }

          ]
        },
        // 30
        {
          type: 3,
          title: '饮酒史',
          data: [
            { value: 80, name: '否' },
            { value: 20, name: '是' }
          ]
        },
        // 31
        {
          type: 3,
          title: '吸烟史',
          data: [
            { value: 70, name: '否' },
            { value: 30, name: '是' }
          ]
        }

      ]
    }
  },

  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  watch: {},
  components: { Pie, StatisticBar },
  created () { },
  mounted () { },
  destroyed () { },
  methods: {
    ...mapMutations(['']),
    changeCol (col) {
      this.sn = col
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.is-active {
  background-color: #eff7ff;
}
.white-bg {
  background: #ffffff;
}
.statistic-analysis-com {
  .model-datas {
    .p0 {
      color: #888a8e;
      font-size: 12px;
      padding: 10px 5px;
      border-radius: 3px;
      margin-bottom: 5px;
    }
    .grid-content {
      padding: 30px 20px;
      border-radius: 5px;
      .p1 {
        font-size: 14px;
        color: #68686a;
        margin-bottom: 5px;
      }
      .d1 > .sn1 {
        font-size: 30px;
        color: #18272d;
        sub {
          font-size: 14px;
        }
      }
      .d1 > .sn2 {
        position: relative;
        i {
          font-style: normal;
        }
      }
      .d-l {
        display: flex;
        .sn2 {
          margin-left: 10px;
          i {
            padding: 10px 20px;
          }
        }
        .sn2 > .i-1::before {
          content: "";
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 100%; /**控制形状**/
          background-color: #c0c4cc; /**控制图标颜色**/
          margin-right: 10px; /**图标与文字距离**/
          position: absolute;
          left: 10px;
          top: 6px;
        }

        .sn2 > .i-2::before {
          content: "";
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 100%; /**控制形状**/
          background-color: #0070f4; /**控制图标颜色**/
          margin-right: 10px; /**图标与文字距离**/
          position: absolute;
          left: 10px;
          top: 21px;
        }
      }
    }
  }
  .model-charts {
    margin-top: 15px;
    .p0 {
      color: #282c31;
      font-size: 18px;
      font-weight: bold;
      padding: 10px 5px;
      border-radius: 3px;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
    }
    .charts-map {
      .grid-content {
        position: relative;
        background: #fff;
        margin-bottom: 15px;
        height: 360px;
        padding: 20px;
        .info-val {
          position: absolute;
          left: 10px;
          bottom: 10px;
          width: 100%;
          display: flex;
          justify-content: center;
          .grid-con {
            font-size: 12px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.statistic-analysis-com {
}
</style>
