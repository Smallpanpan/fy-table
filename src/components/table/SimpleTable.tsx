import { defineComponent, provide,ref } from "vue";
import { type TableProps, tableProps,ColumnType } from "./types";
import TableHead from "./TableHead"
import TableBody from "./TableBody";
import Pagination from "../pagination";
import { TABLE_PROPS } from "./const"
import { usePageListener } from "../hooks/usePageListener"
import { INFO } from "../../util/logger"
export default defineComponent({
  name: "SimpleTable",
  props: tableProps,
  components: {
    Pagination,
    TableBody,
    TableHead
  },
  setup(props: TableProps) {
    let { data, pageSize } = props
    let { current, onPageChange } = usePageListener()
    // 排序响应后触发的列
    let columnItem = ref({
      key:'',
      title:''
    })
    let updateSortItem = (items:ColumnType)=>{
      columnItem.value = items;
    }
    let tableData = {
      props,
      current,
      columnItem,
    }
    // 提供给body使用
    provide(TABLE_PROPS, tableData)
    return () => {

      return (
        <div>
          <table class="is-bordered is-hoverable is-fullwidth table">
            <TableHead 
              columns={props.columns} 
              onUpdateSortItem={(val) => updateSortItem(val)}
            ></TableHead>
            <TableBody></TableBody>
          </table>
          <Pagination
            total={data.length}
            current={current.value}
            pageSize={pageSize}
            onChange={(val) => onPageChange(val)}
          ></Pagination>
        </div>
      );
    };
  },
});
