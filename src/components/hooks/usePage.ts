/**
 * 获取分页器相关计算数据
 */
 import { ref, Ref, ComputedRef } from "vue"
 import { TRACE } from "../../util/logger"
 export function usePage() {
    let jumpPage: Ref<string | number> = ref("");
    // 页面输入校验
    let onInputChange = (inputEvent: Event) => {
      TRACE({msg: `页码输入:${inputEvent}`,event:'input'});
      (inputEvent.target as HTMLInputElement).value = (
        inputEvent.target as HTMLInputElement
      ).value.replace(/[^0-9]/g, "");
      if ((inputEvent.target as HTMLInputElement).value !== "") {
        jumpPage.value = Number((inputEvent.target as HTMLInputElement).value);
      } else {
        jumpPage.value = "";
      }
    };
    return {
      jumpPage,
      onInputChange
    }
 }