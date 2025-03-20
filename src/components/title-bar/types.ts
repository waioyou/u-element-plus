import type { Component } from 'vue'

export interface TitleBarProps {
  title?: string
  icon?: Component | string
  iconClass?: string
  showIcon?: boolean
}

export interface TitleBarSlots {
  icon: () => void
  default: () => void
  toolbar: () => void
}
