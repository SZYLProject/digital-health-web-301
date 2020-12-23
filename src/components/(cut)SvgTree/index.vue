<template>
  <svg :width="resizeWidth"
       :height="resizeHeight"
       id="svg"
       xmlns="http://www.w3.org/2000/svg">
    <filter id="feBlend1">
      <feFlood result="floodFill"
               width="100%"
               height="100%"
               flood-color="#d3e5f5"
               flood-opacity="0.9" />
      <feBlend in="SourceGraphic"
               in2="floodFill"
               mode="normal" />
    </filter>
    <path-text :data="svgData" />
  </svg>
</template>
<script>
import PathText from './PathText'
export default {
  name: 'home',
  props: ['svgData'],
  components: {
    PathText
  },
  data () {
    return {
      msg: 'Home',
      resizeWidth: 100,
      resizeHeight: 100
    }
  },
  mounted () {
    this.$nextTick(function () {
      const svg = document.getElementById('svg').getBBox()
      this.resizeWidth = svg.width + 150
      this.resizeHeight = svg.height + 150
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
