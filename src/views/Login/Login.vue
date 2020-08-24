<template @keyup.enter="login">
  <div class="login-page">
    <div class="content">
      <div class="content-title">公共数据资源契约式开放平台</div>
      <div class="content-form">
        <div class="content-form-title">用户登录</div>
        <form class="content-form-form">
          <div class="username">
            <i class="el-icon-user"></i>
            <input type="text" placeholder="请输入用户名" v-model="name" />
          </div>
          <div class="password">
            <i class="el-icon-lock"></i>
            <input :type="hideFlag" placeholder="请输入密码" v-model="password" />
            <div style="cursor: pointer" @click="hide = !hide">
              <img v-if="!hide" src="@/assets/usercenter/cipher_icon.png" />
              <img v-if="hide" src="@/assets/usercenter/show_icon.png" />
            </div>
          </div>
          <div class="button" @click="login" @keyup.13.native="submit" v-if="!isLogin">登录</div>
          <div class="button" v-else>登录中...</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getLoginApi } from "@/api/Login.js"
import { setToken, setUserName } from "@/utils/cookies.js";

export default {
    data(){
        return {
            name: '',
            password: '',
            hide: false,
            isLogin: false
        }
    },
    computed: {
        hideFlag: function(){
            return this.hide === false ? "password": "text"
        }
    },
    created() {
      var _this = this;
      document.onkeydown = function(e) {
        let key = window.event.keyCode;
        if (key == 13) {
          _this.submit();
        }
      }
    },
    methods: {
        //回车登录
        submit() {
          this.login()
        },
        //登录
        async login(){
            if (this.name === "" || this.password === ""){
                this.$message({
                    type: 'error',
                    message: '用户名密码不能为空'
                });
            } else{
                var params = {
                    "captacha": "11",
                    "password": this.password,
                    "username": this.name
                }
                const res = await getLoginApi(JSON.stringify(params))
                setToken(res.token);
                setUserName(this.name);
                this.isLogin = true
                this.$router.push({
                    name:'home'
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./Login.scss";
</style>