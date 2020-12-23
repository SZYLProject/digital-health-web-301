<!-- 项目进度模块 -->
<template>
  <div class="project-schedule-com">
    <div class="module-container-two">
      <div class="title" style="border: none">
        <h1>
          项目进度<span class="sub">（筛选患者数 <i style="color: #0070f4">5</i>）</span>
        </h1>
      </div>
    </div>
    <!--环状模块 -->
    <el-row :gutter="15" style="margin-bottom: 15px">
      <el-col :span="8">
        <div class="schedule-con1">
          <table width="100%" height="100%">
            <tr>
              <td>
                <img src="@/assets/img1.png" alt="" class="img inlineBlock" />
                <div class="n1 inlineBlock">
                  <p>今日完成</p>
                  <p class="green num">25</p>
                </div>
              </td>
              <td>
                <p>今日失访</p>
                <p class="green num">36</p>
              </td>
              <td>
                <p>今日终止</p>
                <p class="green num">98</p>
              </td>
            </tr>
            <tr>
              <td>
                <img src="@/assets/img2.png" alt="" class="img inlineBlock" />
                <div class="n1 inlineBlock">
                  <p>今日完成</p>
                  <p class="blue num">25</p>
                </div>
              </td>
              <td>
                <p>今日失访</p>
                <p class="blue num">36</p>
              </td>
              <td>
                <p>今日终止</p>
                <p class="blue num">98</p>
              </td>
            </tr>
            <tr>
              <td>
                <img src="@/assets/img3.png" alt="" class="img inlineBlock" />
                <div class="n1 inlineBlock">
                  <p>今日完成</p>
                  <p class="orange num">25</p>
                </div>
              </td>
              <td>
                <p>今日失访</p>
                <p class="orange num">36</p>
              </td>
              <td>
                <p>今日终止</p>
                <p class="orange num">98</p>
              </td>
            </tr>
          </table>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="schedule-con1">
          <div class="title">
            <span class="t">患者总体进度</span>
            <el-button
              type="text"
              class="circle-excel-button"
              @click.native="downLoadExcel(1)"
              >下载excel统计表</el-button
            >
          </div>

          <Pie
            height="300px"
            width="100%"
            title=""
            id="1"
            titleLocal="40px"
            labelPosition="center"
            :data="circleData1"
            label
          />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="schedule-con1">
          <div class="title">
            <span class="t">随访总体进度</span>
            <el-button
              type="text"
              class="circle-excel-button"
              @click.native="downLoadExcel(2)"
              >下载excel统计表</el-button
            >
          </div>
          <Pie
            height="300px"
            width="100%"
            title=""
            id="1"
            titleLocal="40px"
            labelPosition="center"
            :data="circleData2"
            label
          />
        </div>
      </el-col>
    </el-row>
    <!-- 柱状模块 -->
    <div class="model-bar">
      <div class="module-container-two" v-for="(item, index) in 2" :key="index">
          <div class="title">
            <h2>
              分组 {{ index + 1}}<span class="sub"
                >（筛选患者数 <i style="color: #0070f4"> {{ index + 3 }}</i
                >）</span
              >
            </h2>
          </div>
        <div class="model-bar-chart">
          <el-row :gutter="20">
            <el-col :xs="24" :md="12">
              <div class="grid-content grid-left">
                <axis-bar height="300px"
                    width="100%"
                    id="3"
                    :titleShow="true"
                    title="基线数据"
                    :data="data1"/>
                <el-button
                  type="text"
                  class="bar-excel-button"
                  @click.native="downLoadExcel(1)"
                  >下载excel统计表</el-button
                >
              </div>
            </el-col>
            <el-col :xs="24" :md="12" style="border-left:1px solid #e9e9e9;">
              <div class="grid-content grid-center">
                <el-dropdown trigger="click" class="el-drop pointer">
                  <span class="el-dropdown-link">
                    {{ stageVal }}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(item, index) in selectData"
                      @click.native="drownItem(item)"
                      :key="index"
                      >{{ item.name }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
                 <axis-bar height="300px"
                    width="100%"
                    id="11"
                    :titleShow="false"
                    :data="data2"/>
                <el-button
                  type="text"
                  class="bar-excel-button"
                  @click.native="downLoadExcel(2)"
                  >下载excel统计表</el-button
                >
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <!-- 录入员任务完成情况 -->

    <div class="module-container-two">
      <div class="title">
        <h2><i class="iconfont icon-yonghuming"></i>录入员任务完成情况<span class="sub">（共 <i style="color: #0070f4">1</i> 位）</span></h2>
      </div>
      <div class="page-form">
        <el-table
          :data="tableData"
          style="margin: 5px 0px"
          header-cell-class-name="tableTH"
          max-height="630"
          stripe
        >
          <!-- 成员 -->
          <el-table-column prop="name" label="成员" width="150"> </el-table-column>
          <!--  -->
          <el-table-column label="基线数据表单" align="center">
            <el-table-column prop="commitData" label="已提交"></el-table-column>
          </el-table-column>
          <el-table-column label="随访阶段表单" align="center">
            <el-table-column prop="looseS" label="已失访" width="300"> </el-table-column>
            <el-table-column prop="stopA" label="已终止" width="300"> </el-table-column>
            <el-table-column prop="commitDatas" label="已提交" width="300">
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Pie from '@/components/Charts/Pie'
import AxisBar from '@/components/Charts/AxisBar'

import {} from '@/api/caseSearch'
export default {
  name: 'ProjectScheduleCom',
  components: { Pie, AxisBar },
  data () {
    return {
      formData: [
        {
          title1: '今日完成',
          num1: 10,
          title2: '今日失访',
          num2: 15,
          title3: '今日终止',
          num3: 25
        },
        {
          title1: '本周完成',
          num1: 100,
          title2: '本周失访',
          num2: 150,
          title3: '本周终止',
          num3: 250
        },
        {
          title1: '本月完成',
          num1: 1000,
          title2: '本月失访',
          num2: 1500,
          title3: '本月终止',
          num3: 2500
        }
      ],
      circleData1: [
        { value: 435, name: '录入中' },
        { value: 310, name: '已完成' }
      ],
      color1: ['#16bbd0', '#22b678'],
      circleData2: [
        { value: 435, name: '未开始' },
        { value: 310, name: '待录入' },
        { value: 435, name: '录入中' },
        { value: 310, name: '已提交' },
        { value: 310, name: '已终止' }
      ],
      color2: ['#e0e0e0', '#178fff', '#16bbd0', '#22b678', '#ff796a'],
      data1: {
        name: ['待录入', '录入中', '已提交'],
        color: ['#178fff', '#16bbd0', '#22b678'],
        allData: [
          {
            title: '随访点',
            value: ['602', '820', '320']
          }
        ]
      },
      data2: {
        name: [
          '未开始',
          '待录入',
          '录入中',
          '已提交',
          '已提交（失访）',
          '已提交（终止）'
        ],
        color: ['#e0e0e0', '#178fff', '#16bbd0', '#22b678', '#f5b254', '#ff796a'],
        allData: [
          {
            title: '随访点1',
            value: [320, 302, 301, 334, 390, 330]
          },
          {
            title: '随访点2',
            value: [420, 332, 501, 234, 190, 230]
          },
          {
            title: '随访点3',
            value: [720, 382, 591, 534, 490, 330]
          }
        ]
      },
      selectData: [
        {
          name: '阶段1',
          id: 1
        },
        {
          name: '阶段2',
          id: 2
        },
        {
          name: '阶段3',
          id: 3
        },
        {
          name: '阶段4',
          id: 4
        },
        {
          name: '阶段5',
          id: 5
        },
        {
          name: '阶段6',
          id: 6
        }
      ],
      stageVal: '阶段1',
      tableData: [
        {
          name: '王小虎1',
          commitData: '10',
          looseS: '10',
          stopA: '99',
          commitDatas: '3'
        },
        {
          name: '王小虎2',
          commitData: '20',
          looseS: '10',
          stopA: '88',
          commitDatas: '30'
        },
        {
          name: '王小虎3',
          commitData: '10',
          looseS: '10',
          stopA: '88',
          commitDatas: '43'
        },
        {
          name: '王小虎4',
          commitData: '10',
          looseS: '10',
          stopA: '33',
          commitDatas: '31'
        }
      ]
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  watch: {},

  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    ...mapMutations(['']),
    downLoadExcel (num) {
      this.$message({
        message: '下载Excel',
        type: 'success'
      })
    },
    drownItem (item) {
      this.stageVal = item.name
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.is-active {
  background-color: #eff7ff;
}

.green {
  color: #4ccca1;
}
.blue {
  color: #0070f4;
}
.orange {
  color: #ff9540;
}
.project-schedule-com {
  .schedule-con1 {
    background: #ffffff;
    padding: 20px;
    height: 350px;
    .title {
      position: relative;
      padding-left: 10px;
      .circle-excel-button {
        position: absolute;
        right: 0;
        top: -10px;
      }
      .t::before {
        content: "";
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 100%; /**控制形状**/
        background-color: #0070f4; /**控制图标颜色**/
        margin-right: 10px; /**图标与文字距离**/
        position: absolute;
        left: -5px;
        top: 6px;
      }
    }

    .img {
      vertical-align: middle;
    }
    .n1 {
      vertical-align: middle;
      margin-left: 15px;
    }
    .num {
      margin-top: 5px;
      font-size: 22px;
      font-weight: 700;
    }
    table > tr {
      > td {
        text-align: center;
        border-right: 1px solid rgba(230, 230, 230, 0.5);
        border-bottom: 1px solid rgba(230, 230, 230, 0.5);
        color: #666666;
        &:last-child {
          border-right: none;
        }
      }
      &:last-child {
        > td {
          border-bottom: none;
        }
      }
    }
  }

  //
  .model-bar {
    .model-bar-chart {
      .grid-content {
        position: relative;
        // border: solid 1px #e3e8ee;
        height: 350px;
        background: #ffffff;
        // margin-top: 5px;
        // border-radius: 3%;
        padding: 25px;
        .bar-excel-button {
          position: absolute;
          right: 25px;
          top: 10px;
          font-size: 16px;
        }
      }
    }
  }
}

</style>
<style lang="scss">
.project-schedule-com {
}
</style>
