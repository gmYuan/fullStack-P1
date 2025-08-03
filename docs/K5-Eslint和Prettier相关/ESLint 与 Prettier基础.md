## ESLint 与 Prettier 基础

### 📚 基础概念

1. ESLint 与 Prettier 的分工

ESLint- 代码质量检查员 👮‍♂️， 负责检查：
  - 潜在问题
  - 最佳实践
  - 代码风格

Prettier- 代码格式化工具 💅，负责统一：
  - 缩进
  - 空格
  - 换行
  - 引号样式


2. 两个关键包的作用

eslint-config-prettier
  - 作用：让 ESLint 和 Prettier 和平共处 🤝
  - 具体做法：
    - 关闭所有与 Prettier 冲突的 ESLint 规则
    - 让 Prettier 专门负责代码格式化

记忆方法：config = 配置 = 关闭冲突


eslint-plugin-prettier
  - 作用：让 ESLint 和 Prettier 合二为一 🔄
  - 具体做法：
    - 把 Prettier 的规则转化为 ESLint 规则
    - 在 ESLint 中运行 Prettier

记忆方法：plugin = 插件 = 添加功能


3. 🎭 总结 - 用一个故事记住

想象你在管理一个编辑部：
  - ESLint = 主编（检查文章质量）
  - Prettier = 排版师（美化文章格式）

问题：两人经常为格式争吵

解决方案：
  - eslint-config-prettier = 告诉主编："排版的事你别管了"
  - eslint-plugin-prettier = 让排版师向主编汇报："发现格式问题就告诉主编"

结果：团队和谐，工作高效！✨



### 🎯 配置示例

```js
// .eslintrc.js 配置示例

// ❌ 不协调的配置
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  rules: {
    // ESLint: 必须用单引号
    'quotes': ['error', 'single'],
    // ESLint: 必须有分号 
    'semi': ['error', 'always']
  }
}
// 而 Prettier 配置了双引号和无分号，就会打架！
```

正确配置方法

```js
// 配置方法1
// ✅ 使用 eslint-config-prettier 的配置
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'prettier'  // 👈 这个会关闭所有与 Prettier 冲突的规则
  ],
  rules: {
    // 只关注代码质量，不管格式
    'no-unused-vars': 'error',
    'no-console': 'warn'
  }
}

// 配置方法2
// ✅ 使用 eslint-plugin-prettier 的配置
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    //  这个包含了两个功能：
    //  1. 启用 prettier 插件
    // 2. 关闭冲突规则
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  rules: {
    // 把 Prettier 错误当作 ESLint 错误
    'prettier/prettier': 'error',  
    'no-unused-vars': 'error'
  }
}

// 配置方法3
// 🏆 推荐配置（两个都用）
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    // 这个已经包含了 config 的功能
    'plugin:prettier/recommended'  
  ]
} 
```


### 🛠️ 完整安装配置指南


```js
// 1 安装依赖
pnpm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier


// 2 配置文件设置 .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  env: {
    node: true,
    es2021: true
  }
}

// 3 .prettierrc配置
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}


// 4 添加 NPM 脚本
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write ."
  }
}
```

### 💡 深入理解 plugin:prettier/recommended

plugin:prettier/recommended 这个配置
  - 实际上是 eslint-plugin-prettier 包内部定义的一个预设配置


1. 内部实现

```js
// plugin:prettier/recommended 的魔法
module.exports = {
  extends: [
    //  启用 prettier 插件的功能
    'plugin:prettier/base',
    // 来自 eslint-config-prettier：
    //   关闭与 prettier 冲突的 eslint 规则
    'prettier'
  ],
  // 来自 eslint-plugin-prettier：
  //   把 Prettier 接入到 ESLint 中
  //   让 ESLint 能够理解和运行 Prettier 的规则
  //   就像安装一个翻译器，让 ESLint 能听懂 Prettier
  plugins: ['prettier'],

  // 把 Prettier 的提示变成 ESLint 的错误
  // 就像把 Prettier 说的"建议"变成了"必须遵守的规则"
  rules: {
    'prettier/prettier': 'error'
  }
}
```

2. 为什么需要两个包？
  - 依赖关系: "eslint-plugin-prettier 依赖 eslint-config-prettier"
  - 功能互补: "一个处理冲突，一个添加功能"

```json
{
  "name": "eslint-plugin-prettier",
  "peerDependencies": {
    "eslint-config-prettier": ">=8.0.0"
  }
}
```