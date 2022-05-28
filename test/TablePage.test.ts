import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import SimpleTable from "../src/components/table";
import TableBody from "../src/components/table/TableBody";


const mountTable = (options) => mount(SimpleTable, options);

let data = [];
for (let index = 0; index < 100; index++) {
  data.push({
    key: index,
    name: `pan-${index}`,
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
    },
];


test("test table pagination", async () => {
    let pageSizeList = [10,20,30];  //初始化分页页码配置
    for(let size of pageSizeList) {
       let wrapper = mountTable({
            props: {
            data,
            columns,
            pageSize: size
            }
        });
        // 验证条数
       let trList = wrapper.findComponent(TableBody).findAll('tr');
        expect(trList.length).toBe(size);
    }
});

test("test table next page", async () => {
    const wrapper = mountTable({
        props: {
            data,
            columns
        }
    });
    // 点击下一页
    await wrapper.findAll('.pagination-next')[0].trigger('click');
    expect(wrapper.html()).not.toContain('pan-25');
    expect(wrapper.html()).toContain('pan-15');
});
//第一页点击上一页，无效果
test("test table first page", async () => {
    const wrapper = mountTable({
        props: {
            data,
            columns
        }
    });
    // 点击上一页
    await wrapper.findAll('.pagination-previous')[0].trigger('click');
    expect(wrapper.html()).not.toContain('pan-25');
    expect(wrapper.html()).toContain('pan-1');
});

//点击页面跳转 pagination-jump__input

test("test table jump page", async () => {
  const wrapper = mountTable({
      props: {
          data,
          columns
      }
  });
  // 修改页码并点击跳转
  await wrapper.find('.pagination-jump__input').setValue(5);
  await wrapper.findAll('.pagination-next')[1].trigger('click');
  expect(wrapper.html()).not.toContain('pan-25');
  expect(wrapper.html()).toContain('pan-45');
  // 点击上一页
  await wrapper.findAll('.pagination-previous')[0].trigger('click');
  expect(wrapper.html()).not.toContain('pan-45');

  // 点击下一页
  await wrapper.findAll('.pagination-next')[0].trigger('click');
  expect(wrapper.html()).not.toContain('pan-25');
  expect(wrapper.html()).toContain('pan-65');

  //跳转超出总数页码
  await wrapper.find('.pagination-jump__input').setValue(90);
  await wrapper.findAll('.pagination-next')[1].trigger('click');
  expect(wrapper.html()).not.toContain('pan-25');
  //页码校验
  await wrapper.find('.pagination-jump__input').setValue('%');
  await wrapper.findAll('.pagination-next')[1].trigger('click');
  expect(wrapper.html()).not.toContain('pan-25');
});