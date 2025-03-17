<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ContextMenuItem } from 'u-element-plus'

const items: ContextMenuItem[] = [
  { name: 'add', label: '添加数据', iconClass: 'iconfont icon-add' },
  { name: 'export-excel', label: '导出Excel', iconClass: 'iconfont icon-export-excel' },
  { name: 'export-pdf', label: '导出PDF', iconClass: 'iconfont icon-export-pdf' },
  { name: 'delete', label: '删除数据', icon: Delete },
]

const handleSelectMenu = (item: ContextMenuItem) => {
  ElMessage.success(`点击了${item.label}`)
}
</script>
<template>
  <!-- 在此区域内右键点击将显示菜单 -->
  <div class="basic">右键点击此区域</div>
  <UContextMenu trigger-selectors=".basic" :items="items" @select="handleSelectMenu" />
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
