<script lang="ts" setup generic="T extends Record<string, any>">
import { computed, getCurrentInstance, ref } from 'vue'
import { formatterDate, getDateTypeFormat, getOptionText, omit, treeToList } from '@/utils'
import type { FormProps, FormEmits, FormItemOption } from './types'
import { type FormInstance as ElFormInstance } from 'element-plus'
import RenderVNode from '@/components/render-v-node/render-v-node.ts'
import { InfoFilled } from '@element-plus/icons-vue'
import UTitleBar from '@/components/title-bar/title-bar.vue'
defineOptions({
  name: 'UForm',
})
const emit = defineEmits<FormEmits>()
const modelValue = defineModel<T>('modelValue', { default: () => ({}) })
const props = withDefaults(defineProps<FormProps>(), {
  options: () => [],
  /** 是否为查看模式 */
  view: false,
  /** 栅格间隔 */
  gutter: 20,
  /** 内联模式 */
  inline: false,
  /** 标签的位置 */
  labelPosition: 'right',
  /** 标签的宽度 */
  labelWidth: 'auto',
  /** 标签的后缀 */
  labelSuffix: '',
  /** 是否隐藏必填字段的星号 */
  hideRequiredAsterisk: false,
  /** 必填星号的位置 */
  requireAsteriskPosition: 'left',
  /** 是否显示校验信息 */
  showMessage: true,
  /** 是否显示内联提示信息 */
  inlineMessage: false,
  /** 是否显示状态图标 */
  statusIcon: false,
  /** 是否在规则变化时进行验证 */
  validateOnRuleChange: true,
  /** 表单项的尺寸 */
  size: 'default',
  /** 是否禁用表单 */
  disabled: false,
  /** 是否滚动到错误字段 */
  scrollToError: false,
  /** 滚动到视图选项 */
  scrollIntoViewOptions: () => ({}),
})

const instance = getCurrentInstance()!
const formRef = ref<ElFormInstance>()

/** 过滤出 ElForm 需要的属性 */
const filterElFormProps = computed(() => {
  return omit(props, ['view', 'rules', 'options'])
})

/** 根据栅格间隔计算表单的样式 */
const getFormStyle = computed(() => {
  const gutter = Number(props.gutter)
  if (gutter > 0) {
    const margin = gutter / 2
    return {
      marginLeft: `${-margin}px`,
      marginRight: `${-margin}px`,
    }
  }
  return {}
})

/** 处理表单验证 */
const handleValidate = (prop: any, isValid: boolean, message: string) => {
  emit('validate', prop, isValid, message)
}

/** 处理表单项的 change 事件 */
const handleChange = (prop: string, item: FormItemOption) => {
  emit('change', prop, item)
}

/** 过滤出 ElFormItem 需要的属性 */
const filterElFormItemProps = (item: FormItemOption) => {
  return omit(item, ['span', 'element', 'value', 'attrs', 'if', 'show', 'style', 'slot'])
}

/** 获取表单项的校验规则 */
const getElFormItemRules = (item: FormItemOption) => {
  const isInputType = ['autocomplete', 'input', 'input-number', 'input-tag', 'mention'].includes(
    item.element!,
  )
  const defaultMessage = item.element ? (isInputType ? `请输入` : `请选择`) : '请输入'

  if (item.required && !item.rules) {
    return [{ required: true, message: defaultMessage }]
  }

  if (!item.rules) return []

  return item.rules.map((rule) => ({
    message: defaultMessage,
    ...rule,
  }))
}

/** 获取表单项的样式 */
const getFormItemStyle = (prop: string, item: FormItemOption) => {
  const style = item?.style ?? {}
  const span = item.span?.split('/') ?? []
  const gutter = Number(props.gutter)
  if (gutter > 0) {
    const padding = gutter / 2
    style.paddingLeft = `${padding}px`
    style.paddingRight = `${padding}px`
  }
  if (!props.inline) {
    style.width = '100%'
  }
  if (span.length === 2) {
    const numerator = parseInt(span[0])
    const denominator = parseInt(span[1])
    if (numerator > 0 && denominator > 0 && numerator <= denominator) {
      style.width = `${(numerator / denominator) * 100}%`
    } else {
      console.warn(`表单项【${prop}】的【span】属性配置错误，请检查配置; 正确格式如：1/2`)
    }
  }
  return style
}

