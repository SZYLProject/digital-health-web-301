<!-- 项目列表 -->
<template>
  <div
    class="drag-container"
    v-loading="loading"
    element-loading-text="加载中..."
    element-loading-spinner="el-icon-loading"
  >
    <div class="itxsting">
      <p class="info">请将左侧指标拖入此处</p>
      <draggable
        animation="300"
        class="drag-mdl"
        :list="valD"
        :options="{
          group: { name: 'itxst', pull: false, put: true },
          sort: false,
        }"
        @change="toChange"
      >
        <transition-group> </transition-group>
      </draggable>
    </div>

    <div class="content-collapse">
      <el-collapse
        value="1"
        v-model="activeName"
        style="margin-bottom: 20px"
        v-for="(item, index) in firstdatas"
        :key="index"
        @change="handleChange"
      >
        <el-collapse-item
          :name="item.parentId"
          @mouseenter.native="mouseEnter(index)"
          @mouseleave.native="mouseLeave"
        >
          <template slot="title">
            <div class="title-collapse">
              {{ item.parentName1 }}
              <em class="el-icon-caret-right"></em>
              {{ item.parentName2 }}
              <el-button
                type="text"
                size="mini"
                v-if="del === index"
                icon="el-icon-delete"
                style="margin-left: 0px"
                circle
                @click.native.stop="delAll(item, index)"
              ></el-button>
            </div>
          </template>
          <div class="content-lists" style="padding: 10px 20px">
            <el-row :gutter="0">
              <el-col
                :span="12"
                :key="idx"
                class="el-cols"
                v-for="(itm, idx) in item.child"
              >
                <div class="grid-content">
                  <el-row>
                    <el-col :span="9">
                      <div class="grid-content-children grid-left">
                        <p class="name-map ellipsis1">{{ itm.sourceName }}</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content-child grid-center">
                        <el-tooltip effect="dark" placement="top-start" v-if="itm.rayingStatus !== 1">
                          <div slot="content">
                            {{ itm.dataRule.indexName || "无" }}
                          </div>
                          <p class="f-tit ellipsis1">
                          判定时间：{{ itm.dataRule.indexName || "无" }}
                          </p>
                        </el-tooltip>

                        <el-divider content-position="center">
                          <div class="get-times">
                            <el-tooltip effect="dark" placement="top-start">
                              <div slot="content">
                                {{
                                  itm.rayingStatus === 1
                                    ? "直接映射"
                                    : itm.rayingStatus === 2
                                    ? "首次"
                                    : itm.rayingStatus === 3
                                    ? "末次"
                                    : itm.rayingStatus === 4
                                    ? "所有次"
                                    : itm.rayingStatus === 5
                                    ? "计数"
                                    : itm.rayingStatus === 6
                                    ? "最大值"
                                    : itm.rayingStatus === 7
                                    ? "最小值"
                                    : itm.rayingStatus === 8
                                    ? "求和"
                                    : itm.rayingStatus === 9
                                    ? "平均值"
                                    : "无"
                                }}
                              </div>
                              <p class="q-info ellipsis1">
                                {{
                                  itm.rayingStatus === 1
                                    ? "直接映射"
                                    : itm.rayingStatus === 2
                                    ? "首次"
                                    : itm.rayingStatus === 3
                                    ? "末次"
                                    : itm.rayingStatus === 4
                                    ? "所有次"
                                    : itm.rayingStatus === 5
                                    ? "计数"
                                    : itm.rayingStatus === 6
                                    ? "最大值"
                                    : itm.rayingStatus === 7
                                    ? "最小值"
                                    : itm.rayingStatus === 8
                                    ? "求和"
                                    : itm.rayingStatus === 9
                                    ? "平均值"
                                    : "无"
                                }}
                              </p>
                            </el-tooltip>
                            <p
                              class="get-times-button"
                              v-if="itm.rayingStatus !== 1"
                            >
                              <el-button
                                type="text"
                                size="mini"
                                icon="el-icon-edit"
                                circle
                                @click.native="getButton(itm, index, idx)"
                              ></el-button>
                            </p>
                          </div>
                        </el-divider>
                      </div>
                    </el-col>
                    <el-col :span="9">
                      <div class="grid-content-children grid-right">
                        <p class="name-map ellipsis1" v-if="itm.edits">
                          {{ itm.displayName }}
                        </p>
                        <el-input
                          v-else
                          class="input-map"
                          v-model="itm.displayName"
                          ref="saveTagInput"
                          v-fo
                          size="mini"
                          @focus="focusFn(itm, index, idx)"
                          @blur="changeFn(itm, index, idx)"
                        />
                      </div>
                    </el-col>
                  </el-row>
                  <div class="edit-wrap">
                    <el-button
                      type="text"
                      size="mini"
                      icon="el-icon-edit"
                      circle
                      @click.native="editButton(itm, index, idx)"
                    ></el-button>
                    <el-button
                      type="text"
                      size="mini"
                      icon="el-icon-delete"
                      style="margin-left: 0px"
                      circle
                      @click.native="delButton(itm, index, idx)"
                    ></el-button>
                  </div>
                </div>
              </el-col>
              <p class="center-line"></p>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- 外弹窗 -->
    <el-dialog :visible.sync="outerVisible" class="pop-first" width="50%">
      <!-- 内层弹窗 -->
      <el-dialog
        :visible.sync="innerVisible"
        width="50%"
        class="body-dialog-pop"
        append-to-body
      >
        <!-- 内层弹窗头部 -->
        <div slot="title" class="dialog-headers">
          <h1>
            {{ outPopTitle.T1 || "二级标题" }}
            <i class="el-icon-caret-right" ></i>
            {{ outPopTitle.T2 || "三级标题" }}
          </h1>
        </div>
        <!-- 内层弹窗内容区 -->
        <div class="inner-con"
             v-loading="innerLoading"
             element-loading-text="数据加载中..."
             element-loading-spinner="el-icon-loading">
          <el-button
                type="text"
                v-for="(n,i) in innerDataLists"
                :key="i"
                @click.native="innerButton(n)"
          >{{n.dataItemName}}</el-button>
        </div>
      </el-dialog>

      <!-- 外弹窗标题 -->
      <div slot="title" class="dialog-headers">
        <h1>
          <span>编辑规则</span>
          <span
            >{{ outPopTitle.T1 || "二级标题"
            }}<i class="el-icon-caret-right"></i
            >{{ outPopTitle.T2 || "三级标题" }}</span
          >
        </h1>
      </div>

      <!-- 外弹窗内容 -->
      <div class="dialog-con">
        <p class="one-d">
          <span>
            以
            <el-select
              v-model="objPop.time"
              clearable
              size="mini"
              style="width: 130px"
              @change="selectchange"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in optionsTime"
                :key="index"
                :label="item.dataItemName"
                :value="item.id"
              >
              </el-option>
            </el-select>
            为判断标准
          </span>
          <span v-if="conditionObj.length > 0">
            ，取满足以下
            <el-select
              v-model="objPop.condition"
              size="mini"
              style="width: 130px"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in optionsCon"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </span>
        </p>
        <!-- 筛选条件 -->
        <ul class="two-d" style="margin-top: 20px">
          <li v-for="(item, index) in conditionObj" :key="index">
            <!-- one -->
            <el-input
              placeholder="点+获取数据"
              v-model="item.name"
              size="mini"
              style="width: 130px"
              clearable
              class="mrg"
              :readonly="true"
            >
              <i
                slot="suffix"
                class="el-icon-plus el-input__icon pointer"
                @click="handleIconClick(item, index)"
              >
              </i>
            </el-input>
            <!-- two -->
            <el-select
              v-model="item.option"
              clearable
              size="mini"
              style="width: 90px"
              placeholder="请选择"
              class="mrg"
            >
              <el-option v-for="(options, i) in getOptionPop(item.dataOptionType)"
                         :key="i"
                         :label="options"
                         :value="options"></el-option>
            </el-select>
            <!-- three -->

            <!--根据type显示不同的框-->
            <!--radio-->
            <el-radio-group
                      v-model="item.listThree.value"
                      style="width: 130px"
                      size="mini"
                      v-if="getFormType(item.dataOptionType) === 'radio'">
              <el-radio label="'是'">是</el-radio>
              <el-radio label="'否'">否</el-radio>
            </el-radio-group>

            <!--select-->
            <el-select
                    v-model="item.listThree.value"
                    placeholder="请选择"
                    style="width: 150px;margin-right:10px;"
                    size="mini"
                    v-else-if="getFormType(item.dataOptionType) === 'select'">
              <el-option v-for="(listItem, index) in item.dataOption"
                         :key="index"
                         :label="listItem.dataOptionValue"
                         :value="listItem.dataOptionValue">
              </el-option>
            </el-select>

            <!--date-->
            <!-- 非区间 -->
            <el-date-picker
                        v-model="item.listThree.value"
                        type="datetime"
                        placeholder="选择日期时间"
                        size="mini"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        style="width:180px;margin-right:10px;"
                        v-else-if="getFormType(item.dataOptionType) === 'date' &&
                        (item.option !== '区间外' && item.option !== '区间内') ">
            </el-date-picker>
            <!-- 区间内 -->
            <span v-else-if="getFormType(item.dataOptionType) === 'date' &&
                  (item.option === '区间外' || item.option === '区间内')">
                <el-date-picker
                            v-model="item.listThree.date1"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期时间"
                            size="mini"
                            style="width:180px;">
                </el-date-picker>
                -
                <el-date-picker
                            v-model="item.listThree.date2"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期时间"
                            size="mini"
                            style="width:180px;margin-right:10px;">
                </el-date-picker>
            </span>
            <!--input-->
            <!-- 区间内 -->
            <span v-else-if="item.dataOptionType === 1 &&
                  (item.option === '区间外' || item.option === '区间内')">
                <el-input size="mini"
                          placeholder="最小值"
                          style="width:180px;"
                          v-model="item.listThree.date1">
                </el-input>
                -
                <el-input size="mini"
                          placeholder="最大值"
                          style="width:180px;margin-right:10px;"
                          v-model="item.listThree.date2">
                </el-input>
            </span>

            <!-- 非区间 -->
            <el-input size="mini"
                      placeholder="对比值"
                      style="width:180px;margin-right:10px;"
                      v-model="item.listThree.value"
                      v-else>
            </el-input>
            <!--根据type显示不同的框-->

            <!-- 删除 -->
            <el-button
              type="text"
              icon="el-icon-delete"
              @click.native="deleteButton(index)"
            ></el-button>
          </li>
          <li>
            <el-button
              type="text"
              icon="el-icon-plus"
              @click.native="addButton"
            >
              添加筛选条件
            </el-button>
          </li>
        </ul>
        <p>
          的
          <el-select
            v-model="objPop.times"
            clearable
            size="mini"
            style="width: 130px"
            placeholder="请选择"
          >
            <!--  -->
            <el-option
              v-for="(item, index) in getOption(fieldTypeP)"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <!-- 外弹窗底部 -->
      <p slot="footer" class="dialog-footer">
        <span>
          <el-link type="info" @click.native="conditionObj = []"
            >清空条件</el-link
          >
        </span>
        <span>
          <!-- outerVisible = false -->
          <el-button type="primary" size="small" @click="commitDataPop"
            >确 定</el-button
          >
          <el-button @click="outerVisible = false" size="small"
            >取 消</el-button
          >
        </span>
      </p>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import {
  dragStoreDatas,
  delStoreDatas,
  allListsStateDatas,
  getInsidePopDatas,
  getDataOption
} from '@/api/projectsMangement'
import { getOption } from '@/utils/classRelation'
import { getOptionPop, getFormType } from '@/utils/itemLists'
import draggable from 'vuedraggable'
export default {
  name: 'PageTwoRightDrag',
  data () {
    return {
      loading: false,
      firstdatas: [],
      valD: [],
      del: 888,
      activeName: [],
      secondIds: null, // 存储二级id

      // 外弹窗数据
      outerVisible: false,
      outPopTitle: {
        T1: '',
        T2: ''
      }, // 弹窗标题
      optionsTime: [], // 判断标准
      optionsCon: [
        {
          id: '全部条件',
          name: '全部条件'
        },
        {
          id: '任意条件',
          name: '任意条件'
        }
      ], // 满足条件
      objPop: {
        id: null, // 被修改数据的id
        time: '', // 判断标准
        times: '', // 映射条件
        condition: '全部条件' // 满足条件
      },
      conditionObj: [], // 筛选条件数据
      options1: [], //
      options2: [], //
      listIndex: 0,
      fieldTypeP: null,
      // 内弹窗数据
      innerVisible: false,
      innerLoading: false,
      innerDataLists: []
    }
  },
  props: {
    tabIndex: {
      type: Number,
      dafault: 0
    }
  },
  computed: {
    ...mapGetters(['theme', 'userInfo', 'dataSourceValue', 'dragData'])
  },
  watch: {
    firstdatas: {
      handler (newName, oldName) {
        // console.log(newName)
      },
      immediate: true,
      deep: true
    },
    tabIndex (newVal, oldVal) {
      // console.log(newVal)
      this.firstdatas = []
      if (this.dragData[newVal]) {
        this.firstdatas = this.dragData[newVal]
      }
    },
    outerVisible (newVal, oldVal) {
      if (!newVal) {
        this.objPop = {
          time: '', // 判断标准
          times: '',
          condition: '全部条件' // 满足条件
        }
        this.conditionObj = []
      }
    }
  },
  components: { draggable },
  created () {
    this.getAllListsStateDatas()
  },
  mounted () {},
  destroyed () {},
  methods: {
    ...mapMutations(['projectsMangement/storedragdata']),
    getOption, // 弹窗内部类型选择
    getOptionPop, //
    getFormType,
    handleChange (val) {
      console.log(val)
    },
    // 获取初始化回显数据
    getAllListsStateDatas () {
      this.loading = true
      const data = {
        projectId: this.$Storage.sessionGet('projectId')
      }
      allListsStateDatas(data)
        .then((res) => {
          if (res?.obj) {
            this.firstdatas = res.obj || []
            this.firstdatas.map((item) => {
              this.activeName.push(item.parentId)
              item.child.map((m) => {
                m.dataRule = JSON.parse(m.dataRule)
              })
            })
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },

    // 拖拽完成函数调用
    toChange (val) {
      if (val?.added?.element) {
        this.loading = true
        const v = val?.added?.element
        // 拖拽单个数据提交
        const data = {
          id: null,
          projectId: this.$Storage.sessionGet('projectId'), // 项目id
          parentId: v.id2, // 二级字典对应id
          parentName: v.name2, // 二级字典对应名称
          targetId: v.id, // 三级字典对应 id
          sourceName: v.dataItemName, // 三级字典对应名称
          fieldType: v.dataOptionType, // 三级字典对应类型
          displayName: v.displayName, // 被修改的名称
          rayingStatus: v.rayingStatus, // 映射修改的值
          dataRule: JSON.stringify({
            // 映射来源对象
            indexId: v.indexId,
            indexName: v.indexName
          })
        }
        // 拖拽单个数据提交接口调用
        dragStoreDatas(data)
          .then((res) => {
            if (res) {
              const id = res.obj // 存储数据后台返回的唯一数据 id
              this.moveFn(v, id) // 拖拽数据交互成功后渲染列表函数
            }
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    //  拖拽数据渲染
    moveFn (v, id) {
      const fn = this.firstdatas.findIndex((item) => item.parentId === v.id2)
      if (fn !== -1) {
        this.firstdatas[fn].child.push({
          id: id, // 拖拽数据提交成功以后返回的 id 供修改用
          targetId: v.id, // 三级字典对应 id
          sourceName: v.dataItemName, // 三级字典对应名称
          fieldType: v.dataOptionType, // 三级字典对应类型
          secondId: v.id2, // 二级字典对应id
          secondName: v.name2, // 二级字典对应名称
          displayName: v.displayName, // 被修改的名称
          rayingStatus: v.rayingStatus, // 映射修改的值
          list: v.list, // 弹窗下拉列表，
          dataRule: {
            indexId: v.indexId,
            indexName: v.indexName
          },
          edits: true
        })
      } else {
        const obj = {
          parentId: v.id2,
          parentName: v.name2,
          parentName1: v.name1,
          parentName2: v.name2,
          child: []
        }
        obj.child.push({
          id: id, // 拖拽数据提交成功那以后返回的 id 供修改用
          targetId: v.id, // 三级字典对应 id
          sourceName: v.dataItemName, // 三级字典对应名称
          fieldType: v.dataOptionType, // 三级字典对应类型
          secondId: v.id2, // 二级字典对应id
          secondName: v.name2, // 二级字典对应名称
          displayName: v.displayName, // 被修改的名称
          rayingStatus: v.rayingStatus, // 映射修改的值
          list: v.list, // 弹窗下拉列表，
          dataRule: {
            indexId: v.indexId,
            indexName: v.indexName
          },
          edits: true
        })
        this.firstdatas.push(obj) //
        this.activeName.push(obj.parentId) // 折叠板展开判断
        // console.log(this.firstdatas)
      }
      // console.log(this.firstdatas)
      // 将数据存储到本地
      this['projectsMangement/storedragdata']({
        data: this.firstdatas,
        index: this.tabIndex
      })
    },
    // 编辑按钮
    editButton (itm, index, idx) {
      this.firstdatas[index].child[idx].edits = false
      // this['projectsMangement/storedragdata']({
      //   data: this.firstdatas,
      //   index: this.tabIndex
      // })
    },
    // 编辑获取焦点函数
    focusFn (itm, index, idx) {
      // console.log(itm)
    },
    //  修改失去焦点函数
    changeFn (itm, index, idx) {
      this.firstdatas[index].child[idx].edits = true
      const data = {
        id: itm.id, // 修改数据对应的唯一 id
        projectId: this.$Storage.sessionGet('projectId'), // 项目 ID
        parentId: itm.secondId, // 二级字典对应id
        parentName: itm.secondName, // 二级字典对应名称
        targetId: itm.targetId, // 三级字典对应 id
        sourceName: itm.sourceName, // 三级字典对应名称
        fieldType: itm.fieldType, // 三级字典对应类型
        displayName: itm.displayName, // 被修改的名称
        rayingStatus: itm.rayingStatus, // 映射修改的值
        dataRule: JSON.stringify({
          indexId: itm.dataRule.indexId,
          indexName: itm.dataRule.indexName
        })
      }
      // 拖拽数据提交接口调用
      dragStoreDatas(data)
        .then((res) => {
          if (res) {
            this.$message({
              message: '修改成功~',
              type: 'success'
            })
            this['projectsMangement/storedragdata']({
              data: this.firstdatas,
              index: this.tabIndex
            })
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 单个删除
    delButton (itm, index, idx) {
      const data = [itm.id]
      delStoreDatas(data)
        .then((res) => {
          if (res) {
            this.firstdatas[index].child.splice(idx, 1)
            if (this.firstdatas[index].child.length === 0) {
              this.firstdatas.splice(index, 1)
            }
            this['projectsMangement/storedragdata']({
              data: this.firstdatas,
              index: this.tabIndex
            })
            this.$message({
              message: res.msg,
              type: 'success'
            })
          }
        })
        .catch(() => {})
    },
    // 整体删除
    delAll (item, index) {
      const data = []
      item.child.map((n) => {
        data.push(n.id)
      })
      delStoreDatas(data)
        .then((res) => {
          if (res) {
            this.firstdatas.splice(index, 1)
            this['projectsMangement/storedragdata']({
              data: this.firstdatas,
              index: this.tabIndex
            })
            this.$message({
              message: res.msg,
              type: 'success'
            })
          }
        })
        .catch(() => {})
    },
    // 取首次点击显示弹窗函数
    getButton (itm, index, idx) {
      // console.log(itm)
      this.secondIds = itm.secondId // 存储二级id
      this.fieldTypeP = itm.fieldType
      this.outerVisible = true
      this.optionsTime = itm.list || []
      this.objPop.id = itm.id
      this.objPop.time = itm.dataRule.indexId
      this.objPop.times = itm.rayingStatus // 映射条件
      this.objPop.condition = itm.dataRule.condition || '全部条件'
      this.conditionObj = itm.dataRule?.list ?? []

      this.outPopTitle = {
        T1: itm.secondName,
        T2: itm.sourceName
      }
    },
    // 鼠标移入移出
    mouseEnter (val) {
      this.del = val
    },
    mouseLeave () {
      this.del = 888
    },
    // 单击内部弹窗显示
    handleIconClick (item, index) {
      this.innerDataLists = []
      this.innerVisible = true
      this.innerLoading = true
      this.listIndex = index
      // 内弹窗数据
      const data = {
        id: this.secondIds
      }
      getInsidePopDatas(data)
        .then((res) => {
          if (res?.obj) {
            this.innerDataLists = res.obj || []
          }
          this.innerLoading = false
        })
        .catch(() => {
          this.innerLoading = false
        })
    },
    // 添加筛选条件
    addButton () {
      this.conditionObj.push({
        id: '', //
        name: '',
        dataOptionType: null,
        option: '', // 中间选项赋值字段
        dataOption: [], // 选项级数据
        // 第三级数据
        listThree: {
          value: null,
          date1: '',
          date2: ''
        }
      })
    },
    // 删除筛选条件
    deleteButton (index) {
      this.conditionObj.splice(index, 1)
    },
    // 内层弹窗选中点击
    innerButton (n) {
      // console.log(n)
      if (n.dataOptionType === 4) { // 获取下拉数据
        getDataOption(n.dataItemCode).then(res => {
          // console.log(res)
          if (res?.obj) {
            this.conditionObj[this.listIndex].dataOption = res.obj || []
          }
        })
      }
      this.innerVisible = false
      this.conditionObj[this.listIndex].id = n.id
      this.conditionObj[this.listIndex].name = n.dataItemName
      this.conditionObj[this.listIndex].dataOptionType = n.dataOptionType // 类型判断
      this.conditionObj[this.listIndex].option = '' // 类型判断
      this.conditionObj[this.listIndex].listThree = {
        value: null,
        date1: '',
        date2: ''
      } // 类型判断
    },
    // 弹窗确认提交
    commitDataPop () {
      let indexName = null
      this.optionsTime.map((item) => {
        if (this.objPop.time === item.id) {
          indexName = item.dataItemName
        }
      })
      this.conditionObj.map(item => {
        if (getFormType(item.dataOptionType) === 'date' &&
          (item.option === '区间外' || item.option === '区间内')) {
          item.listThree.value = [item.listThree.date1, item.listThree.date2]
        }
        if (item.dataOptionType === 1 &&
          (item.option === '区间外' || item.option === '区间内')) {
          item.listThree.value = [item.listThree.date1, item.listThree.date2]
        }
      })
      const data = {
        id: this.objPop.id,
        dataRule: JSON.stringify({
          indexId: this.objPop.time,
          indexName: indexName,
          times: this.objPop.times,
          condition: this.objPop.condition,
          list: this.conditionObj
        })
      }
      // console.log(data)
      dragStoreDatas(data)
        .then((res) => {
          if (res) {
            this.$message({
              message: '修改成功~',
              type: 'success'
            })
            this.outerVisible = false
            this.getAllListsStateDatas()
            this['projectsMangement/storedragdata']({
              data: this.firstdatas,
              index: this.tabIndex
            })
          }
        })
        .catch(() => {})
    },
    selectchange (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.drag-container {
  width: 100%;
  .itxsting {
    position: relative;
    height: 50px;
    margin: 10px 100px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #999999;
    border: 1px dashed #e6e6e6;
    .info {
      position: absolute;
    }
    .drag-mdl {
      width: 100%;
      height: 100%;
      span {
        display: inline-block !important;
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
  .content-collapse {
    padding: 20px;
    .title-collapse {
      color: #0070f4;
      font-size: 14px;
    }
    .content-lists {
      position: relative;
      .el-cols {
        padding-right: 60px;
        &:nth-child(even) {
          .grid-left {
            margin-left: 20px;
          }
        }
      }
      .center-line {
        width: 1px;
        height: 100%;
        border-left: 1px dashed #e6e6e6;
        position: absolute;
        top: 0;
        left: 50%;
      }
      .grid-content {
        position: relative;
        .edit-wrap {
          position: absolute;
          right: -60px;
          top: 6px;
        }
        .grid-content-children {
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #333333;
          font-size: 14px;
          background: rgba(0, 112, 244, 0.05);
        }
        .grid-left {
          padding: 0 10px;
        }
        .grid-center {
          position: relative;
          .f-tit {
            font-size: 12px;
            color: #999999;
            max-width: 110px;
            position: absolute;
            left: 10%;
            top: -32px;
          }
          .get-times {
            position: relative;
            border: dashed 1px rgba(0, 112, 244, 0.3);
            border-radius: 5px;
            padding: 0px 5px;
            max-width: 55px;
            // max-width: 68px;
            .get-times-button {
              position: absolute;
              right: -22px;
              top: -5px;
            }
          }
        }
        .grid-right {
          padding: 0 10px;
        }
        .name-map {
        }
      }
    }
  }
  .dialog-headers {
    padding-bottom: 8px;
    h1 {
      span:nth-child(1) {
        margin-right: 20px;
      }
      span:nth-child(2) {
        color: #999999;
        font-size: 12px;
      }
    }
  }
  .dialog-con {
    min-height: 300px;
    padding-bottom: 20px;
    .two-d {
      li {
        padding-left: 10px;
      }
      .mrg {
        margin-right: 15px;
      }
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
// 内弹窗
.body-dialog-pop{
   .inner-con{
      min-height: 352px;
    }
}
</style>
<style lang="scss">
.drag-container {
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .el-collapse {
    border: solid 1px #e6e6e6;
  }
  .el-collapse-item__content {
    padding: 0;
  }
  .el-collapse-item__header {
    background: rgba(0, 112, 244, 0.1);
    height: 24px;
    font-weight: 700;
    padding-left: 10px;
    color: #2b2b2b;
    .el-collapse-item__arrow {
      color: #0070f4;
    }
  }

  .grid-content {
    .grid-center {
      .el-divider__text {
        padding: 0;
      }
    }
  }
  .pop-first {
    .el-dialog__body {
      border-top: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
    }
    .el-dialog__footer {
      padding-bottom: 10px !important;
    }
  }
}
.body-dialog-pop {
  .dialog-headers {
    padding-bottom: 8px;
    h1 {
      font-weight: normal;
      font-size: 16px;
    }
  }
  .el-dialog__body {
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    .inner-con{
      .el-button--text{
        margin-left: 0px;
        margin-right: 15px;
      }
    }
  }
  .el-dialog__footer {
    padding-bottom: 10px !important;
  }

}
</style>
