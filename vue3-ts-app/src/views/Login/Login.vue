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
  </div>
</template>

<script setup lang="ts">
// import { useStore } from '@/stores'
// const store = useStore()
// store.dispatch('users/login').then((res) => {
//   console.log(res.data)
// })
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
  }
}
</style>
