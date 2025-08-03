module.exports = {
  // === 核心配置（必须） ===
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  printWidth: 100,

  // === 推荐配置 ===
  // json 文件的格式化
  $schema: 'https://json.schemastore.org/prettierrc',
  // 对象最后一个成员是否 尾随逗号
  trailingComma: 'es5',
  // 对象字面量中是否在对象和对象的属性之间添加空格
  bracketSpacing: true,
  // 箭头函数是否省略括号
  arrowParens: 'avoid',
};
