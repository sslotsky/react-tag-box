'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tag;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultRender = function defaultRender(tag, remove) {
  return _react2.default.createElement(
    'li',
    { className: 'tag-box-pill', key: tag.value },
    _react2.default.createElement(
      'span',
      { className: 'tag-box-pill-text' },
      tag.label
    ),
    _react2.default.createElement(
      'button',
      { type: 'button', className: 'remove', onClick: remove },
      '\xD7'
    )
  );
};

function Tag(_ref) {
  var tag = _ref.tag,
      removeTag = _ref.removeTag,
      _ref$render = _ref.render,
      render = _ref$render === undefined ? defaultRender : _ref$render;

  return render(tag, function () {
    return removeTag(tag);
  });
}

Tag.propTypes = {
  tag: _utils2.default.isRequired,
  removeTag: _propTypes2.default.func.isRequired
};