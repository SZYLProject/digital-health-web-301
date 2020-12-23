<template>
  <div class="header-wrapper"
       :style="{'background-color': theme}" >
    <el-row type="flex"
            justify="space-between">
      <el-col :span="12">
        <div class="logo-container inlineBlock">
          <router-link to="/">
            <!-- <img :src="logo"
                 class="logo"
                 alt /> -->
            <!-- <span class="title">{{title}}</span> -->
          </router-link>
        </div>
        <div class="inlineBlock">
          <!-- <DiseaseCategories /> -->
        </div>

      </el-col>
      <el-col :span="12"
              class="right-con">
        <!-- 搜索 -->
        <!-- <div class="right-search inlineBlock">
          <el-input :disabled="$route.name==='View360'"
                    placeholder="请输入内容"
                    @keyup.enter.native="goJumpKey"
                    v-model.trim="input2">
            <i slot="prefix"
               class="el-input__icon el-icon-search header-search-icon"
               @click="goJumpKey"></i>
          </el-input>
        </div> -->
        <!-- 导出 -->
        <!-- <div class="inlineBlock pointer">
          <i class="iconfont icon-daochu"
             style="margin-right:5px" />
          <span>导出记录</span>
        </div> -->
        <!-- 提醒 -->
        <!-- <div class="inlineBlock pointer">
          <i class="iconfont icon-tixing" />
        </div> -->
        <!-- 头像 菜单 -->
        <div class="right-menu inlineBlock">
          <el-dropdown class="avatar-container"
                       trigger="click">
            <div class="avatar-wrapper">
              <el-avatar class="user-avatar"
                         :size="32"
                         :src="userInfo&&userInfo.userPicture">晓明</el-avatar>
              <span class="user-name">{{userInfo&&userInfo.userName}}</span>
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown"
                              class="user-dropdown">
              <router-link to="/PersonalCenter">
                <el-dropdown-item>个人中心</el-dropdown-item>
              </router-link>
              <router-link to="/">
                <el-dropdown-item>帮助中心</el-dropdown-item>
              </router-link>
              <el-dropdown-item @click.native="logout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </el-col>
    </el-row>
  </div>
</template>
<script>
import logo from '@/assets/logo.png'
import { mapGetters, mapMutations } from 'vuex'
// import DiseaseCategories from './DiseaseCategories'
export default {
  name: 'AppHeader',
  components: {
    // DiseaseCategories
  },
  computed: {
    ...mapGetters(['title', 'userInfo', 'theme'])
  },
  watch: {
    // notifyStatus () {
    //   if (this.notifyStatus) {
    //     this.unread()
    //   }
    // }
  },
  data () {
    return {
      logo,
      isDot: false,
      number: '',
      input2: ''
      // dialogUpdateForm: false
    }
  },
  mounted () {
    // this.unread()
  },
  methods: {
    ...mapMutations(['caseSearch/keywordsinput']),
    // unread () {
    //   unreadMsg().then(response => {
    //     if (response.data > 0) {
    //       this.number = response.data
    //     } else {
    //       this.number = ''
    //     }
    //   })
    // },
    toMessage () {
      this.$router.push({ name: 'getMessage' })
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },

    // 跳转关键词搜索
    goJumpKey () {
      if (this.input2 !== '') {
        if (this.$route.path !== '/CasesOfSearch/KeywordsSearch') {
          this['caseSearch/keywordsinput'](this.input2)
          this.$route.path.includes('CasesOfSearch')
            ? this.$router.push('KeywordsSearch')
            : this.$router.push('CasesOfSearch/KeywordsSearch')
          this.input2 = ''
        }
      } else {
        this.$message({
          message: '搜索关键字不能为空~',
          type: 'warning'
        })
      }
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">
.header-search-icon {
  cursor: pointer;
}

.header-wrapper {
  padding: 0 10px;
  color: #ffffff;
}
.logo-container {
  padding: 13px 0;
  min-width: 230px;
  .logo {
    width: 30px;
    margin: 0 5px;
    vertical-align: middle;
    display: inline-block;
  }
  .title {
    vertical-align: middle;
    font-size: 18px;
    letter-spacing: 3px;
  }
}
.right-con {
  text-align: right;
  font-size: 14px;
  .inlineBlock {
    margin: 0 8px;
  }
}
.right-menu {
  // line-height: 50px;
  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
  .avatar-container {
    margin: 13px 30px 0 0;
    color: #ffffff;

    .avatar-wrapper {
      position: relative;
      cursor: pointer;
      .user-avatar {
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
        background: rgba(0, 160, 233, 0.9);
      }
      .user-name {
        display: inline-block;
        margin-left: 8px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 8px;
        font-size: 12px;
      }
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.right-search {
  .el-input__inner {
    width: 160px;
    height: 32px;
    line-height: 32px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    color: #ffffff;
    border: none;
  }
  .el-input__icon {
    line-height: 32px;
  }
}
</style>
