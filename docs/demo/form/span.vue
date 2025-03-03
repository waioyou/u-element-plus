<script lang="ts" setup>
import { ref } from 'vue'
import type { FormOptions } from 'u-element-plus'

const formData = ref({
  username: '',
  password: '',
  email: '',
  phoneNumber: '',
  birthDate: '',
  gender: '',
  address: '',
  introduction: '',
})

const formOptions = ref<FormOptions>([
  {
    prop: 'sec1',
    label: '个人信息',
    element: 'title-bar',
    span: '1/1',
  },
  {
    prop: 'username',
    label: '用户名',
    element: 'input',
    attrs: {
      placeholder: '请输入用户名',
      clearable: true,
    },
    span: '1/3',
  },
  {
    prop: 'password',
    label: '密码',
    element: 'input',
    attrs: {
      placeholder: '请输入密码',
      type: 'password',
    },
    span: '1/3',
  },
  {
    prop: 'email',
    label: '电子邮件',
    element: 'input',
    attrs: {
      placeholder: '请输入电子邮件',
      type: 'email',
    },
    span: '1/3',
  },
  {
    prop: 'phoneNumber',
    label: '电话号码',
    element: 'input',
    attrs: {
      placeholder: '请输入电话号码',
      type: 'tel',
    },
    span: '1/3',
  },
  {
    prop: 'birthDate',
    label: '出生日期',
    element: 'date-picker',
    attrs: {
      placeholder: '选择日期',
    },
    span: '1/3',
  },
  {
    prop: 'gender',
    label: '性别',
    element: 'select',
    attrs: {
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
        { label: '其他', value: 'other' },
      ],
    },
    span: '1/3',
  },
  {
    prop: 'address',
    label: '地址',
    element: 'input',
    attrs: {
      type: 'textarea',
      placeholder: '请输入地址',
      rows: 3,
    },
    span: '1/2',
  },
  {
    prop: 'introduction',
    label: '个人简介',
    element: 'input',
    attrs: {
      type: 'textarea',
      placeholder: '请输入个人简介',
      rows: 3,
    },
    span: '1/2',
  },
])
</script>

<template>
  <div class="form-data">
    <u-form v-model="formData" :options="formOptions" :gutter="20"></u-form>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>
