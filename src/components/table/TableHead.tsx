import { defineComponent } from "vue";
import { type TableHeadProps, tableHeadProps, ColumnType } from "./types";
import { INFO } from "./../../util/logger"
import classnames from "classnames";
import TableHeadCell from "./TableHeadCell";
export default defineComponent({
    name: "TableHead",
    props: tableHeadProps,
    emits: ["updateSortItem"],
    setup(props: TableHeadProps,{emit}) {
        let updateSortItem = (item: ColumnType)=>{
            let sort = item.sort === 'reversal' ? 'ordinal': 'reversal';
            item.sort = sort;
            let sortItem = {
                key: item.key,
                sort
            }
            INFO({msg:`排序点击触发--${sortItem.sort}`});
            emit('updateSortItem',sortItem);
        }
        return () => {
            return (
                <thead>
                    <tr>
                        {props.columns.map((item) => {
                            return (
                                <TableHeadCell 
                                column={item}
                                onUpdateSortItem={(val)=>updateSortItem(val)}/>
                            );
                        })}
                    </tr>
                </thead>
            );
        }
    },

});