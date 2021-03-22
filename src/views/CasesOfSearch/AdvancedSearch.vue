<!-- 高级搜索主页面组件 -->
<template>
  <div class="advanced-search-main">
    <div class="module-container">
      <!-- 面包削 -->
      <div class="title">
        <h2>
          <span class="pointer"
                @click="goBack"
                @mouseover="mouseOver"
                @mouseleave="mouseLeave"
                :style="{'color': colorStatus !== 0 ? theme : '#787878'}"> 病历搜索 > </span>
          <span :style="{'color': theme}">高级搜索</span>
        </h2>
        <span class="right full-screen-icon pointer"
              @click="goBack">
          <svg-icon icon-class="suoxiao" />
        </span>
      </div>
      <!-- 高级搜索组件 -->
      <div class="con-1">
        <advanced-search-com childMianPage="true"
                             :PN="pageNo"
                             :PS="pageSize" />
      </div>
    </div>

    <!-- 高级-搜索结果 -->
    <div class="advanced-search-result"
         v-loading="advancedLoading"
         element-loading-text="数据加载中..."
         element-loading-spinner="el-icon-loading"
         v-if="isShowMoule">
      <div class="module-container">
        <div class="title">
          <h2>搜索结果</h2>
          <div class="right">
            <!-- 结果分析 -->
            <div class="inlineBlock">
              <analyze-result />
            </div>
            <!-- 收藏 -->
            <div class="space inlineBlock">
              <AddCollectObject title="收藏"
                                keys="collection"
                                :disabled="disOrNo" />
            </div>
            <!-- 添加至项目 -->
            <div class="inlineBlock">
              <AddCollectObject title="添加至项目"
                                disabled />
            </div>
          </div>

        </div>

        <!-- 筛选条件和列表 -->
        <div class="con-2"
             style="margin-bottom:20px;">
          <p class="search-msg">
            您的权限下，相关病人
            <span>{{ patients }}</span> 个，病历
            <span>{{ caseHistory }}</span> 份
          </p>

          <!-- 列表 -->
          <div class="patients-model-com">
            <ul class="case-lists">
              <li class="pointer"
                  v-for="(item,index) in listsVisit"
                  :key="index"
                  style="padding-right:90px;"
                  :style="{'background-color': item.check ? 'rgba(43,134,178,0.2)':'#ffffff'}"
                  @click="correctBg(item, index)">
                <h4>
                  {{ item.name }} ;&nbsp;
                  性别: {{ item.sex ? item.sex : '无'}} ;&nbsp;
                  出生年月: {{ item.date_of_birth ? item.date_of_birth.slice(0, 10) : '无'}}
                </h4>
                <p class="p-b">
                  <el-button type="text"
                             @click.native.stop="jumpView(item)"> 患者全景 >
                  </el-button>
                </p>
                <p style="margin:10px 0px;">
                  <span class="p-k"
                        v-for="(itm,idx) in item.visit_record"
                        :key="'itm' + idx">
                        {{ itm.visit_source_value }}
                  </span>
                </p>
                <p>
                  就诊日期:
                  <span
                      v-for="(itm,idx) in item.visit_record"
                      :key="'itm0' + idx">
                      {{ itm.visit_start_date | timestamp }}
                      {{idx !== (itm.length) ? ',': ''}}
                  </span>; &nbsp;
                  就诊科室:
                  <span v-for="(itm,idx) in item.visit_record"
                        :key="'itm1' + idx">
                        {{ itm.dept_admission_to ? itm.dept_admission_to : '无' }}
                        {{idx !== (itm.length) ? ',': ''}}
                  </span>; &nbsp;
                  现病史:
                  <span v-for="(itm, idx) in item.visit_record"
                        :key="'itm2' + idx">
                        {{ itm.hy_present ? itm.hy_present : '' }}
                        {{idx !== (itm.length) ? ',': ''}}
                  </span>;&nbsp;&nbsp;
                  就诊年龄:
                  <span v-for="(itm,idx) in item.visit_record"
                        :key="'itm3' + idx">
                    {{ itm.visit_age ? itm.visit_age : '无' }}
                    {{idx !== (itm.length) ? ',': ''}}
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="pageNo"
                       :page-sizes="[10, 20, 30, 40, 50]"
                       :page-size="pageSize"
                       :pager-count="5"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total"
                       background></el-pagination>
      </div>

    </div>

  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import { } from '@/api/caseSearch'
// import { stringToArr } from '@/utils'
import AddCollectObject from '@/components/AddCollectObject'
import { AnalyzeResult, AdvancedSearchCom } from './components'

