<template>
  <div class="u-section-header">
    <div class="u-section-header__left">
      <slot v-if="showIcon" name="icon">
        <i v-if="icon" :class="icon"></i>
        <div v-else class="u-section-header__icon"></div>
      </slot>
      <div class="u-section-header__text">
        <slot>
          {{ title }}
        </slot>
      </div>
    </div>
    <div v-if="$slots.right" class="u-section-header__right">
      <slot name="right"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SectionHeaderProps } from './type'
withDefaults(defineProps<SectionHeaderProps>(), { title: '', icon: '', showIcon: true })

defineOptions({
  name: 'USectionHeader',
})
</script>
