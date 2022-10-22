const simpleGit = require("simple-git");
const log = require("../log");
const config = require("../config");
const { resolve } = require("../util");
const execa = require("../execa");
const { getCurrentBranch, getGitStatus, syncGitRepository } = require("../git");

// 获取git操作实例
const git = simpleGit(resolve("./docs/.vitepress/dist"));

// 当前日期
function getDeployDate() {
  const now = new Date();
  return (
    "" +
    now.getFullYear() +
    ("00" + (now.getMonth() + 1)).slice(-2) +
    ("00" + now.getDate()).slice(-2) +
    ("00" + now.getHours()).slice(-2) +
    ("00" + now.getMinutes()).slice(-2)
  );
}

/**
 * @description 判断是否满足发布分支规则
 */
async function judgeDeployBranchRule() {
  const { deployBranchRules } = config;
  if (!deployBranchRules) return true;
  const currentBranch = getCurrentBranch();
  // 存在当前分支，且规则满足
  log.info("当前分支：", currentBranch);
  log.info("发布可用分支：", deployBranchRules);
  return (
    currentBranch &&
    (deployBranchRules === currentBranch ||
      (Array.isArray(deployBranchRules) &&
        deployBranchRules.includes(currentBranch)))
  );
}

/**
 * @description 执行发布
 */
function execDeploy() {
  const str = getDeployDate();
  return git
    .init()
    .add("./*")
    .commit("deploy: " + str)
    .push(["-f", "git@github.com:willianLu/68.git", "master:gh-pages"]);
}

module.exports = async function deploy() {
  if (!getGitStatus() || !syncGitRepository()) return;
  if (!judgeDeployBranchRule()) {
    return log.error("分支不满发布规则");
  }
  // 构建博客
  const res = execa("vitepress build docs");
  if (res.code === 0) {
    log.success("博客构建成功!");
    // 对打包完成的博客进行部署
    execDeploy()
      .then(() => {
        log.success(`git部署操作成功`);
      })
      .catch(() => {
        log.error(`git部署操作失败`);
      });
  } else {
    log.error("博客构建失败!");
  }
};
