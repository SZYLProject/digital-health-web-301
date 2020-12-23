<!-- 数据填充率 /  -->
<template>
  <div class="configuration-management">
    <!-- 查询搜索模块 -->
    <div class="page-search">
      <el-form :inline="true"
               :model="formInline"
               class="demo-form-inline"
               ref="ruleForm">

        <!-- 病种选择 -->
        <el-form-item label="病种选择"
                      prop="dataSourceId">
          <el-select v-model="formInline.dataSourceId"
                     placeholder="请选择"
                     size="medium"
                     clearable>
            <el-option v-for="(item,index) in kindsOfDesease"
                       :key="index"
                       :label="item.sourceName"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-radio-group v-model="formInline.radio1"
                          size="medium">
            <el-radio-button label="1">患者维度</el-radio-button>
            <el-radio-button label="2">就诊维度</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="字段名称">
          <el-input v-model.trim="formInline.dataItemName"
                    placeholder="请输入字段名称"
                    size="medium"
                    clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     size="medium"
                     @click="onCheckFn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- form -->
    <div class="form-container">
      <el-row>
        <!-- 树形组件 -->
        <el-col :span="4">
          <div class="scrollbar-wraps">
            <el-scrollbar style="height:100%">
              <el-tree-com @CurrentTreeData="treeSelectFn" />
            </el-scrollbar>
          </div>
        </el-col>

        <!-- 表格 -->
        <el-col :span="20">
          <div class="page-form">
            <el-table :data="tableData"
                      header-cell-class-name="tableTH"
                      max-height="630">
              <el-table-column prop="name"
                               align="left"
                               label="字段名称">
              </el-table-column>
              <el-table-column prop="scopes"
                               align="left"
                               label="有效值人数">
              </el-table-column>
              <el-table-column prop="description"
                               align="left"
                               label="总人数">
              </el-table-column>
              <el-table-column prop="cloDates"
                               align="left"
                               label="填充率">
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination style="float:right"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-sizes="[10, 20, 30, 40]"
                           :page-size="10"
                           :pager-count="5"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="120"
                           background></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import ElTreeCom from './ElTreeCom' // 树形结构组件

export default {
  name: 'DataFillingRate',
  data () {
    return {
      /**
       查询搜索模块数据
       */
      formInline: {
        dataSourceId: '', // 病种选择
        radio1: 1, // 默认患者维度
        dataItemName: '' // 字段名称
      },

      /**
      树形结构数据
       */
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      /**
       * @type { Object & String}
       * @param {表格数据}
       * @info {  }
       */
      tableData: [
        {
          name: '重症患者',
          scopes: 1,
          description:
            '命运总是不如人愿。但往往是在无数的痛苦中，在重重的矛盾和艰辛中，才使人成熟起来。',
          cloDates: '52',
          times: '2020-04-18'
        },
        {
          name: '高危',
          scopes: 2,
          description:
            '命运总是不如人愿。但往往是在无数的痛苦中，在重重的矛盾和艰辛中，才使人成熟起来。',
          cloDates: '12',
          times: '2020-04-18'
        },
        {
          name: '重症患者',
          scopes: 1,
          description:
            '命运总是不如人愿。但往往是在无数的痛苦中，在重重的矛盾和艰辛中，才使人成熟起来。',
          cloDates: '52',
          times: '2020-04-18'
        },
        {
          name: '高危',
          scopes: 2,
          description:
            '命运总是不如人愿。但往往是在无数的痛苦中，在重重的矛盾和艰辛中，才使人成熟起来。',
          cloDates: '12',
          times: '2020-04-18'
        },
        {
          name: '重症患者',
          scopes: 1,
          description:
            '命运总是不如人愿。但往往是在无数的痛苦中，在重重的矛盾和艰辛中，才使人成熟起来。',
          cloDates: '52',
          times: '2020-04-18'
        },
        {
          name: '高危',
          scopes: 2,
          description:
            '命运总是不如人愿。但往往是在无数的痛苦中，在重重的矛盾和艰辛中，才使人成熟起来。',
          cloDates: '12',
          times: '2020-04-18'
        },
        {
          name: '重症患者',
          scopes: 1,
          description:
            '命运总是不如人愿。但往往是在无数的痛苦中，在重重的矛盾和艰辛中，才使人成熟起来。',
          cloDates: '52',
          times: '2020-04-18'
        },
        {
          name: '高危',
          scopes: 2,
          description:
            '命运总是不如人愿。但往往是在无数的痛苦中，在重重的矛盾和艰辛中，才使人成熟起来。',
          cloDates: '12',
          times: '2020-04-18'
        },
        {
          name: '重症患者',
          scopes: 1,
          description:
            '命运总是不如人愿。但往往是在无数的痛苦中，在重重的矛盾和艰辛中，才使人成熟起来。',
          cloDates: '52',
          times: '2020-04-18'
        },
        {
          name: '高危',
          scopes: 2,
          description:
            '命运总是不如人愿。但往往是在无数的痛苦中，在重重的矛盾和艰辛中，才使人成熟起来。',
          cloDates: '12',
          times: '2020-04-18'
        },
        {
          name: '重症患者',
          scopes: 2,
          description:
            '命运总是不如人愿。但往往是在无数的痛苦中，在重重的矛盾和艰辛中，才使人成熟起来。',
          cloDates: '52',
          times: '2020-04-18'
        },
        {
          name: '高危',
          scopes: 2,
          description:
            '命运总是不如人愿。但往往是在无数的痛苦中，在重重的矛盾和艰辛中，才使人成熟起来。',
          cloDates: '12',
          times: '2020-04-18'
        },
        {
          name: '重症患者',
          scopes: 1,
          description:
            '命运总是不如人愿。但往往是在无数的痛苦中，在重重的矛盾和艰辛中，才使人成熟起来。',
          cloDates: '52',
          times: '2020-04-18'
        },
        {
          name: '高危',
          scopes: 2,
          description:
            '命运总是不如人愿。但往往是在无数的痛苦中，在重重的矛盾和艰辛中，才使人成熟起来。',
          cloDates: '12',
          times: '2020-04-18'
        }
      ],

      /**
       * @type { Object & String}
       * @param {分页数据}
       * @info {  }
       */
      currentPage: 1

      /**
       * @type { Object & String}
       * @param {与弹窗相关的数据}
       * @info {  }
       */

    }
  },
  props: {
    // tab 切换标识符
    activeName: {
      type: String,
      default: null
    },
    // 疾病种类
    kindsOfDesease: {
      type: Array,
      default: null
    }
  },
  watch: {},
  components: { ElTreeCom },
  created () { },
  mounted () { },
  destroyed () { },
  methods: {
    // 查询
    onCheckFn () {
      console.log(this.formInline)
    },

    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },

    /**
     * @type { Function}
     * @param {树形结构相关的函数调用}
     * @info {  }
     */
    treeSelectFn (val) {
      // console.log(val)
    }

  }
}
</script>

<style lang="scss" scoped>
.configuration-management {
  .page-search {
    margin: 10px 0px 0px 0px;
    font-weight: 700;
    text-align: left;
    color: #2b2b2b;
  }
  .form-container {
    .scrollbar-wraps {
      height: calc(100vh - 222px);
    }
  }
  .page-form {
    overflow: hidden;
    .pages-modules {
      padding: 40px 10px;
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
</style>
