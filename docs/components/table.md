# Table 表格

通过配置项（columns）动态生成表格内容；包含了Element Plus表格组件中的所有功能，并支持对应组件所有的属性和事件。

## 基础用法

通过表格配置选项生成一个基础的表格，将对应的列属性设置在`columns`字段中。

<!-- <preview  path="../demo/table/basic.vue"></preview> -->

## 自定义列模板

通过插槽自定义列的内容，可以获取到 row, column, $index 和 store 的数据。

## 表格编辑

通过设置 `editable` 属性开启表格编辑功能，可以直接在表格中编辑数据。

::: tip
todo
:::

## 多级表头

通过配置 `children` 属性可以实现多级表头。

<preview  path="../demo/table/grouping.vue"></preview>

## 表格操作栏

::: tip
todo
:::

## 列设置

::: tip
todo
:::

## API

支持`el-table`组件的属性、事件、插槽、对外暴露的方法；具体请查看[Element Plus Table 文档](https://element-plus.org/zh-CN/component/table.html)

以下只列举与`el-table`组件不同的属性、事件、插槽、对外暴露的方法。

### Props

| 名称     | 说明           | 类型                  | 默认值  |
| -------- | -------------- | --------------------- | ------- |
| columns  | 表格列配置项   | `TableColumnOption[]` | `[]`    |
| editable | 是否可编辑     | `boolean`             | `false` |
| toolbar  | 表格操作栏配置 | `TableToolbarOption`  | -       |

### Events

| 事件名        | 说明               | 参数类型                                                      |
| ------------- | ------------------ | ------------------------------------------------------------- |
| edit-change   | 编辑数据变化时触发 | `(row: any, prop: string, value: any, index: number) => void` |
| column-change | 列设置变化时触发   | `(columns: TableColumnOption[]) => void`                      |

### Slots

| 插槽名                | 说明             | 作用域参数                |
| --------------------- | ---------------- | ------------------------- |
| `${prop}`             | 自定义列内容     | `{ row, column, $index }` |
| `header-${prop}`      | 自定义表头内容   | `{ column, $index }`      |
| `filter-icon-${prop}` | 自定义筛选图标   | `{ column, $index }`      |
| `toolbar`             | 自定义工具栏     | -                         |
| `toolbar-prefix`      | 自定义工具栏前缀 | -                         |
| `toolbar-suffix`      | 自定义工具栏后缀 | -                         |

### TableColumnOption 配置项

<table style="width: 100%;">
   <tbody>
    <tr>
        <th style="width: 30%;">名称</th>
        <th style="width: 30%;">说明</th>
        <th style="width: 40%;">类型</th>
    </tr>
    <tr>
        <td>prop</td>
        <td>对应列内容的字段名</td>
        <td><code>string</code></td>
    </tr>
    <tr>
        <td>label</td>
        <td>显示的标题</td>
        <td><code>string</code></td>
    </tr>
    <tr>
        <td>width</td>
        <td>对应列的宽度</td>
        <td><code>string | number</code></td>
    </tr>
    <tr>
        <td>minWidth</td>
        <td>对应列的最小宽度</td>
        <td><code>string | number</code></td>
    </tr>
    <tr>
        <td>fixed</td>
        <td>列是否固定</td>
        <td><code>true | 'left' | 'right'</code></td>
    </tr>
    <tr>
        <td>sortable</td>
        <td>对应列是否可以排序</td>
        <td><code>boolean | 'custom'</code></td>
    </tr>
    <tr>
        <td>filters</td>
        <td>数据过滤的选项</td>
        <td><code>{ text: string, value: string }[]</code></td>
    </tr>
    <tr>
        <td>filterMethod</td>
        <td>数据过滤使用的方法</td>
        <td><code>(value, row, column) => boolean</code></td>
    </tr>
    <tr>
        <td>formatter</td>
        <td>用来格式化内容</td>
        <td><code>(row, column, cellValue, index) => VNode | string</code></td>
    </tr>
    <tr>
        <td>showOverflowTooltip</td>
        <td>当内容过长被隐藏时显示 tooltip</td>
        <td><code>boolean</code></td>
    </tr>
    <tr>
        <td>align</td>
        <td>对齐方式</td>
        <td><code>'left' | 'center' | 'right'</code></td>
    </tr>
    <tr>
        <td>headerAlign</td>
        <td>表头对齐方式</td>
        <td><code>'left' | 'center' | 'right'</code></td>
    </tr>
    <tr>
        <td>children</td>
        <td>多级表头的子列</td>
        <td><code>TableColumnOption[]</code></td>
    </tr>
    <tr>
        <td>editable</td>
        <td>是否可编辑</td>
        <td><code>boolean</code></td>
    </tr>
    <tr>
        <td>editComponent</td>
        <td>编辑时使用的组件</td>
        <td><code>string</code></td>
    </tr>
    <tr>
        <td>editAttrs</td>
        <td>编辑组件的属性</td>
        <td><code>object</code></td>
    </tr>
    <tr>
        <td>hidden</td>
        <td>是否隐藏列</td>
        <td><code>boolean</code></td>
    </tr>
   </tbody>
</table>

### TableToolbarOption 配置项

<table style="width: 100%;">
   <tbody>
    <tr>
        <th style="width: 30%;">名称</th>
        <th style="width: 30%;">说明</th>
        <th style="width: 40%;">类型</th>
    </tr>
    <tr>
        <td>refresh</td>
        <td>是否显示刷新按钮</td>
        <td><code>boolean</code></td>
    </tr>
    <tr>
        <td>export</td>
        <td>是否显示导出按钮</td>
        <td><code>boolean</code></td>
    </tr>
    <tr>
        <td>setting</td>
        <td>列设置配置</td>
        <td><code>boolean | { checkable: boolean, draggable: boolean }</code></td>
    </tr>
    <tr>
        <td>fullscreen</td>
        <td>是否显示全屏按钮</td>
        <td><code>boolean</code></td>
    </tr>
    <tr>
        <td>buttons</td>
        <td>自定义按钮</td>
        <td><code>{ text: string, icon?: string, onClick: () => void }[]</code></td>
    </tr>
   </tbody>
</table>

## 待实现功能

- 多级表头
- 表格操作栏
- 列设置（勾选列显示，拖拽排序列）
- 表格编辑
