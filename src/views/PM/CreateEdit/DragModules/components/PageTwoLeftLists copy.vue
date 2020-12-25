<!-- 项目列表 -->
<template>
  <div class="right-container">
    <div class="rgt-lists" >
      <h3 class='white-bg' v-if="homePage" >
        南方医院胃癌 <span>全部指标</span>
        <i class="el-icon-search pointer" @click="homePage = false"></i>
      </h3>
      <div class="white-bg" v-else style="padding:4px 10px;margin-bottom: 2px;" >
        <el-row>
          <el-col :span="20">
            <el-input
                v-model="searchWords"
                size="medium"
                placeholder="请输入内容">
                <i
                  class="el-icon-search el-input__icon pointer"
                  slot="suffix"
                  @click="searchClick">
                </i>
            </el-input>
          </el-col>
          <el-col :span="4">
            <p style="text-align:center;">
              <el-button
                type="text"
                size="small"
                style="font-size:16px;"
                @click.native="homePage = true"
                >取消</el-button>
            </p>
          </el-col>
        </el-row>
      </div>
      <div class="flex-lists">
        <el-row :gutter="4" v-if="homePage">
          <!-- 一级菜单 -->
          <el-col :span="9">
            <div class="white-bg">
              <el-scrollbar style="height:100%" ref="scroll">
                <div class="one-lists">
                  <draggable v-model="firstMenus"
                              animation="300"
                              @end="endDragg(1)"
                              :options="{group:{name: 'itxst1',pull:'clone'},sort: false}"
                              >
                    <transition-group tag="li">
                      <p v-for="(item, index) in firstMenus"
                          @click="oneMark(index, item)"
                          class="pointer oneDragg"
                          @mousedown="moving(item)"
                          :class="{'is-active':isActive === index}"
                          :key="index">
                          <i class="el-icon-arrow-right"></i>
                          {{item.name}}</p>
                    </transition-group>
                  </draggable>

                </div>
              </el-scrollbar>
            </div>

          </el-col>
          <!-- 二级菜单 -->
          <el-col :span="15">
            <div class="white-bg">
              <el-scrollbar style="height:100%" ref="scroll">
                <div class="two-lists">
                  <h3>
                    {{secondMenusTit}} <span>{{secondMenusNum}}个字段</span>
                  </h3>
                  <draggable v-model="firstMenus"
                              animation="300"
                              @end="endDragg(2)"
                              :options="{group:{name: 'itxst2',pull:'clone'},sort: false}"
                              >
                    <transition-group tag="li">
                      <el-button plain
                                  size="mini"
                                  class="twoDragg"
                                  @mousedown.native="moving(item)"
                                  v-for="(item, index) in secondMenus"
                                  :key="index">{{item.name}}</el-button>
                    </transition-group>
                  </draggable>

                </div>
              </el-scrollbar>
            </div>
          </el-col>
        </el-row>

        <!-- 搜索列表 -->
        <el-row :gutter="4" v-else>
          <div class="white-bg">
            <el-scrollbar style="height:100%;padding-bottom:20px;" ref="scroll">
              <div class="search-lists">
                <div class="search-wraps"
                     v-for="(item, index) in searchMenu"
                     :key="index"
                    >
                    <h3>
                      {{item.title}} <span>共命中 {{item.num}} 个字段</span>
                    </h3>
                    <draggable v-model="item.children"
                                v-if="item.children.length > 0"
                                @end="endDragg(3)"
                                animation="300"
                                :options="{group:{name: 'itxst4',pull:'clone'},sort: false}"
                                >
                      <transition-group tag="li">
                        <el-button plain
                                    size="mini"
                                    class="twoDragg"
                                    @mousedown.native="moving(item)"
                                    v-for="(ite, idx) in item.children"
                                    :key="idx">{{ite.name}}</el-button>
                      </transition-group>
                    </draggable>
                    <el-button type="text" v-if="item.children.length >= 3">展示全部</el-button>
                </div>

              </div>
            </el-scrollbar>
          </div>
        </el-row>

        <!-- 自定义字段 -->
        <el-row>
          <el-col :span="24">
            <div class="user-defined">
              <h3 class='white-bg'>
                自定义字段
              </h3>
              <div class="user-defined-con white-bg">
                  <draggable v-model="selfDefined"
                              animation="300"
                              @end="endDragg(4)"
                              :options="{group:{name: 'itxst3',pull:'clone'},sort: false}"
                              >
                    <transition-group tag="li">
                      <el-button plain
                                 size="mini"
                                 class="threeDragg"
                                 @mousedown.native="moving(item)"
                                 v-for="(item, index) in selfDefined"
                                 :icon="item.icon"
                                 :key="index">{{item.name}}</el-button>
                    </transition-group>
                  </draggable>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

