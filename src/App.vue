<script setup lang="ts">
import UContextMenu from '@/components/context-menu'

const show = () => {
  console.log('show')
}
const hide = () => {
  console.log('hide')
}
</script>

<template>
  <div style="width: 100%; height: 100vh">
    <UContextMenu @show="show" @hide="hide">
      <template #default>
        <div>123</div>
      </template>
    </UContextMenu>
  </div>
</template>

<style lang="scss" scoped></style>
