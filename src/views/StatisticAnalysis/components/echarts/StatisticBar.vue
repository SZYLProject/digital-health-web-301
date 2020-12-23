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
      type: Array,
      default: null
    },
    color: {
      type: Array,
      default: null
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
      let rotate = 0
      const dataX = []
      const datas = []
      if (this.data?.length > 5) { // 根据数据多少判断是否倾斜
        rotate = 45
      } else {
        rotate = 0
      }
      this.data.map(item => {
        dataX.push(item.name)
        datas.push(item.value)
      })
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
        // legend: {
        //   show: true,
        //   type: 'scroll',
        //   icon: 'circle',
        //   left: 'left',
        //   top: 'top',
        //   data: dataX
        // },
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
          bottom: '0%',
          top: '18%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: dataX,
          axisLine: {
            lineStyle: {
              color: '#f1f1f1'
            }
          },
          axisLabel: {
            color: '#6e6e6e',
            rotate: rotate
          },
          axisTick: {
            show: false
          },
          axisPointer: {
            show: true
          }
        },
        yAxis: {
          type: 'value',
          name: '人数',
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
        series: [{
          data: datas,
          type: 'bar',
          showBackground: false,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }],
        color: this.color
      }
      this.chart = echarts.init(this.$el)
      this.chart.setOption(option)
    }
  }
}
</script>
