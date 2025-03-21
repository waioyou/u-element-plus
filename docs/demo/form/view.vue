<script lang="tsx" setup>
import { onMounted, ref } from 'vue'
import { useForm } from 'u-element-plus'
import { dicts, getDictText, getUserDetail } from '../../mock/user'
import { ElButton } from 'element-plus'

const isView = ref(false)

const { formData, formColumns, createFormColumnWithElement, setFormColumns, getFormData } = useForm(
  async () => {
    const res = await getUserDetail(2)
    return res.data
  },
)

onMounted(async () => {
  getFormData()

  setFormColumns({
    id: createFormColumnWithElement('input', {
      label: 'ID',
      span: '1/2',
      view: true,
      display: false,
    }),
    sec1: createFormColumnWithElement('title-bar', {
      label: '基本信息',
      attrs: {
        renderToolbar: () => (
          <ElButton type="primary" onClick={() => (isView.value = !isView.value)}>
            {isView.value ? '进入编辑模式' : '进入查看模式'}
          </ElButton>
        ),
      },
    }),
    name: createFormColumnWithElement('input', {
      label: '姓名',
      span: '1/2',
      rules: [{ required: true, message: '请输入姓名' }],
      view: true,
      attrs: {
        placeholder: '请输入姓名',
      },
    }),
    email: createFormColumnWithElement('input', {
      label: '邮箱',
      span: '1/2',
      rules: [{ required: true, message: '请输入邮箱' }],
      attrs: {
        placeholder: '请输入邮箱',
      },
    }),
    age: createFormColumnWithElement('input-number', {
      label: '年龄',
      span: '1/2',
      rules: [{ required: true, message: '请输入年龄' }],
      attrs: {
        placeholder: '请输入年龄',
        min: 0,
        max: 120,
      },
    }),
    degree: createFormColumnWithElement('radio-group', {
      label: '学历',
      span: '1/2',
      rules: [{ required: true, message: '请输入学历' }],
      attrs: {
        options: dicts.degree,
      },
    }),
    major: createFormColumnWithElement('select', {
      label: '专业',
      span: '1/2',
      attrs: {
        placeholder: '请输入专业',
        options: dicts.major,
      },
      rules: [{ required: true, message: '请输入专业' }],
    }),
    graduationYear: createFormColumnWithElement('date-picker', {
      label: '毕业年份',
      span: '1/2',
      attrs: {
        type: 'year',
        format: 'YYYY',
        valueFormat: 'YYYY',
        placeholder: '请输入毕业年份',
      },
    }),
    status: createFormColumnWithElement('switch', {
      label: '状态',
      span: '1/2',
      attrs: {
        placeholder: '请输入状态',
        activeValue: '1',
        inactiveValue: '0',
        activeText: '启用',
        inactiveText: '禁用',
      },
      rules: [{ required: true, message: '请输入状态' }],
    }),
    score: createFormColumnWithElement('rate', {
      label: '评分',
      span: '1/2',
      attrs: {
        placeholder: '请输入评分',
        showText: true,
        texts: dicts.score.map((item) => item.label),
      },
      formatter: () => {
        return getDictText(dicts.score, formData.value['score'])
      },
    }),
    remark: createFormColumnWithElement('input', {
      label: '备注',
      span: '1/1',
      attrs: {
        placeholder: '请输入备注',
        type: 'textarea',
        rows: 4,
        maxlength: 200,
        showPassword: true,
      },
    }),
  })
})
</script>

<template>
  <u-form ref="formRef" v-model="formData" :columns="formColumns" :view="isView"> </u-form>
</template>
