import { defineComponent } from "vue";
import { tableHeadCellProps,ColumnType } from "./types";
import classnames from "classnames";
import { TRACE } from "../../util/logger"
export default defineComponent({
    name: "TableHead",
    props: tableHeadCellProps,
    emits: ["sortChange"],
    setup(props,{emit}) {
        // 排序触发
        let sortChange =  (item:ColumnType) => {
            TRACE({msg: '点击排序触发',event:'click'});
            emit('sortChange',item);
        }
        return () => {
            return (
                <td>
                    <div>
                        <span title={props.column.title}>
                            {props.column.title}
                        </span>
                        <span class={classnames("iconfont","icon-shangjiantou", {
                              "icon-xiajiantou": props.column.sort === 'reversal'})}
                              onClick={() => sortChange(props.column)}
                              v-show={props.column?.isSort}></span>
                    </div>
                </td>
            );
        }
    },
});
