<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { FormColumn, useForm } from 'u-element-plus'

const { formRef, formData, formColumns, setFormColumns, createFormColumnWithElement } = useForm()
const handleChange = (prop: string, item: FormColumn) => {
  console.log(prop, item)
  if (prop === 'q2') {
    const options = item.attrs!.options.filter((d: any) => formData.value.q2.includes(d.value))
    formColumns.value.q3.attrs!.options = options
  }
}

onMounted(() => {
  setFormColumns({
    sec1: createFormColumnWithElement('title-bar', {
      label: '关于"旅游体验"的动态关联问卷',
      span: '1/1',
    }),
    q1: createFormColumnWithElement('radio-group', {
      label: '您在过去一年内是否进行过旅游？',
      attrs: {
        options: [
          { label: '是', value: '1' },
          { label: '否', value: '2' },
        ],
      },
      rules: [{ required: true, trigger: 'change', message: '请选择您是否进行过旅游' }],
      span: '1/1',
    }),
    q2: createFormColumnWithElement('checkbox-group', {
      label: '您去过哪些类型的旅游目的地',
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
      rendered: () => formData.value.q1 === '1',
    }),
    q3: createFormColumnWithElement('checkbox-group', {
      label: '在这些目的地中，您最喜欢哪一个？',
      attrs: {
        options: [],
      },
      rules: [{ required: true, trigger: 'change', message: '请选择您最喜欢的一个旅游目的地' }],
      span: '1/1',
      rendered: () => formData.value.q2?.length > 1,
    }),
    q4: {
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
    q5: {
      label: '请简述您选择长期旅行的原因',
      element: 'input',
      attrs: {
        type: 'textarea',
        rows: 3,
      },
      span: '1/1',
      rendered: computed(() => formData.value.q4 === 'long'),
    },
    q6: {
      label: '您对未来的旅行有什么期待或建议？',
      element: 'input',
      attrs: {
        type: 'textarea',
        rows: 3,
      },
      span: '1/1',
      display: computed(() => formData.value.q1 === '1'),
    },
  })
})
</script>

<template>
  <u-form
    ref="formRef"
    v-model="formData"
    :columns="formColumns"
    label-position="top"
    @change="handleChange"
  ></u-form>
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>
