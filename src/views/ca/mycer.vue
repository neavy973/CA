<template>
  <div class="app-container">
    <el-table :data="certification" style="width: 100%">
      <el-table-column label="序号" width="180">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="证书序列号" width="180" prop="id">
      </el-table-column>

      <el-table-column label="公司名称" width="150" prop="company">
      </el-table-column>

      <el-table-column label="经办人姓名" width="150" prop="hostname">
      </el-table-column>

      <el-table-column label="经办人电话" width="150" prop="hosttelephone">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { add, get, update } from "@/api/certification";
import { getmycer } from "@/api/certification";
import { getToken } from "@/utils/auth";
import pair from "@/utils/keyiv";
import { Encrypt } from "@/utils/aes.js";
import { JSEncrypt } from "jsencrypt";
import { Decrypt } from "@/utils/aes.js";
const token = getToken();
export default {
  data() {
    return {
      certification: [],
    };
  },
  created() {
    this.getALL();
  },
  methods: {
    getALL() {
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
      var enusername = Encrypt(token, key, iv);
      console.log("key" + key);
      console.log("iv" + iv);
      console.log("enusername" + enusername);
      getmycer(enusername, enkey, eniv).then((response) => {
        this.certification = response.data.list;
        for (var i = 0; i < this.certification.length; i++) {
          this.certification[i].company = Decrypt(
            this.certification[i].company,
            key,
            iv
          );
          this.certification[i].hostname = Decrypt(
            this.certification[i].hostname,
            key,
            iv
          );

          this.certification[i].hosttelephone = Decrypt(
            this.certification[i].hosttelephone,
            key,
            iv
          );
        }
      });
    },
    // getmycer(token).then(res=>{
    //     this.certification=response.data.list
    // })
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