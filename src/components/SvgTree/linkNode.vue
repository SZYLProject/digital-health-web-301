<template>
  <div class="block"
       :style="{left:node.x+'px',top:node.y+'px'}">
    <div class="root"
         v-if="node.id==='root'">
      <el-button type="primary"
                 icon="el-icon-plus"
                 :disabled="disable"
                 @click="addTree(node.id)"
                 size="medium"
                 plain></el-button>
      <el-button v-if="node.children&&node.children.length>1&&condition.opt==='AND'"
                 type="primary"
                 :disabled="disable"
                 @click="change(node.id,'OR')"
                 size="small">并</el-button>
      <el-button type="success"
                 :disabled="disable"
                 @click="change(node.id,'AND')"
                 v-if="node.children&&node.children.length>1&&condition.opt==='OR'"
                 size="small">或</el-button>
    </div>

    <div v-else-if="!node.data.edit"
         class="con-text">
      <el-popover placement="top"
                  trigger="hover"
                  style="min-width:100px!important">
        <!-- 编辑 删除 -->
        <div>
          <el-button type="warning"
                     icon="el-icon-edit"
                     size="mini"
                     circle
                     @click="editTree(node.id)"></el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     circle
                     size="mini"
                     @click="deleteTree(node.id)"></el-button>
        </div>
        <!-- 标签信息 -->
        <!-- <div> -->
        <el-tooltip placement="bottom"
                    slot="reference"
                    style="max-width:100px"
                    class="ellipsis pointer"
                    effect="light"
                    popper-class="atooltip">
          <div slot="content"><span>{{node.data.name}}</span>
            <span style="margin:0 5px">{{node.data.itselfOpt}}</span>
            <span>{{stringToArr(node.data.value, 'toString')}}</span>
          </div>
          <div>
            <span>{{node.data.name}}</span>
            <span style="margin:0 5px">{{node.data.itselfOpt}}</span>
            <span>{{stringToArr(node.data.value, 'toString')}}</span>
          </div>
        </el-tooltip>
        <!-- </div> -->
      </el-popover>
      <div class="andOr"
           v-if="node.children&&node.children.length>1">
        <el-button type="primary"
                   :disabled="disable"
                   @click="change(node.id,'OR')"
                   v-if="condition.opt==='AND'"
                   size="small">并</el-button>
        <el-button type="success"
                   :disabled="disable"
                   @click="change(node.id,'AND')"
                   v-if="condition.opt==='OR'"
                   size="small">或</el-button>
      </div>
      <div class="addIcon">

        <i class="el-icon-circle-plus pointer"
           :style="{pointerEvents:disable?'none':'auto'}"
           :disabled="disable"
           @click="addTree(node.id)"></i>
      </div>

    </div>
    <div v-else
         class="tree-form-block">
      <el-row :gutter="10">
        <!-- 搜索主题 -->
        <el-col style="width:150px">
          <el-input placeholder="搜索项"
                    v-model="condition.name"
                    size="small"
                    style="width: 130px"
                    clearable
                    :readonly="true">
            <i slot="suffix"
               class="el-icon-plus el-input__icon pointer"
               @click="handleIconClick(node)">
            </i>
          </el-input>
        </el-col>

        <!-- 搜索条件 -->
        <el-col :span="4">
          <el-select placeholder="关系"
                     size="small"
                     :disabled="!condition.name"
                     v-model="condition.itselfOpt"
                     @change="$forceUpdate()">
            <el-option v-for="option in getOption(condition.dataOptionType)"
                       :key="option"
                       :label="option"
                       :value="option"></el-option>

          </el-select>
        </el-col>

        <!-- 值域范围 -->
        <el-col :span="6">
          <!--根据type显示不同的框-->

          <!--radio-->
          <el-radio-group :disabled="!condition.name"
                          v-model="condition.value"
                          size="small"
                          v-if="getFormType(condition.dataOptionType) === 'radio'">
            <el-radio label="'是'">是</el-radio>
            <el-radio label="'否'">否</el-radio>
          </el-radio-group>

          <!--select-->
          <el-select :disabled="!condition.name"
                     v-model="condition.value"
                     placeholder="请选择"
                     size="small"
                     v-else-if="getFormType(condition.dataOptionType) === 'select'">
            <el-option v-for="(listItem,index) in condition.dataOption"
                       :key="index"
                       :label="listItem"
                       :value="listItem">
            </el-option>
          </el-select>

          <!--date-->
          <!-- 非区间 -->
          <el-date-picker :disabled="!condition.name"
                          v-model="condition.value"
                          type="datetime"
                          placeholder="选择日期时间"
                          size="small"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          style="width:100%"
                          v-else-if="getFormType(condition.dataOptionType) === 'date' &&
                            (condition.itselfOpt!=='区间外'&&condition.itselfOpt !== '区间内')">
          </el-date-picker>
          <!-- 区间内 -->
          <el-row v-else-if="getFormType(condition.dataOptionType) === 'date' &&
                            (condition.itselfOpt==='区间外' || condition.itselfOpt === '区间内')"
                  style="margin-bottom:0">
            <el-col :span="11">
              <el-date-picker :disabled="!condition.name"
                              v-model="condition.date1"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="选择日期时间"
                              size="small"
                              style="width:100%">
              </el-date-picker>
            </el-col>
            <el-col class="line"
                    :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker :disabled="!condition.name"
                              v-model="condition.date2"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="选择日期时间"
                              size="small"
                              style="width:100%">
              </el-date-picker>
            </el-col>
          </el-row>
          <!--input-->
          <!-- 区间内 -->
          <el-row v-else-if="condition.dataOptionType===1 &&
                            (condition.itselfOpt==='区间外' || condition.itselfOpt === '区间内')"
                  style="margin-bottom:0">
            <el-col :span="11">
              <el-input size="small"
                        :disabled="!condition.name"
                        placeholder="最小值"
                        v-model="condition.date1">
              </el-input>
            </el-col>
            <el-col class="line"
                    :span="2">-</el-col>
            <el-col :span="11">
              <el-input size="small"
                        :disabled="!condition.name"
                        placeholder="最大值"
                        v-model="condition.date2">
              </el-input>
            </el-col>
          </el-row>
          <!-- 非区间 -->
          <el-input size="small"
                    :disabled="!condition.name"
                    placeholder="对比值"
                    v-model="condition.value"
                    v-else>
          </el-input>
          <!--根据type显示不同的框-->
        </el-col>

        <!-- 操作按钮 -->
        <el-col :span="6">
          <el-button type="primary"
                     size="small"
                     @click="confirm(node.data)">确认</el-button>
          <el-button size="small"
                     @click="cancel(node.data)">取消</el-button>
        </el-col>
      </el-row>

    </div>
    <!-- 弹窗 -->
    <el-dialog width="50%"
               :visible.sync="searchTitVisi"
               append-to-body>
      <DataDictionaryPop @dialogDatas="dialogDatas"
                         :openDialog="searchTitVisi"
                         :popArguments='popArguments' />
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, createNamespacedHelpers } from 'vuex'

