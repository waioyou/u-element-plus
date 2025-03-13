<script setup lang="ts">
import { markRaw, ref } from 'vue'
import { type TableColumns, type OperationItem, UOperation } from 'u-element-plus'
import { ElMessage } from 'element-plus'
defineOptions({ name: '', inheritAttrs: false })

interface TableDataItem {
  date: string
  name: string
  age: number
  gender: string
  department: string
  position: string
  address: string
  email: string
  phone: string
  status: 0 | 1
}

const tableData = ref<TableDataItem[]>([
  {
    date: '2024-03-05',
    name: '张三',
    age: 25,
    gender: '男',
    department: '研发部',
    position: '前端工程师',
    address: '浙江省杭州市西湖区',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    status: 0,
  },
  {
    date: '2024-03-06',
    name: '李四',
    age: 28,
    gender: '女',
    department: '产品部',
    position: '产品经理',
    address: '浙江省杭州市滨江区',
    email: 'lisi@example.com',
    phone: '13800138001',
    status: 1,
  },
  {
    date: '2024-03-07',
    name: '王五',
    age: 32,
    gender: '男',
    department: '设计部',
    position: 'UI设计师',
    address: '浙江省杭州市上城区',
    email: 'wangwu@example.com',
    phone: '13800138002',
    status: 0,
  },
  {
    date: '2024-03-08',
    name: '赵六',
    age: 22,
    gender: '女',
    department: '测试部',
    position: '测试工程师',
    address: '浙江省杭州市拱墅区',
    email: 'zhaoliu@example.com',
    phone: '13800138003',
    status: 1,
  },
])

// 操作按钮列表
const operations = ref<OperationItem<TableDataItem>[]>([
  { label: '添加', name: 'add' },
  // 根据状态判断是否显示编辑按钮
  { label: '编辑', name: 'edit', if: (row) => row.status === 1 },
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
  ElMessage.success(`点击了第【${index + 1}】条数据【${row.name}】的【${name}】操作`)
}

const columns = ref<TableColumns>([
  { prop: 'date', label: '入职日期', width: 120, sortable: true },
  { prop: 'name', label: '姓名', minWidth: 80, align: 'left' },
  { prop: 'age', label: '年龄', width: 80, align: 'center', sortable: true },
  { prop: 'gender', label: '性别', width: 80, align: 'center' },
  { prop: 'department', label: '部门', minWidth: 100, align: 'center' },
  { prop: 'position', label: '职位', minWidth: 120, align: 'left' },
  { prop: 'address', label: '地址', minWidth: 140, showOverflowTooltip: true },
  { prop: 'email', label: '邮箱', minWidth: 160, showOverflowTooltip: true },
  { prop: 'phone', label: '电话', minWidth: 120, showOverflowTooltip: true },
  { prop: 'status', label: '状态', width: 80, align: 'center' },
  {
    prop: 'operation',
    label: '操作',
    width: 218,
    align: 'center',
    fixed: 'right',
    component: 'operation',
    attrs: {
      type: 'text',
      operations,
    },
  },
])
</script>

<template>
  <u-table
    class="vp-raw"
    :data="tableData"
    :columns="columns"
    stripe
    border
    @click-operation="handleClickOperation"
  >
    <template #status="{ row }">
      <el-tag :type="row.status === 0 ? 'danger' : 'success'">
        {{ row.status === 0 ? '禁用' : '正常' }}
      </el-tag>
    </template>
  </u-table>
</template>
