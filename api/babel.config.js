module.exports = api => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: '3',
          targets: { node: 'current' },
          exclude: [],
        },
      ],
      '@babel/preset-flow',
    ],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };
};
