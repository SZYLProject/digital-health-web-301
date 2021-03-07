<!-- 高级搜索组件 -->
<template>
  <div class="advanced-search-com"
       v-loading="seniorLoading"
       element-loading-text="数据加载中..."
       element-loading-spinner="el-icon-loading">
    <!-- 维度切换选择模块 -->
    <!-- <div class="radio-check">
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
    </div> -->

    <!-- 搜索模块 -->
    <div class="search-model">
      <!-- 标题 -->
      <el-row :gutter="10"
              class="form-title">
        <el-col style="width:100px"
                v-if="conditionList && conditionList.length > 1">搜索关系</el-col>
        <el-col style="width:150px">搜索主题</el-col>
        <el-col :span="4">搜索条件</el-col>
        <el-col :span="6">值域范围</el-col>
        <el-col :span="4">
          <!-- 操作 -->
        </el-col>
      </el-row>

      <!-- 列表项 -->
      <div v-for="(item, index) in conditionList"
           :key="index">
        <!-- 树形图 -->
        <el-row :gutter="10">
          <!-- 搜索关系 -->
          <el-col style="width:100px"
                  v-if="conditionList && conditionList.length > 1">
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
                             v-model="item.name"
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
                       :disabled="!item.name"
                       v-model="item.type">
              <el-option v-for="option in getOption(item.dataOptionType)"
                         :key="option"
                         :label="option"
                         :value="option"></el-option>

            </el-select>
          </el-col>

          <!-- 值域范围 -->
          <el-col :span="6">
            <!--根据type显示不同的框-->

            <!--radio-->
            <el-radio-group :disabled="!item.name"
                            v-model="item.value"
                            size="small"
                            v-if="getFormType(item.dataOptionType) === 'radio'">
              <el-radio label="'是'">是</el-radio>
              <el-radio label="'否'">否</el-radio>
            </el-radio-group>

            <!--select-->
            <el-select :disabled="!item.name"
                       v-model="item.value"
                       placeholder="请选择"
                       size="small"
                       v-else-if="getFormType(item.dataOptionType) === 'select'">
              <el-option v-for="(listItem,index) in item.dataOption"
                         :key="index"
                         :label="listItem"
                         :value="listItem">
              </el-option>
            </el-select>

            <!--date-->
            <!-- 非区间 -->
            <el-date-picker :disabled="!item.name"
                            v-model="item.value"
                            type="datetime"
                            placeholder="选择日期时间"
                            size="small"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            style="width:100%"
                            v-else-if="getFormType(item.dataOptionType ) === 'date' &&
                            (item.type!=='区间外'&&item.type !== '区间内')">
            </el-date-picker>
            <!-- 区间内 -->
            <el-row v-else-if="getFormType(item.dataOptionType) === 'date' &&
                            (item.type==='区间外' || item.type === '区间内')"
                    style="margin-bottom:0">
              <el-col :span="11">
                <el-date-picker :disabled="!item.name"
                                v-model="item.date1"
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
                <el-date-picker :disabled="!item.name"
                                v-model="item.date2"
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
            <el-row v-else-if="item.dataOptionType===1 &&
                            (item.type==='区间外' || item.type === '区间内')"
                    style="margin-bottom:0">
              <el-col :span="11">
                <el-input size="small"
                          :disabled="!item.name"
                          placeholder="最小值"
                          v-model="item.date1">
                </el-input>
              </el-col>
              <el-col class="line"
                      :span="2">-</el-col>
              <el-col :span="11">
                <el-input size="small"
                          :disabled="!item.name"
                          placeholder="最大值"
                          v-model="item.date2">
                </el-input>
              </el-col>
            </el-row>
            <!-- 非区间 -->
            <el-input size="small"
                      :disabled="!item.name"
                      placeholder="对比值"
                      v-model="item.value"
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
                 v-if="item.name">
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
        <div v-if="item.childList && item.childList.length > 0">
          <el-row :class="i === 0 ? 'first-child' : 'child-row'"
                  :gutter="10"
                  v-for="(child,i) in item.childList"
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
        <!-- <el-col :span="12"
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
        </el-col> -->
        <el-col :span="24"
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
               :visible.sync="searchTitVisi"
               append-to-body>
      <DataDictionaryPop @dialogDatas="dialogDatas"
                         :openDialog="searchTitVisi"
                         :popArguments='popArguments' />
    </el-dialog>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import { advancedSearchHistoryDatas, getDataOption } from '@/api/caseSearch'
import DataDictionaryPop from '@/components/DataDictionaryPop' // 引入弹窗
import { getOption, getFormType } from '@/utils/searchRelation'
import { stringToArr, deepClone } from '@/utils/index'

const PinyinMatch = require('pinyin-match') //

