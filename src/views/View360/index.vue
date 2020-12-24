<template>
  <div class="demographic-info">
    <DetailsSidebar class="sidebar-container"
                    @title='titleVal' />
    <div class="details-main">
      <!-- 头部个人信息 -->
      <div class="details-header">
        <div class="details-top">
          <span>患者360视图 > </span>
          <span class="title"
                :style="{'color': theme}">{{nowTitle}}</span>
          <div class="right">
            <!-- 结果分析 -->
            <div class="inlineBlock">
              <el-button type="text"
                         disabled>查看患者原始病历(0份)</el-button>

            </div>
            <div class="space inlineBlock">
              <el-button type="primary"
                         size="medium"
                         icon="el-icon-edit"
                         disabled>补录</el-button>
            </div>
            <!-- 收藏 -->
            <div class="space inlineBlock">
              <AddCollectObject title="收藏"
                                disabled />
            </div>
            <!-- 添加至项目 -->
            <div class="space inlineBlock">
              <AddCollectObject title="添加至项目"
                                disabled />
            </div>
          </div>
        </div>
        <div class="patient-info">
          <span>患者信息</span>
          <span>{{personInfo.name}}</span>
          <span>{{personInfo.gender}} </span>
          <span>出生日期：{{personInfo.date_of_birth | timeFormat}}</span>
          <span>住院号：{{personInfo.tpat_no}}</span>
        </div>

      </div>
      <Overview :show="whichCom" />
      <!-- 组件切换 -->
      <component :is='whichCom'
                 :baseData="baseData"
                 :menu="menu"></component>
      <!-- 左右结构表格 -->
      <OtherInfoTwo v-if="whichCom==='OtherInfoTwo'" />
    </div>
  </div>
</template>

<script>
import DetailsSidebar from './components/DetailsSidebar'
import OtherInfoTwo from './components/OtherInfoTwo'
import BaseInfo from './components/BaseInfo' // 人口学信息
import TableInfo from './components/TableInfo'// 纯表格
import Overview from './components/Overview' // 概览
import AddCollectObject from '@/components/AddCollectObject'
import { getViewInfo, getPersonBaseInfo } from '@/api/view360'
import { mapGetters } from 'vuex'
export default {
  name: 'View360',
  computed: {
    ...mapGetters(['theme', 'viewId'])
  },
  components: {
    AddCollectObject,
    DetailsSidebar,
    BaseInfo,
    OtherInfoTwo,
    TableInfo,
    Overview
  },
  data () {
    return {
      nowTitle: '',
      personId: this.$route.params.personId,
      whichCom: '', // TableInfo BaseInfo
      personInfo: '', // 患者信息
      // 表格数据
      menu: [],
      // 人口学样式数据
      baseData: null
    }
  },
  watch: {
    viewId: {
      immediate: true,
      handler: function (newValue, oldValue) {
        if (newValue !== 0) {
          this.getViewData(newValue)
        } else {
          this.whichCom = ''
          this.menu = []
          this.viewData = null
        }
      }
    }
  },
  destroyed () {
    window.history.replaceState(null, null, document.URL)
  },
  created () {
    this.getPersonInfo()
  },
  methods: {
    // 得到标题
    titleVal (val) {
      if (val) {
        this.nowTitle = val
      }
    },
    // 获取数据 根据数据类型 展示不同模块 并传值
    getViewData (val) {
      const data = {
        personId: this.personId,
        parentId: val,
        pageNo: 1,
        pageSize: 10,
        dataItemCode: ''
      }
      getViewInfo(data).then(res => {
        if (res.obj.menu && res.obj.menu.length > 0) {
          this.baseData = null
          this.menu = res.obj.menu
          this.whichCom = 'TableInfo'
        } else {
          this.menu = []
          const list = []
          if (res.obj.data && res.obj.data.length > 0) {
            const data = JSON.parse(res.obj.data[0])
            const fields = res.obj.fields
            for (const key in data) {
              if (fields[key]) {
                list.push({
                  name: fields[key],
                  value: data[key] || '无'
                })
              }
            }
          }
          this.baseData = list
          this.whichCom = 'BaseInfo'
        }
      }).catch(() => { })
    },
    // 获得患者信息
    getPersonInfo () {
      getPersonBaseInfo(this.personId).then(res => {
        this.personInfo = JSON.parse(res.obj[0])
      }).catch(() => { })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.demographic-info {
  .details-header {
    // position: fixed;
    // top: 0;
    width: 100%;
    // margin-top: 56px;
    padding-top: 10px;
    // z-index: 0;
    // -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .details-top {
      padding: 10px 0;
      position: relative;
      .title {
        font-weight: bold;
        font-size: 16px;
      }
      .right {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .patient-info {
      margin: 8px 0 13px;
      padding: 15px;
      background: rgba(43, 134, 178, 0.1);
      span {
        margin: 0 5px;
      }
    }

    .space {
      @include space(left);
    }
  }
  .details-main {
    // padding: 0 10px;
    padding-right:10px;
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: 193px;
    position: relative;
  }
}
</style>
