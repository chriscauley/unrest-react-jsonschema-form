"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactJsonschemaForm = _interopRequireDefault(require("react-jsonschema-form"));

var _classnames = _interopRequireDefault(require("classnames"));

var _css = _interopRequireDefault(require("@unrest/css"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var noop = function noop(formData) {
  return formData;
};

var uiSchema = {
  password: {
    'ui:widget': 'password'
  },
  src: {
    'ui:widget': 'file'
  }
};

var extractUiSchema = function extractUiSchema(schema) {
  var uiSchema = {};
  Object.entries(schema.properties).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    var __widget = value.__widget;

    if (__widget === 'HiddenInput') {
      uiSchema[key] = {
        'ui:widget': 'hidden'
      };
    }

    if (__widget === 'PasswordInput') {
      uiSchema[key] = {
        'ui:widget': 'password'
      };
    }
  });
  return uiSchema;
};

var Form = /*#__PURE__*/function (_React$Component) {
  _inherits(Form, _React$Component);

  var _super = _createSuper(Form);

  function Form() {
    var _this;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (_ref3) {
      var formData = _ref3.formData;

      if (_this.isLoading()) {
        return;
      }

      var _this$props = _this.props,
          _this$props$prepData = _this$props.prepData,
          prepData = _this$props$prepData === void 0 ? noop : _this$props$prepData,
          _this$props$onSubmit = _this$props.onSubmit,
          onSubmit = _this$props$onSubmit === void 0 ? noop : _this$props$onSubmit,
          _this$props$onSuccess = _this$props.onSuccess,
          onSuccess = _this$props$onSuccess === void 0 ? noop : _this$props$onSuccess;

      _this.catchError(function () {
        prepData(formData); // mutates formData or throws error

        _this.setState({
          loading: true,
          error: undefined,
          errors: undefined
        });

        Promise.resolve(onSubmit(formData))["catch"](function (error) {
          return {
            error: error
          };
        }).then(function () {
          var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var error = data.error,
              errors = data.errors;

          var extraErrors = _config["default"].processServerErrors(errors);

          _this.setState({
            loading: false,
            error: error,
            extraErrors: extraErrors
          });

          if (error || extraErrors) {
            console.error(error, extraErrors);
          } else {
            return onSuccess(data);
          }
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "catchError", function (func) {
      try {
        func();
      } catch (error) {
        _this.setState({
          error: error,
          loading: false
        });

        console.error(error);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isValid", function () {
      if (_this.props.error) {
        return false;
      }

      var required = _this.props.schema.required || [];

      var formData = _this.getFormData();

      var isEmpty = function isEmpty(value) {
        return !(value || value === 0);
      };

      return !required.find(function (fieldName) {
        return isEmpty(formData[fieldName]);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "isLoading", function () {
      return _this.state.loading || _this.props.loading;
    });

    _defineProperty(_assertThisInitialized(_this), "getFormData", function () {
      // formData is dictated by props for controlled form or state (via rjsf) for non-controlled form
      return _this.props.formData || _this.state.formData || _this.props.initial || {};
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (_ref4) {
      var formData = _ref4.formData;
      var _this$props$onChange = _this.props.onChange,
          onChange = _this$props$onChange === void 0 ? noop : _this$props$onChange;

      _this.catchError(function () {
        onChange(formData); // mutates formData or throws error

        _this.setState({
          formData: formData
        });
      });
    });

    return _this;
  }

  _createClass(Form, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          after = _this$props2.after,
          cancel = _this$props2.cancel,
          _this$props2$cancelTe = _this$props2.cancelText,
          cancelText = _this$props2$cancelTe === void 0 ? 'Cancel' : _this$props2$cancelTe,
          children = _this$props2.children,
          customButton = _this$props2.customButton,
          className = _this$props2.className,
          schema = _this$props2.schema,
          _this$props2$submitTe = _this$props2.submitText,
          submitText = _this$props2$submitTe === void 0 ? 'Submit' : _this$props2$submitTe,
          success = _this$props2.success,
          title = _this$props2.title;
      var error = this.state.error || this.props.error;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])('rjsf', className, {
          loading: this.isLoading()
        })
      }, title && /*#__PURE__*/_react["default"].createElement("div", {
        className: _css["default"].h2()
      }, title), /*#__PURE__*/_react["default"].createElement(_reactJsonschemaForm["default"], {
        formData: this.getFormData(),
        onSubmit: this.onSubmit,
        onChange: this.onChange,
        schema: schema,
        extraErrors: this.state.extraErrors,
        showErrorList: false,
        uiSchema: _objectSpread({}, uiSchema, {}, extractUiSchema(schema), {}, this.props.uiSchema)
      }, children, error && /*#__PURE__*/_react["default"].createElement("div", {
        className: _css["default"].alert.danger()
      }, error.message || error), success && /*#__PURE__*/_react["default"].createElement("div", {
        className: _css["default"].alert.success()
      }, success), !customButton && /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex justify-end mb-8"
      }, cancel && /*#__PURE__*/_react["default"].createElement("div", {
        className: _css["default"].button.danger(),
        onClick: cancel
      }, cancelText), /*#__PURE__*/_react["default"].createElement("button", {
        className: _css["default"].button({
          disabled: !this.isValid(),
          loading: this.isLoading()
        })
      }, submitText)), after));
    }
  }]);

  return Form;
}(_react["default"].Component);

exports["default"] = Form;