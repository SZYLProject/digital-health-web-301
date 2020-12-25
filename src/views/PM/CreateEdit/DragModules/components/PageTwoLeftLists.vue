<!-- 项目列表 -->
<template>
  <div class="left-container">
    <div class="patients">
      <h3 class="title">
        {{ dataSourceValue.sourceName || "选择病种" }} <span>（全部指标）</span>
      </h3>
    </div>
    <div class="dic-lists">
      <div class="one-dictionary">
        <el-scrollbar style="height: 100%"
                      ref="scroll">
          <div class="one-lists lists itxst">
            <div class="item item-lists"
                 v-for="(item, index) in distionaryDatas"
                 :class="{ 'is-active': isActive === index }"
                 :key="index"
                 :id="item.id"
                 @click="firstDictory(item, index)">
              <i class="el-icon-arrow-right"></i>
              <span>
                {{ item.dataItemName }}
              </span>
            </div>
            <!-- <draggable
              v-model="distionaryDatas"
              group="site"
              animation="300"
              :options="{
                group: { name: 'itxst', pull: false, put: false },
                sort: false,
              }"
              @end="endDragg"
            >
              <transition-group>
                <div
                  class="item item-lists"
                  v-for="(item,index) in distionaryDatas"
                  :class="{ 'is-active': isActive === index }"
                  :key="index"
                  :id="item.id"
                  :types="item.types"
                  @click="firstDictory(item,index)"
                  :dataItemName="item.dataItemName"
                >
                  <i class="el-icon-arrow-right"></i>
                  <span>
                    {{ item.dataItemName }}
                  </span>
                </div>
              </transition-group>
            </draggable> -->
          </div>
        </el-scrollbar>
      </div>
      <div class="two-dictionary">
        <el-scrollbar style="height: 100%"
                      ref="scroll">
          <div class="two-lists lists">
            <h2 class="tit-name">
              {{ secondName }} <span>{{ num }}个字段</span>
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
                           v-for="(item, index) in distionaChildDatas"
                           :key="index"
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
import { oneDictionaryDatas } from '@/api/projectsMangement'
import draggable from 'vuedraggable'
import dataing from '../../dic'
export default {
  name: 'PageTwoRightLists',
  data () {
    return {
      distionaryDatas: [],
      distionaChildDatas: [],
      secondName: '',
      num: 0,
      isActive: 0
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo', 'dataSourceValue', 'd'])
  },
  watch: {},
  components: { draggable },
  created () {
    // this.getOneDictionaryDatas()
    this.init()
  },
  mounted () {
    this.$nextTick(() => {
      // this.init()
    })
  },
  destroyed () { },
  methods: {
    ...mapMutations(['projectsMangement/storedragdata']),
    init () {
      this.distionaryDatas = dataing.obj.data
      this.distionaChildDatas = this.distionaryDatas[0]?.dataItemEntityList
      this.distionaChildDatas.map((item) => {
        item.parentId = this.distionaryDatas[0].id
        item.parentName = this.distionaryDatas[0].dataItemName
        item.disable = false
        return item
      })
      this.secondName = this.distionaryDatas[0]?.dataItemName
      this.num = this.distionaryDatas[0]?.dataItemEntityList?.length
    },
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
            this.distionaryDatas = res.obj?.data
            this.distionaryDatas.map((item, index) => {
              item.types = 'type' + index
              item.dataItemEntityList.map((itm) => {
                itm.types = 'type' + index
              })
              return item
            })
            this.distionaChildDatas = this.distionaryDatas[0]?.dataItemEntityList
            this.distionaChildDatas.map((item) => {
              item.parentId = this.distionaryDatas[0].id
              item.parentName = this.distionaryDatas[0].dataItemName
              return item
            })

            this.secondName = this.distionaryDatas[0]?.dataItemName
            this.num = this.distionaryDatas[0]?.dataItemEntityList?.length
          }
        })
        .catch((er) => { })
    },
    firstDictory (item, index) {
      this.secondName = item.dataItemName
      this.num = item.dataItemEntityList?.length
      this.distionaChildDatas = []
      this.distionaChildDatas = item.dataItemEntityList
      this.distionaChildDatas.map((ite) => {
        ite.parentId = item.id
        ite.parentName = item.dataItemName
        ite.disable = false
        return ite
      })
      this.isActive = index
    },
    secondDictory (item) {
      // console.log(item)
    },
    cloneElement (clone) {
      // this.distionaChildDatas.map(item => {
      //   if (clone.id === item.id) {
      //     item.disable = true
      //   }
      // })
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
      padding: 0px 25px;
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
          span {
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
