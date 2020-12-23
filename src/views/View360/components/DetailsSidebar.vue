<template>
  <div class="details-sidebar"
       style="width:180px!important">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <p class="pointer"
         :style="{'color': hoverIndex===0 ? theme : themeO}"
         @click="clickLists(0,'患者概览')">
        <i :style="{'color':hoverIndex===0 ? theme : themeO}"
           class="iconfont icon-yuandianxiao" />
        <span>患者概览</span></p>
      <div v-for="(item,index) in list"
           :key="index">
        <p class="first-title"
           :style="{'color':theme}">{{ item.dataName }}</p>
        <ul class="second-lists"
            v-if="item.dataConfigurationEntityList.length>0">
          <li class="pointer"
              v-for="(child,i) in item.dataConfigurationEntityList"
              :key="i"
              :style="{'color': child.id == hoverIndex ? theme : themeO}"
              @click="clickLists(child.id,child.dataName)">
            <i :style="{'color': child.id == hoverIndex ? theme : themeO}"
               class="iconfont icon-yuandianxiao" />
            <span>{{ child.dataName }}</span>
          </li>
        </ul>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getViewMenu } from '@/api/view360'
export default {
  name: 'DetailsSidebar',
  computed: {
    ...mapGetters(['', 'dataSourceValue'])
  },
  data () {
    return {
      hoverIndex: 0,
      list: [],
      themeO: '#ffffff',
      theme: '#66FFFF'
    }
  },
  created () {
    this.getDictionariesFirst()
    this.clickLists(Number(this.$route.params.parentId), this.$route.query.parentName)
  },
  methods: {
    clickLists (id, name) {
      this.hoverIndex = id
      // this.$router.push(`/view360/${item.id}`)
      this.$store.commit('view360/SAVE_VIEWID', id)
      this.$emit('title', name)
      window.history.replaceState({}, '', `#/view360/${this.$route.params.personId}/${id}?parentName=${name}`)
    },
    getDictionariesFirst () {
      const data = {
        id: this.dataSourceValue?.id ?? 0
      }
      getViewMenu(data)
        .then(res => {
          this.list = res.obj
        })
        .catch((res) => {
        })
    },
    handleSelect (key, keyPath) {

    }
  }
}
</script>
<style lang="scss" scoped>
.details-sidebar {
  padding: 15px 5px 15px 23px !important;
  font-size: 14px !important;
  line-height: 30px !important;
  .first-title {
    opacity: 0.6;
  }
  .iconfont {
    color: #ffffff;
    font-size: 14px;
    margin-right: 0 !important;
  }
  .second-lists {
    margin-bottom: 5px;
  }
}
</style>
