const simpleGit = require("simple-git");
const path = require("path");

const git = simpleGit(path.resolve(__dirname, "./docs/.vitepress/dist"));

git
  .init()
  .add("./*")
  .commit("deploy: 部署博客")
  .push(["-f", "git@github.com:willianLu/68.git", "master:gh-pages"])
  .then(() => {
    console.log(`[ success ] git部署操作成功`);
  })
  .catch(() => {
    console.log(`[ error ] git部署操作失败`);
  });
