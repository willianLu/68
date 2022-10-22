const execSync = require("child_process").execSync;
const { resolve, bufferToString } = require("./util");

/**
 * @description 执行命令
 * @param {string} command 命令
 * @returns {string}
 */
function execa(command, options = {}) {
  options = {
    cwd: resolve("./"),
    encodeing: "utf-8",
    ...options,
  };
  // 默认code，非0为失败，与node命令执行保持一致
  let code = 1;
  // 返回命令执行信息
  let message = "";
  // 执行命令
  try {
    code = 0;
    message = bufferToString(execSync(command, options));
  } catch (error) {
    code = 1;
    // 命令执行错误
    console.log(error);
  }
  return { code, message };
}

module.exports = execa;
