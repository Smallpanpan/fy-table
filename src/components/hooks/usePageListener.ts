/**
 * 获取分页器相关计算数据
 */
import { ref } from "vue"
import { INFO } from "../../util/logger"
export function usePageListener() {
  let current = ref(1);
  let onPageChange = (pageNumber: number) => {
    current.value = pageNumber;
    INFO({msg: `页面修改:${pageNumber}`,event:'click', module:'usePagination'});
  };
  return {
    current,
    onPageChange
  }
}