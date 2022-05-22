import { defineComponent, inject, watch } from "vue";
import { tableBodyCellProps } from "./types";
import { TRACE } from "../../util/logger"
import lodashIsString from 'lodash/isString'
export default defineComponent({
    name: "TableBody",
    props: tableBodyCellProps,
    setup(props,{emit}) {
        let rowOnClick =  (item) => {
            TRACE({msg: '点击行触发',event:'click'});
            emit('rowOnClick',item);
        }
        let {row, column} = props;
        console.log('column',column);
        return () => {
            return (
                <tr onClick={() => rowOnClick(row)}>
                    {column.map((cell) => {
                        return cell.render ? (
                            <td key={cell.key}>{lodashIsString(cell.render)?cell.render:cell.render(row)}</td>
                        ) : (
                            <td key={cell.key} title={row[cell.key]}>
                                {row[cell.key]}
                            </td>
                        );
                    })}
                </tr>
            );
        };
    },
});
