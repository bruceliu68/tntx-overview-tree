"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("./index.less");

var _react = require("react");

var _d3Hierarchy = require("d3-hierarchy");

var _constants = require("./constants");

var _Link = _interopRequireDefault(require("./Link"));

var _utils = require("./utils");

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = function _default(props) {
  var _props$value = props.value,
      value = _props$value === void 0 ? {} : _props$value,
      _props$secondFloor = props.secondFloor,
      secondFloor = _props$secondFloor === void 0 ? [] : _props$secondFloor,
      getChild = props.getChild,
      onChange = props.onChange,
      onClick = props.onClick,
      nodeTypeMap = props.nodeTypeMap,
      _props$noPlus = props.noPlus,
      noPlus = _props$noPlus === void 0 ? 10 : _props$noPlus;

  var _useState = (0, _react.useState)({}),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      historyMap = _useState2[0],
      setHistoryMap = _useState2[1];

  var typeMap = nodeTypeMap || _constants.NODE_TYPE_MAP; // 缓存操作

  var setCache = function setCache(k, value) {
    var obj = {};
    obj[k] = value;
    setHistoryMap(_objectSpread({}, historyMap, {}, obj));
  };

  var getCache = function getCache(k) {
    return historyMap[k] || null;
  }; // 收起


  var packUp = function packUp(data) {
    // console.log(data);
    var valueTemp = _objectSpread({}, value);

    var path = data.path.slice(0, data.path.length - 1);
    var currentNode = (0, _lodash.get)(valueTemp, path);
    setCache(path, currentNode.children);
    delete currentNode.children;
    onChange && onChange(valueTemp);
  }; // 展开


  var openUp = function openUp(data) {
    var path = data.path;
    var val = getCache(path);

    if (val) {
      var _valueTemp = _objectSpread({}, value);

      var currentNode = (0, _lodash.get)(_valueTemp, path);
      currentNode.children = val;
      onChange && onChange(_valueTemp);
    } else if (data.nodeRoot) {
      var _obj$children;

      var _valueTemp2 = _objectSpread({}, value);

      var _currentNode = (0, _lodash.get)(_valueTemp2, path);

      var obj = secondFloor.find(function (k) {
        return k.id === data.id;
      });

      if (obj && (obj === null || obj === void 0 ? void 0 : (_obj$children = obj.children) === null || _obj$children === void 0 ? void 0 : _obj$children.length) > 0) {
        _currentNode.children = obj.children;
        setCache(path, _currentNode.children);
      } else {
        _currentNode.noChild = true;
      }

      onChange && onChange(_valueTemp2);
    } else {
      getChild(data);
    }
  }; // dom 渲染


  var createFields = function createFields(nodes) {
    var result = [];
    nodes.forEach(function (node, nindex) {
      var data = node.data,
          x = node.x,
          y = node.y,
          parent = node.parent;

      var _ref = data || {},
          type = _ref.type,
          index = _ref.index,
          parentPath = _ref.parentPath,
          key = _ref.key,
          color = _ref.color,
          nodeRoot = _ref.nodeRoot; // 根节点


      if (!parent) {
        var style = {
          width: _constants.ROOT_WIDTH,
          minWidth: _constants.RELATION_WIDTH,
          position: "absolute",
          left: y - (_constants.ROOT_WIDTH - _constants.RELATION_WIDTH),
          top: x + _constants.COMPONENT_MARGIN / 2 - 12
        };
        result.push(React.createElement("div", {
          key: getHierarchyId(key, "root"),
          style: style,
          className: "root",
          title: value === null || value === void 0 ? void 0 : value.name
        }, React.createElement("span", {
          className: "text-ellipsis2"
        }, value === null || value === void 0 ? void 0 : value.name)));
      } else {
        var ele = null;
        var className = "";
        var top = x + _constants.COMPONENT_MARGIN / 2;

        if ((parentPath === null || parentPath === void 0 ? void 0 : parentPath.length) === 1) {
          className = "node";
        } else {
          className = "child-node";
          top = top - 9;
        }

        var _style = {
          left: y,
          top: top,
          position: "absolute",
          cursor: className === "child-node" && onClick ? "pointer" : "initial"
        };

        if (color && !nodeRoot) {
          _style.borderColor = color;
        }

        if (type === "relation") {
          var _data$name;

          var str = (0, _utils.reBytesStr)(data.name, 12);

          if (str.length < (data === null || data === void 0 ? void 0 : (_data$name = data.name) === null || _data$name === void 0 ? void 0 : _data$name.length)) {
            str += "...";
          }

          ele = React.createElement("div", {
            className: "".concat(className, " relation-node"),
            style: _style,
            key: getHierarchyId(key, "relation")
          }, (parentPath === null || parentPath === void 0 ? void 0 : parentPath.length) === 1 ? React.createElement(React.Fragment, null, React.createElement("img", {
            className: "img1",
            src: typeMap[data.nodeType].img
          }), React.createElement("span", {
            className: "s1",
            title: data.name
          }, data.name)) : React.createElement(React.Fragment, null, React.createElement("img", {
            className: "img1",
            src: typeMap[data.nodeType].img
          }), React.createElement("span", {
            className: "s2",
            title: data.name,
            onClick: function onClick() {
              return itemClick(data);
            }
          }, str)), React.createElement("span", {
            className: "u-minus",
            onClick: function onClick() {
              packUp(data);
            }
          }, "-"));
        } else if (type === "leaf") {
          ele = React.createElement("div", {
            className: className,
            style: _style,
            key: getHierarchyId(key, "relation")
          }, (parentPath === null || parentPath === void 0 ? void 0 : parentPath.length) === 1 ? React.createElement(React.Fragment, null, React.createElement("img", {
            className: "img1",
            src: typeMap[data.nodeType].img
          }), React.createElement("span", {
            className: "s1",
            title: data.name
          }, data.name)) : React.createElement(React.Fragment, null, React.createElement("img", {
            className: "img1",
            src: typeMap[data.nodeType].img
          }), React.createElement("span", {
            className: "s2",
            title: data.name,
            onClick: function onClick() {
              return itemClick(data);
            }
          }, data.name)), !(data !== null && data !== void 0 && data.noChild) && ((data === null || data === void 0 ? void 0 : data.nodeType) !== noPlus || (data === null || data === void 0 ? void 0 : data.nodeRoot)) && React.createElement("span", {
            className: "u-plus",
            onClick: function onClick() {
              openUp(data);
            }
          }, "+"));
        }

        result.push(ele);
      }
    });
    return result;
  }; // 点击节点事件


  var itemClick = function itemClick(data) {
    if (onClick) {
      onClick(data);
    }
  }; // key的默认值


  var keyDefault = (0, _react.useRef)(0); // 获取id

  var getHierarchyId = function getHierarchyId() {
    for (var _len = arguments.length, ids = new Array(_len), _key = 0; _key < _len; _key++) {
      ids[_key] = _key < 0 || arguments.length <= _key ? undefined : arguments[_key];
    }

    return ids.join(".");
  }; // 设置唯一性


  var getUniqKey = function getUniqKey(key, keyMap) {
    if (key in keyMap) {
      var k = key + 1;
      return getUniqKey(k, keyMap);
    }

    return key;
  }; // 设置key


  var setKey = function setKey(data, keyMap) {
    var createKey = function createKey(v) {
      if (!(v && v.key)) {
        v.key = getUniqKey(keyDefault.current, keyMap);
      }

      keyMap[v.key] = 1;

      if (v && v.children && v.children.length) {
        setKey(v.children, keyMap);
      }
    };

    if (Array.isArray(data)) {
      data.forEach(function (v, i) {
        v.index = i;
        createKey(v);
      });
    } else {
      if (data) {
        data.index = 0;
        createKey(data);
      }
    }
  }; // 格式化节点树


  var addDropAreaAndOperation = function addDropAreaAndOperation(children, parentPath, level) {
    var parentColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

    if (!children) {
      children = [];
    }

    var result = [];

    if (children.length) {
      children.forEach(function (child, index) {
        var _child$children;

        var path = [].concat(parentPath, [index]);

        var _ref2 = child || {},
            key = _ref2.key;

        var color = parentColor;

        if (child.nodeRoot && (child === null || child === void 0 ? void 0 : (_child$children = child.children) === null || _child$children === void 0 ? void 0 : _child$children.length) > 0) {
          color = typeMap[child.nodeType].color;
        }

        var node = Object.assign({}, child, {
          type: "leaf",
          key: key,
          index: index,
          parentPath: parentPath,
          path: path,
          color: color
        });

        if (child.children) {
          node.type = "relation";
          node.children = addDropAreaAndOperation(child.children, path.concat(["children"]), level + 1, color);
          path.push("relation");
        }

        result.push(node);
      });
    }

    return result;
  }; // 计算坐标定位


  var buildNodes = function buildNodes(root) {
    var leafCount = 0,
        height = 0;
    var nodes = root.eachAfter(function (d) {
      d.y = d.depth * (_constants.RELATION_WIDTH + _constants.COMPONENT_SPACE_HORIZONTAL) + 30;

      if (d.data.type !== "relation") {
        d.x = leafCount * (_constants.COMPONENT_HEIGHT + _constants.COMPONENT_SPACE_VERTICAL);
        leafCount += 1;
      } else {
        d.x = d.children && d.children.length ? (d.children[0].x + d.children[d.children.length - 1].x) / 2 : 0;

        if (!d.parent && d.children) {
          height = d.children[d.children.length - 1].x + _constants.COMPONENT_HEIGHT;
        }
      }
    });
    return {
      nodes: nodes,
      height: height
    };
  }; // 设置key


  var valueTemp = JSON.parse(JSON.stringify(value));
  var finalValue = Object.assign({
    type: "relation",
    path: ["relation"]
  }, setKey(valueTemp, {}));
  finalValue.children = addDropAreaAndOperation(valueTemp.children, ["children"]);
  var hierarchyData = (0, _d3Hierarchy.hierarchy)(finalValue);

  var _buildNodes = buildNodes(hierarchyData),
      nodes = _buildNodes.nodes,
      height = _buildNodes.height;

  var flattenNodes = nodes.descendants();
  var flattenLinks = nodes.links();
  return React.createElement("div", {
    className: "lb-overview"
  }, React.createElement("div", {
    className: "lb-rule-tree-content",
    style: {
      position: "relative",
      height: height + 200 + "px",
      width: (hierarchyData === null || hierarchyData === void 0 ? void 0 : hierarchyData.height) * 160 + 300 + "px"
    }
  }, createFields(flattenNodes), flattenLinks.map(function (link, linkIndex) {
    var _source$data;

    var source = link.source,
        target = link.target;
    var sourceKey = source.data.key;
    var targetKey = target.data.key;
    var x;

    if (!source.parent) {
      x = source.y + _constants.RELATION_WIDTH;
    } else {
      x = source.y + _constants.RELATION_WIDTH;
    }

    ;
    return React.createElement("div", {
      key: getHierarchyId(sourceKey, targetKey),
      "data-key": getHierarchyId(sourceKey, targetKey)
    }, React.createElement(_Link["default"], {
      root: !source.parent,
      color: source === null || source === void 0 ? void 0 : (_source$data = source.data) === null || _source$data === void 0 ? void 0 : _source$data.color,
      source: {
        x: x,
        y: source.x
      },
      target: {
        x: target.y,
        y: target.x
      }
    }));
  })));
};

exports["default"] = _default;