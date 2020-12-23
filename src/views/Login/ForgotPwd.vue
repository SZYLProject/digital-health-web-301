<template>
  <div class="pwd-container">
    <div class="app-header">
      <login-header>header</login-header>
    </div>
    <div class="login-main">
      <!-- 找回密码 -->
      <el-form v-if="!expireCode"
               ref="emailForm"
               :model="emailForm"
               :rules="emailRules"
               class="login-form"
               autocomplete="on"
               label-position="left">
        <div class="title-container">
          <h3 class="title">找回密码</h3>
        </div>
        <el-form-item prop="email">
          <el-input ref="email"
                    v-model="emailForm.email"
                    placeholder="请输入您的邮箱"
                    name="email"
                    type="text" />
        </el-form-item>

        <el-button :loading="loading"
                   type="primary"
                   style="width:100%;"
                   @click.native.prevent="sendEmail">发送验证邮箱</el-button>

        <div style="position:relative;margin-top:35px">
          <div class="thirdparty-button">
            <router-link to="/login">密码登录</router-link>
          </div>
        </div>
      </el-form>
      <!-- 重制密码 -->
      <el-form v-else
               ref="passForm"
               :model="passForm"
               :rules="passRules"
               class="login-form"
               autocomplete="off"
               label-position="left">
        <div class="title-container">
          <h3 class="title">重制密码</h3>
        </div>

        <el-form-item prop="userPassword">
          <el-input :key="passwordType"
                    ref="password"
                    v-model="passForm.userPassword"
                    :type="passwordType"
                    placeholder="设置6位以上数字、字母组合的密码"
                    name="password"
                    tabindex="2"
                    autocomplete="off"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false" />
          <span class="show-pwd"
                @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'xianshi1' : 'yincang'" />
          </span>
        </el-form-item>

        <el-form-item prop="checkPass">
          <el-input :key="passwordType"
                    ref="password"
                    v-model="passForm.checkPass"
                    :type="passwordType"
                    placeholder="再次输入新密码"
                    name="password"
                    tabindex="2"
                    autocomplete="off"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false" />
          <span class="show-pwd"
                @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'xianshi1' : 'yincang'" />
          </span>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button :loading="loading"
                       type="primary"
                       style="width:100%;"
                       @click.native.prevent="rePassWord">完 成</el-button>
          </el-col>
          <el-col :span="12">
            <el-button :loading="loading"
                       type="primary"
                       plain
                       style="width:100%;"
                       @click.native.prevent="cancelPassWord">取 消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from './components/Footer'
import LoginHeader from './components/LoginHeader'
import { checkExpire, findPwdByEmail, reSetPassWord } from '@/api/user'
import { validPassword } from '@/utils/validate'
export default {
  name: 'ForgotPwd',
  components: {
    LoginHeader,
    Footer
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else if (!validPassword(value)) {
        callback(new Error('密码必须是6位以上数字、字母组合'))
      } else {
        if (this.passForm.checkPass !== '') {
          this.$refs.passForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passForm.userPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      expireCode: this.$route.query.expire,
      emailForm: {
        email: ''
      },
      emailRules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]
      },
      loading: false,
      passForm: {
        userPassword: '',
        checkPass: ''
      },
      passRules: {
        userPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      passwordType: 'password'
    }
  },
  created () {
    if (this.expireCode) {
      this.getTab()
    }
  },
  destroyed () {
  },
  methods: {
    // 查看是否过期 判断显示哪个form
    getTab () {
      checkExpire(this.expireCode)
        .then(res => {
          console.log(res)
        })
        .catch((res) => {
          this.$router.push({ path: '/forgotPassword' })
          this.expireCode = ''
        })
    },
    // 发送邮箱
    sendEmail () {
      this.$refs.emailForm.validate(valid => {
        if (valid) {
          this.loading = true
          findPwdByEmail(this.emailForm.email)
            .then(res => {
              this.loading = false
              this.$alert('已将验证邮件发送到您输入的邮箱，请按邮件内容完成身份验证，重置登录密码。', '邮件发送成功', {
                confirmButtonText: '知道了'
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
    // 重置密码
    rePassWord () {
      this.$refs.passForm.validate(valid => {
        if (valid) {
          this.loading = true
          reSetPassWord(this.passForm.userPassword, this.expireCode)
            .then(res => {
              console.log(res)
              this.$router.push({ path: '/login' })
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
    cancelPassWord () {
      this.$router.push({ path: '/forgotPassword' })
      this.expireCode = ''
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
  .pwd-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.pwd-container {
  .el-input {
    display: inline-block;
    // height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      // height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgb(255, 255, 255);
    border-radius: 5px;
    color: #212121;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;

.pwd-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: #eff8fa;
  overflow: hidden;
  .app-header {
    box-shadow: 0px 2px 2px 0px rgba(15, 92, 131, 0.3);
  }
  .login-main {
    flex: 1 0 auto;
  }
  .footer {
    width: 100%;
    flex: 0 0 auto;
    margin: 15px 0 40px;
    text-align: center;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #212121;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
