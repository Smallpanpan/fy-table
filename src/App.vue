<template>
  <Table :dataSource="dataSource" 
         :columns="columns"
         @sortChange="sortChange">
      <template slot="achievement">
        及格
      </template>
  </Table>
</template>

<script lang="ts">
import { ref, Ref } from "vue";
import Table from "./components/table/index";
interface TableSource {
  key: number;
  mark: number;
  name: string;
  age: number;
  major: string;
  sex: string;
  tags: string[];
}
export default {
  components: {
    Table,
  },
  setup() {
    let dataSource: Ref<TableSource[]> = ref([]);
    for (let index = 0; index < 150; index++) {
      dataSource.value.push({
        key: index,
        name: `Edrward ${index}`,
        age: Math.round(Math.random()*60+10),
        mark: Math.round(Math.random()*100+50),
        major: Math.round(Math.random()) ? '计算机':'体育',
        sex: Math.round(Math.random()) ? '男':'女',
        tags: ["nice", "developer"],
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
        info("触发排序事件");
    }
    return {
      dataSource,
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
