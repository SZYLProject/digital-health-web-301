<!-- 系统配置 / 收藏管理 -->
<template>
  <div class="configuration-management module-container-two">
    <div class="title">
      <h1>收藏管理</h1>
    </div>
    <!-- 搜索查询 -->
    <div class="page-search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input
            v-model.trim="formInline.categoryName"
            placeholder="请输入名称"
            size="small"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="应用范围">
          <el-select
            v-model="formInline.categoryType"
            placeholder="请选择应用范围"
            size="small"
            clearable
          >
            <el-option label="患者收藏" value="1"></el-option>
            <el-option label="搜索收藏" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onCheckFn"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="newBuildEditFn('building')"
            >新建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="con">
      <!-- 表格 -->
      <el-table
        :data="tableData"
        header-cell-class-name="tableTH"
        stripe
        max-height="630"
      >
        <el-table-column
          prop="categoryName"
          align="left"
          label="收藏分类名称"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="categoryType"
          align="left"
          label="应用范围"
          width="120"
        >
          <template slot-scope="scope">
            {{ scope.row.categoryType === 1 ? "患者搜藏" : "搜索收藏" }}
          </template>
        </el-table-column>
        <el-table-column prop="categoryDesc" align="left" label="描述">
        </el-table-column>
        <el-table-column
          prop="collectionDataNum"
          align="left"
          label="收藏数据"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="updateTime"
          align="left"
          label="更新时间"
          width="120"
        >
          <template slot-scope="scope">
            {{ scope.row.updateTime | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" width="120">
          <template slot-scope="scope">
            <el-button
              @click="newBuildEditFn(scope.row)"
              type="text"
              size="mini"
              >编辑</el-button
            >
            <!-- <el-link type="danger"
                     @click="deleteFn(scope.row)"
            >
              删除
            </el-link> -->
            <el-button type="text"
                       size="mini"
                       style="color:#F15643;"
                       @click="deleteFn(scope.row)"
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </div>

    <!-- 编辑/新建弹窗 -->
    <el-dialog :title="popTitle" :visible.sync="dialogVisible" width="40%">
      <div class="info-form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="分类名称：" prop="categoryName">
            <el-input v-model.trim="ruleForm.categoryName" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="描述：" prop="categoryDesc">
            <el-input
              type="textarea"
              v-model.trim="ruleForm.categoryDesc"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="应用范围：" prop="categoryType">
            <el-radio-group
              v-model="ruleForm.categoryType"
              :disabled="popIndex === 1 ? false : true"
            >
              <el-radio :label="1">患者收藏</el-radio>
              <el-radio :label="2">搜索收藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogVisible = false"
          >取 消</el-button
        >
        <el-button size="medium" type="primary" @click="submitSure('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  formDatas,
  editLists,
  newBuildLists,
  deleteLists
} from '@/api/collectionManage'

export default {
  name: 'CollectionManage',
  data () {
    return {
      // 搜索模块数据
      formInline: {
        categoryName: '',
        categoryType: ''
      },
      // 表格数据
      tableData: [],
      // 分页数据
      pageNo: 1, // 页码
      pageSize: 10, // 每页显示的数据条数
      total: 0, // 总页数
      dialogVisible: false, // 是否显示弹窗
      // 弹窗数据
      ruleForm: {
        categoryName: '', // 分类名称
        categoryDesc: '', // 描述
        categoryType: 1 // 应用范围
      },
      // 弹窗数据校验规则
      rules: {
        categoryName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        categoryDesc: [
          { max: 500, message: '描述字符不能大于500', trigger: 'blur' }
        ],
        categoryType: [
          { required: true, message: '请选择应用范围', trigger: 'change' }
        ]
      },
      popTitle: '', // 弹窗标题
      popIndex: 1 // 弹窗分类
    }
  },
  watch: {
    dialogVisible (val) {
      if (!val) {
        this.$refs.ruleForm.resetFields()
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  components: {},
  created () {
    this.getFormDatas()
  },
  mounted () {},
  destroyed () {},
  methods: {
    // 调用表格数据
    getFormDatas () {
      const data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        categoryName: this.formInline.categoryName,
        categoryType: this.formInline.categoryType
      }
      formDatas(data)
        .then((res) => {
          const obj = res.obj
          if (obj) {
            this.tableData = obj?.data ?? []
            this.total = obj.total
          }
        })
        .catch(() => {})
    },

    // 查询
    onCheckFn () {
      this.pageNo = 1
      this.getFormDatas()
    },

    // 新建/编辑
    newBuildEditFn (val) {
      this.ruleForm = {
        categoryName: '', // 分类名称
        categoryDesc: '', // 描述
        categoryType: 1 // 应用范围
      }
      const textTitle = {
        newBuildTitle: '新建收藏分类', // 新建标题
        editTitle: '编辑收藏分类' // 列表编辑标题
      }
      if (val === 'building') {
        // 新建
        this.popTitle = textTitle.newBuildTitle
        this.popIndex = 1
      } else {
        // 编辑
        this.popTitle = textTitle.editTitle
        this.popIndex = 2
        // 回显
        this.ruleForm = {
          categoryName: val.categoryName, // 分类名称
          categoryDesc: val.categoryDesc, // 描述
          categoryType: val.categoryType, // 应用范围
          id: val.id
        }
      }
      this.dialogVisible = true
    },

    // 弹窗确认提交
    submitSure (id) {
      this.$refs[id].validate((valid) => {
        if (valid) {
          if (this.popIndex === 1) {
            // 新建接口的调用
            this.postNewBuildLists()
          } else {
            // 编辑接口的调用
            this.postEditLists()
          }
        } else {
          return false
        }
      })
    },

    // 新建弹窗数据提交
    postNewBuildLists () {
      const data = this.ruleForm
      data.userId = this.userInfo?.pkId
      newBuildLists(data)
        .then((res) => {
          if (res.success === 0) {
            this.dialogVisible = false
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.pageNo = 1
            this.getFormDatas() // 刷新列表
          }
        })
        .catch(() => {})
    },

    // 编辑弹窗数据提交
    postEditLists () {
      const data = this.ruleForm
      editLists(data)
        .then((res) => {
          if (res.success === 0) {
            this.dialogVisible = false
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.getFormDatas() // 刷新列表
          }
        })
        .catch(() => {})
    },

    // 删除
    deleteFn (val) {
      const num = val.collectionDataNum
      if (Number(num) !== 0) {
        this.$message({
          message: '该分类下有收藏数据，请先取消收藏再删除~',
          type: 'warning'
        })
        return
      }
      this.$confirm('确认删除吗？, 此操作无法撤销。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.postDeleteLists(val.id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 删除函数调用
    postDeleteLists (id) {
      const data = {
        id
      }
      deleteLists(data)
        .then((res) => {
          if (res.success === 0) {
            this.dialogVisible = false
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.getFormDatas() // 刷新列表
          }
        })
        .catch(() => {})
    },

    // 分页函数
    handleSizeChange (val) {
      this.pageSize = val
      this.getFormDatas()
    },

    handleCurrentChange (val) {
      this.pageNo = val
      this.getFormDatas()
    }
  }
}
</script>

<style lang="scss" scoped>
.configuration-management {
  .page-search {
    border-bottom: solid 1px #e6e6e6;
    padding: 10px 30px;
  }
}
.info-form {
  padding-right: 50px;
}
</style>
<style lang="scss">
.configuration-management {
  .page-search {
    .el-form-item {
      margin-bottom: 0px;
    }
    .el-form-item__label {
      color: #666666;
    }
    .el-button--small {
      padding: 9px 20px;
    }
  }
}
</style>
