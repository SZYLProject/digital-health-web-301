<!-- 首页 -->
<template>
  <div class="first-page">
    <div class="module-container-three">
      <div class="title">
        <h1>知识搜索</h1>
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
          <el-select v-model="select"
                     slot="prepend"
                     placeholder="请选择">
            <el-option label="文献"
                       value="1"></el-option>
            <el-option label="订单号"
                       value="2"></el-option>
            <el-option label="用户电话"
                       value="3"></el-option>
          </el-select>
          <el-button slot="append"
                     type="primary">搜索</el-button>
        </el-input>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="module-container-three">
          <div class="title">
            <h1>最新文献</h1>
            <span class="right">
              <el-link type="primary"
                       :underline="false"
                       icon="el-icon-refresh-right"
                       disabled>换一批</el-link>
              <el-link type="primary"
                       style="margin-left:20px;"
                       :underline="false"
                       disabled>更多</el-link>
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
      </el-col>
      <el-col :span="8">
        <div class="module-container-three">
          <div class="title">
            <h1>文献热点</h1>
          </div>
          <div class="con">
            <WordCloud :data="wordList"
                       width="100%"
                       height="300px" />
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import WordCloud from '@/components/Charts/WordCloud'
export default {
  name: 'FirstPage',
  components: { WordCloud },
  computed: {
    ...mapGetters(['title'])
  },
  data () {
    return {
      input: '',
      select: '',
      wordList: [
        {
          name: '心脏康复',
          value: 2040
        }, {
          name: '心理健康',
          value: 10
        }, {
          name: '动脉粥样硬化',
          value: 2040
        }, {
          name: '2型糖尿病',
          value: 479
        }, {
          name: '支架内再狭窄',
          value: 404
        }, {
          value: 0,
          name: '缺血性心脏病'
        }, {
          value: 0,
          name: '高血压'
        }
      ]
    }
  },
  watch: {},
  created () { },
  mounted () { },
  destroyed () { },
  methods: {
    ...mapMutations(['']),
    serachFn () { }
  }
}
</script>

<style lang="scss" scoped>
.first-page {
  .module-list {
    padding: 10px 25px 25px;
    li {
      border-bottom: 1px solid #e6e6e6;
      padding: 10px 0;
      &:hover {
        p{
          color:#0070F4
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
    }
  }
}
</style>
<style lang="scss">
</style>
