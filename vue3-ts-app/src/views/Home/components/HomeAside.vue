<template>
  <el-menu default-active="1-1" class="el-menu-vertical-demo">
    <el-sub-menu v-for="item in menus" :index="item.path" :key="item.path">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group title="Group One">
        <el-menu-item index="1-1"
          ><el-icon><location /></el-icon>item one</el-menu-item
        >
        <el-menu-item index="1-2"
          ><el-icon><location /></el-icon>item two</el-menu-item
        >
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3"
          ><el-icon><location /></el-icon>item three</el-menu-item
        >
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import _ from 'lodash'

const router = useRouter()
const menus = _.cloneDeep(router.options.routes).filter((v) => {
  return v.meta?.menu
})
</script>

<style lang="scss" scoped>
.el-menu {
  height: calc(100vh - 60px);
  border: none;
  padding-top: 30px;
}
.el-menu-item.is-active {
  background: #e6f7ff;
  border-right: 3px solid #1890ff;
}
</style>
