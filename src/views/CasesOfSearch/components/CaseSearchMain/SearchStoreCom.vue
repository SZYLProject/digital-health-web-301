<!-- 搜索收藏组件  -->
<template>
<div class="scrollbar-wraps"
       v-loading="loading"
       element-loading-text="数据加载中..."
       element-loading-spinner="el-icon-loading"
  >
    <el-scrollbar style="height:100%" ref="scroll">
      <div class="search-store-com">
        <ul class="lists-wrap">
          <li class="lists-items pointer"
              v-for="(item,index) in listsData"
              :key="index"
              @click="goJumpKeyWords(item)"
          >
            <!--搜索类型 -->
            <div class="lists-items-title"
                :class="{'bg-blue': item.searchType === 1 ? true : false,
                          'bg-purple':item.searchType === 2 ? true : false,
                          'bg-green':item.searchType === 3 ? true : false,
                      }"
            >
              {{item.searchTypeName}}
            </div>

            <!-- 星星 -->
            <div class="lists-items-star">
              <el-dropdown trigger="click" class="space" ref="messageDrop">
                <span class="pointer"
                      @click.stop="starClick(item)">
                  <svg-icon
                      icon-class="shoucang1"
                      style="color:#0070f4;width:14px;height:14px;"
                  />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <div class="dropdown-checkbox">
                    <el-input
                      size="mini"
                      placeholder="搜索"
                      clearable
                      prefix-icon="el-icon-search"
                      v-model="search"
                      @input="conditionFilter"
                    ></el-input>
                    <el-checkbox-group
                        v-model="checkList"
                        class="block"
                        @change="handleChecked"
                        style="height:150px;width:150px;">
                      <el-scrollbar style="height:100%">
                        <el-checkbox class="ellipsis"
                          :title="items.categoryName"
                          v-for="(items,index) in checkOp"
                          :label="items.id"
                          :key="index"
                        >
                          {{items.categoryName}}
                        </el-checkbox>
                      </el-scrollbar>
                    </el-checkbox-group>
                    <div class="dropdown-button">
                      <el-button
                          type="primary"
                          size="mini"
                          @click.native.stop="sureBtn(item,index)"
                      >
                        确认
                      </el-button>
                      <el-button
                          size="mini"
                          @click.native.stop="cancel(index)"
                      >
                        取消
                      </el-button>
                    </div>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>

            <!-- 搜索条件 -->
            <div class="lists-items-info">
                {{item.searchTerms}}
            </div>

            <!-- 搜索时间/搜索结果 -->
            <div class="lists-items-info2">
              <span class="sn-l">
                搜到 {{ item.personCount }} 名患者,{{ item.noteCount }}个病历
              </span>
              <span class="sn-r">{{ item.searchTime | timeFormat }}</span>
            </div>
          </li>
        </ul>

        <!--点击加载更多数据 -->
        <p class="reminder"
           v-if="loadingData">
          <span class="pointer"
                @click.stop="getMoreData">共计 {{ total }} 条收藏数据，点击加载更多...</span>
        </p>
        <!--没有更多了 -->
        <p class="reminder" v-if="noMore">没有更多了</p>
        <p class="no-data" v-if="noData">暂无数据</p>
      </div>
    </el-scrollbar>
    <!-- 底部清空操作 -->
    <div class="clear-btn pointer"
         @click="clearStoreSearch">
      <span>全部取消收藏</span>
    </div>
</div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import {
  searchCollection,
  searchColleSure,
  searchColleAlldel
} from '@/api/caseSearch' //
const PinyinMatch = require('pinyin-match') //

