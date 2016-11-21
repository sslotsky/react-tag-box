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

function drive(which, tagManager) {
  var _eventMap;

  var execute = function execute(action) {
    return function () {
      return action.apply(tagManager);
    };
  };

  var eventMap = (_eventMap = {}, _defineProperty(_eventMap, ENTER, execute(tagManager.create)), _defineProperty(_eventMap, RIGHT, execute(tagManager.next)), _defineProperty(_eventMap, DOWN, execute(tagManager.next)), _defineProperty(_eventMap, UP, execute(tagManager.prev)), _defineProperty(_eventMap, LEFT, execute(tagManager.prev)), _defineProperty(_eventMap, TAB, execute(tagManager.select)), _defineProperty(_eventMap, ESC, execute(tagManager.clear)), _defineProperty(_eventMap, BKSPC, execute(tagManager.deleteLast)), _eventMap);

  return eventMap[which];
}