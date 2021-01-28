<!-- 高级搜索组件 -->
<template>
  <div class="advanced-search-com"
       v-loading="adSearchLoading"
       element-loading-text="数据加载中..."
       element-loading-spinner="el-icon-loading">
    <!-- 维度切换选择模块 -->
    <div class="radio-check">
      <p style="margin-bottom:8px;">
        <el-radio label="1"
                  style="color: rgba(43,43,43,1)"
                  v-model="model"
                  @change="radioChange">患者维度</el-radio>
        <span style="color: #999999;font-size:14px;">
          （某患者的全部就诊的合集满足搜索条件，则该患者符合搜索条件的就诊能被搜索到）
        </span>
      </p>
      <p>
        <el-radio label="0"
                  style="color: rgba(43,43,43,1)"
                  v-model="model"
                  @change="radioChange">就诊维度</el-radio>
        <span style="color: #999999;font-size:14px;">
          （单次就诊满足搜索条件，则该次就诊能被搜索到）
        </span>
      </p>
    </div>

    <!-- 搜索模块 -->
    <div class="search-model">
      <!-- 标题 -->
      <el-row :gutter="10"
              class="form-title">
        <el-col style="width:100px"
                v-if="searchCondition && searchCondition.length > 1">搜索关系</el-col>
        <el-col style="width:150px">搜索主题</el-col>
        <el-col :span="4">搜索条件</el-col>
        <el-col :span="6">值域范围</el-col>
        <el-col :span="4">
          <!-- 操作 -->
        </el-col>
      </el-row>

      <!-- 列表项 -->
      <div v-for="(item, index) in searchCondition"
           :key="index">
        <!-- 树形图 -->
        <el-row :gutter="10">
          <!-- 搜索关系 -->
          <el-col style="width:100px"
                  v-if="searchCondition && searchCondition.length > 1">
            <el-select v-if="index !== 0"
                       placeholder="请选择"
                       size="small"
                       v-model="item.opt">
              <el-option label="并且"
                         :value="'AND'"></el-option>
              <el-option label="或者"
                         :value="'OR'"></el-option>
              <el-option label="排除"
                         :value="'NOT'"></el-option>
            </el-select>
          </el-col>

          <!-- 搜索主题 -->
          <el-col style="width:150px">
            <el-autocomplete size="small"
                             v-model="item.parentVariable.name"
                             placeholder="搜索项"
                             :fetch-suggestions="querySearch"
                             @focus="getHistoryDatas(index)"
                             @select="handleSelect">
              <i class="el-icon-plus el-input__icon"
                 slot="suffix"
                 @click="handleIconClick(index)">
              </i>
            </el-autocomplete>
          </el-col>

          <!-- 搜索条件 -->
          <el-col :span="4">
            <el-select placeholder="关系"
                       size="small"
                       :disabled="!item.parentVariable.name"
                       v-model="item.parentVariable.type">
              <el-option v-for="option in getOption(item.parentVariable.dataOptionType)"
                         :key="option"
                         :label="option"
                         :value="option"></el-option>

            </el-select>
          </el-col>

          <!-- 值域范围 -->
          <el-col :span="6">
            <!--根据type显示不同的框-->

            <!--radio-->
            <el-radio-group :disabled="!item.parentVariable.name"
                            v-model="item.parentVariable.value"
                            size="small"
                            v-if="getFormType(item.parentVariable.dataOptionType) === 'radio'">
              <el-radio label="'是'">是</el-radio>
              <el-radio label="'否'">否</el-radio>
            </el-radio-group>

            <!--select-->
            <el-select :disabled="!item.parentVariable.name"
                       v-model="item.parentVariable.value"
                       placeholder="请选择"
                       size="small"
                       v-else-if="getFormType(item.parentVariable.dataOptionType) === 'select'">
              <el-option v-for="(listItem,index) in item.parentVariable.dataOption"
                         :key="index"
                         :label="listItem"
                         :value="listItem">
              </el-option>
            </el-select>

            <!--date-->
            <!-- 非区间 -->
            <el-date-picker :disabled="!item.parentVariable.name"
                            v-model="item.parentVariable.value"
                            type="datetime"
                            placeholder="选择日期时间"
                            size="small"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            style="width:100%"
                            v-else-if="getFormType(item.parentVariable.dataOptionType ) === 'date' &&
                            (item.parentVariable.type!=='区间外'&&item.parentVariable.type !== '区间内')">
            </el-date-picker>
            <!-- 区间内 -->
            <el-row v-else-if="getFormType(item.parentVariable.dataOptionType) === 'date' &&
                            (item.parentVariable.type==='区间外' || item.parentVariable.type === '区间内')"
                    style="margin-bottom:0">
              <el-col :span="11">
                <el-date-picker :disabled="!item.parentVariable.name"
                                v-model="item.parentVariable.date1"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择日期时间"
                                size="small"
                                style="width:100%">
                </el-date-picker>
              </el-col>
              <el-col class="line"
                      :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker :disabled="!item.parentVariable.name"
                                v-model="item.parentVariable.date2"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择日期时间"
                                size="small"
                                style="width:100%">
                </el-date-picker>
              </el-col>
            </el-row>
            <!--input-->
            <!-- 区间内 -->
            <el-row v-else-if="item.parentVariable.dataOptionType===1 &&
                            (item.parentVariable.type==='区间外' || item.parentVariable.type === '区间内')"
                    style="margin-bottom:0">
              <el-col :span="11">
                <el-input size="small"
                          :disabled="!item.parentVariable.name"
                          placeholder="最小值"
                          v-model="item.parentVariable.date1">
                </el-input>
              </el-col>
              <el-col class="line"
                      :span="2">-</el-col>
              <el-col :span="11">
                <el-input size="small"
                          :disabled="!item.parentVariable.name"
                          placeholder="最大值"
                          v-model="item.parentVariable.date2">
                </el-input>
              </el-col>
            </el-row>
            <!-- 非区间 -->
            <el-input size="small"
                      :disabled="!item.parentVariable.name"
                      placeholder="对比值"
                      v-model="item.parentVariable.value"
                      v-else>
            </el-input>
            <!--根据type显示不同的框-->
          </el-col>

          <!-- 操作按钮 -->
          <el-col :span="4">
            <div class="opr-button">
              <i class="iconfont icon-gengduo1"
                 style="color:#00a0e9;"
                 @click="addChildCondition(index)"
                 v-if="item.parentVariable.name">
                <!-- 过滤 -->
              </i>
              <i class="el-icon-circle-plus"
                 style="color:#94dc68"
                 @click="addCondition">
                <!-- 添加 -->
              </i>
              <i class="el-icon-error"
                 style="color:#d7d7d7"
                 v-if="index !== 0"
                 @click="deleteCondition(index)">
                <!-- 删除 -->
              </i>
            </div>
          </el-col>
        </el-row>

        <!-- 子集 -->
        <div v-if="item.advanceSearchVariableDTOList && item.advanceSearchVariableDTOList.length > 0">
          <el-row :class="i === 0 ? 'first-child' : 'child-row'"
                  :gutter="10"
                  v-for="(child,i) in item.advanceSearchVariableDTOList"
                  :key="i">

            <!-- 搜索项 -->
            <el-col style="width:150px">
              <el-autocomplete size="small"
                               v-model="child.name"
                               placeholder="搜索项"
                               :fetch-suggestions="querySearch"
                               @focus="getHistoryDatas(index,i)"
                               @select="handleSelect">
                <i class="el-icon-plus el-input__icon"
                   slot="suffix"
                   @click="handleIconClick(index,i)">
                </i>
              </el-autocomplete>
            </el-col>

            <!-- 关系 -->
            <el-col :span="4">
              <el-select placeholder="关系"
                         size="small"
                         :disabled="!child.name"
                         v-model="child.type">
                <el-option v-for="option in getOption(child.dataOptionType)"
                           :key="option"
                           :label="option"
                           :value="option"></el-option>

              </el-select>
            </el-col>

            <!-- 据type显示不同的框 -->
            <el-col :span="6">
              <!--根据type显示不同的框-->
              <!--radio-->
              <el-radio-group :disabled="!child.name"
                              v-model="child.value"
                              size="small"
                              v-if="getFormType(child.dataOptionType)==='radio'">
                <el-radio label="'是'">是</el-radio>
                <el-radio label="'否'">否</el-radio>
              </el-radio-group>
              <!--select-->
              <el-select :disabled="!child.name"
                         v-model="child.value"
                         filterable
                         placeholder="请选择"
                         size="small"
                         v-else-if="getFormType(child.dataOptionType)==='select'">
                <el-option v-for="(listItem,index) in child.dataOption"
                           :key="index"
                           :label="listItem"
                           :value="listItem">
                </el-option>
              </el-select>
              <!--date-->
              <!-- 非区间 -->
              <el-date-picker :disabled="!child.name"
                              v-model="child.value"
                              type="datetime"
                              placeholder="选择日期时间"
                              size="small"
                              style="width:100%"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              v-else-if="getFormType(child.dataOptionType)==='date'&&
                            (child.type!=='区间外'&&child.type!=='区间内')">
              </el-date-picker>
              <!-- 区间内 -->
              <el-row v-else-if="getFormType(child.dataOptionType)==='date'&&
                            (child.type==='区间外'||child.type==='区间内')"
                      style="margin-bottom:0">
                <el-col :span="11">
                  <el-date-picker :disabled="!child.name"
                                  v-model="child.date1"
                                  type="datetime"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  placeholder="选择日期时间"
                                  size="small"
                                  style="width:100%">
                  </el-date-picker>
                </el-col>
                <el-col class="line"
                        :span="2">-</el-col>
                <el-col :span="11">
                  <el-date-picker :disabled="!child.name"
                                  v-model="child.date2"
                                  type="datetime"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  placeholder="选择日期时间"
                                  size="small"
                                  style="width:100%">
                  </el-date-picker>
                </el-col>
              </el-row>
              <!--input-->
              <!-- 区间内 -->
              <el-row v-else-if="child.dataOptionType==1 &&
                            (child.type==='区间外' || child.type === '区间内')"
                      style="margin-bottom:0">
                <el-col :span="11">
                  <el-input size="small"
                            :disabled="!child.name"
                            placeholder="最小值"
                            v-model="child.date1">
                  </el-input>
                </el-col>
                <el-col class="line"
                        :span="2">-</el-col>
                <el-col :span="11">
                  <el-input size="small"
                            :disabled="!child.name"
                            placeholder="最大值"
                            v-model="child.date2">
                  </el-input>
                </el-col>
              </el-row>
              <!-- 非区间 -->
              <el-input size="small"
                        :disabled="!child.name"
                        placeholder="对比值"
                        v-model="child.value"
                        v-else>
              </el-input>
              <!--根据type显示不同的框-->
            </el-col>
            <el-col :span="4">
              <div class="opr-button">
                <i class="el-icon-error"
                   style="color:#d7d7d7"
                   @click="deleteChildCondition(i,index)">
                  <!-- 删除 -->
                </i>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

    </div>

    <!-- 搜索按钮 -->
    <div class="search-footer">
      <el-row :gutter="20">
        <el-col :span="12"
                class="left-footer">
          筛出患者
          <span style="color: #f9a157;"> {{ personNumber }}</span>
          病历数
          <span style="color: #f9a157;">{{ visitNumber }}</span>
          <i class="iconfont icon-dengpao1"
             style="color: #f9a157;"></i>
          可切换<i class="pointer"
             style="color: #0070f4;"
             @click="goTree">树形检索模式</i>查看搜索逻辑
        </el-col>
        <el-col :span="12"
                style="text-align:right">
          <el-button type="text"
                     icon="el-icon-delete"
                     @click="clearCondition">清空条件</el-button>
          <el-button type="primary"
                     size="medium"
                     @click="searchHandle">搜索</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 弹窗 -->
    <el-dialog width="50%"
               :visible.sync="searchTitVisi">
      <search-pop-com @dialogDatas="dialogDatas"
                      :openDialog="searchTitVisi"
                      :popArguments='popArguments' />
    </el-dialog>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import { advancedSearchHistoryDatas, getDataOption, advancedSearchCommit } from '@/api/caseSearch'
