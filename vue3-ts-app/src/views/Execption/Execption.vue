<template>
  <div class="exception-title">
    <el-button type="primary">异常处理</el-button>
    <el-space>
      <el-button plain>2022年</el-button>
      <el-select>
        <el-option v-for="item in 12" :key="item" :value="item" :label="item + '月'" />
      </el-select>
    </el-space>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.exception-title {
}
</style>
