<!-- 项目列表：研究对象：队列入排及纳入标准与排除标准 -->
<template>
  <div class="queue-container">
    <div class="module-container-two">
      <div class="title">
        <h1>队列入排</h1>
        <span class="right right-button">
          <el-button size="mini" @click.native="goPrev">上一步</el-button>
          <el-button size="mini" type="primary" @click.native="nextStep"
            >下一步</el-button
          >
        </span>
      </div>
      <div class="queue-content">
        <el-scrollbar style="height: 100%" ref="scroll">
          <ul class="ul-l">
            <!-- @mouseenter="mouseEnter"
                @mouseleave="mouseLeave" -->
            <li
              v-for="(item, index) in queueDatas"
              class="pointer"
              :class="{ actives: num === index ? true : false }"
              :key="index"
              @click="checkQueue(item)"
            >
              <div class="ul-li-d1">
                <el-tag
                  closable
                  class="el-tags"
                  :disable-transitions="true"
                  v-if="idx !== index"
                  @close="handleClose(item, index)"
                >
                  <span class="sn" @click="correctTag(item, index)">
                    {{ item.groupName }}</span
                  >
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-else
                  placeholder="请输入修改名称"
                  v-model="item.groupName"
                  ref="saveTagInput"
                  size="small"
                  v-fo
                  @focus="handleFocus(item.groupName)"
                  @keyup.enter.native="handleInputConfirm(index)"
                  @blur="handleInputConfirm(item, index)"
                >
                </el-input>
              </div>
              <div class="ul-li-d2" @click="changeFn(index)">
                <span>{{
                  item.personCount === 0 ? '未纳入患者' : item.personCount
                }}</span>
              </div>
            </li>
            <li>
              <el-button
                @click.native="addQueue"
                :loading="addLoading"
                class="el-icon-plus add-button"
                >新增分组</el-button
              >
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>

    <!-- 纳入标准 排除标准 -->
    <el-row :gutter="15">
      <!-- 纳入标准 -->
      <el-col :span="12">
        <div class="module-container-two">
          <div class="title">
            <h1>纳入标准</h1>
            <span class="right pointer">
              <i class="el-icon-more"></i>
            </span>
          </div>
          <el-row>
            <el-col :span="18" class="table-left">
              <!-- 条件树 -->
              <el-row class="left-col">
                <el-col :span="10">
                  <div class="change-radio">
                    <el-radio v-model="leftRadio" label="1">树形检索</el-radio>
                    <span style="vertical-align: 3%;">|</span>
                    <el-radio v-model="leftRadio" label="2">高级检索</el-radio>
                  </div>
                </el-col>
                <el-col :span="8">
                  <span>
                    {{
                      leftDatas && leftDatas.treeStatus === 1
                        ? leftDatas && leftDatas.treeSearchResult
                        : leftDatas && leftDatas.highStatus === 1
                        ? leftDatas && leftDatas.highSearchResult
                        : 0
                    }}
                    人
                  </span>
                </el-col>
                <el-col :span="6">
                  <el-button
                    type="text"
                    @click.native="openDialog('tree', 1, leftDatas)"
                    >编辑</el-button
                  >
                </el-col>
              </el-row>
              <!-- 事件 -->
              <el-row class="left-col" v-if="false">
                <el-col :span="10"><span>事件检索</span></el-col>
                <el-col :span="8"
                  ><span
                    >{{
                      (leftDatas && leftDatas.eventSearchResult) || 0
                    }}
                    人</span
                  ></el-col
                >
                <el-col :span="6">
                  <el-button
                    type="text"
                    @click.native="openDialog('event', 1, leftDatas)"
                    >编辑</el-button
                  >
                </el-col>
              </el-row>
              <!-- 精确搜索 -->
              <el-row class="left-col" v-if="false">
                <el-col :span="10"><span>精确检索</span></el-col>
                <el-col :span="8"
                  ><span
                    >{{
                      (leftDatas && leftDatas.exactSearchResult) || 0
                    }}
                    人</span
                  ></el-col
                >
                <el-col :span="6">
                  <el-button
                    type="text"
                    @click.native="openDialog('accurate', 1, leftDatas)"
                    >编辑</el-button
                  >
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6" class="table-right">
              <div class="text">
                <p>纳入患者总数</p>
                <p class="num">
                  {{ (leftDatas && leftDatas.searchResult) || 0 }}
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>

      <!-- 排除标准 -->
      <el-col :span="12">
        <div class="module-container-two">
          <div class="title">
            <h1>排除标准</h1>
            <span class="right pointer">
              <i class="el-icon-more"></i>
            </span>
          </div>
          <el-row>
            <el-col :span="18" class="table-left ">
              <!-- 条件树 -->
              <el-row class="left-col">
                <el-col :span="10" class="disable">
                  <div class="change-radio">
                    <el-radio v-model="rightRadio" label="1">
                      树形检索</el-radio
                    >
                    <span style="vertical-align: 3%;">|</span>
                    <el-radio v-model="rightRadio" label="2">高级检索</el-radio>
                  </div>
                </el-col>
                <el-col :span="8">
                  <span>
                    {{
                      rightDatas && rightDatas.treeStatus === 1
                        ? rightDatas && rightDatas.treeSearchResult
                        : rightDatas && rightDatas.highStatus === 1
                        ? rightDatas && rightDatas.highSearchResult
                        : 0
                    }}
                    人
                  </span>
                </el-col>
                <el-col :span="6">
                  <el-button
                    type="text"
                    @click.native="openDialog('tree', 2, rightDatas)"
                    >编辑</el-button
                  >
                </el-col>
              </el-row>
              <!-- 事件 -->
              <el-row class="left-col" v-if="false">
                <el-col :span="10"><span>事件检索</span></el-col>
                <el-col :span="8"
                  ><span
                    >{{
                      (rightDatas && rightDatas.eventSearchResult) || 0
                    }}
                    人</span
                  ></el-col
                >
                <el-col :span="6">
                  <el-button
                    type="text"
                    @click.native="openDialog('event', 2, rightDatas)"
                    >编辑</el-button
                  >
                </el-col>
              </el-row>
              <!-- 精确搜索 -->
              <el-row class="left-col" v-if="false">
                <el-col :span="10"><span>精确检索</span></el-col>
                <el-col :span="8"
                  ><span
                    >{{
                      (rightDatas && rightDatas.exactSearchResult) || 0
                    }}
                    人</span
                  ></el-col
                >
                <el-col :span="6">
                  <el-button
                    type="text"
                    @click.native="openDialog('accurate', 2, rightDatas)"
                    >编辑</el-button
                  >
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6" class="table-right">
              <div class="text">
                <p>排除患者总数</p>
                <p class="num">
                  {{ (rightDatas && rightDatas.searchResult) || 0 }}
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!-- 确认纳入按钮 -->
    <div class="queue-submit">
      <el-button
        type="primary"
        style="width: 100% ;height:50px"
        :disabled="queueDatas && queueDatas.length > 0 ? false : true"
        :loading="loading"
        @click.native="getSureInputDatas"
      >
        确认纳入
        <span class="n">{{ totel }}</span
        >人
      </el-button>
    </div>
    <!-- 弹窗组件 -- 条件树 -->
    <ConditionTreePop
      v-if="treeDialogVisible"
      :treeDialogVisible="treeDialogVisible"
      @treeDialogEmit="treeDialogEmit"
    />
    <!-- 高级搜索 -->
    <AdvencedSearchPop
      v-if="advencedDialogVisible"
      :advencedDialogVisible="advencedDialogVisible"
      :data="advancedDatas"
      @advencedDialogEmit="advencedDialogEmit"
    />
    <!-- 事件搜索 -->
    <EventSearchPop
      v-if="eventDialogVisible"
      :eventDialogVisible="eventDialogVisible"
      @eventDialogEmit="eventDialogEmit"
      :data="eventDatas"
    />
    <!-- 精确搜索 -->
    <AccurateSearchPop
      v-if="accurDialogVisible"
      :accurDialogVisible="accurDialogVisible"
      @accurDialogEmit="accurDialogEmit"
      :data="accurateDatas"
    />
  </div>