// 导入draggable组件
import draggable from 'vuedraggable'
import { mapGetters, mapMutations } from 'vuex'
// import { } from '@/api/caseSearch'

export default {
  name: 'PageTwoRightLists',
  data () {
    return {
      //
      isActive: 0,
      firstMenus: [
        { id: 1, name: '患者人口学信息' },
        { id: 2, name: '诊疗概览' },
        { id: 3, name: '就诊记录' },
        { id: 4, name: '主要现病史' },
        { id: 5, name: '既往史' },
        { id: 6, name: '个人史' },
        { id: 7, name: '家族史' },
        { id: 8, name: '月经婚育史' },
        { id: 9, name: '生命体征' },
        { id: 10, name: '体格检查' },
        { id: 11, name: '专科检查' },
        { id: 12, name: '辅助检查' },
        { id: 13, name: '诊断' },
        { id: 14, name: '手术治疗' },
        { id: 15, name: '既往史' },
        { id: 16, name: '个人史' },
        { id: 17, name: '家族史' },
        { id: 18, name: '月经婚育史' },
        { id: 19, name: '生命体征' },
        { id: 20, name: '体格检查' }
      ],
      secondMenus: [
        { id: 21, name: '本人姓名' },
        { id: 22, name: '性别' },
        { id: 23, name: '名族' },
        { id: 24, name: '文化程度' },
        { id: 25, name: '国籍' },
        { id: 26, name: '出生日期' },
        { id: 27, name: '婚姻状况' },
        { id: 28, name: '职业类别' },
        { id: 29, name: '本人电话' },
        { id: 30, name: 'ABO血型' },
        { id: 31, name: 'RH血型' },
        { id: 32, name: '住院总次数' },
        { id: 33, name: '是否死亡' },
        { id: 34, name: '死亡时间' },
        { id: 35, name: '籍贯省（区、市）' },
        { id: 36, name: '籍贯市' },
        { id: 37, name: '户口地址' },
        { id: 38, name: '出生地' },
        { id: 39, name: '现住址' },
        { id: 40, name: '现住址邮编' },
        { id: 41, name: '住院号' },
        { id: 42, name: '病案号码' },
        { id: 43, name: '门诊编号' },
        { id: 44, name: '健康卡号' },
        { id: 45, name: '身份证号' },
        { id: 46, name: '工作单位' },
        { id: 47, name: '户口地址' },
        { id: 48, name: '出生地' },
        { id: 49, name: '现住址' },
        { id: 50, name: '现住址邮编' },
        { id: 51, name: '住院号' },
        { id: 52, name: '病案号码' },
        { id: 53, name: '门诊编号' },
        { id: 54, name: '健康卡号' },
        { id: 55, name: '身份证号' },
        { id: 56, name: '工作单位' }
      ],
      searchMenu: [{
        title: '生化检查',
        num: 0,
        children: []
      }, {
        title: '其他检查',
        num: 3,
        children: [{
          name: '结晶计数（χTAL#）-尿液',
          id: 100
        }, {
          name: 'β-胶原降解产物（β_CTχ）-静脉血',
          id: 101
        }, {
          name: '凝血因子[χ活性-静脉血]',
          id: 102
        }]
      }, {
        title: '肿瘤标记物检查',
        num: 0,
        children: []
      }, {
        title: '其他检查2',
        num: 3,
        children: [{
          name: '结晶计数（χTAL#）-尿液',
          id: 103
        }, {
          name: 'β-胶原降解产物（β_CTχ）-静脉血',
          id: 104
        }, {
          name: '凝血因子[χ活性-静脉血]',
          id: 105
        }, {
          name: '微量白蛋白（mAlb）-24小时尿液',
          id: 106
        }, {
          name: '抗链球菌溶血素Q（ASQ）-静脉血',
          id: 107
        }, {
          name: '抗链球菌溶血素Q（ASQ）-静脉血-定性',
          id: 108
        }, {
          name: '脑脊液蛋白定性（Pandy试验）-脑脊液-定性',
          id: 109
        }, {
          name: '总蛋白（TP）腹腔积液',
          id: 110
        }, {
          name: '肝吸虫暖-粪便-定性',
          id: 111
        }]
      }, {
        title: '肿瘤标记物检查',
        num: 0,
        children: []
      }, {
        title: '肿瘤标记物检查',
        num: 0,
        children: []
      }, {
        title: '肿瘤标记物检查',
        num: 0,
        children: []
      }],
      selfDefined: [
        { id: 57, name: '文本', icon: 'el-icon-document', ids: 'text' },
        { id: 58, name: '数值', icon: 'el-icon-s-data', ids: 'num' },
        { id: 59, name: '日期', icon: 'el-icon-date', ids: 'dates' },
        { id: 60, name: '枚举', icon: 'el-icon-s-operation', ids: 'enumerate' }
      ],
      secondMenusTit: '患者人口学信息',
      secondMenusNum: 34,
      checkedName: [],
      homePage: true,
      searchWords: ''
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  watch: {},
  components: { draggable },
  created () { },
  mounted () {
    this.$emit('firstMenus', this.firstMenus)
    this.$emit('secondMenusTit', this.secondMenusTit)
  },
  destroyed () {},
  methods: {
    ...mapMutations(['']),
    // 右边往左边拖动时的事件
    moving (item) {
      // console.log(item)
      this.$emit('dragToParent', item)
    },
    endDragg (arg) {
      this.$emit('endDragg', arg)
    },

    oneMark (index, item) {
      this.isActive = index
      this.secondMenusTit = item.name
    },

    searchClick () {
      console.log(22222)
    }

  }
}

</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.white-bg{
  background: #ffffff;
}
.is-active{
  color: #0070f4;
}

.right-container{
  // margin-left: 2px;
  .rgt-lists > h3{
    padding:12px;
    position: relative;
    margin-bottom: 2px;
    span{
      font-size: 14px;
    }
    i{
      position: absolute;
      right: 20px;
      top: 14px;
      transition: all .5s ease 0s;
      &:hover{
        color: rgb(36, 123, 204);
        transform: scale(1.5, 1.5);
        -webkit-transform:scale(1.5, 1.5);
        -moz-transform:scale(1.5, 1.5);
        -o-transform:scale(1.5, 1.5);
      }
    }
  }

  .rgt-lists{
    .one-lists{
      height: 600px;
      width: 100%;
      li{
        list-style-type:none;
        padding-bottom: 20px;
      }
      p{
        padding: 10px 10px;
        &:hover{
          background: rgba(36, 123, 204, .2);
        }
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .two-lists{
      height: 600px;
      width: 100%;
      padding: 10px;
      h3{
          padding:12px 0px;
          span{
            font-size: 14px;
          }
      }
      li{
        list-style-type:none;
        padding-bottom: 20px;
      }
    }
    .search-lists{
      height: 600px;
      width: 100%;
      padding: 10px;
      h3{
        padding:12px 0px;
        span{
          font-size: 14px;
        }
      }
      li{
        list-style-type:none;
      }
      .search-wraps{
        border: solid 1px #e7e7e7;
        box-shadow: 1px 1px 1px 1px #ccc;
        padding: 0px 20px;
        border-radius: 5px;
        margin-bottom: 10px;
      }
    }
    .user-defined{
      margin-top: 2px;
      width: 100%;
      li{
        list-style-type:none;
        padding-bottom: 20px;
      }
      h3{
        padding:12px;
        margin-bottom: 2px;
      }
      .user-defined-con{
        padding: 10px;
        // height: calc(100vh - 750px);
        min-height: 190px;
      }
    }
  }

}

</style>
<style lang="scss">
.right-container {
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .rgt-lists{
    .two-lists,.user-defined,.search-lists{
      .el-button{
        margin-left: 0px;
        margin-right: 10px;
        padding: 5px 10px;
        margin-bottom: 10px;
      }
    }
  }
}

</style>