/** 获取表单项的查看节点 */
const getViewVNode = (item: FormItemOption) => {
  const itemValue = modelValue.value[item.prop]
  if (itemValue === undefined || itemValue === null) {
    return ''
  }
  if (item.element === 'cascader') {
    const { props = {}, options = [] } = item.attrs ?? {}
    const list = treeToList(options, props.children)
    return getOptionText(list, itemValue, props)
  } else if (item.element === 'transfer') {
    const { props = {}, data = [] } = item.attrs ?? {}
    return getOptionText(data, itemValue, { label: props.label, value: props.key ?? 'key' })
  } else if (
    // 选择器、多选框组、单选框组、穿梭框
    ['select', 'checkbox-group', 'radio-group'].includes(item.element!)
  ) {
    const { options = [] } = item.attrs as any
    return getOptionText(options, itemValue)
  } else if (item.element === 'switch') {
    // 开关
    const { activeText = '是', inactiveText = '否', activeValue = true } = item.attrs ?? {}
    return itemValue === activeValue ? activeText : inactiveText
  } else if (['time-picker', 'time-select'].includes(item.element!)) {
    const { format = 'HH:mm:ss' } = (item.attrs as any) ?? {}
    return Array.isArray(itemValue)
      ? itemValue.map((d) => formatterDate(d, format)).join('-')
      : formatterDate(itemValue, format)
  } else if (item.element === 'date-picker') {
    const { type = 'date', format } = item.attrs ?? {}
    let _format = getDateTypeFormat(type)
    if (format) {
      _format = format
    }
    return Array.isArray(itemValue)
      ? itemValue.map((d) => formatterDate(d, _format)).join('-')
      : formatterDate(itemValue, _format)
  }
  return itemValue?.toString() ?? ''
}

/** 不使用formRef，使用refs，避免组件多次渲染 */
defineExpose(
  new Proxy(
    {},
    {
      get(_, key) {
        const formInstance: any = instance.refs?.formRef ?? {}
        return formInstance[key]
      },
      has(_, key) {
        return Reflect.has(formRef.value!, key)
      },
    },
  ),
)
</script>

