'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _TagManager = require('./TagManager');

var _TagManager2 = _interopRequireDefault(_TagManager);

var _driver = require('./driver');

var _driver2 = _interopRequireDefault(_driver);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _Autocomplete = require('./Autocomplete');

var _Autocomplete2 = _interopRequireDefault(_Autocomplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TagBoxContainer = function (_Component) {
  _inherits(TagBoxContainer, _Component);

  function TagBoxContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TagBoxContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TagBoxContainer.__proto__ || Object.getPrototypeOf(TagBoxContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      tag: '',
      considering: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TagBoxContainer, [{
    key: 'tagUpdater',
    value: function tagUpdater() {
      var _this2 = this;

      return function (e) {
        _this2.setState({ tag: e.target.value });
      };
    }
  }, {
    key: 'select',
    value: function select(tag) {
      var selected = this.props.selected;

      if (!tag || selected.map(function (t) {
        return t.label;
      }).includes(tag.label)) {
        return;
      }

      var status = this.props.onSelect(tag);
      if (status !== _constants2.default) {
        this.setState({ tag: '' });
      }
    }
  }, {
    key: 'blurTag',
    value: function blurTag() {
      var _state = this.state,
          tag = _state.tag,
          considering = _state.considering;


      if (considering) {
        this.select(considering);
      } else if (tag) {
        this.select({ label: tag });
      }
    }
  }, {
    key: 'createTag',
    value: function createTag() {
      var tag = this.state.tag;

      if (tag) {
        this.select({ label: tag });
      }
    }
  }, {
    key: 'keyHandler',
    value: function keyHandler() {
      var _this3 = this;

      return function (e) {
        var tagManager = new _TagManager2.default(e, _this3);
        var action = (0, _driver2.default)(e.which, tagManager);

        if (action) {
          action();
        }
      };
    }
  }, {
    key: 'tags',
    value: function tags() {
      throw new Error('Component must implement the tags() method');
    }
  }, {
    key: 'loading',
    value: function loading() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var consider = function consider(option) {
        _this4.setState({ considering: option });
      };

      var _state2 = this.state,
          tag = _state2.tag,
          considering = _state2.considering;
      var _props = this.props,
          selected = _props.selected,
          removeTag = _props.removeTag,
          placeholder = _props.placeholder,
          renderTag = _props.renderTag,
          _search = _props.search,
          _exactMatch = _props.exactMatch;

      var pills = selected.map(function (t) {
        return _react2.default.createElement(_Tag2.default, { tag: t, key: t.value, removeTag: removeTag, render: renderTag });
      });

      return _react2.default.createElement(
        'div',
        { className: 'tag-box', onClick: function onClick() {
            return _this4.input.focus();
          } },
        _react2.default.createElement(
          'ul',
          { className: 'tag-box-pills' },
          pills
        ),
        _react2.default.createElement('input', {
          ref: function ref(node) {
            _this4.input = node;
          },
          value: tag,
          onChange: this.tagUpdater(),
          onKeyDown: this.keyHandler(),
          onBlur: function onBlur() {
            return _this4.blurTag();
          },
          placeholder: placeholder
        }),
        _react2.default.createElement(_Autocomplete2.default, _extends({}, this.props, {
          ref: function ref(node) {
            _this4.autocomplete = node;
          },
          input: tag,
          loading: this.loading(),
          tags: this.tags(),
          select: function select(t) {
            return _this4.select(t);
          },
          create: function create() {
            return _this4.createTag();
          },
          search: function search(t, input) {
            return _search(t, input);
          },
          exactMatch: function exactMatch(t, input) {
            return _exactMatch(t, input);
          },
          considering: considering,
          consider: consider
        }))
      );
    }
  }]);

  return TagBoxContainer;
}(_react.Component);

TagBoxContainer.propTypes = {
  selected: _propTypes2.default.arrayOf(_utils2.default),
  onSelect: _propTypes2.default.func.isRequired,
  renderNewOption: _propTypes2.default.func,
  removeTag: _propTypes2.default.func.isRequired,
  renderTag: _propTypes2.default.func,
  loadingText: _propTypes2.default.string,
  selectedText: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  search: _propTypes2.default.func,
  exactMatch: _propTypes2.default.func
};
TagBoxContainer.defaultProps = {
  renderNewOption: function renderNewOption(input) {
    return 'Add ' + input + '...';
  },
  loadingText: 'Loading...',
  selectedText: 'Already Selected',
  placeHolder: '',
  search: function search(tag, input) {
    return tag.label.includes(input);
  },
  exactMatch: function exactMatch(tag, input) {
    return tag.label === input;
  }
};
exports.default = TagBoxContainer;