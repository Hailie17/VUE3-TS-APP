<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path" :value="item.path">{{
      item.meta.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()

const breadcrumb = computed(() => route.matched)
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  background: #fff;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 30px;
}
</style>
