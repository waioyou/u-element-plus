<script setup lang="ts"></script>
<template>
  <!-- 在此区域内右键点击将显示菜单 -->
  <div class="basic">右键点击此区域</div>
  <UContextMenu trigger-selectors=".basic">
    <div class="menu-item">菜单项 1</div>
    <div class="menu-item">菜单项 2</div>
    <div class="menu-item">菜单项 3</div>
  </UContextMenu>
</template>
<style scoped lang="scss">
.basic {
  height: 200px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu-item {
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
}
</style>
