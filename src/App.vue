<template>
  <fy-table :data="data" 
         :columns="columns"
         @sortChange="sortChange">
  </fy-table>
</template>

<script lang="ts">
import { ref, Ref } from "vue";
import { INFO } from "./util/logger.js";
import FyTable from "./components/table/index";
interface TableSource {
  key: number;
  mark: number;
  name: string;
  age: number;
  major: string;
  sex: string;
}
export default {
  components: {
    FyTable,
  },
  setup() {
    let data: Ref<TableSource[]> = ref([]);
    for (let index = 0; index < 100; index++) {
      data.value.push({
        key: index,
        name: `panqinghua ${index}`,
        age: Math.round(Math.random()*60+10),
        mark: Math.round(Math.random()*100+50),
        major: Math.round(Math.random()) ? '计算机':'体育',
        sex: Math.round(Math.random()) ? '男':'女'
      });
    }

    let columns = ref([
      {
        title: "姓名",
        key: "name",
      },
      {
        title: "年龄",
        key: "age",
        isSort:'true'
      },
      {
        title:'性别',
        key:'sex',
      },
      {
          title: "分数",
          key: "mark",
          isSort:'true'
      },
      {
        title: "专业",
        key: "major",
        render: (value: any) => {
          return value.major;
        },
      },
    ]);
    function sortChange (){
      // 远程排序可在此触发
        INFO({msg:`触发远程排序事件`});
    }
    return {
      data,
      columns,
      sortChange,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;
}
</style>
