"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* istanbul ignore next */
var getCSRF = function getCSRF(cookie) {
  cookie = cookie || document.cookie;
  var match = cookie.match(/csrftoken=([^;]+)/);
  return match && match[1];
};

var config = {
  getHeaders: function getHeaders() {
    return {
      'content-type': 'application/json',
      'X-CSRFToken': config.getCSRF()
    };
  },
  getCSRF: getCSRF,
  unknown_error: 'An unknown error has occurred. Please try again.'
};
var _default = config;
exports["default"] = _default;