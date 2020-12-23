
<template>
  <g>
    <path :d="getLinkPath(link)"
          :stroke="linkStroke"
          fill="none"
          :stroke-width="linkStrokeWidth"></path>
  </g>
</template>
<script>
export default {
  name: 'linkNum',
  props: {
    link: {
      type: Object
    },
    nodeWidth: {
      type: Number
    },
    nodeHeight: {
      type: Number
    },
    linkStroke: {
      type: String
    },
    linkStrokeWidth: {
      type: [String, Number]
    }
  },
  data () {
    return {
      genLink: this.$d3.linkHorizontal().x(d => d.x).y(d => d.y)
    }
  },
  methods: {
    getCenterXY (node) {
      return {
        x: node.x + this.nodeWidth / 2,
        y: node.y + this.nodeHeight / 2
      }
    },
    getLinkPath (link) {
      const source = this.getCenterXY(link.source)
      const target = this.getCenterXY(link.target)
      return this.genLink({
        source,
        target
      })
    }
  }
}
</script>
<style scoped lang="scss">
path {
  stroke-dasharray: 320;
  stroke-dashoffset: 0;
  animation: dash 0.3s linear;
}
@keyframes dash {
  from {
    stroke-dashoffset: 320;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
