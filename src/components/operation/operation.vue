<script setup lang="ts" generic="T = any">
import type { OperationProps, OperationEmits, OperationItem } from './types'
import { omit } from 'lodash-es'
import UOperationButton from './operation-button.vue'
import { ElPopconfirm } from 'element-plus'
defineOptions({ name: 'UOperation', inheritAttrs: false })

const props = withDefaults(defineProps<OperationProps<T>>(), {
  type: 'text',
  onlyIcon: false,
})
const emit = defineEmits<OperationEmits<T>>()

const handleClick = (name: string) => {
  emit('click-operation', name, props.slotProps!.row, props.slotProps!.$index)
}

/**
 * 处理确认属性
 * @param item 操作项
 * @returns el-popconfirm 属性
 */
const getElConfirmAttrs = (item: OperationItem) => {
  const result: any = item.confirmAttrs?.(props.slotProps!.row, props.slotProps!.$index) || {}
  if (!result.title) {
    result.title = '确定要执行此操作吗？'
  }
  return omit(result, 'onConfirm', 'onCancel')
}

/** 处理气泡确认框确认事件 */
const handleConfirm = (item: OperationItem) => {
  const confirmAttrs = item.confirmAttrs?.(props.slotProps!.row, props.slotProps!.$index)
  if (confirmAttrs?.onConfirm) {
    confirmAttrs.onConfirm()
  }
  handleClick(item.name)
}

/** 处理气泡确认框取消事件 */
const handleCancel = (item: OperationItem) => {
  const confirmAttrs = item.confirmAttrs?.(props.slotProps!.row, props.slotProps!.$index)
  if (confirmAttrs?.onCancel) {
    confirmAttrs.onCancel()
  }
}

/** 处理按钮是否显示 */
const handleRendered = (item: OperationItem) => {
  if (!Reflect.has(item, 'rendered')) return true
  if (typeof item.rendered === 'function') {
    return item.rendered(props.slotProps!.row)
  } else {
    return item.rendered
  }
}
</script>

<template>
  <div class="u-operation">
    <template v-for="item in operations" :key="item.name">
      <template v-if="handleRendered(item)">
        <el-popconfirm
          v-if="item.confirmAttrs"
          v-bind="getElConfirmAttrs(item)"
          @confirm="handleConfirm(item)"
          @cancel="handleCancel(item)"
        >
          <template #reference>
            <u-operation-button :item="item" v-bind="props" />
          </template>
        </el-popconfirm>
        <template v-else>
          <u-operation-button :item="item" v-bind="props" @click="handleClick(item.name)" />
        </template>
      </template>
    </template>
  </div>
</template>
