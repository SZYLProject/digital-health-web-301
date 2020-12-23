<!-- 项目列表 -->
<template>
  <div class="main-content">
    <el-row :gutter="4">
      <!-- 左边 -->
      <el-col :span="16">
        <!-- 头部名称说明 -->
        <el-row class="white-bg">
          <el-col :span="8">
            <div class="lft-left tit">字段名称</div>
          </el-col>
          <el-col :span="8">
            <div class="lft-center tit">抽取规则</div>
          </el-col>
          <el-col :span="8">
            <div class="lft-right tit">字段重命名</div>
          </el-col>
        </el-row>

        <!-- 左侧拖拽显示区 -->
        <el-row>
          <el-col :span="24">
            <div class="left-container">
              <el-scrollbar style="height:100%" ref="scroll">
                <div class="">
                  <!--  -->
                  <div class="draggable-con">
                      <!-- 只有一组数据 -->
                      <el-row>
                        <el-col :span="8">
                          <!-- 字段名称 -->
                          <div class="" >
                            <!-- 编辑状态 -->
                            <div class="one-data-if one-data" v-if="oneDataKeys">
                                <h3>
                                  个人史 <i class="el-icon-caret-right"></i> 个人史
                                </h3>
                                <div class="white-bg one-data-if-model" >
                                  <p>
                                    <el-checkbox v-model="checkedOne">{{oneDataObj.oneDataReName}}</el-checkbox>
                                  </p>
                                  <p style="text-align:right;">
                                    <el-button type="text"
                                               :disabled="!checkedOne"
                                               @click.native="oneDataDel"
                                               >删除</el-button>
                                    <el-button type="primary"
                                               size="mini"
                                               style="padding: 2px 5px;"
                                               @click.native="oneDataSure"
                                               >确认</el-button>
                                  </p>
                                </div>
                            </div>

                            <!-- 不可编辑状态 -->
                            <div class="one-data-else one-data" v-else>
                                <h3>
                                  个人史 <i class="el-icon-caret-right"></i> 个人史
                                </h3>
                                <div class="white-bg one-data-else-model">
                                    <p>
                                      <i class="el-icon-date"></i>
                                    </p>
                                    <p class="msg">{{oneDataObj.oneDataReName}}</p>
                                    <p @click="oneDataEdite">
                                      <i class="el-icon-edit pointer" style="color: #247bcc;"></i>
                                    </p>
                                </div>
                            </div>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <!-- 抽取规则 -->
                          <div class="get-rule" style="padding-top:45px;">
                              <el-divider content-position="left">
                                <p v-if="oneDataKeys">
                                  <el-input
                                      v-model="oneDataObj.oneDataMap"
                                      style="width:100px;"
                                      border="false"
                                      suffix-icon="el-icon-edit"
                                      size="mini"
                                      placeholder="编辑"></el-input>
                                </p>
                                <p v-else style="padding: 2px 10px;">
                                  {{oneDataObj.oneDataMap}}
                                  <i class="el-icon-edit" style="color: #247bcc;"></i>
                                </p>
                              </el-divider>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <!-- 重命名 -->
                          <div style="padding-top:45px;padding-right:30px; position:relative;">
                              <ul >
                                <li style="margin:5px 0px;"
                                  >
                                  <el-input
                                    placeholder="重命名"
                                    :disabled="!oneDataKeys"
                                    v-model="oneDataObj.oneDataReName"
                                    clearable>
                                  </el-input>
                                </li>
                              </ul>
                              <p style="position:absolute;right:32px;top:15px" v-if="!oneDataKeys">
                                <!-- 结果预览 -->
                                <el-button type="text"
                                            icon="el-icon-view"
                                            @click.native="isShowDiag"
                                            >结果预览</el-button>
                              </p>
                          </div>
                        </el-col>
                      </el-row>

                      <!-- 有多组数据 -->
                      <el-row>
                        <el-col :span="8">
                          <!-- 编辑状态 -->
                          <div class="many-data-if many-data white-bg" v-if="manyDataKeys" >
                              <h3>
                                {{ manyDataTitle }}
                              </h3>
                              <el-scrollbar style="height:100%" ref="scroll">
                                <div class="" style="height:300px;">
                                  <el-checkbox-group
                                    v-model="checkedName">
                                    <p
                                      v-for="(item, index) in manyDataLists"
                                      :key="index"
                                      style="padding:5px 0px"
                                      >
                                      <el-checkbox
                                        :label="item.id"
                                      >
                                        {{item.name}}
                                      </el-checkbox>
                                    </p>
                                  </el-checkbox-group>
                                </div>
                              </el-scrollbar>
                              <div style="display:flex;">
                                <span style="flex:1;">
                                  <el-button type="text">删除</el-button>
                                  <el-button type="text">清空</el-button>
                                  <el-button type="text"
                                             @click.native="changeAll"
                                             >全选</el-button>
                                  <el-button type="text"
                                             @click.native="checkedName = []"
                                             >取消全选</el-button>
                                </span>
                                <span style="padding-top:12px;">
                                  <el-button type="primary"
                                             size="mini"
                                             @click.native="manyDataSure"
                                             style="padding:2px 5px;"
                                             >确认</el-button></span>
                              </div>
                          </div>
                          <!-- 不可编辑状态 -->
                          <div class="many-data-else many-data white-bg" v-else>
                              <h3 style="">
                                {{manyDataTitle}}
                                <p @click="manyDataEdite">
                                      <i class="el-icon-edit pointer" style="color: #247bcc;"></i>
                                </p>
                              </h3>
                              <el-scrollbar style="height:100%" ref="scroll">
                                <ul class="" style="height:335px;">
                                  <li
                                    v-for="(item, index) in manyDataLists"
                                    :key="index"
                                    style="padding:5px 0px"
                                    >
                                    <i class="el-icon-menu" style="margin-right:5px;"></i>
                                    {{item.name}}
                                  </li>
                                </ul>
                              </el-scrollbar>
                          </div>
                          <!--  -->
                        </el-col>
                        <el-col :span="8">
                          <div class="get-rule" style="padding-top:30px;">
                              <el-divider content-position="left">
                                <p v-if="manyDataKeys">
                                  <el-input
                                      v-model="manyDataObj.manyDataMap"
                                      style="width:100px;"
                                      border="false"
                                      suffix-icon="el-icon-edit"
                                      size="mini"
                                      placeholder="编辑"></el-input>
                                </p>
                                <p v-else style="padding: 2px 10px;">
                                  {{manyDataObj.manyDataMap}}
                                  <i class="el-icon-edit" style="color: #247bcc;"></i>
                                </p>
                              </el-divider>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="white-bg" style="padding:20px 5px 10px 15px;">
                            <el-scrollbar style="height:100%" ref="scroll">
                              <div style="height:360px;padding-right:10px;">
                                <ul>
                                  <li v-for="(item, index) in manyDataLists"
                                      :key="index"
                                      style="margin:5px 0px;"
                                    >
                                    <el-input
                                      placeholder="请输入内容"
                                      :disabled="!manyDataKeys"
                                      v-model="item.name"
                                      clearable>
                                    </el-input>
                                  </li>
                                </ul>
                              </div>
                            </el-scrollbar>
                          </div>
                        </el-col>
                      </el-row>
                  </div>
                  <!-- 拖拽框 -->
                  <div class="drage-k pointer"
                       @mouseenter="enterEvent(100)"
                       @mousemove="enterEvent(100)">
                    <p style="text-align:center;font-size:50px;color:#247bcc;margin-top:40px;">
                      <i class="el-icon-copy-document"></i>
                    </p>
                    <p style="text-align:center;font-size:20px;">请从右侧将指标拖入此处</p>
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </el-col>
        </el-row>
      </el-col>

      <!-- 右边 -->
      <el-col :span="8">
        <PageTwoRightLists
            @firstMenus="firstMenus"
            @dragToParent="dragToParent"
            @endDragg="endDragg"
            @secondMenusTit="secondMenusTit" />
      </el-col>
    </el-row>

    <!-- 结果预览弹窗 -->
    <el-dialog
      title="结果预览"
      :visible.sync="resultWatchDialog"
      width="40%"
      :before-close="handleClose">
      <div style="height:400px;">
        这里显示结果预览的结果
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resultWatchDialog = false">取 消</el-button>
        <el-button type="primary" @click="resultWatchDialog = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 自定义弹窗 -->
    <el-dialog
      title="添加/编辑自定义字段"
      :visible.sync="userDefinedPop"
      width="35%"
      :before-close="usrDefiClose">
      <div :style="{height:userDefinedForm.type === '4' ? '400px' : '300px'}">
        <el-scrollbar style="height:100%" ref="scroll">
            <div class="" style="height:400px;">
              <el-form ref="form" :model="userDefinedForm" label-width="100px">
                <el-form-item label="字段名称" style="width:60%;">
                  <el-input v-model="userDefinedForm.name"></el-input>
                </el-form-item>
                <el-form-item label="值类型">
                  <el-radio-group v-model="userDefinedForm.type">
                    <p style="padding-top:15px;">
                      <el-radio label="1">文本</el-radio>
                    </p>
                    <p style="padding-top:15px;">
                      <el-radio label="2">数值</el-radio>
                    </p>
                    <p style="padding-top:15px;">
                      <el-radio label="3">日期</el-radio>
                    </p>
                    <p style="padding-top:15px;">
                      <el-radio label="4">枚举</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
                <el-form-item v-if="userDefinedForm.type === '4'">
                  <div class="enumeration-warps">
                      <el-radio-group v-model="userDefinedForm.selectBtn" size="small">
                        <el-radio-button label="1">单选</el-radio-button>
                        <el-radio-button label="2">多选</el-radio-button>
                      </el-radio-group>
                      <ul>
                        <li v-for="(item, index) in userDefinedForm.inputLists"
                            style="margin-top:10px;"
                            :key="index"
                          >
                          <el-row>
                            <el-col :span="20">
                              <el-input v-model="item.name" placeholder="请输入内容"></el-input>
                            </el-col>
                            <el-col :span="4" style="text-align:center;">
                              <i class="el-icon-circle-plus-outline pointer dialog-user-defined"
                                 style="font-size:18px;"
                                 @click="addInput(index)"
                                 v-if="index === userDefinedForm.inputLists.length - 1 && index !== 0"></i>
                              <i class="el-icon-close pointer dialog-user-defined"
                                 style="margin-left: 10px;font-size:18px;"
                                 @click="deleteInput(index)"
                                 v-if="index > 1 || userDefinedForm.inputLists.length > 2"
                                 ></i>
                            </el-col>
                          </el-row>

                        </li>
                      </ul>
                  </div>
                </el-form-item>
                <el-form-item label="备注" style="width:90%;">
                  <el-input type="textarea" v-model="userDefinedForm.desc"></el-input>
                </el-form-item>
              </el-form>
            </div>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="usrDefiSure">确 定</el-button>
        <el-button @click="usrDefiClose">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 添加字段提示弹窗 -->
    <el-dialog
      title="添加字段"
      :visible.sync="addIdentifier"
      width="30%"
      :before-close="handleClose">
      <div class="dialog-add-identifier">
        <p>
          您向项目中添加了【患者人口学信息/性别】中的性别科研项目，现支持添加单字段，并可统计字段的最大、最小、平均值，但与组内其他字段不再有关联性
        </p>
        <p>
          之前项目默认的添加全组字段功能，建议您拖动字段组卡片或标题进行操作
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col :span="9">
            <div style="padding-top:7px;text-align:left;">
              <el-checkbox v-model="singleWord">默认添加单字段</el-checkbox>
            </div>
          </el-col>
          <el-col :span="15">
            <el-button type="primary" size="small" @click="addIdentifier = false">添加单字段</el-button>
            <el-button size="small" @click="addIdentifier = false">添加多组</el-button>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import PageTwoRightLists from './PageTwoRightLists'
