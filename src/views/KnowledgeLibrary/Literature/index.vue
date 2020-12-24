
<!-- 文献 -->
<template>
  <div class="literature">
    <div class="module-container-three">
      <div class="title">
        <h1>文献搜索</h1>
        <span class="right">
          <el-link type="primary"
                   :underline="false"
                   disabled>高级搜索</el-link>
        </span>
      </div>
      <div class="con">
        <el-input placeholder="标题、作者等搜索关键词"
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
        <h1>文献推荐</h1>
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
              <el-tag>pubmed</el-tag>
            </div>
            <div class="right inlineBlock">
              <p><b>Peripheral arterial disease and intermittent claudication in coronaryheartdisease patients. </b></p>
              <p><b>冠心病患者的外周动脉疾病和间歇性跛行。</b></p>
              <div class="sub">Reiner Z.De Sutter J,Ryden L,...-《International journal of cardiology》 -2021-01</div>
            </div>
          </li>
          <li class="pointer">
            <div class="left inlineBlock">
              <el-tag effect="dark">pubmed</el-tag>

            </div>
            <div class="right inlineBlock">
              <p><b>Peripheral arterial disease and intermittent claudication in coronaryheartdisease patients. </b></p>
              <p><b>冠心病患者的外周动脉疾病和间歇性跛行。</b></p>
              <div class="sub">Reiner Z.De Sutter J,Ryden L,...-《International journal of cardiology》 -2021-01</div>
              <div class="tag">
                <el-tag effect="plain">
                  根据诊疗行为推荐
                </el-tag>
              </div>
            </div>
          </li>
          <li class="pointer">
            <div class="left inlineBlock">
              <el-tag>pubmed</el-tag>
            </div>
            <div class="right inlineBlock">
              <p><b>Peripheral arterial disease and intermittent claudication in coronaryheartdisease patients. </b></p>
              <p><b>冠心病患者的外周动脉疾病和间歇性跛行。</b></p>
              <div class="sub">Reiner Z.De Sutter J,Ryden L,...-《International journal of cardiology》 -2021-01</div>
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
  name: 'Literature',
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
.literature {
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
