<!-- 关键词搜索模块左边搜索条件组件 -->
<template>
  <div class="search-condation-com">
    <div class="module-container">
      <div class="title header-bar">
        <h2>筛选</h2>
        <div class="right">
          <h2 class="pointer h2"
              @click="resetAll">重置</h2>
        </div>
      </div>

      <!-- 筛选条件和列表 -->
      <div class="con-1">
        <div class="scrollbar-wraps">
          <el-scrollbar style="height:100%">
            <!-- 查找范围 -->
            <div class="search-range public-wrap">
              <h4>查找范围</h4>
              <h4 v-if="rangeSetting"
                  class="reset-b pointer"
                    @click="resetSigle(1)">重置</h4>
              <p>
                <el-checkbox-group v-model="range">
                  <el-checkbox v-for="(item,index) in findRange"
                               :key="index"
                               @change="rangeSearch"
                               :disabled="item.highLight !== 1 ? true : false"
                               :label="item.indexKey">
                    {{ item.indexName }}
                  </el-checkbox>
                </el-checkbox-group>
              </p>
            </div>

            <!-- 就诊类型 -->
            <div class="clinic-type public-wrap">
              <h4>就诊类型</h4>
              <h4 v-if="typeSetting"
                  class="reset-b pointer"
                  @click="resetSigle(2)">重置</h4>
              <p>
                <el-button type="text"
                           size="mini"
                           :style="{color:typeColor !== 1 ? '#2b2b2b' : '#0070f4'}"
                           @click.native="goSearch('住院',1,2)">住院</el-button>
                <el-button type="text"
                           size="mini"
                           :style="{color:typeColor !== 2 ? '#2b2b2b' : '#0070f4'}"
                           @click.native="goSearch('门诊',2,2)">门诊</el-button>
                <el-button type="text"
                           size="mini"
                           :style="{color:typeColor !== 3 ? '#2b2b2b' : '#0070f4'}"
                           @click.native="goSearch('急诊',3,2)">急诊</el-button>
              </p>
            </div>

            <!-- 就诊年龄 -->
            <div class="clinic-age public-wrap">
              <h4>就诊年龄</h4>
              <h4 v-if="ageSetting"
                  class="reset-b pointer"
                  @click="resetSigle(6)">重置</h4>
              <p>
                <el-tooltip v-for="(item, index) in clinicAge"
                            :key="index"
                            effect="dark"
                            :content="item.indexKey"
                            placement="top-start">
                  <el-button type="text"
                             size="mini"
                             :style="{color:ageColor !== index ? '#2b2b2b' : '#0070f4'}"
                             @click.native="goSearch(item, index, 6)">{{item.indexName}}</el-button>
                </el-tooltip>
              </p>

              <!-- 范围选择 -->
              <p>
                <el-popover placement="bottom-start"
                            width="335"
                            v-model="visible">
                  <!-- 内容区 -->
                  <div class="range-choose">
                    <div class="range-c">
                      <p style="text-align:center;padding:10px 0;">数据年龄跨度：1天~119岁</p>
                      <el-form :inline="true"
                               :rules="rules"
                               ref="ruleForm"
                               :model="ruleForm">
                        <el-form-item prop="startAge">
                          <el-input style="width:122px;"
                                    :maxlength="3"
                                    placeholder="0"
                                    v-model="ruleForm.startAge">
                            <el-select v-model.number="ruleForm.startUnit"
                                       slot="append"
                                       style="width: 65px;">
                              <el-option label="天"
                                         value="天"></el-option>
                              <el-option label="月"
                                         value="月"></el-option>
                              <el-option label="岁"
                                         value="岁"></el-option>
                            </el-select>
                          </el-input>
                        </el-form-item>

                        <el-form-item>至</el-form-item>

                        <!-- 结束年龄 -->
                        <el-form-item prop="endAge">
                          <el-input style="width:122px;"
                                    :maxlength="3"
                                    placeholder="119"
                                    v-model.number="ruleForm.endAge">
                            <el-select v-model="ruleForm.endUnit"
                                       slot="append"
                                       style="width: 65px;"
                                       placeholder="请选择">
                              <el-option label="天"
                                         value="天"></el-option>
                              <el-option label="月"
                                         value="月"></el-option>
                              <el-option label="岁"
                                         value="岁"></el-option>
                            </el-select>
                          </el-input>
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>
                  <!-- 提交按钮 -->
                  <div style="text-align: center;">
                    <el-button size="mini"
                               @click="visible = false">取消</el-button>
                    <el-button type="primary"
                               size="mini"
                               @click="submitForm('ruleForm')">确定</el-button>
                  </div>
                  <el-button type="text"
                             size="mini"
                             slot="reference"
                             :style="{color: ageColor === 999 ? '#0070f4' : '#2b2b2b'}"
                             @click.native="goShow">
                    {{rangeChoose}}
                    <i class="el-icon-arrow-down"></i>
                  </el-button>
                </el-popover>
              </p>

            </div>

            <!-- 性别 -->
            <div class="gender public-wrap">
              <h4>性别</h4>
              <h4 v-if="genderSetting"
                  class="reset-b pointer"
                  @click="resetSigle(7)">重置</h4>
              <p>
                <el-button v-for="(item,index) in genderDatas"
                           :style="{color: genderColor !== index ? '#2b2b2b' : '#0070f4'}"
                           :key="index"
                           type="text"
                           size="mini"
                           @click.native="goSearch(item, index, 7)">
                  {{item}}
                </el-button>
              </p>
            </div>

          </el-scrollbar>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'searchCondationCom',
  data () {
    const validateStartAge = (rule, value, callback) => {
      const type = '^[0-9]*[1-9][0-9]*$'
      const r = new RegExp(type)
      const flag = r.test(value) // flag = true 即为数字
      if (!flag) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    }
    const validateEndAge = (rule, value, callback) => {
      const type = '^[0-9]*[1-9][0-9]*$'
      const r = new RegExp(type)
      const flag = r.test(value) // flag = true 即为数字
      if (!flag) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    }

    return {
      // 查找范围
      range: [], // 查找范围选中字段
      findRange: [], // 查找范围数据
      findColor: 888, // 点击切换查找范围颜色
      rangeSetting: false, // 查找范围重置按钮的显示

      // 就诊类型
      visitType: '', // 就诊类型字段
      typeColor: 888, // 点击切换就诊类型颜色
      typeSetting: false, // 就诊类型重置按钮的显示

      // 就诊年龄
      visitAge: [], // 就诊年龄字段
      clinicAge: [
        {
          indexName: '新生儿',
          indexKey: '1-28天', // [1*天/月/岁, 28*天/月/岁]
          indexArr: ['1*天', '28*天']
        },
        {
          indexName: '婴儿',
          indexKey: '28天-1岁',
          indexArr: ['28*天', '1*岁']
        },
        {
          indexName: '童年',
          indexKey: '1-6岁',
          indexArr: ['1*岁', '6*岁']
        },
        {
          indexName: '少年',
          indexKey: '7-17岁',
          indexArr: ['7*岁', '17*岁']
        },
        {
          indexName: '青年',
          indexKey: '18-40岁',
          indexArr: ['18*岁', '40*岁']
        },
        {
          indexName: '中年',
          indexKey: '41-65岁',
          indexArr: ['41*岁', '65*岁']
        },
        {
          indexName: '老年',
          indexKey: '65-89岁',
          indexArr: ['65*岁', '89*岁']
        }

      ], // 就诊年龄数据
      ageColor: 888, // 点击切换就诊年龄颜色
      ageSetting: false, // 就诊年龄重置按钮的显示
      ruleForm: {
        startAge: '', // 开始年龄
        startUnit: '天', // 开始单位
        endAge: '', // 结束年龄
        endUnit: '岁' // 结束单位
      },
      rules: {
        startAge: [
          { required: true, trigger: 'blur', validator: validateStartAge }
        ],
        endAge: [
          { required: true, trigger: 'blur', validator: validateEndAge }
        ]
      },
      visible: false, // 控制范围选择框的显示
      rangeChoose: '范围选择', // 范围选择

      // 性别
      gender: [], // 性别字段
      genderDatas: [], // 性别数据
      genderColor: 888, // 点击切换性别颜色
      genderSetting: false // 性别重置按钮的显示

    }
  },
  props: {
    findRang: {
      type: Array,
      default: null
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'keyWordSearchCon', 'keyWordConDatas'])
  },
  watch: {
    visible (val) { // 监听就诊年龄范围选择弹窗
      if (!val) {
        this.ruleForm = {
          startAge: '', // 开始年龄
          startUnit: '天', // 开始单位
          endAge: '', // 结束年龄
          endUnit: '岁' // 结束单位
        }
        this.$refs.ruleForm.resetFields()
      }
    },
    keyWordConDatas (val) {
      if (val) {
        const obj = this.keyWordConDatas
        this.findRange = obj.rangeList ? obj.rangeList : []
        this.genderDatas = obj.gender ? obj.gender : []
      }
    }
    // findRang (val) {
    //   console.log(val)
    //   if (val) {
    //     this.range = [val[0]]
    //     this.rangearg(this.range)
    //   }
    // }
  },
  components: {},
  created () {
    if (this.keyWordConDatas) {
      const obj = this.keyWordConDatas
      this.findRange = obj.rangeList ? obj.rangeList : []
      this.genderDatas = obj.gender ? obj.gender : []
    }
  },
  mounted () { },
  destroyed () {
    this['caseSearch/rangearg']([])
    this['caseSearch/visittypearg']('')
    this['caseSearch/visitagearg']([])
    this['caseSearch/genderarg']([])
  },
  methods: {
    ...mapMutations(['caseSearch/rangearg', 'caseSearch/keyword', 'caseSearch/source', 'caseSearch/visittypearg', 'caseSearch/visitagearg', 'caseSearch/genderarg', 'caseSearch/pagenoarg', 'caseSearch/pagesizearg']),
    ...mapActions(['caseSearch/keyWordListsData']),
    // 全局重置
    resetAll () {
      this.$emit('changeLoading', true)
      // 查找范围
      this.range = []
      this.findColor = 888
      this.rangeSetting = false
      this['caseSearch/rangearg'](this.range)

      // 就诊类型
      this.visitType = ''
      this.typeColor = 888
      this.typeSetting = false
      this['caseSearch/visittypearg'](this.visitType)

      // 就诊年龄
      this.visitAge = []
      this.ageColor = 888
      this.ageSetting = false
      this.rangeChoose = '范围选择'
      this['caseSearch/visitagearg'](this.visitAge)

      // 性别
      this.gender = []
      this.genderColor = 888
      this.genderSetting = false
      this['caseSearch/genderarg'](this.gender)

      this.getSearchListsData() // 刷新数据
    },

    // 单个重置
    resetSigle (num) {
      this.$emit('changeLoading', true)
      switch (num) {
        case 1: // 查找范围
          this.findColor = 888
          this.range = []
          this.rangeSetting = false
          this['caseSearch/rangearg'](this.range)
          break

        case 2: // 就诊类型
          this.typeColor = 888
          this.visitType = ''
          this.typeSetting = false
          this['caseSearch/visittypearg'](this.visitType)
          break

        case 6: // 就诊年龄
          this.ageColor = 888
          this.visitAge = []
          this.rangeChoose = '范围选择'
          this.ageRange = false
          this.ageSetting = false
          this['caseSearch/visitagearg'](this.visitAge)
          break

        case 7: // 性别
          this.genderColor = 888
          this.gender = []
          this.genderSetting = false
          this['caseSearch/genderarg'](this.gender)
          break
      }
      this.getSearchListsData() // 刷新数据
    },

    // 点击搜索
    goSearch (item, index, num) {
      this.$emit('changeLoading', true)
      this['caseSearch/pagenoarg'](1)
      this['caseSearch/pagesizearg'](10)
      switch (num) {
        case 1: // 查找范围
          // this.findColor = index
          // this.range = item.indexKey
          // this.rangeSetting = true
          break

        case 2: // 就诊类型
          this.typeColor = index
          this.visitType = item
          this.typeSetting = true
          this['caseSearch/visittypearg'](this.visitType)
          this.getSearchListsData()
          break

        case 6: // 就诊年龄
          this.ageColor = index
          this.visitAge = item.indexArr
          this.ageSetting = true
          this['caseSearch/visitagearg'](this.visitAge)
          this.getSearchListsData()
          break

        case 7: // 性别
          this.gender = []
          this.genderColor = index
          this.gender.push(item)
          this.genderSetting = true
          this['caseSearch/genderarg'](this.gender)
          this.getSearchListsData()
          break
      }
    },

    // 就诊年龄 范围选择
    goShow () {
      this.ageColor = 999
      this.ageSetting = true
      this.rangeChoose = '范围选择'
      this.visitAge = []
    },

    // 确认提交 就诊年龄 范围选择
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        const obj = this.ruleForm
        if (valid) {
          this.$emit('changeLoading', true)
          this['caseSearch/pagenoarg'](1)
          this['caseSearch/pagesizearg'](10)
          this.visitAge = [obj.startAge + '*' + obj.startUnit, obj.endAge + '*' + obj.endUnit]
          this.rangeChoose = obj.startAge + obj.startUnit + '至' + obj.endAge + obj.endUnit
          this.visible = false
          this['caseSearch/visitagearg'](this.visitAge)
          this.getSearchListsData()
        } else {
          return false
        }
      })
    },

    // 查找范围点击切换选中
    rangeSearch () {
      this.$emit('changeLoading', true)
      this['caseSearch/pagenoarg'](1)
      this['caseSearch/pagesizearg'](10)
      this.rangeSetting = true
      this['caseSearch/rangearg'](this.range)
      this.getSearchListsData()
    },

    // 获取搜索列表数据
    getSearchListsData () {
      const data = this.keyWordSearchCon
      this['caseSearch/keyWordListsData'](data).then(res => {
        this.$emit('changeLoading', false)
        if (res) {}
      }).catch(() => {
        this.$emit('changeLoading', false)
      })
    }

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.search-condation-com {
  .module-container {
    padding-left: 0px;
    padding-right: 0px;
  }
  .header-bar {
    h2 {
      font-size: 14px;
    }
    height: 35px;
    line-height: 35px;
    padding: 0 15px;
    overflow: hidden;
    background: rgba(43, 134, 178, 0.2);
    .h2 {
      color: #828c92;
      &:hover {
        color: #0070f4;
      }
    }
  }

  .scrollbar-wraps {
    height: calc(100vh - 368px);
  }
  .public-wrap {
    padding: 20px 10px 0px 10px;
    font-size: 14px;
    position: relative;
    .reset-b {
      position: absolute;
      right: 15px;
      top: 20px;
      color: rgb(130, 140, 146);
      &:hover {
        color: #0070f4;
      }
    }
  }
}
.range-choose {
  .range-c {
    padding: 0 10px;
  }
}
.select-s {
  height: 39px;
  line-height: 40px;
  color: #dcdfe6;
  border: 1px solid #dcdfe6;
  option {
    height: 39px;
    border: 1px solid #dcdfe6;
  }
}
</style>
<style lang="scss">
.search-condation-com {
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .search-range {
    .el-button + .el-button {
      margin-left: 0px;
    }
    .el-button {
      margin-right: 10px;
    }
  }
  .search-range {
    .el-checkbox {
      margin-right: 10px;
      padding: 5px 0px;
    }
    .el-checkbox__label {
      padding-left: 0 !important;
      font-size: 12px;
    }
    .el-checkbox__input {
      display: none;
    }
  }
}
</style>
