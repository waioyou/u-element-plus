<script lang="ts" setup>
import RenderVNode from '../render-v-node/render-v-node'
import { computed } from 'vue'
import type { TableColumn } from './type'
import { omit } from '@/utils'

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
