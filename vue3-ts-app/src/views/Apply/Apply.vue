<template>
  <div class="apply-title">
    <el-button type="primary" @click="handleOpen">添加审批</el-button>
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
  <div class="apply-table">
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
      <el-table-column prop="approvername" label="审批人" width="180" />
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
      <el-form-item label="审批人" prop="approvalname">
        <el-select v-model="ruleForm.approvalname" placeholder="请选择审批人">
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
import {ElMessage, FormRules} from "element-plus";

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
const applyList = computed(() => store.state.check.applyList.filter((v)=> (v.state === approverType.value || defaltType === approverType.value) && v.note.includes(searchWord.value)))
const pageSize = ref(2)
const pageCurrent = ref(1)
const pageApplyList = computed(() => applyList.value.slice((pageCurrent.value - 1)*pageSize.value,pageCurrent.value*pageSize.value))

const handleChange = (value:number) => {
  pageCurrent.value = value
}
const dialogVisible = ref(false)
const handleOpen = () => {
  dialogVisible.value = true
}
const handleClose = () => {
  dialogVisible.value = false
}
const validateTime =(rule: unknown, value: [DateModelType, DateModelType], callback: (arg?:Error) =>void) => {
  if (!value[0] && !value[1]) {
    return callback(new Error('请选择审批时间'))
  } else {
    callback()
  }
}
// 验证规则
const rules = reactive<FormRules>({
  approvalname: [{ required: true, message: '请选择审批人',trigger: 'blur' }],
  time: [{ validator: validateTime, message: '请选择审批时间',trigger: 'blur' }],
  note: [{ required: true, message: '请审批备注',trigger: 'blur' }],
  reason: [
    {
      required: true,
      message: '请选择审批原因',
      trigger: 'blur'
    },
  ]
})
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<ApplyList>({
  applicantid: '',
  applicantname: '',
  approverid:  '',
  approvername:  '',
  note:  '',
  reason:  '',
  time: ['', '']
})
const usersInfos = computed(() => store.state.users.infos)
const approver = computed(() => usersInfos.value.approver)
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(ruleForm,333)
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  handleClose()
}
</script>

<style lang="scss" scoped>
.apply-title {
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
.apply-table{
  margin: 10px;
  .el-pagination{
    float: right;
    margin: 10px;
  }
}

</style>
