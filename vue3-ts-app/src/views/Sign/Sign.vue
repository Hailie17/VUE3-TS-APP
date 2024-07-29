<template>
  <el-descriptions border direction="vertical" :column="9">
    <el-descriptions-item label="月份">{{ month }}月</el-descriptions-item>
    <el-descriptions-item v-for="(value, key) in DetailKey" :key="key" :label="value">{{
      detailValue[key]
    }}</el-descriptions-item>
    <el-descriptions-item label="操作">
      <el-button type="primary" plain size="small" @click="toException">查看详情</el-button>
    </el-descriptions-item>
    <el-descriptions-item label="考勤状态">
      <el-tag :type="statusValue.type" size="small">{{ statusValue.text }}</el-tag>
    </el-descriptions-item>
  </el-descriptions>
  <el-calendar v-model="date">
    <template #header>
      <el-button type="primary">在线签到</el-button>
      <el-space>
        <el-button plain>{{ year }}年</el-button>
        <el-select v-model="month" @change="handleChange">
          <el-option v-for="item in 12" :label="item + '月'" :key="item" :value="item" />
        </el-select>
      </el-space>
    </template>
  </el-calendar>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores'
import { toZero } from '@/utils/common'

const date = ref(new Date())
const year = date.value.getFullYear()
const month = ref(date.value.getMonth() + 1)

const router = useRouter()
const stores = useStore()
const signsInfos = computed(() => stores.state.signs.infos)
const usersInfos = computed(() => stores.state.users.infos)

enum DetailKey {
  normal = '正常',
  absent = '缺勤',
  miss = '漏打卡',
  late = '迟到',
  early = '异常',
  lateAndEarly = '迟到并早退'
}

const detailValue = reactive({
  normal: 0,
  absent: 0,
  miss: 0,
  late: 0,
  early: 5,
  lateAndEarly: 0
})

const statusValue = reactive({
  type: 'success' as 'success' | 'warning',
  text: '成功' as '成功' | '失败'
})

watchEffect((reset) => {
  const detailMonth = (signsInfos.value.detail as { [index: string]: unknown })[
    toZero(month.value)
  ] as { [index: string]: unknown }
  for (const attr in detailMonth) {
    switch (detailMonth[attr]) {
      case DetailKey.normal:
        detailValue.normal++
        break
      case DetailKey.absent:
        detailValue.absent++
        break
      case DetailKey.miss:
        detailValue.miss++
        break
      case DetailKey.late:
        detailValue.late++
        break
      case DetailKey.early:
        detailValue.early++
        break
      case DetailKey.lateAndEarly:
        detailValue.lateAndEarly++
        break
    }
  }
  for (const attr in detailValue) {
    if (attr !== 'normal' && detailValue[attr as keyof typeof detailValue] !== 0) {
      statusValue.type = 'warning'
      statusValue.text = '失败'
    }
  }
  reset(() => {
    statusValue.type = 'success'
    statusValue.text = '成功'
    for (const attr in detailValue) {
      detailValue[attr as keyof typeof detailValue] = 0
    }
  })
})

const toException = () => {
  router.push({
    path: '/exception',
    query: {
      month: month.value
    }
  })
}

const handleChange = () => {
  date.value = new Date(`${year}.${month.value}`)
}
</script>

<style lang="scss" scoped>
.el-descriptions {
  margin: 10px;
}
.el-select {
  width: 80px;
}
.show-time {
  text-align: center;
  line-height: 40px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
