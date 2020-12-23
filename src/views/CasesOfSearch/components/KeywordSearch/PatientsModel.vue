<!-- 病人模式组件列表组件 -->
<template>
  <div class="patients-model-com">
    <ul class="case-lists">
      <li
        class="pointer"
        v-for="(item,index) in listsVisit"
        :key="index"
        style="padding-right:90px;"
        :style="{'background-color': item.check ? 'rgba(43,134,178,0.2)':'#ffffff'}"
        @click="correctBg(item,index)"
        >
        <h4>
          ***  ;&nbsp;
          性别: {{ item.gender ? item.gender : '无'}} ;&nbsp;
          出生年月: {{ item.birth ? item.birth + '***' : '无'}}
        </h4>
        <p class="p-b">
          <el-button
            type="text"
            @click.native.stop="jumpView(item)"> 患者全景 >
          </el-button>
        </p>
        <p style="margin:10px 0px;">
          <span class="p-k" >
            {{ item.visitType }}
          </span>
        </p>
        <p>
          就诊日期: {{ item.visitStartDate | timestamp }} ; &nbsp;
          就诊科室: {{ item.departmentName ? item.departmentName : '无' }} ;&nbsp;
          现病史: {{ item.presentIllness ? item.presentIllness : '无' }} ;&nbsp;
          就诊年龄: {{ item.visitAge ? item.visitAge : '无' }};&nbsp;
          {{item.title.name}}:  <span v-html="item.title.value"></span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'patientsModel',
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
        this.listsVisit = val.visit.map(item => {
          this.$set(item, 'check', false)
          item.title.name = Object.keys(item.title)[0]
          item.title.value = item.title[Object.keys(item.title)[0]]
            .split(this.keyWordsSearch)
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
    jumpView (item) {
      const newPage = this.$router.resolve({ path: `/view360/${item.personId}/0/?parentName=患者概览` })
      window.open(newPage.href, '_blank')
    },
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
      // console.log(this.listsId)
      this['caseSearch/keywordlists'](this.listsId) // 存储病例列表ID
    }

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.patients-model-com{
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
