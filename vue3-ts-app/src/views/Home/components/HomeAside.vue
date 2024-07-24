<template>
  <el-menu default-active="1-1" class="el-menu-vertical-demo">
    <el-sub-menu v-for="item in menus" :index="item.path" :key="item.path">
      <template #title>
        <el-icon><component :is="item.meta?.icon"></component></el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>

      <el-menu-item
        v-for="itemChild in item.children"
        :index="item.path + itemChild.path"
        :key="item.path + itemChild.path"
      >
        <el-icon><component :is="itemChild.meta?.icon"></component></el-icon>
        <span>{{ itemChild.meta?.title }}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { useRouter, type RouteRecordName } from 'vue-router'
import _ from 'lodash'
import { useStore } from '@/stores'

const router = useRouter()
const stores = useStore()
const permissions = stores.state.users.infos.permission
const menus = _.cloneDeep(router.options.routes).filter((v) => {
  v.children = v.children?.filter(
    (v) => v.meta?.menu && (permissions as (RouteRecordName | undefined)[]).includes(v.name)
  )
  return v.meta?.menu && (permissions as (RouteRecordName | undefined)[]).includes(v.name)
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
