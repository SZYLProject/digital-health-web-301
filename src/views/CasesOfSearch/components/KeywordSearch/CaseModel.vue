<!-- 病例模式组件列表组件 -->
<template>
  <div class="case-model-com">
    <ul class="case-lists">
      <li
        class="pointer"
        v-for="(item, index) in listsVisit"
        :key="index"
        style="padding-right:90px;"
        :style="{'background-color': item.check ? 'rgba(43,134,178,0.2)':'#ffffff'}"
        @click="correctBg(item,index)"
      >
        <h4>
          <!-- {{item.title.name}}:  <span v-html="item.title.value"></span> -->
          <span v-html="item.title.shows"></span>
        </h4>
        <p class="p-b">
          <el-button
            type="text"
            @click.native.stop="jumpView(item)"> 患者全景 >
          </el-button>
        </p>
        <p style="margin:10px 0px;">
          <span class="p-k"
                v-for="(itm,idx) in item.visit_record"
                :key="'itm' + idx">
            {{ itm.visit_source_value }}
          </span>
        </p>
        <p>
          就诊日期:
          <span
              v-for="(itm,idx) in item.visit_record"
              :key="'itm0' + idx">
              {{ itm.visit_start_date | timestamp }}
          </span>; &nbsp;
          就诊科室:
          <span v-for="(itm,idx) in item.visit_record"
                :key="'itm1' + idx">
                {{ itm.dept_admission_to ? itm.dept_admission_to : '无' }}
          </span>; &nbsp;

          现病史:
          <span v-for="(itm, idx) in item.visit_record"
                :key="'itm2' + idx">
                {{ itm.hy_present ? itm.hy_present : '无' }}
          </span>;&nbsp;&nbsp;
          性别: {{ item.sex ? item.sex : '无'}} ;&nbsp;
          出生年月: {{ item.date_of_birth ? (item.date_of_birth.slice(0,10)) : '无'}} ;&nbsp;
          就诊年龄:
          <span v-for="(itm,idx) in item.visit_record"
                :key="'itm3' + idx">
            {{ itm.visit_age ? itm.visit_age : '无' }}
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'caseModel',
  data () {
    return {
      listsData: null,
      listsVisit: [],
      listsIdObj: {},
      listsId: [] // 收藏 添加项目的ID
    }
  },
  props: {},
  computed: {
    ...mapGetters(['keyWordsSearch', 'keyWordListsDatas'])
  },
  watch: {
    keyWordListsDatas (val) {
      if (val) {
        this.listsData = val
        this.listsVisit = val.personList.map(item => {
          this.$set(item, 'check', false)
          const arr1 = Object.entries(item.title)
          const arr2 = arr1.map(itemChild => {
            return `${itemChild[0]}:${itemChild[1]}`
          })
          item.title.shows = arr2.join('；').split(this.keyWordsSearch)
            .join(`<span style="color:red;">${this.keyWordsSearch}</span>`)
          return item
        })
      }
    }
  },

  components: {},
  created () {},
  mounted () {},
  destroyed () {
    this['caseSearch/keywordlists']([])
  },
  methods: {
    ...mapMutations(['caseSearch/keywordlists']),
    // 跳转患者全景
    jumpView (item) { // 病例模式
      const newPage = this.$router.resolve({ path: `/view360/${item.unique_id_lv1}/0/?parentName=患者概览` })
      window.open(newPage.href, '_blank')
    },

    // 改变背景 获取病历ID
    correctBg (val, index) {
      const num = Object.keys(this.listsIdObj).length
      this.listsId = []
      this.listsVisit[index].check = !val.check
      if (num !== 0) {
        if (this.listsIdObj[index]) {
          delete this.listsIdObj[index]
        } else {
          this.listsIdObj[index] = val.personId
        }
      } else {
        this.listsIdObj[index] = val.personId
      }
      for (const key in this.listsIdObj) {
        this.listsId.push(this.listsIdObj[key])
      }
      this['caseSearch/keywordlists'](this.listsId) // 存储病例列表ID
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.case-model-com{
  ul {
    li{
      position: relative;
      border-bottom: solid 1px rgba(43,134,178,0.2);
      padding: 15px 10px;
      margin-bottom: 2px;
      border-radius: 1%;
      .p-b{
        position: absolute;
        right: 20px;
        top: 0px;
        z-index: 20;
      }
      .p-k{
        padding: 2px 10px;
        border:solid #00a0e9 1px;
        color: #00a0e9;
        border-radius: 3px;
      }
      h4{
        color:#2b2b2b;
      }
    }
  }
}
</style>
<style lang="scss"></style>
