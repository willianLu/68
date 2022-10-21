#!/usr/bin/env sh

# 忽略错误
set -e

# 安装npm包
npm install
# 构建
npm run build

# 进入待发布的目录
cd docs/.vitepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git config --global user.email "1013658157@qq.com"
git config --global user.name "kunkun.lu"

git init
git add -A
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:willianLu/68.git master:gh-pages

cd -