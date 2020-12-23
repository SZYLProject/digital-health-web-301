<!-- 高级搜索主页面组件 -->
<template>
  <div class="condition-tree-main">
    <div class="module-container">
      <div class="title">
        <h2>
          <span class="pointer"
                @click="goBack"
                @mouseover="mouseOver"
                @mouseleave="mouseLeave"
                :style="{'color': colorStatus !== 0 ? theme : ''}"> 病历搜索 > </span>
          <span :style="{'color': theme}">条件树搜索</span>
        </h2>
        <span class="right full-screen-icon pointer"
              @click="goBack">
          <svg-icon icon-class="suoxiao" />
        </span>
      </div>
      <!-- 搜索组件 -->
      <div class="con">
        <condition-tree />
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ConditionTree from './components/ConditionTree'

export default {
  name: 'ConditionTreeSearch',
  data () {
    return {
      colorStatus: 0 // 面包削主题色状态控制
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme'])
  },
  components: { ConditionTree },
  created () { },
  mounted () {
  },
  destroyed () {

  },

  methods: {
    // 面包削 hover 事件
    mouseOver () {
      this.colorStatus = 1
    },
    mouseLeave () {
      this.colorStatus = 0
    },

    // 返回病历搜索首页
    goBack () {
      this.$router.push('CaseSearchHome')
    }

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.condition-tree-main {
}
</style>
<style lang="scss"></style>
