<template>
  <div class="right-lists-page">
    <div class="module-radio">
      <el-radio-group v-model="moduleRadio" size="small">
        <el-radio label="1">搜索历史</el-radio>
        <el-radio label="2">搜索收藏</el-radio>
        <!-- 暂未开发 -->
        <!-- <el-radio label="3">搜索模板</el-radio> -->
      </el-radio-group>
    </div>
    <!-- 组件切换 -->
    <component
      :is="whichCom"
      :checkOptions="checkClassify"
      :selectVal="selectVal"
    ></component>
    <!-- 下拉搜索条件 -->
    <div class="pull-select">
      <el-select
        v-model="selectVal"
        placeholder="全部"
        size="mini"
        @change="selectChange"
        v-if="isShowSelect"
      >
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.categoryName"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { searchColleCondition } from '@/api/caseSearch'
import SearchHistoryCom from './SearchHistoryCom' // 搜索历史
import SearchStoreCom from './SearchStoreCom' // 搜索收藏
import SearchModuleCom from './SearchModuleCom' // 搜索模板

export default {
  name: 'RightListsModule',
  data () {
    return {
      moduleRadio: '1',
      whichCom: 'SearchHistoryCom', // 默认搜索历史模块
      isShowSelect: false, // 是否显示下拉框
      options: [],
      selectVal: null, // 下拉框的值
      checkClassify: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    moduleRadio (val) {
      const idx = Number(val)
      switch (idx) {
        case 1: // 切换搜索历史组件
          this.whichCom = 'SearchHistoryCom'
          this.selectVal = null
          this.isShowSelect = false
          break
        case 2: // 切换搜索收藏组件
          this.whichCom = 'SearchStoreCom'
          this.isShowSelect = true
          break
        case 3: // 切换搜索模板
          this.whichCom = 'SearchModuleCom'
          this.selectVal = null
          this.isShowSelect = false
          break
      }
    }
  },
  components: {
    SearchHistoryCom,
    SearchStoreCom,
    SearchModuleCom
  },
  created () {},
  mounted () {
    this.searchCollDatas() // 调取搜索分类数据
  },
  destroyed () {},
  methods: {
    // 搜索收藏模块下拉选择选准触发
    selectChange (val) {
      this.selectVal = val
    },
    // 调用搜索收藏模块的选择条件接口
    searchCollDatas () {
      const data = {
        categoryType: 2,
        categoryName: ''
      }
      searchColleCondition(data)
        .then((res) => {
          const obj = res.obj
          if (obj) {
            obj.unshift({ categoryName: '全部', id: null })
            this.options = obj
            const newObj = obj
            const newArr = newObj.slice(0)
            newArr.shift()
            this.checkClassify = newArr
          } else {
            this.options = []
          }
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.right-lists-page {
  position: relative;
  overflow: hiddle;
  .module-radio {
    margin-bottom: 15px;
  }
}
.pull-select {
  width: 25%;
  height: 24px;
  position: absolute;
  right: 0px;
  top: -4px;
}
</style>
<style lang="scss">
.right-lists-page {
  .scrollbar-wraps {
    position: relative;
    padding-bottom: 40px;
    height: calc(100vh - 270px);
    .clear-btn {
      position: absolute;
      bottom: 0px;
      &:hover {
        color: rgb(43, 134, 178);
      }
    }
  }
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  //
  .el-tabs__nav-scroll {
    padding: 4px 0px;
  }
  .el-tabs__item {
    height: 38px;
  }
  .el-tabs__active-bar {
    bottom: -4px;
  }
  .module-radio {
    .el-radio {
      margin-right: 10px;
    }
    .el-radio__input {
      display: none;
    }
  }
}
</style>
