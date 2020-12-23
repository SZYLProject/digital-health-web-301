
<template>
  <div class="num"
       :style="{left:getTextX(link),top:getTextY(link)}">
    <span>{{link.target.data.num}}</span>
  </div>
</template>
<script>
export default {
  name: 'linkLine',
  props: {
    link: {
      type: Object
    },
    nodeWidth: {
      type: Number
    },
    nodeHeight: {
      type: Number
    }
  },
  data () {
    return {
    }
  },
  methods: {
    getCenterXY (node) {
      return {
        x: node.x + this.nodeWidth / 2,
        y: node.y + this.nodeHeight / 2
      }
    },
    getTextX (link) {
      // console.log(link)
      const source = this.getCenterXY(link.source)
      const target = this.getCenterXY(link.target)
      return (source.x + target.x) / 2 + 'px'
    },
    getTextY (link) {
      const source = this.getCenterXY(link.source)
      const target = this.getCenterXY(link.target)
      return (source.y + target.y) / 2 - 5 + 'px'
    }
  }
}
</script>
<style scoped lang="scss">
.num {
  position: absolute;
  transform: translate(-50%, -50%);
  background-color: #e9f2fa;
  border-radius: 4px;
  font-size: 10px;
  color: #666666;
  padding: 1px 3px;
}
</style>
