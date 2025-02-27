<script lang="ts" setup>
import { h, ref } from 'vue'
import UForm from '../../../src/components/form'
import type { FormOptions, FormInstance } from '../../../src/components/form'
import { ElButton, ElText } from 'element-plus'
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

const formOptions = ref<FormOptions>({
  name: {
    label: '姓名',
    element: 'input',
    value: '张三',
    attrs: {
      placeholder: '请输入姓名',
      clearable: true,
    },
    span: '1/2',
    required: true,
    slot: {
      label: ({ item, label }) => {
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
  },
  email: {
    label: '邮箱',
    value: '',
    span: '1/2',
    required: true,
    attrs: {
      placeholder: '请输入邮箱',
    },
    slot: {
      label: ({ label }) =>
        h(ElButton, { type: 'primary', text: true, icon: Message }, () => label),
    },
  },
  password: {
    label: '密码',
    element: 'input',
    value: '',
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
    slot: {
      label: ({ label }) => h(ElButton, { type: 'primary', text: true, icon: Key }, () => label),
    },
  },
  age: {
    label: '年龄',
    element: 'input-number',
    attrs: {
      placeholder: '请输入年龄',
      min: 1,
    },
    value: undefined,
    span: '1/2',
    required: true,
    slot: {
      label: ({ label }) => h(ElButton, { type: 'primary', text: true, icon: User }, () => label),
    },
  },
  occupation: {
    label: '职业',
    element: 'select',
    value: '',
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
    slot: {
      label: ({ label }) =>
        h(ElButton, { type: 'primary', text: true, icon: CreditCard }, () => label),
    },
  },
  interests: {
    label: '兴趣',
    element: 'checkbox-group',
    value: [],
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
    slot: {
      label: ({ label }) => h(ElButton, { type: 'primary', text: true, icon: Star }, () => label),
    },
  },
  description: {
    label: '描述',
    element: 'input',
    value: '',
    span: '1/1',
    required: true,
    attrs: {
      type: 'textarea',
      rows: 3,
      placeholder: '请输入描述',
      maxlength: 200,
      showWordLimit: true,
    },
    slot: {
      label: ({ label }) =>
        h(ElButton, { type: 'primary', text: true, icon: Document }, () => label),
    },
  },
  agreeTerms: {
    label: '',
    element: 'checkbox',
    value: false,
    span: '1/1',
    required: true,
    attrs: {
      label: '我已阅读并同意用户协议和隐私政策',
    },
    slot: {
      label: ({ item }) =>
        h(ElButton, {
          type: item.value ? 'success' : 'danger',
          text: true,
          icon: item.value ? CircleCheck : CircleClose,
        }),
    },
  },
})
const emailType = ref('')
const emailOptions = ['qq.com', '163.com', 'gmail.com']
</script>

<template>
  <div class="form-data">
    <u-form ref="formRef" v-model:options="formOptions">
      <!-- -->
      <template #label-name="{ item, label }">
        <el-button type="danger" text :icon="User">{{ label }}</el-button>
      </template>
      <template #email="{ item }">
        <el-input v-model="item.value" v-bind="item.attrs">
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
