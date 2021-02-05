<template>
  <div class="patient-overview">
    <div class="overview"
         v-if="!this.show">
      <div class="title">
        <h2><i class="iconfont icon-huanzhexinxi"
             :style="{'color': theme}"></i>患者概览</h2>
        <span class="right pointer"
              @click="show3 = !show3">
          <i class="el-icon-arrow-up"
             style="margin-top:8px"
             :class="{ 'arrowTransform': !show3, 'arrowTransformReturn': show3}"></i></span>
      </div>
      <el-collapse-transition>
        <div class="overview-con con"
             v-show="show3">
          <div :class="{'dynamicWidth':more}">
            <div class="con-block  inlineBlock"
                 v-for="(item,index) in overViewData"
                 :key="index">
              <p><b>{{item.name}}</b></p>
              <span>{{item.value}}</span>
            </div>
          </div>
          <el-button type="text"
                     class="more"
                     @click="more = !more">查看更多</el-button>
        </div>
      </el-collapse-transition>
    </div>
    <div class="timeLine">
      <div class="title">
        <h2><i class="iconfont icon-shijian1"
             :style="{'color': theme}"></i>患者时间轴</h2>
        <div class="right">
          <span v-for="(v,index) in types"
                :key="index">
            <i class="iconfont icon-yuandianxiao"
               :style="{'color': v.color}" />{{v.name}}</span>
          <el-date-picker v-model="timeValue"
                          size="small"
                          type="daterange"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          style="width:250px;margin-left:15px;">
          </el-date-picker>

        </div>
      </div>
      <div class="con">
        <div style="width:100%;">
          <!-- 联动360全图 -->
          <Linkage height="500px"
                   width="100%"
                   :dataOne="timeAxisOne"
                   :dataTwoY="timeAxisTwo.yAxis"
                   :dataTwoX="timeAxisTwo.xAxis"
                   :timeValue="timeValue"
                   v-if="!this.show" />
          <!-- 360时间轴 -->
          <TimeAxis height="100px"
                    width="100%"
                    :data="timeAxisOne"
                    :timeValue="timeValue"
                    v-else />
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import { getPersonOverViewInfo, getTimeAxisPartOneInfo, getTimeAxisPartTwoInfo } from '@/api/view360'
import Linkage from '@/components/Charts/Linkage'
import TimeAxis from '@/components/Charts/TimeAxis'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'Overview',
  computed: {
    ...mapGetters(['theme', 'dataSourceValue'])
  },
  props: ['show'],
  components: {
    TimeAxis, Linkage
  },
  data () {
    return {
      types: [
        { name: '门诊', color: '#25a289' },
        { name: '住院', color: '#0070f4' },
        { name: '急诊', color: '#5507d7' }
      ],
      personId: this.$route.params.personId,
      overViewData: null,
      timeAxisOne: null,
      timeAxisTwo: {
        xAxis: null,
        yAxis: null
      },
      more: true,
      show3: true,
      timeValue: []
    }
  },
  created () {
    this.getOverViewInfo()
    this.timeAxisPartOne()
    this.timeAxisPartTwo()
  },
  methods: {
    // 时间轴
    timeAxisPartOne () {
      getTimeAxisPartOneInfo(this.personId).then(res => {
        const list = []
        res.obj.forEach(item => {
          const colorArr = this.types.filter((v) => item.type === v.name)
          if (item.start === item.end) {
            item.end = parseInt(item.end) + 24 * 60 * 60 - 1
          }
          list.push({
            name: item.type,
            value: [
              0,
              new Date(parseInt(item.start) * 1000),
              new Date(parseInt(item.end) * 1000),
              moment(parseInt(item.start) * 1000).format('YYYY/MM/DD') + '至' + moment(parseInt(item.end) * 1000).format('YYYY/MM/DD')
            ],
            itemStyle: {
              normal: {
                color: colorArr[0].color
              }
            }
          })
        })
        this.timeAxisOne = list
      }).catch(() => { })
    },
    // 点阵图
    timeAxisPartTwo () {
      const data = {
        id: this.dataSourceValue?.id ?? 0,
        personId: this.personId
      }
      getTimeAxisPartTwoInfo(data).then(res => {
        this.timeAxisTwo.yAxis = Object.values(res.obj.yAxis)
        res.obj.xAxis.map(item => {
          item[1] = res.obj.yAxis[item[1]]
        })
        this.timeAxisTwo.xAxis = res.obj.xAxis
      }).catch(() => { })
    },
    // 获得概览信息
    getOverViewInfo () {
      const data = {
        id: this.dataSourceValue?.id ?? 0,
        personId: this.personId
      }
      getPersonOverViewInfo(data).then(res => {
        const list = []
        if (res.obj.data && JSON.stringify(res.obj.fields) !== '{}') {
          const data = res.obj.data
          const fields = res.obj.fields
          for (const key in fields) {
            if (fields[key]) {
              list.push({
                name: fields[key],
                value: data[key] || '无'
              })
            }
          }
        }
        this.overViewData = list
      }).catch(() => { })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.patient-overview {
  color: #333333;
  .overview {
    @include space(bottom);
    background: #ffffff;
  }
  .title {
    padding: 12px 20px;
    border-bottom: 1px solid #dadada;
    position: relative;

    h2 {
      font-size: 16px;
      font-weight: 700;
    }
    .right {
      position: absolute;
      right: 15px;
      top: 8px;
      font-size: 14px;
      i {
        margin-left: 5px;
        vertical-align: middle;
      }
    }
    .iconfont {
      font-size: 20px;
      margin-right: 5px;
    }
  }
  .con {
    padding: 10px 15px;
  }

  .overview-con {
    position: relative;
    padding-bottom: 15px;
    .more {
      position: absolute;
      right: 15px;
      bottom: 0;
    }
    .con-block {
      margin: 0 10px 10px;
      vertical-align: top;
    }
    .dynamicWidth {
      height: 50px;
      overflow: hidden;
    }
  }
  .arrowTransform {
    transition: 0.2s;
    transform-origin: center;
    transform: rotateZ(180deg);
  }
  .arrowTransformReturn {
    transition: 0.2s;
    transform-origin: center;
    transform: rotateZ(0deg);
  }
  .timeLine {
    @include space(bottom);
    background: #ffffff;
  }
}
</style>
