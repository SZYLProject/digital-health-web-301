<!-- 结果分析组件 -->
<template>
  <div class="analyze-result-com">
    <!-- 暂时注掉结果分析 -->
    <!-- <el-button size="medium"
               @click="centerDialogVisible=true">
      结果分析
    </el-button> -->
    <el-dialog :visible.sync="centerDialogVisible"
               fullscreen>
      <div slot="title"
           class="dialog-header">
        <span style="font-weight: bold;">结果分析</span>
        <span class="subTitle"> 搜索词 “ {{ keyWordsSearch }} ” </span>
      </div>
      <div class="analyze-result-con">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="module-container">
              <el-row>
                <el-col :span="6"
                        class="con1-text">
                  <p>病人<span style="font-size:14px">/人</span></p>
                  <p><span class="num blue">59,887</span></p>
                </el-col>
                <el-col :span="6"
                        class="con1-text">
                  <p>住院<span style="font-size:14px">/人</span></p>
                  <p><span class="num blue">59,887</span></p>
                </el-col>
                <el-col :span="6"
                        class="con1-text">
                  <p>急诊<span style="font-size:14px">/人</span></p>
                  <p><span class="num blue">59,887</span></p>
                </el-col>
                <el-col :span="6"
                        class="con1-text">
                  <p>门诊<span style="font-size:14px">/人</span></p>
                  <p><span class="num blue">59,887</span></p>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="module-container">
              <el-row>
                <el-col :span="6"
                        class="con1-text">
                  <p>病人<span style="font-size:14px">/份</span></p>
                  <p><span class="num red">59,887</span></p>
                </el-col>
                <el-col :span="6"
                        class="con1-text">
                  <p>住院<span style="font-size:14px">/份</span></p>
                  <p><span class="num red">59,887</span></p>
                </el-col>
                <el-col :span="6"
                        class="con1-text">
                  <p>急诊<span style="font-size:14px">/份</span></p>
                  <p><span class="num red">59,887</span></p>
                </el-col>
                <el-col :span="6"
                        class="con1-text">
                  <p>门诊<span style="font-size:14px">/份</span></p>
                  <p><span class="num red">59,887</span></p>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 患者相关统计 -->
      <div class="analyze-result-con module-container">
        <div class="title">
          <h2>患者相关统计</h2>
        </div>
        <div class="con">
          <el-row>
            <el-col :span="8"
                    style="border-right: 1px solid rgba(43, 134, 178, 0.2);">
              <div class="chartsBar">
                <Pie height="100%"
                     width="100%"
                     title="患者性别分布"
                     titleLocal="center"
                     labelPosition="center"
                     id="7"
                     :data="pieData" />
              </div>
            </el-col>
            <el-col :span="8"
                    style="border-right: 1px solid rgba(43, 134, 178, 0.2);">
              <div class="chartsBar">
                <Pie height="100%"
                     width="100%"
                     titleLocal="center"
                     labelPosition="center"
                     title="患者就诊年龄分布"
                     id="8"
                     :data="pieData" />
              </div>
            </el-col>
            <el-col :span="8">
              <div class="chartsBar">
                <Bar height="100%"
                     width="100%"
                     direction
                     id="9"
                     title="患者入院时间分布"
                     :dataX="checkInDataX"
                     :dataY="checkInDataY" />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 病历相关统计 -->
      <div class="analyze-result-con module-container">
        <div class="title">
          <h2>病历相关统计</h2>
        </div>
        <div class="con">
          <el-row>
            <el-col :span="8"
                    v-for="(item,index) in barList"
                    :key="index">
              <div class="chartsBar">
                <Bar height="100%"
                     width="100%"
                     direction
                     :id="item.id"
                     :title="item.title"
                     :dataX="item.dataX"
                     :dataY="item.dataY" />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Bar from '@/components/Charts/Bar'
import Pie from '@/components/Charts/Pie'
import { mapGetters } from 'vuex'
import { } from '@/api/caseSearch'
export default {
  name: 'analyzeResult',
  data () {
    return {
      centerDialogVisible: false,
      pieData: [],
      checkInDataX: [],
      checkInDataY: [],
      barList: [
        {
          id: '1',
          title: '诊断统计 TOP10',
          dataX: [30, 20],
          dataY: ['糖尿病', '诊断', '诊断', '诊断', '诊断', '诊断', '诊断', '诊断', '诊断', '诊断']
        },
        {
          id: '2',
          title: '症状统计 TOP10',
          dataX: [],
          dataY: []
        },
        {
          id: '3',
          title: '用药统计 TOP10',
          dataX: [],
          dataY: []
        },
        {
          id: '4',
          title: '检验统计 TOP10',
          dataX: [],
          dataY: []
        },
        {
          id: '5',
          title: '检查统计 TOP10',
          dataX: [],
          dataY: []
        },
        {
          id: '6',
          title: '手术统计 TOP10',
          dataX: [],
          dataY: []
        }
      ]
    }
  },
  props: {
    // centerDialogVisible: {
    //   type: Boolean,
    //   default: false
    // }
  },
  computed: {
    ...mapGetters(['userInfo', 'keyWordsSearch', 'keyWordSearchCon'])
  },
  watch: {},
  components: {
    Bar,
    Pie
  },
  created () { },
  mounted () { },
  destroyed () { },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.analyze-result-com {
  .chartsBar {
    height: 350px;
    margin-bottom: 25px;
  }
  .dialog-header {
    font-size: 16px;
    .subTitle {
      margin-left: 10px;
      font-size: 14px;
      color: #a2a2a2;
    }
  }
  .analyze-result-con {
    @include space(top);
  }
  .con1-text {
    text-align: center;
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    .num {
      font-size: 28px;
    }
    .blue {
      color: #0070f4;
    }
    .red {
      color: #ec6941;
    }
    &:not(:last-child) {
      border-right: 1px solid rgba(43, 134, 178, 0.2);
    }
  }
}
</style>
<style lang="scss">
.analyze-result-com {
  .el-dialog {
    background: #eff8fa;
  }
  .el-dialog__header {
    background: #ffffff;
  }
}
</style>
