<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Regisiter Form</h3>
      </div>

      <el-form-item prop="name">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="name"
          v-model="regisiterForm.name"
          placeholder="name"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          v-model="regisiterForm.password"
          placeholder="password"
          name="password"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

          <el-form-item prop="telephone">
        <span class="svg-container">
          <svg-icon icon-class="telephone" />
        </span>
        <el-input
          ref="telephone"
          v-model="regisiterForm.telephone"
          placeholder="telephone"
          name="telephone"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-button type="primary"  @click="handlRegisiter()" >注册</el-button>

      <div class="tips">
        <span style="margin-right:20px;">name: admin</span>
        <span> password: any</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validname } from '@/utils/validate'
import {regisiter} from '@/api/user'
import pair from '@/utils/keyiv'
import{Encrypt} from '@/utils/aes.js'
import { JSEncrypt } from "jsencrypt";
import { Decrypt } from "@/utils/aes.js";
export default {
  name: 'Login',
  data() {
    return {
      regisiterForm: {
        name: '',
        password: '',
        telephone:'',
      },
      
    }
  },
  
  methods: {
    
     handlRegisiter(){

       var key = pair.key;
      console.log("key:" + key);
      var iv = pair.iv;
      console.log("iv:" + iv);
      var pubkey =
        "-----BEGIN PUBLIC KEY-----" +
        "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCNV7Hz28qwLAEvh+VHdLMFmTu9LtlOsbYZwrWQCUSzRI0OcDI1QgUZzlNKT18WcpUxdTHO6PmBSSy6rnZzkoTVBHipJu2bqn03wou0xnBp0zUzQytQNRYNNPClope5sP54OkefMp6f4ZTBDbK84sjolyDUWd0ruG8t4pa7WuFw+wIDAQAB" +
        "-----END PUBLIC KEY-----";
      var encryptor = new JSEncrypt();
      encryptor.setPublicKey(pubkey); //设置公钥
      var enkey = encryptor.encrypt(key);
      var eniv = encryptor.encrypt(iv);

      var formstr=JSON.stringify(this.regisiterForm)
      var enform=Encrypt(formstr,key,iv)

         regisiter(enform,enkey,eniv).then(res=>{
           var re=Decrypt(res.data.status,key,iv)
             if(re=="success")
             {
               this.$message({
                type:'success',
                message:"注册成功"
                })
                this.$router.push("/login")
             }else{
               this.$message({
                type:'info',
                message:"注册失败"
                })
                location.reload()
             }
         })
     }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

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
      color: $light_gray;
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
}
</style>
