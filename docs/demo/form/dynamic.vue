<script lang="ts" setup>
import { ref } from 'vue'
import UForm from '../../../src/components/form'
import type { FormOptions } from '../../../src/components/form'

const formOptions = ref<FormOptions>({
  sec1: {
    label: '关于"旅游体验"的动态关联问卷',
    element: 'section-header',
    span: '1/1',
  },
  q1: {
    label: '您在过去一年内是否进行过旅游？',
    element: 'radio-group',
    value: '',
    attrs: {
      options: [
        { label: '是', value: '1' },
        { label: '否', value: '2' },
      ],
    },
    rules: [{ required: true, trigger: 'change', message: '请选择您是否进行过旅游' }],
    span: '1/1',
  },
  q2: {
    label: '您去过哪些类型的旅游目的地',
    element: 'checkbox-group',
    value: [],
    attrs: {
      options: [
        { value: 'beach', label: '海滩' },
        { value: 'mountain', label: '山地' },
        { value: 'city', label: '城市' },
        { value: 'countryside', label: '乡村' },
        { value: 'theme-park', label: '主题乐园' },
      ],
    },
    rules: [{ required: true, trigger: 'change', message: '请选择您去过的旅游目的地' }],
    span: '1/1',
    if: false,
  },
  q3: {
    label: '在这些目的地中，您最喜欢哪一个？',
    element: 'radio-group',
    value: '',
    attrs: {
      options: [],
    },
    rules: [{ required: true, trigger: 'change', message: '请选择您最喜欢的一个旅游目的地' }],
    span: '1/1',
    if: false,
  },
  q4: {
    label: '您的旅行通常持续多长时间？',
    element: 'radio-group',
    value: 0,
    attrs: {
      options: [
        { value: 'short', label: '1-3天' },
        { value: 'medium', label: '4-7天' },
        { value: 'long', label: '8天以上' },
      ],
    },
    rules: [{ required: true, trigger: 'change', message: '请选择您的旅行通常持续多长时间' }],
    span: '1/1',
    if: false,
  },
  q5: {
    label: '请简述您选择长期旅行的原因',
    element: 'input',
    value: '',
    attrs: {
      type: 'textarea',
      rows: 3,
    },
    span: '1/1',
    if: false,
  },
  q6: {
    label: '您对未来的旅行有什么期待或建议？',
    element: 'input',
    value: '',
    attrs: {
      type: 'textarea',
      rows: 3,
    },
    span: '1/1',
    show: false,
  },
})

const handleChange = (name: string, item: any) => {
  if (name === 'q1') {
    formOptions.value.q2.if = item.value === '1'
    formOptions.value.q4.if = item.value === '1'
    formOptions.value.q6.show = item.value === '1'
  } else if (name === 'q2') {
    formOptions.value.q3.if = item.value.length > 1
    formOptions.value.q3.attrs.options = item.attrs.options.filter((d: any) =>
      item.value.includes(d.value),
    )
  } else if (name === 'q4') {
    formOptions.value.q5.if = item.value === 'long'
  }
}
</script>

<template>
  <div class="form-data">
    <u-form v-model:options="formOptions" label-position="top" @change="handleChange"></u-form>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>
