'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
      var tags = nextProps.tags,
          input = nextProps.input,
          consider = nextProps.consider;


      if (this.props.input && !input) {
        consider(null);
      }

      var noChange = input === this.props.input && tags === this.props.tags;
      if (!input || noChange) {
        return;
      }

      var matches = tags.filter(function (t) {
        return t.label.includes(input);
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
          input = _props.input;

      var matches = tags.filter(function (t) {
        return t.label.includes(input);
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
          loading = _props4.loading;


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
              'Loading...'
            )
          )
        );
      }

      if (!input) {
        return false;
      }

      var _matchingOptions3 = this.matchingOptions(),
          matches = _matchingOptions3.matches;

      var exactMatch = matches.find(function (t) {
        return t.label === input;
      });
      var addNewOption = !exactMatch && _react2.default.createElement(
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
        addNewOption,
        matching
      );
    }
  }]);

  return _class;
}(_react.Component);

_class.propTypes = {
  input: _react.PropTypes.string,
  tags: _react.PropTypes.arrayOf(_utils2.default).isRequired,
  select: _react.PropTypes.func.isRequired,
  create: _react.PropTypes.func.isRequired,
  considering: _utils2.default,
  consider: _react.PropTypes.func.isRequired,
  renderNewOption: _react.PropTypes.func.isRequired,
  loading: _react.PropTypes.bool
};
exports.default = _class;