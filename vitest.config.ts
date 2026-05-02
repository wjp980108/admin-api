import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // 启用全局 API（describe、it、expect 等），无需在每个测试文件中手动 import
    globals: true,

    // 测试运行环境，可选值：node | jsdom | happy-dom
    // node：适合后端 / API 测试；jsdom：适合需要模拟浏览器 DOM 的前端测试
    environment: 'node',

    // 测试前执行的全局初始化文件，按数组顺序依次运行
    // 常用于：启动测试数据库连接、初始化全局变量、配置 mock 等
    setupFiles: ['tests/setup.ts'],
  },

  resolve: {
    // 路径别名，与 tsconfig.json 中的 paths 保持一致
    // 使 import '@/xxx' 等价于 import 'src/xxx'，避免深层相对路径
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
