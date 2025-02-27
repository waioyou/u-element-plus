<script lang="ts" setup>
import { ref } from 'vue'
import UForm from '../../../src/components/form'
import type { FormOptions, FormInstance } from '../../../src/components/form'
// 个人信息
type FormData = {
  name: string
  age: number
  gender: string
  email: string
  phone: string
  address: string
  hobby: string[]
  test: string
}

const formRef = ref<FormInstance>()

const formOptions = ref<FormOptions>({
  sec1: {
    label: '个人信息',
    element: 'section-header',
    span: '1/1',
  },
  name: {
    label: '姓名',
    element: 'input',
    value: '张三',
    attrs: {
      disabled: true,
      placeholder: '请输入姓名',
      clearable: true,
      maxlength: 10,
    },
    rules: [{ required: true, trigger: 'blur' }],
    span: '1/3',
  },
  age: {
    label: '年龄',
    element: 'input-number',
    value: 18,
    attrs: {
      placeholder: '请输入年龄',
      min: 0,
      max: 120,
      step: 1,
    },
    rules: [{ required: true, trigger: 'blur' }],
    span: '1/3',
  },
  gender: {
    label: '性别',
    element: 'radio-group',
    value: 'male',
    rules: [{ required: true, trigger: 'blur' }],
    attrs: {
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
      ],
    },
    span: '1/3',
  },
  email: {
    label: '邮箱',
    element: 'input',
    value: '',
    attrs: {
      placeholder: '请输入邮箱',
      clearable: true,
      maxlength: 30,
      type: 'email',
    },
    rules: [{ required: true, trigger: 'blur' }],
    span: '1/3',
  },
  phone: {
    label: '电话',
    element: 'input',
    value: '',
    attrs: {
      placeholder: '请输入电话',
      clearable: true,
      maxlength: 11,
      type: 'tel',
    },
    rules: [{ required: true, trigger: 'blur' }],
    span: '1/3',
  },
  address: {
    label: '地址',
    element: 'input',
    value: '',
    rules: [{ required: true, trigger: 'blur' }],
    attrs: {
      placeholder: '请输入地址',
      clearable: true,
      maxlength: 100,
    },
    span: '1/3',
  },
  hobby: {
    label: '爱好',
    element: 'checkbox-group',
    value: [],
    rules: [{ required: true, trigger: 'blur' }],
    attrs: {
      options: [
        { label: '篮球', value: 'basketball' },
        { label: '足球', value: 'football' },
        { label: '羽毛球', value: 'badminton' },
        { label: '乒乓球', value: 'pingpong' },
      ],
    },
    span: '1/1',
  },
})
const formData = ref<FormData>()
const getFormData = async (valid = true) => {
  const result = await formRef.value?.getFormData<FormData>(valid)
  if (result) {
    formData.value = result
  } else {
    formData.value = undefined
  }
}
const reset = () => {
  formRef.value?.resetFields()
}
</script>

<template>
  <div class="form-data">
    <u-form ref="formRef" v-model:options="formOptions"></u-form>
    <div class="btn">
      <el-button type="primary" @click="getFormData(false)">获取表单数据</el-button>
      <el-button type="primary" @click="getFormData(true)">获取表单数据并校验</el-button>
      <el-button type="primary" @click="reset()">重置</el-button>
    </div>
    <div class="preview-content">
      <h3>表单数据预览</h3>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
}
.form-preview {
  margin-top: 30px;
  padding: 15px;
  background-color: #f0f8ff;
  border-radius: 8px;

  h3 {
    margin-top: 0;
    color: #4a90e2;
  }

  pre {
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    overflow: auto;
    font-size: 13px;
  }
}
</style>
