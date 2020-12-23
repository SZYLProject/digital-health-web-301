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
    id: {
      type: String,
      default: 'lineChart'
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array,
      required: true
    },
    dataX: {
      type: Array,
      required: true
    },
    color: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler (val) {
        this.setOptions(val)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'light')
      this.setOptions(this.chartData)
    },
    setOptions (x) {
      this.chart.setOption({
        title: {
          text: '近一个月活动发布',
          left: '10px',
          top: '0',
          textStyle: {
            color: '#999',
            fontSize: 14,
            fontWeight: '400'
          }
        },
        color: this.color,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            },
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        grid: {
          left: '25',
          right: '25',
          bottom: '24',
          top: '75',
          containLabel: true
        },
        legend: {
          data: ['累计导入病例数', '本周新入病例数'],
          orient: 'horizontal',
          icon: 'circle',
          show: false,
          right: 270,
          top: 0
        },
        xAxis: {
          type: 'category',
          data: this.dataX,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#999',
            textStyle: {
              fontSize: 12
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#F3F4F4'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [{
          name: '累计导入病例数',
          type: 'line',
          smooth: true,
          data: this.chartData[0]
        },
        {
          name: '本周新入病例数',
          type: 'line',
          smooth: true,
          data: this.chartData[1]
        }
        ]
      })
    }
  }
}
</script>
