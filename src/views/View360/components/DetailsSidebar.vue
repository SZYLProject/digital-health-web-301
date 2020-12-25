<template>
  <div class="details-sidebar"
       style="width:200px!important">
    <p class="title">
      <img :src="logo"
           class="logo"
           alt />
      <span class="title-item">{{ title }}</span>
    </p>
    <el-scrollbar style="height:92%">
      <div class="details-list">
        <!-- <p class="pointer">
          <i class="iconfont icon-xiangmu" />
          <span>患者概览</span>
        </p> -->
        <el-menu :default-active="hoverIndex">
          <el-menu-item index="0">
            <div @click="clickLists(0,'患者概览')">
              <i class="iconfont icon-xiangmu" />
              <span>患者概览</span>
            </div>
          </el-menu-item>
          <el-submenu v-for="(item,index) in list"
                      :key="index"
                      :index="String(item.id)"
                      popper-append-to-body>
            <template slot="title">
              <i class="iconfont icon-xiangmu" />{{ item.dataName }}
            </template>
            <template v-if="item.dataConfigurationEntityList.length>0">
              <el-menu-item v-for="(child,i) in item.dataConfigurationEntityList"
                            :key="i"
                            :index="String(child.id)">
                <div @click="clickLists(child.id,child.dataName)">
                  <span>{{ child.dataName }}</span>
                </div>
              </el-menu-item>
            </template>
          </el-submenu>
        </el-menu>
        <!-- <div v-for="(item,index) in list"
             :key="index">
          <p class="first-title"><i class="iconfont icon-xiangmu" />{{ item.dataName }}</p>
          <ul class="second-lists"
              v-if="item.dataConfigurationEntityList.length>0">
            <li class="pointer"
                v-for="(child,i) in item.dataConfigurationEntityList"
                :key="i"
                @click="clickLists(child.id,child.dataName)">

              <span>{{ child.dataName }}</span>
            </li>
          </ul>
        </div> -->
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import { mapGetters } from 'vuex'
import { getViewMenu } from '@/api/view360'
export default {
  name: 'DetailsSidebar',
  computed: {
    ...mapGetters(['title', 'dataSourceValue'])
  },
  data () {
    return {
      logo,
      hoverIndex: '0',
      list: []
    }
  },
  created () {
    this.getDictionariesFirst()
    this.clickLists(Number(this.$route.params.parentId), this.$route.query.parentName)
  },
  methods: {
    clickLists (id, name) {
      this.hoverIndex = String(id)
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
  // padding: 15px 5px 15px 23px !important;
  font-size: 14px !important;
  background-color: #ffffff !important;
  color: #666666 !important;
  .title {
    background: #0070f4;
    text-align: center;
    font-size: 18px;
    padding: 15px 0;
    .logo {
      width: 40px;
      // height: 30px;
      // margin: 0 5px;
      vertical-align: middle;
      display: inline-block;
    }
    .title-item {
      vertical-align: middle;
      margin-left: 8px;
      display: inline-block;
      color: #ffffff;
      font-weight: 700;
      font-size: 20px;
    }
  }
  .details-list {
    // padding: 10px 20px;
    // line-height: 35px !important;
    height: calc(100% - 60px) !important;
    // font-size: 1px !important;
    // .first-title {
    //   opacity: 0.6;
    // }
    .iconfont {
      // color: #666666 !important;
      // font-size: 14px;
      margin-right: 10px !important;
    }
    .second-lists {
      margin-left: 25px;
      margin-bottom: 5px;
      opacity: 0.6;
    }
  }
}
</style>
