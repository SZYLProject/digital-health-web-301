<!-- 项目創建 -->
<template>
  <div
    class="project-create module-container-two"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)"
    v-loading="loading"
    :element-loading-text="txt"
  >
    <div class="title">
      <h1>{{ itemName }}</h1>
      <span class="right right-button">
        <el-button size="mini" @click.native="goBack">取消</el-button>
        <el-button size="mini" type="primary" @click.native="nextStep"
          >下一步</el-button
        >
      </span>
    </div>
    <!-- 新建项目流程 -->
    <div class="create-content">
      <!-- 项目信息 -->
      <div class="project-message con-content">
        <h2 class="title-2">项目信息</h2>
        <el-row style="margin-bottom: 25px">
          <el-col :span="24">
            <div class="item-put">
              <!-- 项目名称 -->
              <div class="ms">
                <span class="ms-t">项目名称（必填项）：</span>
                <span>
                  <el-input
                    size="small"
                    v-model.trim="form.projectName"
                    placeholder="请输入项目名称"
                  ></el-input>
                </span>
              </div>
              <!-- 项目牵头人 -->
              <div class="ms">
                <span class="ms-t">项目牵头人：</span>
                <span>
                  <el-input
                    size="small"
                    v-model.trim="form.leader"
                    placeholder="请输入项目牵头人"
                  ></el-input>
                </span>
              </div>
              <!-- 拟收集患者数 -->
              <div class="ms">
                <span class="ms-t">拟收集患者数：</span>
                <span>
                  <el-input
                    size="small"
                    v-model.trim="form.planNum"
                    placeholder="请输入拟收集患者数"
                  ></el-input>
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- 研究目的/方案 -->
        <el-row style="margin-bottom: 25px">
          <el-col :span="24">
            <div class="item-put">
              <!-- 项目名称 -->
              <div class="ms" style="width: 100%">
                <span class="ms-t" style="margin-right: 38px"
                  >研究目的/方案：</span
                >
                <span style="width: 50%">
                  <el-input
                    size="small"
                    style="width: 100%"
                    v-model.trim="form.purpose"
                    placeholder="请输入研究目的/方案"
                    clearable
                  ></el-input>
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- 创建结束时间 -->
        <el-row style="margin-bottom: 25px">
          <el-col :span="24">
            <div class="item-put">
              <!-- 创建结束时间 -->
              <div class="ms" style="width: 100%">
                <span class="ms-t" style="margin-right: 38px"
                  >创建/结束时间：</span
                >
                <span style="">
                  <el-date-picker
                    v-model="form.startTime"
                    type="date"
                    size="small"
                    placeholder="创建日期"
                  >
                  </el-date-picker>
                  <span style="padding: 0 10px"></span>
                  <el-date-picker
                    v-model="form.endTime"
                    type="date"
                    size="small"
                    placeholder="结束日期"
                  >
                  </el-date-picker>
                  <!-- <el-date-picker
                    v-model="form.time"
                    style="width: 100%"
                    size="small"
                    type="daterange"
                    range-separator="至"
                    @change="onChange"
                    start-placeholder="创建日期"
                    end-placeholder="结束日期">
                  </el-date-picker> -->
                  <!-- <a-config-provider :locale="zhCN">
                    <a-range-picker
                      separator="至"
                      @change="onChange"
                      format="YYYY-MM-DD"
                      :value="time"
                      :placeholder="['创建日期', '结束日期']"
                    />
                  </a-config-provider> -->
                  <!-- <ConfigProvider :locale="zhCN">
                    <DatePicker
                      separator="至"
                      @change="onChange"
                      format="YYYY-MM-DD"
                      :value="time"
                      :placeholder="['创建日期', '结束日期']"
                    />
                  </ConfigProvider> -->
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- 项目成员 -->
        <el-row style="margin-bottom: 10px">
          <el-col :span="24">
            <div class="item-put">
              <!-- 项目成员 -->
              <div class="ms" style="width: 100%">
                <span class="ms-t" style="margin-right: 38px">项目成员：</span>
                <span style="">
                  <el-select
                    filterable
                    v-model="itemMember"
                    size="small"
                    :disabled="
                      form.affiliation && form.affiliation === 1
                        ? false
                        : form.affiliation && form.affiliation === 2
                        ? true
                        : false
                    "
                    @change="optionChange"
                    multiple
                    style="margin-left: 30px"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in options"
                      :key="index"
                      :label="item.userName"
                      :value="item.pkId"
                    >
                    </el-option>
                  </el-select>
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="more-message con-content">
        <span class="right-abs pointer" @click="isShow = !isShow">
          <el-button type="text">
            显示更多
            <i
              class="el-icon-arrow-up"
              style="margin-top: 8px"
              :class="{ arrowTransform: !isShow, arrowTransformReturn: isShow }"
            ></i>
          </el-button>
        </span>
      </div>

      <!-- 其他信息 -->
      <el-collapse-transition>
        <div
          class="other-message con-content"
          style="margin-top: 25px"
          v-show="isShow"
        >
          <h2 class="title-2">其他信息</h2>
          <!-- 项目类型(必填项) -->
          <el-row class="other-message">
            <el-col :span="24">
              <div class="ot-ms">
                <div class="ot-ms-t">项目类型：</div>
                <div class="ot-ms-c">
                  <el-radio-group
                    v-model="form.projectType"
                    @change="changeRadio"
                  >
                    <el-radio :label="1">回顾性研究</el-radio>
                    <el-radio :label="2">前瞻性研究</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
          </el-row>

          <!-- 研究类型(必填项) -->
          <el-row class="other-message">
            <el-col :span="24">
              <div class="ot-ms">
                <div class="ot-ms-t">研究类型：</div>
                <div class="ot-ms-c">
                  <el-radio-group v-model="form.researchType">
                    <el-radio :label="1">随机对照研究</el-radio>
                    <el-radio :label="2">非随机对照研究</el-radio>
                    <el-radio :label="3">队列研究</el-radio>
                    <el-radio :label="4">病例对照研究</el-radio>
                    <el-radio :label="5">横断面研究</el-radio>
                    <el-radio :label="6">描述性研究</el-radio>
                    <el-radio :label="7">其他</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 资金来源 -->
          <el-row>
            <el-col :span="24">
              <div class="ot-ms">
                <div class="ot-ms-t">资金来源：</div>
                <div class="ot-ms-c">
                  <el-radio-group v-model="form.financeSource">
                    <el-radio :label="1">国家（省，市）自然科学基金</el-radio>
                    <el-radio :label="2">国家（省，市）科技重大专项</el-radio>
                    <el-radio :label="3">国家（省，市）重点研发计划</el-radio>
                    <el-radio :label="4"
                      >国家（省，市）技术创新引导专项（基金）</el-radio
                    >
                    <el-radio :label="5">其他</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
          </el-row>

          <!-- 项目说明（可选 -->
          <el-row>
            <el-col :span="24">
              <div class="ot-ms">
                <div class="ot-ms-t">项目说明（可选）：</div>
                <div class="ot-ms-c">
                  <el-input
                    type="textarea"
                    style="width: 60%"
                    size="small"
                    v-model.trim="form.description"
                    placeholder="请输入项目说明"
                    clearable
                  ></el-input>
                </div>
              </div>
            </el-col>
          </el-row>

          <!-- 项目附件 -->
          <el-row style="margin: 10px 0px 20px">
            <el-col :span="24">
              <div class="ot-ms">
                <div class="ot-ms-t">项目附件：</div>
                <div class="ot-ms-c ms-f">
                  <div class="ms-f-e">
                    <el-upload
                      class="upload-demo"
                      ref="my-upload"
                      action=""
                      name="files"
                      :limit="5"
                      :http-request="httpRequest"
                      :before-upload="beforeUpload"
                      :on-remove="onRemove"
                      :show-file-list="true"
                      :on-exceed="onExceed"
                      :file-list="form.fileList"
                      multiple
                    >
                      <el-button size="small">
                        <i class="el-icon-upload el-icon--left"></i>
                        上传文件
                      </el-button>
                    </el-upload>
                  </div>
                  <div class="ms-f-s">
                    请上传审批材料，支持格式:
                    word/excel/pdf/txt/jpg/png/gif/rar/dcm
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
// import { DatePicker, ConfigProvider } from 'ant-design-vue'
// import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
// import 'ant-design-vue/dist/antd.css'
// import moment from 'moment'
// import 'moment/locale/zh-cn'
import {
  createProjects,
  fileUploading,
  deleteUploadFiles,
  comeUploadFiles,
  correctProject,
  getItemMember,
  getBackItemMember
} from '@/api/projectsMangement'
// import Vue from 'vue'

