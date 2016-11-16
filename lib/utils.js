'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var TagProp = _react.PropTypes.shape({
  value: _react.PropTypes.any.isRequired,
  label: _react.PropTypes.string.isRequired
});

exports.default = TagProp;