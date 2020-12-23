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
    disc: { // true 实心圆 false空心圆
      type: Boolean,
      default: false
    },
    titleLocal: { // 标题位置
      type: String,
      default: 'left'
    },
    labelPosition: { // label 样式 outside center
      type: String,
      default: 'outside'
    },
    data: {
      type: Array,
      default: null
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'pieChart'
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
    },
    sn: {
      type: Number,
      default: 0
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
    data (val) { // 监听数据发生改变 刷新图表数据
      this.initChart()
    },
    sn (val) {
      this.resize()
    }
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'light')

      this.chart.setOption({
        // color: ['#247BCC', '#ff834f', '#a7d7e6'],
        title: {
          text: this.title,
          textStyle: {
            fontSize: 14
          },
          x: this.titleLocal,
          y: 'top'
        },
        tooltip: {
          show: this.labelPosition === 'outside',
          trigger: 'item'
        },
        legend: {
          type: 'scroll',
          icon: 'circle',
          bottom: 10,
          left: 'center',
          height: 'auto',
          data: this.data
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            type: 'pie',
            radius: this.disc ? ['0', '70%'] : ['44%', '70%'],
            avoidLabelOverlap: false,
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true,
              normal: {
                length: 20,
                length2: 30,
                lineStyle: {
                  width: 1
                }
              }
            },
            label: {
              normal: {
                // padding: [30, 30, 30, 30],
                show: this.labelPosition === 'outside',
                position: this.labelPosition, // outside
                formatter:
                  this.labelPosition === 'outside' ? '{a|{b}：{d}%}\n{hr|}'
                    : [
                      '{name|{b}}',
                      '{value|{c}}'
                    ].join('\n'),
                rich: {
                  hr: {
                    backgroundColor: 't',
                    borderRadius: 3,
                    width: 3,
                    height: 3,
                    padding: [3, 3, 0, -12]
                  },
                  a: {
                    padding: [-30, 15, -20, 15]
                  },
                  value: {
                    // color: '#303133',
                    fontSize: 40,
                    fontWeight: 'bold',
                    lineHeight: 40
                  },
                  name: {
                    fontSize: 16,
                    color: '#2B2B2B',
                    lineHeight: 30
                  }
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '16',
                  fontWeight: 'bold'
                }
              }
            },
            data: this.data
          }
        ]
      })
    }
  }
}
</script>
