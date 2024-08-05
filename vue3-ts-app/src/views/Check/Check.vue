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
    <el-table :data="pageApplyList" border style="width: 100%">
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
    <el-pagination small background layout="prev,pager,next" :total="applyList.length" :page-size="pageSize" @current-change="handleChange" />
  </div>
  <!--弹框-->
  <el-dialog
      v-model="dialogVisible"
      title="添加审批"
      width="500"
      :before-close="handleClose"
  >
    <el-form
        ref="ruleFormRef"
        style="max-width: 400px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="80"
    >
      <el-form-item label="审批人" prop="approvername">
        <el-select v-model="ruleForm.approvername" placeholder="请选择审批人">
          <el-option v-for="item in approver" :value="item.name" :label="item.name" :key="item._id" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批事由" prop="reason">
        <el-select v-model="ruleForm.reason" placeholder="请选择审批事由">
          <el-option value="年假" label="年假" ></el-option>
          <el-option value="病假" label="病假" ></el-option>
          <el-option value="事假" label="事假" ></el-option>
          <el-option value="外出" label="外出" ></el-option>
          <el-option value="补签卡" label="补签卡" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间" prop="time">
        <el-date-picker
            v-model="ruleForm.time"
            type="datetimerange"
            start-placeholder="起始时间"
            end-placeholder="结束时间"
        />
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="ruleForm.note" type="textarea" :autosize="{minRows: 3, maxRows: 6}" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="resetForm(ruleFormRef)" auto-insert-space>
        重置
      </el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)" auto-insert-space>
        提交
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from 'vue'
import {useStore} from "@/stores";
import {Timer} from "@element-plus/icons-vue";
import type {DateModelType, FormInstance} from "element-plus";
import {ElMessage, type FormRules} from "element-plus";
import moment from "moment";

interface ApplyList {
  applicantid: string,
  applicantname: string,
  approverid: string,
  approvername: string,
  note: string,
  reason: string,
  time: [DateModelType, DateModelType]
}

const store = useStore()
const defaltType = '全部'
const approverType = ref(defaltType)
const searchWord = ref('')
const checkList = computed(() => store.state.check.applyList.filter((v)=> (v.state === approverType.value || defaltType === approverType.value) && v.note.includes(searchWord.value)))
const pageSize = ref(2)
const pageCurrent = ref(1)
const pageApplyList = computed(() => applyList.value.slice((pageCurrent.value - 1)*pageSize.value,pageCurrent.value*pageSize.value))

const handleChange = (value:number) => {
  pageCurrent.value = value
}

const usersInfos = computed(() => store.state.users.infos)
const approver = computed(() => usersInfos.value.approver)
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      ruleForm.applicantid = usersInfos.value._id
      ruleForm.applicantname = usersInfos.value.name
      ruleForm.approverid = (approver.value.find((v)=>v.name === ruleForm.approvername) as { [index: string]: unknown })._id as string
      console.log(ruleForm.approverid)
      ruleForm.time[0] = moment(ruleForm.time[0]).format('YYYY-MM-DD hh:mm:ss')
      ruleForm.time[1] = moment(ruleForm.time[1]).format('YYYY-MM-DD hh:mm:ss')
      store.dispatch('check/postApply',ruleForm).then(res => {
        if (res.data.errcode === 0){
          store.dispatch('check/getApply', {applicantid: usersInfos.value._id}).then((res)=> {
            if (res.data.errcode === 0) {
              store.commit('check/updateApply',res.data.rets)
            }
          })
          ElMessage.success('审批成功')
          resetForm(ruleFormRef.value)
          handleClose()
        }
      })
    } else {
      console.log('error submit!')
    }
  })
}
// 222
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  handleClose()
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
