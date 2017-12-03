'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Component) {
  _inherits(_class, _Component);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var tags = nextProps.tags,
          input = nextProps.input,
          consider = nextProps.consider,
          selected = nextProps.selected;


      if (this.props.input && !input) {
        consider(null);
      }

      var noChange = input === this.props.input && tags === this.props.tags;
      if (!input || noChange) {
        return;
      }

      var matches = tags.filter(function (t) {
        return _this2.props.search(t, input) && !selected.includes(t);
      });

      if (matches.length) {
        consider(matches[0]);
      } else {
        consider(null);
      }
    }
  }, {
    key: 'matchingOptions',
    value: function matchingOptions() {
      var _props = this.props,
          tags = _props.tags,
          input = _props.input,
          selected = _props.selected,
          search = _props.search;

      var matches = tags.filter(function (t) {
        return search(t, input) && !selected.map(function (s) {
          return s.value;
        }).includes(t.value);
      });
      var values = matches.map(function (t) {
        return t.value;
      });

      return { matches: matches, values: values };
    }
  }, {
    key: 'considerNext',
    value: function considerNext() {
      var _props2 = this.props,
          consider = _props2.consider,
          considering = _props2.considering;

      var _matchingOptions = this.matchingOptions(),
          matches = _matchingOptions.matches,
          values = _matchingOptions.values;

      if (!matches.length) {
        return;
      }

      if (!considering) {
        consider(matches[0]);
      } else {
        var nextIndex = Math.min(matches.length - 1, values.indexOf(considering.value) + 1);
        consider(matches[nextIndex]);
      }
    }
  }, {
    key: 'considerPrevious',
    value: function considerPrevious() {
      var _props3 = this.props,
          consider = _props3.consider,
          considering = _props3.considering;

      var _matchingOptions2 = this.matchingOptions(),
          matches = _matchingOptions2.matches,
          values = _matchingOptions2.values;

      if (!matches.length) {
        return;
      }

      var currentIndex = values.indexOf(considering.value);
      if (currentIndex === 0) {
        consider(null);
      } else {
        consider(matches[currentIndex - 1]);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          input = _props4.input,
          select = _props4.select,
          create = _props4.create,
          considering = _props4.considering,
          consider = _props4.consider,
          renderNewOption = _props4.renderNewOption,
          loadingText = _props4.loadingText,
          selectedText = _props4.selectedText,
          loading = _props4.loading,
          selected = _props4.selected,
          exactMatch = _props4.exactMatch;


      if (loading) {
        return _react2.default.createElement(
          'ul',
          { className: 'autocomplete' },
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'span',
              { className: 'option-text' },
              loadingText
            )
          )
        );
      }

      if (!input) {
        return false;
      }

      var _matchingOptions3 = this.matchingOptions(),
          matches = _matchingOptions3.matches;

      var foundExactMatch = matches.find(function (t) {
        return exactMatch(t, input);
      });
      var alreadySelected = selected.find(function (t) {
        return exactMatch(t, input);
      });

      var addNewOption = !foundExactMatch && _react2.default.createElement(
        'li',
        {
          className: (0, _classnames2.default)('add-new', { considering: !considering }),
          onClick: create,
          onMouseOver: function onMouseOver() {
            return consider(null);
          }
        },
        _react2.default.createElement(
          'span',
          { className: 'option-text' },
          renderNewOption(input)
        )
      );

      var selectedNotice = alreadySelected && _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'span',
          { className: 'option-text' },
          selectedText
        )
      );

      var content = alreadySelected ? selectedNotice : addNewOption;

      var matching = matches.map(function (t) {
        var className = (0, _classnames2.default)({
          considering: considering === t
        });

        return _react2.default.createElement(
          'li',
          {
            key: t.value,
            className: className,
            onClick: function onClick() {
              return select(t);
            },
            onMouseOver: function onMouseOver() {
              return consider(t);
            }
          },
          _react2.default.createElement(
            'span',
            { className: 'option-text' },
            t.label
          )
        );
      });

      return _react2.default.createElement(
        'ul',
        { className: 'autocomplete' },
        content,
        matching
      );
    }
  }]);

  return _class;
}(_react.Component);

_class.propTypes = {
  input: _propTypes2.default.string,
  selected: _propTypes2.default.arrayOf(_utils2.default),
  tags: _propTypes2.default.arrayOf(_utils2.default).isRequired,
  select: _propTypes2.default.func.isRequired,
  create: _propTypes2.default.func.isRequired,
  considering: _utils2.default,
  consider: _propTypes2.default.func.isRequired,
  renderNewOption: _propTypes2.default.func.isRequired,
  loadingText: _propTypes2.default.string,
  selectedText: _propTypes2.default.string,
  loading: _propTypes2.default.bool,
  search: _propTypes2.default.func.isRequired,
  exactMatch: _propTypes2.default.func.isRequired
};
_class.defaultProps = {
  selected: []
};
exports.default = _class;