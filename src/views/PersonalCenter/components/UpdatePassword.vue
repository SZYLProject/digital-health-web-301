<template>
  <div class="updatePassword">
    <el-form ref="passForm"
             label-width="100px"
             :model="passForm"
             :rules="passRules"
             autocomplete="off">
      <el-form-item label="原密码"
                    prop="passwordOld">
        <el-input :key="passwordType"
                  ref="password"
                  v-model="passForm.passwordOld"
                  :type="passwordType"
                  placeholder="请输入原密码"
                  name="password"
                  tabindex="2"
                  autocomplete="off"
                  show-password
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false" />
      </el-form-item>
      <el-form-item label="新密码"
                    prop="passwordNew">
        <el-input :key="passwordType"
                  ref="password"
                  v-model="passForm.passwordNew"
                  :type="passwordType"
                  placeholder="设置6位以上数字、字母组合的密码"
                  name="password"
                  tabindex="2"
                  autocomplete="off"
                  show-password
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false" />
      </el-form-item>

      <el-form-item label="确认新密码"
                    prop="checkPass">
        <el-input :key="passwordType"
                  ref="password"
                  v-model="passForm.checkPass"
                  :type="passwordType"
                  placeholder="再次输入新密码"
                  name="password"
                  tabindex="2"
                  autocomplete="off"
                  show-password
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading"
                   type="primary"
                   style="width:100%"
                   @click="submitForm">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { updatePassword } from '@/api/user'
import { validPassword } from '@/utils/validate'
import { mapGetters } from 'vuex'
export default {
  name: 'UpdatePassword',
  computed: {
    ...mapGetters(['userInfo'])
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
      } else if (value !== this.passForm.passwordNew) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      passForm: {
        passwordOld: '',
        passwordNew: '',
        checkPass: ''
      },
      passRules: {
        passwordOld: [
          { required: true, trigger: 'blur', message: '请输入原密码' }
        ],
        passwordNew: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      loading: false
    }
  },
  methods: {
    // 修改密码
    submitForm () {
      this.$refs.passForm.validate(valid => {
        if (valid) {
          this.loading = true
          const data = {
            userItCode: this.userInfo.userItcode,
            passwordOld: this.passForm.passwordOld,
            passwordNew: this.passForm.passwordNew
          }
          updatePassword(data)
            .then(res => {
              this.$store.dispatch('user/logout').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
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
    checkCapslock (e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.updatePassword {
  width: 70%;
  padding-top: 20px;
}
</style>
