import type { TableProps,ColumnType } from "../table/types";
import { Ref, computed, ComputedRef } from "vue";

export function useTable(props: TableProps, current: Ref<number>,columnItem:Ref<ColumnType>) {
  let renderList: ComputedRef<any[]> = computed(() => {
    let dataList = props.data;
    dataList = getSortList(dataList,columnItem); //获取排序后序列
    if(columnItem.value?.sort === 'reversal'){
      dataList.sort(uncompare(columnItem.value.key));
    }
    if(columnItem.value?.sort === 'ordinal'){
      dataList.sort(compare(columnItem.value.key));
    }
    dataList = getrenderList(dataList, current.value, props.pageSize)
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
// 获取分页数据
let getrenderList = (data:any[], current:number, pageSize:number) => {
  return data.slice(
    (current - 1) * pageSize,
    current * pageSize
  );
}

let getSortList = (dataList:any[], columnItem:Ref<ColumnType>) => {
  if(columnItem.value?.sort === 'reversal'){
    dataList.sort(uncompare(columnItem.value.key));
  }
  if(columnItem.value?.sort === 'ordinal'){
    dataList.sort(compare(columnItem.value.key));
  }
  return dataList
}
  return {
    renderList,
  };
}
