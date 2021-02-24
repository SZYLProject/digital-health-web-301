<!-- 关键词搜索模块 -->
<template>
  <div class="keywords-search-module">
    <div class="module-container"
         style="padding-bottom:1px;">
      <!-- 面包削 -->
      <div class="title">
        <h2>
          <span class="pointer"
                @click="goBack"
                @mouseover="mouseOver"
                @mouseleave="mouseLeave"
                :style="{'color': colorStatus !== 0 ? theme : '#787878'}"> 病历搜索 > </span>
          <span :style="{'color': theme}">关键词搜索</span>
        </h2>
        <span class="right full-screen-icon pointer"
              @click="goBack">
          <svg-icon icon-class="suoxiao" />
        </span>
      </div>

      <!-- 搜索区 -->
      <div class="con-1 search-con">
        <!-- 搜索框 -->
        <div style="padding:0px 25%;margin-bottom:20px;">
           <el-row>
            <el-col :span="22">
              <el-input placeholder="输入您要搜索的内容"
                        v-model.trim="searchs"
                        size="medium"
                        @keyup.enter.native="serachFn">
              </el-input>
            </el-col>
            <el-col :span="2">
              <el-button
                type="primary"
                class="btn"
                size="medium"
                @click.native="serachFn">
                搜索
              </el-button>
            </el-col>
          </el-row>
        </div>

        <!-- 搜索说明 -->
        <div class="search-info"
             v-loading="searchInfoModel"
             element-loading-text="数据加载中..."
             element-loading-spinner="el-icon-loading"
             v-if="isShowMoule" >
          <el-collapse v-model="activeNameIndex">
            <el-collapse-item name="1">
              <template slot="title">搜索说明</template>
              <div class="condition-info">
                <!-- 搜索模式 -->
                <div class="search-pattern">
                  <span class="title">搜索模式：</span>
                  <el-radio-group v-model="searchM"
                                  @change="serachModel">
                    <el-radio :label="0">归一搜索</el-radio>
                    <el-radio :label="1">原始搜索</el-radio>
                  </el-radio-group>
                </div>

                 <!-- 归一词 -->
                <div v-if="unification" class="search-fication">
                  <p style="padding-right:13px;">
                    <span class="title">归一词：</span>
                  </p>
                  <p>
                    <el-checkbox-group v-model="unificationWords" @change="checkboxGroup">
                        <el-checkbox
                          v-for="(item,index) in unificationLists"
                          :key="index"
                          v-show="item !== keyWordsSearch"
                          :label="item" > {{item}}</el-checkbox>
                      </el-checkbox-group>
                  </p>
                </div>

                <!-- 搜索范围： -->
                <div class="search-scope"
                     v-if="isShowS">
                  <span class="title">搜索范围：</span>
                  <span>在“{{ searchFData[1] }}”中查找</span>
                  <!-- <el-radio-group v-model="searchF">
                    <el-radio label="all">全部</el-radio>
                    <el-radio :label="searchFData[0]">{{searchFData[1]}}</el-radio>
                  </el-radio-group> -->
                </div>

                <!-- 说明 -->
                <div class="info-icon pointer">
                  <span :style="{'color': theme}"
                        @click="dialogVisible = true">
                    <i class="el-icon-info"></i>说明
                  </span>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="keyword-search-result"
         v-loading="searchInfoModel"
         element-loading-text="数据加载中..."
         element-loading-spinner="el-icon-loading"
         v-if="isShowMoule" >
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
              <AddCollectObject
                    title="收藏"
                    keys="collection"
                    :disabled="disOrNo"/>
            </div>
            <!-- 添加至项目 -->
            <div class="inlineBlock">
              <AddCollectObject title="添加至项目" disabled/>
            </div>
          </div>
        </div>

        <!-- 筛选条件和列表 -->
        <div class="con-2">
          <el-row :gutter="20">
            <!-- 左边搜索条件 -->
            <el-col :span="6">
              <search-condation-com
                @changeLoading="loadingM"
                :findRang="searchFData" />
            </el-col>
            <!-- 右边列表 -->
            <el-col :span="18">
              <search-lists-com
                v-loading="searchListsModel"
                element-loading-text="数据加载中..."
                element-loading-spinner="el-icon-loading"
                @changeLoading="loadingM"
               />
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <!-- 搜索说明弹窗 -->
    <el-dialog :visible.sync="dialogVisible"
               width="40%">
      <div slot="title">
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <!-- 归一搜索 -->
          <el-tab-pane label="归一搜索"
                       name="first">
            <div class="warps">
              <div class="module-container"
                   style="padding:0px;"
                   v-for="(item,index) in info1"
                   :key="index">
                <div class="title">
                  <h2>{{item.title}}</h2>
                </div>
                <div class="con"
                     style="margin:10px 0px;">
                  {{item.msg}}
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!-- 原始搜索 -->
          <el-tab-pane label="原始搜索"
                       name="second">
            <div class="warps">
              <div class="module-container"
                   style="padding:0px;"
                   v-for="(item,index) in info2"
                   :key="index">
                <div class="title">
                  <h2>{{item.title}}</h2>
                </div>
                <div class="con"
                     style="margin:10px 0px;">
                  {{item.msg}}
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import AddCollectObject from '@/components/AddCollectObject'
import { mapGetters, createNamespacedHelpers } from 'vuex'
import { AnalyzeResult, SearchCondationCom, SearchListsCom } from './components'
import { gSearch, ySearch } from './components/search-info'
const { mapMutations, mapActions } = createNamespacedHelpers('caseSearch')

