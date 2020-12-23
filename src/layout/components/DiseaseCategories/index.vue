<template>
  <div class="disease-container">
    <el-button class="disease-button"
               :disabled="$route.name==='View360'"
               round
               size="small"
               @click="dialogFormVisible = true">
      <span class="text">{{dataSourceValue.sourceName || '选择病种'}}</span>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>

    <el-dialog title="病种选择"
               :visible.sync="dialogFormVisible"
               width="800px"
               @open="openHandle"
               @close="closeHandle"
               append-to-body>
      <el-row :gutter="30">
        <el-col :span="6"
                style="border-right: 1px solid #DCDFE6">
          <div class="disease-left scrollbar-wraps">
            <el-scrollbar wrap-class="scrollbar-wrapper"
                          style="height:100%">
              <p class="disease-title">已开通病种</p>
              <el-menu class="el-menu-vertical-demo"
                       @select="selectHandle">

                <!-- 多选 -->
                <!-- <el-checkbox-group v-model="checkList"
                                   class="disease-checkbox-group">
                  <template v-for="item in deseaseList">
                    <el-menu-item :index="item.sourceCode"
                                  :key="item.id"
                                  v-if="item.isUse===1">
                      <i class="el-icon-menu"></i>
                      <span slot="title">{{item.sourceName}}</span>
                      <el-checkbox :label="item.sourceCode"></el-checkbox>
                    </el-menu-item>
                  </template>
                </el-checkbox-group> -->

                <!-- 单选 -->
                <el-radio-group v-model="radio"
                                class="disease-checkbox-group">
                  <template v-for="item in deseaseList">
                    <el-menu-item :index="item.sourceCode"
                                  :key="item.id"
                                  v-if="item.isUse===1">
                      <i class="el-icon-menu"></i>
                      <span slot="title">{{item.sourceName}}</span>
                      <el-radio :label="item.id + '-' + item.sourceName"></el-radio>
                    </el-menu-item>
                  </template>
                </el-radio-group>

                <!-- <el-divider></el-divider>
                <p class="disease-title">未开通病种</p>
                <template v-for="item in deseaseList">
                  <el-menu-item :index="item.sourceCode"
                                :key="item.id"
                                v-if="item.isUse===0">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{item.sourceName}}</span>
                  </el-menu-item>
                </template> -->
              </el-menu>

            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="disease-right">
            <!-- <el-tabs v-model="activeName"
                     @tab-click="handleClick">
              <el-tab-pane label="科研介绍"
                           name="first">科研介绍</el-tab-pane>
              <el-tab-pane label="数据分析"
                           name="second">数据分析</el-tab-pane>
              <el-tab-pane label="数据字典"
                           name="third">数据字典</el-tab-pane>
            </el-tabs> -->
            <div class="tip"
                 v-if="showTip">
              <i class="el-icon-warning"></i>
              <span style="margin-left:3px;">此病种暂未开通，若要使用请您联系神州医疗。客服电话：010-88888888，邮箱：123@dchealth.com</span>
            </div>
          </div>
        </el-col>
      </el-row>

      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   size="small"
                   @click="commitPatiId">确 定</el-button>
        <el-button type="primary"
                   plain
                   size="small"
                   @click="dialogFormVisible = false">取 消</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import { allDesease, commitPatiId } from '@/api/dataDicIndex'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'DiseaseCategories',
  data () {
    return {
      dialogFormVisible: false,
      activeName: 'first',
      radio: '',
      deseaseList: [],
      // selDesease: '',
      showTip: false
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'dataSourceValue'])
  },
  created () {
    // this.selDesease = this.dataSourceValue?.sourceName
    this.radio = this.dataSourceValue.id + '-' + this.dataSourceValue.sourceName // 回显用
  },
  methods: {
    ...mapMutations(['user/STORE_PATIENTID']),
    openHandle () {
      this.getAllDesease()
    },
    closeHandle () {
      // this.dataSourceValue
      // const newArr = []
      // this.deseaseList.map(item => {
      //   if ((item.isUse === 1) && (String(this.checkList).indexOf(String(item.id)) > -1)) {
      //     newArr.push(item.sourceName)
      //   }
      // })
      // this.selDesease = newArr.join(',')
      // this.selDesease = this.dataSourceValue
    },

    // 获得所有病种
    getAllDesease () {
      allDesease()
        .then(res => {
          this.deseaseList = res.obj
        })
        .catch((res) => {
        })
    },
    selectHandle (key, keyPath) {
      const obj = this.deseaseList.filter((item) => item.sourceCode === key)[0]
      if (obj.isUse === 0) {
        this.showTip = true
      } else {
        this.showTip = false
      }
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },

    // 专病 id 提交
    commitPatiId () {
      if (this.radio.length === 0) return
      const id = this.radio.split('-')[0]
      const sourceName = this.radio.split('-')[1]
      const data = {
        sourceName,
        id,
        userId: this.userInfo?.pkId
      }

      commitPatiId(data).then(res => {
        if (res.success === 0) {
          this['user/STORE_PATIENTID'](data)
          this.dialogFormVisible = false
          // this.selDesease = this.dataSourceValue?.sourceName
        }
      }).catch((er) => { })
    }
  }
}
</script>

<style lang="scss" scoped>
.disease-container {
  .disease-button {
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
    border: none;
    .text {
      max-width: 150px;
      display: inline-block; /* 需要 */
      white-space: nowrap; /* 过长部分不换行 */
      text-overflow: ellipsis; /* 过长部分展示省略号 */
      overflow: hidden; /* 隐藏过长部分 */
    }
  }
}
.disease-left {
  height: 400px;
  overflow: auto;
  line-height: 30px;
  .disease-title {
    color: #909399;
  }
  .disease-checkbox-group {
    // .el-checkbox {
    //   position: absolute;
    //   right: 15px;
    //   top: -2px;
    // }

    .el-radio {
      position: absolute;
      right: -50px;
      top: 10px;
    }
  }
  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }
  .el-menu-item {
    padding-left: 10px !important;
    line-height: 35px;
    height: 35px;
  }
}
.disease-right {
  position: relative;
  height: 415px;
  .tip {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(43, 134, 178, 0.1);
    border: 1px solid #a8d2e6;
    font-size: 12px;
    padding: 8px 8px;
    line-height: 25px;
    i {
      font-size: 18px;
      color: #ec6941;
    }
  }
}
</style>
<style lang="scss">
.disease-left {
  .disease-checkbox-group {
    // .el-checkbox__label {
    //   display: none;
    // }

    .el-radio__label {
      display: none;
    }
  }
}
</style>
