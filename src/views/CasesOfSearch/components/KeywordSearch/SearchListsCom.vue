<!-- 关键词搜索模块搜索列表组件 -->
<template>
  <div class="search-lists-com">
    <!-- 搜索条件 -->
    <div class="header-t">
      <el-radio-group v-model="model"
                      @change="searchMode"
                      size="medium">
        <el-radio-button label="0">病历模式</el-radio-button>
        <el-radio-button label="1">病人模式</el-radio-button>
      </el-radio-group>

      <!-- 综合排序 -->
      <el-select size="medium"
                 v-model="timeOrder"
                 style="margin-left:20px;width:130px"
                 @change="sortSelect"
                 placeholder="选择排序方式">
        <el-option label="时间 ↑"
                   value="1">
        </el-option>
        <el-option label="时间 ↓"
                   value="0">
        </el-option>
      </el-select>
    </div>

    <p class="search-msg">
        您的权限下，相关病人
        <span>{{ patients }}</span> 个，病历
        <span>{{ caseHistory }}</span> 份
    </p>

    <!-- 病例模式/病人模式 -->
    <div style="margin-bottom:30px;">
      <component :is="whichCom"></component>
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
</template>

<script>

import { mapGetters, mapMutations, mapActions } from 'vuex'
import caseModel from './CaseModel' // 病例模式
import patientsModel from './PatientsModel' // 病人模式

export default {
  name: 'searchListsCom',
  data () {
    return {
      model: 0, // 搜索模式
      timeOrder: '', // 排序
      patients: 0, //  先关病人
      caseHistory: 0, // 相关病历
      whichCom: 'caseModel', // 默认展示组件
      total: 0 // 总页数
    }
  },
  computed: {
    ...mapGetters(['keyWordSearchCon', 'keyWordListsDatas', 'pageNo', 'pageSize'])
  },
  watch: {
    keyWordListsDatas (val) { // 监听患者列表的数据变化 达到更新列表的作用
      if (val) {
        this.patients = val.personNumber
        this.caseHistory = val.visitNumber
        this.total = val.total
      }
    }
  },
  components: {
    caseModel, patientsModel
  },
  created () { },
  mounted () { },
  destroyed () {
    this['caseSearch/modelarg'](0) // 通过销毁来初始化模式切换
    this['caseSearch/timeorderarg']('') // 通过销毁来初始化排序方式
    this['caseSearch/pagenoarg'](1) // 初始化单个分页
    this['caseSearch/pagesizearg'](10) // 初始化总页码
  },
  methods: {
    ...mapMutations(['caseSearch/modelarg', 'caseSearch/timeorderarg', 'caseSearch/pagenoarg', 'caseSearch/pagesizearg']),
    ...mapActions(['caseSearch/keyWordListsData']),

    // 模式切换
    searchMode (val) {
      this.$emit('changeLoading', true)
      this['caseSearch/modelarg'](Number(val))
      this['caseSearch/pagenoarg'](1)
      this['caseSearch/pagesizearg'](10)
      this.getSearchListsData()
      switch (Number(val)) {
        case 0:
          this.whichCom = 'caseModel'
          break
        case 1:
          this.whichCom = 'patientsModel'
          break
      }
    },

    // 排序方式
    sortSelect (val) {
      this.$emit('changeLoading', true)
      this['caseSearch/timeorderarg'](Number(val))
      this['caseSearch/pagenoarg'](1)
      this['caseSearch/pagesizearg'](10)
      this.getSearchListsData()
    },

    // 调用列表数据
    getSearchListsData () {
      const data = this.keyWordSearchCon
      this['caseSearch/keyWordListsData'](data).then(res => {
        this.$emit('changeLoading', false)
        if (res) {}
      }).catch(() => {
        this.$emit('changeLoading', false)
      })
    },

    // 分页函数 每页显示总条数
    handleSizeChange (val) {
      this.$emit('changeLoading', true)
      this['caseSearch/pagenoarg'](1)
      this['caseSearch/pagesizearg'](Number(val))
      this.getSearchListsData()
    },

    // 分页函数 当前页
    handleCurrentChange (val) {
      this.$emit('changeLoading', true)
      this['caseSearch/pagenoarg'](Number(val))
      this.getSearchListsData()
    }

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.search-lists-com {
  margin-top: 15px;
  .header-t {
    padding-left: 8px;
  }
  .search-msg {
    padding: 10px 10px;
    color: #2b2b2b;
    span {
      color: #ec6941;
    }
  }
}
</style>
<style lang="scss">
.search-condation-com {
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
}
</style>
