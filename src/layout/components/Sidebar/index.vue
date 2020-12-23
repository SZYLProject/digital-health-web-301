<template>
  <div>
    <div class="top-message">
      <!-- 标题 -->
      <p class="title">
        <img v-if="!isCollapse" :src="logos" class="logos" alt />
        <img v-if="isCollapse" :src="logo" class="logo" alt="">
        <span v-if="!isCollapse" class="title-item">{{ title }}</span>
      </p>
      <div class="user-master">
        <!-- <el-avatar class="user-photo" :size="!isCollapse ? 70 : 20" :src="user">
        </el-avatar> -->
        <!-- <p class="user-name">
          <span>{{ userInfo && userInfo.userName }}</span>
        </p> -->
      </div>

      <!-- 专病库 -->
      <div
        class="inlineBlock"
        style="display: block; text-align: center; margin-top: 15px"
      >
        <el-popover
          placement="right"
          width="1045"
          ref="popover"
          trigger="click"
        >
          <el-button v-if="!isCollapse" round slot="reference" size="mini">
            <span class="text">{{
              dataSourceValue.sourceName || "选择病种"
            }}</span>
            <i class="el-icon-arrow-right el-icon--right"></i>
          </el-button>
          <el-button
            v-else
            slot="reference"
            type="text"
            style="padding: 0 5px"
            class="patients"
            >{{ dataSourceValue.sourceName || "选择病种" }}</el-button
          >
          <div class="popover-p">
            <!-- 已开通 -->
            <div class="open-a on">
              <p style="color: #0070f4">已开通</p>
              <ul class="ul">
                <li
                  v-for="(item, index) in deseaseList"
                  :key="index"
                  class="yes"
                >
                  <span class="pn-1" @click="patientCheck(item)">
                    <img
                      :src="require('@/assets/patients/a/' + item.id + '.png')"
                      alt=""
                    />
                    <i>{{ item.sourceName }}</i>
                  </span>
                  <span
                    class="pn-2"
                    v-if="String(currentIndx) === String(item.id)"
                  >
                    <i class="triangle-topright"></i>
                    <i class="el-icon-check check"></i>
                  </span>
                </li>
              </ul>
            </div>
            <!-- 未开通 -->
            <div class="open-n on">
              <p style="color: #999999">未开通</p>
              <ul class="ul">
                <li v-for="(item, index) in noOpen" :key="index" class="no">
                  <span class="pn-1">
                    <img
                      :src="require('@/assets/patients/b/w' + index + '.png')"
                      alt=""
                    />
                    <i>{{ item }}</i>
                  </span>
                </li>
              </ul>
            </div>
            <!-- 按钮 -->
            <div class="footer-button">
              <el-button size="mini" @click.native="cancelBtn">取消</el-button>
              <el-button type="primary" size="mini" @click.native="commitPatiId"
                >确定</el-button
              >
            </div>
          </div>
        </el-popover>
      </div>
    </div>
    <!-- 侧边列表 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in authList"
          :key="route.pkId"
          :item="route"
          :base-path="route.menuUrl"
        />
      </el-menu>
    </el-scrollbar>

    <!-- 自定义导航 -->
    <div class="sidebar-settings">
      <!-- <div class="sidebar-xiugai"
           v-if="!isCollapse">
        <i class="iconfont icon-xiugai" />
        自定义导航
      </div> -->
      <hamburger
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import logos from '@/assets/logos.png'
import user from '@/assets/user_bg.png'

import { mapGetters, mapMutations } from 'vuex'
import Hamburger from '@/components/Hamburger'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
// import DiseaseCategories from '@/layout/components/DiseaseCategories'
import { allDesease, commitPatiId } from '@/api/dataDicIndex'

