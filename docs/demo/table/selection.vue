<script setup lang="tsx">
import { ElText } from 'element-plus'
import { h, ref } from 'vue'

const tableData = ref([
  {
    date: '2024-03-05',
    name: '张三',
    address: '浙江省杭州市',
  },
  {
    date: '2024-03-05',
    name: '李四',
    address: '浙江省杭州市',
  },
  {
    date: '2024-03-05',
    name: '王五',
    address: '浙江省杭州市',
  },
  {
    date: '2024-03-05',
    name: '赵六',
    address: '浙江省杭州市',
  },
])

const columns = ref([
  {
    prop: 'date',
    label: '日期',
    width: 180,
  },
  {
    prop: 'name',
    label: '姓名',
    width: 180,
  },
  {
    prop: 'address',
    label: '地址',
  },
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
    :columns="columns"
    show-selection
    :selection-props="selectionProps"
  >
  </u-table>
</template>
