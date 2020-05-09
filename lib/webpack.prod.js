const merge = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// const HtmlInlineCssWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const cssnano = require('cssnano');

const baseConfig = require('./webpack.base');
const { htmlWebpackExternalsPlugins } = require('./utils').setMPA('');

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    ...htmlWebpackExternalsPlugins, // 用来抽出指定在externals.config.js中的库到 /dist/vendor
    // new HtmlInlineCssWebpackPlugin(),
    // 用来将css内联到html中,
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
        commons: {
          test: /[\\/]src[\\/]common[\\/]/,
          name: 'commons',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
