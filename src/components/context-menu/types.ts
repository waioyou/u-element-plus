import type { Component } from 'vue'

/** 右键菜单属性 */
export interface ContextMenuProps {
  /** 激活右键菜单的选择器。默认全局显示 */
  triggerSelectors?: string
  /** 是否在点击内容后隐藏菜单。默认：true */
  afterClickHide?: boolean
  /** x轴偏移量 */
  offsetX?: number
  /** y轴偏移量 */
  offsetY?: number
  /** 是否手动控制右键菜单的隐藏和显示 */
  manual?: boolean
  /** 菜单项 */
  items?: ContextMenuItem[]
}

export interface ContextMenuSlots {
  /** 右键菜单内容 */
  default: () => void
}

export type ContextMenuEmits = {
  /** 右键菜单显示 */
  show: []
  /** 右键菜单隐藏 */
  hide: []
  /** 点击菜单项 */
  select: [ContextMenuItem]
}

/** 右键菜单实例 */
export interface ContextMenuInstance {
  /** 显示右键菜单 */
  showMenu: (event: MouseEvent) => void
  /** 隐藏右键菜单 */
  hideMenu: (event: MouseEvent) => void
}

/** 右键菜单项 */
export interface ContextMenuItem {
  /** 菜单名称 */
  name: string
  /** 菜单标签 */
  label: string
  /** 菜单图标通过el-icon组件 */
  icon?: Component | string
  /** 菜单图标类名,iconfont等第三方图标库的类名 */
  iconClass?: string
  /** 菜单是否禁用 */
  disabled?: boolean
  /** 子菜单 */
  children?: ContextMenuItem[]
}
