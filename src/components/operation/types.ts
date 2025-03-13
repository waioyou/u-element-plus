import type { TypeNoReadonly } from '@/types'
import type { ButtonProps, PopconfirmProps } from 'element-plus'

export interface OperationProps<T = any> {
  slotProps?: {
    row: T
    $index: number
  }
  operations: OperationItem[]
  type?: 'button' | 'text' | 'link'
}

export interface OperationEmits<T = any> {
  (e: 'click-operation', name: string, row: T, index: number): void
}

export interface OperationItem<T = any> {
  name: string
  label?: string
  if?: boolean | ((row: T) => boolean)
  buttonAttrs?: (row: T, index: number) => OperationItemButtonAttrs
  confirmAttrs?: (row: T, index: number) => OperationItemConfirmAttrs
}

export type OperationItemButtonAttrs<T = any> = Partial<TypeNoReadonly<ButtonProps>> & {
  iconClass?: string
  onClick?: (row: T, index: number) => void
}
export type OperationItemConfirmAttrs<T = any> = Partial<TypeNoReadonly<PopconfirmProps>> & {
  title?: string
  onConfirm?: (row: T, index: number) => void
  onCancel?: (row: T, index: number) => void
}
