<template>
  <div class="u-title-bar">
    <div class="u-title-bar__left">
      <slot v-if="showIcon" name="icon">
        <i v-if="icon" :class="icon"></i>
        <div v-else class="u-title-bar__icon"></div>
      </slot>
      <div class="u-title-bar__text">
        <slot>
          {{ title }}
        </slot>
      </div>
    </div>
    <div v-if="$slots.toolbar" class="u-title-bar__toolbar">
      <slot name="toolbar"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TitleBarProps, TitleBarSlots } from './type'
withDefaults(defineProps<TitleBarProps>(), { title: '', icon: '', showIcon: true })
defineSlots<TitleBarSlots>()

defineOptions({
  name: 'USectionHeader',
})
</script>
