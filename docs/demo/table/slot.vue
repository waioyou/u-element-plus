<script setup lang="ts">
import { h, ref } from 'vue'
import { useTableData } from './useTableData'
import { ElIcon, ElText } from 'element-plus'
import { Search, User } from '@element-plus/icons-vue'
import { ElTag } from 'element-plus'
import type { TableColumns } from 'u-element-plus'
import type { TableDataItem } from './useTableData'

const { tableData, genderOptions, statusOptions, scoreOptions, getOptionText, getOptionType } =
  useTableData(10, true)

const tableColumns = ref<TableColumns<TableDataItem>>([
  { prop: 'id', label: '编号', width: 110, align: 'left', sortable: true },
  { prop: 'name', label: '姓名', minWidth: 90, align: 'center' },
  {
    prop: 'gender',
    label: '性别',
    width: 60,
    align: 'center',
    formatter: ({ row }) => {
      return h(
        ElText,
        { type: row.gender === '1' ? 'primary' : 'warning' },
        getOptionText(genderOptions, row.gender),
      )
    },
  },
  { prop: 'birthday', label: '出生日期', width: 110, align: 'center', sortable: true },
  { prop: 'degree', label: '学历', width: 60, align: 'center' },
  { prop: 'school', label: '毕业学校', minWidth: 110, align: 'center' },
  { prop: 'major', label: '专业', minWidth: 130, align: 'left' },
  { prop: 'graduationYear', label: '毕业年份', width: 80, align: 'center' },
  {
    prop: 'score',
    label: '个人评分',
    width: 120,
    align: 'center',
    sortable: true,
    formatter: ({ row }) => {
      return h(ElText, { type: getOptionType(scoreOptions, row.score) }, () =>
        getOptionText(scoreOptions, row.score),
      )
    },
  },
  {
    prop: 'status',
    label: '状态',
    width: 80,
    align: 'center',
    filters: statusOptions.map((d) => ({ text: d.label, value: d.value })),
    filterMethod: (value: any, row: any, column: any) => {
      const property = column['property']
      return row[property] === value
    },
    renderFilterIcon: () => {
      return h(ElIcon, { style: { marginLeft: '8px' } }, () => h(Search))
    },
    renderHeader: (data) => {
      return data.item.label!
    },
    formatter: ({ row }) => {
      return h(ElTag, { type: getOptionType(statusOptions, row.status) }, () =>
        getOptionText(statusOptions, row.status),
      )
    },
  },
  {
    prop: 'address',
    label: '地址',
    minWidth: 200,
    align: 'left',
    showOverflowTooltip: true,
    formatter: ({ row }) => {
      return `${row.province}${row.city}${row.district}${row.address}`
    },
  },
])
</script>

<template>
  <u-table class="vp-raw" :data="tableData" :columns="tableColumns" stripe>
    <template #header-name="{ item }">
      <el-icon><User /></el-icon>
      {{ item.label }}
    </template>
    <!-- ID列自定义 -->
    <template #id="{ row }">
      <el-tag size="small" effect="dark">{{ row.id }}</el-tag>
    </template>
    <!-- 性别列自定义: 插槽的优先级高于formatter -->
    <template #gender="{ row }">
      {{ getOptionText(genderOptions, row.gender) }}
    </template>
  </u-table>
</template>
