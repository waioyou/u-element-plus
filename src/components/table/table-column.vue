<script lang="ts" setup>
import RenderVNode from '../render-v-node/render-v-node'
import { computed } from 'vue'
import type { TableColumn } from './type'
import { omit } from '@/utils'

defineSlots<Record<string, any>>()

const props = defineProps<{
  item: TableColumn
  editable: boolean
}>()

const getElTableColumnAttrs = computed<any>(() => {
  return omit(props.item, [
    'children',
    'formatter',
    'render',
    'component',
    'if',
    'element',
    'rules',
    'attrs',
    'renderHeader',
  ])
})
</script>

<template>
  <el-table-column v-if="item.prop && item.if !== false" v-bind="getElTableColumnAttrs">
    <template #header="slotProps">
      <template v-if="$slots[`header-${item.prop}`]">
        <slot :name="`header-${item.prop}`" v-bind="slotProps" :item="item" />
      </template>
      <RenderVNode
        v-else-if="item.renderHeader"
        :v-node="item.renderHeader({ ...slotProps, item })"
      />
    </template>
    <template #filter-icon="slotProps">
      <template v-if="$slots[`filter-icon-${item.prop}`]">
        <slot :name="`filter-icon-${item.prop}`" v-bind="slotProps" :item="item" />
      </template>
      <RenderVNode
        v-else-if="item.renderFilterIcon"
        :v-node="item.renderFilterIcon({ ...slotProps, item })"
      />
    </template>
    <template #default="slotProps">
      <!-- 递归处理多级表头 -->
      <template v-if="item.children">
        <TableColumn
          v-for="child in item.children"
          :key="child.prop"
          :item="child"
          :editable="editable"
        >
          <template v-for="slot in Object.keys($slots)" #[slot]="slotScope">
            <!-- 以之前的名字命名插槽，同时把数据原样绑定 -->
            <slot :name="slot" v-bind="slotScope" />
          </template>
        </TableColumn>
      </template>
      <!-- 自定义插槽 -->
      <slot v-if="$slots[item.prop]" :name="item.prop" v-bind="slotProps" :item="item" />
      <!-- 动态组件 -->
      <component :is="item.component" v-else-if="item.component" v-bind="slotProps" :item="item" />
      <!-- formatter -->
      <template v-else-if="item.formatter">
        <RenderVNode :v-node="item.formatter({ ...slotProps, item })" />
      </template>
    </template>
  </el-table-column>
</template>
