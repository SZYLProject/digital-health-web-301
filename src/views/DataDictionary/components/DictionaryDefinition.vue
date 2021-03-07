<!-- 字典定义 -->
<template>
  <div class="dictionary-definition">
    <div class="page-search">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        ref="searchForm"
      >
        <!-- 病种选择 -->
        <el-form-item label="病种选择" prop="dataSourceId">
          <el-select
            v-model="formInline.dataSourceId"
            placeholder="请选择"
            size="small"
            clearable
          >
            <el-option
              v-for="(item, index) in kindsOfDesease"
              :key="index"
              :label="item.sourceName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 字段名称 -->
        <el-form-item label="字段名称" prop="dataItemName">
          <el-input
            v-model.trim="formInline.dataItemName"
            placeholder="请输入字段名称"
            size="small"
            clearable
          ></el-input>
        </el-form-item>

        <!-- 题型 -->
        <el-form-item label="数据类型" prop="dataOptionType">
          <el-select
            v-model="formInline.dataOptionType"
            placeholder="请选择"
            size="small"
            clearable
          >
            <el-option label="全部" value="0"></el-option>
            <el-option label="数字" value="1"></el-option>
            <el-option label="字符串" value="2"></el-option>
            <el-option label="日期" value="3"></el-option>
            <el-option label="选项" value="4"></el-option>
            <el-option label="文本" value="5"></el-option>
            <el-option label="布尔" value="6"></el-option>
          </el-select>
        </el-form-item>

        <!-- 查询 -->
        <el-form-item>
          <el-button type="primary" size="small" @click="onCheckFn"
            >查询</el-button
          >
        </el-form-item>

        <!-- 重置 -->
        <el-form-item>
          <el-button type="primary" size="small" @click="resectFn('searchForm')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- form -->
    <div class="form-container">
      <!-- 树形组件 -->
      <div class="el-col-l el-cols">
        <div class="scrollbar-wraps">
          <el-scrollbar style="height: 100%">
            <el-tree-com
              @CurrentTreeData="treeSelectFn"
              v-if="treeModule" />
          </el-scrollbar>
        </div>
      </div>
      <!-- 表格 -->
      <div class="el-col-r el-cols">
        <div class="page-form">
          <el-table
            :data="tableData"
            header-cell-class-name="tableTH"
            stripe
            max-height="630"
          >
            <el-table-column
              prop="dataItemName"
              align="left"
              width="200"
              label="字段名称"
            >
            </el-table-column>
            <el-table-column
              prop="fieldName"
              align="left"
              width="200"
              label="字段英文名称"
            >
            </el-table-column>
            <el-table-column
              prop="itemDesc"
              align="left"
              label="字段说明">
            </el-table-column>
            <el-table-column
              prop="normalValue"
              align="left"
              label="常见值域"
            >
            </el-table-column>
            <el-table-column
              prop="dataOptionType"
              align="left"
              width="150"
              label="数据类型"
            >
              <template slot-scope="scope">
                {{
                  scope.row.dataOptionType === 1
                    ? "数字"
                    : scope.row.dataOptionType === 2
                    ? "字符串"
                    : scope.row.dataOptionType === 3
                    ? "日期"
                    : scope.row.dataOptionType === 4
                    ? "选项"
                    : scope.row.dataOptionType === 5
                    ? "文本"
                    : scope.row.dataOptionType === 6
                    ? "布尔"
                    : null
                }}
              </template>
            </el-table-column>
            <el-table-column
                  label="操作"
                  width="150"
                  align="left">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  disabled
                  @click="settingFn(scope.row)"
                >
                  设置</el-button
                >
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
      </div>
    </div>
    <!-- 设置弹窗 -->
    <el-dialog title="字段属性设置" :visible.sync="dialogVisible" width="40%">
      <div class="info-form" style="padding-right: 20px">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="字段名称:" prop="name">
                <el-input
                  v-model.trim="ruleForm.dataItemName"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字段编码:" prop="coding">
                <el-input v-model.trim="ruleForm.fieldName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="题目名称:" prop="title">
                <el-input v-model.trim="ruleForm.title" clearable></el-input>
              </el-form-item>
              <el-form-item label="备注：" prop="remark">
                <el-input
                  type="textarea"
                  v-model.trim="ruleForm.remark"
                ></el-input>
              </el-form-item>
              <el-form-item label="字段说明:" prop="info">
                <el-input v-model.trim="ruleForm.itemDesc" disabled></el-input>
              </el-form-item>
              <el-form-item label="数据类型:" prop="types" style="width: 50%">
                <el-input v-model.trim="ruleForm.types" disabled></el-input>
              </el-form-item>
              <el-form-item label="单位:" prop="unit" style="width: 50%">
                <el-input v-model.trim="ruleForm.unit" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
