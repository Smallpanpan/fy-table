import { defineComponent, inject } from "vue";
import { TABLE_PROPS } from "./const"
import { useTable } from "../hooks/useTable"
import { TRACE } from "../../util/logger"
import TableBodyCell from "./TableBodyCell";
export default defineComponent({
    name: "TableBody",
    setup() {
        let { props, current,columnItem } = inject(TABLE_PROPS)!
        let { renderList } = useTable(props, current, columnItem)
        let rowOnClick = ()=>{
            TRACE({msg: '点击行触发',event:'click'});
        }
        return () => {
            return (
                <tbody>
                    {renderList.value.map((row) => {
                        return (
                            <TableBodyCell
                                row={row}
                                column={props.columns}
                                rowKey={props.rowKey}
                                onrowOnClick={(val)=>rowOnClick(val)}/>
                        );
                        
                    })}
                </tbody>
            );
        };
    },
});
