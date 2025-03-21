<script setup lang="ts">
import { useForm } from 'u-element-plus'
import { onMounted } from 'vue'

interface FormData {
  username?: string
  gender?: string
  status?: string
  phone?: string
  createdAt?: string
  updatedAt?: string
}

const { formData, formColumns, createFormColumnWithElement, setFormColumns } = useForm<FormData>(
  async () => ({}),
)

onMounted(() => {
  setFormColumns({
    username: createFormColumnWithElement('input', {
      class: 'w-55',
      attrs: {
        clearable: true,
        placeholder: '用户名',
      },
    }),
    phone: createFormColumnWithElement('input', {
      class: 'w-55',
      attrs: {
        placeholder: '手机号',
      },
    }),
    gender: createFormColumnWithElement('select', {
      class: 'w-55',
      attrs: {
        placeholder: '性别',
        clearable: true,
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
      },
    }),
    status: createFormColumnWithElement('select', {
      class: 'w-55',
      attrs: {
        placeholder: '状态',
        clearable: true,
        options: [
          { label: '启用', value: 'enabled' },
          { label: '禁用', value: 'disabled' },
        ],
      },
    }),
    createdAt: createFormColumnWithElement('date-picker', {
      class: 'w-70',
      attrs: {
        clearable: true,
        type: 'daterange',
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
        startPlaceholder: '创建开始日期',
        endPlaceholder: '创建结束日期',
        onChange: (value: any) => {
          console.log(value)
        },
      },
    }),
    updatedAt: createFormColumnWithElement('date-picker', {
      class: 'w-70',
      attrs: {
        clearable: true,
        type: 'daterange',
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
        startPlaceholder: '更新开始日期',
        endPlaceholder: '更新结束日期',
      },
    }),
  })
})
</script>

<template>
  <u-form v-model="formData" :columns="formColumns" inline>
    <template #searchbar>
      <el-button type="primary">查询</el-button>
      <el-button>重置</el-button>
    </template>
  </u-form>
</template>
