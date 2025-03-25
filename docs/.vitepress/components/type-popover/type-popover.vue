<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { typeDefinitions } from './typeDefinitions'
import { codeToHtml } from 'shiki'
import { useData } from 'vitepress'

const props = defineProps<{
  // 类型名称
  typeName: string
  // 类型定义，如果不提供将尝试从typeMap中获取
  definition?: string
}>()

const { isDark } = useData()
const theme = ref('github-light')

// watchEffect(async () => {
//   console.log('🚀 ~ watchEffect ~  isDark.value:', isDark.value)
//
//
// },{})

const typeDefinition = ref('')

// 获取类型定义
const getTypeDefinition = async () => {
  let result
  if (props.definition) {
    result = props.definition
  } else {
    result = typeDefinitions[props.typeName] || '未找到类型定义'
  }
  const code = await codeToHtml(result, {
    lang: 'typescript',
    theme: theme.value,
  })
  return code
}

watch(
  () => isDark.value,
  async () => {
    theme.value = isDark.value ? 'github-dark' : 'github-light'
    typeDefinition.value = await getTypeDefinition()
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <el-popover placement="top" trigger="click" popper-class="type-popover-popper">
    <template #reference>
      <span class="type-popover-reference">
        <i class="type-popover-icon iconfont icon-info"></i>
      </span>
    </template>
    <div class="popover-content" v-html="typeDefinition"></div>
  </el-popover>
</template>

<style lang="scss">
.type-popover-popper {
  width: unset !important;
  min-width: 240px !important;
}
.type-popover-reference {
  padding: 4px;
  margin-left: 2px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: var(--vp-code-bg);
  }
  i {
    color: var(--vp-c-brand);
    font-size: 14px;
  }
}

.popover-content {
  margin: 0;
  white-space: pre-wrap;
  overflow-x: auto;
  pre {
    border-radius: 4px;
    padding: 0;
    margin: 0;
  }
}
</style>
