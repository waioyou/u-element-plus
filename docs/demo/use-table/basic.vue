<script setup lang="ts">
import { computed, h, onBeforeMount, onMounted } from 'vue'
import { ElTag } from 'element-plus'
import { useTable } from 'u-element-plus'
import { dicts, getDictType, getDictText, getUserList } from '@docs/mock/user'
import { ElMessage } from 'element-plus'
import { User } from '@docs/mock/types'
import { ElText } from 'element-plus'

const sleep = (wait: number = 2000) => {
  return new Promise((resolve) => setTimeout(resolve, wait))
}

const {
  loading,
  tableRef,
  tableData,
  indexProps,
  selectionProps,
  expandProps,
  tableColumns,
  tableOperations,
  multipleSelection,
  handleSelectionChange,
  toggleTableColumnRendered,
  setTableColumns,
  setTableOperations,
  getTableData,
} = useTable(async () => {
  const res = await getUserList(10)
  await sleep(1000)
  return res.data
})

onBeforeMount(() => {
  selectionProps.value.selectable = (row: User, index: number) => {
    return index % 2 === 0
  }
  indexProps.value = {
    ...indexProps.value,
    width: 60,
    formatter: (data: { $index: number }) => {
      const index = data.$index + 1
      if (index === 1) {
        return h(ElText, { type: 'danger' }, () => index)
      } else if (index === 2) {
        return h(ElText, { type: 'warning' }, () => index)
      } else if (index === 3) {
        return h(ElText, { type: 'success' }, () => index)
      } else {
        return h(ElText, {}, () => index)
      }
    },
    renderHeader: () => {
      return h(ElText, { type: 'primary' }, () => '序号')
    },
  }
})

// 点击操作按钮
const handleClickOperation = (name: string, row: User, index: number) => {
  if (name === 'delete') {
    ElMessage.error(`点击了第${index + 1}条数据【${row.name}】的【${name}】操作`)
  } else {
    ElMessage.success(`点击了第${index + 1}条数据【${row.name}】的【${name}】操作`)
  }
}

// 这里仅为演示需要，实际只需要讲isRendered赋值到配置中
const isRendered = computed(() => {
  return tableColumns.value.at(-1)?.rendered === false
})

onMounted(() => {
  setTableOperations([
    { label: '编辑', name: 'edit', rendered: (row) => row.status === '1' },
    {
      label: '详情',
      name: 'detail',
      buttonAttrs: () => ({
        type: 'primary',
      }),
    },
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
  ])
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
    {
      prop: 'operation',
      label: '操作',
      width: 170,
      align: 'center',
      fixed: 'right',
      component: 'operation',
      attrs: { operations: tableOperations },
    },
  ])
})

const handleSelectNone = () => {
  tableRef.value?.clearSelection()
}
</script>

<template>
  <u-table
    v-loading="loading"
    ref="tableRef"
    class="vp-raw"
    :data="tableData"
    :columns="tableColumns"
    stripe
    show-index
    :index-props="indexProps"
    show-selection
    :selection-props="selectionProps"
    @selection-change="handleSelectionChange"
    show-expand
    :expand-props="expandProps"
    @click-operation="handleClickOperation"
    @refresh="getTableData()"
    :toolbar="['refresh', 'fullscreen', 'setting']"
  >
    <template #title>
      <el-button type="primary" @click="handleSelectNone">取消全选</el-button>
      <el-button type="primary" @click="getTableData">刷新数据</el-button>
      <el-button type="primary" @click="toggleTableColumnRendered(['operation'])">
        {{ isRendered ? '显示操作列' : '隐藏操作列' }}
      </el-button>
    </template>
    <template #toolbar>
      <el-text type="primary">当前选中{{ multipleSelection.length }}条数据 </el-text>
    </template>
    <template #expand>
      <el-text> 展开行 </el-text>
    </template>
    <template #status="{ row }">
      <el-tag :type="getDictType(dicts.status, row.status)">
        {{ getDictText(dicts.status, row.status) }}
      </el-tag>
    </template>
  </u-table>
</template>
