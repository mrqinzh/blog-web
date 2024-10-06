<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>登录日志</span>
    </div>
    <div class="text item">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="ip" label="IP" />
        <el-table-column prop="browser" label="浏览器" />
        <el-table-column prop="device" label="设备" />
        <el-table-column prop="os" label="OS" />
        <el-table-column prop="userId" label="用户ID" />
      </el-table>
    </div>
  </el-card>
</template>
<script>
import { loginPage } from '@/api/log'
export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      loginPage(1, 10, '').then(resp => {
        this.tableData = resp.data.list
      })
    }
  }
}
</script>
<style scoped>

</style>
