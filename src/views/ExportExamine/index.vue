<!-- 导出记录审批 -->
<template>
  <div class="export-examine">
    <!-- 标题 -->
    <div class="module-container-two">
      <div class="title">
        <h1>导出审批</h1>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      stripe
      max-height="630"
      header-cell-class-name="tableTH"
    >
      <!-- 序号 -->
      <el-table-column
        align="center"
        prop="num"
        label="序号"
        width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <!-- 项目名称 -->
      <el-table-column
        align="center"
        prop="projectName"
        label="项目名称">
      </el-table-column>

      <!-- 提交时间 -->
      <el-table-column
        align="center"
        prop="time"
        label="提交时间"
      >
        <template slot-scope="scope">
          {{ scope.row.createTime | timesTZO }}
        </template>
      </el-table-column>

      <!-- 导出数据量 -->
      <el-table-column
        align="center"
        prop="datas"
        width="120"
        label="导出数据量"
      >
        <template slot-scope="scope">
          {{ scope.row.exportCount }} 条
        </template>
      </el-table-column>

      <!-- 导出状态 -->
      <el-table-column
        align="center"
        prop="status"
        width="120"
        label="导出状态"
      >
        <template slot-scope="scope">
          {{
            scope.row.status === 0 ? '申请中':
            scope.row.status === 1 ? '正在导出':
            scope.row.status === 2 ? '导出成功':
            scope.row.status === 3 ? '导出失败':
            scope.row.status === 4 ? '申请不通过': '未知状态'
          }}
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <span class="check-radio">
            <el-radio-group
              v-model="scope.row.passOrNo"
              @change="checkRadios(scope.row)"
            >
              <el-radio :label="1"
                        :disabled="scope.row.passOrNo === 4 ? true : false">通过</el-radio>
              <el-radio :label="4"
                        :disabled="scope.row.passOrNo === 1 ? true : false">不通过</el-radio>
            </el-radio-group>
          </span>
          <!--  -->
          <!-- <span style="margin: 0 10px; vertical-align: -4%">|</span>
          <span style="vertical-align: -7%">
            <el-button type="text"
                      @click.native="goItem(scope.row)"
                      :disabled="scope.row.passOrNo === 1 ? false : true"
                      size="mini"
              >跳转项目</el-button
            >
          </span> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
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
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getExportApprove, approveStatus, exportRecordsInput } from '@/api/projectsMangement'
export default {
  name: 'ExportExamine',
  data () {
    return {
      tableData: [],
      query: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  watch: {},
  components: {},
  created () {},
  mounted () {
    this.getExportApproveLists()
    // console.log(this.userInfo)
  },
  destroyed () {},
  methods: {
    ...mapMutations(['']),
    // 获取审批列表
    getExportApproveLists () {
      const data = {
        userId: this.userInfo?.pkId,
        pageNo: this.query.pageNo,
        pageSize: this.query.pageSize
      }
      getExportApprove(data)
        .then((res) => {
          // console.log(res)
          if (res.success === 0) {
            if (res.obj?.data && res.obj?.data.constructor === Array) {
              this.tableData = res.obj.data.map(item => {
                if (item.status === 0) {
                  item.passOrNo = ''
                } else if (item.status === 1 || item.status === 2 || item.status === 3) {
                  item.passOrNo = 1
                } else if (item.status === 4) {
                  item.passOrNo = 4
                }
                return item
              })
            }
            // this.tableData = res.obj?.data || []
            this.query.total = res.obj.total
          } else {
            this.tableData = []
            this.query.total = 0
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 切换
    async checkRadios (val) {
      // console.log(val)
      // val.passOrNo = 1
      const data = {
        id: val.id,
        status: val.passOrNo,
        approvalId: this.userInfo?.pkId
      }
      await approveStatus(data).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功',
          duration: 4000
        })
      })
      await this.getExportApproveLists()
      await this.exportDatasFn(val)
    },
    // 入组阶段数据导出
    exportDatasFn (val) {
      const data = {
        userId: val?.userId,
        projectId: val?.projectId,
        exportApprovalId: val?.id
      }
      exportRecordsInput(data).then(res => {
        if (res) {
          this.$message({
            message: '导出成功~',
            type: 'success'
          })
        }
      })
    },
    goItem (val) {
      console.log(val)
      // this.$router.push('/PM/ProjectLists')
    },
    // 分页
    handleSizeChange (val) {
      this.query.pageSize = val
      this.getExportApproveLists()
    },
    handleCurrentChange (val) {
      this.query.pageNo = val
      this.getExportApproveLists()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.project-lists-details {
  padding-right: 8px;
  .tab-header {
    background: #fff;
    padding: 15px 10px;
    margin-top: 15px;
  }
}
</style>
<style lang="scss">
.export-examine {
  //   .el-switch__label * {
  //     font-size: 12px !important;
  //   }
  .check-radio {
    .el-radio {
      margin-right: 5px;
    }
    .el-radio__input {
      display: none;
    }
    .el-radio__label {
      font-size: 12px !important;
      padding-left: 5px;
    }
  }
}
</style>
