<!-- 项目列表 -->
<template>
  <div class="drag-container">
    <div class="itxsting">
      <p class="info">请将左侧指标拖入此处</p>
      <draggable
        :list="valD"
        animation="300"
        :options="{
          group: { name: 'itxst', pull: false, put: true },
          sort: false,
        }"
        class="drag-mdl"
        @change="toChange"
      >
        <transition-group> </transition-group>
      </draggable>
    </div>

    <div class="content-collapse">
      <el-collapse
        value="1"
        @change="handleChange"
        style="margin-bottom: 20px"
        v-for="(item, index) in firstdatas"
        :key="index"
        v-model="activeName"
      >
        <el-collapse-item :name="item.parentId"
                @mouseenter.native="mouseEnter(index)"
                @mouseleave.native="mouseLeave">
          <template slot="title">
            <div class="title-collapse">
              {{ item.parentName }}
              <el-button
                type="text"
                size="mini"
                @click.native.stop="delAll(index)"
                v-if="del === index"
                icon="el-icon-delete"
                style="margin-left: 0px"
                circle
              ></el-button>
            </div>
          </template>
          <div class="content-lists" style="padding: 10px 20px">
            <el-row :gutter="0">
              <el-col
                :span="12"
                class="el-cols"
                v-for="(itm, idx) in item.child"
                :key="idx"
              >
                <div class="grid-content">
                  <el-row>
                    <el-col :span="9">
                      <div class="grid-content-children grid-left">
                        <p class="name-map">{{ itm.dataItemName }}</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content-child grid-center">
                        <el-divider content-position="center">
                          <div>取首次</div>
                        </el-divider>
                      </div>
                    </el-col>
                    <el-col :span="9">
                      <div class="grid-content-children grid-right">
                        <p class="name-map" v-if="itm.edits">{{ itm.types }}</p>
                        <el-input
                          v-else
                          class="input-map"
                          v-model="itm.types"
                          ref="saveTagInput"
                          @blur="changeFn(index, idx)"
                          size="mini"
                        />
                      </div>
                    </el-col>
                  </el-row>
                  <div class="edit-wrap">
                    <el-button
                      type="text"
                      @click.native="editButton(index, idx)"
                      size="mini"
                      icon="el-icon-edit"
                      circle
                    ></el-button>
                    <el-button
                      type="text"
                      size="mini"
                      @click.native="delButton(index, idx)"
                      icon="el-icon-delete"
                      style="margin-left: 0px"
                      circle
                    ></el-button>
                  </div>
                </div>
              </el-col>
              <p class="center-line"></p>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
// import { oneDictionaryDatas } from '@/api/projectsMangement'
import draggable from 'vuedraggable'
export default {
  name: 'PageTwoRightDrag',
  data () {
    return {
      firstdatas: [],
      valD: [],
      del: 888,
      activeName: []
    }
  },
  props: {
    tabIndex: {
      type: Number,
      dafault: 0
    }
  },
  computed: {
    ...mapGetters(['theme', 'userInfo', 'dataSourceValue', 'dragData'])
  },
  watch: {
    firstdatas: {
      handler (newName, oldName) {
        // console.log(newName)
      },
      immediate: true,
      deep: true
    },
    tabIndex (newVal, oldVal) {
      // console.log(newVal)
      this.firstdatas = []
      if (this.dragData[newVal]) {
        this.firstdatas = this.dragData[newVal]
      }
    }
  },
  components: { draggable },
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    ...mapMutations(['projectsMangement/storedragdata']),
    handleChange (val) {
      // console.log(val.index)
    },
    changeFn (index, idx) {
      this.firstdatas[index].child[idx].edits = true
      this['projectsMangement/storedragdata']({
        data: this.firstdatas,
        index: this.tabIndex
      })
    },
    editButton (index, idx) {
      this.firstdatas[index].child[idx].edits = false
      this['projectsMangement/storedragdata']({
        data: this.firstdatas,
        index: this.tabIndex
      })
    },
    delButton (index, idx) {
      this.firstdatas[index].child.splice(idx, 1)
      if (this.firstdatas[index].child.length === 0) {
        this.firstdatas.splice(index, 1)
      }
      this['projectsMangement/storedragdata']({
        data: this.firstdatas,
        index: this.tabIndex
      })
    },
    delAll (index) {
      this.firstdatas.splice(index, 1)
      this['projectsMangement/storedragdata']({
        data: this.firstdatas,
        index: this.tabIndex
      })
    },
    mouseEnter (val) {
      this.del = val
    },
    mouseLeave () {
      this.del = 888
    },
    toChange (val) {
      if (val?.added?.element) {
        const v = val?.added?.element
        var fn = this.firstdatas.findIndex(
          (item) => item.parentId === v.parentId
        )
        if (fn !== -1) {
          this.firstdatas[fn].child.push({
            id: v.id,
            dataItemName: v.dataItemName,
            types: v.dataItemName, // 映射修改的值
            edits: true
          })
        } else {
          const obj = {
            parentId: v.parentId,
            parentName: v.parentName,
            child: []
          }
          obj.child.push({
            id: v.id,
            dataItemName: v.dataItemName,
            types: v.dataItemName, // 映射修改的值
            edits: true
          })
          this.firstdatas.push(obj)
          this.activeName.push(obj.parentId)
        }
        this['projectsMangement/storedragdata']({
          data: this.firstdatas,
          index: this.tabIndex
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.drag-container {
  width: 100%;
  .itxsting {
    position: relative;
    height: 50px;
    margin: 10px 100px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #999999;
    border: 1px dashed #e6e6e6;
    .info {
      position: absolute;
    }
    .drag-mdl {
      width: 100%;
      height: 100%;
      span {
        display: inline-block !important;
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
  .content-collapse {
    padding: 20px;
    .title-collapse {
      color: #0070f4;
      font-size: 14px;
    }
    .content-lists {
      position: relative;
      .el-cols {
        padding-right: 60px;
        &:nth-child(even) {
          .grid-left {
            margin-left: 20px;
          }
        }
      }
      .center-line {
        width: 1px;
        height: 100%;
        border-left: 1px dashed #e6e6e6;
        position: absolute;
        top: 0;
        left: 50%;
      }
      .grid-content {
        position: relative;
        .edit-wrap {
          position: absolute;
          right: -60px;
          top: 6px;
        }
        .grid-content-children {
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #333333;
          font-size: 14px;
          background: rgba(0, 112, 244, 0.05);
        }
        .grid-left {
          padding: 0 10px;
        }
        .grid-right {
          padding: 0 10px;
        }
        .name-map {
          overflow: hidden; /* 溢出时不显示溢出的内容 */
          text-overflow: ellipsis; /* 发生溢出时使用省略号代替 */
          display: -webkit-box; /* chrome浏览器的私有属性。显示为box。 */
          -webkit-box-orient: vertical; /* 垂直排列元素 */
          -webkit-line-clamp: 1; /* 显示多少行 */
        }
      }
    }
  }
}
</style>
<style lang="scss">
.drag-container {
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .el-collapse {
    border: solid 1px #e6e6e6;
  }
  .el-collapse-item__content {
    padding: 0;
  }
  .el-collapse-item__header {
    background: rgba(0, 112, 244, 0.1);
    height: 24px;
    font-weight: 700;
    padding-left: 10px;
    color: #2b2b2b;
    .el-collapse-item__arrow {
      color: #0070f4;
    }
  }

  .grid-content {
    .grid-center {
      .el-divider__text {
        padding: 0;
      }
    }
  }
}
</style>
