const merge = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');

const baseConfig = require('./webpack.base');

const devConfig = {
  plugins: [new HotModuleReplacementPlugin()],
  devServer: {
    contentBase: '../dist',
    open: false,
    hot: true,
    stats: 'errors-only',
  },
  devtool: 'cheap-source-map',
};

module.exports = merge(baseConfig, devConfig);
