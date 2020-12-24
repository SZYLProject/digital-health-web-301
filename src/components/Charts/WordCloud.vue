<template>
  <div :id="id"
       :class="className"
       :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
require('echarts-wordcloud')

export default {
  mixins: [resize],
  props: {

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
      default: 'wordcloud'
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
      const colorList = [
        '#4CCCA1',
        '#0070F4',
        'rgb(18,102,201)',
        'rgb(21,122,214)',
        'rgb(25,140,220)',
        'rgb(29,161,223)',
        'rgb(32,180,226)',
        'rgb(37,205,231)'
      ]
      this.chart = echarts.init(this.$el)
      this.chart.setOption({

        // tooltip: {
        //   show: false,
        //   backgroundColor: '#fff',
        //   axisPointer: {
        //     type: 'none'
        //   },
        //   textStyle: {
        //     color: '#565656',
        //     lineHeight: 28
        //   },
        //   padding: 12,
        //   extraCssText: 'box-shadow: 0px 2px 8px 0px #cacaca;border-radius: 4px;opacity: 0.9;',
        //   formatter: function (p) {
        //     return `热度：${p.data.count}<br/>趋势：${(
        //       p.data.heat_diff_num * 100
        //     ).toFixed(2)}%`
        //   }
        // },
        series: [{
          type: 'wordCloud',
          // The shape of the "cloud" to draw. Can be any polar equation represented as a
          // callback function, or a keyword present. Available presents are circle (default),
          // cardioid (apple or heart shape curve, the most known polar equation), diamond (
          // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.
          shape: 'circle',
          // A silhouette image which the white area will be excluded from drawing texts.
          // The shape option will continue to apply as the shape of the cloud to grow.

          // maskImage: maskImage,

          // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
          // Default to be put in the center and has 75% x 80% size.

          left: 'center',
          top: 'top',
          // width: '80%',
          // height: '80%',
          right: null,
          bottom: null,
          // Text size range which the value in data will be mapped to.
          // Default to have minimum 12px and maximum 60px size.

          sizeRange: [14, 28],

          // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

          rotationRange: [0, 0],

          // size of the grid in pixels for marking the availability of the canvas
          // the larger the grid size, the bigger the gap between words.

          gridSize: 25,

          // set to true to allow word being draw partly outside of the canvas.
          // Allow word bigger than the size of the canvas to be drawn
          drawOutOfBound: false,

          // Global text style
          textStyle: {
            normal: {
              fontFamily: 'sans-serif',
              color: function () {
                const index = Math.floor(Math.random() * colorList.length)
                return colorList[index]
              }
            },
            emphasis: {
              fontWeight: 'bold'
            }
          },
          data: this.data
        }]
      })
    }
  }
}
</script>
