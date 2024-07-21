<template>
  <div class="login">
    <div class="header">
      <span class="header-logo">
        <i class="iconfont icon-vue"></i>
        <i class="iconfont icon-icon-test"></i>
        <i class="iconfont icon-typescript"></i>
      </span>
      <div class="header-title">在线考勤系统</div>
    </div>
    <div class="desc">零基础入门到进阶，掌握三大热门技术系统</div>
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="main"
    >
      <el-form-item label="Email" prop="email">
        <el-input v-model="ruleForm.email" type="text" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="submitForm(ruleFormRef)" auto-insert-space>
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <div class="users">
      <el-row :gutter="20">
        <el-col v-for="item in testUsers" :key="item.email" :span="12">
          <h3>测试账号，<el-button @click="autoLogin(item)">一键登录</el-button></h3>
          <p>邮箱：{{ item.email }}</p>
          <p>密码：{{ item.pass }}</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useStore } from '@/stores'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

interface User {
  email: string
  pass: string
}
// 1
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<User>({
  pass: '',
  email: ''
})

const testUsers = [
  {
    email: 'huangrong@imooc.com',
    pass: 'huangrong'
  },
  {
    email: 'hongqigong@imooc.com',
    pass: 'hongqigong'
  }
]
//校验规则
const rules = reactive<FormRules>({
  pass: [{ required: true, message: 'pass is required' }],
  email: [
    {
      required: true,
      message: 'Please input email address',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change']
    }
  ]
})

const submitForm = (formEl: FormInstance | undefined) => {
  console.log(formEl, 333)

  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      store.dispatch('users/login', ruleForm).then((res) => {
        if (res.data.errcode === 0) {
          store.commit('users/updateToken', res.data.data.token)
          ElMessage.success('登录成功')
          router.push('/')
        } else if (res.data.errcode === -1) {
          ElMessage.error(res.data.errmsg)
        } else {
          alert('登录失败')
        }
      })
    } else {
      console.log('error submit!')
    }
  })
}

const autoLogin = (user: User) => {
  ruleForm.email = user.email
  ruleForm.pass = user.pass
  submitForm(formRef.value)
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/login-bg.svg') no-repeat;
  background-size: 100%;
  .header {
    height: 44px;
    line-height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 34px;
    padding-top: 100px;
    .header-logo {
      .icon-vue,
      .icon-icon-test,
      .icon-typescript {
        margin-right: 5px;
        font-size: inherit;
      }
      .icon-vue {
        color: green;
      }
      .icon-icon-test {
        color: #deb887;
      }
      .icon-typescript {
        color: blue;
      }
    }
    .header-title {
      margin-left: 30px;
      font-weight: 700;
      font-size: 30px;
    }
  }
  .desc {
    text-align: center;
    padding-top: 30px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
  }
  .main {
    width: 500px;
    margin: 0 auto;
    padding-top: 50px;
  }
  .users {
    width: 500px;
    margin: 60px auto;
    color: rgba(0, 0, 0, 0.65);
    h3 {
      font-size: 16px;
    }
    p {
      margin: 10px;
    }
  }
}
</style>