// import { DatePicker, ConfigProvider } from 'ant-design-vue'
// Vue.component(DatePicker.name, DatePicker)
// Vue.component(ConfigProvider.name, ConfigProvider)

// Vue.use(DatePicker)
// Vue.use(ConfigProvider)
// moment.locale('zh-cn')

export default {
  name: 'ProjectCreate',
  data () {
    return {
      // zhCN,
      txt: '',
      itemName: '新建项目',
      time: [], // 创建与结束时间
      itemMember: [],
      form: {
        projectName: '', // 项目名称
        leader: '', // 项目牵头人
        planNum: '', // 拟收集患者数：
        purpose: '', // 研究目的/方案
        startTime: '',
        endTime: '',
        userEntities: [], // 项目成员
        financeSource: '', // 资金来源(必填项)
        projectType: '', // 项目类型
        researchType: '', // 研究类型
        description: '', // 项目说明（可选）：
        fileList: [] // 上传文件返回值
      },
      loading: false,
      // fileList: [],
      listObj: null, // 存储回显数据
      isShow: false,
      options: []
    }
  },
  props: {},
  computed: {
    ...mapGetters(['userInfo', 'dataSourceValue'])
  },
  watch: {
    listObj: {
      handler (newName, oldName) {
        if (newName) {
          this.form = newName
        }
      },
      immediate: true,
      deep: true
    }
  },
  components: {},
  created () {
    this.getItemMember() // 获取项目成员
    this.$Storage.sessionRemove('projectId')
    if (this.$route.params?.obj) {
      this.itemName = this.$route.params.obj?.projectName
    } else {
      this.itemName = '新建项目'
    }
  },
  mounted () {
    this.listObj = this.$route.params?.obj ?? null
    // console.log(this.listObj)
    if (this.$route.params?.obj) {
      // 回显修改
      const { id } = this.$route.params.obj
      this.listObj = this.$route.params.obj
      // this.time = [moment(this.listObj.startTime, 'YYYY-MM-DD'), moment(this.listObj.endTime, 'YYYY-MM-DD')]
      this.comeUploadFiles() // 回显文件
      this.getBackItemMember(id) // 回显
    }
  },
  destroyed () {},
  methods: {
    ...mapMutations([
      'projectsMangement/storeitemdata',
      'projectsMangement/projecttype'
    ]),
    // 返回项目列表
    // 下一步
    nextStep () {
      if (
        this.form.projectName === ''
        // this.form.projectType === '' ||
        // this.form.researchType === ''
      ) {
        this.$message({
          message: '请完善必填项再保存进入下一步',
          type: 'warning'
        })
      } else {
        if (this.$route.params.obj) {
          // 修改
          this.$set(this.listObj, 'userEntities', [])
          this.itemMember.map(item => {
            this.listObj.userEntities.push({
              userId: item
            })
          })
          this.correctProject()
        } else {
          // 新建
          this.itemMember.map(item => {
            this.form.userEntities.push({
              userId: item
            })
          })
          this.putCreateProjects()
        }
      }
    },
    goBack () {
      this.$router.push('/PM/ProjectLists')
    },
    // 创建项目确认
    putCreateProjects () {
      this.txt = '加载中......'
      this.loading = true
      const datas = {
        createBy: this.userInfo?.pkId,
        dataSourceId: this.dataSourceValue?.id
      }
      const data = Object.assign(datas, this.form)
      createProjects(data)
        .then(res => {
          if (res?.obj) {
            this.$Storage.sessionRemove('projectItemDatas') //
            this['projectsMangement/storeitemdata'](res.obj.id)
            this.$Storage.sessionSet('projectId', res.obj.id) // 将项目 id 存储在本地 session
            this.$Storage.sessionSet('projectItemDatas', res.obj) //
            this.$emit('next', 1)
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 修改接口
    correctProject () {
      this.txt = '加载中......'
      this.loading = true
      const datas = {
        createBy: this.userInfo?.pkId,
        dataSourceId: this.dataSourceValue?.id
      }
      const data = Object.assign(datas, this.form)
      correctProject(data)
        .then(res => {
          if (res?.obj) {
            this.$Storage.sessionRemove('projectItemDatas') //
            this['projectsMangement/storeitemdata'](res.obj.id)
            this.$Storage.sessionSet('projectId', res.obj.id) // 将项目 id 存储在本地 session
            this.$Storage.sessionSet('projectItemDatas', res.obj) //
            this.$emit('next', 1)
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 上传文件
    httpRequest (files) {
      this.txt = '文件上传中......'
      this.loading = true
      const formData = new FormData()
      formData.append('files', files.file)
      fileUploading(formData)
        .then(res => {
          if (res?.obj) {
            this.form.fileList.push(res.obj[0])
            const s = this.form.fileList[this.form.fileList.length - 1]
            s.name = s.oldFileName
            s.url = s.filePath
            this.$message({
              message: '上传成功~',
              type: 'success'
            })
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 待定函数
    submitUpload () {
      const formData = new FormData() //  用FormData存放上传文件
      this.fileList.forEach(file => {
        formData.append('files', file.raw, file.raw.name) // 此处一定是append file.raw 上传文件只需维护fileList file.raw.name要加上
      })
      fileUploading(formData).then(res => {
        if (res?.obj) {
          this.form.fileList.push(res.obj[0])
          this.$message({
            message: '上传成功~',
            type: 'success'
          })
        }
      })
    },
    // 上传前文件格式判断
    beforeUpload (file) {
      const filePng = file.name.lastIndexOf('.png')
      const fileWord1 = file.name.lastIndexOf('.doc')
      const fileWord2 = file.name.lastIndexOf('.docx')
      const fileExcel1 = file.name.lastIndexOf('.xls')
      const fileExcel2 = file.name.lastIndexOf('.xlsx')
      const filePdf = file.name.lastIndexOf('.pdf')
      const fileTxt = file.name.lastIndexOf('.txt')
      const fileJpg = file.name.lastIndexOf('.jpg')
      const fileGif = file.name.lastIndexOf('.gif')
      const fileRar = file.name.lastIndexOf('.rar')
      const fileDcm = file.name.lastIndexOf('.dcm')
      if (
        filePng === -1 &&
        fileWord1 === -1 &&
        fileWord2 === -1 &&
        fileExcel1 === -1 &&
        fileExcel2 === -1 &&
        filePdf === -1 &&
        fileTxt === -1 &&
        fileJpg === -1 &&
        fileGif === -1 &&
        fileRar === -1 &&
        fileDcm === -1
      ) {
        this.$message({
          message: '请上传指定格式的文件~',
          type: 'warning'
        })
        return false
      }
    },
    // 删除上传的文件
    onRemove (file) {
      // console.log(file)
      const deleteFile = this.form.fileList.filter(
        item => file.name === item.oldFileName
      )[0].fileName // 返回被删除的对象
      const data = {
        fileName: deleteFile,
        id: file.id || ''
      }
      deleteUploadFiles(data).then(res => {
        if (res) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.form.fileList.map((item, index) => {
            if (file.name === item.oldFileName) {
              this.form.fileList.splice(index, 1)
            }
          })
        }
      })
    },
    // 上传文件个数限制
    onExceed () {
      this.$message({
        message: '最多允许上传5个文件奥~',
        type: 'warning'
      })
    },
    // 回显上传文件
    comeUploadFiles () {
      const data = {
        projectId: this.listObj?.id
      }
      comeUploadFiles(data).then(res => {
        if (res) {
          res.obj.map((item, index) => {
            this.form.fileList.push(item)
            this.form.fileList[index].name = item.oldFileName
            this.form.fileList[index].url = item.filePath
          })
          // console.log(this.form)
        }
      })
    },
    // 回顾性 前瞻性
    changeRadio (val) {
      // this['projectsMangement/projecttype'](val)
      // this.$Storage.sessionSet('projectType', val)
      // this.resetSetItem('projectType', val) // 存储到本地
    },

    // 获取项目成员
    async getItemMember () {
      // const { id } = this.$route.params.obj
      const data = {
        userName: ''
      }
      await getItemMember(data).then(res => {
        if (res.obj) {
          this.options = JSON.parse(res.obj) || []
        } else {
          this.options = []
        }
      })
      // await this.getBackItemMember(id)
    },
    // 回显项目成员
    getBackItemMember (id) {
      const data = { id }
      getBackItemMember(data).then(res => {
        // console.log(res?.obj)
        if (res?.obj) {
          this.itemMember = res?.obj || []
        }
      })
    },
    // 时间控件
    onChange (date, dateString) {
      // console.log(date, dateString)
      // this.form.startTime = moment(date[0]).format('YYYY-MM-DD')
      // this.form.endTime = moment(date[1]).format('YYYY-MM-DD')
      this.form.startTime = dateString[0]
      this.form.endTime = dateString[1]
      this.time = date
    },
    optionChange (val) {
      // console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
// @import '~@/styles/antd.css';
.project-create {
  padding-bottom: 50px;
  .right-button {
    top: 9px;
  }
  .create-content {
    padding: 10px 40px;
    background: #ffffff;
    .con-content {
      .title-2 {
        font-size: 16px;
        font-weight: 700;
        color: #999999;
        margin-bottom: 10px;
      }
    }
    .project-message {
      .item-put {
        overflow: hidden;
        .ms {
          float: left;
          margin-right: 30px;
          display: flex;
          align-items: center;
          .ms-t {
            font-size: 14px;
            color: #666666;
          }
        }
      }
    }
    .other-message {
      .ot-ms {
        font-size: 14px;
        margin-top: 10px;
        margin-bottom: 10px;
        .ot-ms-t {
          color: #666666;
          margin-bottom: 15px;
        }
        .ot-ms-c {
          color: #333333;
        }
        .ms-f {
          position: relative;
          .ms-f-e {
            width: 200px;
          }
          .ms-f-s {
            color: #999999;
            font-size: 12px;
            position: absolute;
            top: 5px;
            left: 115px;
          }
        }
      }
    }
    .more-message {
      position: relative;
      .right-abs {
        position: absolute;
        right: 10px;
        top: 0px;
      }
    }
  }
  .arrowTransform {
    transition: 0.2s;
    transform-origin: center;
    transform: rotateZ(180deg);
  }
  .arrowTransformReturn {
    transition: 0.2s;
    transform-origin: center;
    transform: rotateZ(0deg);
  }
}
</style>
<style lang="scss">
.project-create {
  .create-content {
    // .el-step__description {
    //   padding-right: 0;
    // }
    // .el-radio-group .el-radio {
    //   margin-bottom: 15px;
    // }
    // .el-step__title.is-finish {
    //   color: #999999;
    // }
    // .el-step__icon {
    //   background: #0071f5;
    // }
    // .el-step__head.is-finish {
    //   color: #ffffff;
    //   border-color: rgba(0, 112, 244, 0.1);
    // }
    .el-step.is-vertical .el-step__line {
      // background: #cdcdcd;
    }
    .project-message {
      // .el-input__inner {
      //   height: 32px;
      // }
    }
  }
  .box {
    @-webkit-keyframes antSlideUpIn {
      0% {
        transform: scaleY(0.8);
        transform-origin: 0% 0%;
        opacity: 0;
      }
      100% {
        transform: scaleY(1);
        transform-origin: 0% 0%;
        opacity: 1;
      }
    }
    @keyframes antSlideUpIn {
      0% {
        transform: scaleY(0.8);
        transform-origin: 0% 0%;
        opacity: 0;
      }
      100% {
        transform: scaleY(1);
        transform-origin: 0% 0%;
        opacity: 1;
      }
    }
    @-webkit-keyframes antSlideUpOut {
      0% {
        transform: scaleY(1);
        transform-origin: 0% 0%;
        opacity: 1;
      }
      100% {
        transform: scaleY(0.8);
        transform-origin: 0% 0%;
        opacity: 0;
      }
    }
    @keyframes antSlideUpOut {
      0% {
        transform: scaleY(1);
        transform-origin: 0% 0%;
        opacity: 1;
      }
      100% {
        transform: scaleY(0.8);
        transform-origin: 0% 0%;
        opacity: 0;
      }
    }
    @-webkit-keyframes antSlideDownIn {
      0% {
        transform: scaleY(0.8);
        transform-origin: 100% 100%;
        opacity: 0;
      }
      100% {
        transform: scaleY(1);
        transform-origin: 100% 100%;
        opacity: 1;
      }
    }
    @keyframes antSlideDownIn {
      0% {
        transform: scaleY(0.8);
        transform-origin: 100% 100%;
        opacity: 0;
      }
      100% {
        transform: scaleY(1);
        transform-origin: 100% 100%;
        opacity: 1;
      }
    }
    @-webkit-keyframes antSlideDownOut {
      0% {
        transform: scaleY(1);
        transform-origin: 100% 100%;
        opacity: 1;
      }
      100% {
        transform: scaleY(0.8);
        transform-origin: 100% 100%;
        opacity: 0;
      }
    }
    @keyframes antSlideDownOut {
      0% {
        transform: scaleY(1);
        transform-origin: 100% 100%;
        opacity: 1;
      }
      100% {
        transform: scaleY(0.8);
        transform-origin: 100% 100%;
        opacity: 0;
      }
    }

    //@at-root
    .ant-calendar-picker-container {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      font-variant: tabular-nums;
      line-height: 1.5;
      list-style: none;
      font-feature-settings: 'tnum';
      position: absolute;
      z-index: 1050;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
        'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica,
        Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol';
    }
    .ant-calendar-picker-container.slide-up-enter.slide-up-enter-active.ant-calendar-picker-container-placement-topLeft,
    .ant-calendar-picker-container.slide-up-enter.slide-up-enter-active.ant-calendar-picker-container-placement-topRight,
    .ant-calendar-picker-container.slide-up-appear.slide-up-appear-active.ant-calendar-picker-container-placement-topLeft,
    .ant-calendar-picker-container.slide-up-appear.slide-up-appear-active.ant-calendar-picker-container-placement-topRight {
      -webkit-animation-name: antSlideDownIn;
      animation-name: antSlideDownIn;
    }
    .ant-calendar-picker-container.slide-up-enter.slide-up-enter-active.ant-calendar-picker-container-placement-bottomLeft,
    .ant-calendar-picker-container.slide-up-enter.slide-up-enter-active.ant-calendar-picker-container-placement-bottomRight,
    .ant-calendar-picker-container.slide-up-appear.slide-up-appear-active.ant-calendar-picker-container-placement-bottomLeft,
    .ant-calendar-picker-container.slide-up-appear.slide-up-appear-active.ant-calendar-picker-container-placement-bottomRight {
      -webkit-animation-name: antSlideUpIn;
      animation-name: antSlideUpIn;
    }
    .ant-calendar-picker-container.slide-up-leave.slide-up-leave-active.ant-calendar-picker-container-placement-topLeft,
    .ant-calendar-picker-container.slide-up-leave.slide-up-leave-active.ant-calendar-picker-container-placement-topRight {
      -webkit-animation-name: antSlideDownOut;
      animation-name: antSlideDownOut;
    }
    .ant-calendar-picker-container.slide-up-leave.slide-up-leave-active.ant-calendar-picker-container-placement-bottomLeft,
    .ant-calendar-picker-container.slide-up-leave.slide-up-leave-active.ant-calendar-picker-container-placement-bottomRight {
      -webkit-animation-name: antSlideUpOut;
      animation-name: antSlideUpOut;
    }
  }
}
</style>
