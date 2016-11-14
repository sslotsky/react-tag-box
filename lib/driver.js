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

function drive(event, tagManager) {
  var _eventMap;

  var next = function next() {
    if (tagManager.considering) {
      event.preventDefault();
      tagManager.next();
    }
  };

  var prev = function prev() {
    if (tagManager.considering) {
      event.preventDefault();
      tagManager.prev();
    }
  };

  var create = function create() {
    event.preventDefault();
    tagManager.create();
  };

  var select = function select() {
    if (tagManager.considering) {
      event.preventDefault();
      tagManager.select(tagManager.considering);
    }
  };

  var clear = function clear() {
    if (tagManager.considering) {
      tagManager.clear();
    }
  };

  var eventMap = (_eventMap = {}, _defineProperty(_eventMap, ENTER, create), _defineProperty(_eventMap, RIGHT, next), _defineProperty(_eventMap, DOWN, next), _defineProperty(_eventMap, UP, prev), _defineProperty(_eventMap, LEFT, prev), _defineProperty(_eventMap, TAB, select), _defineProperty(_eventMap, ESC, clear), _eventMap);

  return eventMap[event.which];
}