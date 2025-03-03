export interface TitleBarProps {
  title?: string
  icon?: string
  showIcon?: boolean
}

export interface TitleBarSlots {
  icon: () => void
  default: () => void
  toolbar: () => void
}
