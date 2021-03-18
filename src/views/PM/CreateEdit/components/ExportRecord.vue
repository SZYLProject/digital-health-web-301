<!-- 研究对象模块 -->
<template>
  <div class="export-record">
    <div class="export-record-header white-bg">
      <p>
          <el-button type="text"
                 style="font-size: 20px;"
                 @click.native="goBack"
                 icon="el-icon-arrow-left"></el-button>
          <span style='margin-left:10px;'>导出记录</span>
      </p>
      <p>
        <span class="info-messge-time" v-if="timeInfo > 0">
          项目数据导出中，你可能需要等待
            {{ timeInfo }}
          分钟
        </span>
        <el-button size="small"
                 @click.native="deleteAll"
                 >清空所有</el-button>
      </p>
    </div>
    <!-- 记录列表 -->
    <div class="export-record-lists white-bg">
      <p v-if="recordLists.length <= 0">暂无导出记录</p>
      <el-scrollbar style="height:100%;margin-bottom:20px;" ref="scroll">
        <div class="record-lists_wrap" >
          <el-timeline>
            <el-timeline-item
                v-for="(item,index) in recordLists"
                :key="index"
                :timestamp="item.createTime | timesTZO"
                placement="bottom"
                icon="el-icon-files"
                color="#315984"
                size="large">
              <div class="lists-info">
                <div style="font-size:16px;">
                  项目名称：{{item.projectName}}
                </div>
                <div class="">
                  <!-- <el-progress
                          color="#409eff"
                          :text-inside="true" :stroke-width="15"
                          style="margin-bottom:5px;"
                          :percentage="item.percentage"></el-progress>
                  <span>剩余时间：{{item.seconds}} s （此数据仅做参考）</span> -->
                  <el-button type="primary"
                             size="small"
                             style="margin-left:10px;"
                             @click.native="downLoadExcel(item)"
                             :disabled="false"
                             >下载指标数据</el-button>
                  <el-button size="small"
                             @click.native="deleteSingle(item)"
                             >删除</el-button>
                </div>
              </div>
              <div class="">
                <el-card>
                  <div>
                    <div style="margin-bottom:5px;">导出范围：{{item.exportRange || '无'}}</div>
                    <div>导出指标：{{item.exportTarget || '无'}}</div>
                  </div>
                </el-card>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-scrollbar>
    </div>
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
import { exportRecordsDatas, deleteSingleLists, deleteAllLists, downLoadFiles } from '@/api/projectsMangement'
import { getRandom } from '@/utils'
// import request from '@/utils/request'

export default {
  name: 'ExportRecord',
  data () {
    return {
      recordLists: [],
      lists: [],
      timeInfo: 0,
      // 分页数据
      query: {
        categoryIds: '',
        pageNo: 1, // 页码
        pageSize: 10, // 每页显示的数据条数
        total: 0
      }
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  watch: {},
  components: { },
  created () { },
  mounted () {
    this.getListRecord()
  },
  destroyed () {},
  methods: {
    ...mapMutations(['']),
    goBack () {
      const type = window.sessionStorage.getItem('projectType')
      this.$router.push({
        name: 'ProjectListsDetails',
        params: {
          comName: 'SearchObjectCom',
          projectType: Number(type)
        }
      })
    },
    async getListRecord () {
      const data = {
        projectId: this.$Storage.sessionGet('projectId'),
        pageNo: this.query.pageNo,
        pageSize: this.query.pageSize
      }
      await exportRecordsDatas(data).then((res) => {
        // console.log(res)
        if (res?.obj) {
          this.lists = res.obj.data || []
          this.query.total = res.obj.total
          this.timeInfo = (res.obj.total * 10 / 60).toFixed(0)
          getRandom(90, 220)
          this.lists.map(item => { //
            item.seconds = 200
            item.percentage = 50
          })

          // console.log(this.lists)
          setTimeout(() => {
            this.recordLists = this.lists.map(item => {
              const initSeconds = item.seconds
              const timer1 = setInterval(() => {
                if (item.seconds > 0 && item.percentage < 100) {
                  item.seconds--
                  item.percentage = parseInt((1 - item.seconds / initSeconds) * 100)
                } else {
                  item.seconds = 0
                  item.percentage = 100
                  clearInterval(timer1)
                }
              }, 1000)
              return item
            })
          }, 1000)
        }
      }).catch(() => {
      })
    },
    // 下载文件
    downLoadExcel (item) {
      const data = {
        recordId: item.id
      }
      // window.location.href = process.env.VUE_APP_BASE_API + `/crp-project/export/record/v1/download/${data.recordId}`
      downLoadFiles(data).then(res => {
        if (res) {
          this.download(res, item.fileName)
          // this.downloadFile(res)
        }
      })
    },
    download (res, name) {
      // type application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      const blob = new Blob([res], { type: 'application/octet-stream' })
      const a = document.createElement('a')
      a.setAttribute('href', window.URL.createObjectURL(blob))
      // const fileName = `${payload.name}.xml`;
      a.setAttribute('download', name)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(a.href)
    },

    // 删除单个记录
    deleteSingle (item) {
      const data = {
        recordId: item.id
      }
      deleteSingleLists(data).then(res => {
        if (res) {
          this.getListRecord()
          this.$message({
            message: '删除成功~',
            type: 'success'
          })
        }
      })
    },
    // 清空所有导出记录
    deleteAll () {
      const data = {
        projectId: this.$Storage.sessionGet('projectId')
      }
      deleteAllLists(data).then(res => {
        if (res) {
          this.getListRecord()
          this.$message({
            message: '清除成功~',
            type: 'success'
          })
        }
      })
    },
    // 分页
    handleSizeChange (val) {
      this.query.pageSize = val
      this.getListRecord()
    },
    handleCurrentChange (val) {
      this.query.pageNo = val
      this.getListRecord()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.is-active{
  background-color: #eff7ff;
}
.white-bg{
  background: #ffffff;
}
.export-record{
  margin-right: 10px;
  .export-record-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
    .info-messge-time{
      color: #8c8c8c;
      font-size: 12px;
      padding: 20px;
    }
  }
  .export-record-lists{
    margin-top: 10px;
    min-height: 300px;
    position: relative;
    p{
      position: absolute;
      left: 48%;
      top: 50%;
      font-size: 20px;
      color: #8c8c8c;
    }
    .record-lists_wrap{
      max-height:800px;
      padding: 30px;
      .lists-info{
        display: flex;
        justify-content: space-between;
        margin-bottom:10px;
      }
    }
  }
}
</style>
<style lang="scss">
.export-record{}
</style>
