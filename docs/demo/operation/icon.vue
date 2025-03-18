<script setup lang="ts">
import { markRaw, onMounted, ref } from 'vue'
import { ElTag, ElMessage } from 'element-plus'
import { Edit } from '@element-plus/icons-vue'
import { useTable } from 'u-element-plus'
import { dicts, getDictType, getDictText, getUserList } from '@docs/mock/user'
import type { User } from '@docs/mock/types'

const { tableData, tableColumns, tableOperations, setTableColumns, setTableOperations } = useTable(
  async () => {
    const res = await getUserList(10)
    return res.data
  },
)

const onlyIcon = ref(false)

const handleChangeOnlyIcon = () => {
  tableColumns.value.at(-1)!.width = onlyIcon.value ? 120 : 230
}

// 点击操作按钮
const handleClickOperation = (name: string, row: User, index: number) => {
  if (name === 'delete') {
    ElMessage.error(`点击了第${index + 1}条数据【${row.name}】的【${name}】操作`)
  } else {
    ElMessage.success(`点击了第${index + 1}条数据【${row.name}】的【${name}】操作`)
  }
}

onMounted(() => {
  setTableOperations([
    // 根据状态判断是否显示编辑按钮
    {
      label: '编辑',
      buttonAttrs: () => ({ icon: markRaw(Edit) }),
      name: 'edit',
    },
    {
      label: '删除',
      name: 'delete',
      buttonAttrs: () => ({
        type: 'danger',
        iconClass: 'iconfont icon-delete',
      }),
      confirmAttrs: (row, index) => ({
        title: `确定删除第【${index + 1}】条数据【${row.name}】吗？`,
        width: 170,
      }),
    },
    { label: '详情', name: 'detail', buttonAttrs: () => ({ iconClass: 'iconfont icon-detail' }) },
  ])
  setTableColumns([
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
    { prop: 'school', label: '毕业学校', minWidth: 120, align: 'center' },
    { prop: 'major', label: '专业', minWidth: 138, align: 'left' },
    { prop: 'graduationYear', label: '毕业年份', width: 100, align: 'center' },
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
      width: 230,
      align: 'center',
      fixed: 'right',
      component: 'operation',
      attrs: { operations: tableOperations, onlyIcon: onlyIcon },
    },
  ])
})
</script>

<template>
  <el-radio-group v-model="onlyIcon" size="large" class="mb-2" @change="handleChangeOnlyIcon">
    <el-radio-button label="显示文字和图标" :value="false" />
    <el-radio-button label="只显示图标" :value="true" />
  </el-radio-group>
  <u-table
    class="vp-raw"
    :data="tableData"
    :columns="tableColumns"
    stripe
    border
    @click-operation="handleClickOperation"
  >
    <template #status="{ row }">
      <el-tag :type="getDictType(dicts.status, row.status)">
        {{ getDictText(dicts.status, row.status) }}
      </el-tag>
    </template>
  </u-table>
</template>
