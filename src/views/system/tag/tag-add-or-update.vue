<template>
  <el-dialog
    :title="dataForm.id == 0 ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="标签名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="标签名称"></el-input>
    </el-form-item>
    <el-form-item label="标签图" prop="coverImg">

      <img-upload :img="dataForm.coverImg" @uploadimg="tagImgUpload" />

    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getById, add, update } from '@/api/tag'
import ImgUpload from '@/components/web/upload/ImgUpload.vue'

export default {
  components: { ImgUpload },
  data() {
    return {
      visible: false,
      dataForm: {
        id: '',
        name: '',
        coverImg: '',
      }
    };
  },
  methods: {
    // 图片上传回调
    tagImgUpload(resp) {
      this.dataForm.coverImg = resp.data;
    },

    // 初始化表单数据
    init(id) {
      this.visible = true;
      this.dataForm.id = id || 0;

      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields(); // 重置表单
        if (this.dataForm.id) {
          this.loadTagData(this.dataForm.id); // 加载已有数据
        }
      });
    },

    // 获取标签数据
    loadTagData(id) {
      getById(id)
        .then(resp => {
          this.dataForm = resp.data;
        })
        .catch(error => {
          console.error("Error loading tag data:", error);
          this.$message.error("加载标签数据失败");
        });
    },

    // 表单提交
    dataFormSubmit() {
      if (this.dataForm.coverImg === '') {
        this.$message.warning("标签图必须上传");
        return;
      }

      const param = {
        id: this.dataForm.id,
        name: this.dataForm.name,
        coverImg: this.dataForm.coverImg,
      };

      const request = this.dataForm.id ? update(param) : add(param); // 根据是否有 ID 来区分是新增还是更新
      request
        .then(resp => {
          if (resp.success) {
            this.$message.success("操作成功");
            this.$emit('refreshDataList'); // 通知父组件刷新列表
            this.visible = false;
          }
        })
        .catch(error => {
          console.error("Error during form submission:", error);
          this.$message.error("操作失败，请稍后再试");
        });
    }
  }
};
</script>