export default {
  name: 'AdvancedSearch',
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      colorStatus: 0, // 面包削主题色状态控制
      advancedLoading: false, // 高级搜索加载数据结果
      isShowMoule: true, // 是否显示高级搜索模块
      listsVisit: [],
      patients: 0,
      caseHistory: 0,
      listsIdObj: {},
      listsId: [] // 收藏 添加项目的ID
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo', 'advanceSearchListDatas', 'keyWordListsId']),
    disOrNo () {
      return !(this.keyWordListsId?.length > 0)
    }
  },

  watch: {
    advanceSearchListDatas (newV) {
      // console.log(newV)
      this.patients = newV.personNumber ? newV.personNumber : 0
      this.caseHistory = newV.visitNumber ? newV.visitNumber : 0
      this.total = newV.total
      this.listsVisit = newV.personList.map(item => {
        this.$set(item, 'check', false)
        const res = new Map()
        item.visit_record = item.visit_record.filter((a) => !res.has(a.visit_source_value) && res.set(a.visit_source_value, 1))
        return item
      })
      this.advancedLoading = false
    }
  },

  components: { AddCollectObject, AnalyzeResult, AdvancedSearchCom },
  created () { },
  mounted () {
    // console.log(this.advanceSearchListDatas)
    if (this.advanceSearchListDatas) {
      const newV = this.advanceSearchListDatas
      this.patients = newV.personNumber ? newV.personNumber : 0
      this.caseHistory = newV.visitNumber ? newV.visitNumber : 0
      this.total = newV.total
      this.listsVisit = newV.personList.map(item => {
        this.$set(item, 'check', false)
        const res = new Map()
        item.visit_record = item.visit_record.filter((a) => !res.has(a.visit_source_value) && res.set(a.visit_source_value, 1))
        return item
      })
      this.advancedLoading = false
    }
  },
  destroyed () {
    const obj = [
      {
        advanceSearchVariableDTOList: [],
        indexName: '',
        opt: 'OR',
        parentVariable: {
          id: '',
          name: '',
          key: '',
          type: '',
          value: '',
          date1: '',
          date2: '',
          dataOptionType: 0,
          dataItemCode: '',
          dataOption: []
        },
        serialNumber: 0
      }
    ]
    this['advancedSearch/advancesearchmuta'](obj)
    this['advancedSearch/advancesearchlistmup'](null)
    this.$Storage.localRemove('searchJson')
    this.pageNo = 1
    this.pageSize = 10
    // 清空列表 ID
    this['caseSearch/keywordlists']([])
  },

  methods: {
    ...mapMutations(['advancedSearch/advancesearchmuta', 'advancedSearch/advancesearchlistmup', 'caseSearch/keywordlists']),
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
    },

    // 跳转高级搜索主页面
    jumpAdvanced () {
      this.$router.push('AdvancedSearch') //
    },

    jumpView (item) {
      let id = null
      if (item.unique_id) { //
        id = item.unique_id
      } else {
        id = item.unique_id_lv1
      }
      const newPage = this.$router.resolve({ path: `/view360/${id}/0/?parentName=患者概览` })
      window.open(newPage.href, '_blank')
    },

    correctBg (val, index) {
      const num = Object.keys(this.listsIdObj).length
      this.listsId = []
      this.listsVisit[index].check = !val.check
      if (num !== 0) {
        if (this.listsIdObj[index]) {
          delete this.listsIdObj[index]
        } else {
          this.listsIdObj[index] = val.personId
        }
      } else {
        this.listsIdObj[index] = val.personId
      }
      for (const key in this.listsIdObj) {
        this.listsId.push(this.listsIdObj[key])
      }
      // console.log(this.listsId)
      this['caseSearch/keywordlists'](this.listsId) // 存储病例列表ID
    },

    // 分页函数 每页显示总条数
    handleSizeChange (val) { //
      this.pageSize = val
      this.advancedLoading = true
    },

    // 分页函数 当前页
    handleCurrentChange (val) {
      this.pageNo = val
      this.advancedLoading = true
    }

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.advanced-search-main {
  .advanced-search-result {
    @include space(top);
    .space {
      @include space(left);
      @include space(right);
    }
    .search-msg {
      padding: 10px 10px;
      color: #2b2b2b;
      span {
        color: #ec6941;
      }
    }
  }
  .full-screen-icon {
    margin: -15px -15px 0px 0px;
    padding: 10px;
    color: #787878;
    &:hover {
      color: #0070f4;
    }
  }
  .con-1 {
    margin: 15px 25px 0px 25px;
  }
}
.patients-model-com {
  ul {
    li {
      position: relative;
      border-bottom: solid 1px rgba(43, 134, 178, 0.2);
      padding: 15px 10px;
      margin-bottom: 2px;
      border-radius: 1%;
      .p-b {
        position: absolute;
        right: 20px;
        top: 0px;
        z-index: 20;
      }
      .p-k {
        padding: 2px 10px;
        border: solid #00a0e9 1px;
        color: #00a0e9;
        border-radius: 3px;
        margin-right:10px;
        margin-bottom:5px;
        display: inline-block;
      }
      h4 {
        color: #2b2b2b;
      }
    }
  }
}
</style>
<style lang="scss"></style>
