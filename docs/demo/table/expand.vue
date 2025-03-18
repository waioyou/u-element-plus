<script setup lang="ts">
import { onMounted } from 'vue'
import { ElTag } from 'element-plus'
import { useTable } from 'u-element-plus'
import { dicts, getDictType, getDictText, getUserList } from '@docs/mock/user'

const { tableData, tableColumns, setTableColumns } = useTable(async () => {
  const res = await getUserList(8)
  return res.data
})

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
</script>

<template>
  <u-table
    class="vp-raw"
    :data="tableData"
    :columns="tableColumns"
    stripe
    show-expand
    :expand-props="{
      width: 40,
    }"
  >
    <template #expand>
      <div>展开行</div>
    </template>
    <template #status="{ row }">
      <el-tag :type="getDictType(dicts.status, row.status)">
        {{ getDictText(dicts.status, row.status) }}
      </el-tag>
    </template>
  </u-table>
</template>
