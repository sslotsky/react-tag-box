'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Autocomplete = require('./Autocomplete');

var _Autocomplete2 = _interopRequireDefault(_Autocomplete);

var _driver = require('./driver');

var _driver2 = _interopRequireDefault(_driver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tag = _react.PropTypes.shape({
  value: _react.PropTypes.any.isRequired,
  label: _react.PropTypes.string.isRequired
});

var TagBox = function (_Component) {
  _inherits(TagBox, _Component);

  function TagBox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TagBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TagBox.__proto__ || Object.getPrototypeOf(TagBox)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      tag: '',
      considering: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TagBox, [{
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
      if (!tag) {
        return;
      }

      this.props.onSelect(tag);
      this.setState({ tag: '' });
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
        var action = (0, _driver2.default)(e, {
          create: function create() {
            return _this3.createTag();
          },
          next: function next() {
            return _this3.autocomplete.considerNext();
          },
          prev: function prev() {
            return _this3.autocomplete.considerPrevious();
          },
          select: function select(tag) {
            return _this3.select(tag);
          },
          clear: function clear() {
            return _this3.setState({ tag: '', considering: null });
          },
          considering: _this3.state.considering
        });

        if (action) {
          action();
        }
      };
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
          tags = _props.tags,
          selected = _props.selected,
          removeTag = _props.removeTag;

      var pills = selected.map(function (t) {
        return _react2.default.createElement(
          'li',
          { key: t.value },
          _react2.default.createElement(
            'span',
            { className: 'pill-text' },
            t.label
          ),
          _react2.default.createElement(
            'button',
            { className: 'remove', onClick: function onClick() {
                return removeTag(t);
              } },
            'x'
          )
        );
      });

      return _react2.default.createElement(
        'div',
        { className: 'tag-box' },
        _react2.default.createElement(
          'ul',
          { className: 'pills' },
          pills
        ),
        _react2.default.createElement('input', {
          value: tag,
          onChange: this.tagUpdater(),
          onKeyDown: this.keyHandler(),
          onBlur: function onBlur() {
            return _this4.blurTag();
          }
        }),
        _react2.default.createElement(_Autocomplete2.default, {
          ref: function ref(node) {
            _this4.autocomplete = node;
          },
          input: tag,
          tags: tags,
          select: function select() {
            return _this4.select();
          },
          considering: considering,
          consider: consider
        })
      );
    }
  }]);

  return TagBox;
}(_react.Component);

TagBox.propTypes = {
  tags: _react.PropTypes.arrayOf(Tag),
  selected: _react.PropTypes.arrayOf(Tag),
  onSelect: _react.PropTypes.func.isRequired,
  removeTag: _react.PropTypes.func.isRequired
};
exports.default = TagBox;