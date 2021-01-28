<!-- 搜索主题弹窗组件 -->
<template>
  <div class="search-pop-com">
    <!-- 表头 -->
    <div class="search-header"
         slot="title">
      <p class="left">
        <el-input placeholder="请输入关键词查找筛选字段"
                  v-model.trim="searchInput"
                  size="medium"
                  class="search-btn"
                  @keyup.enter.native="serachFn">
          <el-button slot="append"
                     @click.native="serachFn">
            搜索
          </el-button>
        </el-input>
      </p>
      <p class="center">
        <span>共 {{ fieldAll }} 个字段</span>
      </p>
      <p class="right">
        <el-select v-model="valueField"
                   clearable
                   placeholder="请选择">
          <el-option v-for="item in optionsField"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </p>
    </div>

    <!-- 数据展示区 -->
    <div class="search-body"
         v-loading="isShowLoading"
         element-loading-text="数据加载中..."
         element-loading-spinner="el-icon-loading">
      <el-row :gutter="20">
        <!-- left -->
        <el-col :span="5">
          <div class="scrollbar-wraps left-menu">
            <el-scrollbar style="height:100%">
              <el-menu :default-active="activeIndex"
                       class="el-menu-vertical-demo"
                       @select="selectMenu">
                <!-- 搜索历史 -->
                <el-menu-item class="nav-list-item"
                              index="0">
                  <i class="el-icon-menu"></i>
                  <span slot="title">
                    搜索历史
                  </span>
                </el-menu-item>
                <el-menu-item class="nav-list-item"
                              v-for="(item,index) in searchPopDatas"
                              :key="index"
                              :index="item.id.toString()">
                  <i class="el-icon-menu"></i>
                  <span slot="title">
                    {{ item.dataItemName }}
                  </span>
                </el-menu-item>
              </el-menu>
            </el-scrollbar>
          </div>
        </el-col>

        <!-- right -->
        <el-col :span="19">
          <div class="scrollbar-wraps">
            <el-scrollbar style="height:100%"
                          ref="scrollbar">
              <!-- 搜索历史 -->
              <div id="0"
                   style="padding-top:10px;"
                   class="acontent history-record">
                <h4 style="margin-bottom:10px;">搜索历史</h4>
                <el-tooltip class="item"
                            effect="dark"
                            v-for="(item,index) in searchHistory"
                            :key="index"
                            placement="top-start">
                  <div slot="content">
                    <p>名称：{{ item.dataItemName }}</p>
                    <p style="max-width:150px;">
                      描述：{{ item.itemDesc ? item.itemDesc : '无...' }}
                    </p>
                  </div>
                  <el-button type="text"
                             :disabled="!item.clickon"
                             @click.native="listsButton(item)">
                    {{ item.dataItemName }}
                  </el-button>
                </el-tooltip>

                <!-- 清空搜索历史 -->
                <p class="clear-history">
                  <el-button type="text"
                             @click.native="clearHistory"
                             style="color:rgba(43, 43, 43, 0.5);">
                    清空搜索历史
                  </el-button>
                </p>
              </div>
              <p class="dashed-line"></p>
              <!-- 列表数据 -->
              <div v-for="(item,index) in searchPopDatas"
                   :key="index"
                   :id="item.id"
                   class="acontent">
                <h4 style="margin-top:10px;">{{ item.dataItemName }}</h4>
                <div class=""
                     v-for="(itemS,idx1) in item && item.dataItemEntityList
                        ? item.dataItemEntityList : []"
                     :key="idx1">
                  <p style="font-size:14px;color:#787878;margin:5px 0px;">
                    {{ itemS.dataItemName }}
                  </p>
                  <el-tooltip class="item"
                              effect="dark"
                              v-for="(itemT,idx2) in itemS && itemS.dataItemEntityList
                                ? itemS.dataItemEntityList:[]"
                              :key="idx2"
                              placement="top-start">
                    <div slot="content">
                      <p>名称：{{ itemT.dataItemName }}</p>
                      <p style="max-width:150px;">
                        描述：{{
                              itemT.itemDesc ?
                              itemT.itemDesc.length > 200 ?
                              itemT.itemDesc.slice(0,200) + '......' : itemT.itemDesc
                                                                     : '无...'
                            }}
                      </p>
                    </div>
                    <el-button type="text"
                               :disabled="!itemT.clickon"
                               @click.native="listsButton(itemT)">{{ itemT.dataItemName }}</el-button>
                  </el-tooltip>
                </div>
              </div>
            </el-scrollbar>
          </div>

        </el-col>

      </el-row>
    </div>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import {
  advancedSearchPopDatas,
  advancedSearchHistoryDatas,
  storeDataDictHistory,
  clearHistoryDatas
} from '@/api/caseSearch'

