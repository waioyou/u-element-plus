<script setup lang="ts">
import { onMounted } from 'vue'
import { ElTag } from 'element-plus'
import { useTable } from 'u-element-plus'
import { dicts, getDictType, getDictText, getUserList } from '@docs/mock/user'

const {
  tableRef,
  tableData,
  tableColumns,
  setTableColumns,
  multipleSelection,
  handleSelectionChange,
} = useTable(async () => {
  const res = await getUserList(10)
  return res.data
})

const selectionProps = {
  width: 60,
  align: 'center',
  selectable: (row: any, index: number) => {
    return index % 2 === 0
  },
}

onMounted(() => {
  setTableColumns([
    { prop: 'id', label: '编号', width: 100, align: 'center' },
    { prop: 'name', label: '姓名', minWidth: 90, align: 'center' },
    {
      prop: 'gender',
      label: '性别',
      width: 60,
      align: 'center',
      formatter: ({ row }) => getDictText(dicts.gender, row.gender),
    },
    { prop: 'birthday', label: '出生日期', width: 110, align: 'center' },
    { prop: 'degree', label: '学历', width: 60, align: 'center' },
    { prop: 'school', label: '毕业学校', minWidth: 110, align: 'center' },
    { prop: 'major', label: '专业', minWidth: 120, align: 'left' },
    { prop: 'graduationYear', label: '毕业年份', width: 80, align: 'center' },
    { prop: 'status', label: '状态', width: 80, align: 'center' },
    { prop: 'remark', label: '备注', minWidth: 200, showOverflowTooltip: true, align: 'left' },
  ])
})

const handleSelectAll = () => {
  tableRef.value?.toggleAllSelection()
}

const handleSelectNone = () => {
  tableRef.value?.clearSelection()
}
</script>

<template>
  <div class="mb-4">
    <el-button type="primary" @click="handleSelectAll">全选</el-button>
    <el-button type="primary" @click="handleSelectNone">取消全选</el-button>
    <el-text class="float-right" type="primary">
      当前选中{{ multipleSelection.length }}条数据
    </el-text>
  </div>
  <u-table
    ref="tableRef"
    class="vp-raw"
    :data="tableData"
    :columns="tableColumns"
    stripe
    show-selection
    :selection-props="selectionProps"
    @selection-change="handleSelectionChange"
  >
    <template #status="{ row }">
      <el-tag :type="getDictType(dicts.status, row.status)">
        {{ getDictText(dicts.status, row.status) }}
      </el-tag>
    </template>
  </u-table>
</template>
