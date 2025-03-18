import type { TypeNoReadonly } from '@/types'
import type { ButtonProps, PopconfirmProps } from 'element-plus'
import type { TableColumnDefaultProps } from '../table/type'

export interface OperationProps<T = any> {
  slotProps?: TableColumnDefaultProps<T>
  operations: Operations<T>
  type?: 'button' | 'text' | 'link'
  onlyIcon?: boolean
}

export interface OperationEmits<T = any> {
  (e: 'click-operation', name: string, row: T, index: number): void
}

export type Operations<T = any> = OperationItem<T>[]

export interface OperationItem<T = any> {
  name: string
  label: string
  if?: boolean | ((row: T) => boolean)
  buttonAttrs?: (row: T, index: number) => OperationItemButtonAttrs
  confirmAttrs?: (row: T, index: number) => OperationItemConfirmAttrs
}

export type OperationItemButtonAttrs = Partial<
  TypeNoReadonly<Omit<ButtonProps, 'text' | 'link'>>
> & {
  iconClass?: string
  onClick?: () => void
}
export type OperationItemConfirmAttrs = Partial<TypeNoReadonly<PopconfirmProps>> & {
  title?: string
  onConfirm?: () => void
  onCancel?: () => void
}
