<template>
  <div class="app-container">
    <el-button type="primary" @click="handleDownload()" plain>下载</el-button>
    
    <el-table
    :data="CRL"
    style="width: 100%">
      <el-table-column
        label="序号"
        width="180">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>

      <el-table-column
        label="证书序列号"
        width="180" prop="id">
      </el-table-column>

      <el-table-column
        label="撤销日期"
        width="360" prop="canceldate">
      </el-table-column>




  </el-table>
     


  </div>
</template>
<script>
import {getCRL} from '@/api/CRL'
import pair from '@/utils/keyiv'
import{Encrypt} from '@/utils/aes.js'
import { JSEncrypt } from "jsencrypt";
import { Decrypt } from "@/utils/aes.js";
export default {
  data(){
    return {
      CRL:[]
    }
  },
  created(){
    this.getALL()
  },
  methods:{
    getALL(){
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

       getCRL(enkey,eniv).then(response => {
         this.CRL = response.data.list
        for (var i = 0; i < this.CRL.length; i++) {
          this.CRL[i].id = Decrypt(
            this.CRL[i].id,
            key,
            iv
          );
          this.CRL[i].canceldate = Decrypt(
            this.CRL[i].canceldate,
            key,
            iv
          );
        }
       })
    },
    
    handleDownload(){
      window.open("http://localhost:8080/crl/download");
    }
  }
}
</script>