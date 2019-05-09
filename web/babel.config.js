module.exports = function(api) {
  api.cache(true);

  const presets = [
    ['@emotion/babel-preset-css-prop', { autoLabel: true, labelFormat: '[local]' }],
    ['@babel/preset-react', { useBuiltIns: true }],
    [
      '@babel/preset-env',
      {
        targets: ['> 1%', 'last 3 versions', 'ie >= 9', 'ios >= 8', 'android >= 4.2'],
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-flow',
  ];
  const plugins = [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ];

  return {
    presets,
    plugins,
  };
};
