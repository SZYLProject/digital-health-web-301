<template>
  <div class="login-container">
    <div class="login-main">
      <div class="login-wraps">
        <div class="title-container">
          <h1 class="title">{{ title }}</h1>
        </div>
        <div class="message-container">
          <div class="pic">
            <img src="../../assets/login/pic.png"
                 alt="" />
          </div>
          <div class="login">
            <el-form ref="loginForm"
                     :model="loginForm"
                     :rules="loginRules"
                     class="login-form"
                     autocomplete="on"
                     label-position="left">
              <h2 class="info">欢迎您，请登录！</h2>
              <el-form-item label="用户名"
                            prop="username">

                <el-input ref="username"
                          v-model="loginForm.username"
                          placeholder="请输入用户名"
                          name="username"
                          type="text"
                          tabindex="1"
                          autocomplete="on">
                  <!-- <i slot="prefix"
                     class="iconfont icon-yonghuming"></i> -->
                </el-input>
                <span class="svg-container">
                  <svg-icon icon-class="yonghuming" />
                </span>
              </el-form-item>
              <el-form-item label="密码"
                            prop="password"
                            style="margin-top:10px;">

                <el-input ref="password"
                          v-model="loginForm.password"
                          :type="passwordType"
                          placeholder="请输入密码"
                          name="password"
                          tabindex="2"
                          autocomplete="on"
                          @keyup.native="checkCapslock"
                          @blur="capsTooltip = false">
                  <!-- <i slot="prefix"
                     class="iconfont icon-mima"></i> -->
                </el-input>
                <span class="svg-container">
                  <svg-icon icon-class="mima" />
                </span>
                <span class="show-pwd"
                      @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'yincang' : 'xianshi1'" />
                </span>
              </el-form-item>
              <!--  -->
              <el-form-item style="margin-top: 5px;">
                <div class="tip">
                  <!-- <div class=""> -->
                  <el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
                  <!-- </div>
                  <div class=""> -->
                  <!-- <router-link to="/forgotPassword">忘记密码？</router-link> -->
                  <router-link to="">忘记密码？</router-link>
                  <!-- </div> -->
                </div>
              </el-form-item>
              <el-button :loading="loading"
                         type="primary"
                         style="width: 100%;height:45px; border: none;margin-top:30px;"
                         @click.native.prevent="handleLogin">登 录</el-button>
            </el-form>

          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>

import Footer from './components/Footer'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Login',
  components: {
    Footer
  },
  computed: {
    ...mapGetters(['title'])
  },
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入正确密码'))
      } else {
        callback()
      }
    }
    return {
      passwordType: 'password',
      loginForm: {
        username: 'test2',
        password: '1q2w3e4r'
      },
      loginRules: {
        username: [
          { required: false, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: false, trigger: 'blur', validator: validatePassword }
        ]
      },
      rememberPassword: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created () {
    // window.addEventListener('storage', this.afterQRScan)
    this.$Storage.sessionRemove('pID')
  },
  mounted () {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed () {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    ...mapMutations(['app/CHANGE_SHOWSEETING']),

    handleLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this['app/CHANGE_SHOWSEETING'](true)
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    checkCapslock (e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #212121;
$cursor: #212121;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  // background: radial-gradient(rgba(36,123,204, 0.7), rgba(36,123,204, 1));
  background: url("../../assets/login/bg.png") no-repeat fixed 0% 0%/100% 100%;
  .el-input {
    input {
      padding-left: 37px;
      color: $light_gray;
      // height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-checkbox {
    color: #999999;
  }
  .el-form-item {
    margin-top: 15px;
    margin-bottom: 0px;
    color: #666666 !important;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray: #a0a0a0;
$light_gray: #ffffff;

.login-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  .login-main {
    flex: 1 0 auto;
    .login-wraps {
      width: 908px;
      margin: auto;
    }
  }
  .title-container {
    position: relative;
    padding-top: 10%;
    .title {
      font-size: 2.5rem;
      color: $light_gray;
      text-align: center;
      font-weight: 700;
      letter-spacing: 10px;
    }
  }

  .svg-container {
    position: absolute;
    left: 13px;
    top: 39px;
    // padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    // display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 39px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .message-container {
    display: flex;
    position: absolute;
    top: 50%;
    margin-top: -190px;
    .pic {
      width: 454px;
      height: 400px;
    }
    .login {
      width: 454px;
      height: 400px;
      background: #ffffff;
      border-radius: 0px 4px 4px 0px;
      padding: 30px;
    }
  }
  .login-form {
    position: relative;
    .info {
      font-size: 22px;
      color: #0070f4;
      font-weight: 700;
      letter-spacing: 2px;
    }
    .tip {
      display: flex;
      justify-content: space-between;
      color: #999999 !important;
    }
  }

  .footer {
    width: 100%;
    flex: 0 0 auto;
    margin: 15px 0 40px;
    text-align: center;
    color: #ffffff;
  }

  @media only screen and (max-width: 470px) {
  }
}
</style>
