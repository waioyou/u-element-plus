# useTable

## 基础用法

`useTable` 是一个便捷的表格数据管理钩子函数，它封装了表格数据加载、列配置、操作按钮等常用功能。需要结合 `u-table` 组件使用。

<preview path="../demo/use-table/basic.vue"></preview>

## 手动触发数据加载

默认情况下，`useTable` 会在组件挂载时自动获取数据，但您也可以通过设置 `auto: false` 来手动调用 `getTableData` 方法控制数据加载时机：

```typescript
const { getTableData } = useTable(() => getUserList(10), { auto: false })

// 在需要的时候手动加载数据
const handleSearch = () => {
  getTableData()
}
```

## 切换表格列的渲染状态

您可以使用 `toggleTableColumnRendered` 方法动态隐藏某些列：

```typescript
const { toggleTableColumnRendered } = useTable<User>(() => getUserList(10))

// 隐藏单个列
toggleTableColumnRendered('age')

// 或同时隐藏多个列
toggleTableColumnRendered(['age', 'address'])

// 强制隐藏
toggleTableColumnRendered(['age', 'address'], false)
```

## 处理选择事件

表格的多选功能已经被封装在钩子内部：

```typescript
const { multipleSelection } = useTable<User>(() => getUserList(10))

const handleBatchDelete = () => {
  if (multipleSelection.value.length === 0) {
    // 未选择任何记录
    return
  }

  console.log('要删除的记录：', multipleSelection.value)
  // 进行批量删除的操作...
}
```

## API

### 完整参数

`useTable`接受泛型参数，泛型参数为表格数据类型。

`useTable` 接受两个参数：

1. `callback`: 获取表格数据的函数，需要返回表格数据
2. `options`: 配置选项
   - `auto`: 是否自动获取数据，默认为 `true`
   - `isShallow`: 是否使用浅层响应式，默认为 `false`（提高大数据表格的性能）

### 返回值

`useTable` 返回以下内容供您使用：

| 返回值                    | 说明               | 默认值                                      |
| ------------------------- | ------------------ | ------------------------------------------- |
| loading                   | 表格加载状态       | `false`                                     |
| tableRef                  | 表格实例引用       | -                                           |
| tableData                 | 表格数据           | `[]`                                        |
| tableColumns              | 表格列配置         | `[]`                                        |
| indexProps                | 序号列配置         | `{ label: '', width: 40, align: 'center' }` |
| selectionProps            | 选择列配置         | `{ width: 40, align: 'center' }`            |
| expandProps               | 展开列配置         | `{ width: 40, align: 'center' }`            |
| tableOperations           | 表格操作按钮       | `[]`                                        |
| multipleSelection         | 多选数据           | `[]`                                        |
| handleSelectionChange     | 选择变化处理函数   | -                                           |
| toggleTableColumnRendered | 切换表格列渲染状态 | -                                           |
| setTableColumns           | 设置表格列方法     | -                                           |
| setTableOperations        | 设置表格操作方法   | -                                           |
| getTableData              | 获取表格数据方法   | -                                           |

## 最佳实践

::: warning

1. 始终在 `onMounted` 或其他生命周期钩子中设置表格列和操作，确保它们在组件初始化后被正确配置。

2. 对于大型数据表格，配置 `isShallow: true` ，可以提高表格的渲染性能。

3. 当表格数据依赖于用户交互（如搜索、筛选）时，将 `auto` 设置为 `false`，并在适当的时机手动调用 `getTableData()`。

4. 合理利用 `multipleSelection` 处理批量操作，并始终检查是否有选中的记录。

:::
