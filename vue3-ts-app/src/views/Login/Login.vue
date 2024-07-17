<template>
  <div class="login">
    <h2>login</h2>
  </div>
</template>

<script setup lang="ts">
// import http from '@/utils/http'
// http
//   .post('/user/login', {
//     email: 'huangrong@imooc.com',
//     pass: 'huangrong'
//   })
//   .then((res) => {
//     console.log(res, 'res')
//   })

import { useStore } from '@/stores'
const store = useStore()
store.dispatch('users/login').then((res) => {
  console.log(res.data)
})
</script>

<style lang="scss" scoped>
.login {
}
</style>
