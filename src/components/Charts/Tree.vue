<template>
<div :id="id"
         :class="className"
         :style="{'height':height,width:width}" >
</div>

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
    },
    treeID: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      yData: [],
      chart: null,
      data1: {
        name: 'flare',
        id: 0,
        children: [
          {
            name: 'flexF',
            id: 1,
            children: [
              {
                name: 'FlareVis',
                id: 2,
                children: [
                  {
                    name: 'IScaleMap',
                    id: 3,
                    value: 2105

                  },
                  {
                    name: 'LinearScale',
                    id: 4,
                    value: 1316
                  },
                  {
                    name: 'LogScale',
                    id: 5,
                    value: 3151
                  }
                ]
              }
            ]
          },
          {
            name: 'scale',
            id: 6,
            children: [
              {
                name: 'IScaleMap',
                id: 7,
                value: 2105
              },
              {
                name: 'LinearScale',
                id: 8,
                value: 1316
              },
              {
                name: 'LogScale',
                id: 9,
                value: 3151
              }
            ]
          },
          {
            name: 'display',
            id: 10,
            children: [
              {
                name: 'DirtySprite',
                id: 11,
                value: 8833
              }
            ]
          }
        ]
      },
      ids: 0
    }
  },
  watch: {
    treeID (val) {
      if (val) {
        if (this.ids !== 0) {
          const _len = this.data1.children
          for (let i = 0; i < _len.length; i++) {
            if (this.ids === _len[i].id) {
              _len.splice(i, 1)
              this.initChart()
              break
            } else {
              const _lenChildren = _len[i].children
              for (let j = 0; j < _lenChildren.length; j++) {
                if (this.ids === _len[i].children[j].id) {
                  _len[i].children.splice(j, 1)
                  this.initChart()
                  break
                } else {
                  const _lenChildrenChi = _len[i].children[j].children
                  if (_lenChildrenChi) {
                    for (let k = 0; k < _lenChildrenChi.length; k++) {
                      if (this.ids === _len[i].children[j].children[k].id) {
                        _len[i].children[j].children.splice(k, 1)
                        this.initChart()
                        break
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
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
      this.chart = echarts.init(this.$el)
      this.chart.setOption({
        // tooltip: {
        //   trigger: 'item',
        //   triggerOn: 'mousemove'
        // },

        series: [
          {
            type: 'tree',
            name: 'tree1',
            top: '1%',
            left: '10%',
            data: [this.data1],
            itemStyle: { // 设置边框的属性
              normal: {
                color: '#40b2f8',
                borderWidth: 0
              }
            },
            label: { // 内容位置等属性
              normal: {
                verticalAlign: 'middle',
                align: 'center',
                fontSize: 9,
                color: '#FFF'
              }
            },
            leaves: {
              label: {
                show: true
              }
            },
            symbolSize: [250, 60],
            expandAndCollapse: false,
            animationDuration: 550,
            animationDurationUpdate: 750,
            symbol: 'pin',
            initialTreeDepth: 2
          }
        ]
      })

      this.chart.on('click', (params) => {
        // const id = params.data.id
        // console.log(id)

        // if (id !== 0) {
        //   const _len = this.data1.children
        //   for (let i = 0; i < _len.length; i++) {
        //     if (id === _len[i].id) {
        //       _len.splice(i, 1)
        //       this.initChart()
        //     } else {
        //       // const _lenChildren = _len.children
        //       // console.log(_lenChildren.length)
        //       // for (let j = 0; j < _lenChildren.length; j++) {
        //       //   if (id === _len[i]._lenChildren[j].id) {
        //       //     _len[i]._lenChildren[j].splice(i, 1)
        //       //     this.initChart()
        //       //   }
        //       // }
        //     }
        //   }
        // }
      })

      this.chart.on('mousemove', (params) => {
        // console.log(params)
        const id = params.data.id
        this.ids = id
        if (params.data.id !== 0) {
          const posi = {
            left: params.event.offsetX,
            top: params.event.offsetY,
            flag: true
          }
          this.$emit('openPop', posi)
        } else {
          const pos = {
            left: params.event.offsetX,
            top: params.event.offsetY,
            flag: false
          }
          this.$emit('openPop', pos)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.box{
  position: relative;
}

</style>
