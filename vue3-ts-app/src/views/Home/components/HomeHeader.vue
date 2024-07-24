<template>
  <div class="home-header">
    <span class="home-header-logo">
      <i class="iconfont icon-vue"></i>
      <i class="iconfont icon-icon-test"></i>
      <i class="iconfont icon-typescript"></i>
    </span>
    <span class="home-header-title">在线考勤系统</span>
    <el-dropdown>
      <el-badge class="home-header-badge">
        <el-icon :size="22"><Bell /></el-icon>
      </el-badge>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>暂无消息</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown>
      <el-space class="header-space">
        <el-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
        黄蓉
      </el-space>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
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
.home-header {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 34px;

  .home-header-logo {
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
  .home-header-title {
    margin-left: 30px;
    font-weight: 700;
    font-size: 18px;
    margin-right: auto;
  }
  .header-space {
    margin-left: 20px;
  }
}
</style>
