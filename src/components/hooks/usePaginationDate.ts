/**
 * 获取分页器相关计算数据
 */
 import { ref } from "vue"
 export function usePagination() {
   let current = ref(1);
   let onPageChange = (pageNumber: number) => {
     current.value = pageNumber;
   };
   return {
     current,
     onPageChange
   }
 }