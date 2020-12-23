<template>
  <div class="statisticAnalysis-com">
    <div class="left inlineBlock">
      <LeftDrag />
    </div>
    <div class="right inlineBlock">
      <div class="tab">
        <!-- tab切换 -->
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane v-for="(item,index) in tabList"
                       :key="index"
                       :label="item"
                       :name="item">
            <div class="tab-con">
              <h1>{{activeName}}<span>描述数据特征</span></h1>
              <div id="variable"
                   class="drag">

                <p>任意变量</p>
                <div style="margin-top:10px;min-height:50px">
                  <draggable animation=1000
                             touchStartThreshold='10px'
                             :list="variableList"
                             group="variable"
                             ghostClass="ghost"
                             chosenClass="ghost"
                             @change="toChange">

                    <el-button size="small"
                               v-for="(item,index) in variableList"
                               :key="index">{{item.name}}</el-button>

                  </draggable>
                </div>
              </div>
              <div class="tab-foot">
                <div>您可拖入<span class="blue">5</span>个变量</div>
                <div>
                  <el-button type="text"
                             icon="el-icon-delete">清空条件</el-button>
                  <el-button type="primary"
                             size="medium">搜索</el-button>
                </div>
              </div>

            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="describe-block">
        <h1>Age的描述性统计</h1>
        <el-table :data="tableData"
                  header-cell-class-name="tableTH">
          <el-table-column prop="col1"
                           label="有效频数（%）">
          </el-table-column>
          <el-table-column prop="col2"
                           label="缺失值（%）">
          </el-table-column>
          <el-table-column prop="col3"
                           label="均值">
          </el-table-column>
          <el-table-column prop="col4"
                           label="标准差">
          </el-table-column>
          <el-table-column prop="col5"
                           label="最小值">
          </el-table-column>
          <el-table-column prop="col6"
                           label="Q1">
          </el-table-column>
          <el-table-column prop="col7"
                           label="中间位">
          </el-table-column>
          <el-table-column prop="col8"
                           label="Q3">
          </el-table-column>
          <el-table-column prop="col9"
                           label="最大值">
          </el-table-column>
          <!-- <el-table-column prop="col10"
                           label="Sha piro-Wilk正态性">
          </el-table-column> -->
        </el-table>
        <div class="text">
          <p><b>统计结果说明: </b></p>
          <p>1、Shapiro-Wilk正态性检验：Shapiro-Wilk正态性检验的P值>0.05，接受原假设，说明Age变量服从正态分布。通常适用于样本量小于2000的情况。<br>
            2、Kolmogorov-Smirnov正态性检验：Kolmogorov-Smirnov正态性检验的P值= 0.05，拒绝原假设，说明Age变量不服从正态分布。通常适用于样本量大于2000的情况。</p>
        </div>
        <div class="describe-chart">
          <div class="chartsBar">
            <VerticalAxisBar height="400px"
                             width="100%"
                             id="3"
                             :titleShow="true"
                             title="Smoking history在不同Gender分组中的堆积柱形图"
                             :data="data1" />
          </div>
          <el-row>
            <el-col :span="12">
              <div class="chartsBar">
                <Bar height="400px"
                     width="100%"
                     id="9"
                     titleLocal="left"
                     title="Age频数直方图"
                     :dataX="barDataX"
                     :dataY="barDataY" />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="chartsBar">
                <Pie height="400px"
                     width="100%"
                     title="Drinking History 频数饼图"
                     titleLocal="left"
                     labelPosition="center"
                     id="7"
                     :data="pieData" />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
