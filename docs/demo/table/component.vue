<script setup lang="ts">
import { markRaw, ref } from 'vue'
import { useTableData } from './useTableData'
import { ElMessage } from 'element-plus'
import { UOperation } from 'u-element-plus'
import type { TableColumns, OperationItem } from 'u-element-plus'
import type { TableDataItem } from './useTableData'

const { tableData, statusOptions, getOptionText, getOptionType } = useTableData(6, true)

// 操作按钮列表
const operations = ref<OperationItem<TableDataItem>[]>([
  { label: '添加', name: 'add' },
  // 根据状态判断是否显示编辑按钮
  { label: '编辑', name: 'edit', if: (row) => row.status === '1' },
  {
    label: '删除',
    name: 'delete',
    buttonAttrs: () => ({
      type: 'danger',
    }),
    confirmAttrs: (row, index) => ({
      title: `确定删除第【${index + 1}】条数据【${row.name}】吗？`,
      width: 170,
    }),
  },
  { label: '详情', name: 'detail' },
])

// 点击操作按钮
const handleClickOperation = (name: string, row: TableDataItem, index: number) => {
  if (name === 'delete') {
    ElMessage.error(`点击了第${index + 1}条数据【${row.name}】的【${name}】操作`)
  } else {
    ElMessage.success(`点击了第${index + 1}条数据【${row.name}】的【${name}】操作`)
  }
}

const tableColumns = ref<TableColumns<TableDataItem>>([
  { prop: 'id', label: '编号', width: 110, align: 'left', sortable: true },
  { prop: 'name', label: '姓名', minWidth: 90, align: 'center' },
  {
    prop: 'gender',
    label: '性别',
    width: 60,
    align: 'center',
    formatter: ({ row }) => (row.gender === '1' ? '男' : '女'),
  },
  { prop: 'birthday', label: '出生日期', width: 110, align: 'center', sortable: true },
  { prop: 'degree', label: '学历', width: 60, align: 'center' },
  { prop: 'school', label: '毕业学校', minWidth: 110, align: 'center' },
  { prop: 'major', label: '专业', minWidth: 138, align: 'left' },
  { prop: 'graduationYear', label: '毕业年份', width: 100, align: 'center' },
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
  {
    prop: 'operation',
    label: '操作',
    width: 218,
    align: 'center',
    fixed: 'right',
    component: markRaw(UOperation),
    attrs: {
      type: 'link',
      operations,
      onClickOperation: handleClickOperation,
    },
  },
])
</script>

<template>
  <u-table class="vp-raw" :data="tableData" :columns="tableColumns" stripe border>
    <template #status="{ row }">
      <el-tag :type="getOptionType(statusOptions, row.status)">
        {{ getOptionText(statusOptions, row.status) }}
      </el-tag>
    </template>
  </u-table>
</template>
