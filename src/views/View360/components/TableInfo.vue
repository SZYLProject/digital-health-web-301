<template>
  <div class="table-info">
    <!-- tab切换 -->
    <el-tabs v-model="activeName"
             @tab-click="handleClick"
             class="tab">
      <el-tab-pane v-for="(item,index) in menu"
                   :key="index"
                   :label="item.dataName"
                   :name="String(item.id)">
        <div class="table">
          <DynamicTable :tableData="tableData"
                        :headerData="headerData" />
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="pageNo"
                         :page-sizes="[10, 20, 30, 40, 50]"
                         :page-size="pageSize"
                         :pager-count="5"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="total"
                         background></el-pagination>
        </div>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>
import DynamicTable from '@/components/DynamicTable'
import { getViewInfo } from '@/api/view360'
export default {
  name: 'TableInfo',
  components: {
    DynamicTable
  },
  props: ['menu'],
  data () {
    return {
      activeName: '',
      // 表格数据
      tableData: [],
      headerData: [],
      // 分页数据
      total: 0,
      pageNo: 1,
      pageSize: 10

    }
  },
  computed: {

  },
  watch: {
    menu: {
      immediate: true,
      handler: function (newValue, oldValue) {
        if (newValue && newValue.length > 0) {
          this.activeName = String(this.menu[0].id)
          this.getViewData(this.activeName)
        }
      }
    }
  },
  created () {
  },
  mounted () {

  },
  methods: {
    // 标签下的表格内容
    getViewData (val) {
      const newArr = this.menu.filter(item => item.id === Number(val))
      const data = {
        personId: this.$route.params.personId,
        parentId: val,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        dataItemCode: newArr[0].dataItemCode
      }
      getViewInfo(data).then(res => {
        const { data, total, fields } = res.obj
        const list = []
        data.map(item => {
          list.push(JSON.parse(item))
        })
        this.tableData = list || []
        const arr = []
        for (const key in fields) {
          arr.push({ key: key, val: fields[key] }) // 属性
        }
        this.headerData = arr || []
        this.total = total
      }).catch(() => { })
    },
    // tab 切换
    handleClick (tab, event) {
      this.getViewData(tab.name)
      this.activeName = tab.name
    },
    // 分页
    handleSizeChange (val) {
      this.pageSize = val
      this.getViewData(this.activeName)
    },

    handleCurrentChange (val) {
      this.pageNo = val
      this.getViewData(this.activeName)
    }
  }
}
</script>
<style lang="scss" scoped>
.table-info {
  margin-top: 15px;
  .tab {
    background: #ffffff;
  }
  .table {
    padding: 0 20px 20px;
  }
}
</style>
<style lang="scss">
.table-info {
  .el-tabs {
    margin-top: 0;
  }
  .el-tabs__nav-wrap {
    padding: 0 20px;
    line-height: 48px;
  }
  .el-tabs__nav-wrap::after {
    height: 1px;
  }
}
</style>
