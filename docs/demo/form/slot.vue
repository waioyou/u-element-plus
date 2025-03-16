<script lang="ts" setup>
import { h, ref } from 'vue'
import UForm from '../../../src/components/form'
import type { FormOptions, FormInstance } from '../../../src/components/form'
import { ElButton } from 'element-plus'
import {
  CircleCheck,
  CircleClose,
  CreditCard,
  Document,
  Key,
  Message,
  Star,
  User,
} from '@element-plus/icons-vue'

const formRef = ref<FormInstance>()

const formData = ref({
  name: '张三',
  email: '',
  password: '',
  age: undefined,
  occupation: '',
  interests: [],
  description: '',
  agreeTerms: false,
})

const formOptions = ref<FormOptions>([
  {
    prop: 'name',
    label: '姓名',
    element: 'input',
    attrs: {
      placeholder: '请输入姓名',
      clearable: true,
    },
    span: '1/2',
    required: true,
    renderLabel: ({ item, label }) => {
      return h(
        ElButton,
        {
          type: 'primary',
          text: true,
          icon: User,
        },
        () => label,
      )
    },
  },
  {
    prop: 'email',
    label: '邮箱',
    span: '1/2',
    required: true,
    attrs: {
      placeholder: '请输入邮箱',
    },
    renderLabel: ({ label }) =>
      h(ElButton, { type: 'primary', text: true, icon: Message }, () => label),
  },
  {
    prop: 'password',
    label: '密码',
    element: 'input',
    span: '1/2',
    attrs: {
      type: 'password',
      placeholder: '请输入密码',
    },
    tooltip: '密码长度为6-16位',
    rules: [
      { required: true, message: '请输入' },
      { min: 6, max: 16, message: '密码长度为6-16位' },
    ],
    renderLabel: ({ label }) =>
      h(ElButton, { type: 'primary', text: true, icon: Key }, () => label),
  },
  {
    prop: 'age',
    label: '年龄',
    element: 'input-number',
    attrs: {
      placeholder: '请输入年龄',
      min: 1,
    },
    span: '1/2',
    required: true,
    renderLabel: ({ label }) =>
      h(ElButton, { type: 'primary', text: true, icon: User }, () => label),
  },
  {
    prop: 'occupation',
    label: '职业',
    element: 'select',
    span: '1/2',
    required: true,
    attrs: {
      placeholder: '请选择',
      clearable: true,
      options: [
        { label: '前端工程师', value: '1' },
        { label: '后端工程师', value: '2' },
        { label: '测试工程师', value: '3' },
        { label: '产品经理', value: '4' },
        { label: 'UI设计师', value: '5' },
        { label: '运维工程师', value: '6' },
        { label: '其他', value: '7' },
      ],
    },
    renderLabel: ({ label }) =>
      h(ElButton, { type: 'primary', text: true, icon: CreditCard }, () => label),
  },
  {
    prop: 'interests',
    label: '兴趣',
    element: 'checkbox-group',
    span: '1/2',
    required: true,
    attrs: {
      options: [
        { value: 'reading', label: '阅读' },
        { value: 'sports', label: '运动' },
        { value: 'music', label: '音乐' },
        { value: 'travel', label: '旅行' },
        { value: 'coding', label: '编程' },
      ],
    },
    renderLabel: ({ label }) =>
      h(ElButton, { type: 'primary', text: true, icon: Star }, () => label),
  },
  {
    prop: 'description',
    label: '描述',
    element: 'input',
    span: '1/1',
    required: true,
    attrs: {
      type: 'textarea',
      rows: 3,
      placeholder: '请输入描述',
      maxlength: 200,
      showWordLimit: true,
    },
    renderLabel: ({ label }) =>
      h(ElButton, { type: 'primary', text: true, icon: Document }, () => label),
  },
  {
    prop: 'agreeTerms',
    label: '',
    element: 'checkbox',
    span: '1/1',
    required: true,
    attrs: {
      label: '我已阅读并同意用户协议和隐私政策',
    },
    renderLabel: ({ label }) =>
      h(
        ElButton,
        {
          type: formData.value.agreeTerms ? 'success' : 'danger',
          text: true,
          icon: formData.value.agreeTerms ? CircleCheck : CircleClose,
        },
        () => label,
      ),
  },
])
const emailType = ref('')
const emailOptions = ['qq.com', '163.com', 'gmail.com']
</script>

<template>
  <div class="form-data">
    <u-form ref="formRef" v-model="formData" :options="formOptions">
      <!-- -->
      <template #label-name="{ item, label }">
        <el-button type="danger" text :icon="User">{{ label }}</el-button>
      </template>
      <template #email="{ item }">
        <el-input v-model="formData.email" v-bind="item.attrs">
          <template #append>
            <el-select v-model="emailType" placeholder="请选择" style="width: 115px">
              <el-option
                v-for="option in emailOptions"
                :key="option"
                :label="option"
                :value="option"
              />
            </el-select>
          </template>
        </el-input>
      </template>
    </u-form>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-button) {
  padding: 0 !important;
}
</style>
