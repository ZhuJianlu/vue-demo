"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _jquery = _interopRequireDefault(require("jquery"));

require("./css/index.css");

require("./css/index.less");

require("./css/index.scss");

(0, _jquery["default"])(function () {
  (0, _jquery["default"])('li:odd').css('backgroundColor', 'skyblue');
  (0, _jquery["default"])('li:even').css('backgroundColor', function () {
    return '#' + 'f3f3f3';
  });
});

var Person = function Person() {
  (0, _classCallCheck2["default"])(this, Person);
};

(0, _defineProperty2["default"])(Person, "info", {
  name: 'lonnie',
  age: 24
});