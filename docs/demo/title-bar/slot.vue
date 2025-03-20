<script setup lang="ts">
import { Star } from '@element-plus/icons-vue'
</script>

<template>
  <u-title-bar>
    <template #icon>
      <el-icon class="mr-2 color-[var(--el-color-primary)]">
        <Star />
      </el-icon>
    </template>
    <template #default>
      <span>
        自定义标题自定义标题自定义标题自定义标题自定义标题自定义标题自定义标题自定义标题自定义标题自定义标题自定义标题自定义标题自定义标题
      </span>
    </template>
    <template #toolbar>
      <el-button type="primary">编辑</el-button>
      <el-button type="danger">删除</el-button>
    </template>
  </u-title-bar>
</template>
