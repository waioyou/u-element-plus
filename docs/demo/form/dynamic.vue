<script lang="ts" setup>
import { computed, ref } from 'vue'
import UForm from '../../../src/components/form'
import type { FormOptions } from '../../../src/components/form'

const formData = ref({
  q1: '',
  q2: [] as string[],
  q3: '',
  q4: '',
  q5: '',
  q6: '',
})

const formOptions = ref<FormOptions>([
  {
    prop: 'sec1',
    label: '关于"旅游体验"的动态关联问卷',
    element: 'title-bar',
    span: '1/1',
  },
  {
    prop: 'q1',
    label: '您在过去一年内是否进行过旅游？',
    element: 'radio-group',
    attrs: {
      options: [
        { label: '是', value: '1' },
        { label: '否', value: '2' },
      ],
    },
    rules: [{ required: true, trigger: 'change', message: '请选择您是否进行过旅游' }],
    span: '1/1',
  },
  {
    prop: 'q2',
    label: '您去过哪些类型的旅游目的地',
    element: 'checkbox-group',
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
    rendered: computed(() => formData.value.q1 === '1'),
  },
  {
    prop: 'q3',
    label: '在这些目的地中，您最喜欢哪一个？',
    element: 'radio-group',
    attrs: {
      options: [],
    },
    rules: [{ required: true, trigger: 'change', message: '请选择您最喜欢的一个旅游目的地' }],
    span: '1/1',
    rendered: computed(() => formData.value.q2.length > 1),
  },
  {
    prop: 'q4',
    label: '您的旅行通常持续多长时间？',
    element: 'radio-group',
    attrs: {
      options: [
        { value: 'short', label: '1-3天' },
        { value: 'medium', label: '4-7天' },
        { value: 'long', label: '8天以上' },
      ],
    },
    rules: [{ required: true, trigger: 'change', message: '请选择您的旅行通常持续多长时间' }],
    span: '1/1',
    rendered: computed(() => formData.value.q1 === '1'),
  },
  {
    prop: 'q5',
    label: '请简述您选择长期旅行的原因',
    element: 'input',
    attrs: {
      type: 'textarea',
      rows: 3,
    },
    span: '1/1',
    rendered: computed(() => formData.value.q4 === 'long'),
  },
  {
    prop: 'q6',
    label: '您对未来的旅行有什么期待或建议？',
    element: 'input',
    attrs: {
      type: 'textarea',
      rows: 3,
    },
    span: '1/1',
    display: computed(() => formData.value.q1 === '1'),
  },
])

const handleChange = (prop: string, item: any) => {
  if (prop === 'q2') {
    const q3 = formOptions.value[3]
    q3.attrs!.options = item.attrs.options.filter((d: any) => formData.value.q2.includes(d.value))
  }
}
</script>

<template>
  <div class="form-data">
    <u-form
      v-model="formData"
      :options="formOptions"
      label-position="top"
      @change="handleChange"
    ></u-form>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>
