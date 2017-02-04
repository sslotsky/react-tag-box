"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cache;
function cache() {
  var map = {};

  var get = function get(query) {
    return map[query];
  };

  var add = function add(input, tags) {
    map[input] = tags;
    return tags;
  };

  var clear = function clear() {
    map = {};
  };

  return { get: get, add: add, clear: clear };
}