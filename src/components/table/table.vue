<script setup lang="ts" generic="T">
import UTableColumn from './table-column.vue'
import { computed, getCurrentInstance, ref } from 'vue'
import type { TableProps, TableInstance } from './type'
import { isNil, omit } from '@/utils'
defineOptions({ name: 'UTable' })

const props = withDefaults(defineProps<TableProps<T>>(), {
  editable: false,
  stripe: false,
  border: false,
  fit: true,
  showHeader: true,
  highlightCurrentRow: false,
  defaultExpandAll: false,
  showSummary: false,
  selectOnIndeterminate: true,
  lazy: false,
  scrollbarAlwaysOn: false,
  showOverflowTooltip: false,
  flexible: false,
  allowDragLastColumn: true,
})

// 过滤空值，避免覆盖el-table的默认属性
const filerElTableProps = computed(() => {
  const emptyKeys = Object.keys(props).filter((key) => isNil((props as any)[key]))
  emptyKeys.push('columns', 'editable')
  return omit(props, emptyKeys)
})
const instance = getCurrentInstance()!
const tableRef = ref<TableInstance>()

/** 不使用tableRef，使用refs，避免组件多次渲染 */
defineExpose<TableInstance>(
  new Proxy({} as TableInstance, {
    get(_, key) {
      const tableInstance: any = instance.refs?.tableRef ?? {}
      return tableInstance[key]
    },
    has(_, key) {
      return Reflect.has(tableRef.value!, key)
    },
  }),
)
</script>

<template>
  <div class="u-table">
    <el-table ref="tableRef" v-bind="filerElTableProps">
      <template v-if="$slots.empty" #empty>
        <slot name="empty" />
      </template>
      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>
      <UTableColumn v-for="item in columns" :key="item.prop" :item="item" :editable="editable">
        <template v-for="slot in Object.keys($slots)" #[slot]="slotProps">
          <!-- 以之前的名字命名插槽，同时把数据原样绑定 -->
          <slot :name="slot" v-bind="slotProps"> </slot>
        </template>
      </UTableColumn>
    </el-table>
  </div>
</template>
