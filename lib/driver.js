"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = drive;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ENTER = 13;
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var TAB = 9;
var ESC = 27;
var BKSPC = 8;

function drive(event, tagManager) {
  var _eventMap;

  var next = function next() {
    event.preventDefault();
    tagManager.next();
  };

  var prev = function prev() {
    if (tagManager.considering) {
      event.preventDefault();
      tagManager.prev();
    }
  };

  var create = function create() {
    event.preventDefault();
    var tag = tagManager.tag,
        tags = tagManager.tags,
        createTag = tagManager.create,
        select = tagManager.select,
        considering = tagManager.considering;

    if (considering) {
      select(considering);
    } else {
      var existingTag = tags.find(function (t) {
        return t.label === tag;
      });
      if (existingTag) {
        select(existingTag);
      } else {
        createTag();
      }
    }
  };

  var select = function select() {
    var considering = tagManager.considering,
        selectTag = tagManager.select,
        tag = tagManager.tag,
        createTag = tagManager.create;


    if (tag) {
      event.preventDefault();

      if (considering) {
        selectTag(considering);
      } else {
        createTag();
      }
    }
  };

  var clear = function clear() {
    event.preventDefault();
    tagManager.clear();
  };

  var deleteLast = function deleteLast() {
    var selected = tagManager.selected,
        tag = tagManager.tag,
        backspaceDelete = tagManager.backspaceDelete,
        remove = tagManager.remove;


    if (tag || !backspaceDelete) {
      return;
    }

    event.preventDefault();
    remove(selected.reverse()[0]);
  };

  var eventMap = (_eventMap = {}, _defineProperty(_eventMap, ENTER, create), _defineProperty(_eventMap, RIGHT, next), _defineProperty(_eventMap, DOWN, next), _defineProperty(_eventMap, UP, prev), _defineProperty(_eventMap, LEFT, prev), _defineProperty(_eventMap, TAB, select), _defineProperty(_eventMap, ESC, clear), _defineProperty(_eventMap, BKSPC, deleteLast), _eventMap);

  return eventMap[event.which];
}