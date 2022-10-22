const simpleGit = require("simple-git");
const log = require("../log");
const config = require("../config");
const { resolve } = require("../util");
const execa = require("../execa");

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
  const currentBranch = await git
    .revparse(["--abbrev-ref", "HEAD"])
    .catch(() => {});
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

/**
 * @description 获取git 文件状态
 */
function getGitStatus() {
  return git.status(["-s"]).catch(() => {});
}

/**
 * @description 同步git仓库文件
 */
function syncGitRepository() {
  return git
    .pull()
    .push()
    .then(() => true)
    .catch((error) => {
      log.error(error);
      return false;
    });
}

module.exports = async function deploy() {
  if (await getGitStatus()) {
    return log.error("git暂存区存在改动文件未提交，不允许构建部署");
  }
  if (!(await syncGitRepository())) {
    return log.error("远程仓库文件同步失败");
  }
  if (!(await judgeDeployBranchRule())) {
    log.error("分支不满发布规则");
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
