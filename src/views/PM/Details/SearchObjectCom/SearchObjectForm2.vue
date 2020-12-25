<template>
  <div class="dynamic-tables">
    <!-- 设置列 -->
    <!-- <div class="table-setting">
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
              <el-checkbox v-for="(item, index) in headerData"
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
    </div> -->

    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      stripe
      size="mini"
      header-cell-class-name="tableTH"
      @selection-change="handleSelectionChange"
    >
      <template>
        <el-table-column
          type="selection"
          header-align="center"
          align="center"
          width="45"
        >
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          label="操作"
          header-align="center"
          align="center"
          v-if="operate"
        >
          <template slot-scope="scope">
            <router-link
              :to="{
                path: `/view360/${scope.row['person_id']}/0/?parentName=患者概览`,
              }"
              target="_blank"
            >
              <el-button type="text">详情</el-button>
            </router-link>
          </template>
        </el-table-column>
        <!--  -->
        <el-table-column
          label="随访状态"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <router-link
              v-if="scope.row.type === '录入中'"
              to="/"
              target="_blank"
            >
              <el-button type="text">{{ scope.row.type }}</el-button>
            </router-link>
            <span v-else> {{ scope.row.type }} </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="本人姓名"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="tel"
          label="本人电话"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="times"
          label="入院时间"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <!-- 其他列 -->
        <el-table-column
          prop="baseName"
          label="基线数据"
          align="center"
          :show-overflow-tooltip="true"
        >
          <el-table-column label="123" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click.native="goEDC">
                <i class="iconfont icon-editor" style="font-size: 12px"></i>
                {{ scope.row.baseDatas }}
              </el-button>
              <!-- <router-link to="/PM/EDC" target="_blank">
                <el-button type="text" size="mini">
                  <i class="iconfont icon-editor" style="font-size: 12px"></i>
                  {{ scope.row.baseDatas }}
                </el-button>
              </router-link> -->
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column
          prop="stage1"
          label="阶段1"
          align="center"
          :show-overflow-tooltip="true"
        >
          <el-table-column label="随访点一" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click.native="goEDC">
                <i class="iconfont icon-editor" style="font-size: 12px"></i>
                {{ scope.row.visit1 }}
              </el-button>
              <!-- <router-link
                to="/PM/EDC"
                target="_blank"
              >
                <el-button
                    type="text"
                    size="mini">
                    <i class="iconfont icon-editor" style="font-size:12px;"></i>
                    {{ scope.row.visit1 }}
                </el-button>
              </router-link> -->
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column
          prop="stage2"
          label="阶段2"
          align="center"
          :show-overflow-tooltip="true"
        >
          <el-table-column prop="visit2" label="随访点二" align="center">
          </el-table-column>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checkList: [],
      defaultHeader: [],
      search: '',
      tableData: [
        {
          type: '待录入',
          times: '2016-05-02 12:13:23',
          name: '王小虎',
          tel: '18566233546',
          baseName: '基线数据',
          baseDatas: '待录入',
          stage1: '阶段一',
          visit1: '待录入',
          stage2: '阶段二',
          visit2: '未开始'
        },
        {
          type: '录入中',
          times: '2016-05-02 12:13:23',
          name: '王小虎1',
          tel: '18566233546',
          baseName: '基线数据',
          baseDatas: '待录入',
          stage1: '阶段二',
          visit1: '待录入',
          stage2: '阶段二',
          visit2: '未开始'
        },
        {
          type: '待录入',
          times: '2016-05-02 12:13:23',
          name: '王小虎',
          tel: '18566233546',
          baseName: '基线数据',
          baseDatas: '待录入',
          stage1: '阶段一',
          visit1: '待录入',
          stage2: '阶段二',
          visit2: '未开始'
        },
        {
          type: '录入中',
          times: '2016-05-02 12:13:23',
          name: '王小虎',
          tel: '18566233546',
          baseName: '基线数据',
          baseDatas: '待录入',
          stage1: '阶段一',
          visit1: '待录入',
          stage2: '阶段二',
          visit2: '未开始'
        }
      ]
    }
  },
  props: {
    operate: {
      type: Boolean,
      default: true
    },
    // tableData: {
    //   type: Array,
    //   default: null
    // },
    headerData: {
      type: Array,
      default: null
    }
  },
  watch: {
    headerData (val) {
      // console.log(val)
      this.defaultHeader = val.slice(0, 8)
      this.defaultHeader.map((item) => {
        this.checkList.push(item.key)
      })
    }
  },
  mounted () {
    this.defaultHeader = this.headerData.slice(0, 8)
    this.defaultHeader.map((item) => {
      this.checkList.push(item.key)
    })
  },

  methods: {
    // 多选
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    okHandle () {
      this.defaultHeader = this.headerData.filter((item) => {
        return this.checkList.indexOf(item.key) > -1
      })
      this.$refs.tableDrop.hide()
    },
    // 取消操作
    cancel () {
      this.$refs.tableDrop.hide()
    },
    goEDC () {
      this.$router.push('/PM/EDC')
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
      color: #247bcc;
    }
  }
}
</style>
<style lang="scss">
.dynamic-tables {
  .el-table th > .cell {
    padding: 5px 0;
    // height: 23px;
  }
  .el-table--border th,
  .el-table--border td {
    border-right: none;
  }
  .el-table__header-wrapper {
    .has-gutter {
      tr > th {
        padding: 0 !important;
      }
    }
  }
}
</style>
