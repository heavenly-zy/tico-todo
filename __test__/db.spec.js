const db = require("../db.js");
const fs = require("fs");
// jest.mock 可以将一个对象替换为开发者自己写的对象，方便测试
jest.mock("fs");

describe("db", () => {
  afterEach(() => {
    // afterEach 表示在每一个测试用例执行完后进行清除 mock 的操作，防止影响到后面的测试（比如后面也用"/xxx"）
    fs.clearMocks();
  });
  // 测试【读文件】
  it("can read", async () => {
    const data = [{ title: "hi", done: true }];
    fs.setReadFileMock("/xxx", null, JSON.stringify(data));
    const list = await db.read("/xxx");
    expect(list).toStrictEqual(data); // 是否“深度相等”
  });
  // 测试【写文件】
  it("can write", async () => {
    let fakeFile;
    fs.setWriteFileMock("/yyy", (path, data, callback) => {
      fakeFile = data;
      callback(null);
    });
    const list = [
      { title: "JOJO", done: true },
      { title: "DIO", done: false }
    ];
    await db.write(list, "/yyy");
    expect(fakeFile).toBe(JSON.stringify(list) + "\n");
  });
});
