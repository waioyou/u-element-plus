import type { Plugin } from 'vue'
export type SFCWithInstall<T> = T & Plugin

/** 移除只读属性 */
export type TypeNoReadonly<T> = {
  -readonly [K in keyof T]: T[K]
}

/** 获取组件实例的Props属性 */
export type InstancePropsType<T extends abstract new (...args: any) => any> = Partial<
  TypeNoReadonly<InstanceType<T>['$props']>
>
