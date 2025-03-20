<script lang="ts" setup>
import { onMounted } from 'vue'
import { useForm } from 'u-element-plus'
import { getUserDetail } from '../../mock/user'

const { formData, formColumns, createFormColumnWithElement, setFormColumns } = useForm(async () => {
  const res = await getUserDetail(2)
  return res.data
})

onMounted(() => {
  setFormColumns([
    createFormColumnWithElement('input', {
      prop: 'name',
      label: '用户名',
      attrs: {
        placeholder: '请输入用户名',
        maxlength: 10,
      },
      rules: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
      tooltip: '用户名最多10个字符',
      class: 'w-70!',
    }),
    createFormColumnWithElement('input', {
      prop: 'phone',
      label: '手机号',
      attrs: {
        placeholder: '请输入手机号',
      },
      rules: [
        { required: true, trigger: 'blur', message: '请输入手机号' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
      ],
      tooltip: '请输入正确的手机号',
      class: 'w-70!',
    }),
    createFormColumnWithElement('input', {
      prop: 'email',
      label: '邮箱',
      attrs: {
        placeholder: '请输入邮箱',
      },
      rules: [
        { required: true, trigger: 'blur', message: '请输入手机号' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
      ],
      tooltip: '请输入正确的手机号',
      class: 'w-70!',
    }),
  ])
})
</script>

<template>
  <u-form v-model="formData" :columns="formColumns" inline> </u-form>
</template>
