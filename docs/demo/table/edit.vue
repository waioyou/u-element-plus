<script setup lang="ts">
import { ref } from 'vue'
import { useTableData } from './useTableData'
import { ElMessage } from 'element-plus'
import { getOptionText } from '@/utils'
import type { TableColumns, TableInstance } from 'u-element-plus'
import type { TableDataItem } from './useTableData'

const tableRef = ref<TableInstance>()
const editable = ref(false)

const { tableData, genderOptions, schoolOptions, scoreOptions, statusOptions } = useTableData(
  6,
  true,
)

const columns = ref<TableColumns<TableDataItem>>([
  { prop: 'id', label: '编号', width: 110, align: 'left', sortable: true },
  {
    prop: 'name',
    label: '姓名',
    minWidth: 120,
    align: 'left',
    element: 'input',
    rules: [{ required: true, message: '请输入姓名' }],
    attrs: {
      placeholder: '请输入',
      clearable: true,
    },
  },
  {
    prop: 'gender',
    label: '性别',
    minWidth: 100,
    align: 'center',
    element: 'select',
    rules: [{ required: true, message: '请选择性别' }],
    attrs: {
      placeholder: '请选择',
      clearable: true,
      options: genderOptions,
    },
    formatter: ({ row }) => {
      return getOptionText(genderOptions, row.gender)
    },
  },
  {
    prop: 'birthday',
    label: '出生日期',
    minWidth: 160,
    align: 'center',
    element: 'date-picker',
    rules: [{ required: true, message: '请选择出生日期' }],
    attrs: {
      placeholder: '请选择',
      clearable: true,
      type: 'date',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    minWidth: 140,
    align: 'center',
    element: 'input-number',
    rules: [{ required: true, message: '请输入年龄' }],
    attrs: {
      placeholder: '请输入',
      clearable: true,
    },
  },
  {
    prop: 'school',
    label: '毕业学校',
    minWidth: 150,
    align: 'center',
    element: 'autocomplete',
    rules: [{ required: true, message: '请输入毕业学校' }],
    attrs: {
      placeholder: '请输入',
      clearable: true,
      fetchSuggestions: (queryString: string, cb: (results: any[]) => void) => {
        const results = queryString
          ? schoolOptions.filter((item) => item.label.includes(queryString))
          : schoolOptions
        cb(results)
      },
    },
  },
  {
    prop: 'score',
    label: '评分',
    minWidth: 140,
    align: 'center',
    element: 'rate',
    rules: [{ required: true, message: '请选择评分' }],
    attrs: {
      max: 5,
    },
    formatter: ({ row }) => {
      return getOptionText(scoreOptions, row.score)
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
      activeValue: '1',
      inactiveValue: '0',
      activeText: '正常',
      inactiveText: '停用',
    },
    formatter: ({ row }) => {
      return getOptionText(statusOptions, row.status)
    },
  },
])

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
