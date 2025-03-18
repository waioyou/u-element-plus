<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUserList } from '@docs/mock/user'
import type { User } from '@docs/mock/types'
import type { TableColumns } from 'u-element-plus'

const tableData = ref<User[]>([])
const tableColumns = ref<TableColumns<User>>([
  { prop: 'id', label: '编号', width: 100, align: 'center' },
  { prop: 'name', label: '姓名', minWidth: 90, align: 'center' },
  { prop: 'genderText', label: '性别', width: 60, align: 'center' },
  { prop: 'birthday', label: '出生日期', width: 110, align: 'center' },
  { prop: 'degreeText', label: '学历', width: 60, align: 'center' },
  { prop: 'schoolText', label: '毕业学校', minWidth: 110, align: 'center' },
  { prop: 'majorText', label: '专业', minWidth: 120, align: 'left' },
  { prop: 'graduationYear', label: '毕业年份', width: 80, align: 'center' },
  { prop: 'statusText', label: '状态', width: 80, align: 'center' },
  { prop: 'remark', label: '备注', minWidth: 200, showOverflowTooltip: true, align: 'left' },
])

const fetchData = async () => {
  const res = await getUserList(100)
  tableData.value = res.data
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <u-table
    class="vp-raw"
    :data="tableData"
    :columns="tableColumns"
    stripe
    :max-height="400"
  ></u-table>
</template>
