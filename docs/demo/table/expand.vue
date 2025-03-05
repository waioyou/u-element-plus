<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'John',
    address: 'No. 189, Grove St, Los Angeles',
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

const expandProps = {
  width: 40,
}
</script>

<template>
  <u-table
    class="vp-raw"
    :data="tableData"
    :columns="columns"
    show-expand
    :expand-props="expandProps"
  >
    <template #expand>
      <div>展开行</div>
    </template>
  </u-table>
</template>
