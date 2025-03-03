<script setup lang="ts">
import UForm from '@/components/form/form.vue'
import { computed, h, ref } from 'vue'
import type { FormOptions, FormInstance } from './components/form/type'
import { ElButton } from 'element-plus'

const formData = ref({
  autocomplete: '1',
  cascader: ['FuJian', 'Fuzhou'],
  checkboxGroup: ['sing', 'dance'],
  colorPicker: '#9B86D6',
  datePicker: '2024-01-01',
  input: '输入框',
  inputNumber: 0,
  radioGroup: 'A',
  rate: 3,
  select: '1',
  slider: 50,
  switch: true,
  timePicker: '20:05:01',
  transfer: [1, 2],
  upload: [
    {
      name: 'element-plus-logo.svg',
      url: 'https://element-plus.org/images/element-plus-logo.svg',
    },
    {
      name: 'element-plus-logo2.svg',
      url: 'https://element-plus.org/images/element-plus-logo.svg',
    },
  ],
})
const formRef = ref<FormInstance>()
const formOptions = ref<FormOptions>([
  {
    prop: 'title-bar',
    label: '基础信息',
    element: 'title-bar',
    span: '1/1',
  },
  {
    prop: 'autocomplete',
    label: '自动补全输入框',
    element: 'autocomplete',
    tooltip: '自动补全输入框',
    attrs: {
      placeholder: '请输入',
      clearable: true,
      triggerOnFocus: true,
      fetchSuggestions: (queryString: string, cb: any) => {
        cb([
          { value: '1', label: '1' },
          { value: '2', label: '2' },
        ])
      },
    },
    span: '1/3',
  },
  {
    prop: 'cascader',
    label: '级联选择器',
    element: 'cascader',
    rules: [{ required: true, trigger: 'change' }],
    slot: {
      label: ({ item, label }) => `${item.element}-${label}`,
    },
    attrs: {
      placeholder: '请选择',
      clearable: true,
      options: [
        {
          label: '福建省',
          value: 'FuJian',
          children: [
            { label: '福州市', value: 'Fuzhou' },
            { label: '厦门市', value: 'Xiamen' },
            { label: '泉州市', value: 'Quanzhou' },
            { label: '莆田市', value: 'Putian' },
            { label: '漳州市', value: 'Zhangzhou' },
            { label: '龙岩市', value: 'Longyan' },
            { label: '三明市', value: 'Sanming' },
            { label: '南平市', value: 'Nanping' },
            { label: '宁德市', value: 'Ningde' },
          ],
        },
      ],
      props: {
        emitPath: true,
        multiple: false,
      },
    },
    span: '1/3',
  },
  {
    prop: 'checkboxGroup',
    label: '多选框组',
    element: 'checkbox-group',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      options: [
        { label: '唱', value: 'sing' },
        { label: '跳', value: 'dance' },
        { label: 'rap', value: 'rap' },
        { label: '篮球', value: 'basketball' },
      ],
    },
    formatter: (item) => {
      return h('span', formData.value.checkboxGroup.join(', '))
    },
    span: '1/3',
  },
  {
    prop: 'colorPicker',
    label: '取色器',
    element: 'color-picker',
    rules: [{ required: true, trigger: 'change' }],
    span: '1/3',
  },
  {
    prop: 'datePicker',
    label: '日期选择器',
    element: 'date-picker',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      placeholder: '选择日期',
      type: 'datetime',
      format: 'YYYY-MM-DD',
      clearable: true,
    },
    span: '1/3',
  },
  {
    prop: 'input',
    label: '输入框',
    element: 'input',
    rules: [{ required: true, trigger: 'blur' }],
    attrs: {
      placeholder: '请输入',
      clearable: true,
    },
    span: '1/3',
    slot: {
      label: ({ item, label }) => `${item.element}-${label}`,
      error: ({ item, error }) => `${item.element}-${error}`,
    },
  },
  {
    prop: 'inputNumber',
    label: '数字输入框',
    element: 'input-number',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      min: 0,
      max: 100,
      step: 1,
    },
    span: '1/3',
  },
  {
    prop: 'radioGroup',
    label: '单选框组',
    element: 'radio-group',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      options: [
        { label: '选项A', value: 'A' },
        { label: '选项B', value: 'B' },
        { label: '选项C', value: 'C' },
      ],
    },
    span: '1/3',
  },
  {
    prop: 'rate',
    label: '评分',
    element: 'rate',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      max: 5,
      allowHalf: true,
    },
    span: '1/3',
  },
  {
    prop: 'select',
    label: '选择器',
    element: 'select',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      placeholder: '请选择',
      clearable: true,
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ],
    },
    span: '1/2',
    if: computed(() => formData.value.rate > 3),
  },
  {
    prop: 'slider',
    label: '滑块',
    element: 'slider',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      min: 0,
      max: 100,
      step: 1,
    },
    span: '1/2',
  },
  {
    prop: 'switch',
    label: '开关',
    element: 'switch',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      activeText: '开',
      inactiveText: '关',
    },
    span: '1/2',
  },
  {
    prop: 'timePicker',
    label: '时间选择器',
    element: 'time-picker',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      placeholder: '选择时间',
      format: 'HH:mm:ss',
      clearable: true,
      valueFormat: 'HH:mm:ss',
    },
    span: '1/2',
  },
  {
    prop: 'transfer',
    label: '穿梭框',
    element: 'transfer',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      data: [
        { key: 1, label: '选项1', disabled: true },
        { key: 2, label: '选项2' },
        { key: 3, label: '选项3' },
      ],
      titles: ['源列表', '目标列表'],
    },
    span: '2/1',
  },
  {
    prop: 'upload',
    label: '上传',
    element: 'upload',
    rules: [{ required: false, trigger: 'change' }],
    view: false,
    attrs: {
      action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
      listType: 'picture',
      limit: 3,
      onPreview: (file: any) => {
        console.log(file)
      },
      onRemove: (file: any, fileList: any) => {
        console.log(file, fileList)
      },
    },
    span: '1/1',
  },
])

const handleResetForm = () => {
  formRef.value?.resetFields()
}

const view = ref(false)
</script>

<template>
  <div style="width: 100%; height: 100vh">
    <div class="p-4">
      <UForm ref="formRef" v-model="formData" :view="view" :options="formOptions">
        <template #label-cascader="{ label }">
          <el-text type="primary">{{ `label-${label}` }}</el-text>
        </template>
        <template #error-cascader="{ item, error }">
          <el-text type="info">{{ `error-${error}` }}</el-text>
        </template>

        <template #error-input="{ item, error }">
          <el-text type="info">{{ `error-${error}` }}</el-text>
        </template>
      </UForm>
      <el-button @click="view = !view">{{ view ? '编辑模式' : '查看模式' }}</el-button>
      <el-button @click="handleResetForm">重置表单</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
.p-4 {
  padding: 16px;
}
.m-4 {
  margin: 16px;
}
</style>
