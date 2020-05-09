const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlInlineCssWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const path = require('path');

const { entry, htmlWebpackPlugins, htmlWebpackExternalsPlugins } = require('./utils').setMPA(
  'server'
);

const ssrConfig = {
  entry: entry,
  mode: 'production',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name]-server.js',
    libraryTarget: 'umd',
  },
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),
    ...htmlWebpackPlugins,
    ...htmlWebpackExternalsPlugins, // 用来抽出指定在externals.config.js中的库到 /dist/vendor
    new HtmlInlineCssWebpackPlugin(),
  ],
};

module.exports = merge(baseConfig, ssrConfig);
