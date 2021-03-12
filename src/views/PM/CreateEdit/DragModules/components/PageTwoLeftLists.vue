<!-- 项目列表 -->
<template>
  <div class="left-container">
    <div class="patients">
      <h3 class="title">
        {{ dataSourceValue.sourceName || "选择病种" }} <span>（全部指标）</span>
        <el-input v-model="threeDic"
                  style="width:190px;margin-left:10px;"
                  size="mini"
                  clearable
                  prefix-icon="el-icon-search"
                  @input="conditionFilter"
                  placeholder="请输入三级搜索字段"></el-input>
      </h3>
    </div>
    <div class="dic-lists">
      <div class="one-dictionary">
        <el-scrollbar style="height: 100%"
                      ref="scroll">
          <el-tree
            node-key="id"
            accordion
            :data="distionaryDatas"
            :props="defaultProps"
            :highlight-current="true"
            :current-node-key="1"
            :default-expanded-keys="[0]"
            :indent="3"
            @node-click="handleNodeClick">
          </el-tree>
        </el-scrollbar>
      </div>
      <div class="two-dictionary"
           v-loading="loading"
           element-loading-text="加载中..."
           element-loading-spinner="el-icon-loading"
      >
        <el-scrollbar style="height: 100%"
                      ref="scroll">
          <div class="two-lists lists">
            <h2 class="tit-name">
              {{ secondName }} <span class="num">{{ num }}个字段</span>
            </h2>
            <draggable animation="300"
                       v-model="distionaChildDatas"
                       :options="{
                group: { name: 'itxst', pull: 'clone', put: false },
                sort: false,
              }"
                       :clone="cloneElement">
              <transition-group type="transition">
                <el-button plain
                           size="mini"
                           v-for="item in distionaChildDatas"
                           :key="item.id"
                           :disabled="item.disable"
                           :id="item.id">{{ item.dataItemName }}</el-button>
              </transition-group>
            </draggable>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { oneDictionaryDatas, datasDictionariesTitle, getThreeDictionaries } from '@/api/projectsMangement'
