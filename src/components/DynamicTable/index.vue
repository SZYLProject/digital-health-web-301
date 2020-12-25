<template>
  <div class="dynamic-table">
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
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="(item,index) in headerData"
                           :key="index"
                           :label="item.key">{{item.val}}</el-checkbox>
            </el-checkbox-group>
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
    <el-table ref="multipleTable"
              :data="tableData"
              stripe
              header-cell-class-name="tableTH"
              @selection-change="handleSelectionChange">
      <template>
        <el-table-column v-for="item in defaultHeader"
                         :key="item.key"
                         :prop="item.key"
                         :label="item.val"
                         sortable
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">{{ scope.row[item.key] }}</template>
        </el-table-column>
      </template>
      <el-table-column label="操作"
                       align="left"
                       v-if="operate">
        <template slot-scope="scope">
          <router-link :to="{path:`/view360/${scope.row['person_id']}/0/?parentName=患者概览`}"
                       target="_blank">
            <el-button type="text">详情</el-button>

          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    operate: {
      type: Boolean,
      default: false
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
          this.checkList.push(item.key)
        }
      )
    }
  },
  data () {
    return {
      checkList: [],
      defaultHeader: []
    }
  },
  methods: {
    // 多选
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    okHandle () {
      this.defaultHeader = this.headerData.filter(item => {
        return this.checkList.indexOf(item.key) > -1
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
</style>
<style lang="scss">
.dynamic-table {
  .el-table th,
  .el-table td {
    padding: 8px 0!important;
  }
}
</style>
