

# 表格组件

## 介绍

实现表格组件，**功能**：

- 渲染表头
- 渲染表格主体内容
- 分页功能(上一页，下一页，跳页（输入框输入）)
- 排序功能(顺序/倒叙/恢复无序)

## API

```vue

<script setup lang="ts">

    const tableOptions = {
        columns: [
            {key: '姓名', dataIndex: 'name'},
            {key: '成绩', dataIndex: 'score', sortable: true}
            {key:'操作', dataIndex：'operation'}
        ],
        data: [
            {name: 'Bob', score: '67'},
            {name: 'Tom', score: '90'},
            {name: 'Alice', score: '93'}
        ],
        paginationOptions: {
            enable: true,
            limit: 2,
            page: 1
        },
    }

</script>

<template>
    <SimpleTable :data="tableOptions.data"
                 :columns="tableOptions.columns">
        <template slot-scope="scope">
        <button @click="handleDelete(scope.$index, scope.row)">删除<button>
      </template>
    </SimpleTable>
</template>

```



### Table Attributes

| 名称 | 描述 |类型|默认值|可选值|
|----- | ------|------|------|------|
|columns | 表格列的配置 | ColumnOptions[] |||
|data | 显示的数据 | Array |||
|height | 表格高（设置定高则会超出滚动） | string |||
|width | 表格宽 | string |||
|stripe | 设置斑马纹 | boolean |||
|sortOptions | 排序配置，具体见 sortOptions配置 | \- |||
|paginationOptions | 分页配置，具体见 paginationOptions配置 | PaginationOptions |||

### Table Events

| 名称 | 说明 | 回调参数 |
|----- | ------|------|
|select-all | 全选时触发 |selection|
|select-change | 勾选单个数据时触发 |row|
|filter-change | 筛选时触发 |row|
|sort-change | 点击列排序触发 |{column，order}|
|row-click | 点击行触发 |row, event|
|row-contextmenu | 右键行 |row, event|

### Table Methods

| 名称           | 说明     | 参数            |
| -------------- | -------- | --------------- |
| clearSort      | 清除排序 |                 |
| clearSelectall | 取消全选 |                 |
| clearFilter    | 清除筛选 |                 |
| sort           | 排序     | {column，order} |

### 

### Table-column Slot

| 名称 | 说明 |
|----- | ------|
|slot | 列显示插槽 |



### Table-column Attributes

| 名称      | 描述                       | 类型                                   | 默认值 | 可选值                                    |
| --------- | -------------------------- | -------------------------------------- | ------ | ----------------------------------------- |
| dataIndex | 列属性                     | string                                 |        |                                           |
| key       | 列标题名称                 | string                                 |        |                                           |
| align     | 对齐方式                   | string                                 | left   | 'left'  'center'  'right'                 |
| sortable  | 是否支持排序               | boolean                                | false  | false/true                                |
| sortOrder | 排序参数                   | string                                 |        | 'NONE'/'ASC'/'DESC'                       |
| sortFn    | 自定义排序函数或者远程排序 | (a: TableData, b: TableData) => number |        |                                           |
| slot      | 列插槽                     |                                        |        |                                           |
| fixed     | 固定列                     | string                                 |        | 'start'  'end'                            |
| width     | 列宽                       | number \| string                       |        |                                           |
| type      | 类型                       | string                                 |        | 序号(index)  单选(radio)  多选(selection) |



### paginationOptions

| 名称   | 描述             | 类型    | 默认值 | 可选值     |
| ------ | ---------------- | ------- | ------ | ---------- |
| enable | 是否支持分页     | boolean | false  | false/true |
| limit  | 每页显示条目个数 | number  | 10     |            |
| page   | 当前页           | number  | 1      |            |
| total  | 总条目数         | number  | 0      |            |
| remote | 是否支持远端分页 | boolean | false  | false/true |

### 