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
    <el-table :data="pageCheckList" border style="width: 100%">
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
      <el-table-column prop="approvername" label="操作" width="180">
        <template #default="scope">
          <el-button @click="handlePutApply(scope.row._id, '已通过' )" type="success" circle size="small" icon="check"></el-button>
          <el-button @click="handlePutApply(scope.row._id, '未通过' )" type="danger" circle size="small" icon="close"></el-button>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="180" />
    </el-table>
    <el-pagination small background layout="prev,pager,next" :total="checkList.length" :page-size="pageSize" @current-change="handleChange" />
  </div>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from 'vue'
import stores, {useStore} from "@/stores";
import {Timer} from "@element-plus/icons-vue";
import _ from "lodash";
import {ElMessage} from "element-plus";

const defaltType = '全部'
const approverType = ref(defaltType)
const searchWord = ref('')
const pageSize = ref(2)
const pageCurrent = ref(1)

const store = useStore()
const usersInfos = computed(() => store.state.users.infos)
const checkList = computed(() => store.state.check.checkList)
const pageCheckList = computed(() => checkList.value.slice((pageCurrent.value - 1)*pageSize.value,pageCurrent.value*pageSize.value))

const handlePutApply = (_id:string,state: '已通过' | '未通过') => {
  store.dispatch('check/putApply',{_id,state}).then(async (res) => {
    if (res.data.errcode === 0) {
        const res = await stores.dispatch('check/getApply',{approverid:usersInfos.value._id})
        if (res.data.errcode === 0) {
          stores.commit('check/updateCheck', res.data.rets)
        }
        ElMessage.success('审批成功')
    }
  })
}

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
