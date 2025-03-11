<script setup lang="ts">
import { h, ref } from 'vue'
import type { TableColumns, TableInstance } from 'u-element-plus'
import { ElTag } from 'element-plus'
import { ElMessage } from 'element-plus'

interface TableDataItem {
  date: string
  name: string
  age: number
  gender: string
  position: string
  status: 0 | 1
  score: number
}

const tableData = ref<TableDataItem[]>([
  {
    date: '2024-03-05',
    name: '张三',
    age: 25,
    gender: '男',
    position: '前端工程师',
    status: 1,
    score: 5,
  },
  {
    date: '2024-03-06',
    name: '李四',
    age: 28,
    gender: '女',
    position: '产品经理',
    status: 1,
    score: 4,
  },
  {
    date: '2024-03-07',
    name: '王五',
    age: 32,
    gender: '男',
    position: 'UI设计师',
    status: 0,
    score: 3,
  },
  {
    date: '2024-03-08',
    name: '赵六',
    age: 22,
    gender: '女',
    position: '测试工程师',
    status: 1,
    score: 5,
  },
])

const columns = ref<TableColumns>([
  {
    prop: 'date',
    label: '入职日期',
    width: 180,
    element: 'date-picker',
    required: true,
    attrs: {
      placeholder: '请选择入职日期',
      clearable: true,
      'value-format': 'YYYY-MM-DD',
      type: 'date',
      format: 'YYYY-MM-DD',
    },
  },
  {
    prop: 'name',
    label: '姓名',
    minWidth: 120,
    align: 'left',
    element: 'input',
    rules: [{ required: true, message: '请输入姓名' }],
    attrs: {
      placeholder: '请输入姓名',
      clearable: true,
    },
  },
  {
    prop: 'age',
    label: '年龄',
    width: 180,
    align: 'center',
    element: 'input-number',
    rules: [{ required: true, message: '请输入年龄' }],
    attrs: {
      placeholder: '请输入年龄',
      clearable: true,
      min: 0,
      max: 120,
    },
  },
  {
    prop: 'gender',
    label: '性别',
    width: 140,
    align: 'center',
    element: 'select',
    rules: [{ required: true, message: '请选择性别' }],
    attrs: {
      placeholder: '请选择性别',
      clearable: true,
      options: [
        { label: '男', value: '男' },
        { label: '女', value: '女' },
      ],
    },
  },
  {
    prop: 'position',
    label: '职位',
    width: 140,
    align: 'center',
    element: 'select',
    rules: [{ required: true, message: '请输入职位' }],
    attrs: {
      placeholder: '请输入职位',
      clearable: true,
      options: [
        { label: '前端工程师', value: '前端工程师' },
        { label: '产品经理', value: '产品经理' },
        { label: 'UI设计师', value: 'UI设计师' },
        { label: '测试工程师', value: '测试工程师' },
      ],
    },
  },
  {
    prop: 'status',
    label: '状态',
    width: 140,
    align: 'center',
    element: 'switch',
    rules: [{ required: true, message: '请选择状态' }],
    attrs: {
      activeValue: 1,
      activeText: '启用',
      inactiveValue: 0,
      inactiveText: '禁用',
    },
    formatter: ({ row }) => {
      return h(ElTag, { type: row.status === 1 ? 'success' : 'danger' }, () =>
        row.status === 1 ? '启用' : '禁用',
      )
    },
  },
  {
    prop: 'score',
    label: '评分',
    width: 140,
    align: 'center',
    element: 'rate',
    rules: [{ required: true, message: '请选择评分' }],
    attrs: {
      clearable: true,
      max: 5,
    },
    formatter: ({ row }) => {
      return '🌟'.repeat(row.score)
    },
  },
])

const editable = ref(false)
const tableRef = ref<TableInstance>()

const handleExitEditable = () => {
  tableRef.value?.validate((valid) => {
    if (valid) {
      editable.value = false
    } else {
      ElMessage.error('请检查表格数据')
    }
  })
}
</script>

<template>
  <div class="table-demo-edit">
    <u-table
      ref="tableRef"
      class="vp-raw"
      :data="tableData"
      :columns="columns"
      stripe
      :editable="editable"
    >
    </u-table>
    <div class="footer">
      <el-button v-if="!editable" type="primary" @click="editable = true">进入编辑模式</el-button>
      <el-button v-else @click="handleExitEditable">退出编辑模式</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-demo-edit {
  .footer {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
}
</style>
