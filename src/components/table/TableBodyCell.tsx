import { defineComponent, inject, watch } from "vue";
import { tableBodyCellProps } from "./types";
import { TRACE } from "../../util/logger"
import lodashIsString from 'lodash/isString'
import lodashGet from "lodash/get";
export default defineComponent({
    name: "TableBody",
    props: tableBodyCellProps,
    setup(props,{emit}) {
        let {row, column} = props;
        return () => {
            return (
                <>
                    {column.render ? 
                        (
                            <td>
                                {lodashIsString(column.render)
                                ? column.render
                                : column.render(row)}
                            </td>
                        ) : (
                            <td key={column.key} title={lodashGet(row, column.key, "")}>
                            {lodashGet(row, column.key, "-")}
                            </td>
                        )}
                </>
            );
        };
    },
});
