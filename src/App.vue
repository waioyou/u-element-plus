<script setup lang="ts">
import UForm from '@/components/form/form.vue'
import { ref } from 'vue'
import { FormItemElementEnum } from './components/form/type'
import type { FormOptions, FormInstance } from './components/form/type'

const formRef = ref<FormInstance>()
const formOptions = ref<FormOptions>({
  secbar1: {
    label: '基础信息',
    element: FormItemElementEnum.Input,
    if: (options) => {
      return options.checkboxGroup.value.length > 0
    },
  },
  autocomplete: {
    label: '自动补全输入框',
    element: FormItemElementEnum.AutoComplete,
    value: '',
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
  },
  cascader: {
    label: '级联选择器',
    element: FormItemElementEnum.Cascader,
    value: [],
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
    },
  },
  checkboxGroup: {
    label: '多选框组',
    element: FormItemElementEnum.CheckboxGroup,
    value: [],
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      options: [
        { label: '唱', value: 'sing' },
        { label: '跳', value: 'dance' },
        { label: 'rap', value: 'rap' },
        { label: '篮球', value: 'basketball' },
      ],
    },
    style: { width: '50%' },
  },
  colorPicker: {
    label: '取色器',
    element: FormItemElementEnum.ColorPicker,
    value: '#9B86D6',
    rules: [{ required: true, trigger: 'change' }],
  },
  datePicker: {
    label: '日期选择器',
    element: FormItemElementEnum.DatePicker,
    value: '',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      placeholder: '选择日期',
      type: 'date',
      format: 'YYYY-MM-DD',
      clearable: true,
    },
  },
  input: {
    label: '输入框',
    element: FormItemElementEnum.Input,
    value: '',
    rules: [{ required: true, trigger: 'blur' }],
    attrs: {
      placeholder: '请输入',
      clearable: true,
    },
  },
  inputNumber: {
    label: '数字输入框',
    element: FormItemElementEnum.InputNumber,
    value: 0,
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      min: 0,
      max: 100,
      step: 1,
    },
  },
  radioGroup: {
    label: '单选框组',
    element: FormItemElementEnum.RadioGroup,
    value: '',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      options: [
        { label: '选项A', value: 'A' },
        { label: '选项B', value: 'B' },
        { label: '选项C', value: 'C' },
      ],
    },
  },
  rate: {
    label: '评分',
    element: FormItemElementEnum.Rate,
    value: 3,
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      max: 5,
      allowHalf: true,
    },
  },
  select: {
    label: '选择器',
    element: FormItemElementEnum.Select,
    value: '',
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
  },
  slider: {
    label: '滑块',
    element: FormItemElementEnum.Slider,
    value: 50,
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      min: 0,
      max: 100,
      step: 1,
    },
  },
  switch: {
    label: '开关',
    element: FormItemElementEnum.Switch,
    value: false,
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      activeText: '开',
      inactiveText: '关',
    },
  },
  timePicker: {
    label: '时间选择器',
    element: FormItemElementEnum.TimePicker,
    value: '',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      placeholder: '选择时间',
      format: 'HH:mm:ss',
      clearable: true,
    },
  },
  transfer: {
    label: '穿梭框',
    element: FormItemElementEnum.Transfer,
    value: [],
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      data: [
        { key: 1, label: '选项1', disabled: true },
        { key: 2, label: '选项2' },
        { key: 3, label: '选项3' },
      ],
      titles: ['源列表', '目标列表'],
    },
  },
  upload: {
    label: '上传',
    element: FormItemElementEnum.Upload,
    value: [],
    rules: [{ required: false, trigger: 'change' }],
    attrs: {
      action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
      listType: 'picture-card',
      limit: 3,
      onPreview: (file: any) => {
        console.log(file)
      },
      onRemove: (file: any, fileList: any) => {
        console.log(file, fileList)
      },
    },
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
</script>

<template>
  <div style="width: 100%; height: 100vh">
    <div class="p-4" style="width: 800px">
      <UForm ref="formRef" v-model:options="formOptions" @change="handleChange" />
      <el-button @click="handleGetFormData">获取表单数据</el-button>
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
