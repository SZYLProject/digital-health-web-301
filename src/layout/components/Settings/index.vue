<template>
  <div class="drawer-container">
    <div>
      <!-- <h3 class="drawer-title"></h3> -->
      <div class="avatar-wrapper">
        <el-avatar class="user-avatar"
                    :size="50"
                    :src="userInfo && userInfo.userPicture">{{userInfo && userInfo.userName}}</el-avatar>

      </div>
      <div class="drawer-item">
        <!-- 二级列表 -->
        <ul class="item-wraps">
          <li
            class="icon-lists pointer"
            :title="item.title"
            v-for="(item,index) in iconObj"
            :key="index">
            <i
              :class="item.icon"
              @click="disModel(index)"
              ></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

export default {
  components: { },
  data () {
    return {
      input: '',
      isShow: false,
      iconObj: [{
        icon: 'el-icon-user-solid',
        title: '个人中心'
      }, {
        icon: 'el-icon-question',
        title: '帮助中心'
      }, {
        icon: 'el-icon-switch-button',
        title: '退出登录'
      }]
      // icons: ['el-icon-search', '', 'el-icon-phone', 'el-icon-picture', 'el-icon-message-solid'],
    }
  },
  computed: {
    ...mapGetters(['theme', 'show', 'userInfo'])
  },
  methods: {
    ...mapMutations(['user/SET_SHOW', 'app/CHANGE_SHOWSEETING']),
    disModel (idx) {
      this['user/SET_SHOW'](false)
      switch (idx) {
        case 0: //  跳转个人中心
          this.$router.push('/PersonalCenter')
          break
        case 1: // 跳转帮助中心
          this.$router.push('/')
          break
        case 2: // 退出登录
          this.logout()
          break
      }
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      await this['app/CHANGE_SHOWSEETING'](false)
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/transition.scss';

.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  position: relative;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    // padding: 12px 0;
  }
  .avatar-wrapper{
    margin-left: -10px;
  }
  .item-wraps{
    .icon-lists{
      font-size: 20px;
      text-align: center;
      margin: 0px 0 20px;
      transition: all .5s ease 0s;
      &:hover{
        color: rgb(36, 123, 204);
        transform: scale(2, 2);
        -webkit-transform:scale(2, 2);
        -moz-transform:scale(2, 2);
        -o-transform:scale(2, 2);
      }
    }
  }
}
</style>
