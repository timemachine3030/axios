'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      /**
       * Determine if a URL shares the same origin as the current location
       *
       * @param {String} requestURL The URL to test
       * @returns {boolean} True if URL shares the same origin, otherwise false
       */
      return function isURLSameOrigin(requestURL) {
        var originURL = new URL(window.location.href);
        var parsed = (utils.isString(requestURL))
          ? new URL(requestURL, window.location.href) // pass in the window.location for relative urls.
          : requestURL;
        return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
      };
    })() :

    // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);
