<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { OperationItem, OperationProps } from './types'
import { omit } from '@/utils'
defineOptions({ name: 'UOperationButton', inheritAttrs: false })

const props = defineProps<{
  item: OperationItem
}>()

const emit = defineEmits(['click'])

const attrs = useAttrs() as unknown as OperationProps<any>

const buttonAttrs = computed(() => {
  return props.item.buttonAttrs?.(attrs.slotProps!.row, attrs.slotProps!.$index) || {}
})

const elButtonAttrs = computed(() => {
  const result: any = buttonAttrs.value || {}
  const { type } = attrs
  if (type === 'link') {
    result.link = true
    result.text = false
  } else if (type === 'text') {
    result.link = false
    result.text = true
  } else if (type === 'button') {
    result.link = false
    result.text = false
  }
  // 按钮类型，默认primary
  if (!result.type) {
    result.type = 'primary'
  }
  return omit(result, 'onClick', 'iconClass', 'icon')
})

const handleClick = () => {
  if (buttonAttrs.value.onClick) {
    buttonAttrs.value.onClick()
  }
  emit('click')
}
</script>

<template>
  <el-button v-if="attrs.onlyIcon" v-bind="elButtonAttrs" @click="handleClick">
    <el-tooltip :content="item.label" placement="top">
      <i v-if="buttonAttrs.iconClass" :class="buttonAttrs.iconClass"></i>
      <el-icon v-else-if="buttonAttrs.icon" :size="16">
        <component :is="buttonAttrs.icon" />
      </el-icon>
    </el-tooltip>
  </el-button>
  <el-button v-else v-bind="elButtonAttrs" @click="handleClick">
    <i v-if="buttonAttrs?.iconClass" :class="buttonAttrs.iconClass"></i>
    <el-icon v-else-if="buttonAttrs.icon" :size="16">
      <component :is="buttonAttrs.icon" />
    </el-icon>
    <span>{{ item.label }}</span>
  </el-button>
</template>
