<script setup lang="ts" generic="T">
import { computed, getCurrentInstance, ref, useAttrs } from 'vue'
import RenderVNode from '../render-v-node/render-v-node'
import UTitleBar from '../title-bar/title-bar.vue'
import UTableColumn from './table-column.vue'
import { isNil, omit } from '@/utils'
import type { TableProps, TableInstance, TableEmits } from './type'
import type { ElTree, FormInstance } from 'element-plus'
import { FullScreen, Refresh, Setting } from '@element-plus/icons-vue'
import { useTableTitle } from './use-table-title'

defineOptions({ name: 'UTable' })
const props = withDefaults(defineProps<TableProps<T>>(), {
  showSelection: false,
  selectionProps: () => ({}),
  showIndex: false,
  indexProps: () => ({}),
  showExpand: false,
  expandProps: () => ({}),
  editable: false,
  stripe: false,
  border: false,
  fit: true,
  showHeader: true,
  highlightCurrentRow: false,
  defaultExpandAll: false,
  showSummary: false,
  selectOnIndeterminate: true,
  lazy: false,
  scrollbarAlwaysOn: false,
  showOverflowTooltip: false,
  flexible: false,
  allowDragLastColumn: true,
  showTitleBar: true,
  toolbar: true,
})

const emit = defineEmits<TableEmits<T>>()

const instance = getCurrentInstance()!
const tableRef = ref<TableInstance>()
const formRef = ref<FormInstance>()

// 过滤indexProps
const filerIndexProps = computed(() => {
  return omit(props.indexProps, ['formatter', 'renderHeader'])
})

// 过滤selectionProps
const filerSelectionProps = computed(() => {
  return omit(props.selectionProps, ['formatter', 'renderHeader'])
})

const attrs = useAttrs()

// 过滤空值，避免覆盖el-table的默认属性
const filerElTableProps = computed(() => {
  const emptyKeys = Object.keys(props).filter((key) => isNil((props as any)[key]))
  emptyKeys.push('columns', 'editable')
  return omit({ ...props, ...attrs }, emptyKeys)
})

const handleClickOperation = (name: string, row: T, index: number) => {
  emit('click-operation', name, row, index)
}

const {
  _columns,
  showToolbar,
  showRefresh,
  showFullscreen,
  showSetting,
  uTableRef,
  handleRefresh,
  isFullscreen,
  toggleFullscreen,
  treeRef,
  setCheckedKeys,
  checkedAll,
  checkedIndeterminate,
  handleChangeCheckedAll,
  handleResetColumns,
  handleCheckChange,
  allowDrop,
} = useTableTitle(props, emit)

/** 不使用tableRef，使用refs，避免组件多次渲染 */
defineExpose<TableInstance>(
  new Proxy({} as TableInstance, {
    get(_, key) {
      if (key === 'validate') {
        return formRef.value!.validate
      }
      if (key === 'validateField') {
        return formRef.value!.validateField
      }
      if (key === 'scrollToField') {
        return formRef.value!.scrollToField
      }
      if (key === 'resetFields') {
        return formRef.value!.resetFields
      }
      if (key === 'clearValidate') {
        return formRef.value!.clearValidate
      }
      const tableInstance: any = instance.refs?.tableRef ?? {}
      return tableInstance[key]
    },
    has(_, key) {
      return Reflect.has(tableRef.value!, key) || Reflect.has(formRef.value!, key)
    },
  }),
)
</script>

<template>
  <div class="u-table" :class="{ 'is-fullscreen': isFullscreen }" ref="uTableRef">
    <UTitleBar :show-icon="false">
      <template #default>
        <slot name="title"></slot>
      </template>
      <template #toolbar>
        <slot name="toolbar"></slot>
        <template v-if="showToolbar">
          <el-tooltip v-if="showRefresh" content="刷新" placement="top">
            <el-button circle :icon="Refresh" @click="handleRefresh"></el-button>
          </el-tooltip>
          <el-tooltip
            v-if="showFullscreen"
            :content="isFullscreen ? '退出全屏' : '全屏'"
            placement="top"
          >
            <el-button circle :icon="FullScreen" @click="toggleFullscreen()"></el-button>
          </el-tooltip>
          <el-tooltip v-if="showSetting" content="设置" placement="top">
            <el-button circle>
              <el-popover
                placement="bottom-end"
                trigger="click"
                @before-enter="setCheckedKeys()"
                popper-class="u-table-setting-popper"
              >
                <template #reference>
                  <el-button circle :icon="Setting"></el-button>
                </template>
                <div class="u-table-setting">
                  <div class="u-table-setting-header">
                    <el-checkbox
                      v-model="checkedAll"
                      @change="handleChangeCheckedAll"
                      :indeterminate="checkedIndeterminate"
                      >全选</el-checkbox
                    >
                    <el-button type="primary" link @click="handleResetColumns">重置</el-button>
                  </div>
                  <el-tree
                    ref="treeRef"
                    :data="_columns"
                    node-key="prop"
                    show-checkbox
                    draggable
                    :allow-drop="allowDrop"
                    @check-change="handleCheckChange"
                  />
                </div>
              </el-popover>
            </el-button>
          </el-tooltip>
        </template>
      </template>
    </UTitleBar>
    <el-form ref="formRef" :model="data" :show-message="false">
      <el-table ref="tableRef" v-bind="filerElTableProps">
        <template v-if="$slots.empty" #empty>
          <slot name="empty" />
        </template>
        <template v-if="$slots.append" #append="slotProps">
          <slot name="append" v-bind="slotProps" />
        </template>
        <el-table-column v-if="showExpand" type="expand" v-bind="expandProps">
          <template #default="slotProps">
            <slot name="expand" v-bind="slotProps" />
          </template>
        </el-table-column>
        <el-table-column v-if="showIndex" type="index" v-bind="filerIndexProps">
          <template v-if="indexProps.renderHeader" #header="slotProps">
            <render-v-node :v-node="indexProps.renderHeader(slotProps)" />
          </template>
          <template v-if="indexProps.formatter" #default="slotProps">
            <render-v-node :v-node="indexProps.formatter(slotProps)" />
          </template>
        </el-table-column>
        <el-table-column v-if="showSelection" type="selection" v-bind="filerSelectionProps">
        </el-table-column>

        <UTableColumn
          v-for="item in _columns"
          :key="item.prop"
          :item="item"
          :editable="editable"
          @click-operation="handleClickOperation"
        >
          <template v-for="slot in Object.keys($slots)" #[slot]="slotProps">
            <!-- 以之前的名字命名插槽，同时把数据原样绑定 -->
            <slot :name="slot" v-bind="slotProps"> </slot>
          </template>
        </UTableColumn>
      </el-table>
    </el-form>
  </div>
</template>