import SearchPopCom from '@/components/DataDictionaryPop' // 引入弹窗
// import SearchPopCom from './SearchPopCom' // 引入弹窗
import { getOption, getFormType } from '@/utils/searchRelation'
import { stringToArr, deepClone } from '@/utils/index'

const PinyinMatch = require('pinyin-match') //

export default {
  name: 'advancedSearchCom',
  data () {
    return {
      model: '1',
      // 高级搜索条件
      searchCondition: [
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
      ],
      searchTitVisi: false, // 是否显示搜索主题弹窗
      nowIndex: 0,
      childIndex: 0,
      isChild: false,
      restaurants: [], // 搜索主题历史数据
      popArguments: '', // 历史id
      personNumber: 0, // 患者
      visitNumber: 0, // 病例数
      adSearchLoading: false,
      flag: false,
      timeout: null,
      interval: null
    }
  },
  props: {
    childMianPage: {
      type: String
    },
    PN: { // 当前页
      type: Number,
      default: 1
    },
    PS: { // 每页显示条数
      type: Number,
      default: 10
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'advanceSearchDatas', 'advanceSearchListDatas'])
  },
  watch: {
    searchCondition: {
      deep: true, // 深度监听设置为 true
      handler (newV, oldV) {
        this['advancedSearch/advancesearchmuta'](newV)
      }
    },
    PS (val) { // 每页展示条数
      if (val) {
        this.searchHandle()
      }
    },
    PN (val) { // 当前页
      if (val) {
        this.searchHandle()
      }
    }
  },
  components: { SearchPopCom },
  created () {
    this.personNumber = this.advanceSearchListDatas ? this.advanceSearchListDatas.personNumber : 0 // 患者
    this.visitNumber = this.advanceSearchListDatas ? this.advanceSearchListDatas.visitNumber : 0 // 病例数
  },
  mounted () {
    if (this.childMianPage) {
      const obj = JSON.parse(this.$Storage.localGet('searchJson')) && JSON.parse(this.$Storage.localGet('searchJson')).advanceSearchGroupDTOList
      if (obj) {
        obj.map((item, index) => {
          item.serialNumber = index
          if (getFormType(item.parentVariable.dataOptionType) === 'date' &&
            (item.parentVariable.type === '区间外' || item.parentVariable.type === '区间内')) {
            item.parentVariable.value = [item.parentVariable.date1, item.parentVariable.date2]
          } else {
            item.parentVariable.value = stringToArr(item.parentVariable.value, 'toString')
          }
          if (item.advanceSearchVariableDTOList.length > 0) {
            item.advanceSearchVariableDTOList.map(child => {
              if (getFormType(child.dataOptionType) === 'date' &&
                (child.type === '区间外' || child.type === '区间内')) {
                child.value = [child.date1, child.date2]
              } else {
                child.value = stringToArr(child.value, 'toString')
              }
            })
          }
        })
        this.searchCondition = obj
        this.searchHandle()
      } else {
        this.searchCondition = this.advanceSearchDatas
      }
    }
  },
  destroyed () {
    this.searchCondition = [
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
  },
  methods: {
    ...mapMutations(['advancedSearch/advancesearchmuta', 'advancedSearch/advancesearchlistmup']),
    getOption, // 根据类型展示不同选项
    getFormType, // 根据类型展示不同组件
    radioChange (val) {
      this.model = val
    },

    // 提交数据
    searchHandle () {
      const summitData = deepClone(this.searchCondition)
      this.personNumber = 0 // 患者
      this.visitNumber = 0// 病例数
      summitData.map((item, index) => {
        item.serialNumber = index
        if (getFormType(item.parentVariable.dataOptionType) === 'date' &&
          (item.parentVariable.type === '区间外' || item.parentVariable.type === '区间内')) {
          item.parentVariable.value = [item.parentVariable.date1, item.parentVariable.date2]
        } else {
          item.parentVariable.value = stringToArr(item.parentVariable.value, 'toArray')
        }
        if (item.parentVariable.dataOptionType === 1 &&
          (item.parentVariable.type === '区间外' || item.parentVariable.type === '区间内')) {
          item.parentVariable.value = [item.parentVariable.date1, item.parentVariable.date2]
        }
        if (item.advanceSearchVariableDTOList.length > 0) {
          item.advanceSearchVariableDTOList.map(child => {
            if (getFormType(child.dataOptionType) === 'date' &&
              (child.type === '区间外' || child.type === '区间内')) {
              child.value = [child.date1, child.date2]
            } else {
              child.value = stringToArr(child.value, 'toArray')
            }
            if (child.dataOptionType === 1 &&
              (child.type === '区间外' || child.type === '区间内')) {
              child.value = [child.date1, child.date2]
            }
          })
        }
      })
      // console.log(summitData)
      const status = summitData.map(item => {
        if (item.parentVariable.name === '' || item.parentVariable.type === '' || item.parentVariable.value.length === 0) {
          return false
        } else {
          return true
        }
      })
      const flag = !(status.toString().search('false') !== -1)
      if (flag) {
        this.adSearchLoading = true
        const data = {
          advanceSearchGroupDTOList: summitData,
          model: this.model,
          pageNo: this.PN,
          pageSize: this.PS
        }
        advancedSearchCommit(data).then(res => {
          // console.log(res)
          const obj = res.obj
          if (obj) {
            this['advancedSearch/advancesearchlistmup'](obj)
            this.personNumber = obj.personNumber // 患者
            this.visitNumber = obj.visitNumber // 病例数
            // 路由跳转
            if (this.$route.path !== '/CasesOfSearch/AdvancedSearch') {
              this.$router.push('AdvancedSearch') // 跳转高级搜索页面
            }
          } else {
            this.personNumber = 0 // 患者
            this.visitNumber = 0// 病例数
          }
          this.adSearchLoading = false
        }).catch(() => {
          this.adSearchLoading = false
        })
      } else {
        this.$message({
          message: '请完善您的搜索条件~',
          type: 'warning'
        })
      }
    },

    // 搜索主题相关
    // 获得搜索历史数据
    getHistoryDatas (index, cIndex) {
      const popArg = []
      this.restaurants = []
      popArg.push(this.searchCondition[index].parentVariable.id)
      if (this.searchCondition[index].advanceSearchVariableDTOList.length > 0) {
        this.searchCondition[index].advanceSearchVariableDTOList.map(childItem => {
          popArg.push(childItem.id)
        })
      }
      if (cIndex !== undefined) {
        this.isChild = true
        this.childIndex = cIndex
      } else {
        this.isChild = false
      }

      this.nowIndex = index
      // console.log(popArg)
      const data = {
        userId: this.userInfo.pkId,
        except: stringToArr(popArg, 'toString')
      }
      // console.log(data)
      advancedSearchHistoryDatas(data).then(res => {
        if (res.obj && res.obj.length > 0) {
          this.restaurants = res.obj.filter(item => {
            this.$set(item, 'value', item.dataItemName)
            return item.clickon
          })
          setTimeout(() => {
            this.restaurants?.length > 0 ? this.flag = false : this.flag = true
          }, 100)
        } else {
          this.restaurants = []
          this.flag = true
        }
      }).catch(() => {
        this.flag = true
      })
    },

    // 主题选项
    handleSelect (item) {
      if (this.isChild) {
        this.searchCondition[this.nowIndex].advanceSearchVariableDTOList[this.childIndex].id = item.id
        this.searchCondition[this.nowIndex].advanceSearchVariableDTOList[this.childIndex].name = item.dataItemName
        this.searchCondition[this.nowIndex].advanceSearchVariableDTOList[this.childIndex].key = item.fieldName
        this.searchCondition[this.nowIndex].advanceSearchVariableDTOList[this.childIndex].dataOptionType = item.dataOptionType
        this.searchCondition[this.nowIndex].advanceSearchVariableDTOList[this.childIndex].dataItemCode = item.dataItemCode
        // if 类型是4 需要接口获取option
        if (item.dataOptionType === 4) {
          getDataOption(item.dataItemCode).then(res => {
            const list = []
            res.obj.map(v => {
              list.push(v.dataOptionValue)
            })
            this.searchCondition[this.nowIndex].advanceSearchVariableDTOList[this.childIndex].dataOption = list
          })
        }
      } else {
        this.searchCondition[this.nowIndex].indexName = item.tableName
        this.searchCondition[this.nowIndex].parentVariable.id = item.id
        this.searchCondition[this.nowIndex].parentVariable.name = item.dataItemName
        this.searchCondition[this.nowIndex].parentVariable.key = item.fieldName
        this.searchCondition[this.nowIndex].parentVariable.dataOptionType = item.dataOptionType
        this.searchCondition[this.nowIndex].parentVariable.dataItemCode = item.dataItemCode
        // if 类型是4 需要接口获取option
        if (item.dataOptionType === 4) {
          getDataOption(item.dataItemCode).then(res => {
            const list = []
            res.obj.map(v => {
              list.push(v.dataOptionValue)
            })
            this.searchCondition[this.nowIndex].parentVariable.dataOption = list
          })
        }
      }
    },

    // 获取搜索主题
    dialogDatas (val) {
      if (val) {
        this.$set(val, 'value', val.dataItemName)
        if (this.isChild) {
          this.searchCondition[this.nowIndex].advanceSearchVariableDTOList[this.childIndex].id = val.id
          this.searchCondition[this.nowIndex].advanceSearchVariableDTOList[this.childIndex].name = val.dataItemName
          this.searchCondition[this.nowIndex].advanceSearchVariableDTOList[this.childIndex].key = val.fieldName
          this.searchCondition[this.nowIndex].advanceSearchVariableDTOList[this.childIndex].dataOptionType = val.dataOptionType
          this.searchCondition[this.nowIndex].advanceSearchVariableDTOList[this.childIndex].dataItemCode = val.dataItemCode
          // if 类型是4 需要接口获取option
          if (val.dataOptionType === 4) {
            getDataOption(val.dataItemCode).then(res => {
              const list = []
              res.obj.map(v => {
                list.push(v.dataOptionValue)
              })
              this.searchCondition[this.nowIndex].advanceSearchVariableDTOList[this.childIndex].dataOption = list
            })
          }
        } else {
          this.searchCondition[this.nowIndex].indexName = val.tableName
          this.searchCondition[this.nowIndex].parentVariable.id = val.id
          this.searchCondition[this.nowIndex].parentVariable.name = val.dataItemName
          this.searchCondition[this.nowIndex].parentVariable.key = val.fieldName
          this.searchCondition[this.nowIndex].parentVariable.dataOptionType = val.dataOptionType
          this.searchCondition[this.nowIndex].parentVariable.dataItemCode = val.dataItemCode
          // if 类型是4 需要接口获取option
          if (val.dataOptionType === 4) {
            getDataOption(val.dataItemCode).then(res => {
              const list = []
              res.obj.map(v => {
                list.push(v.dataOptionValue)
              })
              this.searchCondition[this.nowIndex].parentVariable.dataOption = list
            })
          }
        }
        this.searchTitVisi = false
      }
    },

    // 点击+打开字典弹出层
    handleIconClick (index, cIndex) {
      if (cIndex !== undefined) {
        this.isChild = true
        this.childIndex = cIndex
      } else {
        this.isChild = false
      }
      this.nowIndex = index
      this.popArguments = []
      const popArg = []
      popArg.push(this.searchCondition[index].parentVariable.id)
      if (this.searchCondition[index].advanceSearchVariableDTOList.length > 0) {
        this.searchCondition[index].advanceSearchVariableDTOList.map(childItem => {
          popArg.push(childItem.id)
        })
      }
      this.popArguments = stringToArr(popArg, 'toString')

      this.searchTitVisi = true
    },
    querySearch (queryString, cb) {
      this.interval = setInterval(() => {
        var restaurants = this.restaurants
        if (restaurants?.length > 0) {
          clearInterval(this.interval)
          var results = queryString ? restaurants.filter((item) => {
            const newItem = item.value.search(queryString) !== -1 ||
          PinyinMatch.default.match(item.value, queryString)
            if (newItem) return item
          }) : restaurants
          cb(results)
        } else if (this.flag) {
          clearInterval(this.interval)
          const a = []
          cb(a)
        }
      }, 100)
    },

    // 增加条件
    addCondition () {
      this.searchCondition.push(
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
      )
    },

    // 增加子条件
    addChildCondition (index) {
      this.searchCondition[index].advanceSearchVariableDTOList.push(
        {
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
        }
      )
    },

    // 删除条件
    deleteCondition (index) {
      this.searchCondition.splice(index, 1)
    },

    // 删除子条件
    deleteChildCondition (index, pIndex) {
      this.searchCondition[pIndex].advanceSearchVariableDTOList.splice(index, 1)
    },

    // 清空条件
    clearCondition () {
      this.personNumber = 0 // 患者
      this.visitNumber = 0// 病例数
      this.searchCondition = [
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
    },

    // 跳转条件树
    goTree () {
      // alert('跳转树形检索模式')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.advanced-search-com {
  .radio-check {
    border-bottom: solid 1px rgba(43, 134, 178, 0.2);
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  .search-model {
    border-bottom: solid 1px rgba(43, 134, 178, 0.2);
    overflow: hidden;
    padding-bottom: 10px;
    min-width: 600px;
    .form-title {
      // font-weight: 500;
      color: #999999;
    }
    .opr-button {
      i {
        font-size: 24px !important;
        margin: 4px;
        // vertical-align: middle;
      }
    }
    .el-row {
      margin-bottom: 10px;
    }
    .el-col {
      border: 1px solid transparent;
    }
    .first-child {
      position: relative;
      margin-left: 140px !important;
      &:before {
        position: absolute;
        content: "";
        top: -10px;
        left: -20px;
        width: 25px;
        height: 25px;
        border-style: none none solid solid;
        border-width: 2px;
        border-color: #2c84d5;
      }
    }
    .child-row {
      position: relative;
      margin-left: 140px !important;
      &:before {
        position: absolute;
        content: "";
        top: -30px;
        left: -20px;
        width: 25px;
        height: 45px;
        border-style: none none solid solid;
        border-width: 2px;
        border-color: #2c84d5;
      }
    }
  }
}
</style>
<style lang="scss">
.advanced-search-com {
  .radio-check {
    .el-radio {
      margin-right: 15px;
    }
  }
  .search-footer {
    margin-top: 10px;
    font-size: 14px;
    color: #666666;
    .left-footer span {
      line-height: 40px;
      margin-right: 15px;
    }
  }
}
</style>
