import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import SimpleTable from "../src/components/table";
import { h } from "vue";

const mountTable = (options) => mount(SimpleTable, options);
// 验证 table 渲染
test("test table data and columns", () => {
  let data = [];
  for (let index = 0; index < 100; index++) {
    data.push({
      key: index,
      name: `panqinghua ${index}`,
      age: Math.round(Math.random()*60+10),
      mark: Math.round(Math.random()*100+50),
      major: Math.round(Math.random()) ? '计算机':'体育',
      sex: Math.round(Math.random()) ? '男':'女'
    });
  }
  let columns = [
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
          return h("div", value.major);
        },
      },
  ];

 
  const wrapper = mountTable({
    props: {
      data,
      columns,
    }
  });

  expect(wrapper.html()).toMatchSnapshot();
  //点击行触发
  wrapper.findAll('tbody')[0].find('tr').trigger('click');
});