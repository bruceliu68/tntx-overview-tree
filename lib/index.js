"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _lodash = require("lodash");

var _Base = _interopRequireDefault(require("./Base"));

var _constants = require("./Base/constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = function _default(props) {
  var onClick = props.onClick,
      getData = props.getData,
      childData = props.data,
      rootName = props.rootName,
      _props$treeData = props.treeData,
      treeData = _props$treeData === void 0 ? [] : _props$treeData,
      nodeTypeMap = props.nodeTypeMap,
      noPlus = props.noPlus;

  var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      secondFloor = _useState4[0],
      setSecondFloor = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      rootHasRender = _useState6[0],
      setRootHasRender = _useState6[1];

  var _useState7 = (0, _react.useState)(),
      _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
      path = _useState8[0],
      setPath = _useState8[1];

  var typeMap = nodeTypeMap || _constants.NODE_TYPE_MAP;
  (0, _react.useEffect)(function () {
    if (!rootHasRender && (childData === null || childData === void 0 ? void 0 : childData.length) > 0 && (treeData === null || treeData === void 0 ? void 0 : treeData.length) === 0) {
      // 初始数据渲染根节点数据
      var arr = [];
      var initArr = [];
      childData.forEach(function (item, index) {
        var i = arr.findIndex(function (k) {
          return k.nodeType === item.nodeType;
        });

        if (i >= 0) {
          initArr[i].children.push(item);
        } else {
          arr.push({
            id: index,
            value: index,
            name: typeMap[item.nodeType].name,
            version: "",
            nodeType: item.nodeType,
            nodeRoot: true
          });
          initArr.push({
            id: index,
            value: index,
            name: typeMap[item.nodeType].name,
            version: "",
            nodeType: item.nodeType,
            nodeRoot: true,
            children: [item]
          });
        }
      });
      var obj = {
        name: rootName,
        children: arr
      };
      setData(obj);
      setSecondFloor(initArr);
      setRootHasRender(true);
    } else if (rootHasRender && (treeData === null || treeData === void 0 ? void 0 : treeData.length) === 0 && path) {
      // 渲染子节点数据
      var newData = _objectSpread({}, data);

      var currentNode = (0, _lodash.get)(newData, path);

      if (childData.length > 0) {
        currentNode.children = childData;
      } else {
        currentNode.noChild = true;
      }

      setData(newData);
    }
  }, [childData]);
  (0, _react.useEffect)(function () {
    if ((treeData === null || treeData === void 0 ? void 0 : treeData.length) > 0) {
      var arr = [];
      var initArr = [];
      treeData.forEach(function (item, index) {
        var i = arr.findIndex(function (k) {
          return k.nodeType === item.nodeType;
        });

        if (i >= 0) {
          initArr[i].children.push(item);
        } else {
          arr.push({
            id: index,
            value: index,
            name: typeMap[item.nodeType].name,
            version: "",
            nodeType: item.nodeType,
            nodeRoot: true
          });
          initArr.push({
            id: index,
            value: index,
            name: typeMap[item.nodeType].name,
            version: "",
            nodeType: item.nodeType,
            nodeRoot: true,
            children: [item]
          });
        }
      });
      var obj = {
        name: rootName,
        children: arr
      };
      var newInitArr = parseData(initArr);
      setData(obj);
      setSecondFloor(newInitArr);
    }
  }, [treeData]);

  var parseData = function parseData(data) {
    for (var i = 0; i < data.length; i++) {
      var _data$i, _data$i2, _data$i2$children;

      if (!((_data$i = data[i]) !== null && _data$i !== void 0 && _data$i.children) || ((_data$i2 = data[i]) === null || _data$i2 === void 0 ? void 0 : (_data$i2$children = _data$i2.children) === null || _data$i2$children === void 0 ? void 0 : _data$i2$children.length) === 0) {
        data[i].children = undefined;
        data[i].noChild = true;
      } else {
        parseData(data[i].children);
      }
    }

    return data;
  };

  return React.createElement(_Base["default"], {
    noPlus: noPlus,
    nodeTypeMap: nodeTypeMap,
    value: data,
    secondFloor: secondFloor,
    getChild: function getChild(d) {
      if (getData) {
        getData(d);
        setPath(d.path);
      }
    },
    onChange: function onChange(d) {
      setData(_objectSpread({}, d));
    },
    onClick: onClick
  });
};

exports["default"] = _default;