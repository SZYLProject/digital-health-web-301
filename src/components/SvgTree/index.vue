<template>
  <div :style="containerSize"
       class="tree-container">
    <!-- 曲线 -->
    <svg :width="size.width"
         :height="size.height">
      <link-line v-for="link in links"
                 :link="link"
                 :key="link.target.id"
                 :node-width="nodeWidth"
                 :node-height="nodeHeight"
                 :link-stroke="linkStroke"
                 :link-stroke-width="linkStrokeWidth"></link-line>

    </svg>
    <div class="canvas">
      <!-- 所有节点组件 -->
      <link-node v-for="node in nodes"
                 :node="node"
                 :key="node.id"
                 :node-width="nodeWidth"
                 :node-height="nodeHeight"
                 :node-fill="nodeFill"
                 :node-text-color="nodeTextColor"></link-node>
      <!-- 连线上的数字 -->
      <link-num v-for="link in links"
                :link="link"
                :key="'num'+link.target.id"
                :node-width="nodeWidth"
                :node-height="nodeHeight"></link-num>

    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { debounce, uniqueArr } from '@/utils'
import linkLine from './linkLine'
import linkNode from './linkNode'
import linkNum from './linkNum'
export default {
  name: 'SvgTree',
  components: {
    linkLine,
    linkNode,
    linkNum
  },
  props: {
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    treeData: {
      type: Object
    },
    // flattenData: {
    //   type: Array
    // },
    isFlatten: {
      type: Boolean
    },
    horizontal: {
      type: Boolean
    },
    separation: {
      type: Function,
      default: () => 1
    }

  },
  computed: {
    ...mapGetters(['flattenData']),
    disable () {
      return this.flattenData.some(item => (item.edit === true))
    },
    containerSize () {
      const width = this.width || this.size.width + 20
      const height = this.height || this.size.height + 20
      return {
        width: this.formatPx(width),
        height: this.formatPx(height)
      }
    }
  },
  watch: {
    flattenData () {
      this.drawTree()
    },
    treeData () {
      this.drawTree()
    },
    isFlatten () {
      this.drawTree()
    },
    horizontal () {
      this.drawTree()
    }
  },
  data () {
    return {
      nodeWidth: 100,
      nodeHeight: 30,
      nodeGapH: 50 + 100,
      nodeGapV: 20 + 30,
      nodeFill: '#5ec264',
      nodeTextColor: '#fff',
      linkStroke: '#e9f2fa',
      linkStrokeWidth: 2,
      size: {
        width: 0,
        height: 0
      },
      nodes: [],
      links: [],

      drawTree: () => { }
    }
  },

  created () {
    this.drawTree = debounce(this.innerDrawTree, 100)
    this.drawTree()
  },
  methods: {
    ...mapMutations(['conditionTree/FLATTEN_DATA']),
    addTree (pid) {
      var timestamp = new Date().getTime()
      const obj = {
        id: timestamp,
        name: '1',
        parent: pid,
        edit: true,
        num: 0
      }
      this.flattenData.push(obj)
      this['conditionTree/FLATTEN_DATA'](this.flattenData)
    },
    formatPx (d) {
      return (d + '').replace(/[px]/gi, '') + 'px'
    },
    swapXY (node) {
      const tmp = node.x
      node.x = node.y
      node.y = tmp
    },
    scaleX (nodes) {
      let arr = nodes.map(node => node.x)
      arr = uniqueArr(arr)
      const min = this.$d3.min(arr)
      const max = this.$d3.max(arr)
      const width = this.nodeGapH * (arr.length)
      const scaleLinear = this.$d3.scaleLinear().domain([min, max]).range([0, width])
      return {
        width: width + this.nodeWidth,
        scaleLinearX: scaleLinear
      }
    },
    scaleY (nodes) {
      let arr = nodes.map(node => node.y)
      arr = uniqueArr(arr)
      const min = this.$d3.min(arr)
      const max = this.$d3.max(arr)
      const height = this.nodeGapV * (arr.length)
      const scaleLinear = this.$d3.scaleLinear().domain([min, max]).range([0, height])
      return {
        height: height + this.nodeHeight,
        scaleLinearY: scaleLinear
      }
    },
    innerDrawTree () {
      let hierarchyNode
      if (this.isFlatten) {
        hierarchyNode = this.$d3.stratify().id(d => d.id).parentId(d => d.parent)(this.flattenData)
      } else {
        hierarchyNode = this.$d3.hierarchy(this.treeData)
      }
      const tree = this.$d3.tree().size([100, 100]).separation(this.separation)
      const treeData = tree(hierarchyNode)
      // 交换 x y 就是横的树
      if (this.horizontal) {
        treeData.each(this.swapXY)
      }
      const nodes = treeData.descendants()
      const links = treeData.links()
      const {
        width,
        scaleLinearX
      } = this.scaleX(nodes)
      const {
        height,
        scaleLinearY
      } = this.scaleY(nodes)
      treeData.each(node => {
        node.x = scaleLinearX(node.x)
        node.y = scaleLinearY(node.y)
      })
      this.nodes = nodes
      this.links = links
      this.size.width = width
      this.size.height = height
    }
  }

}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.tree-container {
  position: relative;
  overflow: auto;
  z-index: 2;
  svg {
    position: absolute;
    // left: -50px;
    top: 0;
    z-index: 2;
  }
  .canvas {
    position: absolute;
    // left: -20px;
    top: 0;
    z-index: 2;
    width: 100%;
  }
}
</style>
<style lang="scss">
.condition-tree-search {
  .el-button--primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .el-button--primary.is-plain {
    color: #409eff;
    background: #e6f2ff;
    border-color: #cbdff3;
  }
}
</style>
