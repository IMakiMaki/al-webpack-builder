const merge = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const csssnano = require('cssnano');

const baseConfig = require('./webpack.base');

const { entry, htmlWebpackExternalsPlugins } = require('./utils').setMPA('server');

const ssrConfig = {
  entry,
  mode: 'production',
  module: {
    rules: [
      {
        test: /.(css|less|scss)$/,
        use: 'ignore-loader',
      },
    ],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name]-server.js',
    libraryTarget: 'umd',
  },
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: csssnano,
    }),
    ...htmlWebpackExternalsPlugins, // 用来抽出指定在externals.config.js中的库到 /dist/vendor
  ],
};

module.exports = merge(baseConfig, ssrConfig);
