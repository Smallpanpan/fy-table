import { PropType, VNodeChild, ExtractPropTypes } from "vue";

//表头属性
export type ColumnType = {
  key: string;
  title: string;
  render?: string | ((row: any) => VNodeChild); 
  sort?: string | 'false';  //TODO 使用枚举值 排序方式
  isSort?: Boolean;   //是否展示排序  
};

// 表头 props
export const tableHeadProps = {
  columns: {
    type: Array as PropType<ColumnType[]>,
    default: () => [],
  },
};
//表头cell props 
export const tableHeadCellProps = {
  column: {
    type: Object as PropType<ColumnType>,
    default: () => ({})
  },
}
//表头cell props 
export const tableBodyCellProps = {
  column: {
    type: Object as PropType<ColumnType>,
    default: () => ({}),
  },
  rowKey: {
    type: Function as PropType<(record: ColumnType) => string>,
    default: () => { return () => ''},
  },
  row: {
    type: Object as PropType<{}>,
    default: () => ({})
  }
}

// table props
export const tableProps = {
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  columns: {
    type: Array as PropType<ColumnType[]>,
    default: () => [],
  },
  rowKey: {
    type: Function as PropType<(record: ColumnType) => string>,
    default: () => { return () => ''},
  },
  pageSize: { type: Number, default: 10 },
};

export type TableProps = ExtractPropTypes<typeof tableProps>;
export type TableHeadProps = ExtractPropTypes<typeof tableHeadProps>;