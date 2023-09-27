<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="证书id">
        <el-input v-model="certification.id"></el-input>
      </el-form-item>
      <el-button type="primary" @click="searchcer()" plain>查询证书</el-button>
      <el-button type="primary" @click="handleDownload()" plain
        >下载证书</el-button
      >
    </el-form>
    <br />

    <el-form ref="form" :model="certification" label-width="100px" v-if="show">
      <el-row>
        <el-col :span="16">
          <el-form-item label="证书id">
            <el-input
              maxlength="30"
              :disabled="true"
              v-model="certification.id"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="公司名称">
            <el-input
              maxlength="30"
              :disabled="true"
              v-model="certification.company"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="经办人姓名">
            <el-input
              maxlength="10"
              show-word-limit
              :disabled="true"
              v-model="certification.hostname"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经办人电话">
            <el-input
              v-model="certification.hosttelephone"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="公钥">
            <el-input
              type="textarea"
              v-model="certification.publickey"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getcer } from "@/api/certification";
import pair from '@/utils/keyiv'
import{Encrypt} from '@/utils/aes.js'
import { JSEncrypt } from "jsencrypt";
import { Decrypt } from "@/utils/aes.js";
export default {
  data() {
    return {
      certification: {
        id: '',
        company: "",
        hostname: "",
        hosttelephone: "",
        publickey: "",
      },
      show: 1,
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.getInfo(this.$route.params.id);
    }
  },
  methods: {
    searchcer() {
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

      var idstr=this.certification.id
      console.log('id'+idstr)
      var enid=Encrypt(this.certification.id,key,iv)

      getcer(enid,enkey,eniv).then((res) => {
       
        var re=Decrypt(res.data.re, key, iv)
        if (re=="success") {
          
          this.certification.id = Decrypt(res.data.id, key, iv);

          this.certification.company = Decrypt(
            res.data.company,
            key,
            iv
          );
          this.certification.hostname = Decrypt(
            res.data.hostname,
            key,
            iv
          );

          this.certification.hosttelephone = Decrypt(
            res.data.hosttelephone,
            key,
            iv
          );

          this.certification.publickey = Decrypt(
            res.data.publickey,
            key,
            iv
          );

          this.$message({
            type: "success",
            message: "查询成功",
          });
        } else if(re=="c is invalid"){
          this.$message({
            type: "info",
            message: "查询失败,该证书已注销",
          });
          //location.reload()
        }else if(re=="c is null"){
          this.$message({
            type: "info",
            message: "查询失败,无此证书",
          });
        }
      });
    },
    handleDownload() {
      window.open(
        "http://localhost:8080/cer/download?id=" + this.certification.id
      );
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