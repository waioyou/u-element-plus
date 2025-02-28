<script setup lang="ts"></script>
<template>
  <div class="trigger">
    <div class="trigger-area">仅在此区域内右键有效</div>
  </div>
  <u-context-menu trigger-selectors=".trigger-area">
    <div class="menu-item">菜单项 1</div>
    <div class="menu-item">菜单项 2</div>
  </u-context-menu>
</template>

<style lang="scss" scoped>
.trigger {
  height: 200px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  .trigger-area {
    width: 200px;
    height: 100px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.menu-item {
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
}
</style>
