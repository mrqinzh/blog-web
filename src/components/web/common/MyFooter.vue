<template>
  <div class="myfooter">
    <div class="foot-left">
      <span>网站开始建设时间： {{ resultMap.get('PROJECT_START_TIME') }}</span><br>
      <span>网站首次发布时间： {{ resultMap.get('PROJECT_FIRST_USE_TIME') }}</span><br>
      <span><i class="el-icon-sunny"></i> 网站持续建设中。。。</span><br>
    </div>
    <div class="foot-right">
      <img src="@/assets/img/beian.png" />
      <a style="line-height:20px;color: white" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=50023002020179">
        <!-- 渝公网安备 50023002020179号 -->
        {{ resultMap.get('RECORD_CODE') }}
      </a>
      <br>
      <!-- <a style="color: white;" href="https://beian.miit.gov.cn" target="_blank">渝ICP备2021004455号</a> -->
      <a style="color: white;" href="https://beian.miit.gov.cn" target="_blank">{{ resultMap.get('ICP') }}</a>
      <br>
      <span>@Copyright - Author -> Mr.QinZH at 2021-05-06</span><br>
      <span >QQ: 1552589784</span>
      <span>
        <a style="color: inherit;margin: 0px 8px;" href="https://github.com/mrqinzh" target="_blank"><a-icon type="github" /></a>
        <a style="color: inherit" href="https://account.aliyun.com/login/qr_login.htm" target="_blank"><a-icon type="aliyun" /></a>
      </span>
    </div>
  </div>
</template>

<script>
import { keys, configKeyMap, getConfigByKeys } from '@/api/authority/sys-config'
import { initSystemConfigs } from '@/views/web/common.js'

export default {
  data() {
    return {
      webStartBuild: '2021-04-10 14:10:00',
      webFirstUse: '2021-04-17 16:30:00',
      recordCode: '',
      icp: '',

      resultMap: new Map,
    }
  },
  mounted() {
    this.getConfigData();
  },
  methods: {
    getConfigData() {
      let configKeys = 'PROJECT_START_TIME,PROJECT_FIRST_USE_TIME,RECORD_CODE,ICP';
      initSystemConfigs(configKeys).then(resp => {
        this.resultMap = resp;
      })

    }
  }
}
</script>

<style lang="scss" scoped>

  .myfooter {
    position: absolute;
    width: 100%;
    margin-top: 100px;
    font-family: 楷体;
    font-size: 16px;
    line-height: 2em;
    color: white;
    background-color: #606266;
    height: 200px;
    z-index: 1;
    .foot-left {
      position: relative;
      display: inline-block;
      width: 50%;
      height: 100%;
      padding: 50px 0 0 30%;
    }
    .foot-right {
      float: right;
      height: 100%;
      width: 50%;
      font-size: 14px;
      padding-top: 50px;
    }
  }


</style>
