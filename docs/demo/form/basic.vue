<script lang="ts" setup>
import { ref } from 'vue'
import type { FormColumns } from 'u-element-plus'

const formData = ref({
  autocomplete: 'vue',
  cascader: [
    ['FuJian', 'Fuzhou'],
    ['FuJian', 'Xiamen'],
  ],
  checkboxGroup: ['sing', 'dance'],
  colorPicker: '#9B86D6',
  datePicker: '2024-01-01',
  input: '输入框',
  inputNumber: 0,
  radioGroup: 'A',
  rate: 3,
  select: 1,
  selectV2: 1,
  slider: 50,
  switch: true,
  timePicker: '20:05:01',
  transfer: [1, 2],
  treeSelect: ['1-1-1', '1-1-3'],
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

const formColumns = ref<FormColumns>({
  titleBar: {
    label: '基础信息',
    element: 'title-bar',
    span: '1/1',
  },
  autocomplete: {
    label: '自动补全输入框',
    element: 'autocomplete',
    tooltip: '自动补全输入框',
    attrs: {
      placeholder: '请输入',
      clearable: true,
      triggerOnFocus: true,
      fetchSuggestions: (queryString: string, cb: any) => {
        cb(
          [
            { value: 'vue', link: 'https://github.com/vuejs/vue' },
            { value: 'element', link: 'https://github.com/ElemeFE/element' },
            { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
            { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
            { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
            { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
            { value: 'babel', link: 'https://github.com/babel/babel' },
          ].filter((item) => item.value.includes(queryString)),
        )
      },
    },
    span: '1/2',
  },
  cascader: {
    label: '级联选择器',
    element: 'cascader',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
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
        multiple: true,
      },
    },
    span: '1/2',
  },

  checkboxGroup: {
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
    span: '1/2',
  },
  colorPicker: {
    label: '取色器',
    element: 'color-picker',
    rules: [{ required: true, trigger: 'change' }],
    span: '1/2',
    attrs: {
      showAlpha: true,
    },
  },
  datePicker: {
    label: '日期选择器',
    element: 'date-picker',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      placeholder: '选择日期',
      type: 'datetime',
      format: 'YYYY-MM-DD',
      clearable: true,
    },
    span: '1/2',
  },
  input: {
    label: '输入框',
    element: 'input',
    rules: [{ required: true, trigger: 'blur' }],
    attrs: {
      placeholder: '请输入',
      clearable: true,
      onInput: (value: string) => {
        console.log(value)
      },
    },
    span: '1/2',
  },
  inputNumber: {
    label: '数字输入框',
    element: 'input-number',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      min: 0,
      max: 100,
      step: 1,
    },
    span: '1/2',
  },
  radioGroup: {
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
    span: '1/2',
  },
  rate: {
    label: '评分',
    element: 'rate',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      max: 5,
      allowHalf: true,
    },
    span: '1/2',
  },
  select: {
    label: '选择器',
    element: 'select',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      placeholder: '请选择',
      clearable: true,
      options: Array.from({ length: 10 }, (_, i) => ({
        label: `选项 ${i + 1}`,
        value: i + 1,
      })),
    },
    span: '1/2',
  },
  selectV2: {
    label: '虚拟化选择器',
    element: 'select-v2',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      placeholder: '请选择',
      clearable: true,
      options: Array.from({ length: 10000 }, (_, i) => ({
        label: `选项 ${i + 1}`,
        value: i + 1,
      })),
      props: {},
    },
    span: '1/2',
  },
  slider: {
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
  switch: {
    label: '开关',
    element: 'switch',
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
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      data: Array.from({ length: 10 }, (_, i) => ({
        key: i + 1,
        label: `选项 ${i + 1}`,
        disabled: i % 2 === 0,
      })),
      titles: ['源列表', '目标列表'],
    },
    span: '1/1',
  },
  treeSelect: {
    label: '树形选择器',
    element: 'tree-select',
    rules: [{ required: true, trigger: 'change' }],
    attrs: {
      multiple: true,
      showCheckbox: true,
      data: Array.from({ length: 10 }, (_, i) => ({
        value: i + 1,
        label: `Level1 【${i + 1}】`,
        children: Array.from({ length: 3 }, (_, j) => ({
          value: `${i + 1}-${j + 1}`,
          label: `Level2 【${i + 1}-${j + 1}】`,
          children: Array.from({ length: 3 }, (_, k) => ({
            value: `${i + 1}-${j + 1}-${k + 1}`,
            label: `Level3 【${i + 1}-${j + 1}-${k + 1}】`,
            disabled: k % 2 !== 0,
          })),
        })),
      })),
    },
    span: '1/1',
  },
  upload: {
    label: '上传',
    element: 'upload',
    rules: [{ required: false, trigger: 'change' }],
    view: false,
    attrs: {
      style: { width: '350px' },
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
</script>

<template>
  <div class="basic">
    <u-form v-model="formData" :columns="formColumns"></u-form>
  </div>
</template>

<style lang="scss" scoped>
.basic {
  width: 100%;
}
</style>
