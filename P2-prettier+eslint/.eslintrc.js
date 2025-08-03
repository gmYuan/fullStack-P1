module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  // plugin:prettier/recommended 等价于
  // extends: ['eslint:recommended', 'prettier'],
  // plugins: ['prettier'],
  // rules: {
  //   'prettier/prettier': 'error'
  // }

  plugins: ['prettier'],

  env: {
    node: true,
    es2021: true
  },

  rules: {
    'prettier/prettier': 'error',
    // 理论上样式相关的规则，交给 Prettier 处理
    // 所以这个规则，可以注释掉
    semi: ['error', 'always']
  },

  ignorePatterns: ['node_modules/', 'dist/', 'build/', '*.min.js', '*.min.css', '*.min.html']
};