export default {
  name: 'SearchStoreCom',
  data () {
    return {
      loading: false,
      pageNo: 1, // 默认页码
      pageSize: 10, // 默认每次请求返回的条数

      categoryIds: '', // 选择的分类
      total: 0, // 总条数
      loadingData: false, // 加载更多数据模块
      noMore: false, // 没有更多数据模块
      noData: false, // 无数据模块
      listsData: [], // 列表数据
      search: '', // 搜索分类
      checkList: [], // 分类选准列表
      checkOp: [] // 分类数据
    }
  },
  props: {
    // 下拉选择条件
    selectVal: {
      type: Number,
      default: null
    },
    // 每条数据星星点击下拉数据
    checkOptions: {
      type: Array
    }
  },

  watch: {
    // 分类变化
    selectVal (val) {
      this.categoryIds = val
      this.listsData = []
      this.noData = false
      this.noMore = false
      this.loadingData = false
      this.pageNo = 1
      this.getSearchCollection()
    }
  },

  computed: {
    ...mapGetters(['userInfo', 'theme'])
  },

  components: {},
  created () {},
  mounted () {
    this.$nextTick(() => {
      this.getSearchCollection() // 初始化搜索收藏列表
    })
  },
  destroyed () {},
  methods: {
    ...mapMutations(['caseSearch/keywordsinput']),

    // 获取搜索收藏数据
    getSearchCollection () {
      this.loading = true
      const data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        categoryIds: this.categoryIds !== null ? this.categoryIds : ''
      }

      searchCollection(data)
        .then(res => {
          const obj = res.obj
          if (obj) {
            if (obj.data.length > 0) {
              this.noData = false
              this.total = obj.total
              this.checkList = []

              // this.listsData = this.listsData.concat(obj.data)
              this.listsData.push(...obj.data)

              if (this.listsData.length >= this.total) {
                this.loadingData = false
                this.noMore = true
              } else {
                this.loadingData = true
                this.noMore = false
              }
              this.scrollWay() // 定位滚动条
            } else {
              this.loadingData = false
              this.noMore = false
              this.noData = true // 显示无数据提示模块
            }
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },

    // 更多数据加载函数的调用
    getMoreData () {
      this.pageNo += 1
      this.getSearchCollection()
    },

    // 定位滚动条
    scrollWay () {
      const dom = this.$refs.scroll.wrap
      this.$nextTick(() => {
        dom.scrollTop = dom.scrollHeight
      })
    },

    // 星星点击事件
    starClick (item) {
      const categoryIds = item.categoryIds.split(',')
      this.checkList = []
      this.checkOp = this.checkOptions
      for (let i = 0; i < this.checkOptions.length; i++) {
        categoryIds && categoryIds.map(item => {
          if (Number(this.checkOptions[i].id) === Number(item)) {
            this.checkList.push(Number(item))
          }
        })
      }
      this.search = ''
    },

    // 确认提交分类
    sureBtn (item, index) {
      const newArr = this.checkList.join()
      const id = item.id
      const data = {
        id,
        categoryIds: newArr
      }

      searchColleSure(data)
        .then(res => {
          const success = res.success
          if (success === 0) {
            this.$refs.messageDrop[index].hide()
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.pageNo = 1
            this.listsData = []
            this.noData = false
            this.noMore = false
            this.loadingData = false
            this.getSearchCollection()
          }
        })
        .catch(() => {})
    },

    // 多选框
    handleChecked (val) {
      this.checkList = val
    },

    // 根据输入值过滤分类列表
    conditionFilter () {
      const newV = this.checkOptions
      const newVal = newV.map(item => {
        const newItem = item.categoryName.search(this.search) !== -1 ||
                        PinyinMatch.default.match(item.categoryName, this.search)
        if (newItem) return item
      }).filter(item => item)
      this.checkOp = newVal
    },

    // 取消操作
    cancel (index) {
      this.$refs.messageDrop[index].hide()
    },

    // 点击列表跳转关键词与高级搜索条件树
    goJumpKeyWords (item) {
      switch (Number(item.searchType)) {
        case 1: // 跳转关键词
          this['caseSearch/keywordsinput'](item.searchTerms)
          this.$router.push('KeywordsSearch')
          break
        case 2: // 高级搜索
          this.$router.push('AdvancedSearch') //
          this.$Storage.localSet('searchJson', item.searchJson)
          break
        case 3: // 条件数
          break
      }
    },

    // 清除搜索收藏
    clearStoreSearch () {
      this.$confirm('确定清空搜索收藏吗？此操作无法撤销。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.postSearchStoreAlldel()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },

    // 搜索收藏删除
    postSearchStoreAlldel () {
      const data = {
        userId: this.userInfo?.pkId
      }
      searchColleAlldel(data)
        .then(res => {
          const status = res.success
          if (status === 0) {
            this.listsData = [] // 清空列表数据
            this.noData = true
            this.loadingData = false
            this.noMore = false
            this.$message({
              type: 'success',
              message: res.msg
            })
          }
        }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.clear-btn{
  color: #0070f4;
  font-size: 14px;
}
.search-store-com {
  position: relative;
  min-height: 200px;
  .lists-wrap {
    .lists-items {
      padding: 10px;
      height: 100px;
      border: 1px solid #e6e6e6;
      position: relative;
      margin-bottom: 10px;
    }

    .lists-items-title {
      width: 80px;
      height: 24px;
      font-size: 12px;
      line-height: 24px;
      border-radius: 2px;
      font-weight: 700;
      text-align: center;
    }

    .lists-items-star {
      position: absolute;
      right: 10px;
      top: 13px;
      span {
        margin: 0 10px;
      }
    }

    .lists-items-info {
      margin: 10px 0;
      font-size: 14px;
      color: #333333;
      overflow: hidden; /* 溢出时不显示溢出的内容 */
      text-overflow: ellipsis; /* 发生溢出时使用省略号代替 */
      display: -webkit-box; /* chrome浏览器的私有属性。显示为box。 */
      -webkit-box-orient: vertical; /* 垂直排列元素 */
      -webkit-line-clamp: 1; /* 显示多少行 */
    }

    .lists-items-info2 {
      font-size: 12px;
      color: #999999;
      overflow: hidden;
      .sn-l{
        float: left;
      }
      .sn-r{
        float: right;
        padding-top: 1px;
      }
    }

    .bg-blue {
      background: rgba(0,112,244,0.3);
      color: #0070f4;
    }
    .bg-purple {
      background: rgba(144,94,255,0.3);
      color: #905eff;
    }
    .bg-green {
      background: rgba(34,172,56,0.3);
      color: #905eff;
    }
  }
  .reminder {
    text-align: center;
    color: #0070f4;
    padding: 10px 0px;
    font-size: 12px;
  }
  .no-data {
    position: absolute;
    top: 200px;
    left: 40%;
    color: #2b2b2b;
    font-size: 18px;
  }
  .loading-icon {
    position: absolute;
    width: 100%;
    top: 200px;
  }
}
</style>
