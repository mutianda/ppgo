<template>
    <div class="login-page">
      <div class="title">欢迎来到皮皮购</div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="login-form">
        <el-form-item  prop="phoneNum">
          <el-input  v-model="ruleForm.phoneNum" autocomplete="off"  prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item  prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"  prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
<!--        <el-form-item label="确认密码" prop="checkPass">-->
<!--          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="年龄" prop="age">-->
<!--          <el-input v-model.number="ruleForm.age"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button type="success" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      ruleForm: {
        pass: '',
        phoneNum: ''
      },
      rules: {
        phoneNum: [
          { required: true, message: '请输入账户', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
        // checkPass: [
        //   { validator: validatePass2, trigger: 'blur' }
        // ],
        // age: [
        //   { validator: checkAge, trigger: 'blur' }
        // ]
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    submitForm (formName) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.phoneNum === 'admin' && this.ruleForm.pass === '123') {
            this.setUserInfo(this.ruleForm).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '登录成功,欢迎您' + this.ruleForm.phoneNum
                })
                that.$router.push('/')
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: '账号或密码错误'
            })
          }
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
  .login-page{
    width: 100%;
    height: 100%;
    background-color: #00a0dc;
    .title{
      text-align: center;
      color: #fff;
      font-size: 30px;
      font-family: 仿宋;
      line-height: 250px;
    }
    .login-form{
      width: 60%;
      position: absolute;
      top:30%;
      left: 20%;
    }
  }

</style>
