const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const glob = require('glob');
const path = require('path');
const externalsConfig = require('./externals.config');

const projectDir = process.cwd();

module.exports = {
  setMPA(type = '') {
    const suffix = type ? `-${type}` : '';
    const entry = {};
    const htmlWebpackPlugins = [];
    const htmlWebpackExternalsPlugins = [];
    const entryFiles = glob.sync(path.join(projectDir, `/src/pages/*/index${suffix}.js`));
    entryFiles.forEach((entryFile) => {
      const match = entryFile.match(new RegExp(`src/pages/(.*)/index${suffix}.js`));
      const pageName = match && match[1];
      entry[pageName] = entryFile;
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(projectDir, `/src/pages/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: ['vendors', 'commons', pageName],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: type !== 'server', // 服务端渲染需要把注释开启 不然会删掉占位符
          },
        })
      );
      if (externalsConfig.length > 0) {
        htmlWebpackExternalsPlugins.push(
          new HtmlWebpackExternalsPlugin({
            externals: externalsConfig,
            hash: true,
            files: [`${pageName}.html`],
          })
        );
      }
    });

    return {
      entry,
      htmlWebpackPlugins,
      htmlWebpackExternalsPlugins,
    };
  },
};
