<!-- 项目列表详情 -->
<template>
  <div class="edc-page">
    <div class="module-container-two">
      <div class="title">
        <h1>
          <el-page-header @back="goBack" content="CRF录入"></el-page-header>
        </h1>
      </div>
    </div>
    <div class="con-main dec" style="background-color:#fff;height:100%;width:100%;">
      <!-- <iframe width="100%" height="100%" :src="url" frameborder="no" border="0"></iframe> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import {} from '@/api/caseSearch'
export default {
  name: 'EDC',
  data () {
    return {
      url: 'http://172.16.115.190:8080/#/formInput'
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  watch: {

  },
  components: {

  },
  created () {},
  mounted () {
    // console.log(this.$route.params.id)
  },
  destroyed () {},
  methods: {
    ...mapMutations(['']),
    goBack () {
      const type = window.sessionStorage.getItem('projectType')
      this.$router.push({
        name: 'ProjectListsDetails',
        params: {
          comName: 'SearchObjectCom',
          projectType: Number(type),
          flag: true
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.edc-page {
  .dec{
    height: calc(100vh - 80px)!important;
  }
}
</style>
<style lang="scss">
.edc-page {
  .el-page-header{
    .el-page-header__content{
      font-weight: 700px!important;
    }
  }
}
</style>
