<template>
  <div class="app-container">
    <el-form ref="form" :model="certification" label-width="100px">
      <el-row>
        <el-col :span="16">
          <el-form-item label="证书id">
            <el-input v-model="certification.id"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="用户名">
            <el-input
              maxlength="10"
              show-word-limit
              v-model="certification.username"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户密码">
            <el-input v-model="certification.userpassword"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="cancel()">撤销证书</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { get, cancelcer } from "@/api/certification";
import pair from '@/utils/keyiv'
import{Encrypt} from '@/utils/aes.js'
import { JSEncrypt } from "jsencrypt";
import { Decrypt } from "@/utils/aes.js";
export default {
  data() {
    return {
      certification: {
        id: "",
        username: "",
        userpassword: "",
      },
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.getInfo(this.$route.params.id);
    }
  },
  methods: {
    getInfo(id) {
      get(id).then((response) => {
        this.certification = response.data.certification;
      });
    },
    cancel() {
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

      var cerstr=JSON.stringify(this.certification)
      var encer=Encrypt(cerstr,key,iv)

      cancelcer(encer,enkey,eniv).then((res) => {
        var re=Decrypt(res.data,key,iv)
        console.log("re"+re);
        if (re=="success cancel"){
        this.$message({
          type: "success",
          message: "撤销成功",
        });
        //location.reload();
        }else if(re=="defeat cancel"){
          this.$message({
          type: "info",
          message: "撤销失败",
        });
        //location.reload();
        }else if(re=="already canceled"){
          this.$message({
          type: "info",
          message: "该证书已在撤销列表中",
        })
        }
      });
      
    },
  },
};
</script>


<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>