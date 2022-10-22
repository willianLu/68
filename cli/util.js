const path = require("path");

// 以项目根目录查找文件路径
function resolve(dir = "./") {
  return path.resolve(__dirname, "..", dir);
}

/**
 * @description buffer转换成字符串
 * @param {object} buffer buffer流数据
 * @returns {boolean | string}
 */
function bufferToString(buffer) {
  const hasToString = buffer && typeof buffer.toString === "function";
  return hasToString ? buffer.toString() : "";
}

/**
 * @description 判断数据是否已定义，非undefined，非null
 * @param {any} data
 * @returns {Boolean}
 */
function isDef(data) {
  return data !== undefined && data !== null;
}

/**
 * @description 判断数据类型的是否相同
 * @param {any} data
 * @param {String} type 数据类型
 * @returns {Boolean}
 */
function judgeDataType(data, type) {
  return (
    Object.prototype.toString.call(data).toLowerCase() ===
    `[object ${type}]`.toLowerCase()
  );
}

/**
 * @description 对象类型判断
 * @param {any} data
 * @returns {Boolean}
 */
function isObject(data) {
  return judgeDataType(data, "object");
}

/**
 * @description 数组类型判断
 * @param {any} data
 * @returns {Boolean}
 */
function isArray(data) {
  return judgeDataType(data, "array");
}

/**
 * @description 字符串类型判断
 * @param {any} data
 * @returns {Boolean}
 */
function isString(data) {
  return judgeDataType(data, "string");
}

module.exports = {
  resolve,
  bufferToString,
  isDef,
  isString,
  isArray,
  isObject,
};
