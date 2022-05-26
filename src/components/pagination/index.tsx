import { defineComponent, ref, Ref, PropType,computed } from "vue";
import type { paginationData } from "./types";
import classnames from "classnames";
import { TRACE, INFO } from "../../util/logger"

export default defineComponent({
  name: "Pagination",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    current: {
      type: Number,
      default: 1,
    },
    // 分页按钮配置
    paginationConfig: {
      type: Object as PropType<paginationData>,
      default:() => ({
        maxBtnNum: 8,  //展示最多页码
        recentBtnNum: 6, //除了首位页，展示最近6个页面，动态改变
      })
    } 
  },
  emits: ["change"],
  setup(props, { emit }) {
    let jumpPage: Ref<string | number> = ref("");
    // 总页数
    let pageCount = computed(()=>{
      return Math.ceil(props.total / props.pageSize);
    })
    // 页码显示配置
    let isShowBtn = (index: number) => {
      let {maxBtnNum, recentBtnNum} = props.paginationConfig;
      let  firstPage = 1; //开始页
      let currentPage = recentBtnNum - 2; //最近两页index
      let midPage = Math.floor(recentBtnNum/2)
      // 少于8页 按钮全部展示
      if (pageCount.value < maxBtnNum) {
        return true;
      } else {
        // 显示首页和最后一页按钮
        if (index === firstPage || index === pageCount.value) {
          return true;
        } else {
          // 动态计算只展示最近n页 与首尾位页
          if (props.current < currentPage && index < recentBtnNum) {  //只展示前n位
            return true;
          } else if (props.current > pageCount.value - currentPage && index > pageCount.value - recentBtnNum) {    //只展示后n位
            return true;
          } else if (index < props.current + midPage && index > props.current - midPage) {
            return true;
          } else {
            return false;
          }
        }
      }
    };

    // 是否显示省略号
    let isShowEllipsis = (index: number) => {
      return index === 2 || index === pageCount.value - 1;
    };
    // 上一页
    let prePage = ()=> {
      changeCurrentPage(props.current + 1)
    }
    // 下一页
    let nextPage = ()=> {
      changeCurrentPage(props.current + 1)
    }
    // 修改页码
    let changeCurrentPage = (pageNumber: number) => {
      INFO({msg: `页面修改:${pageNumber}`,event:'click', module:'pagination'});
      if (pageNumber > pageCount.value || pageNumber < 1) {
        return;
      }
      emit("change", pageNumber);
    };

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

    return () => {
      return (
          <div class="pagination is-centered">
            <a
              class={classnames("pagination-previous", {
                "pagination-button-disabled": props.current === 1,
              })}
              onClick={() => nextPage()}
            >
              上一页
            </a>
            <a
              class={classnames("pagination-next", {
                "pagination-button-disabled": props.current === pageCount.value,
              })}
              onClick={() => nextPage()}
            >
              下一页
            </a>
            <div class="pagination-list">
              {Array(...Array(pageCount.value)).map((value,key) => {
                let index = key + 1;
                if (isShowBtn(index)) {
                  return (
                    <span onClick={() => changeCurrentPage(index)}>
                      <a
                        class={classnames("pagination-link", {
                          "is-current": props.current === index,
                        })}
                      >
                        {index}
                      </a>
                    </span>
                  );
                } else if (isShowEllipsis(index)) {
                  return <span class="pagination-ellipsis">&hellip;</span>
                }
              })}
              <div class="pagination pagination-jump">
                跳转至
                <input
                  class="pagination-jump__input input"
                  value={jumpPage.value}
                  onInput={(inputEvent) => onInputChange(inputEvent)}
                  type="text"
                />
                页
                <a
                  class="pagination-next"
                  onClick={() =>
                    changeCurrentPage(jumpPage.value as number)
                  }
                >
                  GO
                </a>
              </div>
            </div>
          </div>
      );
    };
  },
});
