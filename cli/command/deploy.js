const simpleGit = require("simple-git");
const log = require("../log");
const config = require("../config");
const { resolve, getDeployDate } = require("../util");
const execa = require("../execa");
const { getCurrentBranch, getGitStatus, syncGitRepository } = require("../git");

// 获取git操作实例
const git = simpleGit(resolve("./docs/.vitepress/dist"));

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
  if (res.code !== 0) {
    return log.error("博客构建失败!");
  }
  log.success("博客构建成功!");
  // 对打包完成的博客进行部署
  await execDeploy().catch(() => {
    log.error(`博客部署操作失败`);
  });
  log.success(`博客部署操作成功`);
};
