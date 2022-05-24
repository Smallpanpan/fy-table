import { defineComponent, inject,ref } from "vue";
import { TABLE_PROPS } from "./const"
import { useTable } from "../hooks/useTable"
import { TRACE } from "../../util/logger"
import TableBodyCell from "./TableBodyCell";
export default defineComponent({
    name: "TableBody",
    setup() {
        let { props, current,columnItem } = inject(TABLE_PROPS)!
        let { renderList } = useTable(props, current, columnItem)
        let rowOnClick = (row)=>{
            TRACE({msg: `点击行触发${row}`,event:'click'});
        }
        return () => {
            return (
                <tbody>
                    {renderList.value.map((row) => {
                        return (
                            <tr key={props.rowKey(row)}
                                onClick={(row)=>rowOnClick(row)}>
                                {Array.isArray(props.columns) &&
                                props.columns.map((column) => (
                                <TableBodyCell row={row} column={column} />
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            );
        };
    },
});
