<!-- 数据字典 -->
<template>
  <div class="dictionary-container module-container-two">
    <div class="title">
      <h1>字典定义</h1>
    </div>
    <DictionaryDefinition
              :kindsOfDesease="kindsOfDesease"
              @dataSourceIdFn="dataSourceIdFn"
     />
  </div>
</template>

<script>

import { createNamespacedHelpers, mapGetters } from 'vuex'

import { DictionaryDefinition } from './components'
import { kindOfDesease, datasDictionariesTitle } from '@/api/dataDicIndex'
const { mapActions } = createNamespacedHelpers('dataDicIndex')

export default {
  name: 'DataDicIndex',
  data () {
    return {
      kindsOfDesease: [], // 疾病种类数据
      dataSourceId: 0
    }
  },
  watch: {
    dataSourceId (val) {
      this.getDatasDictionariesTitle()
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'dataSourceValue'])
  },
  components: {
    DictionaryDefinition
  },
  created () {},
  mounted () {
    // 获取疾病
    this.getKindOfDesease()
    // 一二级字典标题
    this.getDatasDictionariesTitle()
  },
  destroyed () {},
  methods: {
    ...mapActions(['dataDictionaries']),
    // 病种选择
    getKindOfDesease () {
      kindOfDesease()
        .then(res => {
          const obj = res.obj
          if (obj) this.kindsOfDesease = obj
        })
        .catch(() => {})
    },

    // 一二级字典标题
    getDatasDictionariesTitle () {
      console.log(this.dataSourceValue)
      console.log(this.dataSourceId)
      console.log(this.$Storage.sessionGet('pID'))
      const data = {
        dataSourceId: this.dataSourceId || (this.$Storage.sessionGet('pID')?.id)
      }
      datasDictionariesTitle(data)
        .then(res => {
          const obj = res.obj
          if (obj) {
            this.dataDictionaries(obj)
          }
        })
        .catch(() => {})
    },

    dataSourceIdFn (id) {
      this.dataSourceId = id
    }
  }
}
</script>

<style lang="scss" scoped>
.dictionary-container {}
</style>
<style lang="scss">
</style>
