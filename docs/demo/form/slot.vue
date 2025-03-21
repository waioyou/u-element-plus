<script lang="tsx" setup>
import { h, onMounted, ref } from 'vue'
import { useForm } from 'u-element-plus'
import { dicts, getUserDetail } from '../../mock/user'
import { ElButton, ElMessage } from 'element-plus'

const { formRef, formData, formColumns, createFormColumnWithElement, setFormColumns } = useForm(
  async () => {
    const res = await getUserDetail(1)
    res.data.email = '123'
    emailType.value = 'qq.com'
    return res.data
  },
)

const emailType = ref('')
const emailOptions = ['qq.com', '163.com', 'gmail.com']

onMounted(() => {
  setFormColumns({
    sec1: createFormColumnWithElement('title-bar', {
      label: '基本信息',
      attrs: {
        renderToolbar: () => {
          return h(
            ElButton,
            {
              type: 'primary',
              onClick: () => {
                formRef.value?.validate((valid) => {
                  if (valid) {
                    ElMessage.success('保存成功')
                  }
                })
              },
            },
            () => '保存',
          )
        },
      },
    }),
    name: createFormColumnWithElement('input', {
      label: '姓名',
      renderLabel: ({ label }) => (
        <ElButton type="primary" text>
          {label}
        </ElButton>
      ),
      span: '1/2',
      rules: [{ required: true, message: '请输入姓名' }],
      attrs: {
        placeholder: '请输入姓名',
      },
    }),
    email: createFormColumnWithElement('input', {
      label: '邮箱',
      renderLabel: ({ label }) => (
        <ElButton type="primary" text>
          {label}
        </ElButton>
      ),
      span: '1/2',
      rules: [{ required: true, message: '请输入邮箱' }],
      attrs: {
        placeholder: '请输入邮箱',
      },
    }),
    age: createFormColumnWithElement('input-number', {
      label: '年龄',
      renderLabel: ({ label }) => (
        <ElButton type="primary" text>
          {label}
        </ElButton>
      ),
      span: '1/2',
      rules: [{ required: true, message: '请输入年龄' }],
      attrs: {
        placeholder: '请输入年龄',
        min: 0,
        max: 120,
      },
    }),
    degree: createFormColumnWithElement('radio-group', {
      label: '学历',
      renderLabel: ({ label }) => (
        <ElButton type="primary" text>
          {label}
        </ElButton>
      ),
      span: '1/2',
      rules: [{ required: true, message: '请输入学历' }],
      attrs: {
        options: dicts.degree,
      },
    }),
    major: createFormColumnWithElement('select', {
      label: '专业',
      renderLabel: ({ label }) => (
        <ElButton type="primary" text>
          {label}
        </ElButton>
      ),
      span: '1/2',
      attrs: {
        placeholder: '请输入专业',
        options: dicts.major,
      },
      rules: [{ required: true, message: '请输入专业' }],
    }),
    graduationYear: createFormColumnWithElement('date-picker', {
      label: '毕业年份',
      renderLabel: ({ label }) => (
        <ElButton type="primary" text>
          {label}
        </ElButton>
      ),
      span: '1/2',
      attrs: {
        type: 'year',
        format: 'YYYY',
        valueFormat: 'YYYY',
        placeholder: '请输入毕业年份',
      },
    }),
    status: createFormColumnWithElement('switch', {
      label: '状态',
      renderLabel: ({ label }) => (
        <ElButton type="primary" text>
          {label}
        </ElButton>
      ),
      span: '1/2',
      attrs: {
        placeholder: '请输入状态',
        activeValue: '1',
        inactiveValue: '0',
        activeText: '启用',
        inactiveText: '禁用',
      },
      rules: [{ required: true, message: '请输入状态' }],
    }),
    score: createFormColumnWithElement('rate', {
      label: '评分',
      renderLabel: ({ label }) => (
        <ElButton type="primary" text>
          {label}
        </ElButton>
      ),
      span: '1/2',
      attrs: {
        placeholder: '请输入评分',
        showText: true,
        texts: dicts.score.map((item) => item.label),
      },
    }),
    remark: createFormColumnWithElement('input', {
      label: '备注',
      renderLabel: ({ label }) => (
        <ElButton type="primary" text>
          {label}
        </ElButton>
      ),
      span: '1/1',
      attrs: {
        placeholder: '请输入备注',
        type: 'textarea',
        rows: 4,
        maxlength: 200,
        showPassword: true,
      },
    }),
  })
})
</script>

<template>
  <u-form ref="formRef" v-model="formData" :columns="formColumns">
    <template #label-name="{ label }">
      <el-button type="danger" text>
        <i class="iconfont icon-user mr-2"></i>
        {{ label }}
      </el-button>
    </template>
    <template #email="{ item }">
      <el-input v-model="formData.email" v-bind="item.attrs">
        <template #append>
          <el-select v-model="emailType" placeholder="请选择" style="width: 115px">
            <el-option
              v-for="option in emailOptions"
              :key="option"
              :label="option"
              :value="option"
            />
          </el-select>
        </template>
      </el-input>
    </template>
  </u-form>
</template>
