<script lang="ts" setup>
import { ref } from 'vue'
import UForm from '../../../src/components/form'
import type { FormOptions } from '../../../src/components/form'

const formOptions = ref<FormOptions>({
  name: {
    label: '用户名',
    value: '',
    element: 'input',
    attrs: {
      placeholder: '请输入用户名',
      maxlength: 10,
    },
    rules: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
    tooltip: '用户名最多10个字符',
    span: '1/3',
  },
  password: {
    label: '密码',
    value: '',
    element: 'input',
    attrs: {
      placeholder: '请输入密码',
      type: 'password',
    },
    rules: [
      { required: true, trigger: 'blur', message: '请输入密码' },
      { pattern: /^[a-zA-Z0-9]+$/, message: '密码必须包含数字和字母', trigger: 'blur' },
      { min: 6, message: '密码最少6个字符', trigger: 'blur' },
    ],
    tooltip: '密码最少6个字符,必须包含数字和字母',
    span: '1/3',
  },
})
</script>

<template>
  <div class="form-data">
    <u-form v-model:options="formOptions" inline></u-form>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>
