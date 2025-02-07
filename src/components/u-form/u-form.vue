<script lang="ts" setup>
import type { FormProps, FormEmits, FormOptions } from './type'
import { FormItemType } from './type'
import { computed, ref } from 'vue'
defineOptions({
  name: 'UForm',
})

const props = withDefaults(defineProps<FormProps>(), {
  view: false,
})

const formOptions = ref<FormOptions<{ username: string; age: number }>>({
  username: {
    type: FormItemType.Input,
    value: '',
  },
  age: {
    type: FormItemType.InputNumber,
    value: 0,
  },
})
formOptions.value.username.value = '123'

const emit = defineEmits<FormEmits>()
emit('change', 'name', { value: '123' })
</script>

<template>
  <div class="u-form"></div>
</template>

<style lang="scss" scoped>
.u-form {
  width: 100%;
}
</style>
