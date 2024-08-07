<template>
  <div class="check-title">
    <el-space>
      <el-input v-model="searchWord" placeholder="请输入搜索关键词" />
      <el-button type="primary" icon="search" >搜索</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-radio-group v-model="approverType">
        <el-radio-button label="全部" />
        <el-radio-button label="待审批" />
        <el-radio-button label="已通过" />
        <el-radio-button label="未通过" />
      </el-radio-group>
    </el-space>
  </div>
  <div class="check-table">
    <el-table border style="width: 100%">
      <el-table-column prop="applicantname" label="申请人" width="180" />
      <el-table-column prop="reason" label="审批事由" width="180" />
      <el-table-column prop="time" label="时间">
        <template #default="scope">
          <div style="display: flex;align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{scope.row.time.join(' - ')}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注" />
      <el-table-column prop="approvername" label="操作" width="180" />
      <el-table-column prop="state" label="状态" width="180" />
    </el-table>
    <el-pagination small background layout="prev,pager,next" :total="1" :page-size="pageSize" @current-change="handleChange" />
  </div>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from 'vue'
import {useStore} from "@/stores";
import {Timer} from "@element-plus/icons-vue";


const store = useStore()
const defaltType = '全部'
const approverType = ref(defaltType)
const searchWord = ref('')
const pageSize = ref(2)
const pageCurrent = ref(1)

const handleChange = (value:number) => {
  pageCurrent.value = value
}

</script>

<style lang="scss" scoped>
.check-title {
  margin: 20px;
  float: right;
}
.check-table{
  margin: 10px;
  .el-pagination{
    float: right;
    margin: 10px;
  }
}

</style>
