'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TagManager = function () {
  function TagManager(e, tagBox) {
    _classCallCheck(this, TagManager);

    this.event = e;
    this.tagBox = tagBox;
    this.tagBoxData = _extends({}, tagBox.props, tagBox.state);
  }

  _createClass(TagManager, [{
    key: 'execute',
    value: function execute(action) {
      this.event.preventDefault();
      action();
    }
  }, {
    key: 'prev',
    value: function prev() {
      var _this = this;

      if (this.tagBoxData.considering) {
        this.execute(function () {
          return _this.tagBox.autocomplete.considerPrevious();
        });
      }
    }
  }, {
    key: 'next',
    value: function next() {
      var _this2 = this;

      this.execute(function () {
        return _this2.tagBox.autocomplete.considerNext();
      });
    }
  }, {
    key: 'create',
    value: function create() {
      var _this3 = this;

      var _tagBoxData = this.tagBoxData,
          considering = _tagBoxData.considering,
          tags = _tagBoxData.tags,
          tag = _tagBoxData.tag;


      this.execute(function () {
        if (considering) {
          _this3.tagBox.select(considering);
        } else {
          var existingTag = tags.find(function (t) {
            return t.label === tag;
          });
          if (existingTag) {
            _this3.tagBox.select(existingTag);
          } else {
            _this3.tagBox.createTag();
          }
        }
      });
    }
  }, {
    key: 'select',
    value: function select() {
      var _this4 = this;

      var _tagBoxData2 = this.tagBoxData,
          considering = _tagBoxData2.considering,
          tag = _tagBoxData2.tag;


      this.execute(function () {
        if (tag) {
          if (considering) {
            _this4.tagBox.select(considering);
          } else {
            _this4.tagBox.createTag();
          }
        }
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _this5 = this;

      this.execute(function () {
        return _this5.tagBox.setState({ tag: '', considering: null });
      });
    }
  }, {
    key: 'deleteLast',
    value: function deleteLast() {
      var _tagBoxData3 = this.tagBoxData,
          selected = _tagBoxData3.selected,
          tag = _tagBoxData3.tag,
          backspaceDelete = _tagBoxData3.backspaceDelete,
          removeTag = _tagBoxData3.removeTag;


      if (tag || !backspaceDelete) {
        return;
      }

      this.execute(function () {
        removeTag(selected[selected.length - 1]);
      });
    }
  }]);

  return TagManager;
}();

exports.default = TagManager;