import { datasDictionariesForm } from '@/api/dataDicIndex'
import ElTreeCom from './ElTreeCom' // 树形结构组件

export default {
  name: 'DictionaryDefinition',
  data () {
    return {
      //  查询模块数据
      formInline: {
        dataSourceId: '', // 病种选择
        dataItemName: '', // 字段名称
        dataOptionType: '' // 题型
      },
      parentCode: '', // 树结构id

      // 表格数据
      tableData: [],

      // 分页
      pageNo: 1,
      pageSize: 10,
      total: 0,

      // 树结构
      treeModule: true,

      // 与弹窗相关的数据
      dialogVisible: false, // 是否显示弹窗
      // 弹窗数据
      ruleForm: {
        dataItemName: '', // 字段名称
        fieldName: '', // 字段编码
        title: '', // 题目名称
        remark: '', // 备注
        itemDesc: '', // 字段说明
        types: '', // 数据类型
        unit: '' // 单位
      },

      // 弹窗部分数据校验规则
      rules: {
        title: [{ required: true, message: '请输入题目名称', trigger: 'blur' }],
        types: [
          { required: true, message: '数据类型不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    // 疾病种类
    kindsOfDesease: {
      type: Array,
      default: null
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'dataSourceValue'])
  },
  watch: {
    // 还原数据
    dialogVisible (val) {
      if (!val) {
        this.$refs.ruleForm.resetFields()
      }
    }
  },
  components: { ElTreeCom },
  created () {},
  mounted () {
    this.getFormDatas()
    this.formInline.dataSourceId = this.$Storage.sessionGet('pID')?.id
  },
  destroyed () {},
  methods: {
    // 初始化列表数据
    getFormDatas () {
      this.$emit('dataSourceIdFn', this.formInline.dataSourceId)
      this.tableData = []
      const data = {
        parentCode: this.parentCode,
        dataSourceId: this.formInline.dataSourceId || this.$Storage.sessionGet('pID')?.id,
        dataItemName: this.formInline.dataItemName,
        dataOptionType:
          this.formInline.dataOptionType !== '0'
            ? this.formInline.dataOptionType
            : '',
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      datasDictionariesForm(data)
        .then((res) => {
          const obj = res.obj
          if (obj) {
            this.tableData = obj?.data || []
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

    // 重置操作
    async resectFn (searchForm) {
      this.treeModule = false
      this.$refs[searchForm].resetFields()
      this.pageNo = 1
      this.pageSize = 10
      await this.$nextTick()
      this.treeModule = true
      this.parentCode = ''
      this.getFormDatas()
      this.$emit('dataSourceIdFn', 0)
    },

    // 分页
    handleSizeChange (val) {
      this.pageSize = val
      this.getFormDatas()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getFormDatas()
    },

    // 树形结构相关的函数调用
    treeSelectFn (val) {
      if (val.parentCode !== '0' && val.dataItemEntityList.length === 0) {
        this.pageNo = 1
        this.parentCode = val.id
        this.getFormDatas()
      }
    },

    // 设置
    settingFn (val) {
      this.dialogVisible = true
      this.ruleForm = val
    },

    // 弹窗确认提交
    submitSure (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          this.$message({
            message: '设置成功~',
            type: 'success'
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dictionary-definition {
  .page-search {
    border-bottom: solid 1px #e6e6e6;
    padding: 10px 30px;
  }
  .form-container {
    display: flex;
    .scrollbar-wraps {
      height: calc(100vh - 153px);
    }
    .el-col-l {
      border-right: solid 1px #e6e6e6;
      width: 220px;
      padding: 5px 30px;
      padding-right: 0px;
    }
    .el-col-r{
      width: calc(100% - 220px);
      .page-form{
        padding: 5px 20px;
      }
    }
  }
}
</style>
<style lang="scss">
.scrollbar-wraps {
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
}
.dictionary-definition {
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
