<template>
  <div class="collect-patient module-container">
    <div class="title">
      <el-link :underline="false"
               @click="$router.go(-1)"
               class="back"><i class="el-icon-arrow-left" /></el-link>
      <h1 class="inlineBlock">
        收藏管理
      </h1>
    </div>
    <div class="operate">
      <el-button disabled
                 size="medium">
        取消收藏
      </el-button>
      <div class="space inlineBlock">
        <AddCollectObject title="添加至项目"
                          disabled />
      </div>
      <el-select clearable
                 placeholder="收藏分类"
                 v-model="query.categoryIds"
                 @change="selectChange"
                 size="medium"
                 style="width:120px">
        <el-option v-for="(item,index) in options"
                   :key="index"
                   :label="item.categoryName"
                   :value="item.id">
        </el-option>
      </el-select>
    </div>
    <!-- 表格 -->
    <div class="table">
      <DynamicTable :tableData="tableData"
                    :headerData="headerData" operate/>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="query.pageNo"
                     :page-sizes="[10, 20, 30, 40, 50]"
                     :page-size="query.pageSize"
                     :pager-count="5"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     background></el-pagination>
    </div>
  </div>
</template>

<script>
import AddCollectObject from '@/components/AddCollectObject'
import DynamicTable from '@/components/DynamicTable'
import { getAllCollect } from '@/api/patientCollect'
import { searchColleCondition } from '@/api/caseSearch'
export default {
  name: 'PatientCollect',
  components: {
    AddCollectObject,
    DynamicTable
  },
  data () {
    return {
      options: [],
      input2: '',
      // 表格数据
      tableData: [],
      headerData: [],
      // 分页数据
      total: 0,
      query: {
        categoryIds: '',
        pageNo: 1, // 页码
        pageSize: 10 // 每页显示的数据条数
      },
      multipleSelection: []
    }
  },
  created () {
    this.getAllCollects()
    this.getCollectCategory()
  },
  methods: {
    // 收藏患者列表
    getAllCollects () {
      getAllCollect(this.query)
        .then(res => {
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
        })
        .catch((res) => {
        })
    },
    // 分页
    handleSizeChange (val) {
      this.query.pageSize = val
      this.getAllCollects()
    },

    handleCurrentChange (val) {
      this.query.pageNo = val
      this.getAllCollects()
    },
    // 根据收藏分类进行筛选
    selectChange (val) {
      this.query.categoryIds = val
      this.query.pageNo = 1
      this.getAllCollects()
    },
    // 获得收藏分类
    getCollectCategory () {
      const data = {
        categoryType: 1,
        categoryName: ''
      }
      searchColleCondition(data)
        .then(res => {
          const obj = res.obj
          this.options = obj || []
        })
        .catch(() => { })
    }

  }

}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.collect-patient {
  .operate {
    margin-top: 15px;
    .space {
      @include space(left);
      @include space(right);
    }
  }
}
</style>
