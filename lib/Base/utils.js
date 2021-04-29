"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStrLength = getStrLength;
exports.reBytesStr = reBytesStr;

/**
 * @desc   获取字符串字符长度(汉字转换)
 * @param {String} str
 * @return {Length}
 */
function getStrLength(str) {
  // 先把中文替换成两个字节的英文，再计算长度
  return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
}

;

function reBytesStr(str, len) {
  if (!str && typeof str !== "undefined") {
    return "";
  }

  var num = 0;
  var str1 = "".concat(str);
  var newStr = "";

  for (var i = 0, lens = str1.length; i < lens; i++) {
    num += str1.charCodeAt(i) > 255 ? 2 : 1;

    if (num > len) {
      break;
    } else {
      newStr = str1.substring(0, i + 1);
    }
  }

  return newStr;
} // 获取单行文本的像素宽度


var getTextPixelWith = function getTextPixelWith(text) {
  var fontStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "normal 14px Robot";
  var canvas = document.createElement("canvas"); // 创建 canvas 画布

  var context = canvas.getContext("2d"); // 获取 canvas 绘图上下文环境

  context.font = fontStyle; // 设置字体样式，使用前设置好对应的 font 样式才能准确获取文字的像素长度

  var dimension = context.measureText(text); // 测量文字

  return dimension.width;
};