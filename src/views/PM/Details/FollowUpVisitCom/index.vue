<!-- 随访管理模块模块 -->
<template>
  <div class="followup-visit-com">
    <el-tabs tab-position="left" style="background-color:#fff;height:100%;width:100%;">
      <el-tab-pane label="访视设计">
        访视设计
      </el-tab-pane>
      <el-tab-pane label="CRF设计">
        CRF设计
      </el-tab-pane>
      <el-tab-pane label="CRF录入">
        CRF录入
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import { } from '@/api/caseSearch'
export default {
  name: 'FollowUpVisitCom',
  data () {
    return {}
  },
  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  watch: {},
  components: { },
  created () { },
  mounted () {},
  destroyed () {},
  methods: {
    ...mapMutations([''])

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.is-active{
  background-color: #eff7ff;
}
.white-bg{
  background: #ffffff;
}
.project-schedule-com{

}

</style>
<style lang="scss">
.project-schedule-com{

}
</style>
