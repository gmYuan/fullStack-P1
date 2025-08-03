// 这个文件包含多个 ESLint 错误
const x = 'double quotes'; // 应该使用 const 和单引号
const y = 1 + 2; // 缺少分号
const z = [1, 2, 3]; // 逗号后应该有空格

const ss = '123';

function test(a, b) {
  // 参数之间应该有空格
  return a + b; // 缺少分号，操作符周围应该有空格
}

console.log(test(1, 2)); // 缺少分号，参数之间应该有空格