export default {
  components: { Hamburger, SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar',
      'authList',
      'title',
      'userInfo',
      'dataSourceValue'
    ]),
    // routes () {
    //   return this.$router.options.routes
    // },
    activeMenu () {
      return this.$route.path || '/home'
    },
    variables () {
      return variables
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  data () {
    return {
      logo,
      logos,
      user,
      currentIndx: -1,
      deseaseList: [],
      commitPatient: null,
      noOpen: [
        '膀胱癌',
        '结直肠癌',
        '眼部疾病',
        '糖尿病',
        '血管疾病',
        '神经系统',
        '脊柱疾病',
        '胰腺癌',
        '肺癌',
        '脾部疾病',
        '白血病',
        '高血压',
        '肝脏疾病',
        '胃癌',
        '呼吸道'
      ]
    }
  },
  watch: {
    isCollapse (val) {
      if (val) {
        this.$refs.popover.doClose()
      }
    }
  },
  created () {
    this.getAllDesease()
  },
  mounted () {
    this.currentIndx = this.dataSourceValue.id // 回显用
  },
  methods: {
    ...mapMutations(['user/STORE_PATIENTID']),
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    patientCheck (item) {
      // console.log(item)
      this.commitPatient = item
      this.currentIndx = item.id
    },
    cancelBtn () {
      this.$refs.popover.doClose()
      this.commitPatient = null
    },
    // 获得所有病种
    getAllDesease () {
      allDesease()
        .then((res) => {
          this.deseaseList = res.obj
          // console.log(res)
        })
        .catch((res) => {})
    },
    // 专病 id 提交
    commitPatiId () {
      // console.log(this.commitPatient)
      if (this.commitPatient === null) {
        this.$message({
          message: '请重新选择病种~',
          type: 'warning'
        })
        return
      }
      const id = this.commitPatient.id
      const sourceName = this.commitPatient.sourceName
      const data = {
        sourceName,
        id,
        userId: this.userInfo?.pkId
      }

      commitPatiId(data)
        .then((res) => {
          if (res.success === 0) {
            this['user/STORE_PATIENTID'](data)
            this.$refs.popover.doClose()
            this.commitPatient = null
            // this.selDesease = this.dataSourceValue?.sourceName
          }
        })
        .catch((er) => {})
    }
  }
}
</script>
<style rel="stylesheet/scss" scoped lang="scss">
@import "~@/styles/variables.scss";
.top-message {
  // height:200px;
  font-size: 18px;
  padding: 20px 0px;
  color: #ffffff;

  .title {
    text-align: center;
    font-size: 18px;
    // font-weight: bold;
    .logos {
      width: 160px;
      height: 40px;
      margin: 0 5px;
      vertical-align: bottom;
      display: inline-block;
    }
    .logo{
      width: 40px;
      height: 30px;
      // margin: 0 5px;
      vertical-align: bottom;
      display: inline-block;
    }
    .title-item {
      display: inline-block;
      margin-top: 15px;
    }
  }
  .user-master {
    text-align: center;
    margin-top: 10px;
    .user-photo {
      width: 70px;
      height: 70px;
      display: inline-block;
      margin-top: 15px;
    }
    .user-name {
      font-size: 14px;
      margin: auto;
    }
  }
  .patients {
    font-size: 12px;
    text-align: center;
    margin: auto;
    color: #ffffff;
    overflow: hidden; /* 溢出时不显示溢出的内容 */
    text-overflow: ellipsis; /* 发生溢出时使用省略号代替 */
    display: -webkit-box; /* chrome浏览器的私有属性。显示为box。 */
    -webkit-box-orient: vertical; /* 垂直排列元素 */
    -webkit-line-clamp: 1; /* 显示多少行 */
  }
}
.sidebar-settings {
  // background: $menuBg;
  position: absolute;
  right: 0;
  bottom: 10px;
  z-index: 99;
  width: 100%;
  .sidebar-xiugai {
    margin-left: 10px;
    float: left;
    overflow: hidden;
    font-size: 14px;
    transition: all 0.5s;
  }
  .hamburger-container {
    // line-height: 46px;
    // height: 100%;
    color: #ffffff;
    float: right;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      // background: rgba(0, 0, 0, 0.025);
    }
  }
}

.popover-p {
  padding: 10px 30px;
  .on > p {
    font-size: 16px;
    padding-bottom: 15px;
  }
  .on {
    .ul {
      display: flex;
      flex-flow: row wrap;
      margin-bottom: 15px;
      .yes {
        cursor: pointer;
        border: 1px solid #80b5f9;
      }
      .no {
        border: 1px solid #e6e6e6;
        opacity: 0.5;
      }
      li {
        position: relative;
        width: 80px;
        height: 80px;
        margin-right: 18px;
        margin-bottom: 20px;
        &:nth-child(odd) {
          margin-right: 17px;
        }
        &:nth-child(10) {
          margin-right: 0px;
        }
        .pn-1 {
          display: block;
          width: 80px;
          height: 80px;
          font-size: 14px;
          color: #666666;
          img {
            width: 40px;
            height: 40px;
            margin: 10px auto 5px;
            display: block;
          }
          i {
            text-align: center;
            display: block;
          }
        }
        .pn-2 {
          position: absolute;
          left: 0;
          top: 0;
          width: 80px;
          height: 80px;
          background: rgba(0, 112, 244, 0.1);
          border: 1px solid #0070f4;
          .triangle-topright {
            width: 0;
            height: 0;
            border-top: 20px solid #0070f4;
            border-left: 20px solid transparent;
            position: absolute;
            top: 0;
            right: 0;
          }
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
  .footer-button {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
<style lang="scss">
.top-message {
  .patients {
    font-size: 12px;
    color: #ffffff;
    width: 40px;
    overflow: hidden; /* 溢出时不显示溢出的内容 */
    text-overflow: ellipsis; /* 发生溢出时使用省略号代替 */
    display: -webkit-box; /* chrome浏览器的私有属性。显示为box。 */
    -webkit-box-orient: vertical; /* 垂直排列元素 */
    -webkit-line-clamp: 1; /* 显示多少行 */
  }
}
</style>
