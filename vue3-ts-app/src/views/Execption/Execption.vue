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
  <el-row :gutter="20">
    <el-col :span="12">
      <el-empty v-if="false" description="暂无异常考勤" />
      <el-timeline v-else>
        <el-timeline-item timestamp="2022/10/3" placement="top">
          <el-card>
            <el-space>
              <h4>矿工</h4>
              <p>考勤详情：暂无打卡纪录</p>
            </el-space>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022/10/3" placement="top">
          <el-card>
            <el-space>
              <h4>矿工</h4>
              <p>考勤详情：暂无打卡纪录</p>
            </el-space>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
    <el-col :span="12">
      <el-empty v-if="false" description="暂无申请审批" />
      <el-timeline v-else>
        <el-timeline-item timestamp="2022/10/3" placement="top">
          <el-card>

              <h4>矿工</h4>
              <p>考勤详情：暂无打卡纪录</p>
              <p>考勤详情：暂无打卡纪录</p>

          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022/10/3" placement="top">
          <el-card>

              <h4>矿工</h4>
              <p>考勤详情：暂无打卡纪录</p>
              <p>考勤详情：暂无打卡纪录</p>

          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.exception-title {
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
.el-select {
  width: 80px;
}
</style>
