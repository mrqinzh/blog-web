<template>
  <div class="tag-container">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="输入标签名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="findByType(dataForm.key)">搜索</el-button>
        <el-button icon="el-icon-plus" type="success" @click="addOrUpdateHandle()">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      style="margin: 10px 0px;"
      :data="dataList"
      v-loading="dataListLoading">
      <el-table-column
        prop="id"
        label="标签编号"
        width="250">
      </el-table-column>
      <el-table-column
        prop="name"
        label="标签名称">
      </el-table-column>
      <el-table-column
        prop="coverImg"
        label="标签图">
        <template slot-scope="scope">
          <el-image :src="scope.row.tagImg" style="width: 50px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalCount"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList()"></add-or-update>
  </div>
</template>

<script>
import { page } from '@/api/tag'
import AddOrUpdate from './tag-add-or-update'

export default {
  components: {
    AddOrUpdate,
  },
  data() {
    return {
      dataForm: {
        key: ''
      },
      dataList: [],
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      condition: '',
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    // 统一分页设置方法
    setPagination(page = 1, size = 10) {
      this.currentPage = page;
      this.pageSize = size;
    },

    // 根据条件查找文章
    findByType(val) {
      this.condition = val;
      this.setPagination();  // 重置分页
      this.getDataList();
    },

    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      page(this.currentPage, this.pageSize, this.condition)
        .then(resp => {
          this.dataList = resp.data.list;
          this.totalCount = resp.data.total;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          this.dataListLoading = false;
        });
    },

    // 每页数
    sizeChangeHandle(val) {
      this.setPagination(1, val);  // 改变每页数量并重置到第一页
      this.getDataList();
    },

    // 当前页
    currentChangeHandle(val) {
      this.currentPage = val;
      this.getDataList();
    },

    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  &-container {
    margin: 30px;
  }
}
</style>
