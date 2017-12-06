'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TagProp = _propTypes2.default.shape({
  value: _propTypes2.default.any.isRequired,
  label: _propTypes2.default.string.isRequired
});

exports.default = TagProp;