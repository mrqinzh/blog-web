<template>
  <div class="recent-comment">
    <span style="font-size: 18px;">
      <i class="el-icon-hot-water" style="color: #409EFF"></i>
      最新评论
    </span>
    <div class="recent-comment-body">
      <li v-for="(item, index) in commentList" :key="index" style="margin: 5px 0;">
        <a-space>
          <el-avatar size="small" :src="item.avatar"></el-avatar>
          <span style="font-size: 16px;color: #303133">{{ item.nickname }}</span>
          <span>{{ item.createTime }}</span>
        </a-space>
        <br>
        <span><i class="el-icon-chat-dot-square"></i> {{ item.content }}</span>
        <a-divider dashed v-show="index < commentList.length-1" />
      </li>
    </div>
  </div>
</template>

<script>
import { getAllList } from '@/api/comment'
export default {
  data() {
    return {
      commentList: []
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      let param = {
        currentPage: 1,
        pageSize: 5,
        orderBy: 'comment_time desc'
      }
      getAllList(param).then(resp => {
        console.log(resp);
        this.commentList = resp.data;
      })
    }
  }
}
</script>

<style lang="scss">
  .recent-comment {
    background-color: white;
    margin: 30px 0px;
    padding: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .recent-comment-body {
      padding: 0 5px;
      margin-top: 10px;
      .ant-divider {
        margin: 0;
      }
      li {
        list-style: none;
      }
    }

  }

</style>
