<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { dayjs } from 'element-plus'
import { useTable } from 'u-element-plus'
import { createUser, dicts, getDictText, getUserGroupList } from '@docs/mock/user'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const {
  loading,
  tableRef,
  tableData,
  tableColumns,
  selectionProps,
  setTableColumns,
  getTableData,
} = useTable(async () => {
  const res = await getUserGroupList(4)
  await sleep(1000)
  return res.data
})

const showTitlebar = ref(true)
const toolbar = ref(['refresh', 'fullscreen', 'setting'])

const handleAdd = async () => {
  const res = await createUser()
  if (res.code === 200) {
    await sleep(1000)
    getTableData()
    ElMessage.success(res.msg)
  }
}

const handleToggleToolbar = (type: 'refresh' | 'fullscreen' | 'setting') => {
  if (toolbar.value.includes(type)) {
    toolbar.value = toolbar.value.filter((item) => item !== type)
  } else {
    toolbar.value.push(type)
  }
}

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
          minWidth: 200,
          align: 'center',
          showOverflowTooltip: true,
        },
        {
          prop: 'contact.address',
          label: '地址',
          align: 'center',
          children: [
            { prop: 'contact.address.province', label: '省份', minWidth: 120, align: 'center' },
            { prop: 'contact.address.city', label: '城市', minWidth: 120, align: 'center' },
            { prop: 'contact.address.district', label: '区县', minWidth: 120, align: 'center' },
            {
              prop: 'contact.address.addressDetail',
              label: '详细地址',
              minWidth: 200,
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
          minWidth: 200,
          align: 'center',
          showOverflowTooltip: true,
        },
      ],
    },
  ])
})
</script>

<template>
  <div v-if="!showTitlebar" class="mb-2.5">
    <el-button type="primary" @click="showTitlebar = true">显示标题栏</el-button>
  </div>

  <u-table
    v-loading="loading"
    ref="tableRef"
    :data="tableData"
    :columns="tableColumns"
    border
    stripe
    class="vp-raw"
    :show-title-bar="showTitlebar"
    title="用户组列表"
    :toolbar="toolbar"
    show-selection
    :selection-props="selectionProps"
    @refresh="getTableData"
  >
    <!-- 标题插槽优先于title属性 -->
    <template #title>
      <el-button type="primary" @click="handleAdd">添加数据</el-button>
      <el-button v-if="showTitlebar" type="primary" @click="showTitlebar = false">
        隐藏标题栏
      </el-button>
      <el-button type="primary" @click="handleToggleToolbar('refresh')">
        {{ toolbar.includes('refresh') ? '隐藏' : '显示' }}刷新
      </el-button>
      <el-button type="primary" @click="handleToggleToolbar('fullscreen')">
        {{ toolbar.includes('fullscreen') ? '隐藏' : '显示' }}全屏
      </el-button>
      <el-button type="primary" @click="handleToggleToolbar('setting')">
        {{ toolbar.includes('setting') ? '隐藏' : '显示' }}设置
      </el-button>
    </template>
    <!-- 工具栏插槽是toolbar的拓展 -->
    <template #toolbar>
      <el-button circle :icon="Search"></el-button>
    </template>
  </u-table>
</template>
