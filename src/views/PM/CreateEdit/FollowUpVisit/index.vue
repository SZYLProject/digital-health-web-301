<!-- 随访管理模块模块 -->
<template>
  <div class="followup-visit">
    <div class="module-container-two"
         style="margin-bottom: 0px;">
      <div class="title">
        <h1>访视设计</h1>
        <span class="right right-button">
          <el-button size="mini"
                     @click.native="goPrev">上一步</el-button>
          <el-button size="mini"
                     type="primary">完成</el-button>

        </span>
      </div>
    </div>
    <div class="con-main dec" style="background-color:#fff;height:100%;width:100%;">
      <iframe width="100%" height="100%" :src="url" ></iframe>
    </div>
  </div>

</template>

<script>
// import edc from '@/components/EDC'
import { mapGetters, mapMutations } from 'vuex'

import { } from '@/api/caseSearch'
export default {
  name: 'FollowUpVisit',
  data () {
    return {
      url: 'http://172.16.115.190:8087/#/visit?title=的方法范德萨发大发'
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  watch: {},
  components: {},
  created () { },
  mounted () { },
  destroyed () { },
  methods: {
    ...mapMutations(['']),
    goPrev () {
      this.$emit('next', 2)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.followup-visit {
  .right-button {
    top: 9px;
  }
  .dec{
    height: calc(100vh - 200px)!important;
  }
}
</style>
<style lang="scss">
</style>
