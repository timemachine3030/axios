var isURLSameOrigin = require('../../../lib/helpers/isURLSameOrigin');

describe('helpers::isURLSameOrigin', function () {
  it('should detect same origin', function () {
    expect(isURLSameOrigin(window.location.href)).toEqual(true);
  });

  it('should detect different origin', function () {
    expect(isURLSameOrigin('https://github.com/axios/axios')).toEqual(false);
  });
  
  it('should work with relative paths', function () {
    expect(isURLSameOrigin('/local-path')).toEqual(true);
  });
});
