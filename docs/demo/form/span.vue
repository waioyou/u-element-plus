<script lang="ts" setup>
import { ref } from 'vue'
import UForm from '../../../src/components/form'
import type { FormOptions } from '../../../src/components/form'

const formOptions = ref<FormOptions>({
  sec1: {
    label: '个人信息',
    element: 'section-header',
    span: '1/1',
  },
  username: {
    label: '用户名',
    element: 'input',
    value: '',
    attrs: {
      placeholder: '请输入用户名',
      clearable: true,
    },
    span: '1/3',
  },
  password: {
    label: '密码',
    element: 'input',
    value: '',
    attrs: {
      placeholder: '请输入密码',
      type: 'password',
    },
    span: '1/3',
  },
  email: {
    label: '电子邮件',
    element: 'input',
    value: '',
    attrs: {
      placeholder: '请输入电子邮件',
      type: 'email',
    },
    span: '1/3',
  },
  phoneNumber: {
    label: '电话号码',
    element: 'input',
    value: '',
    attrs: {
      placeholder: '请输入电话号码',
      type: 'tel',
    },
    span: '1/3',
  },
  birthDate: {
    label: '出生日期',
    element: 'date-picker',
    value: '',
    attrs: {
      placeholder: '选择日期',
    },
    span: '1/3',
  },
  gender: {
    label: '性别',
    element: 'select',
    value: '',
    attrs: {
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
        { label: '其他', value: 'other' },
      ],
    },
    span: '1/3',
  },
  address: {
    label: '地址',
    element: 'input',
    value: '',
    attrs: {
      type: 'textarea',
      placeholder: '请输入地址',
      rows: 3,
    },
    span: '1/2',
  },
  introduction: {
    label: '个人简介',
    element: 'input',
    value: '',
    attrs: {
      type: 'textarea',
      placeholder: '请输入个人简介',
      rows: 3,
    },
    span: '1/2',
  },
})
</script>

<template>
  <div class="form-data">
    <u-form v-model:options="formOptions" :gutter="20"></u-form>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>
