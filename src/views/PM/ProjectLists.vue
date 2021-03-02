<!-- 项目列表 -->
<template>
  <div class="project-lists"
       v-loading="loading"
       element-loading-text="数据加载中"
       element-loading-spinner="el-icon-loading">
    <!-- 面包削 -->
    <div class="breadcrumb-bar">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item class="active-breadcrumb">项目列表</el-breadcrumb-item>
      </el-breadcrumb>
      <p class="right rg-bar">
        <span class="check-radio">
          <el-radio-group v-model="checkRadio" size="small" @change="checkRadios">
            <el-radio :label="0">全部状态</el-radio>
            <el-radio :label="1">进行中</el-radio>
            <el-radio :label="2">已结束</el-radio>
          </el-radio-group>
        </span>
        <span class="sn-input">
          <el-input
            placeholder="请输入项目名称进行搜索"
            v-model="projectName"
            size="small"
            @keyup.enter.native="handleIconClick"
            clearable
            >
            <i
              class="el-icon-search el-input__icon pointer"
              slot="suffix"
              @click="handleIconClick">
            </i>
          </el-input>
        </span>
        <el-button type="primary"
                   size="mini"
                   @click.native="createButton"
                   class="el-icon-plus">
          新建</el-button>
      </p>
    </div>
    <!-- 项目列表 -->
    <div class="container-wraps">
      <!-- No Data -->
      <div class="no-data-module"
           style="height:500px;"
           v-if="listObj.length <= 0">

        <p class="iconfont icon-no_datas p1"></p>
        <p class="p2">暂时没有项目，请新建...</p>
      </div>
      <!-- 数据列表 -->
      <el-row :gutter="15"
              v-else>
        <el-col :span="12"
                v-for="(item, index) in listObj"
                :key="index">
          <div class="grid-content module-container-two">
            <div class="title"
                 style="height: 48px"
            >
              <h1>
                <!-- <span @click="goItemLists(item)"
                      class="pointer">
                  {{ item.projectName || "无" }}
                </span> -->
                <el-button
                    type="text"
                    size="mini"
                    :disabled="Number(item.inputCount) === 0 ? false: true"
                    style="font-size: 16px;padding: 2px 0px;"
                    @click="goItemLists(item)"
                >
                  {{ item.projectName || "无" }}
                </el-button>
              </h1>
              <span class="right pointer">
                <el-tooltip
                  effect="light"
                  placement="top-start"
                >
                  <div slot="content">
                    <el-button type="text"
                               style="padding:0;"
                               @click.native="finishedAlreadys(item)"
                               size="mini">完成</el-button>
                    <el-button type="text"
                               style="padding:0;"
                               @click.native="goSearchObj(item)"
                               size="mini">修改</el-button>
                    <el-button type="text"
                               style="padding:0;"
                               @click.native="deleteList(item)"
                               size="mini">删除</el-button>
                  </div>
                  <i class="el-icon-more"></i>
                </el-tooltip>
              </span>
            </div>
            <div class="item-lists con">
              <div class="item-top">
                <p class="left-t">
                  <span>项目牵头人：</span>
                  <span class="mo">{{ item.leader || "无" }}</span>
                  <span>研究目的/方案：</span>
                  <span class="mo aim">
                    <el-tooltip
                      effect="dark"
                      placement="top"
                    >
                      <div slot="content" style="max-width:100px;">
                        {{ item.purpose || "无" }}
                      </div>
                      <i>{{ item.purpose || "无" }}</i>
                    </el-tooltip>
                  </span>
                  <span>拟收集患者数：</span>
                  <span class="mo">{{ item.planNum || "0" }}</span>
                </p>
                <p class="right-t">
                  <span>单中心</span>
                  <span>
                    {{
                      item.projectType === 1
                        ? "回顾性研究"
                        : item.projectType === 2
                        ? "前瞻性研究"
                        : "未知"
                    }}
                  </span>
                  <span>
                    {{
                      item.pStatus === 1
                        ? "进行中"
                        : item.pStatus === 2
                        ? "已结束"
                        : "未知"
                    }}
                  </span>
                </p>
              </div>
              <div class="item-middle">
                <el-row>
                  <el-col :span="12">
                    <div class="">
                      <p class="title-item">项目进度</p>
                      <div class="circle">
                        <el-progress type="circle"
                                     stroke-linecap="butt"
                                     :percentage="25"
                                     :stroke-width="20"
                                     :width="110"
                                     color="rgba(255,149,64,.5)"></el-progress>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="middle-right">
                      <p class="title-item">研究对象总数</p>
                      <div class="circle">
                        <el-progress type="circle"
                                     stroke-linecap="butt"
                                     :percentage="25"
                                     :stroke-width="20"
                                     :width="110"
                                     color="rgba(0,112,244,.5)"></el-progress>
                      </div>
                      <div class="middle-right-p">
                        <p class="p1">
                          <span>录入中</span>
                        </p>
                        <p class="p2">
                          <span>已完成</span>
                        </p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="item-bottom">
                <el-steps :active="item.step - 1">
                  <el-step v-for="(itemC1, idx) in item.projectType === 2
                      ? stepArr1
                      : stepArr2"
                           :key="idx">
                    <div slot="title"
                         class="title-obj">{{ itemC1 }}</div>
                  </el-step>
                </el-steps>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12"
                v-if="listObj.length % 2 === 1">
          <div class="grid-content grid-content-last no-data-module">
            <p class="iconfont icon-no_datas p1"></p>
            <p class="p2">暂时没有项目，请新建...</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 分页 -->
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
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { projectLists, deleteLists, finishedAlreadys } from '@/api/projectsMangement' //
export default {
  name: 'ProjectLists',
  data () {
    return {
      loading: false,
      checkRadio: 0,
      projectName: '',
      // 项目列表数据
      listObj: [],
      stepArr1: ['研究对象', '项目进度', '随访列表', '审批管理', '统计分析'],
      stepArr2: ['研究对象', '项目进度', '审批管理', '统计分析'],
      // 分页数据
      pageNo: 1, // 页码
      pageSize: 10, // 每页显示的数据条数
      total: 0 // 总页数
    }
  },
  props: {},
  computed: {
    ...mapGetters(['userInfo', 'dataSourceValue'])
  },
  watch: {},
  components: {},
  created () { },
  mounted () {
    this.getProjectLists()
  },
  destroyed () { },
  methods: {
    ...mapMutations(['projectsMangement/projecttype']),
    // 获取项目列表
    getProjectLists () {
      this.loading = true
      this.listObj = []
      const data = {
        userId: this.userInfo?.pkId,
        dataSourceId: this.dataSourceValue?.id,
        type: '',
        status: '',
        pStatus: this.checkRadio !== 0 ? this.checkRadio : '',
        projectName: this.projectName,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      projectLists(data)
        .then((res) => {
          if (res?.obj) {
            this.listObj = res.obj?.data ?? []
            this.total = res.obj.total
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 分页函数
    handleSizeChange (val) {
      this.pageSize = val
      this.getProjectLists()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getProjectLists()
    },
    // 进入项目详情
    goItemLists (item) {
      this.$Storage.sessionSet('projectId', item.id)
      this.$router.push({
        name: 'ProjectListsDetails',
        params: {
          comName: 'SearchObjectCom',
          projectType: item.projectType,
          id: item
        }
      })
    },
    // 进入项目修改
    goSearchObj (item) {
      // this['projectsMangement/projecttype'](item.projectType)
      // this.$Storage.sessionSet('projectType', item.projectType)
      this.resetSetItem('projectType', item.projectType) // vue 自定义监听本地存储
      this.$router.push({
        name: 'ResearchObject',
        params: {
          stepName: 'ProjectCreate',
          obj: item
        }
      })
    },
    // 完成
    finishedAlreadys (item) {
      this.$confirm('项目结束操作不可逆,请谨慎使用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id: item.id
        }
        finishedAlreadys(data).then(res => {
          if (res) {
            this.$message({
              message: '该项目已完成',
              type: 'success'
            })
            this.getProjectLists()
          }
        }).catch(() => {})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 删除项目
    deleteList (item) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteFn(item) // 调用删除函数
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 删除接口
    deleteFn (item) {
      const data = {
        id: item.id
      }
      deleteLists(data).then(res => {
        if (res) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getProjectLists()
        }
      }).catch(() => {})
    },
    // 创建新项目
    createButton () {
      this.$Storage.sessionSet('projectType', 2)
      if (this.dataSourceValue.id) {
        this.$router.push('/ResearchObject/ProjectCreate')
      } else {
        this.$message({
          message: '请先选择病种再创建项目~',
          type: 'warning'
        })
      }
    },
    checkRadios (val) {
      this.projectName = ''
      this.getProjectLists()
    },
    handleIconClick () {
      this.checkRadio = 0
      this.getProjectLists()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.project-lists {
  .rg-bar{
    display: flex;
    justify-content: center;
    align-items: center;
    .sn-input{
      margin:0 20px;
    }
  }
  .container-wraps {
    margin-top: 20px;
    .grid-content {
      background: #fff;
      .item-lists {
        height: 340px;
        .item-top {
          position: relative;
          overflow: hidden;
          .left-t {
            font-size: 12px;
            color: #999999;
            // float: left;
            line-height: 20px;
            display: flex;
            .mo{
              color: #666666;
              margin-right: 10px;
            }
            i{
              max-width: 50px;
              overflow: hidden; /* 溢出时不显示溢出的内容 */
              text-overflow: ellipsis; /* 发生溢出时使用省略号代替 */
              display: -webkit-box; /* chrome浏览器的私有属性。显示为box。 */
              -webkit-box-orient: vertical; /* 垂直排列元素 */
              -webkit-line-clamp: 1; /* 显示多少行 */
            }
          }
          .right-t {
            font-size: 12px;
            color: #0070f4;
            // float: right;
            padding-top: 10px;
            text-align: right;
            span {
              padding: 4px 12px;
              background: rgba(0, 112, 244, 0.1);
              margin-right: 10px;
              border-radius: 2px;
            }
          }
        }

        .item-middle {
          padding: 35px 0px;
          .title-item {
            font-size: 12px;
            color: #999999;
            text-align: center;
            margin-bottom: 20px;
          }
          .circle {
            text-align: center;
          }
          .middle-right {
            position: relative;
            .middle-right-p {
              position: absolute;
              right: 12%;
              top: 75px;
              p {
                position: relative;
                font-size: 12px;
                padding: 2px 0px;
              }
              .p1 > span::before {
                content: "";
                display: block;
                width: 6px;
                height: 6px;
                border-radius: 100%; /**控制形状**/
                background-color: #e6e6e6; /**控制图标颜色**/
                margin-right: 10px; /**图标与文字距离**/
                position: absolute;
                left: -12px;
                top: 6px;
              }

              .p2 > span::before {
                content: "";
                display: block;
                width: 6px;
                height: 6px;
                border-radius: 100%; /**控制形状**/
                background-color: #0070f4; /**控制图标颜色**/
                margin-right: 10px; /**图标与文字距离**/
                position: absolute;
                left: -12px;
                top: 6px;
              }
            }
          }
        }

        .item-bottom {
          padding-top: 10px;
          .title-obj {
            font-size: 12px;
          }
        }
      }
    }
    .grid-content-last {
      height: 403px;
      // padding: 129px 0px;
    }
  }
}
</style>
<style lang="scss">
.project-lists {
  .el-step__head.is-success {
    color: #0070f4;
    border-color: #0070f4;
  }
  .el-step__title.is-success {
    color: #c0c4cc;
  }
  .el-step__head.is-process {
    color: #ffffff;
    .el-step__icon.is-text {
      border-color: #0070f4;
      background: #0070f4;
    }
  }
  .el-step__icon.is-text {
    width: 18px;
    height: 18px;
  }
  .el-step.is-horizontal .el-step__line {
    top: 8px;
  }
  .check-radio{
    .el-radio {
      margin-right: 10px;
    }
    .el-radio__input {
      display: none;
    }
  }

}
</style>
