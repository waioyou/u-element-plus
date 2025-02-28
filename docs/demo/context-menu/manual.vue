<script setup lang="ts">
import { ref } from 'vue'
import type { ContextMenuInstance } from 'u-element-plus'

const menuRef = ref<ContextMenuInstance>()
const showContextMenu = (event: MouseEvent) => {
  menuRef.value?.showMenu(event)
}
</script>
<template>
  <button @contextmenu="showContextMenu">右键这里显示菜单</button>
  <UContextMenu ref="menuRef" manual>
    <div class="menu-item">菜单项 1</div>
    <div class="menu-item">菜单项 2</div>
  </UContextMenu>
</template>

<style lang="scss" scoped>
.menu-item {
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
}
</style>
