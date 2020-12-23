<template>
  <div class="myInfo">
    <el-form :model="myInfoForm"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="头像"
                    prop="name">
        <el-avatar class="user-avatar"
                   :size="50"
                   :src="userInfo&&userInfo.userPicture">晓明</el-avatar>
        <el-upload class="upload-avatar"
                   action=""
                   disabled>
          <el-button size="small"
                     type="primary"
                     disabled
                     plain>点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="姓名"
                    prop="desc">
        <el-input v-model="userInfo.userName"
                  :disabled="true">
        </el-input>
      </el-form-item>
      <el-form-item label="医院"
                    prop="desc">
        <el-input v-model="userInfo.compNaming"
                  :disabled="true">
        </el-input>
      </el-form-item>
      <el-form-item label="科室"
                    prop="desc">
        <el-input v-model="userInfo.deptName"
                  :disabled="true">
        </el-input>
      </el-form-item>
      <el-form-item label="联系电话"
                    prop="desc">
        <el-input v-model="userInfo.userPhone"
                  :disabled="true">
        </el-input>
      </el-form-item>
      <el-form-item label="登录账号"
                    prop="desc">
        <el-input v-model="userInfo.userItcode"
                  :disabled="true">
        </el-input>
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="desc">
        <el-input v-model="userInfo.userEmail"
                  :disabled="true">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   style="width:100%"
                   disabled
                   @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MyInfo',
  computed: {
    ...mapGetters(['userInfo'])
  },
  data () {
    return {
      myInfoForm: {}
    }
  },
  methods: {
    submitForm () {

    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.myInfo {
  width: 70%;
  padding-top: 20px;
  .user-avatar {
    background: rgba(0, 160, 233, 0.9);
  }
  .upload-avatar {
    display: inline-block;
    vertical-align: top;
    margin: 10px;
  }
}
</style>