export default {
  name: 'advancedSearchCom',
  data () {
    return {
      model: '1',
      // 高级搜索条件
      conditionList: [
        {
          childList: [],
          opt: 'AND', // 并或关系
          indexName: '', // 后台需要的tableName
          name: '', // 前台回显的dataItemName
          key: '', // 后台需要的fieldName
          fieldId: '', // 排除历史搜索id
          dataOptionType: 0, // 确定条件关系类型
          type: '', // 条件关系
          value: '', // 一个输入框
          date1: '', // 两个输入框时回显
          date2: '', // 两个输入框时回显
          dataOption: [] // 下拉选项
        }
      ],
      searchTitVisi: false, // 是否显示搜索主题弹窗
      nowIndex: 0,
      childIndex: 0,
      isChild: false,
      restaurants: [], // 搜索主题历史数据
      popArguments: '', // 历史id
      adSearchLoading: false
    }
  },
  props: ['advancedData'],
  computed: {
    ...mapGetters(['userInfo', 'seniorLoading'])
  },
  watch: {
  },
  components: { DataDictionaryPop },
  created () {
  },
  mounted () {
    const obj = deepClone(this.advancedData)
    console.log(obj)
    if (obj && obj.length > 0) {
      obj.map((item, index) => {
        item.serialNumber = index
        if (getFormType(item.dataOptionType) === 'date' &&
          (item.type === '区间外' || item.type === '区间内')) {
          item.value = [item.date1, item.date2]
        } else {
          item.value = stringToArr(item.value, 'toString')
        }
        if (item.childList.length > 0) {
          item.childList.map(child => {
            if (getFormType(child.dataOptionType) === 'date' &&
              (child.type === '区间外' || child.type === '区间内')) {
              child.value = [child.date1, child.date2]
            } else {
              child.value = stringToArr(child.value, 'toString')
            }
          })
        }
      })
      this.conditionList = obj
    } else {
      this.conditionList = [
        {
          childList: [],
          opt: 'AND', // 并或关系
          indexName: '', // 后台需要的tableName
          name: '', // 前台回显的dataItemName
          key: '', // 后台需要的fieldName
          fieldId: '', // 排除历史搜索id
          dataOptionType: 0, // 确定条件关系类型
          type: '', // 条件关系
          value: '', // 一个输入框
          date1: '', // 两个输入框时回显
          date2: '', // 两个输入框时回显
          dataOption: [] // 下拉选项
        }
      ]
    }
  },
  destroyed () {
    this.conditionList = [
      {
        childList: [],
        opt: 'AND', // 并或关系
        indexName: '', // 后台需要的tableName
        name: '', // 前台回显的dataItemName
        key: '', // 后台需要的fieldName
        fieldId: '', // 排除历史搜索id
        dataOptionType: 0, // 确定条件关系类型
        type: '', // 条件关系
        value: '', // 一个输入框
        date1: '', // 两个输入框时回显
        date2: '', // 两个输入框时回显
        dataOption: [] // 下拉选项
      }
    ]
  },
  methods: {
    ...mapActions(['queueSearch/fetchSeniorSearch']),
    getOption, // 根据类型展示不同选项
    getFormType, // 根据类型展示不同组件
    radioChange (val) {
      this.model = val
    },

    // 提交数据
    searchHandle () {
      const summitData = deepClone(this.conditionList)
      // this.personNumber = 0 // 患者
      // this.visitNumber = 0// 病例数
      summitData.map((item, index) => {
        item.serialNumber = index
        if (getFormType(item.dataOptionType) === 'date' &&
          (item.type === '区间外' || item.type === '区间内')) {
          item.value = [item.date1, item.date2]
        } else {
          item.value = stringToArr(item.value, 'toArray')
        }
        if (item.dataOptionType === 1 &&
          (item.type === '区间外' || item.type === '区间内')) {
          item.value = [item.date1, item.date2]
        }
        if (item.childList.length > 0) {
          item.childList.map(child => {
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
        if (item.name === '' || item.type === '' || item.value.length === 0) {
          return false
        } else {
          return true
        }
      })
      const flag = !(status.toString().search('false') !== -1)
      if (flag) {
        this['queueSearch/fetchSeniorSearch'](summitData)
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
      popArg.push(this.conditionList[index].id)
      if (this.conditionList[index].childList.length > 0) {
        this.conditionList[index].childList.map(childItem => {
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
          this.restaurants = res.obj.map(item => {
            this.$set(item, 'value', item.dataItemName)
            return item
          })
        } else {
          this.restaurants = []
        }
      }).catch(() => { })
    },

    // 主题选项
    handleSelect (item) {
      if (this.isChild) {
        this.conditionList[this.nowIndex].childList[this.childIndex].id = item.id
        this.conditionList[this.nowIndex].childList[this.childIndex].name = item.dataItemName
        this.conditionList[this.nowIndex].childList[this.childIndex].key = item.fieldName
        this.conditionList[this.nowIndex].childList[this.childIndex].dataOptionType = item.dataOptionType
        this.conditionList[this.nowIndex].childList[this.childIndex].dataItemCode = item.dataItemCode
        // if 类型是4 需要接口获取option
        if (item.dataOptionType === 4) {
          getDataOption(item.dataItemCode).then(res => {
            const list = []
            res.obj.map(v => {
              list.push(v.dataOptionValue)
            })
            this.conditionList[this.nowIndex].childList[this.childIndex].dataOption = list
          })
        }
      } else {
        this.conditionList[this.nowIndex].indexName = item.tableName
        this.conditionList[this.nowIndex].id = item.id
        this.conditionList[this.nowIndex].name = item.dataItemName
        this.conditionList[this.nowIndex].key = item.fieldName
        this.conditionList[this.nowIndex].dataOptionType = item.dataOptionType
        this.conditionList[this.nowIndex].dataItemCode = item.dataItemCode
        // if 类型是4 需要接口获取option
        if (item.dataOptionType === 4) {
          getDataOption(item.dataItemCode).then(res => {
            const list = []
            res.obj.map(v => {
              list.push(v.dataOptionValue)
            })
            this.conditionList[this.nowIndex].dataOption = list
          })
        }
      }
    },

    // 获取搜索主题
    dialogDatas (val) {
      if (val) {
        this.$set(val, 'value', val.dataItemName)
        if (this.isChild) {
          this.conditionList[this.nowIndex].childList[this.childIndex].id = val.id
          this.conditionList[this.nowIndex].childList[this.childIndex].name = val.dataItemName
          this.conditionList[this.nowIndex].childList[this.childIndex].key = val.fieldName
          this.conditionList[this.nowIndex].childList[this.childIndex].dataOptionType = val.dataOptionType
          this.conditionList[this.nowIndex].childList[this.childIndex].dataItemCode = val.dataItemCode
          // if 类型是4 需要接口获取option
          if (val.dataOptionType === 4) {
            getDataOption(val.dataItemCode).then(res => {
              const list = []
              res.obj.map(v => {
                list.push(v.dataOptionValue)
              })
              this.conditionList[this.nowIndex].childList[this.childIndex].dataOption = list
            })
          }
        } else {
          this.conditionList[this.nowIndex].indexName = val.tableName
          this.conditionList[this.nowIndex].id = val.id
          this.conditionList[this.nowIndex].name = val.dataItemName
          this.conditionList[this.nowIndex].key = val.fieldName
          this.conditionList[this.nowIndex].dataOptionType = val.dataOptionType
          this.conditionList[this.nowIndex].dataItemCode = val.dataItemCode
          // if 类型是4 需要接口获取option
          if (val.dataOptionType === 4) {
            getDataOption(val.dataItemCode).then(res => {
              const list = []
              res.obj.map(v => {
                list.push(v.dataOptionValue)
              })
              this.conditionList[this.nowIndex].dataOption = list
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
      popArg.push(this.conditionList[index].id)
      if (this.conditionList[index].childList.length > 0) {
        this.conditionList[index].childList.map(childItem => {
          popArg.push(childItem.id)
        })
      }
      this.popArguments = stringToArr(popArg, 'toString')

      this.searchTitVisi = true
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter((item) => {
        const newItem = item.value.search(queryString) !== -1 ||
          PinyinMatch.match(item.value, queryString)
        if (newItem) return item
      }) : restaurants
      cb(results)
    },

    // 增加条件
    addCondition () {
      this.conditionList.push(
        {
          childList: [],
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
      this.conditionList[index].childList.push(
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
      this.conditionList.splice(index, 1)
    },

    // 删除子条件
    deleteChildCondition (index, pIndex) {
      this.conditionList[pIndex].childList.splice(index, 1)
    },

    // 清空条件
    clearCondition () {
      // this.personNumber = 0 // 患者
      // this.visitNumber = 0// 病例数
      this.conditionList = [
        {
          childList: [],
          opt: 'AND', // 并或关系
          indexName: '', // 后台需要的tableName
          name: '', // 前台回显的dataItemName
          key: '', // 后台需要的fieldName
          fieldId: '', // 排除历史搜索id
          dataOptionType: 0, // 确定条件关系类型
          type: '', // 条件关系
          value: '', // 一个输入框
          date1: '', // 两个输入框时回显
          date2: '', // 两个输入框时回显
          dataOption: [] // 下拉选项
        }
      ]
    },

    // 跳转条件树
    goTree () {
      alert('跳转树形检索模式')
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
