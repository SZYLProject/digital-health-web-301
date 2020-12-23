<template>
  <div :id="id"
       :class="className"
       :style="{height:height, width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    direction: { // 横向还是纵向
      type: Boolean,
      default: false
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
    titleShow: { // 标题显示
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: 'chart'
    },
    data: { //  所有的数据
      type: Object
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
    }
  },
  methods: {
    initChart () {
      const option = {
        title: {
          show: this.titleShow,
          text: this.title,
          textStyle: {
            fontSize: 14
          },
          left: 'left',
          top: 'top'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          type: 'scroll',
          icon: 'circle',
          left: 'center',
          top: 'bottom',
          data: []
        },
        toolbox: {
          show: false,
          orient: 'horizontal',
          feature: {
            magicType: {
              type: ['line', 'bar']
            },
            restore: { show: true },
            saveAsImage: { show: true }
          },
          bottom: 15,
          right: 20
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          top: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          data: this.dataY,
          axisLine: {
            lineStyle: {
              color: '#f1f1f1'
            }
          },
          axisLabel: {
            color: '#6e6e6e'
          },
          axisTick: {
            show: false
          },
          axisPointer: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          name: '',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#f1f1f1'
            }
          },
          axisLabel: {
            color: '#6e6e6e'
          },
          axisTick: {
            show: false
          },
          nameTextStyle: {
            color: '#6e6e6e'
          },
          splitLine: {
            show: false
          }
        },
        color: [],
        series: []
      }
      option.legend.data = this.data.name
      option.color = this.data.color
      this.data.allData.map(item => {
        option.yAxis.data.push(item.title)
        item.value.map((ele, idx) => {
          option.series.push({
            name: this.data.name[idx],
            type: 'bar',
            barWidth: '20%',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          })
        })
        item.value.map((eles, i) => {
          option.series[i].data.push(eles)
        })
      })
      this.chart = echarts.init(this.$el)
      this.chart.setOption(option)
      // this.chart.on('click', function (params) {
      //   console.log(params.value)
      // })
      // this.chart.on('legendselectchanged', function (params) {
      //   console.log(params)
      // })
    }
  }
}
</script>
