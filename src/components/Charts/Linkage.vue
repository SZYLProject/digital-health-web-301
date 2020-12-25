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
    dataTwoX: {
      type: Array,
      default: null
    },
    dataTwoY: {
      type: Array,
      default: null
    },
    dataOne: {
      type: Array,
      default: null
    },
    timeValue: {
      type: Array,
      default: null
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'linkageChart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  watch: {
    dataOne (val) { // 监听数据发生改变 刷新图表数据
      this.initChart()
    },
    timeValue (val) { // 监听数据发生改变 刷新图表数据
      this.initChart()
    },
    dataTwoY (val) { // 监听数据发生改变 刷新图表数据
      this.initChart()
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
  methods: {
    initChart () {
      function renderItem (params, api) {
        var start = api.coord([api.value(1), 0])
        var end = api.coord([api.value(2), 0])
        var height = api.size([0, 1])[1] * 1.2

        var rectShape = echarts.graphic.clipRectByRect({
          x: start[0],
          y: start[1] - height / 2,
          width: end[0] - start[0],
          height: height
        }, {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height
        })

        return rectShape && {
          type: 'rect',
          shape: rectShape,
          style: api.style()
        }
      }
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        tooltip: {
          formatter: function (params) {
            const val = params.value[3] ? params.value[3] : params.value[2]
            return params.marker + params.name + '<br />' + val
          },
          backgroundColor: '#fff',
          borderColor: '#ddd',
          borderWidth: 1,
          textStyle: {
            color: '#333333'

          },
          padding: 10
        },
        // title: {
        //   text: 'Profile',
        //   left: 'center'
        // },
        // toolbox: {
        //   show: true,
        //   left: 0,
        //   feature: {
        //     restore: { show: true }
        //   }
        // },
        dataZoom: [{
          type: 'slider',
          xAxisIndex: [0, 1],
          top: 70,
          height: 20,
          handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '120%'
        }, {
          xAxisIndex: [0, 1],
          type: 'inside'
        }],
        grid: [{
          show: true,
          backgroundColor: 'rgba(43,134,178,0.05)',
          borderWidth: 0,
          left: 60,
          right: 40,
          top: 10,
          height: 50
        }, {
          left: 60,
          right: 40,
          // height: 240,
          top: 150
        }],
        xAxis: [{
          gridIndex: 0,
          scale: true,
          boundaryGap: false,
          type: 'time',
          splitNumber: 10,
          minInterval: 1,
          minorTick: {
            show: true,
            splitNumber: 10,
            lineStyle: {

            }
          },
          axisTick: {
            show: true,
            inside: true

          },
          // 网格样式
          splitLine: {
            show: true
          },
          min: this.timeValue.length > 0 ? this.timeValue[0] : null,
          max: this.timeValue.length > 0 ? this.timeValue[1] : null
        }, {
          show: false,
          type: 'time',
          gridIndex: 1,
          scale: true,
          boundaryGap: false,
          min: this.timeValue.length > 0 ? this.timeValue[0] : null,
          max: this.timeValue.length > 0 ? this.timeValue[1] : null
        }
        ],
        yAxis: [{
          show: false,
          gridIndex: 0
          // data: ['categoryA']
        },
        {
          name: '检验检查',
          nameTextStyle: {
            padding: [3, 4, 5, -56],
            fontSize: 14,
            fontWeight: 'bold'
          },
          // show: false,
          gridIndex: 1,
          type: 'category',
          data: this.dataTwoY,
          axisTick: { alignWithLabel: true },
          splitLine: {
            show: true
          }
        }],
        series: [{
          xAxisIndex: 0,
          yAxisIndex: 0,
          type: 'custom',
          renderItem: renderItem,
          itemStyle: {
            opacity: 0.8
          },
          encode: {
            x: [1, 2],
            y: 0
          },
          data: this.dataOne
        },
        {
          xAxisIndex: 1,
          yAxisIndex: 1,
          type: 'scatter',
          itemStyle: {
            color: '#0070f4'
          },
          data: this.dataTwoX
        }
        ]
      })
    }
  }
}
</script>
