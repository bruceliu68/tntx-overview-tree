"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NODE_TYPE_MAP = exports.NODE_TYPE_LIST = exports.ROOT_HEIGHT = exports.ROOT_WIDTH = exports.COMPONENT_MARGIN = exports.COMPONENT_SPACE_HORIZONTAL = exports.COMPONENT_SPACE_VERTICAL = exports.COMPONENT_HEIGHT = exports.RELATION_WIDTH = void 0;
var RELATION_WIDTH = 120;
exports.RELATION_WIDTH = RELATION_WIDTH;
var COMPONENT_HEIGHT = 40;
exports.COMPONENT_HEIGHT = COMPONENT_HEIGHT;
var COMPONENT_SPACE_VERTICAL = 20;
exports.COMPONENT_SPACE_VERTICAL = COMPONENT_SPACE_VERTICAL;
var COMPONENT_SPACE_HORIZONTAL = 50;
exports.COMPONENT_SPACE_HORIZONTAL = COMPONENT_SPACE_HORIZONTAL;
var COMPONENT_MARGIN = 10;
exports.COMPONENT_MARGIN = COMPONENT_MARGIN;
var ROOT_WIDTH = 130;
exports.ROOT_WIDTH = ROOT_WIDTH;
var ROOT_HEIGHT = 58;
exports.ROOT_HEIGHT = ROOT_HEIGHT;
var NODE_TYPE_LIST = [{
  name: "决策流",
  value: 1
}, {
  name: "策略集",
  value: 2
}, {
  name: "决策工具",
  value: 3
}, {
  name: "三方服务",
  value: 4
}, {
  name: "模型",
  value: 5
}, {
  name: "冠军挑战者",
  value: 6
}, {
  name: "计算公式",
  value: 7
}, {
  name: "规则",
  value: 8
}, {
  name: "指标",
  value: 9
}, {
  name: "字段",
  value: 10
}];
exports.NODE_TYPE_LIST = NODE_TYPE_LIST;
var NODE_TYPE_MAP = {
  1: {
    name: "决策流",
    color: "#0FB8FE",
    img: require("./img/1.svg")
  },
  2: {
    name: "策略集",
    color: "#628FE4",
    img: require("./img/2.svg")
  },
  3: {
    name: "决策工具",
    color: "#CF6767",
    img: require("./img/3.svg")
  },
  4: {
    name: "三方服务",
    color: "#CFAB67",
    img: require("./img/4.svg")
  },
  5: {
    name: "模型",
    color: "#4DA9C9",
    img: require("./img/5.svg")
  },
  6: {
    name: "冠军挑战者",
    color: "#9367C6",
    img: require("./img/6.svg")
  },
  7: {
    name: "计算公式",
    color: "#D97B4E",
    img: require("./img/7.svg")
  },
  8: {
    name: "规则",
    color: "#E8A530",
    img: require("./img/8.svg")
  },
  9: {
    name: "指标",
    color: "#2B82EC",
    img: require("./img/9.svg")
  },
  10: {
    name: "字段",
    color: "#6776CF",
    img: require("./img/10.svg")
  }
};
exports.NODE_TYPE_MAP = NODE_TYPE_MAP;