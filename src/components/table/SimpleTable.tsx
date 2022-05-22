import { defineComponent, provide,ref,reactive } from "vue";
import { type TableProps, tableProps,ColumnType } from "./types";
import TableHead from "./TableHead"
import TableBody from "./TableBody";
import Pagination from "../pagination";
import { TABLE_PROPS } from "./const"
import { usePagination } from "../hooks/usePagination"
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
    let { dataSource, pageSize } = props
    let { current, onPageChange } = usePagination()
    let item = ref({
      key:'',
      title:''
    })
    let tableData = {
      current,
      props,
      item,
    }
    let sort = (items:ColumnType)=>{
      item.value = items;
    }
    // 提供给body使用
    provide(TABLE_PROPS, tableData)
    return () => {

      return (
        <>
          <table class="is-bordered is-hoverable is-fullwidth table">
            <TableHead 
              columns={props.columns} 
              onSort={(val) => sort(val)}
            ></TableHead>
            <TableBody></TableBody>
          </table>
          <Pagination
            total={dataSource.length}
            current={current.value}
            pageSize={pageSize}
            onChange={(val) => onPageChange(val)}
          ></Pagination>
        </>
      );
    };
  },
});
