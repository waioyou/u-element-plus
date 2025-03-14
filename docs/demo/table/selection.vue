<script setup lang="ts">
import { ref } from 'vue'
import { useTableData } from './useTableData'
import type { TableDataItem } from './useTableData'
import type { TableColumns } from 'u-element-plus'

const { tableData } = useTableData(8)

const tableColumns = ref<TableColumns<TableDataItem>>([
  { prop: 'id', label: '编号', width: 100, align: 'center' },
  { prop: 'name', label: '姓名', minWidth: 90, align: 'center' },
  { prop: 'gender', label: '性别', width: 60, align: 'center' },
  { prop: 'birthday', label: '出生日期', width: 110, align: 'center' },
  { prop: 'degree', label: '学历', width: 60, align: 'center' },
  { prop: 'school', label: '毕业学校', minWidth: 110, align: 'center' },
  { prop: 'major', label: '专业', minWidth: 120, align: 'left' },
  { prop: 'graduationYear', label: '毕业年份', width: 80, align: 'center' },
  { prop: 'status', label: '状态', width: 80, align: 'center' },
  { prop: 'remark', label: '备注', minWidth: 200, showOverflowTooltip: true, align: 'left' },
])

const selectionProps = {
  width: 60,
  align: 'center',
  selectable: (row: any, index: number) => {
    return index % 2 === 0
  },
}
</script>

<template>
  <u-table
    class="vp-raw"
    :data="tableData"
    :columns="tableColumns"
    stripe
    show-selection
    :selection-props="selectionProps"
  ></u-table>
</template>
