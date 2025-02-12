import type { Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export type Fn = (...args: any[]) => any

/** 移除只读属性 */
export type TypeNoReadonly<T> = {
  -readonly [K in keyof T]: T[K]
}

/** 获取组件实例的Props属性 */
export type InstancePropsType<T extends abstract new (...args: any) => any> = Partial<
  TypeNoReadonly<InstanceType<T>['$props']>
>

/** 移除组件实例Props的value和modelValue属性 */
export type InstancePropsTypeOmitValue<T extends abstract new (...args: any) => any> = Omit<
  InstancePropsType<T>,
  'value' | 'modelValue'
>

/** 移除组件Props的value和modelValue属性 */
export type ComponentPropsWithoutValue<T> = Omit<Partial<T>, 'value' | 'modelValue'>