</template>

<script>
import { mapGetters, createNamespacedHelpers } from 'vuex'
import {
  getQueueDatas,
  addNewQueue,
  deleteQueue,
  correctQueue,
  getListByGroupId,
  sureInputDatas,
  synthesize
} from '@/api/projectsMangement'
import {
  ConditionTreePop,
  AdvencedSearchPop,
  EventSearchPop,
  AccurateSearchPop
} from './components'
import { TreeConvertList } from '@/utils/conditionTreeFn'
const { mapMutations } = createNamespacedHelpers('queueSearch')
export default {
  name: 'ResearchComPageOne',
  data () {
    return {
      idx: 999,
      num: 0, // 队列入排默认显示第一个
      inputValue: null,
      oldMsg: null,
      queueDatas: [],
      addLoading: false,
      treeDialogVisible: false, // 条件树
      advencedDialogVisible: false, // 高级搜索
      eventDialogVisible: false, // 事件搜索
      accurDialogVisible: false, // 精确搜索
      //
      leftRadio: '1',
      rightRadio: '1',
      // 纳排标准
      leftDatas: null,
      rightDatas: null,
      totel: 0,
      treeData: {
        groupId: 0,
        projectId: 0,
        id: null,
        type: 1,
        groupName: '',
        searchType: null // 判断高级搜索还是条件搜索
      },
      // 分组id
      groupIds: null,
      loading: false,
      // 事件数据
      eventDatas: [],
      // 高级搜索数据
      advancedDatas: [],
      // 精确检索数据
      accurateDatas: ''
    }
  },
  props: {},
  computed: {
    ...mapGetters(['userInfo', 'seniorLoading', 'closeTreeDialog'])
    // listenSearchResult(){
    //  const  {"rightDatas.highSearchResult","rightDatas.treeSearchResult"} = this
    //   return {'rightDatas.highSearchResult','rightDatas.treeSearchResult'}
    // }
  },
  watch: {
    seniorLoading (val) {
      if (!val) {
        this.getQueueDatas()
        this.eventDialogVisible = false
        this.advencedDialogVisible = false
      }
    },
    closeTreeDialog (val) {
      if (val) {
        this.getQueueDatas()
        this.treeDialogVisible = false
        this.syncCloseDialog(false)
      }
    },
    leftRadio (val) {
      this.rightRadio = val
    }
    // 'rightDatas.highSearchResult' (val) {
    //   this.rightDatas.searchResult = this.synthesize()
    //   this.leftDatas.searchResult = this.synthesize()
    // },
    // 'rightDatas.treeSearchResult' (val) {
    //   this.rightDatas.searchResult = this.synthesize()
    //   this.leftDatas.searchResult = this.synthesize()
    // },
    // 'leftDatas.highSearchResult' (val) {
    //   this.leftDatas.searchResult = this.synthesize()
    // },
    // 'leftDatas.treeSearchResult' (val) {
    //   this.leftDatas.searchResult = this.synthesize()
    // }
  },
  components: {
    ConditionTreePop,
    AdvencedSearchPop,
    EventSearchPop,
    AccurateSearchPop
  },
  created () {},

  mounted () {
    this.newAddQueue()
    this.getQueueDatas(true)
  },
  destroyed () {
    this.groupIds = null
  },
  methods: {
    ...mapMutations(['syncGroupData', 'syncFlattenData', 'syncCloseDialog']),
    // 单独获取纳入患者总数
    synthesize () {
      const pID = this.$Storage.sessionGet('pID')

      const data = {
        id: this.leftDatas.id || this.rightDatas.id,
        projectId: this.$Storage.sessionGet('projectId'),
        groupId: this.rightDatas.groupId,
        dataSourceId: pID.id
      }

      synthesize(data).then(res => {
        console.log(res)
        // return res.searchResult
      })
    },

    openDialog (val, type, data) {
      // console.log(val, type, data)
      this.treeData.type = type
      this.treeData.id = data ? data.id : null
      this.treeData.searchType = val === 'tree' ? 2 : val === 'event' ? 1 : null
      this.syncGroupData(this.treeData)

      if (val === 'tree') {
        // 树
        //
        if (data && data.treeSearch) {
          const jsondata = JSON.parse(data.treeSearch)
          const newData = TreeConvertList(jsondata.condition, '', 'childList')
          // console.log(jsondata)
          // console.log(newData)
          newData.forEach(item => {
            // console.log(item)
            // item.num = jsondata.countList[item.id]
            item.num = jsondata.condition[item.id]
          })

          this.syncFlattenData(newData)
        }

        if (
          (this.leftRadio === '1' && type === 1) ||
          (this.rightRadio === '1' && type === 2)
        ) {
          this.treeDialogVisible = true
        } else {
          if (data && data.highSearch) {
            const jsondata = JSON.parse(data.highSearch)
            this.advancedDatas = jsondata.conditionList
          } else {
            this.advancedDatas = []
          }
          this.advencedDialogVisible = true
        }
      } else if (val === 'accurate') {
        // 精确
        this.accurateDatas = (data && data.exactSearch) || ''
        this.accurDialogVisible = true
      } else if (val === 'event') {
        // 事件
        if (data && data.eventSearch) {
          const jsondata = JSON.parse(data.eventSearch)
          this.eventDatas = jsondata.conditionList
        } else {
          this.eventDatas = []
        }
        this.eventDialogVisible = true
      }
    },
    treeDialogEmit (val) {
      this.getQueueDatas()
      this.treeDialogVisible = false
      // this.getListByGroup(this.leftDatas.groupId || this.rightDatas.groupId)
      // this.synthesize()
    },
    // 高级搜索
    advencedDialogEmit () {
      this.advencedDialogVisible = false
      // this.synthesize()
      // this.getListByGroup(this.leftDatas.groupId || this.rightDatas.groupId)
    },
    eventDialogEmit (val) {
      this.eventDialogVisible = false
      // this.synthesize()
      // this.getListByGroup(this.leftDatas.groupId || this.rightDatas.groupId)
    },
    accurDialogEmit (val) {
      this.getQueueDatas()
      this.accurDialogVisible = false
      // this.synthesize()
      // this.getListByGroup(this.leftDatas.groupId || this.rightDatas.groupId)x`
    },
    goPrev () {
      this.$emit('next', 0)
    },
    nextStep () {
      this.$emit('next', 2)
    },
    // 纳排信息
    getListByGroup (id) {
      getListByGroupId(id)
        .then(res => {
          this.totel = res.obj.count || 0
          if (res.obj?.exInfoyList?.length > 0) {
            const left = res.obj.exInfoyList.filter(item => item.type === 1)
            const right = res.obj.exInfoyList.filter(item => item.type === 2)
            this.leftDatas = left.length > 0 ? left[0] : null
            this.rightDatas = right.length > 0 ? right[0] : null
            // console.log(this.leftDatas)
            // 纳入标准
            if (this.leftDatas?.treeStatus === 1) {
              this.leftRadio = '1'
            } else if (this.leftDatas?.highStatus === 1) {
              this.leftRadio = '2'
            } else {
              this.leftRadio = '1'
            }
            // 排除标准
            if (this.rightDatas?.treeStatus === 1) {
              this.rightRadio = '1'
            } else if (this.rightDatas?.highStatus === 1) {
              this.rightRadio = '2'
            } else {
              this.rightRadio = '1'
            }
          } else {
            this.leftDatas = null
            this.rightDatas = null
          }
        })
        .catch(() => {})
    },
    // 队列点击查询数据
    checkQueue (data) {
      this.getListByGroup(data.id)
      this.treeData.groupId = data.id
      this.treeData.groupName = data.groupName
      this.treeData.projectId = data.projectId
      this.groupIds = data.id
    },
    // 确认纳入
    getSureInputDatas () {
      this.loading = true
      const data = {
        projectId: this.$Storage.sessionGet('projectId'),
        groupId: this.groupIds
      }
      sureInputDatas(data)
        .then(res => {
          if (res?.obj) {
            this.totel = res.obj
            this.getQueueDatas()
            this.$message({
              type: 'success',
              message: '纳入成功!'
            })
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 获取队列入排数据
    getQueueDatas (n) {
      const data = {
        projectId: this.$Storage.sessionGet('projectId')
      }
      getQueueDatas(data)
        .then(res => {
          if (res) {
            this.queueDatas = res?.obj ?? []
            if (this.queueDatas.length > 0 && n) {
              this.treeData.groupId = this.queueDatas[0].id
              this.treeData.groupName = this.queueDatas[0].groupName
              this.groupIds = this.queueDatas[0].id
              this.treeData.projectId = this.queueDatas[0].projectId
              this.getListByGroup(this.queueDatas[0].id)
            } else if (this.queueDatas.length > 0 && !n) {
              this.getListByGroup(this.groupIds)
            }
          }
        })
        .catch(() => {})
    },
    // 删除队列
    handleClose (item, index) {
      console.log('删除了')
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteQueue(item, index)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    //
    deleteQueue (item, index) {
      const { id } = item
      const data = { id }
      deleteQueue(data)
        .then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.queueDatas.splice(index, 1)
            this.num = 0
            this.getQueueDatas() // 重新拉取数据
            // this.getListByGroup(id)
          }
        })
        .catch(() => {})
    },
    newAddQueue () {
      const isnew = sessionStorage.getItem('newAddQueue')
      console.log(isnew, 'isnew')
      if (isnew === '1') {
        const data = {
          createBy: this.userInfo?.pkId,
          createTime: '',
          groupName: '新增分组1',
          id: null,
          personCount: 0,
          projectId: this.$Storage.sessionGet('projectId')
        }
        addNewQueue(data).then(res => {
          if (res?.obj) {
            this.queueDatas.push(res.obj)
            sessionStorage.setItem('newAddQueue', 0) // 新增的时候默认增加新增分组1
          }
        })
      }
    },
    // 新增队列
    addQueue () {
      this.addLoading = true
      const data = {
        createBy: this.userInfo?.pkId,
        createTime: '',
        groupName: '分组名称',
        id: null,
        personCount: 0,
        projectId: this.$Storage.sessionGet('projectId')
      }
      addNewQueue(data)
        .then(res => {
          if (res?.obj) {
            this.queueDatas.push(res.obj)
            this.$message({
              type: 'success',
              message: '新增成功!'
            })
          }
          this.addLoading = false
        })
        .catch(() => {
          this.addLoading = false
        })
    },
    // 修改队列
    correctQueue (item) {
      const data = item
      correctQueue(data)
        .then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
        })
        .catch(() => {})
    },

    correctTag (item, index) {
      this.idx = index
    },
    handleFocus (val) {
      this.oldMsg = val
    },
    handleInputConfirm (item, index) {
      this.idx = 999
      if (!this.queueDatas[index].groupName) {
        this.queueDatas[index].groupName = this.oldMsg
      }
      this.correctQueue(item) // 调用修改接口
    },
    // mouseEnter () {
    //   document.removeEventListener('click', this.handler, false)
    // },
    // mouseLeave () {
    //   document.addEventListener('click', this.handler, false)
    // },
    // handler () {
    //   this.idx = 999
    // },
    changeFn (index) {
      // console.log(index)
      this.num = index
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.queue-container {
  .right-button {
    top: 9px;
  }
  .actives {
    // border: 1px solid #0070f4!important;
    box-shadow: 0px 0px 10px 5px rgba(0, 112, 244, 0.5);
  }
  .queue-content {
    width: 100%;
    height: 140px;
    background: #ffffff;
    // margin-bottom: 20px;
    .ul-l {
      // width: 100vh;
      // white-space: nowrap;
      padding: 20px 44px;
      // overflow: scroll;
      // padding-bottom: 10px;
      li {
        width: 160px;
        height: 80px;
        margin-right: 20px;
        border: 1px solid #e6e6e6;
        display: inline-block;
        position: relative;
        .el-tags {
          width: 158px;
          height: 32px;
          position: absolute;
          left: 0;
          top: 0;
          .sn {
            position: absolute;
            left: 0;
            top: 0;
            display: inline-block;
            width: 122px;
            height: 32px;
            padding-left: 10px;
            color: #0070f4;
            overflow: hidden; /* 溢出时不显示溢出的内容 */
            text-overflow: ellipsis; /* 发生溢出时使用省略号代替 */
            display: -webkit-box; /* chrome浏览器的私有属性。显示为box。 */
            -webkit-box-orient: vertical; /* 垂直排列元素 */
            -webkit-line-clamp: 1; /* 显示多少行 */
          }
        }
        .input-new-tag {
          position: absolute;
          left: 0;
          top: 0;
        }
        &:last-child {
          border: 1px solid #0070f4;
          background: rgba(0, 112, 244, 0.1);
          text-align: center;
          vertical-align: top;
          line-height: 80px;
          cursor: pointer;
          .add-button {
            font-size: 16px;
            color: #0070f4;
          }
        }
        .ul-li-d2 {
          color: #c4c4c4;
          font-size: 14px;
          padding: 10px;
          display: flex;
          justify-content: center;
          align-content: center;
          width: 158px;
          height: 46px;
          position: absolute;
          left: 0;
          bottom: 0;
          overflow: hidden; /* 溢出时不显示溢出的内容 */
          text-overflow: ellipsis; /* 发生溢出时使用省略号代替 */
          display: -webkit-box; /* chrome浏览器的私有属性。显示为box。 */
          -webkit-box-orient: vertical; /* 垂直排列元素 */
          -webkit-line-clamp: 1; /* 显示多少行 */
        }
      }
    }
  }
  .table-left {
    border-right: 1px solid #e9e9e9;
    vertical-align: middle;
  }
  // 设置不可编辑
  .disable {
    pointer-events: none;
    cursor: default;
    // opacity: 0.6;
  }
  .left-col {
    // line-height: 48px;
    line-height: 60px;
    text-align: center;
    // border-bottom: 1px solid #e9e9e9;
  }
  .table-right {
    vertical-align: middle;
    position: relative;
    // height: 146px;
    height: 63px;
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      text-align: center;
      transform: translate(-50%, -50%);
      width: 100%;
      .num {
        margin-top: 5px;
        font-size: 16px;
        font-weight: 700;
        color: #0070f4;
      }
    }
  }
  .queue-submit {
    margin-top: 15px;
    .n {
      margin: 0 2px;
    }
  }
}
</style>
<style lang="scss">
//
.queue-container {
  .queue-content {
    .ul-l {
      .ul-li-d1 {
        .el-tag {
          border: none;
          border-radius: 0;
        }
        .el-tag .el-icon-close {
          top: -1px;
          right: -125px !important;
        }
        .el-input {
          input {
            border: none !important;
            background: rgba(0, 112, 244, 0.15);
            border-radius: 0;
          }
        }
      }
      .el-button {
        border: none !important;
        padding: 30px 38px;
        background: rgba(0, 112, 244, 0.1);
      }
    }
  }
  .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
    white-space: nowrap;
  }
  .change-radio {
    .el-radio {
      margin-right: 10px;
      margin-left: 0px;
    }
    .el-radio__input {
      display: none;
    }
  }
  // .el-scrollbar__wrap {
  //   overflow-x: hidden;
  // }
}
</style>