// import { } from '@/api/caseSearch'

export default {
  name: 'ResearchComPageTwo',
  data () {
    return {
      draggeWhichK: null,
      draggeWhichDatas: null,
      // 一条数据
      checkedOne: true, // 默认选准
      oneDataKeys: false, // 只有一条数据时默认是不可编辑的
      oneDataObj: {
        oneDataMap: '取首次',
        oneDataReName: '入院时间'
      },
      resultWatchDialog: false,
      //
      manyDataKeys: false,
      manyDataObj: {
        manyDataMap: '直接映射',
        manyDataReName: '入院时间'
      },
      //
      manyDataTitle: '患者人口学信息 ',
      manyDataLists: [],
      checkedName: [],
      userDefinedForm: {
        name: '',
        type: '1',
        selectBtn: '1',
        inputLists: [{
          id: 0,
          name: ''
        }, {
          id: 1,
          name: ''
        }],
        desc: ''
      },
      userDefinedPop: false, // 自定义弹窗
      addIdentifier: false, // 其他模块拖拽提示弹窗
      singleWord: true
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  watch: {},
  components: { PageTwoRightLists },
  created () { },
  mounted () {},
  destroyed () {},
  methods: {
    ...mapMutations(['']),

    enterEvent (num) {
      this.draggeWhichK = num
    },
    // 子组件传到父组件的数据
    firstMenus (data) {
      this.checkedName = data.map(item => item.id)
      this.manyDataLists = data
    },
    secondMenusTit (data) {},
    /**
     * 一条数据涉及函数
     */
    oneDataSure () { // 确认
      this.oneDataKeys = false
      console.log(this.oneDataObj)
    },
    oneDataEdite () { // 编辑
      this.oneDataKeys = true
    },
    oneDataDel () { // 删除
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleClose (done) { //
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    isShowDiag () {
      this.resultWatchDialog = true
    },
    /**
     * 多条数据涉及函数
     */

    changeAll () {
      this.checkedName = this.manyDataLists.map(item => item.id)
    },
    manyDataSure () {
      this.manyDataKeys = false
    },
    manyDataEdite () {
      this.manyDataKeys = true
    },
    addInput (index) {
      this.userDefinedForm.inputLists.push({
        id: index + 1,
        name: ''
      })
    },
    deleteInput (index) {
      this.userDefinedForm.inputLists.splice(index, 1)
    },
    usrDefiClose () {
      this.userDefinedPop = false
    },
    usrDefiSure () {
      console.log(this.userDefinedForm)
      this.userDefinedPop = false
    },
    // 子组件拖拽向父组件传值
    dragToParent (item) {
      this.draggeWhichDatas = item
    },
    // 拖拽结束函数调用
    endDragg (arg) {
      setTimeout(() => {
        if (arg === 4) {
          this.userDefined()
        } else {
          this.otherDragge()
        }
      }, 500)
    },
    userDefined () { // 自定义模块拖拽
      if ((this.draggeWhichDatas?.ids) && this.draggeWhichK === 100) {
        this.userDefinedPop = true
        this.draggeWhichK = null
        switch (this.draggeWhichDatas.ids) {
          case 'text':
            this.userDefinedForm.type = '1'
            break
          case 'num':
            this.userDefinedForm.type = '2'
            break
          case 'dates':
            this.userDefinedForm.type = '3'
            break
          case 'enumerate':
            this.userDefinedForm.type = '4'
            break
        }
        this.draggeWhichDatas = null
      }
    },
    otherDragge () { // 其他模块
      // console.log(22)
      if (this.draggeWhichDatas && this.draggeWhichK === 100) {
        this.draggeWhichK = null
        this.draggeWhichDatas = null
        this.addIdentifier = true
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.white-bg{
  background: #ffffff;
}
.main-content{
  .tit{
    padding: 12px 20px;
  }
  .left-container{
    padding-top: 2px;
    height: calc(100vh - 110px);
    .drage-k{
      height: 190px;
      background: #e5edf7;
      border: solid 2px #ccd8ea;
      width: 100%;
      border-radius: 5px;
    }
    .draggable-con{
      .one-data>h3{
        padding:12px;
      }
      .one-data-if{
        .one-data-if-model{
          padding: 15px 20px 0px 20px;
        }
      }
      .one-data-else{
        .one-data-else-model{
          padding: 15px 20px;
          display: flex;
          align-items: center;
          .msg{
            flex: 1;
            padding-left: 10px;
          }
        }
      }

      .many-data{
        padding: 20px;
        h3{
          margin-left: -8px;
        }
      }
      .many-data-else{
        h3{
          position: relative;
          p{
            position: absolute;
            right: 0px;
            top: 0px;
          }
        }
      }
    }
  }

  .enumeration-warps{
    padding: 20px;
    background: #f3f3f3;
  }

  .dialog-user-defined{
    &:hover{
      color: #247bcc;
    }
  }
  .dialog-add-identifier{
    p{
      margin-bottom: 10px;
    }
  }
}
</style>
<style lang="scss">
.main-content {
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .draggable-con{
    .el-scrollbar__wrap {
      margin-bottom: 10px!important;
    }
    .el-row{
      margin-bottom: 20px;
    }
    .get-rule{
      .el-input__inner{
        border: none;
      }
      .el-divider__text{
        padding: 0;
      }
    }
  }
}

</style>
