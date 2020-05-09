/* eslint-disable no-undef */
const globAll = require('glob-all');

describe('Checking generated html files', () => {
  it('Html files should be generated', (done) => {
    const files = globAll.sync(['./dist/index.html', './dist/search.html', './dist/test.html']);

    if (files.length > 0) {
      done();
    } else {
      throw new Error('No html files generated');
    }
  });
});
