/* eslint-disable */
const path = require('path');
const assert = require('assert');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base.js');
  it('test entry', () => {
    assert.equal(baseConfig.entry.index, path.join(__dirname, '../smoke/template/src/pages/index/index.js'));
    assert.equal(baseConfig.entry.search, path.join(__dirname, '../smoke/template/src/pages/search/index.js'));
  });
});
