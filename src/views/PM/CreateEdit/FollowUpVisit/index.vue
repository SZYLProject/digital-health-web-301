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
    <div class="con-main" style="background-color:#fff;height:100%;width:100%;">
      访视设计
      <!-- <el-tabs tab-position="left"
               >
        <el-tab-pane label="访视设计">
          访视设计
        </el-tab-pane>
        <el-tab-pane label="CRF设计">
          CRF设计
        </el-tab-pane>
        <el-tab-pane label="CRF录入">
          CRF录入
        </el-tab-pane>
      </el-tabs> -->
    </div>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import { } from '@/api/caseSearch'
export default {
  name: 'FollowUpVisit',
  data () {
    return {}
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
.followup-visit{
  .right-button {
    top: 9px;
  }
}
</style>
<style lang="scss">

</style>