import draggable from 'vuedraggable'
const PinyinMatch = require('pinyin-match') //
// import dataing from '../../dic'
export default {
  name: 'PageTwoRightLists',
  data () {
    return {
      loading: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      distionaryDatas: [],
      distionaChildDatas: [], // 三级字典数据
      distionaChild: [], // 三级字典渲染
      secondName: '',
      num: 0,
      parentLabel: null, // 一级字典的标题
      fieldsStatus: null, // 一级字典的 直接映射 or others
      threeDic: '' // 三级字典快速搜索
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo', 'dataSourceValue', 'd'])
  },
  watch: {},
  components: { draggable },
  created () {
    // this.getOneDictionaryDatas() // " 一二三 " 三级接口的调用
    this.getOneTwoDicData() // 获取一二级字典接口
  },
  mounted () {
    this.$nextTick(() => {

    })
  },
  destroyed () { },
  methods: {
    ...mapMutations(['projectsMangement/storedragdata']),
    // 获取一二级字典
    async getOneTwoDicData () {
      const data = {
        dataSourceId: this.dataSourceValue?.id ?? 0
      }
      await datasDictionariesTitle(data)
        .then(res => {
          const obj = res.obj
          if (obj) {
            this.distionaryDatas = obj
            this.distionaryDatas.map(item => {
              item.label = item.dataItemName
              item.children = item.dataItemEntityList
              item.children.map(a => {
                a.label = a.dataItemName
                a.children = []
              })
            })
          }
        })
        .catch(() => {})

      await this.initThree(this.distionaryDatas[0].children[0].id, this.distionaryDatas[0].children[0].dataItemName)
    },
    // 初始化三级字典数据
    initThree (id, name) {
      this.loading = true
      const datas = { id }
      getThreeDictionaries(datas).then(res => {
        if (res?.obj) {
          this.distionaChildDatas = res.obj
          this.distionaChild = res.obj
          console.log(this.distionaChild)
          this.secondName = name
          this.num = this.distionaChildDatas?.length ?? 0
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 根据输入值过滤分类列表
    conditionFilter () {
      // const newV = this.distionaChildDatas
      // const newVal = newV.map(item => {
      //   const newItem = item.dataItemName.search(this.threeDic) !== -1 ||
      //                   PinyinMatch.match(item.dataItemName, this.threeDic)
      //   if (newItem) return item
      // }).filter(item => item)
      // this.distionaChild = newVal
      // this.num = newVal?.length ?? 0
      const newV = this.distionaChild
      const newVal = newV.map(item => {
        const newItem = item.dataItemName.search(this.threeDic) !== -1 ||
        PinyinMatch.match(item.dataItemName, this.threeDic)

        if (newItem) return item
      }).filter(item => item)
      this.distionaChildDatas = newVal
      this.num = newVal?.length ?? 0
    },

    // 点击二级字典
    handleNodeClick (data) {
      if (data.parentCode !== 0) {
        this.distionaChildDatas = [] // 清空三级字典
        this.distionaChild = []
        this.threeDic = ''
        this.loading = true
        const datas = {
          id: data.id
        }
        getThreeDictionaries(datas).then(res => {
          if (res?.obj) {
            this.distionaChildDatas = res.obj
            this.distionaChild = res.obj
            this.secondName = data.dataItemName
            this.num = this.distionaChildDatas?.length ?? 0
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },

    // 点击二级字典(保留)
    handleNodeClick1 (data) {
      if (data.parentCode !== 0) {
        this.secondName = data.dataItemName
        this.num = data.dataItemEntityList?.length
        this.distionaChildDatas = []
        this.distionaChildDatas = data.dataItemEntityList
        this.distionaChildDatas.map((item) => {
          item.parentId = data.id // 二级字典id
          item.parentName = this.parentLabel + '~' + data.dataItemName // 一级字典名称 + 二级字典名称
          item.disable = false
          item.rayingStatus = this.fieldsStatus // 判断直接映射还是其他  1 位为直接映射 2 为其它
        })
        console.log(this.distionaChildDatas)
      } else {
        this.parentLabel = data.dataItemName // 存储一级字典名称
        this.fieldsStatus = data.fieldsStatus
      }
    },

    // 接口获取字典数据(保留)
    getOneDictionaryDatas () {
      const data = {
        userId: this.userInfo?.pkId,
        dataItemName: '',
        isCommon: '',
        except: ''
      }
      oneDictionaryDatas(data)
        .then((res) => {
          if (res) {
            // console.log(res.obj?.data)
            this.distionaryDatas = res.obj?.data
            this.distionaryDatas.map(item => {
              item.label = item.dataItemName
              item.children = item.dataItemEntityList
              item.children.map(a => {
                a.label = a.dataItemName
                a.children = []
              })
            })
            this.distionaChildDatas = this.distionaryDatas[0]?.children[0].dataItemEntityList
            this.secondName = this.distionaryDatas[0]?.children[0]?.dataItemName
            this.num = this.distionaryDatas[0]?.children[0]?.dataItemEntityList?.length
            this.parentLabel = this.distionaryDatas[0]?.dataItemName
            this.distionaChildDatas.map((item) => {
              item.parentId = this.distionaryDatas[0]?.children[0]?.id
              item.parentName = this.distionaryDatas[0].dataItemName + '~' + this.distionaryDatas[0]?.children[0]?.dataItemName
              item.disable = false
              item.rayingStatus = this.distionaryDatas[0].fieldsStatus // 判断直接映射还是其他  1 位为直接映射 2 为其它
            })
          }
        })
        .catch((er) => { })
    },

    secondDictory (item) {
      // console.log(item)
    },
    cloneElement (clone) {
      // const p = clone.parentName.split('~')
      // clone.parentName1 = p[0]
      // clone.parentName2 = p[1]
      // console.log(clone)
      return clone
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.is-active {
  color: #0070f4 !important;
}
.left-container {
  background: #ffffff;
  .patients {
    border-bottom: solid 1px #f2f4f5;
    padding: 0 25px;
    .title {
      color: #333333;
      font-size: 16px;
      position: relative;
      padding: 14px 16px;
      span {
        color: #999999;
        font-size: 12px;
      }
    }
    .title::before {
      content: "";
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 100%; /**控制形状**/
      background-color: #0070f4; /**控制图标颜色**/
      margin-right: 10px; /**图标与文字距离**/
      position: absolute;
      left: 0px;
      top: 21px;
    }
  }
  .dic-lists {
    display: flex;
    .itxst {
      .item-lists {
        overflow: hidden; /* 溢出时不显示溢出的内容 */
        text-overflow: ellipsis; /* 发生溢出时使用省略号代替 */
        display: -webkit-box; /* chrome浏览器的私有属性。显示为box。 */
        -webkit-box-orient: vertical; /* 垂直排列元素 */
        -webkit-line-clamp: 1; /* 显示多少行 */
        margin: 10px 0px;
        font-size: 14px;
        color: #333333;
        list-style-type: none;
        cursor: pointer;
        &:hover {
          color: #0070f4;
        }
      }
    }
    .lists {
      height: calc(100vh - 280px);
      width: 100%;
    }
    .one-dictionary {
      width: 160px;
      padding: 5px 5px 0px 25px ;
      border-right: solid 1px #f2f4f5;
    }
    .two-dictionary {
      width: 240px;
      padding: 10px 25px;
      .two-lists {
        .tit-name {
          color: #333333;
          font-size: 14px;
          margin-bottom: 10px;
          .num {
            color: #999999;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.left-container {
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .one-dictionary{
    .el-tree-node__children{
      .el-tree-node__label{
        max-width: 100px;
        overflow: hidden; /* 溢出时不显示溢出的内容 */
        text-overflow: ellipsis; /* 发生溢出时使用省略号代替 */
        -webkit-box-orient: vertical; /* 垂直排列元素 */
        -webkit-line-clamp: 1; /* 显示多少行 */
      }
    }
  }
  .two-dictionary {
    .two-lists {
      .el-button {
        border: 1px dashed #dcdfe6;
        margin-left: 0px;
        margin-right: 10px;
        margin-bottom: 10px;
        max-width: 140px;
        overflow: hidden !important; /* 溢出时不显示溢出的内容 */
        text-overflow: ellipsis !important; /* 发生溢出时使用省略号代替 */
        -webkit-box-orient: vertical !important; /* 垂直排列元素 */
        -webkit-line-clamp: 1 !important; /* 显示多少行 */
      }
    }
  }

}
</style>
