<template>
  <div :id="id"
       :class="className"
       :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    titleLocal: { // 标题位置
      type: String,
      default: 'left'
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'barChart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    title: {
      type: String,
      default: 'chart'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    dataY (val) { // 监听数据发生改变 刷新图表数据
      this.initChart()
    }
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'light')
      this.chart.setOption({
        title: {
          text: this.title,
          textStyle: {
            fontSize: 14
          },
          x: this.titleLocal,
          y: 'top'
        },
        grid: {
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          formatter: function (params) {
            if (params.value.length > 1) {
              return params.seriesName + ' :<br/>' +
                params.value[0] + ' ' +
                params.value[1]
            } else {
              return params.seriesName + ' :<br/>' +
                params.name + ' : ' +
                params.value
            }
          },
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          }
        },
        legend: {
          data: ['female', 'male'],
          left: 'center',
          bottom: 10

        },
        xAxis: [{
          type: 'value',
          scale: true,
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dashed'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          scale: true,
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        }],
        series: [{
          name: 'female',
          type: 'scatter',
          data: [
            [160, 40],
            [155, 60],
            [165, 70],
            [158, 55],
            [162, 62],
            [163, 52],
            [170, 68]
          ]

        },
        {
          name: 'male',
          type: 'scatter',
          data: [
            [180, 40],
            [185, 60],
            [175, 70],
            [168, 55],
            [182, 62],
            [173, 52],
            [163, 68]
          ]

        }
        ]
      })
    }
  }
}
</script>
