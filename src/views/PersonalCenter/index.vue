<template>
  <div class="personal-center">
    <el-row :gutter="10">
      <el-col :span="5">
        <div class="personal-left">
          <div class="module-container avatar">
            <el-avatar class="user-avatar"
                       :size="50"
                       :src="userInfo&&userInfo.userPicture">晓明</el-avatar>
            <h3>{{userInfo.userName}}</h3>
            <p>{{userInfo.userPhone}}</p>
          </div>
          <el-menu default-active="0"
                   @select="handleSelect">
            <el-menu-item v-for="(item,index) in leftMenu"
                          :key="index"
                          :index="String(index)">
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="module-container personal-right">
          <div class="title">
            <h2>{{nowTitle}}</h2>
          </div>
          <component :is="nowComponent"></component>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { MyInfo, SkinSettings, UpdatePassword } from './components'
import { mapGetters } from 'vuex'

export default {
  name: 'PersonalCenter',
  components: {
    MyInfo,
    SkinSettings,
    UpdatePassword
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  data () {
    return {
      leftMenu: [
        {
          name: '个人信息',
          components: 'MyInfo'
        },
        {
          name: '修改密码',
          components: 'UpdatePassword'
        }
        // {
        //   name: '皮肤设置',
        //   components: 'SkinSettings'
        // }
      ],
      nowComponent: 'MyInfo',
      nowTitle: '个人信息',
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.nowComponent = this.leftMenu[key].components
      this.nowTitle = this.leftMenu[key].name
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.personal-center {
  .user-avatar {
    background: rgba(0, 160, 233, 0.9);
  }
  .personal-right {
    min-height: calc(100vh - 76px);
  }
  .personal-left {
    .avatar {
      color: #787878;
      text-align: center;
      padding: 40px 0;
      line-height: 25px;
    }

    .el-menu-item {
      border-bottom: 1px solid rgba(43, 134, 178, 0.1);
    }
    .el-menu-item.is-active {
      background-color: rgba(43, 134, 178, 0.2) !important;
      &:hover {
        background-color: rgba(43, 134, 178, 0.2) !important;
      }
    }
    .el-menu {
      border: none;
      height: 100%;
      width: 100% !important;
    }
  }
}
</style>
