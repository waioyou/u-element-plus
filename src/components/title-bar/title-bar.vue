<template>
  <div class="u-title-bar" :class="$attrs.class as string" :style="$attrs.style as CSSProperties">
    <div class="u-title-bar__title">
      <slot v-if="showIcon" name="icon">
        <el-icon v-if="icon" class="u-title-bar__icon">
          <component :is="icon" />
        </el-icon>
        <i v-else-if="iconClass" class="u-title-bar__icon" :class="iconClass"></i>
        <i v-else class="u-title-bar__icon default-icon"></i>
      </slot>
      <el-text class="u-title-bar__text" truncated size="large">
        <slot>
          {{ title }}
        </slot>
      </el-text>
    </div>
    <div v-if="$slots.toolbar" class="u-title-bar__toolbar">
      <slot name="toolbar"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { TitleBarProps, TitleBarSlots } from './types'

defineOptions({ name: 'UTitleBar', inheritAttrs: false })

withDefaults(defineProps<TitleBarProps>(), { title: '', icon: '', showIcon: true })
defineSlots<TitleBarSlots>()
</script>
