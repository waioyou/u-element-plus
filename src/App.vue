<script setup lang="ts">
import UForm from '@/components/form/form.vue'
import { h, ref } from 'vue'
import type { FormOptions, FormInstance, FormItemElementAttrs } from './components/form/type'
import { ElButton } from 'element-plus'

const formRef = ref<FormInstance>()
const formOptions = ref<FormOptions>({
  autocomplete: {
    label: '自动补全输入框',
    element: 'autocomplete',
    value: '1',
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
  cascader: {
    label: '级联选择器',
    element: 'cascader',
    value: [
      ['FuJian', 'Fuzhou'],
      ['FuJian', 'Xiamen'],
    ],
    rules: [{ required: true, trigger: 'change' }],
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
  checkboxGroup: {
    label: '多选框组',
    element: 'checkbox-group',
    value: ['sing', 'dance'],
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
      return h('span', item.value.join(', '))
    },
    span: '1/3',
  },
  colorPicker: {
    label: '取色器',
    element: 'color-picker',
    value: '#9B86D6',
    rules: [{ required: true, trigger: 'change' }],
    span: '1/3',
  },
  datePicker: {
    label: '日期选择器',
    element: 'date-picker',
    value: '2024-01-01',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      placeholder: '选择日期',
      type: 'datetime',
      format: 'YYYY-MM-DD',
      clearable: true,
    },
    span: '1/3',
  },
  input: {
    label: '输入框',
    element: 'input',
    value: '输入框',
    rules: [{ required: true, trigger: 'blur' }],
    attrs: {
      placeholder: '请输入',
      clearable: true,
    },
    span: '1/3',
    slot: {
      label: (item, label) => `${item.element}-${label}`,
      error: (item, error) => `${item.element}-${error}`,
    },
  },
  inputNumber: {
    label: '数字输入框',
    element: 'input-number',
    value: 0,
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      min: 0,
      max: 100,
      step: 1,
    },
    span: '1/3',
  },
  radioGroup: {
    label: '单选框组',
    element: 'radio-group',
    value: 'A',
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
  rate: {
    label: '评分',
    element: 'rate',
    value: 3,
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      max: 5,
      allowHalf: true,
    },
    span: '1/3',
  },
  select: {
    label: '选择器',
    element: 'select',
    value: '1',
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
  },
  slider: {
    label: '滑块',
    element: 'slider',
    value: 50,
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      min: 0,
      max: 100,
      step: 1,
    },
    span: '1/2',
  },
  switch: {
    label: '开关',
    element: 'switch',
    value: false,
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      activeText: '开',
      inactiveText: '关',
    },
    span: '1/2',
  },
  timePicker: {
    label: '时间选择器',
    element: 'time-picker',
    value: '20:05:01',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      placeholder: '选择时间',
      format: 'HH:mm:ss',
      clearable: true,
      valueFormat: 'HH:mm:ss',
    },
    span: '1/2',
  },
  transfer: {
    label: '穿梭框',
    element: 'transfer',
    value: [1, 2],
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
  upload: {
    label: '上传',
    element: 'upload',
    value: [
      {
        name: 'element-plus-logo.svg',
        url: 'https://element-plus.org/images/element-plus-logo.svg',
      },
      {
        name: 'element-plus-logo2.svg',
        url: 'https://element-plus.org/images/element-plus-logo.svg',
      },
    ],
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
})

const handleGetFormData = async () => {
  console.log(formRef.value)
  // formRef.value?.validateField(['cascader.value', 'checkboxGroup.value'])
  // formRef.value?.validateField()
  const res = await formRef.value?.getFormData(true)
  console.log(res)
}

const handleChange = (key: string, item: any) => {
  console.log('🚀 ~ handleChange ~ key:', key)
  console.log('🚀 ~ handleChange ~ item:', item)
}

const view = ref(false)
</script>

<template>
  <div style="width: 100%; height: 100vh">
    <div class="p-4">
      <UForm ref="formRef" v-model:options="formOptions" @change="handleChange" :view="view">
        <template #label-cascader="{ label }">
          <el-text type="primary">{{ `label-${label}` }}</el-text>
        </template>
        <template #error-cascader="{ item, error }">
          <el-text type="info">{{ `error-${error}` }}</el-text>
        </template>
        <template #cascader="{ item }">
          <el-text type="primary">{{ `default-${item.value}` }}</el-text>
        </template>
        <template #error-input="{ item, error }">
          <el-text type="info">{{ `error-${error}` }}</el-text>
        </template>
      </UForm>
      <el-button @click="handleGetFormData">获取表单数据</el-button>
      <el-button @click="view = !view">{{ view ? '编辑模式' : '查看模式' }}</el-button>
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
