const log = require("./log");
const { program } = require("commander");
const { deploy } = require("./command");

log.info("开始执行命令");

// 发布命令封装
program
  .command("deploy")
  .option("-m, --message", "发布博客提交信息")
  .description("个人博客发布")
  .action(deploy);

program.configureOutput({
  // 将错误高亮显示
  outputError: (str) => log.error(str),
});

program.parse(process.argv);
