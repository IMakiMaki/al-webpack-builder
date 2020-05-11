const path = require('path');

process.chdir(path.join(__dirname, 'smoke/template'));

// eslint-disable-next-line no-undef
describe('al-webpack-builder test case', () => {
  // eslint-disable-next-line global-require
  require('./unit/webpack-base-test');
});
