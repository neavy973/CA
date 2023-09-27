<template>
  <div class="dashboard-container">
    <div class="dashboard-text">CA认证中心，{{name}}，欢迎你</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {getToken} from '@/utils/auth'
const token =getToken();
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
  
  
  
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
