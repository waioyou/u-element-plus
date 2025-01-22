import type { Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export type Fn = (...args: any[]) => any