import { getDataOption } from '@/api/caseSearch'
import { getOption, getFormType } from '@/utils/searchRelation'
import DataDictionaryPop from '@/components/DataDictionaryPop' // 引入弹窗
import { stringToArr, deepClone } from '@/utils/index'
const { mapMutations, mapActions } = createNamespacedHelpers('conditionTree')
export default {
  name: 'linkNode',
  components: { DataDictionaryPop },
  props: {
    node: {
      type: Object
    },
    nodeWidth: {
      type: Number
    },
    nodeHeight: {
      type: Number
    }
  },
  computed: {
    ...mapGetters(['flattenData']),
    disable () {
      return this.flattenData.some(item => (item.edit === true))
    }
    // rootTransform () {
    //   return `transform:translate(${this.node.x}, ${this.node.y})`
    // }
  },
  data () {
    return {
      condition: {
        opt: 'AND', // 并或关系
        indexName: '', // 后台需要的tableName
        name: '', // 前台回显的dataItemName
        key: '', // 后台需要的fieldName
        fieldId: '', // 排除历史搜索id
        dataOptionType: 0, // 确定条件关系类型
        itselfOpt: '', // 条件关系
        value: '', // 一个输入框
        date1: '', // 两个输入框时回显
        date2: '', // 两个输入框时回显
        dataOption: [] // 下拉选项
      },
      popArguments: [],
      popArg: [],
      show: false,
      searchTitVisi: false, // 是否显示搜索主题弹窗,
      edit: false
    }
  },
  methods: {
    ...mapMutations(['syncFlattenData']),
    ...mapActions(['updateFlattenData']),
    getOption, // 根据类型展示不同选项
    getFormType, // 根据类型展示不同组件
    stringToArr, // 格式转换
    editTree (id) {
      this.edit = true
      this.flattenData.forEach(item => {
        if (item.id === id) {
          item.value = stringToArr(item.value, 'toString')
          item.edit = true
          this.condition = item
        }
      })
      console.log(this.flattenData)
      this.syncFlattenData(this.flattenData)
    },
    deleteTree (id) {
      this.checkCID(id)
      console.log(this.flattenData)
      // this.syncFlattenData(this.flattenData)
      this.updateFlattenData(this.flattenData)
    },
    // 循子Id
    checkCID (id) {
      this.flattenData.splice(this.flattenData.findIndex(item => item.id === id), 1)
      this.flattenData.forEach((item, index) => {
        if (item.parentId === id) {
          this.checkCID(item.id)
        }
      })
    },
    addTree (pid) {
      var timestamp = new Date().getTime()
      const obj = {
        id: String(timestamp),
        parentId: pid,
        value: '',
        edit: true,
        num: 0
      }
      this.flattenData.push(obj)
      this.syncFlattenData(this.flattenData)
    },
    confirm (data) {
      // console.log(data)
      if (!this.edit) {
        Object.assign(data, this.condition)
      } else {
        this.edit = false
      }
      data.edit = false
      const summitData = deepClone(this.flattenData)
      summitData.map((item, index) => {
        if (getFormType(item.dataOptionType) === 'date' &&
          (item.type === '区间外' || item.type === '区间内')) {
          item.value = [item.date1, item.date2]
        } else {
          item.value = stringToArr(item.value, 'toArray')
        }
        if (item.dataOptionType === 1 &&
          (item.type === '区间外' || item.type === '区间内')) {
          item.value = [item.date1, item.date2]
        }
      })
      this.updateFlattenData(summitData)
      // this.syncFlattenData(this.flattenData)
    },
    cancel (data) {
      if (!this.edit) {
        this.flattenData.splice(this.flattenData.findIndex(item => item.id === data.id), 1)
      } else {
        this.edit = false
        data.edit = false
      }
      this.syncFlattenData(this.flattenData)
      // console.log(this.flattenData)
    },
    // 修改并或
    change (id, val) {
      this.condition.opt = val
      this.flattenData.forEach(item => {
        if (item.id === id) {
          item.opt = val
        }
      })
      const summitData = deepClone(this.flattenData)
      summitData.map((item, index) => {
        if (getFormType(item.dataOptionType) === 'date' &&
          (item.type === '区间外' || item.type === '区间内')) {
          item.value = [item.date1, item.date2]
        } else {
          item.value = stringToArr(item.value, 'toArray')
        }
        if (item.dataOptionType === 1 &&
          (item.type === '区间外' || item.type === '区间内')) {
          item.value = [item.date1, item.date2]
        }
      })
      this.updateFlattenData(summitData)
      // this.syncFlattenData(this.flattenData)
    },
    // 点击+打开字典弹出层
    handleIconClick (node) {
      this.popArguments = []
      this.popArg = []
      if (node.parent.id !== 'root') {
        this.checkPID(node.parent.id)
      }
      this.popArguments = stringToArr(this.popArg, 'toString')
      this.searchTitVisi = true
    },
    // 循父Id
    checkPID (id) {
      this.flattenData.forEach(item => {
        if (item.id === id) {
          this.popArg.push(item.fieldId)
          if (item.parentId !== 'root') {
            this.checkPID(item.parentId)
          }
        }
      })
    },
    // 获取搜索主题
    dialogDatas (val) {
      if (val) {
        this.$set(val, 'value', val.dataItemName)
        this.condition.indexName = val.tableName
        this.condition.fieldId = val.id
        this.condition.name = val.dataItemName
        this.condition.key = val.fieldName
        this.condition.dataOptionType = val.dataOptionType
        // if 类型是4 需要接口获取option
        if (val.dataOptionType === 4) {
          getDataOption(val.dataItemCode).then(res => {
            const list = []
            res.obj.map(v => {
              list.push(v.dataOptionValue)
            })
            this.condition.dataOption = list
          })
        }
        this.searchTitVisi = false
      }
    }
  }

}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.block {
  position: absolute;
}
.root {
  &:before {
    content: "";
    position: absolute;
    top: 14px;
    left: -20px;
    width: 20px;
    height: 100%;
    border-style: solid none none none;
    border-width: 2px;
    border-color: #e9f2fa;
  }
}
.tree-form-block {
  position: absolute;
  text-align: left;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 8px 12px;
  width: 600px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 9999;
}
.num {
  position: absolute;
  left: -50px;
  top: 0;
}
.con-text {
  border: 1px solid #ddd;
  background: #ffffff;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 8px 5px;
  color: #333333;

  .andOr {
    position: absolute;
    top: 5px;
    right: -55px;
    font-size: 18px;
    margin-left: 75px;
    color: #409eff;
    // &:before {
    //   content: "";
    //   position: absolute;
    //   top: 14px;
    //   right: 44px;
    //   width: 36px;
    //   height: 100%;
    //   border-style: solid none none none;
    //   border-width: 2px;
    //   border-color: #e9f2fa;
    // }
  }
  .addIcon {
    position: absolute;
    top: 33px;
    right: 0;
    font-size: 18px;
    // margin-left: 35px;
    color: #409eff;
    // &:before {
    //   content: "";
    //   position: absolute;
    //   top: -19px;
    //   right: -10px;
    //   width:20px;
    //   height: 100%;
    //   border-style: none none none solid;
    //   border-width: 2px;
    //   border-color: #e9f2fa;
    // }
  }
}
</style>
<style lang="scss">
.el-popover {
  min-width: auto;
}
</style>
