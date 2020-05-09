/* eslint-disable no-undef */
const globAll = require('glob-all');

describe('Checking generated css & js files', () => {
  it('Css files should be generated', (done) => {
    const files = globAll.sync(['./dist/index_*.css', './dist/search_*.css', './dist/test_*.css']);
    if (files.length > 0) {
      done();
    } else {
      throw new Error('No css files generated');
    }
  });

  it('Js files should be generated', (done) => {
    const files = globAll.sync(['./dist/index_*.js', './dist/search_*.js', './dist/test_*.js']);
    if (files.length > 0) {
      done();
    } else {
      throw new Error('No js files generated');
    }
  });
});
