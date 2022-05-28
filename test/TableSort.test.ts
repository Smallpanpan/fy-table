import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import SimpleTable from "../src/components/table";
import TableBodyCell from "../src/components/table/TableBodyCell";

const mountTable = (options) => mount(SimpleTable, options);

test("test table sort", async () => {
  let data = [
    {
      name: 'pan 1',
      mark: 80,
    },
    {
      name: 'pan 2',
      mark: 78,
    },
    {
      name: 'pan 3',
      mark: 90,
    }
  ];
  let columns = [
    {
      title: "姓名",
      key: "name",
    },
    {
        title: "分数",
        key: "mark",
        isSort:'true'
    },
  ];


  let wrapper = mountTable({
    props: {
      data,
      columns,
    }
  });

  let descList = ['90','80','78'];
  let ascList = ['78','80','90'];
  // 点击倒序

  await wrapper.findAll('.icon-shangjiantou')[1].trigger('click')
  const descBodyCells = wrapper.findAllComponents(TableBodyCell);
  for(let index in descList){
    expect(descBodyCells[0].findAll('tr')[index].html()).toContain(descList[index]);
  }

  // 点击顺序
  // await wrapper.findAll('.icon-shangjiantou')[1].trigger('click')
  // const bodyCells = wrapper.findAllComponents(TableBodyCell);
  // console.log('1111111',bodyCells[0].html())
  // for(let index in ascList) {
  //   expect(bodyCells[0].findAll('tr')[index].html()).toContain(ascList[index]);
  // }

});
