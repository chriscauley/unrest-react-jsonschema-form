"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactJsonschemaForm = _interopRequireDefault(require("react-jsonschema-form"));

var _classnames = _interopRequireDefault(require("classnames"));

var _css = _interopRequireDefault(require("@unrest/css"));

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

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (_ref) {
      var formData = _ref.formData;

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
          error: undefined
        });

        Promise.resolve(onSubmit(formData))["catch"](function (error) {
          return {
            error: error
          };
        }).then(function () {
          var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var error = data.error;

          _this.setState({
            loading: false,
            error: error
          });

          if (!error) {
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

    _defineProperty(_assertThisInitialized(_this), "onChange", function (_ref2) {
      var formData = _ref2.formData;
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
        uiSchema: _objectSpread({}, uiSchema, {}, this.props.uiSchema)
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
