<script setup lang="ts" generic="T">
import { computed, getCurrentInstance, ref } from 'vue'
import RenderVNode from '../render-v-node/render-v-node'
import UTableColumn from './table-column.vue'
import { isNil, omit } from '@/utils'
import type { TableProps, TableInstance, TableEmits } from './type'
import type { FormInstance } from 'element-plus'

defineOptions({ name: 'UTable' })
const props = withDefaults(defineProps<TableProps<T>>(), {
  showSelection: false,
  selectionProps: () => ({}),
  showIndex: false,
  indexProps: () => ({}),
  showExpand: false,
  expandProps: () => ({}),
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

const emit = defineEmits<TableEmits<T>>()

// 过滤indexProps
const filerIndexProps = computed(() => {
  return omit(props.indexProps, ['formatter', 'renderHeader'])
})

// 过滤selectionProps
const filerSelectionProps = computed(() => {
  return omit(props.selectionProps, ['formatter', 'renderHeader'])
})

// 过滤空值，避免覆盖el-table的默认属性
const filerElTableProps = computed(() => {
  const emptyKeys = Object.keys(props).filter((key) => isNil((props as any)[key]))
  emptyKeys.push('columns', 'editable')
  return omit(props, emptyKeys)
})
const instance = getCurrentInstance()!
const tableRef = ref<TableInstance>()
const formRef = ref<FormInstance>()

const handleClickOperation = (name: string, row: T, index: number) => {
  emit('click-operation', name, row, index)
}

/** 不使用tableRef，使用refs，避免组件多次渲染 */
defineExpose<TableInstance>(
  new Proxy({} as TableInstance, {
    get(_, key) {
      if (key === 'validate') {
        return formRef.value!.validate
      }
      if (key === 'validateField') {
        return formRef.value!.validateField
      }
      if (key === 'scrollToField') {
        return formRef.value!.scrollToField
      }
      if (key === 'resetFields') {
        return formRef.value!.resetFields
      }
      if (key === 'clearValidate') {
        return formRef.value!.clearValidate
      }
      const tableInstance: any = instance.refs?.tableRef ?? {}
      return tableInstance[key]
    },
    has(_, key) {
      return Reflect.has(tableRef.value!, key) || Reflect.has(formRef.value!, key)
    },
  }),
)
</script>

<template>
  <div class="u-table">
    <el-form ref="formRef" :model="data" :show-message="false">
      <el-table ref="tableRef" v-bind="filerElTableProps">
        <template v-if="$slots.empty" #empty>
          <slot name="empty" />
        </template>
        <template v-if="$slots.append" #append="slotProps">
          <slot name="append" v-bind="slotProps" />
        </template>
        <el-table-column v-if="showExpand" type="expand" v-bind="expandProps">
          <template #default="slotProps">
            <slot name="expand" v-bind="slotProps" />
          </template>
        </el-table-column>
        <el-table-column v-if="showIndex" type="index" v-bind="filerIndexProps">
          <template v-if="indexProps.renderHeader" #header="slotProps">
            <render-v-node :v-node="indexProps.renderHeader(slotProps)" />
          </template>
          <template v-if="indexProps.formatter" #default="slotProps">
            <render-v-node :v-node="indexProps.formatter(slotProps)" />
          </template>
        </el-table-column>
        <el-table-column v-if="showSelection" type="selection" v-bind="filerSelectionProps">
        </el-table-column>

        <UTableColumn
          v-for="item in columns"
          :key="item.prop"
          :item="item"
          :editable="editable"
          @click-operation="handleClickOperation"
        >
          <template v-for="slot in Object.keys($slots)" #[slot]="slotProps">
            <!-- 以之前的名字命名插槽，同时把数据原样绑定 -->
            <slot :name="slot" v-bind="slotProps"> </slot>
          </template>
        </UTableColumn>
      </el-table>
    </el-form>
  </div>
</template>
