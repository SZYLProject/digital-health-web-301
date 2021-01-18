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
                     @click.native="pullDatas"
                     type="primary">完成</el-button>

        </span>
      </div>
    </div>
    <div class="con-main dec" style="background-color:#fff;height:100%;width:100%;">
      <iframe width="100%" height="100%" :src="url" frameborder="no" border="0"></iframe>
    </div>
  </div>

</template>

<script>
// import edc from '@/components/EDC'
import { mapGetters, mapMutations } from 'vuex'
import { getPullDatas } from '@/api/projectsMangement'
export default {
  name: 'FollowUpVisit',
  data () {
    return { //
      url: 'http://10.131.101.5:8099/#/visit?title=的方法范德萨发大发'
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
    },
    // 点击完后抽取数据
    pullDatas () {
      const data = {
        projectId: this.$Storage.sessionGet('projectId')
      }
      getPullDatas(data).then(res => {
        if (res) {
          this.$confirm('数据正在抽取中，请耐心等待...', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/PM/ProjectLists')
          }).catch(() => {

          })
        }
      }).catch(() => {

      })
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
