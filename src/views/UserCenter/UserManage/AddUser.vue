<template>
  <div class="myinfo-page">
    <UserCenterHeader title="新增用户" :showOption="false" :canSearch="false"></UserCenterHeader>
    <el-form ref="form" :model="form" class="user-form"  label-width="110px">
      <el-form-item label="单位名称" prop="department">
        <el-input type="text" v-model="form.department"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="text" v-model="form.checkpwd"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
          <el-radio label="保密"></el-radio>
        </el-radio-group>
      </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input type="text" v-model="form.contact"></el-input>
        </el-form-item>
      <el-form-item label="邮箱">
        <el-input type="text" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input type="text" v-model="form.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button @click="submitForm" size="mini" type="primary" class="save-btn">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UserCenterHeader from "@/views/UserCenter/components/UserCenterHeader.vue";
import { addUserApi} from "@/api/UserManage.js"
export default {
  name: "addUser",
  components: { UserCenterHeader },
  data() {
    return {
      form: {
        department: '',
        pwd: '',
        checkpwd: '',
        sex: '',
        contact: '',
        email: '',
        phoneNumber: ''
      },
      userInfo: {},
      sexMap: new Map([['男', 0], ['女', 1], ['保密', 2]])
    };
  },
  methods: {
    submitForm: function(){
      if (this.form.checkpwd !== this.form.pwd) {
        this.$message({
          type: 'error',
          message: '两次密码不一致'
        })
      } else {
        this.$confirm('是否确认新增?', '提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'waring'
        }).then(async () =>{
          this.userInfo.username = this.form.department
          this.userInfo.realName = this.form.contact
          this.userInfo.email = this.form.email
          this.userInfo.mobile = this.form.phoneNumber
          this.userInfo.password = this.form.pwd
          this.userInfo.comfirmPassword = this.form.checkpwd
          this.userInfo.gender = this.sexMap.get(this.form.sex)
          var params = this.userInfo
          params.deptId = "1194089865817673729",
          params.status = "1",
          params.createDate = "2020-04-03 11:53:05",
          params.superAdmin = 0,
          params.roleIdList = ["1166993120321306625", "1231863517111726081"],
          params.deptName = "贵州省"
          await addUserApi(JSON.stringify(params))
          this.$message({
              type: 'success',
              message: '新增成功!'
          });
          this.$router.push({name:'userManage'})
        }).catch(() => {
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.myinfo-page{
  background-color: white;
  .user-form {
    @include border-common;
    border-top: none;
    padding: 4% 10%;
    .el-input{
      padding-left: 20px;
    }
    .save-btn {
      padding: 7px 25px;
    }
    /deep/label{font-size: 16px;color: #4f5b72}
    /deep/.el-form-item__content{text-align: left}
    /deep/.el-radio-group{margin-left: 20px}
    /deep/.el-radio__label{font-size: 16px}
    /deep/.el-radio__inner{width: 18px;height: 18px}
    /deep/.btn .el-form-item__content{text-align: center;}
    /deep/.btn .el-form-item__content button{width: 100px;height: 36px;font-size: 16px;border-radius: 6px}
  }
}
</style>
