<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'
</script>

<template>
  <u-title-bar title="使用内置图标" :icon="Edit"></u-title-bar>
  <u-title-bar class="mt-4" title="使用自定义CSS类图标" iconClass="iconfont icon-add"></u-title-bar>
  <u-title-bar class="mt-4" title="无图标标题栏" :showIcon="false"> </u-title-bar>
</template>