<template>
  <el-form
    ref="formRef"
    class="u-form"
    v-bind="filterElFormProps"
    :model="modelValue"
    :style="getFormStyle"
    @validate="handleValidate"
  >
    <template v-for="item in options" :key="item.prop">
      <el-form-item
        v-if="item?.if ?? true"
        v-show="item?.show ?? true"
        v-bind="filterElFormItemProps(item)"
        :prop="item.prop"
        :rules="getElFormItemRules(item)"
        :style="getFormItemStyle(item.prop, item)"
        class="u-form-item"
        :class="item.element === 'title-bar' ? 'u-form-item--title-bar' : ''"
        :label="item.element === 'title-bar' ? '' : item.label"
      >
        <!-- label 插槽处理 -->
        <template #label="slotProps">
          <slot
            v-if="$slots[`label-${item.prop}`]"
            :name="`label-${item.prop}`"
            :item="item"
            v-bind="slotProps"
          ></slot>
          <RenderVNode
            v-else-if="item.renderLabel"
            :v-node="item.renderLabel({ item, label: slotProps.label })"
          />
          <template v-else>
            {{ item.label }}
            <el-tooltip v-if="item.tooltip" :content="item.tooltip" placement="top">
              <slot name="tooltip-icon">
                <el-icon class="u-form-item__tooltip-icon"><InfoFilled /></el-icon>
              </slot>
            </el-tooltip>
          </template>
        </template>
        <!-- error 插槽处理 -->
        <template #error="slotProps">
          <slot
            v-if="$slots[`error-${item.prop}`]"
            :name="`error-${item.prop}`"
            :item="item"
            v-bind="slotProps"
          />
          <RenderVNode
            v-else-if="item.renderError"
            :v-node="item.renderError({ item, error: slotProps.error })"
          />
        </template>
        <template #default>
          <!-- 查看模式 -->
          <template v-if="view || item.view">
            <RenderVNode v-if="item.formatter" :v-node="item.formatter(item)" />
            <el-rate
              v-else-if="item.element === 'rate'"
              v-model="modelValue[item.prop]"
              v-bind="item.attrs"
              :disabled="true"
            />
            <el-upload
              v-else-if="item.element === 'upload'"
              :file-list="modelValue[item.prop]"
              v-bind="item.attrs"
              :disabled="true"
              class="is-view"
            />
            <RenderVNode v-else :v-node="getViewVNode(item)" />
          </template>

          <!-- 默认插槽处理 -->
          <slot v-else-if="$slots[item.prop]" :name="item.prop" :item="item"></slot>
          <RenderVNode v-else-if="item.render" :v-node="item.render({ item, view: view })" />

          <!-- 动态组件 -->
          <template v-else-if="item.component">
            <component
              :is="item.component"
              v-model="modelValue[item.prop]"
              v-bind="item.attrs"
              :view="view"
              @change="handleChange(item.prop, item)"
            />
          </template>
          <!-- 渲染表单项 -->
          <template v-else-if="item.element">
            <!-- 标题 -->
            <template v-if="item.element === 'title-bar'">
              <UTitleBar :title="item.label"></UTitleBar>
            </template>
            <!--  级联选择器特殊处理：通过 component 渲染会出现选项 label 不显示的问题-->
            <el-cascader
              v-else-if="item.element === 'cascader'"
              v-model="modelValue[item.prop]"
              v-bind="item.attrs"
              @change="handleChange(item.prop, item)"
            />
            <!-- 上传 -->
            <el-upload
              v-else-if="item.element === 'upload'"
              v-model:file-list="modelValue[item.prop]"
              v-bind="item.attrs"
              @change="handleChange(item.prop, item)"
            >
              <el-button v-if="item.attrs?.listType !== 'picture-card'" type="primary">
                点击上传
              </el-button>
            </el-upload>
            <!-- 多选框-->
            <template v-else-if="item.element === 'checkbox'">
              <el-checkbox
                v-model="modelValue[item.prop]"
                v-bind="item.attrs"
                @change="handleChange(item.prop, item)"
              />
            </template>
            <template v-else-if="item.element === 'radio'">
              <el-radio
                v-model="modelValue[item.prop]"
                v-bind="item.attrs"
                @change="handleChange(item.prop, item)"
              />
            </template>
            <component
              v-else
              v-model="modelValue[item.prop]"
              :is="`el-${item.element}`"
              v-bind="item.attrs"
              @change="handleChange(item.prop, item)"
            >
              <template v-if="item.attrs && (item.attrs as any).options">
                <!-- 选择器 选项 -->
                <template v-if="item.element === 'select'">
                  <el-option
                    v-for="option in item.attrs.options"
                    :key="option.value"
                    v-bind="option"
                  />
                </template>
                <!-- 多选框组 选项-->
                <template v-else-if="item.element === 'checkbox-group'">
                  <el-checkbox
                    v-for="option in item.attrs.options"
                    :key="option.value"
                    v-bind="option"
                  />
                </template>
                <!-- 单选框组 选项-->
                <template v-else-if="item.element === 'radio-group'">
                  <el-radio
                    v-for="option in item.attrs.options"
                    :key="option.value"
                    v-bind="option"
                  />
                </template>
              </template>
            </component>
          </template>
          <!-- 错误配置项提示 -->
          <template v-else>
            <el-text type="danger">{{ `请检查表单项【${item.prop}】的配置` }}</el-text>
          </template>
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>
