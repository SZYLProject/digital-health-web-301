<!-- 研究对象模块 -->
<template>
  <div class="search-object-com">
    <div class="container-wrap">
      <div style="float: left;">
        <!-- 研究对象下面：分组 -->
        <el-dropdown
          size="small"
          split-button
          class="divide-groups"
          style="margin-right: 20px"
        >
          <span> {{ groupName }}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in groups"
              :key="index"
              @click.native="changeGroups(item)"
              >{{ item.groupName }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 筛选 -->
        <el-popover
          v-if="false"
          placement="bottom"
          title="筛选"
          style="margin-right: 20px"
          width="600"
          class="filters-m"
          ref="filterPop"
          trigger="click"
        >
          <div class="file-rate">
            <el-form ref="filterForm" :model="filterForm" label-width="100px">
              <!-- 首次录入时间 -->
              <el-form-item label="首次录入时间">
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    size="mini"
                    placeholder="起始时间"
                    v-model="filterForm.startDate"
                  ></el-date-picker>
                </el-col>
                <el-col class="line" :span="2" style="text-align: center">
                  -
                </el-col>
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    size="mini"
                    placeholder="结束时间"
                    v-model="filterForm.endDate"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
              <!-- 患者状态 -->
              <el-form-item label="患者状态">
                <el-select
                  v-model="filterForm.status"
                  size="mini"
                  placeholder="请选择状态"
                >
                  <el-option label="全部状态" value="1"></el-option>
                  <el-option label="入组" value="2"></el-option>
                  <el-option label="未入组" value="3"></el-option>
                  <el-option label="脱落" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="text-align: right">
                <el-button
                  type="text"
                  @click.native="reset('filterForm')"
                  size="mini"
                  >重置</el-button
                >
                <el-button size="mini" @click.native="cancelFilter('filterPop')"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  @click.native="sureFilter('filterPop')"
                  size="mini"
                  >确认</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <!-- 筛选 -->
          <el-button
            slot="reference"
            type=""
            class="el-btn"
            size="small"
            icon="el-icon-s-operation"
            >筛选</el-button
          >
        </el-popover>

        <!-- 选择搜索 -->
        <el-dropdown
          v-if="false"
          trigger="click"
          ref="changeSearch"
          class="change-search"
          style="margin-right: 20px"
        >
          <el-button type="primary" size="small">
            已选 {{ totalItem }} 项<i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </el-button>
          <el-input
            v-model="changeSearch"
            size="small"
            style="width: 150px"
            clearable
            placeholder="先选条件，再搜索"
          ></el-input>
          <el-dropdown-menu slot="dropdown">
            <div class="change-search-wrap">
              <div class="wrap-header">
                <h4 style="margin-bottom: 15px">选择搜索</h4>
                <el-radio-group v-model="hangeRadio">
                  <el-radio :label="1">精确搜索</el-radio>
                  <el-radio :label="2">模糊搜索</el-radio>
                </el-radio-group>
              </div>
              <div class="wrap-content">
                <el-row>
                  <el-col :span="9">
                    <el-scrollbar style="height: 100%" ref="scroll">
                      <div class="left grid-k">
                        <h4
                          style="padding: 10px; color: #b7b5b7; font-size: 14px"
                        >
                          选择搜索
                        </h4>
                        <ul class="left-lists">
                          <li
                            class="pointer"
                            style="padding: 10px"
                            :class="{ 'is-active': index === currentIndex }"
                            @click="currentList(item, index)"
                            v-for="(item, index) in 10"
                            :key="index"
                          >
                            <span>基本信息 {{ index }}</span>
                            <span style="margin-right: 10px">{{
                              changeCheckBox.length
                            }}</span>
                            <i class="el-icon-arrow-right"></i>
                          </li>
                        </ul>
                      </div>
                    </el-scrollbar>
                  </el-col>
                  <el-col :span="15">
                    <el-scrollbar style="height: 100%" ref="scroll">
                      <div class="right grid-k">
                        <h4
                          style="padding: 10px; color: #b7b5b7; font-size: 14px"
                        >
                          选择搜索字段，至少选择1项，最多5项
                        </h4>
                        <el-checkbox-group v-model="changeCheckBox" :max="5">
                          <p
                            style="padding: 10px 10px"
                            v-for="(item, index) in 20"
                            :key="index"
                          >
                            <el-checkbox :label="index" :disabled="false"
                              >本人姓名</el-checkbox
                            >
                          </p>
                        </el-checkbox-group>
                      </div>
                    </el-scrollbar>
                  </el-col>
                </el-row>
              </div>
              <div class="wrap-footer">
                <span style="padding-right: 20px; font-size: 14px"
                  >最多展示500个指标</span
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="changeSearchSure('changeSearch')"
                  >确认</el-button
                >
                <el-button size="mini" @click="changeSearchdele('changeSearch')"
                  >取消</el-button
                >
              </div>
            </div>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 添加研究对象 -->
        <el-dropdown
          v-if="false"
          size="small"
          split-button
          class="search-ob"
          style="margin-right: 20px"
        >
          <span class="el-icon-user-solid"> 添加研究对象</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="addSearchObj"
              >单个添加</el-dropdown-item
            >
            <el-dropdown-item @click.native="addSearchObj"
              >批量添加</el-dropdown-item
            >
            <el-dropdown-item @click.native="addSearchObj"
              >精确搜索导入</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div style="float: right;">
        <!-- 导入研究数据 -->
        <el-button
          v-if="false"
          type="primary"
          size="small"
          style="margin-right: 10px"
          @click.native="importDatas = true"
        >
          <i class="iconfont icon-daoru" style="font-size:10px;"></i>
          导入研究数据</el-button
        >

        <!-- 入组阶段数据导出 -->
        <el-button
          type="primary"
          size="small"
          style="margin-right: 10px"
          @click.native="exportDatas = true"
        >
          <i class="iconfont icon-daochu1" style="font-size:10px;"></i>
          入组阶段数据导出</el-button
        >
        <!-- 导出记录 -->
        <el-button
          type="primary"
          size="small"
          v-if="buttonStatus"
          @click.native="exportRecord"
        >
          <i class="iconfont icon-daochu1" style="font-size:10px;"></i>
          导出记录</el-button
        >
        <!-- 模式切换 -->
        <!-- <span class="switch-to"
              @click="switchTo = !switchTo">
          <i class="iconfont icon-zhanshi"></i>
        </span> -->
      </div>
    </div>
    <!-- 表格 -->
    <div class="table" style="padding:0 20px 15px;">
      <!-- 组件切换 -->
      <el-collapse-transition>
        <component
          :is="whichCom"
          :tableData="tableData"
          :headerData="headerData"
          operate
        ></component>
      </el-collapse-transition>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.pageNo"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="query.pageSize"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="query.total"
        background
      ></el-pagination>
    </div>
    <!-- 批量导入研究数据弹窗 -->
    <el-dialog
      :visible.sync="importDatas"
      width="45%"
      :before-close="handleClose"
    >
      <span slot="title"> 批量导入研究数据 </span>
      <div class="">
        <el-row :gutter="20">
          <el-col :span="7">
            <div class="">
              <p style="margin-bottom: 10px">选择队列</p>
              <el-select
                v-model="sectionaLization"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="">
              <p style="margin-bottom: 10px">共 10 个表单</p>
              <el-scrollbar style="height: 100%" ref="scroll">
                <ul style="max-height: 300px">
                  <li
                    class="import-lists"
                    v-for="(item, index) in 10"
                    :key="index"
                  >
                    <span class="el-icon-document"> 基本信息{{ index }}</span>
                    <span>
                      <el-button size="mini">下载Excel模板</el-button>
                      <el-button type="primary" size="mini">上传数据</el-button>
                    </span>
                  </li>
                </ul>
              </el-scrollbar>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="importDatas = false" size="small">取 消</el-button>
        <el-button type="primary" @click="importDatas = false" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 入组阶段数据导出弹窗 -->
    <el-dialog
      width="40%"
      :visible.sync="exportDatas"
      :before-close="handleClose"
    >
      <div slot="title">
        <h1 style="text-align: center">入组阶段数据导出</h1>
      </div>
      <div class="export-datas-info">
        <p>
          <i class="el-icon-warning" style="color: #ffa200"></i>
          系统支持单次最大导出10G的文件
          <!-- 系统自动将指标数据和附件数据分为两个文件单独导出。 -->
        </p>
        <!-- <p>系统支持单次最大导出10G的文件</p> -->
      </div>
      <!--  -->
      <div class="export-lists">
        <!-- 导出患者范围 -->
        <div class="export-patient_range">
          <!-- <h3>导出患者范围</h3> -->
          <el-button
            class="export-patien_record"
            style="font-size: 16px"
            v-if="buttonStatus"
            type="text"
            @click.native="goExportRecord"
            >查看导出记录</el-button
          >
          <!-- <div class="export-patien-item">
            <h4>分组一</h4>
            <p>1家医院（南方医科大学南方医院）</p>
            <p>共 3462 位患者</p>
          </div> -->
        </div>

        <!-- 导出指标范围 -->
        <div class="export-target_range">
          <h3>导出指标范围</h3>
          <div class="export-target_item">
            <el-checkbox-group v-model="exportTarget">
              <el-checkbox label="A">全选</el-checkbox>
              <el-checkbox label="B">基本信息</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <!-- 导出设置 -->
        <div class="export-setting">
          <h3>导出设置</h3>
          <div class="export-setting_item">
            <p style="padding: 10px 0px">
              <el-radio v-model="exportSetting" label="1">导出Excel</el-radio>
              <el-checkbox-group
                v-model="exportSettCheck"
                style="margin: 10px 25px"
              >
                <el-checkbox label="1" style="margin-bottom: 10px">
                  将多个表单数据，合在一个sheet页上导出（默认一个表单一个sheet页）
                </el-checkbox>
                <!-- <el-checkbox label="2">
                  组自增题目多行展示（默认将组自增题目平铺成一行）
                </el-checkbox> -->
              </el-checkbox-group>
            </p>
            <!-- <p>
              <el-radio v-model="exportSetting" label="2"
                >导出CSV（多个表单导出.csv文件，组自增题单独一个文件）</el-radio
              >
            </p> -->
          </div>
        </div>
      </div>
      <!--  -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="approveFn"
          >申请审批</el-button
        >
        <el-button size="small" @click="exportDatas = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import SearchObjectForm1 from './SearchObjectForm1'
import SearchObjectForm2 from './SearchObjectForm2'
import {
  getListDetaileForms,
  exportRecordsInput,
  commitApprover,
  exportRecordButton,
  getQueueDatas
} from '@/api/projectsMangement' //
export default {
  name: 'SearchObjectCom',
  data () {
    return {
      buttonStatus: false,
      // 表格一的数据
      headerData: [],
      tableData: [],

      // 表格数据
      tableData0: [
        {
          key: '1',
          val: '待录入'
        },
        {
          key: '2',
          val: '小王'
        },
        {
          key: '3',
          val: '13852526632'
        },
        {
          key: '4',
          val: '待录入'
        },
        {
          key: '5',
          val: '待录入'
        },
        {
          key: '6',
          val: '待录入'
        },
        {
          key: '7',
          val: '待录入'
        },
        {
          key: '8',
          val: '2020.11.12 18:45'
        },
        {
          key: '9',
          val: '待录入'
        },
        {
          key: '10',
          val: '录入中'
        },
        {
          key: '11',
          val: '待录入'
        },
        {
          key: '12',
          val: '待录入'
        }
      ],
      headerData0: [
        {
          key: '1',
          val: '阶段五',
          value: '随访点5'
        },
        {
          key: '2',
          val: '本人姓名'
        },
        {
          key: '3',
          val: '本人电话'
        },
        {
          key: '4',
          val: '阶段三',
          value: '随访点3'
        },
        {
          key: '5',
          val: '基线数据',
          value: '123456'
        },
        {
          key: '6',
          val: '阶段一',
          value: '随访点1'
        },
        {
          key: '7',
          val: '阶段二',
          value: '随访点2'
        },
        {
          key: '8',
          val: '入院时间'
        },
        {
          key: '9',
          val: '阶段四',
          value: '随访点4'
        },
        {
          key: '10',
          val: '随访状态'
        },
        {
          key: '11',
          val: '阶段六',
          value: '随访点6'
        },
        {
          key: '12',
          val: '阶段七',
          value: '随访点7'
        }
      ],

      // 分页数据
      query: {
        categoryIds: '',
        pageNo: 1, // 页码
        pageSize: 10, // 每页显示的数据条数
        total: 0
      },

      // 分组
      groups: [],
      groupName: '请选择',
      groupNum: null,
      groupIdCurrent: '', // 临时存放groupId,用于请求getListDetaileForms表格数据
      // 筛选
      filterForm: {
        startDate: '',
        endDate: '',
        status: '1'
      },

      // 选择搜索
      changeSearch: '',
      hangeRadio: 1,
      currentIndex: 0,
      changeCheckBox: [],
      totalItem: 0,
      // 导入研究数据
      importDatas: false,
      options: [
        {
          value: '1',
          label: '黄金糕'
        },
        {
          value: '2',
          label: '双皮奶'
        },
        {
          value: '3',
          label: '蚵仔煎'
        },
        {
          value: '4',
          label: '龙须面'
        },
        {
          value: '5',
          label: '北京烤鸭'
        }
      ],
      sectionaLization: '',

      // 入组阶段数据导出
      exportDatas: false,

      // 导出指标范围
      exportTarget: ['A', 'B'],

      //
      exportSetting: '1',
      exportSettCheck: ['1', '2'],

      // 模式切换
      switchTo: true,
      whichCom: 'SearchObjectForm1'
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  watch: {
    exportSetting (val) {
      if (val !== '1') {
        this.exportSettCheck = []
      }
    },
    switchTo (val) {
      if (val) {
        this.whichCom = 'SearchObjectForm1'
        this.headerData = []
        this.tableData = []
        this.getListDetaileForms()
      } else {
        this.whichCom = 'SearchObjectForm2'
        this.tableData = this.tableData0
        this.headerData = this.headerData0
      }
    }
  },
  components: { SearchObjectForm1, SearchObjectForm2 },
  created () {
    this.getQueueDatas()

    this.exportRecordButton()
    // console.log(this.userInfo)
  },
  mounted () {
    // this.getListDetaileForms() // 获取表格一的数据

    if (this.$route.params?.flag) {
      this.switchTo = false
    }
  },
  destroyed () {},
  methods: {
    ...mapMutations(['']),

    // 获取group数据
    async getQueueDatas () {
      const data = {
        projectId: this.$Storage.sessionGet('projectId')
      }
      await getQueueDatas(data).then(res => {
        this.groups = res.obj
        this.groupName = this.groups[0].groupName
        this.groupNum = this.groups[0].personCount
        this.groupIdCurrent = this.groups[0].id
        this.getListDetaileForms() // 获取表格一的数据
      })
    },
    // 获取表格数据
    getListDetaileForms () {
      const data = {
        projectId: this.$Storage.sessionGet('projectId'),
        pageNo: this.query.pageNo,
        pageSize: this.query.pageSize,
        groupId: this.groupIdCurrent
      }
      getListDetaileForms(data).then(res => {
        if (res?.obj) {
          this.headerData = res.obj.fieldDetailDTOS || []
          this.tableData = res.obj.data || []
          this.query.total = res.obj.total
        }
      })
    },
    // 入组阶段数据导出
    exportDatasFn () {
      const data = {
        projectId: this.$Storage.sessionGet('projectId')
      }
      exportRecordsInput(data).then(res => {
        if (res) {
          this.$message({
            message: '导出成功~',
            type: 'success'
          })
          this.exportDatas = false
        }
      })
    },

    // 导出记录按钮状态判断
    exportRecordButton () {
      const data = {
        projectId: this.$Storage.sessionGet('projectId'),
        userId: this.userInfo?.pkId
      }
      exportRecordButton(data)
        .then(res => {
          if (res) {
            this.buttonStatus = res.obj !== 0
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 申请审批
    approveFn () {
      this.commitApprover()
      // 当你申请导出后，需要相关部门进行审核，请等待
      // this.$confirm('申请导出后,需要相关部门进行审核, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.commitApprover()
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消审批申请'
      //   })
      // })
    },
    commitApprover () {
      const projectMessage = this.$Storage.sessionGet('projectMessage')
      const data = {
        conditions: '',
        exportCount: 0,
        projectId: projectMessage?.id,
        projectName: projectMessage?.projectName,
        status: 0,
        userId: this.userInfo?.pkId,
        userName: this.userInfo?.userName
      }
      commitApprover(data)
        .then(res => {
          this.exportDatas = false
          this.$message({
            type: 'success',
            message: '申请导出已提交且需相关部门进行审核，请等待!',
            duration: 4000
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 分页
    handleSizeChange (val) {
      this.query.pageSize = val
      this.getListDetaileForms() // 获取表格一的数据
    },
    handleCurrentChange (val) {
      this.query.pageNo = val
      this.getListDetaileForms() // 获取表格一的数据
    },
    // 筛选
    reset (formName) {
      this.filterForm = {
        startDate: '',
        endDate: '',
        status: ''
      }
    },
    // 取消
    cancelFilter (dom) {
      this.$refs[dom].doClose()
    },
    // 确认
    sureFilter (dom) {
      this.$refs[dom].doClose()
    },
    // 添加研究对象
    addSearchObj () {
      alert('调接口')
    },
    // 分组
    changeGroups (item) {
      if (item.id !== this.groupIdCurrent) {
        this.getListDetaileForms() // 获取表格一的数据
      }
      this.groupName = item.groupName
      this.groupNum = item.personCount
      this.groupIdCurrent = item.id
    },
    currentList (item, index) {
      this.currentIndex = index
    },
    changeSearchSure (dom) {
      this.totalItem = this.changeCheckBox.length
      this.$refs[dom].hide()
    },
    changeSearchdele (dom) {
      this.$refs[dom].hide()
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 导出记录
    exportRecord () {
      this.$router.push('/PM/ExportRecord')
    },
    //
    goExportRecord () {
      this.$router.push('/PM/ExportRecord')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.is-active {
  background-color: #eff7ff;
}

.search-object-com {
  background: #ffffff;
  .container-wrap {
    padding: 20px 20px 5px 20px;
    overflow: hidden;
  }
  .dynamic-table {
    position: relative;
    .table-setting {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 2;
      border-left: 1px solid rgba(43, 134, 178, 0.2);
      padding: 5px 13px;
      margin: 8px 0;
      .el-dropdown-link {
        cursor: pointer;
        font-size: 18px;
        color: #0070f4;
      }
    }
  }
}
.change-search-wrap {
  width: 630px;
  height: 520px;
  .wrap-header {
    padding: 10px 20px;
    border-bottom: solid 1px #f7f5f7;
  }
  .wrap-content {
    .grid-k {
      height: 380px;
    }
    .left {
      border-right: solid 1px #f7f5f7;
      padding-left: 10px;
      .left-lists {
        font-size: 14px;
        li {
          display: flex;
          align-items: center;
          span:nth-child(1) {
            flex: 1;
          }
          span:nth-child(2) {
            background-color: #21a2ff;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            color: #ffffff;
          }
          i {
            font-size: 16px;
          }
        }
      }
    }
    .right {
      padding-left: 10px;
    }
  }
  .wrap-footer {
    border-top: solid 1px #f7f5f7;
    text-align: right;
    padding: 20px 40px;
  }
}

.import-lists {
  border-top: solid 1px #e7e3e7;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.export-datas-info {
  background-color: #fff7e7;
  padding: 10px;
  font-size: 16px;
}

.export-lists {
  margin-top: 20px;
  .export-patient_range {
    position: relative;
    .export-patien_record {
      position: absolute;
      right: 0px;
      top: -10px;
    }
    .export-patien-item {
      background-color: #fffbff;
      padding: 15px;
      border-left: solid 5px #efebef;
      margin-top: 20px;
    }
  }

  .export-target_range {
    margin-top: 20px;
    .export-target_item {
      margin-top: 15px;
      padding-left: 20px;
    }
  }

  .export-setting {
    margin-top: 20px;
  }
}

.switch-to {
  color: #0070f4;
  padding: 5px;
  padding-top: 10px;
  background: rgba(0, 112, 244, 0.1);
  border-radius: 2px;
  margin-left: 20px;
  cursor: pointer;
  vertical-align: sub;
  i {
    font-size: 23px;
  }
}
</style>
<style lang="scss">
.search-object-com {
  .container-wrap {
    .divide-groups {
      .el-button-group {
        .el-button {
          border-color: #0070f4;
          color: #0070f4;
        }
      }
    }
    .filters-m {
      .el-btn {
        border-color: #0070f4;
        color: #0070f4;
      }
    }
    .search-ob {
      .el-button-group {
        .el-button {
          border-color: #0070f4;
          color: #0070f4;
        }
      }
    }
  }

  .change-search {
    .el-input--small .el-input__inner {
      border-left: none !important;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .el-button--small {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}
.file-rate {
  .el-form > .el-form-item {
    margin-bottom: 5px !important;
  }
}
</style>
