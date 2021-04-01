const fs = jest.genMockFromModule("fs"); // jest mock 的 fs 模块
const _fs = jest.requireActual("fs"); // 真的 fs 模块

Object.assign(fs, _fs);

let readMocks = {};

fs.setReadFileMock = (path, error, data) => {
  readMocks[path] = [error, data];
};

fs.readFile = (path, options, callback) => {
  // 这里其实是对 fs.readFile 做了一个截持操作
  if (callback === undefined) {
    // 用户只传了两个参数的情况，例如：fs.readFile("/xxx", fn)
    callback = options;
  }
  if (path in readMocks) {
    callback(...readMocks[path]);
  } else {
    // 如果 path 不在 readMocks 中，就调用真正的 readFile
    _fs.readFile(path, options, callback);
  }
};

let writeMocks = {};

fs.setWriteFileMock = (path, fn) => {
  writeMocks[path] = fn;
};

fs.writeFile = (path, data, options, callback) => {
  if (path in writeMocks) {
    writeMocks[path](path, data, options, callback);
  } else {
    _fs.writeFile(path, data, options, callback);
  }
};

fs.clearMocks = () => {
  readMocks = {};
  writeMocks = {};
};

module.exports = fs;
