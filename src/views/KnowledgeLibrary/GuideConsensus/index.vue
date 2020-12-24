<template>
  <div class="guide-consensus">
    <div class="module-container-three">
      <div class="title">
        <h1>指南共识搜索</h1>
        <span class="right">
          <el-link type="primary"
                   :underline="false"
                   disabled>高级搜索</el-link>
        </span>
      </div>
      <div class="con">
        <el-input placeholder="请输入疾病名称"
                  v-model="input"
                  class="input-with-select">
          <!-- <el-select v-model="select"
                     slot="prepend"
                     placeholder="请选择">
            <el-option label="文献"
                       value="1"></el-option>
            <el-option label="订单号"
                       value="2"></el-option>
            <el-option label="用户电话"
                       value="3"></el-option>
          </el-select> -->
          <el-button slot="append"
                     type="primary">搜索</el-button>
        </el-input>
      </div>
    </div>
    <div class="module-container-three">
      <div class="title">
        <h1>指南共识推荐</h1>
        <span class="right">
          <el-link type="primary"
                   :underline="false"
                   icon="el-icon-refresh-right"
                   disabled>换一批</el-link>
        </span>
      </div>
      <div class="module-list">
        <ul>
          <li class="pointer">
            <div class="left inlineBlock">
              <img src="@/assets/know1.png" alt="">
            </div>
            <div class="right inlineBlock">
              <p><b>冠心病合理用药指南</b></p>
              <div class="sub">2016-06-30 国家卫生计生委合理用药专家委员会</div>
            </div>
          </li>
          <li class="pointer">
            <div class="left inlineBlock">
              <img src="@/assets/know2.png" alt="">

            </div>
            <div class="right inlineBlock">
              <p><b>专家助阵解析ESC 2013稳定性冠心病指南</b></p>
              <div class="sub">2013-09-18 北京大学第一医院老年病科 刘海林</div>
            </div>
          </li>
          <li class="pointer">
            <div class="left inlineBlock">
               <img src="@/assets/know3.png" alt="">
            </div>
            <div class="right inlineBlock">
              <p><b>高龄老年冠心病诊治中国专家共识</b></p>
              <div class="sub">2016-07-30 中华医学会老年医学分会</div>
            </div>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'GuideConsensus',
  components: {},
  computed: {
    ...mapGetters(['title'])
  },
  data () {
    return {
      input: ''
    }
  },
  watch: {},
  created () { },
  mounted () { },
  destroyed () { },
  methods: {
    ...mapMutations([''])
  }
}
</script>

<style lang="scss" scoped>
.guide-consensus {
  .module-list {
    padding: 10px 25px 25px;
    li {
      border-bottom: 1px solid #e6e6e6;
      padding: 10px 0;
      &:hover {
        p {
          color: #0070f4;
        }
      }
    }
    .left {
      width: 100px;
      vertical-align: top;
      text-align: center;
    }
    .right {
      vertical-align: top;
      line-height: 25px;
      color: #333333;
      .sub {
        color: #999999;
        margin-top: 5px;
      }
      .tag {
        margin-top: 8px;
      }
    }
  }
}
</style>
<style lang="scss">
</style>
