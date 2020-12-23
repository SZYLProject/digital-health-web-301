<template>
  <g>
    <item v-for="(item,index) in data"
          :key="index">
      <path :d="`M${item.fromX},${item.fromY} Q${(3*item.fromX+item.toX)/4},${item.fromY} ${(item.toX+item.fromX)/2},${(item.toY+item.fromY)/2} T${item.toX},${item.toY}`"
            stroke="#d3e5f5"
            fill="none"
            style="stroke-width: 1px;"></path>
      <text font-family="microsoft yahei"
            font-size="11"
            :y="(item.fromY+item.toY)/2+5"
            :x="(item.fromX+item.toX)/2-5"
            filter="url(#feBlend1)">{{item.num}}</text>
      <path-text :data="item.child"
                 v-if="item.child&&item.child.length" />
    </item>
  </g>
</template>
<script>
import Item from './Item'
export default {
  components: { Item },
  name: 'pathText',
  props: ['data'],
  data () {
    return {
      resizeWidth: 100,
      resizeHeight: 100
    }
  },
  mounted () {

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
