<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { typeDefinitions } from './typeDefinitions'
import { codeToHtml } from 'shiki'

const props = defineProps<{
  // 类型名称
  typeName: string
  // 类型定义，如果不提供将尝试从typeMap中获取
  definition?: string
}>()

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
    theme: 'vitesse-light',
  })
  return code
}

onMounted(async () => {
  typeDefinition.value = await getTypeDefinition()
})
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
