<script setup lang="ts" generic="T = any">
import { omit } from 'lodash-es'
import type { OperationProps, OperationEmits, OperationItem } from './types'
defineOptions({ name: 'UOperation', inheritAttrs: false })

const props = withDefaults(defineProps<OperationProps<T>>(), {
  type: 'text',
})
const emit = defineEmits<OperationEmits<T>>()

const handleClick = (name: string) => {
  emit('click-operation', name, props.slotProps!.row, props.slotProps!.$index)
}

/**
 * 处理按钮属性
 * @param item 操作项
 * @returns el-button属性
 */
const handleButtonAttrs = (item: OperationItem) => {
  const result: any = item.buttonAttrs?.(props.slotProps!.row, props.slotProps!.$index) || {}
  if (props.type === 'link') {
    result.link = true
  } else if (props.type === 'text') {
    result.text = true
  } else if (props.type === 'button') {
    result.link = false
    result.text = false
  }
  // 按钮类型，默认primary
  if (!result.type) {
    result.type = 'primary'
  }
  return omit(result, 'onClick')
}

// 处理按钮点击事件
const handleButtonClick = (item: OperationItem) => {
  handleClick(item.name)
  const buttonAttrs = item.buttonAttrs?.(props.slotProps!.row, props.slotProps!.$index)
  if (buttonAttrs && buttonAttrs.onClick) {
    buttonAttrs.onClick(props.slotProps!.row, props.slotProps!.$index)
  }
}

/**
 * 处理确认属性
 * @param item 操作项
 * @returns el-popconfirm 属性
 */
const handleConfirmAttrs = (item: OperationItem) => {
  const result: any = item.confirmAttrs?.(props.slotProps!.row, props.slotProps!.$index) || {}
  return result
}

/** 处理气泡确认框确认事件 */
const handleConfirm = (item: OperationItem) => {
  handleClick(item.name)
  const confirmAttrs = item.confirmAttrs?.(props.slotProps!.row, props.slotProps!.$index)
  if (confirmAttrs && confirmAttrs.onConfirm) {
    confirmAttrs.onConfirm(props.slotProps!.row, props.slotProps!.$index)
  }
}

/** 处理气泡确认框取消事件 */
const handleCancel = (item: OperationItem) => {
  const confirmAttrs = item.confirmAttrs?.(props.slotProps!.row, props.slotProps!.$index)
  if (confirmAttrs && confirmAttrs.onCancel) {
    confirmAttrs.onCancel(props.slotProps!.row, props.slotProps!.$index)
  }
}

/** 处理按钮是否显示 */
const handleIf = (item: OperationItem) => {
  if (!Reflect.has(item, 'if')) return true
  if (typeof item.if === 'function') {
    return item.if(props.slotProps!.row)
  } else {
    return item.if
  }
}
</script>

<template>
  <div class="u-operation">
    <template v-for="item in operations" :key="item.name">
      <el-popconfirm
        v-if="item.confirmAttrs && handleIf(item)"
        v-bind="handleConfirmAttrs(item)"
        @confirm="handleConfirm(item)"
        @cancel="handleCancel(item)"
      >
        <template #reference>
          <el-button v-bind="handleButtonAttrs(item)">
            <i
              v-if="handleButtonAttrs(item).iconClass"
              class="el-icon"
              :class="handleButtonAttrs(item).iconClass"
            ></i>
            {{ item.label }}
          </el-button>
        </template>
      </el-popconfirm>
      <el-button
        v-else-if="handleIf(item)"
        v-bind="handleButtonAttrs(item)"
        @click="handleButtonClick(item)"
      >
        <i v-if="handleButtonAttrs(item).iconClass" :class="handleButtonAttrs(item).iconClass"></i>
        {{ item.label }}
      </el-button>
    </template>
  </div>
</template>