export default {
  name: 'keywordsSearch',
  data () {
    return {
      searchInfoModel: false, // 搜索说明模块
      searchListsModel: false, // 搜索列表模块
      activeNameIndex: '1',
      colorStatus: 0, // 面包削主题色状态控制
      isShowMoule: false, // 控制关键字搜索组件的相关模块的展示
      searchs: '', // 搜索条件关键字的值
      searchM: '', // 搜索模式
      unificationWords: [], // synonymGroup
      unificationLists: [], // 归一词列表
      unification: false,
      // searchF: '', // 搜索范围
      searchFData: [], // 搜索范围数据
      isShowS: false, // 是否显示搜索范围的第二个条件
      dialogVisible: false,
      activeName: 'first'
    }
  },
  watch: {
    dialogVisible (val) {
      if (!val) {
        this.activeName = 'first'
      }
    }
  },
  computed: {
    ...mapGetters(['theme', 'keyWordsSearch', 'keyWordSearchCon', 'keyWordListsId']),
    info1 () {
      return gSearch
    },
    info2 () {
      return ySearch
    },
    disOrNo () {
      return !(this.keyWordListsId?.length > 0)
    }
  },

  components: {
    AnalyzeResult,
    SearchCondationCom,
    SearchListsCom,
    AddCollectObject
  },

  created () {
    if (this.keyWordsSearch.length > 0) {
      this.searchs = this.keyWordsSearch
      this.keyword(this.keyWordsSearch)
    }
  },

  mounted () {
    if (this.searchs.length > 0) {
      this.searchInfoModel = true // 显示数据 Loading
      this.getSearchData() // 获取搜索条件数据
      this.getSearchListsData() // 获取搜索列表数据
    }
  },

  destroyed () {
    this.keywordsinput('')
    this.keyword('')
    this.source('')
    this.synonymgroup([])
  },
  methods: {
    ...mapMutations(['keywordsinput', 'keyword', 'source', 'synonymgroup', 'pagenoarg', 'pagesizearg', 'keywordlists']),
    ...mapActions(['keyWordCondation', 'keyWordListsData']),

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

    // 搜索
    async serachFn () {
      if (this.searchs.length > 0) {
        this.searchInfoModel = true // 显示/隐藏数据 Loading
        this.isShowMoule = false // 隐藏模块
        this.source('') // 搜索模式还原
        this.synonymgroup([]) // 归一词制空

        await this.$nextTick()
        this.isShowMoule = true // 显示模块

        this.pagenoarg(1) // 初始化分页
        this.pagesizearg(10) // 初始化分页
        this.keywordsinput(this.searchs) // 存储关键词
        this.keyword(this.searchs) // 存储关键词 -- 接口参数

        this.getSearchData() // 获取搜索条件数据
        this.getSearchListsData() // 获取搜索列表数据
      } else {
        this.$message({
          message: '搜索关键字不能为空~',
          type: 'warning'
        })
        this.isShowMoule = false
      }
    },

    // 搜索说明 tab 切换
    handleClick (tab, event) { },

    // 获取搜索条件数据
    getSearchData () {
      const data = { //
        keyword: this.searchs
      }
      this.keyWordCondation(data).then(res => {
        if (res) {
          this.isShowMoule = true // 显示隐藏模块
        }
      }).catch(() => { })
    },

    // 获取搜索列表数据
    getSearchListsData () {
      const data = this.keyWordSearchCon
      this.keyWordListsData(data).then(res => {
        this.searchInfoModel = false // 显示/隐藏数据 Loading
        this.searchListsModel = false // 数据加载
        console.log(res)
        if (res) {
          this.searchM = res.source
          this.source(this.searchM)

          if (res.range?.length > 0) {
            this.isShowS = true
            this.searchFData = res.range
          } else {
            this.isShowS = false
            this.searchFData = []
          }
          if (res.source === 0) {
            if (res.synonymAll?.length > 0) {
              this.unification = true
            } else {
              this.unification = false
            }
            this.unificationLists = res.synonymAll?.length > 0 ? res.synonymAll : []
            this.unificationWords = res.synonymGroup?.length > 0 ? res.synonymGroup : []
            this.synonymgroup(res.synonymGroup)
          } else {
            this.unification = false
            this.unificationLists = []
            this.unificationWords = []
            this.synonymgroup([])
          }
        }
      }).catch(() => {
        this.searchInfoModel = false // 显示/隐藏数据 Loading
        this.searchListsModel = false // 数据加载
      })
    },

    // 搜索模式
    serachModel (val) {
      this.searchListsModel = true // 数据加载
      if (val === 0) {
        this.unification = true
      } else {
        this.synonymgroup([])
        this.unification = false
      }
      this.source(val)
      this.pagenoarg(1)
      this.pagesizearg(10)
      this.getSearchListsData() // 获取搜索列表数据
    },

    // 归一词
    checkboxGroup () {
      this.searchListsModel = true // 数据加载
      this.synonymgroup(this.unificationWords)
      this.getSearchListsData() // 获取搜索列表数据
    },

    // 加载模块
    loadingM (val) {
      this.searchListsModel = val // 数据加载
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.keywords-search-module {
  .full-screen-icon {
    padding: 10px;
    margin-top: -15px;
    margin-right: -15px;
    color: #787878;
    &:hover {
      color: #0070f4;
    }
  }

  .con-1 {
    margin: 20px 0;

    .search-info {
      .condition-info {
        padding: 12px 1.5%;
        font-weight: 500;
        color: #2b2b2b;
        position: relative;
      }
      .search-fication{
        p{
          display: inline-block;
        }
      }
      .info-icon {
        position: absolute;
        right: 20px;
        top: 18px;
      }
    }
  }

  .keyword-search-result {
    @include space(top);
    .space {
      @include space(left);
      @include space(right);
    }
  }
}
</style>
<style lang="scss">
.search-info {
  .el-collapse {
    border: solid 1px rgba(43, 134, 178, 0.2);
  }
  .el-collapse-item__header {
    background: rgba(43, 134, 178, 0.2);
    height: 35px;
    font-weight: 700;
    padding-left: 10px;
    color: #2b2b2b;
    .el-collapse-item__arrow {
      color: #0070f4;
    }
  }
}
.keywords-search-module {
  .el-dialog__body {
    padding: 0px;
  }
}
.keywords-search-module{
  .search-con{
    .el-input__inner{
      border-radius: 4px 0px 0px 4px;
    }
    .el-button{
      border-radius: 0px 4px 4px 0px;
    }
  }
}
</style>
