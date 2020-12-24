<!-- 误诊误治  -->
<template>
  <div class="misdiagnosis-mistreatment">
    <div class="module-container-three">
      <div class="title">
        <h1>误诊误治搜索</h1>
      </div>
      <div class="con">
        <el-input
          placeholder="请输入疾病名称"
          v-model="input"
          class="input-with-select"
        >
          <el-button slot="append" type="primary">搜索</el-button>
        </el-input>
      </div>
    </div>
    <div class="content">
      <div class="con-le">
        <div class="module-container-three bottom-th">
          <div class="title">
            <h1>疾病分类</h1>
            <span class="right">
              <el-link
                type="primary"
                :underline="false"
                icon="el-icon-refresh-right"
                disabled
                >换一批</el-link
              >
              <el-link
                type="primary"
                style="margin-left: 20px"
                :underline="false"
                disabled
                >更多</el-link
              >
            </span>
          </div>
          <div class="con-1">
            <ul class="ul">
              <li v-for="(item, index) in deseaseList" :key="index" class="yes">
                <p class="pn-1" @click="patientCheck(item)">
                  <span class="pn">
                    <img
                      :src="require('@/assets/library/wz/' + item.id + '.png')"
                      alt=""
                    />
                  </span>
                  <i
                    :style="{
                      color:
                        String(currentIndx) === String(item.id)
                          ? '#0070f4'
                          : '',
                    }"
                    >{{ item.name }}</i
                  >
                </p>
                <p class="pn-2" v-if="String(currentIndx) === String(item.id)">
                  <i class="el-icon-check check"></i>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="module-container-self">
          <div class="title-t">
            <h1>
              <img
                :src="require('@/assets/library/wz/' + picNum + '.png')"
                alt=""
              />
              <span>{{ patientName }}疾病</span>
            </h1>
            <h2>{{ patientName }}疾病</h2>
          </div>
          <div class="con-button">
            <el-button
              size="mini"
              v-for="(item, index) in dugname"
              :key="index"
            >
              {{ item }}
            </el-button>
          </div>
        </div>
      </div>
      <!-- 右边 -->
      <div class="con-rt">
        <div class="module-container-three">
          <div class="title">
            <h1>推荐疾病</h1>
          </div>
          <el-scrollbar style="height: 100%" ref="scroll">
            <ul class="disease-lists">
              <li class="list" v-for="(item, index) in 10" :key="index">
                <h1>
                  肺癌
                  <span>28.5%</span>
                </h1>
                <h2>
                  肺癌
                  <span>误诊率</span>
                </h2>
                <p>
                  易误诊疾病：肺结核；肺炎；结核性胸膜炎；支气管炎；脑血管病；肺脓肿；胸膜炎；肩关节周围炎；支气管扩张；腰椎病；
                </p>
              </li>
            </ul>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MisdiagnosisMistreatment',
  components: {},
  computed: {
    ...mapGetters(['title'])
  },
  data () {
    return {
      input: '',
      currentIndx: 0,
      patientName: '鼻咽喉',
      picNum: 0,
      deseaseList: [
        {
          id: 0,
          name: '鼻咽喉'
        },
        {
          id: 1,
          name: '传染病'
        },
        {
          id: 2,
          name: '创伤'
        },
        {
          id: 3,
          name: '代谢'
        },
        {
          id: 4,
          name: '耳和乳突'
        },
        {
          id: 5,
          name: '妇产'
        },
        {
          id: 6,
          name: '骨与风湿'
        },
        {
          id: 7,
          name: '呼吸'
        }
      ],
      dugname: [
        '鼻结核',
        '上颌窦出血性息肉',
        '上颌窦炎',
        '鼻窦炎',
        '鼻窦囊肿',
        '蝶窦囊肿',
        '鼻出血',
        '鼻窦异物',
        '鼻后滴流综合征'
      ]
    }
  },
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    ...mapMutations(['']),
    patientCheck (item) {
      // console.log(item)
      this.currentIndx = item.id
      this.patientName = item.name
      this.picNum = item.id
    }
  }
}
</script>

<style lang="scss" scoped>
.misdiagnosis-mistreatment {
  .content {
    display: flex;
    .con-le {
      background-color: #ffffff;
      margin-right: 20px;
      flex: 1;
      .bottom-th {
        border-bottom: 1px solid #f2f4f5;
      }
    }
    .module-container-self {
      padding: 0px 25px;
      .title-t {
        h1 {
          position: relative;
          color: #333333;
          font-weight: 700;
          font-size: 14px;
          img {
            position: absolute;
            width: 20px;
            height: 20px;
          }
          span {
            margin-left: 30px;
          }
        }
        h2 {
          color: #333333;
          font-weight: 700;
          font-size: 12px;
          padding: 20px 40px 10px;
          position: relative;
          &::before {
            content: "";
            display: block;
            width: 2px;
            height: 2px;
            border-radius: 100%; /**控制形状**/
            background-color: #333333; /**控制图标颜色**/
            // margin-right: 10px; /**图标与文字距离**/
            position: absolute;
            left: 32px;
            top: 27px;
          }
        }
      }
      .con-button {
        padding: 0px 35px 10px 32px;
        .el-button {
          height: 24px;
          line-height: 10px;
          border: none;
          color: #0070f4;
          margin: 10px 10px 0px 0px;
          background: rgba(0, 112, 244, 0.1);
          border-radius: 0;
        }
      }
    }

    .con-1 {
      padding: 20px 30px 0px 45px;
      .ul {
        display: flex;
        flex-flow: row wrap;
        // margin-bottom: 15px;
        li {
          position: relative;
          width: 100px;
          height: 100px;
          margin-right: 18px;
          margin-bottom: 20px;
          border: 1px solid #e6e6e6;
          cursor: pointer;
          .pn-1 {
            display: block;
            margin: auto;
            font-size: 13px;
            color: #666666;
            .pn {
              width: 56px;
              height: 56px;
              margin: auto;
              margin-top: 10px;
              display: block;
              border: 1px dashed #e6e6e6;
            }
            i {
              text-align: center;
              padding: 8px 0px;
              display: block;
            }
          }
          .pn-2 {
            position: absolute;
            left: 0;
            top: 0;
            width: 100px;
            height: 100px;
            background: rgba(0, 112, 244, 0.1);
            border: 1px solid #0070f4;
            .check {
              position: absolute;
              color: #ffffff;
              font-size: 10px;
              top: 0;
              right: 0;
            }
          }
        }
      }
    }

    .con-rt {
      width: 420px;
      background-color: #ffffff;
      .disease-lists {
        padding: 0px 25px;
        height: calc(100vh - 330px);
        .list {
          border: 1px solid #e6e6e6;
          border-radius: 2px;
          padding: 10px;
          margin-bottom: 10px;
          h1 {
            font-size: 16px;
            font-weight: 700;
            color: #333333;
            position: relative;
            span {
              position: absolute;
              right: 0;
              top: 3px;
            }
          }
          h2 {
            font-size: 14px;
            font-weight: 700;
            color: #999999;
            position: relative;
            padding: 10px;
            span {
              position: absolute;
              right: 0;
              top: 10px;
            }
            &::before {
              content: "";
              display: block;
              width: 4px;
              height: 4px;
              border-radius: 100%; /**控制形状**/
              background-color: #f15643; /**控制图标颜色**/
              // margin-right: 10px; /**图标与文字距离**/
              position: absolute;
              left: 0px;
              top: 18px;
            }
          }
          p {
            color: #666666;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
</style>