// 导入draggable组件
import draggable from 'vuedraggable'
import LeftDrag from './LeftDrag' //
import Pie from '@/components/Charts/Pie'
import Bar from '@/components/Charts/Bar'
import VerticalAxisBar from '@/components/Charts/VerticalAxisBar'
export default {
  name: 'StatisticAnalysisCom',
  components: { LeftDrag, Pie, Bar, VerticalAxisBar, draggable },
  props: ['sureFormList'],
  data () {
    return {
      variableList: [],
      variableList1: [],
      activeName: '描述性统计',
      tabList: ['描述性统计', '单因素分析', '相关分析', '多因素回归', '生存分析'],
      tableData: [
        {
          col1: '200(100%)',
          col2: '0(0.0%)',
          col3: '45.31',
          col4: '11.04',
          col5: '17.00',
          col6: '38.00',
          col7: '45.00',
          col8: '53.25',
          col9: '73.00'
        }
      ],
      pieData: [
        { value: 435, name: '是' },
        { value: 310, name: '否' }
      ],
      barDataY: [123, 456, 1102, 4230, 3520, 1102, 123],
      barDataX: [17, 28, 45, 88, 100, 200, 300],
      data1: {
        name: [
          '待录入',
          '录入中',
          '已提交'
        ],
        color: ['rgba(0,112,244,0.5)', 'rgba(76,204,161,0.5)', 'rgba(255,149,64,0.5)'],
        allData: [
          {
            title: '合计',
            value: [320, 302, 301]
          },
          {
            title: '合计',
            value: [420, 332, 501]
          },
          {
            title: '合计',
            value: [10, 382, 591]
          },
          {
            title: '合计',
            value: [420, 332, 501]
          },
          {
            title: '合计',
            value: [10, 382, 591]
          },
          {
            title: '合计',
            value: [420, 332, 501]
          },
          {
            title: '合计',
            value: [420, 332, 501]
          },
          {
            title: '合计',
            value: [420, 332, 501]
          }
        ]
      }

    }
  },
  methods: {
    // tab 切换
    handleClick (tab, event) {
      this.activeName = tab.name
    },
    // 拖拽
    toChange (v) {
      if (v.added) {
        console.log(v)
        // this.variableList.push({
        //   name: '1'
        // })
      }
      console.log(this.variableList)
    },
    toChange1 (v) {
      console.log(v)
    }
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.statisticAnalysis-com {
  .left {
    width: 240px;
    vertical-align: top;
    margin-right: 15px;
  }
  .right {
    vertical-align: top;
    width: calc(100% - 255px);
    .tab {
      background: #ffffff;
    }
    .tab-con {
      padding: 0 20px 15px;
      h1 {
        font-size: 18px;
        color: #333333;
        span {
          font-size: 12px;
          color: #999999;
          margin-left: 10px;
        }
      }
      .drag {
        background: #f1f8ff;
        border: 1px solid #e6e6e6;
        margin: 15px 0 5px;
        padding: 10px 15px;
        color: #999999;
      }
      .tab-foot {
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        color: #999999;
        .blue {
          margin: 0 5px;
          color: #0070f4;
        }
      }
    }
    .describe-block {
      background: #ffffff;
      margin-top: 15px;
      padding: 15px 20px;
      h1 {
        font-size: 18px;
        color: #333333;
      }
      .text {
        color: #666666;
        line-height: 25px;
        padding-bottom: 10px;
      }
      .describe-chart {
        border-top: 1px solid #e6e6e6;
        padding: 15px 0;
      }
    }
  }
}
// .ghost {
//   display: flex;
//   justify-content: space-between;
//   line-height: 35px;
//   margin: 10px 0;
//   .button {
//     border: 1px dashed #e6e6e6;
//     width: 155px;
//     overflow: hidden;
//     padding: 0 5px;
//     margin-right: 10px;
//     .iconfont {
//       color: #0070f4;
//       margin-right: 5px;
//     }
//   }
// }
</style>
<style lang="scss">
.statisticAnalysis-com {
  .right {
    .el-tabs__nav-wrap {
      padding: 0 20px;
      line-height: 48px;
    }
    .el-tabs__nav-wrap::after {
      height: 1px;
    }
  }
}
</style>
