<script setup lang="ts">
import { h, onMounted } from 'vue'
import { ElText, ElTag } from 'element-plus'
import { useTable } from 'u-element-plus'
import { dicts, getDictType, getDictText, getUserList } from '@docs/mock/user'

const { loading, tableRef, tableData, tableColumns, setTableColumns } = useTable(async () => {
  const res = await getUserList(10)
  return res.data
})

onMounted(() => {
  setTableColumns([
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
          getDictText(dicts.gender, row.gender),
        )
      },
    },
    { prop: 'birthday', label: '出生日期', width: 110, align: 'center', sortable: true },
    { prop: 'degree', label: '学历', width: 60, align: 'center' },
    { prop: 'school', label: '毕业学校', minWidth: 110, align: 'center' },
    { prop: 'major', label: '专业', minWidth: 140, align: 'left' },
    { prop: 'graduationYear', label: '毕业年份', width: 80, align: 'center' },
    {
      prop: 'score',
      label: '个人评分',
      width: 120,
      align: 'center',
      sortable: true,
      formatter: ({ row }) => {
        return h(ElText, { color: getDictText(dicts.score, row.score) }, () =>
          getDictText(dicts.score, row.score),
        )
      },
    },
    {
      prop: 'status',
      label: '状态',
      width: 80,
      align: 'center',
      filters: dicts.status.map((d) => ({ text: d.label, value: d.value })),
      filterMethod: (value: any, row: any, column: any) => {
        const property = column['property']
        return row[property] === value
      },
      renderFilterIcon: () => {
        return h('i', { style: { marginLeft: '8px' }, class: 'iconfont icon-search' })
      },
      renderHeader: (data) => {
        return data.item.label!
      },
      formatter: ({ row }) => {
        return h(ElTag, { type: getDictType(dicts.status, row.status) }, () =>
          getDictText(dicts.status, row.status),
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
})
</script>

<template>
  <u-table
    v-loading="loading"
    ref="tableRef"
    class="vp-raw"
    :data="tableData"
    :columns="tableColumns"
    stripe
  >
    <template #header-name="{ item }">
      {{ item.label }}
      <i class="iconfont icon-user"></i>
    </template>
    <!-- ID列自定义 -->
    <template #id="{ row }">
      <el-tag size="small" effect="dark">{{ row.id }}</el-tag>
    </template>
    <!-- 性别列自定义: 插槽的优先级高于formatter -->
    <template #gender="{ row }">
      {{ getDictText(dicts.gender, row.gender) }}
    </template>
  </u-table>
</template>
