<script setup lang="ts">
import { useFullscreen } from 'u-element-plus'

const { isFullscreen, enterFullscreen, exitFullscreen, toggleFullscreen } = useFullscreen()
</script>

<template>
  <div>
    <el-button v-if="!isFullscreen" @click="enterFullscreen">进入全屏</el-button>
    <el-button v-else @click="exitFullscreen">退出全屏</el-button>
    <el-button @click="toggleFullscreen">切换全屏</el-button>
  </div>
</template>
