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
        //排序需要重新在hook引入
        let updateSortItem = (item: ColumnType)=>{
            INFO({msg:'点击触发'});
            item.sort = item.sort === 'reversal' ? 'ordinal': 'reversal';
            emit('updateSortItem',item);
        }
        //清除排序
        let clearSort = () =>{
            props.columns.map(item=>{
                item.sort = 'disorder'
            })
            let item = {
                key:'',
                title:'',
                sort:'disorder'
            }
            updateSortItem(item);
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