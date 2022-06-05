/**
 * 获取分页器相关计算数据
 */
import { ref } from "vue"
import { INFO } from "./../../util/logger.js"
import type { ColumnType } from "./../table/types";
export function useTableSortList() {
  // 排序响应后触发的列
  let columnItem = ref({})
  let updateSortItem = (updateItems: ColumnType) => {
    columnItem.value = updateItems;
    INFO({msg: `排序修改:${updateItems}`,event:'click', module:'useTableSortList'});
  };
  return { 
    columnItem,
    updateSortItem 
  }
}