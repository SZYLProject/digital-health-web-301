<!-- 条件树 -->
<template>
  <div class="condition-tree-search">
    <div class="input-con"
         v-if="list.length===0">
      <el-row>
        <el-col :span="22">
          <el-input placeholder="请输入条件树名称"
                    v-model.trim="treeName"
                    size="medium">
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary"
                     class="btn"
                     size="medium"
                     @click.native="addName">
            确认
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <div class="title-container inlineBlock"
           :style="{'margin-top':list.length>1?'80px':'25px'}">
        <i class="plus-button el-icon-circle-plus-outline pointer"
           :style="{'color': theme}"
           @click="addTree()"
           size="small"></i>
        <div class="line">
          <el-button v-show="!isEditTreeName"
                     class="ellipsis"
                     type="primary"
                     style="max-width:150px;"
                     plain
                     @dblclick.native="changeInput">{{treeName}}</el-button>
          <el-input v-show="isEditTreeName"
                    v-model="treeName"
                    @blur="editTreeName"
                    class="edit-tree"
                    ref="nameInput"
                    style="width:150px;'"
                    placeholder="请输入条件树名称"></el-input>

        </div>

      </div>
      <div class="tree-container inlineBlock">
        <div class="block"
             :class="{'line-3':list.length>1&&index!==0&&index!==list.length-1}"
             v-for="(item,index) in list"
             :key="index">
          <div class="add-button">
            <el-button type="primary"
                       icon="el-icon-plus"
                       @click="addTree(index)"
                       size="small">新增分类</el-button>

          </div>
          <div class="remove-button pointer"
               @click="deleteTree(index)">
            <i class="el-icon-remove"
               style="color:red"
               size="small"></i>
          </div>
          <!-- 条件 -->
          <div class="tree-form-block"
               :class="getLine(index,list.length)"
               style="width:500px">
            请选择字段：
            <el-select placeholder="请选择模块"
                       size="small"
                       v-model="select">
              <el-option label="并且"
                         :value="'AND'"></el-option>
              <el-option label="或者"
                         :value="'OR'"></el-option>
              <el-option label="排除"
                         :value="'NOT'"></el-option>
            </el-select>
            <el-select placeholder="请选择数据项"
                       size="small"
                       v-model="select">
              <el-option label="并且"
                         :value="'AND'"></el-option>
              <el-option label="或者"
                         :value="'OR'"></el-option>
              <el-option label="排除"
                         :value="'NOT'"></el-option>
            </el-select>
          </div>
          <template v-if="item.children.length>0">
            <!-- 二级分类 -->
            <div class="second-block">
              <div class="child-block"
                   :class="{'line-chlid':childIndex!==item.children.length-1}"
                   v-for="(child,childIndex) in item.children"
                   :key="childIndex"
                   @mouseenter="enter(childIndex)"
                   @mouseleave="leave()">
                <div class="add-button"
                     v-show="show===childIndex">
                  <el-button type="primary"
                             icon="el-icon-plus"
                             size="small"
                             @click="addTree(index,childIndex)">新增子类</el-button>
                </div>
                <div class="remove-button pointer"
                     style="left:50px"
                     v-show="show===childIndex"
                     @click="deleteTree(index,childIndex)">
                  <i class="el-icon-remove"
                     style="color:red"
                     size="small"></i>
                </div>
                <div class="tree-form-block"
                     :class="childIndex===item.children.length-1?'line-chlid-2':'line-chlid-1'">
                  <div style="margin:5px 0">
                    计算结果：
                    <el-select placeholder="请选择模块"
                               size="small"
                               v-model="select">
                      <el-option label="并且"
                                 :value="'AND'"></el-option>
                      <el-option label="或者"
                                 :value="'OR'"></el-option>
                      <el-option label="排除"
                                 :value="'NOT'"></el-option>
                    </el-select>
                    <el-select placeholder="请选择数据项"
                               size="small"
                               v-model="select">
                      <el-option label="并且"
                                 :value="'AND'"></el-option>
                      <el-option label="或者"
                                 :value="'OR'"></el-option>
                      <el-option label="排除"
                                 :value="'NOT'"></el-option>
                    </el-select>
                  </div>
                  <div style="margin:5px 0">
                    执行方式：
                    <el-select placeholder="请选择模块"
                               size="small"
                               v-model="select">
                      <el-option label="并且"
                                 :value="'AND'"></el-option>
                      <el-option label="或者"
                                 :value="'OR'"></el-option>
                      <el-option label="排除"
                                 :value="'NOT'"></el-option>
                    </el-select>
                    <el-select placeholder="请选择数据项"
                               size="small"
                               v-model="select">
                      <el-option label="并且"
                                 :value="'AND'"></el-option>
                      <el-option label="或者"
                                 :value="'OR'"></el-option>
                      <el-option label="排除"
                                 :value="'NOT'"></el-option>
                    </el-select>
                    <el-select placeholder="请选择数据项"
                               size="small"
                               v-model="select">
                      <el-option label="并且"
                                 :value="'AND'"></el-option>
                      <el-option label="或者"
                                 :value="'OR'"></el-option>
                      <el-option label="排除"
                                 :value="'NOT'"></el-option>
                    </el-select>
                  </div>
                </div>
                <template v-if="child.children.length>0">
                  <!-- 三级分类 -->
                  <div class="third-block"
                       v-for="(third,thirdIndex) in child.children"
                       :key="thirdIndex"
                       @mouseenter="enter(thirdIndex,'third')"
                       @mouseleave="leave()">
                    <div class="remove-button pointer"
                         style="left:30px"
                         v-show="show==='third'+thirdIndex"
                         @click="deleteTree(index,childIndex,thirdIndex)">
                      <i class="el-icon-remove"
                         style="color:red"
                         size="small"></i>
                    </div>
                    <div class="tree-form-block line-chlid-3">
                      <div style="margin:5px 0">
                        计算结果：
                        <el-select placeholder="请选择模块"
                                   size="small"
                                   v-model="select">
                          <el-option label="并且"
                                     :value="'AND'"></el-option>
                          <el-option label="或者"
                                     :value="'OR'"></el-option>
                          <el-option label="排除"
                                     :value="'NOT'"></el-option>
                        </el-select>
                        <el-select placeholder="请选择数据项"
                                   size="small"
                                   v-model="select">
                          <el-option label="并且"
                                     :value="'AND'"></el-option>
                          <el-option label="或者"
                                     :value="'OR'"></el-option>
                          <el-option label="排除"
                                     :value="'NOT'"></el-option>
                        </el-select>
                      </div>
                      <div style="margin:5px 0">
                        执行方式：
                        <el-select placeholder="请选择模块"
                                   size="small"
                                   v-model="select">
                          <el-option label="并且"
                                     :value="'AND'"></el-option>
                          <el-option label="或者"
                                     :value="'OR'"></el-option>
                          <el-option label="排除"
                                     :value="'NOT'"></el-option>
                        </el-select>
                        <el-select placeholder="请选择数据项"
                                   size="small"
                                   v-model="select">
                          <el-option label="并且"
                                     :value="'AND'"></el-option>
                          <el-option label="或者"
                                     :value="'OR'"></el-option>
                          <el-option label="排除"
                                     :value="'NOT'"></el-option>
                        </el-select>
                        <el-select placeholder="请选择数据项"
                                   size="small"
                                   v-model="select">
                          <el-option label="并且"
                                     :value="'AND'"></el-option>
                          <el-option label="或者"
                                     :value="'OR'"></el-option>
                          <el-option label="排除"
                                     :value="'NOT'"></el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'conditionTree',
  components: {
  },
  data () {
    return {
      isEditTreeName: false,
      treeName: '',
      select: '',
      list: [],
      show: ''
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme']),
    formatData: function () {
      return this.preDealData(this.pd)
    }
  },
  watch: {

  },

  created () { },
  mounted () { },
  destroyed () {

  },
  methods: {
    ...mapMutations(['']),
    deleteTree (index, cIndex, tIndex) {
      if ((!isNaN(tIndex) || tIndex)) {
        this.list[index].children[cIndex].children.splice(tIndex, 1)
      } else if (!isNaN(cIndex) || cIndex) {
        this.list[index].children.splice(cIndex, 1)
      } else {
        this.list.splice(index, 1)
      }

      if (this.list.length === 0) {
        this.treeName = ''
      }
    },
    addTree (index, cIndex) {
      const obj = {
        item: '',
        children: []
      }
      if ((!isNaN(cIndex) || cIndex)) {
        this.list[index].children[cIndex].children.push(obj)
      } else if (!isNaN(index) || index) {
        this.list[index].children.push(obj)
      } else {
        this.list.push(obj)
      }
    },
    addName () {
      if (this.treeName) {
        const obj = {
          item: '',
          children: []
        }
        this.list.push(obj)
      } else {
        this.$message({
          message: '条件树名称不能为空!',
          type: 'warning'
        })
      }
    },
    editTreeName () {
      if (this.treeName) {
        this.isEditTreeName = false
      } else {
        this.$message({
          message: '条件树名称不能为空!',
          type: 'warning'
        })
      }
    },
    // 鼠标划入划出效果
    enter (index, val) {
      if (val) {
        this.show = val + index
      } else {
        this.show = index
      }
    },
    leave () {
      this.show = ''
    },
    // 双击按钮修改条件树名称
    changeInput () {
      this.isEditTreeName = true
      this.$nextTick(function () {
        this.$refs.nameInput.focus()
      })
    },
    getLine (index, len) {
      if (len > 1 && index === 0) {
        return 'line-1'
      } else if (len > 1 && index === len - 1) {
        return 'line-2'
      } else {
        return 'line'
      }
    },
    preDealData (list) {
      list.forEach(x => {
        if (!x.expand) this.$set(x, 'expand', false)
        if (x.children && x.children.length > 0) this.preDealData(x.children)
      })
      return list
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.condition-tree-search {
  min-width: 1000px;
  text-align: center;
  .input-con {
    width: 500px;
    margin: 20px auto;
  }
  .el-select {
    width: 180px;
    margin-right: 10px;
  }
  .title-container {
    vertical-align: top;
    position: relative;
    margin-right: 50px;
    .line::after {
      -webkit-animation: 500ms change;
      animation: 500ms change;
      position: absolute;
      content: "";
      top: 19px;
      right: -50px;
      width: 50px;
      height: 100%;
      border-style: solid none none none;
      border-width: 2px;
      border-color: #247BCC;
    }
    .plus-button {
      position: absolute;
      right: -25px;
      top: -5px;
      font-size: 25px;
    }
  }
  .tree-container {
    position: relative;
    vertical-align: middle;
    .add-button {
      position: absolute;
      top: -12px;
      left: 70px;
    }
    .remove-button {
      position: absolute;
      top: 22px;
      left: 25px;
      font-size: 20px;
      z-index: 9;
    }
    .block {
      position: relative;
      display: block;
      padding: 20px 0 20px;
    }
    .second-block {
      position: relative;
      margin-left: 50px;
      margin-top: 25px;
      .line-chlid::before {
        position: absolute;
        content: "";
        top: -26px;
        left: 20px;
        width: 50px;
        height: 100%;
        border-style: none none none solid;
        border-width: 2px;
        border-color: #247BCC;
      }
    }
    .child-block {
      position: relative;
      display: block;
      margin-top: 20px;
      padding-left: 20px;
      padding-top: 20px;
      .line-chlid-1::before {
        -webkit-animation: 500ms change;
        animation: 500ms change;
        position: absolute;
        content: "";
        top: 60px;
        left: 20px;
        width: 50px;
        height: 100%;
        border-style: solid none none solid;
        border-width: 2px;
        border-color: #247BCC;
      }
      .line-chlid-2::before {
        -webkit-animation: 500ms change;
        animation: 500ms change;
        position: absolute;
        content: "";
        top: -26px;
        left: 20px;
        width: 50px;
        height: 100px;
        border-style: none none solid solid;
        border-radius: 0 0 0 5px;
        border-width: 2px;
        border-color: #247BCC;
      }
    }
    .third-block {
      position: relative;
      margin-top: 30px;
      .line-chlid-3::before {
        -webkit-animation: 500ms change;
        animation: 500ms change;
        position: absolute;
        content: "";
        top: -30px;
        left: 80px;
        width: 5px;
        height: 30px;
        border-style: none solid none none;
        border-radius: 0 0 0 5px;
        border-width: 2px;
        border-color: #247BCC;
      }
    }
    .tree-form-block {
      -webkit-animation: 800ms fade;
      animation: 800ms fade;
      text-align: left;
      margin-left: 50px !important;
      background: #f5f7fa;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 8px 12px;
      // width:500px;
    }

    .line::before {
      -webkit-animation: 500ms change;
      animation: 500ms change;
      position: absolute;
      content: "";
      top: 44px;
      left: 0;
      width: 50px;
      height: 100%;
      border-style: solid none none none;
      border-width: 2px;
      border-color: #247BCC;
    }
    .line-1::before {
      -webkit-animation: 500ms change;
      animation: 500ms change;
      position: absolute;
      content: "";
      top: 44px;
      left: 0;
      width: 50px;
      height: 100%;
      border-style: solid none none solid;
      border-radius: 5px 0 0 0;
      border-width: 2px;
      border-color: #247BCC;
    }
    .line-2::before {
      -webkit-animation: 500ms change;
      animation: 500ms change;
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 50px;
      height: 50px;
      border-style: none none solid solid;
      border-radius: 0 0 0 5px;
      border-width: 2px;
      border-color: #247BCC;
    }
    .line-3::before {
      -webkit-animation: 500ms change;
      animation: 500m s change;
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 50px;
      height: 100%;
      border-style: none none none solid;
      border-width: 2px;
      border-color: #247BCC;
    }
  }
}
@-webkit-keyframes change {
  from {
    opacity: 0;
    height: 0;
    width: 0;
  }
  to {
    opacity: 1;
    height: var(height);
    width: 50px;
  }
}
@keyframes change {
  from {
    opacity: 0;
    height: 0;
    width: 0;
  }
  to {
    opacity: 1;
    height: var(height);
    width: var(width);
  }
}
@-webkit-keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
<style lang="scss">
.condition-tree-search {
  .input-con {
    .el-input__inner {
      border-radius: 4px 0px 0px 4px;
    }
    .el-button {
      border-radius: 0px 4px 4px 0px;
    }
  }
}
</style>
