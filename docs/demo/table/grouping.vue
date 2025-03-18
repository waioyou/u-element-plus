<script setup lang="ts">
import { onMounted } from 'vue'
import { dayjs } from 'element-plus'
import { useTable } from 'u-element-plus'
import { dicts, getDictType, getDictText, getUserGroupList } from '@docs/mock/user'

const { loading, tableRef, tableData, tableColumns, setTableColumns } = useTable(async () => {
  const res = await getUserGroupList(4)
  return res.data
})

onMounted(() => {
  setTableColumns([
    { prop: 'id', label: '编号', width: 110, align: 'left', sortable: true },
    {
      prop: 'basic',
      label: '基本信息',
      align: 'center',
      children: [
        { prop: 'basic.name', label: '姓名', width: 80, align: 'center' },
        {
          prop: 'basic.gender',
          label: '性别',
          width: 60,
          align: 'center',
          formatter: ({ row }) => getDictText(dicts.gender, row.basic.gender),
        },
        {
          prop: 'basic.age',
          label: '年龄',
          width: 80,
          align: 'center',
          formatter: ({ row }) => {
            return `${dayjs().diff(row.basic.birthday, 'year')}岁`
          },
        },
        { prop: 'basic.birthday', label: '生日', width: 110, align: 'center' },
      ],
    },
    {
      prop: 'education',
      label: '教育背景',
      align: 'center',
      children: [
        { prop: 'education.degree', label: '学历', width: 60, align: 'center' },
        { prop: 'education.school', label: '学校', width: 120, align: 'center' },
        { prop: 'education.major', label: '专业', width: 140, align: 'center' },
        {
          prop: 'education.graduationYear',
          label: '毕业年份',
          width: 110,
          align: 'center',
          sortable: true,
        },
      ],
    },
    {
      prop: 'contact',
      label: '联系方式',
      align: 'center',
      children: [
        { prop: 'contact.phone', label: '电话', width: 130, align: 'center' },
        {
          prop: 'contact.email',
          label: '邮箱',
          width: 200,
          align: 'center',
          showOverflowTooltip: true,
        },
        {
          prop: 'contact.address',
          label: '地址',
          align: 'center',
          children: [
            { prop: 'contact.address.province', label: '省份', width: 120, align: 'center' },
            { prop: 'contact.address.city', label: '城市', width: 120, align: 'center' },
            { prop: 'contact.address.district', label: '区县', width: 120, align: 'center' },
            {
              prop: 'contact.address.addressDetail',
              label: '详细地址',
              width: 200,
              align: 'center',
            },
          ],
        },
      ],
    },
    {
      prop: 'other',
      label: '其他信息',
      align: 'center',
      children: [
        { prop: 'other.status', label: '状态', width: 100, align: 'center' },
        {
          prop: 'other.remark',
          label: '备注',
          width: 200,
          align: 'center',
          showOverflowTooltip: true,
        },
      ],
    },
  ])
})
</script>

<template>
  <u-table
    v-loading="loading"
    ref="tableRef"
    :data="tableData"
    :columns="tableColumns"
    border
    stripe
    class="vp-raw"
  >
    <!-- ID列自定义 -->
    <template #id="{ row }">
      <el-tag size="small" effect="dark">{{ row.id }}</el-tag>
    </template>
     <!-- 状态列自定义，多级时不建议通过插槽自定义 -->
     <template #['other.status']="{ row }">
      <el-tag :type="getDictType(dicts.status, row.other.status)">
        {{ getDictText(dicts.status, row.other.status) }}
      </el-tag>
    </template>
  </u-table>
</template>
