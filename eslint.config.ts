import anrfu from '@antfu/eslint-config';

export default anrfu({
  typescript: true,
  node: true,
  rules: {
    'node/prefer-global/process': 'off',
  },
  stylistic: {
    // 结尾使用分号
    semi: true,
  },
});
