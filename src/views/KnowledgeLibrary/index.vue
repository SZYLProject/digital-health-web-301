<!-- 临床试验 -->
<template>
  <div class="knowladge-library">
    <div class="module-container-two" style="margin-bottom: 0px">
      <div class="title">
        <h1>知识库</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'knowladgeLibrary',
  components: {},
  computed: {
    ...mapGetters(['title'])
  },
  data () {
    return {
      comList: [
        {
          title: '首页',
          component: 'FirstPage',
          show: true
        },
        {
          title: '文献',
          component: 'Literature'
        },
        {
          title: '指南共识',
          component: 'GuideConsensus',
          show: true
        },
        {
          title: '临床路径',
          component: 'ClinicalPathway',
          show: true
        },
        {
          title: '药品说明书',
          component: 'DrugSpecification',
          show: true
        },
        {
          title: '临床试验',
          component: 'ClinicTrial',
          show: true
        },
        {
          title: '误诊误治',
          component: 'MisdiagnosisMistreatment',
          show: true
        }
      ]
    }
  },
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    ...mapMutations([''])
  }
}
</script>

<style lang="scss" scoped>
.knowladge-library {

}
</style>
<style lang="scss">
</style>
