<!-- 病例搜索首页 -->
<template>
  <div class="cases-serach-homepage">
    <!-- 病例搜索模块 -->
    <div class="module-container-two">
      <div class="title" style="border-bottom: none">
        <h1>
          病例搜索
          <span class="sub-n" style="margin-left: 30px"
            >患者数：{{ patientsNum }}</span
          >
          <span class="sub-n">病历数： {{ caseNum }}</span>
          <!-- <span class="sub-n">时间跨度：{{ startTimes }} — {{ endTimes }}</span> -->
          <span class="sub-n">时间跨度：2013-01-01 — {{ endTimes }}</span>
        </h1>
      </div>
    </div>
    <div class="container-con">
      <div class="grid-l">
        <!-- 关键词搜索 -->
        <div class="module-A">
          <div class="grid-l-module">
            <h2 class="title">关键词搜索</h2>
            <span class="right full-screen-icon pointer" @click="jumpKwShMo">
              <svg-icon icon-class="quanping" />
            </span>
          </div>
          <div class="grid-search">
            <el-row>
              <el-col :span="22">
                <el-input
                  placeholder="输入您要搜索的内容"
                  v-model.trim="searchs"
                  size="medium"
                  @keyup.enter.native="serachFn"
                >
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-button
                  type="primary"
                  class="btn"
                  size="medium"
                  @click.native="serachFn"
                >
                  搜索
                </el-button>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 高级搜索 -->
        <div class="module-A">
          <div class="grid-l-module">
            <h2 class="title">高级搜索</h2>
            <span class="right full-screen-icon pointer" @click="jumpAdvanced">
              <svg-icon icon-class="quanping" />
            </span>
          </div>
          <div class="grid-high">
            <!-- 高级搜索组件 -->
            <advanced-search-com />
          </div>
        </div>
      </div>
      <!-- right -->
      <div class="grid-r">
        <right-lists-module />
      </div>
    </div>
  </div>
</template>

<script>
import { RightListsModule, AdvancedSearchCom } from './components'
import { mapGetters, createNamespacedHelpers } from 'vuex'
import { patientSearch } from '@/api/caseSearch'
const { mapMutations } = createNamespacedHelpers('caseSearch')

export default {
  name: 'CaseSearchHome',
  data () {
    return {
      searchs: '', // 关键词搜索输入值
      patientsNum: 0, // 患者数
      caseNum: 0, // 病历数：
      startTimes: 0, // 开始时间
      endTimes: 0 // 结束时间
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['theme'])
  },
  components: {
    RightListsModule,
    AdvancedSearchCom
  },
  created () {},
  mounted () {
    this.getPatientSearch() // 获取病例搜索结果
  },
  destroyed () {},
  methods: {
    ...mapMutations(['keywordsinput']),
    creatTreeName () {},
    // 获取病例搜索结果
    getPatientSearch () {
      const pID = this.$Storage.sessionGet('pID')

      // eslint-disable-next-line eqeqeq
      if (
        pID === undefined ||
        pID === 'undefined' ||
        pID === '' ||
        pID === null
      ) {
        // this.getPatientSearch()
        // window.location.reload() //如果没有数据再次刷新页面，解决开小差问题
      } else {
        const data = {
          dataSourceId: pID?.id ?? ''
        }
        console.log(pID?.id ?? '', 'pID')

        patientSearch(data)
          .then(res => {
            const obj = res.obj
            if (obj) {
              this.patientsNum = obj.personTotal
              this.caseNum = obj.visitTotal
              this.startTimes = obj.visitStartDate
              this.endTimes = obj.visitEndDate
            }
          })
          .catch(() => {})
      }
    },
    // 跳转关键词搜索页面
    jumpKwShMo () {
      this.$router.push('KeywordsSearch')
    },
    // 跳转高级搜索主页面
    jumpAdvanced () {
      this.$router.push('AdvancedSearch') //
    },
    // 关键词搜索函数
    serachFn () {
      const str = this.searchs
      this.keywordsinput(str) // 存储到store/caseSearch/KEYWORDSINPUT
      this.$router.push('KeywordsSearch')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.cases-serach-homepage {
  .module-container {
    @include space(bottom);
  }
  .sub-n {
    font-size: 14px;
    color: #666666;
    margin-right: 20px;
  }
  .grid-l-module {
    padding: 0 20px;
    position: relative;
    .title {
      font-size: 14px;
      color: #333333;
      padding: 10px 20px;
      position: relative;
      &::before {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 100%; /**控制形状**/
        background-color: #0070f4; /**控制图标颜色**/
        margin-right: 10px; /**图标与文字距离**/
        position: absolute;
        left: 6px;
        top: 17px;
      }
    }
    .right {
      color: #0070f4;
      position: absolute;
      right: 20px;
      top: 16px;
    }
  }
  .module-A {
    background-color: #ffffff;
    margin-bottom: 20px;
  }
  .container-con {
    display: flex;
    .grid-l {
      flex: 1;
      .grid-search {
        padding: 10px 15% 20px;
      }
      .grid-high {
        padding: 10px 30px;
      }
    }
    .grid-r {
      width: 340px;
      background: #ffffff;
      margin-left: 20px;
      padding: 20px;
    }
  }
}
</style>
<style lang="scss">
.cases-serach-homepage {
  .grid-search {
    .el-input__inner {
      border-radius: 4px 0px 0px 4px;
    }
    .el-button {
      border-radius: 0px 4px 4px 0px;
    }
  }
}
</style>
