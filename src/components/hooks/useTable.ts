import type { TableProps,ColumnType } from "../table/types";
import { Ref, computed, ComputedRef } from "vue";

export function useTable(props: TableProps, current: Ref<number>,item:Ref<ColumnType>) {
  let renderList: ComputedRef<any[]> = computed(() => {
    let dataList = props.dataSource.slice(
      (current.value - 1) * props.pageSize,
      current.value * props.pageSize
    );
    if(item.value?.sort === 'reversal'){
      return dataList.sort(uncompare(item.value.key));
    }
    if(item.value?.sort === 'ordinal'){
      return dataList.sort(compare(item.value.key));
    }
    return dataList
  });
  //顺序
  let compare =  (prop: string) => {
    return function (obj1:any, obj2:any) {
        let val1 = obj1[prop];
        let val2 = obj2[prop];
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }            
    } 
}
//倒序
let uncompare =  (prop: string) => {
    return function (obj1:any, obj2:any) {
        let val1 = obj1[prop];
        let val2 = obj2[prop];
        if (val1 < val2) {
            return 1;
        } else if (val1 > val2) {
            return -1;
        } else {
            return 0;
        }            
    } 
}
  return {
    renderList,
  };
}
