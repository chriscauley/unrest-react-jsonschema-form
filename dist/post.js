"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.afterFetch = exports.handleError = void 0;

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var handleError = function handleError(error) {
  // Analyzes many possible exeptions and return { error: "Something the user can read" }
  if (typeof error === 'string') {
    return {
      error: error
    };
  }

  if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
    return {
      error: 'Unable to connect to server. Please check your internet connection and try again.'
    };
  }

  return {
    error: error.message
  };
};

exports.handleError = handleError;

var afterFetch = function afterFetch(response) {
  var contentType = response.headers.get('content-type');

  if (!contentType || !contentType.includes('application/json')) {
    // all responses from the server should be an ajax
    // this is triggered when the server has hit a 500
    // server can also send back { error } to display a more specific error
    return {
      error: _config["default"].unknown_error
    };
  }

  return response.json()["catch"](handleError);
};

exports.afterFetch = afterFetch;

var _default = function _default(url, data) {
  return fetch(url, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: _config["default"].getHeaders()
  }).then(afterFetch, handleError);
};

exports["default"] = _default;