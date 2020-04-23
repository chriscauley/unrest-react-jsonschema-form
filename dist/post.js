"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(url, data) {
  return fetch(url, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: _config["default"].getHeaders()
  }).then(function (response) {
    var contentType = response.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      // all responses from the server should be an ajax
      // this is triggered when the server has hit a 500
      // server can also send back { error } to display a more specific error
      return {
        error: _config["default"].unknown_error
      };
    }

    return response.json()["catch"](function (error) {
      return {
        error: error
      };
    });
  });
};

exports["default"] = _default;