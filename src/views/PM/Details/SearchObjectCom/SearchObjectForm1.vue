<template>
  <div class="dynamic-tables">
    <!-- 设置列 -->
    <div class="table-setting">
      <el-dropdown trigger="click"
                   ref="tableDrop">
        <span class="el-dropdown-link">
          <i class="el-icon-s-tools" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <div class="dropdown-checkbox"
               style="width:480px">
            <p class="title">设置表格显示列</p>
            <el-scrollbar style="height: 100%"
                          ref="scroll">
              <div style="max-height:320px;">
                <el-checkbox-group
                    v-model="checkList"
                    style="padding-bottom:30px;"
                >
                  <el-checkbox v-for="(item, index) in headerData"
                              :key="index"
                              :label="item.detailKey">{{item.displayName}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-scrollbar>
            <div class="dropdown-button">
              <el-button type="primary"
                         size="small"
                         @click.native="okHandle">确认</el-button>
              <el-button type="primary"
                         plain
                         size="small"
                         @click.native="cancel">取消</el-button>
            </div>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 表格 -->
    <el-table ref="multipleTable"
              :data="tableData"
              stripe
              size="mini"
              header-cell-class-name="tableTH"
              @selection-change="handleSelectionChange">
      <template>
        <!-- 勾选框 -->
        <el-table-column
          type="selection"
          header-align="center"
          align="center"
          width="45">
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作"
                        header-align="center"
                        align="center"
                        v-if="operate">
          <template slot-scope="scope">
            <router-link :to="{path:`/view360/${scope.row.personId}/0/?parentName=患者概览`}"
                        target="_blank">
              <el-button type="text">详情</el-button>
            </router-link>
          </template>
        </el-table-column>
        <!-- 其他列 -->
        <el-table-column v-for="item in defaultHeader"
                         :key="item.detailKey"
                         :prop="item.detailKey"
                         :label="item.displayName"
                         align="center"
                         :show-overflow-tooltip="true">
          <!-- <el-table-column
                         :label="item.percent"
                         align="center">
            <template slot-scope="scope">
              {{ scope.row.ky_data_index_person_p775 }}
            </template>
          </el-table-column> -->
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>

export default {
  data () {
    return {
      checkList: [], // 选准数据
      defaultHeader: [],
      search: ''
    }
  },
  props: {
    operate: {
      type: Boolean,
      default: true
    },
    tableData: {
      type: Array,
      default: null
    },
    headerData: {
      type: Array,
      default: null
    }
  },
  watch: {
    headerData (val) {
      this.defaultHeader = val.slice(0, 8)
      this.defaultHeader.map(
        item => {
          this.checkList.push(item.detailKey)
        }
      )
    }
  },
  mounted () {
    this.defaultHeader = this.headerData.slice(0, 8)
    this.defaultHeader.map(item => {
      this.checkList.push(item.detailKey)
    })
  },

  methods: {
    // 多选
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    okHandle () {
      this.defaultHeader = this.headerData.filter(item => {
        return this.checkList.indexOf(item.detailKey) > -1
      })
      this.$refs.tableDrop.hide()
    },
    // 取消操作
    cancel () {
      this.$refs.tableDrop.hide()
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dynamic-tables {
  position: relative;
  .table-setting {
    position: absolute;
    right: 0;
    top: 0px;
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
</style>
<style lang="scss">
.dynamic-tables{
  .el-table th > .cell {
    padding: 5px 0;
    // line-height: 23px;
  }
  .el-table--border th, .el-table--border td {
    border-right: none;
  }
  .el-table__header-wrapper{
    .has-gutter{
      tr>th{
        padding: 0!important;
      }
    }
  }
}

</style>
