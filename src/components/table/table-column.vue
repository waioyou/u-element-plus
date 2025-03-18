<script lang="ts" setup generic="T extends Record<string, any>">
import RenderVNode from '../render-v-node/render-v-node'
import UOperation from '../operation/operation.vue'
import type { TableColumnDefaultProps, TableColumnProps } from './type'
import { useTableColumn } from './use-table-column'
defineSlots<Record<string, any>>()

const props = defineProps<TableColumnProps>()

const emit = defineEmits(['click-operation'])

const { getElTableColumnAttrs, getFormItemRules } = useTableColumn(props)
</script>

<template>
  <el-table-column v-if="item.prop && item.rendered !== false" v-bind="getElTableColumnAttrs">
    <template #header="slotProps">
      <template v-if="$slots[`header-${item.prop}`]">
        <slot :name="`header-${item.prop}`" v-bind="slotProps" :item="item" />
      </template>
      <RenderVNode
        v-else-if="item.renderHeader"
        :v-node="item.renderHeader({ ...slotProps, item })"
      />
    </template>
    <template #filter-icon="slotProps">
      <template v-if="$slots[`filter-icon-${item.prop}`]">
        <slot :name="`filter-icon-${item.prop}`" v-bind="slotProps" :item="item" />
      </template>
      <RenderVNode
        v-else-if="item.renderFilterIcon"
        :v-node="item.renderFilterIcon({ ...slotProps, item })"
      />
    </template>
    <template #default="slotProps: TableColumnDefaultProps<T>">
      <!-- 递归处理多级表头 -->
      <template v-if="item.children">
        <TableColumn
          v-for="child in item.children"
          :key="child.prop"
          :item="child"
          :editable="editable"
        >
          <template v-for="slot in Object.keys($slots)" #[slot]="slotScope">
            <!-- 以之前的名字命名插槽，同时把数据原样绑定 -->
            <slot :name="slot" v-bind="slotScope" />
          </template>
        </TableColumn>
      </template>
      <!-- 编辑 -->
      <template v-else-if="slotProps.$index > -1 && editable && item.element">
        <el-form-item :prop="`${slotProps.$index}.${item.prop}`" :rules="getFormItemRules(item)">
          <el-cascader
            v-if="item.element === 'cascader'"
            v-model="slotProps.row[item.prop]"
            v-bind="item.attrs"
          />
          <!-- 多选框-->
          <template v-else-if="item.element === 'checkbox'">
            <el-checkbox v-model="slotProps.row[item.prop]" v-bind="item.attrs" />
          </template>
          <template v-else-if="item.element === 'radio'">
            <el-radio v-model="slotProps.row[item.prop]" v-bind="item.attrs" />
          </template>
          <component
            v-else
            v-model="slotProps.row[item.prop]"
            :is="`el-${item.element}`"
            v-bind="item.attrs"
          >
            <!-- 选择器 选项 -->
            <template v-if="item.element === 'select'">
              <el-option
                v-for="option in item.attrs?.options ?? []"
                :key="option.value"
                v-bind="option"
              />
            </template>
            <!-- 多选框组 选项-->
            <template v-else-if="item.element === 'checkbox-group'">
              <el-checkbox
                v-for="option in item.attrs?.options ?? []"
                :key="option.value"
                v-bind="option"
              />
            </template>
            <!-- 单选框组 选项-->
            <template v-else-if="item.element === 'radio-group'">
              <el-radio
                v-for="option in item.attrs?.options ?? []"
                :key="option.value"
                v-bind="option"
              />
            </template>
          </component>
        </el-form-item>
      </template>
      <!-- 自定义插槽 -->
      <slot v-else-if="$slots[item.prop]" :name="item.prop" v-bind="slotProps" :item="item" />
      <!-- 渲染动态组件 -->
      <template v-else-if="item.component">
        <UOperation
          v-if="item.component === 'operation'"
          :slotProps="slotProps"
          :item="item"
          v-bind="item.attrs"
          @click-operation="(...args) => emit('click-operation', ...args)"
        />
        <component
          v-else
          :is="item.component"
          :slotProps="slotProps"
          :item="item"
          v-bind="item.attrs"
        />
      </template>
      <!-- formatter -->
      <template v-else-if="item.formatter">
        <RenderVNode :v-node="item.formatter({ ...slotProps, item })" />
      </template>
    </template>
  </el-table-column>
</template>
