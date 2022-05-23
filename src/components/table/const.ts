import { InjectionKey, Ref } from "vue"
import { type TableProps,ColumnType } from "./types";

export interface TableData {
    current: Ref<number>;
    props: TableProps,
    columnItem: Ref<ColumnType>
}

export const TABLE_PROPS: InjectionKey<TableData> = Symbol('tableProps')