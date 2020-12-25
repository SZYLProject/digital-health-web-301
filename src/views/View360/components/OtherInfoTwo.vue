<template>
  <div class="other-info-two">
    <el-row :gutter="16">
      <el-col :span="4">
        <div class="left-container">
          <div class="left-header">
            <span>
              <svg-icon icon-class="CasesOfSearch" />
            </span>
            <h4>全部就诊记录</h4>
          </div>
          <!-- 列表 -->
          <ul class="left-lists">
            <li
              v-for="(item,index) in leftLists"
              :key="index"
              class="pointer"
              @click="clickLists(item,index)"
              >
              <span
                :class="{'blue': item.type === '住院' ? true : false,
                         'green': item.type === '门诊' ? true : false,
                         'purple': item.type === '急诊' ? true : false,
                      }"
                >{{item.type}}</span>
              <span
                :style="{'color': index == hoverIndex ? theme : ''}"
              >{{ item.time }}</span>
              </li>
          </ul>
        </div>
      </el-col>

      <!-- right -->
      <el-col :span="20">
        <div class="right-container">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
              label="针吸活检"
              name="first"></el-tab-pane>
            <el-tab-pane
              label="穿刺活检"
              name="second"></el-tab-pane>
            <el-tab-pane
              label="淋巴结活检"
              name="third"></el-tab-pane>
          </el-tabs>
          <!-- 组件 -->
           <!-- <component :is="whichOne" ></component> -->
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { One, Two, Three } from './com'
export default {
  name: 'OtherInfoTwo',
  data () {
    return {
      hoverIndex: -1,
      activeName: 'first',
      whichOne: 'One',
      leftLists: [{
        id: 0,
        type: '住院',
        time: '2017年10月21日'
      }, {
        id: 1,
        type: '住院',
        time: '2018年10月21日'
      }, {
        id: 2,
        type: '门诊',
        time: '2019年10月21日'
      }, {
        id: 3,
        type: '急诊',
        time: '2018年9月1日'
      }, {
        id: 4,
        type: '住院',
        time: '2019年8月22日'
      }, {
        id: 5,
        type: '门诊',
        time: '2020年10月1日'
      }, {
        id: 6,
        type: '急诊',
        time: '2020年3月21日'
      }, {
        id: 7,
        type: '急诊',
        time: '2020年10月21日'
      }]
    }
  },
  props: {},
  computed: {
    ...mapGetters(['theme'])
  },
  watch: {},

  // components: { One, Two, Three },
  created () {},
  methods: {
    clickLists (item, index) {
      console.log(item)
      this.hoverIndex = index
    },
    handleClick (tab, event) {
      console.log(tab.index)
      switch (Number(tab.index)) {
        case 0 :
          this.whichOne = 'One'
          break
        case 1 :
          this.whichOne = 'Two'
          break
        case 2 :
          this.whichOne = 'Three'
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.other-info-two{
  .left-container{
    background: #ffffff;
    height: calc(100vh - 135px);
    min-width: 185px;
  }
  .left-header{

    padding: 14px;
    border-bottom: solid 1px rgba(230,230,230,1);
    span:nth-child(1){
      color:rgba(43,134,178,1);
    }
    h4{
      display: inline-block;
      margin-left: 10px;
      color: rgba(51,51,51,1);
    }
  }
  .left-lists{
    padding:10px 0;
    li{
      padding: 15px;
      padding-bottom: 0;
    }
    span:nth-child(1){
      border-radius: 2px;
      padding: 1px 2px;
    }
    span:nth-child(2){
      margin-left: 10px;
      &:hover{
        color: #0070f4;
      }
    }
  }

  .right-container{
    background: #ffffff;
    padding: 15px 0px;
  }
  .blue{
    color: #0070f4;
    border: solid 1px #0070f4;
  }
  .green{
    color: #25a289;
    border: solid 1px #25a289;
  }
  .purple{
    color: #5507d7;
    border: solid 1px #5507d7;
  }
}
</style>
<style lang="scss">
.other-info-two{
  .el-tabs__nav-scroll{
    padding: 5px 20px;
  }
  .el-tabs__item{
    height: 39px;
  }
  .el-tabs__active-bar{
    bottom: -5px;
  }
  .el-tabs__nav-wrap::after{
    height: 1px;
  }
}
</style>
