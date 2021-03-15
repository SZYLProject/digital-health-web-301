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
      size="mini"
      header-cell-class-name="tableTH"
    >
      <!-- 序号 -->
      <el-table-column align="center" prop="num" label="序号" width="60">
      </el-table-column>

      <!-- 项目名称 -->
      <el-table-column align="center" prop="name" label="项目名称">
      </el-table-column>

      <!-- 提交时间 -->
      <el-table-column
        align="center"
        prop="time"
        label="提交时间"
      ></el-table-column>

      <!-- 导出数据量 -->
      <el-table-column
        align="center"
        prop="datas"
        label="导出数据量"
      ></el-table-column>

      <!-- 导出状态 -->
      <el-table-column
        align="center"
        prop="status"
        label="导出状态"
      ></el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <!-- <el-switch
                v-model="scope.row.passOrNo"
                active-text="通过"
                @change="switchChange(scope.row)"
                style="margin-top:-4px;font-size:12px;"
                inactive-text="不通过"
                >
            </el-switch> -->
          <!--  -->
          <span class="check-radio">
            <el-radio-group v-model="scope.row.passOrNo" @change="checkRadios">
              <el-radio :label="1">通过</el-radio>
              <el-radio :label="0">不通过</el-radio>
            </el-radio-group>
          </span>
          <!--  -->
          <span style="margin: 0 10px; vertical-align: -4%">|</span>
          <span style="vertical-align: -7%">
            <el-button type="text" @click.native="goItem(scope.row)" size="mini"
              >跳转项目</el-button
            >
          </span>
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
import {} from '@/api/caseSearch'
export default {
  name: 'ExportExamine',
  data () {
    return {
      tableData: [
        {
          num: 1,
          name: '肺癌的研究',
          time: '2016-05-02',
          datas: '2000条',
          status: '正在导出',
          passOrNo: 1
        },
        {
          num: 2,
          name: '鼻咽癌的研究',
          time: '2016-05-02',
          datas: '2000条',
          status: '导出成功',
          passOrNo: 0
        },
        {
          num: 3,
          name: '乳腺癌的研究',
          time: '2016-05-02',
          datas: '2000条',
          status: '审批不通过',
          passOrNo: 1
        },
        {
          num: 4,
          name: '脑癌的研究',
          time: '2016-05-02',
          datas: '2000条',
          status: '正在导出',
          passOrNo: 0
        },
        {
          num: 5,
          name: '宫颈癌的研究',
          time: '2016-05-02',
          datas: '2000条',
          status: '导出成功',
          passOrNo: 1
        }
      ],
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
  mounted () {},
  destroyed () {},
  methods: {
    ...mapMutations(['']),
    // 切换
    switchChange (val) {
      console.log(val)
      console.log(this.tableData)
    },
    checkRadios (val) {
      console.log(val)
      console.log(this.tableData)
    },
    goItem (val) {
      console.log(val)
    },
    // 分页
    handleSizeChange (val) {
      this.query.pageSize = val
      this.getListDetaileForms() // 获取表格一的数据
    },
    handleCurrentChange (val) {
      this.query.pageNo = val
      this.getListDetaileForms() // 获取表格一的数据
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