export default {
  name: 'DataDictionaryPop',
  data () {
    return {
      searchInput: '', // 输入的搜索关键字
      fieldAll: 0, // 字段总数
      optionsField: [{ // 字段选择数据
        value: '',
        label: '全部字段'
      }, {
        value: 0,
        label: '自定义字段'
      }, { // 字段选择数据
        value: 1,
        label: '通用字段'
      }],
      valueField: '', // 全部字段
      searchPopDatas: [], // 弹窗数据
      searchHistory: [], // 弹窗搜索历史数据
      activeIndex: '0', // 激活状态
      isShowLoading: false
    }
  },
  props: {
    openDialog: {
      type: Boolean,
      default: false
    },
    popArguments: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    openDialog: {
      handler (newVal, oldVal) {
        if (newVal) {
          this.handleScroll()
          this.advancedSearchPopDatas() // 更新弹窗数据
          this.getAdSearchHistoryDatas() // 调用搜索历史数据
        } else {
          this.searchInput = ''
          this.valueField = ''
          this.searchHistory = []
          this.searchPopDatas = []
        }
      },
      immediate: true
    }
  },
  filters: {
    lineFeed (val) {
      // console.log(val)
    }
  },
  components: {},
  created () { },
  mounted () {

  },
  destroyed () {

  },
  methods: {
    // 搜索
    serachFn () {
      this.advancedSearchPopDatas()
    },

    // 清空历史搜索
    clearHistory () {
      if (this.searchHistory?.length > 0) {
        this.$confirm('确认清空历史搜索吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.clearHistoryInside()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消~'
          })
        })
      } else {
        this.$message({
          message: '已无可被清空的历史搜索~',
          type: 'warning'
        })
      }
    },

    clearHistoryInside () {
      this.isShowLoading = true
      const data = {
        userId: this.userInfo.pkId
      }
      clearHistoryDatas(data).then(res => {
        if (res) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.getAdSearchHistoryDatas() // 调用搜索历史数据
        }
        this.isShowLoading = false
      }).catch(() => {
        this.isShowLoading = false
      })
    },

    // 点击列表信息
    listsButton (item) {
      this.isShowLoading = true
      this.$emit('dialogDatas', item)
      const data = {
        userId: this.userInfo?.pkId,
        entity: item
      }
      storeDataDictHistory(data).then(res => {
        this.isShowLoading = false
      })
    },

    // 数据接口
    advancedSearchPopDatas () {
      this.isShowLoading = true
      this.searchPopDatas = [] // 清空数据
      const data = {
        userId: this.userInfo.pkId,
        dataItemName: this.searchInput, // 搜索词
        isCommon: this.valueField, // 搜索字段类型
        except: this.popArguments
      }
      advancedSearchPopDatas(data).then(res => {
        // console.log(res)
        const obj = res.obj
        if (obj?.data?.length > 0) {
          this.fieldAll = obj.total
          this.searchPopDatas = obj.data
        } else {
          this.searchPopDatas = []
        }
        this.isShowLoading = false
      }).catch(() => {
        this.isShowLoading = false
      })
    },

    // 搜索历史
    getAdSearchHistoryDatas () {
      const data = {
        userId: this.userInfo.pkId,
        except: this.popArguments
      }
      advancedSearchHistoryDatas(data).then(res => { // searchHistory
        if (res.obj?.length > 0) {
          this.searchHistory = res.obj
        } else {
          this.searchHistory = []
        }
      }).catch(() => { })
    },

    // 菜单点击事件 锚点切换
    selectMenu (key) {
      this.$nextTick(function () {
        document.getElementById(key).scrollIntoView(true)
      })
    },

    // 监听弹窗的滚动事件
    handleScroll () {
      this.$nextTick(() => {
        const scrollbarEl = this.$refs.scrollbar.wrap
        scrollbarEl.onscroll = () => {
          this.onScroll()
        }
      })
    },
    onScroll () {
      const scrollbarEl = this.$refs.scrollbar.wrap
      const navContents = document.querySelectorAll('.acontent')
      // 所有锚点元素的 offsetTop
      const offsetTopArr = []
      navContents.forEach(item => {
        const temp = {
          offsetTop: item.offsetTop,
          id: item.id
        }
        offsetTopArr.push(temp)
      })
      // 获取当前文档流的 scrollTop
      const scrollTop = scrollbarEl.scrollTop
      // 定义当前点亮的导航下标
      let navIndex = ''
      for (let n = 0; n < offsetTopArr.length; n++) {
        // 如果 scrollTop 大于等于第 n 个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是 n 了
        if (scrollTop >= offsetTopArr[n].offsetTop) {
          navIndex = offsetTopArr[n].id
        } else { }
      }
      // 把下标赋值给 vue 的 data
      this.activeIndex = navIndex
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.search-pop-com {
  // 弹窗
  .search-header {
    overflow: hidden;
    .left {
      float: left;
    }
    .center {
      float: left;
      height: 36px;
      line-height: 36px;
      padding-left: 10px;
      span {
        color: rgba(43, 43, 43, 0.5);
      }
    }
    .right {
      float: right;
      margin-right: 25px;
    }
  }
  .scrollbar-wraps {
    height: 500px;
  }
  .search-body {
    padding-bottom: 20px;
  }
  .dashed-line {
    border-bottom: dashed 1px #0070f4;
    margin: 5px -20px;
    width: 100%;
  }
  .history-record {
    position: relative;
    .clear-history {
      position: absolute;
      right: 15px;
      top: 10px;
    }
  }
}
</style>
<style lang="scss">
.search-pop-com {
  .el-dialog__header {
    border-bottom: solid 1px rgba(43, 134, 178, 0.2);
  }
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .search-body {
    .left-menu {
      li {
        padding-left: 0px !important;
      }
    }
    .el-button + .el-button {
      margin-left: 0px;
    }
    .el-button {
      margin-left: 0px;
      padding: 5px 0px;
      margin-bottom: 2px;
      margin-right: 10px;
    }
  }
}
</style>
