<template>
  <div :id="id"
       :class="className"
       :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import '../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
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
      default: 'linkageChart'
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
      yData: [],
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
      var data = [{ name: '澳门', value: 10 },
        { name: '香港', value: 1140 },
        { name: '台湾', value: 450 },
        { name: '新疆', value: 760 },
        { name: '宁夏', value: 0 },
        { name: '青海', value: 0 },
        { name: '甘肃', value: 0 },
        { name: '陕西', value: 0 },
        { name: '西藏', value: 0 },
        { name: '云南', value: 30 },
        { name: '贵州', value: 0 },
        { name: '四川', value: 100 },
        { name: '重庆', value: 0 },
        { name: '海南', value: 0 },
        { name: '广西', value: 0 },
        { name: '广东', value: 13 },
        { name: '湖南', value: 10 },
        { name: '湖北', value: 500 },
        { name: '河南', value: 0 },
        { name: '山东', value: 70 },
        { name: '江西', value: 9 },
        { name: '福建', value: 29 },
        { name: '安徽', value: 9 },
        { name: '浙江', value: 0 },
        { name: '江苏', value: 0 },
        { name: '上海', value: 50 },
        { name: '黑龙江', value: 220 },
        { name: '吉林', value: 0 },
        { name: '辽宁', value: 30 },
        { name: '内蒙古', value: 75 },
        { name: '山西', value: 0 },
        { name: '河北', value: 100 },
        { name: '天津', value: 50 },
        { name: '北京', value: 100 }]

      var yData = []

      data.sort(function (o1, o2) {
        if (isNaN(o1.value) || o1.value == null) return -1
        if (isNaN(o2.value) || o2.value == null) return 1
        return o2.value - o1.value
      })

      for (var i = 0; i < 10; i++) {
        yData.push(i + data[i].name)
      }

      this.chart = echarts.init(this.$el)
      this.chart.setOption({
        title: [{
          show: true,
          text: '患者区域分布',
          textStyle: {
            fontSize: 15
          },
          x: '40px',
          y: 'top'
        }],
        tooltip: {
          show: true
        },
        visualMap: {
          type: 'continuous',
          orient: 'horizontal',
          itemWidth: 10,
          itemHeight: 80,
          text: ['高', '低'],
          showLabel: true,
          seriesIndex: [0],
          min: 0,
          // max: 30,
          inRange: {
            color: ['#ffffff', '#0070F4']
          },
          textStyle: {
            color: '#7B93A7'
          },
          bottom: 30,
          left: 'left'
        },
        grid: {
          right: 20,
          top: 50,
          bottom: 50,
          width: '20%'
        },
        xAxis: {
          show: false
        },
        yAxis: {
          type: 'category',
          inverse: true,
          nameGap: 16,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#ddd'
            }
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#ddd'
            }
          },
          axisLabel: {
            interval: 0,
            margin: 85,
            textStyle: {
              color: '#455A74',
              align: 'left',
              fontSize: 14
            },
            rich: {
              a: {
                color: '#fff',
                backgroundColor: '#FAAA39',
                width: 20,
                height: 20,
                align: 'center',
                borderRadius: 2
              },
              b: {
                color: '#fff',
                backgroundColor: '#4197FD',
                width: 20,
                height: 20,
                align: 'center',
                borderRadius: 2
              }
            },
            formatter: function (params) {
              if (parseInt(params.slice(0, 1)) < 3) {
                return [
                  '{a|' + (parseInt(params.slice(0, 1)) + 1) + '}' + '  ' + params.slice(1)
                ].join('\n')
              } else {
                return [
                  '{b|' + (parseInt(params.slice(0, 1)) + 1) + '}' + '  ' + params.slice(1)
                ].join('\n')
              }
            }
          },
          data: yData
        },
        geo: {
          map: 'china',
          roam: false,
          scaleLimit: {
            min: 1,
            max: 2
          },
          left: '15%',
          layoutSize: '60%',
          label: {
            normal: {
              show: !0,
              fontSize: '14',
              color: 'rgba(0,0,0,0.7)'
            }
          },
          itemStyle: {
            normal: {
              // shadowBlur: 50,
              // shadowColor: 'rgba(0, 0, 0, 0.2)',
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: '#f2d5ad',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: [{
          name: '确诊病例',
          type: 'map',
          geoIndex: 0,
          data: data
        }, {
          name: 'barSer',
          type: 'bar',
          roam: false,
          visualMap: false,
          zlevel: 2,
          barMaxWidth: 8,
          barGap: 0,
          itemStyle: {
            normal: {
              color: function (params) {
                // build a color map as your need.
                var colorList = [{
                  colorStops: [{
                    offset: 0,
                    color: '#FFD119' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#FFAC4C' // 100% 处的颜色
                  }]
                },
                {
                  colorStops: [{
                    offset: 0,
                    color: '#00C0FA' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#2F95FA' // 100% 处的颜色
                  }]
                }
                ]
                if (params.dataIndex < 3) {
                  return colorList[0]
                } else {
                  return colorList[1]
                }
              },
              barBorderRadius: 15
            }
          },
          data: data
        }]
      })
    }
  }
}
</script>
