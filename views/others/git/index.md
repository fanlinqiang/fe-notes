参考：
* [常用 Git 命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
* [Git远程操作详解](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)
* [Git 工作流程](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)

## 简介
GIT是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。
<div><img src="./_statics/images/git-model.png" style="height: 174px"></div>

* Workspace：工作区
* Index / Stage：暂存区
* Repository：仓库区（或本地仓库）
* Remote：远程仓库


### 配置信息
```
#全局用户信息
git config --global user.name [用户名]
git config --global user.email [邮箱]
# 显示当前的Git配置
$ git config --list
# 编辑Git配置文件
$ git config -e [--global]
# 查看全局配置
$ cd ~ && cat .gitconfig
# 查看当前仓库配置
$ cd .git && cat config
```
!> 不建议手动更改config内容

### 创建仓库
```
# 在当前目录新建一个Git代码库
$ git init
# 新建一个目录，将其初始化为Git代码库
$ git init [project-name]
# 下载一个项目和它的整个代码历史，[别名]可省略，默认名与远程仓库相同
$ git clone [url] [别名]
```
### 增加/删除文件
```
# 添加指定文件到暂存区
$ git add [file1] [file2] ...
# 添加指定目录到暂存区，包括子目录
$ git add [dir]
# 添加当前目录的所有文件到暂存区
$ git add .
# 添加每个变化前，都会要求确认
# 对于同一个文件的多处变化，可以实现分次提交
$ git add -p
# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...
# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]
# 改名文件，并且将这个改名放入暂存区
$ git mv [file-original] [file-renamed]
```
### 代码提交
```
# 提交暂存区到仓库区
$ git commit -m [message]
# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]
# 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a
# 提交时显示所有diff信息
$ git commit -v
# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]
# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...
```
### 分支管理
```
#查看本地当前分支
$ git branch
#查看所有分支
$ git branch -a
#查看远程分支
$ git branch -r
#创建新分支 ，建议分支名规范：[项目名]-[日期]-[创建人]-[修改内容]
#如：lagou-20171016-yangpeng-bugfix
$ git branch [分支名]
#切换分支
$ git checkout [分支名]
#创建并切换分支
$ git checkout  -b [分支名]
#取远程分支并分化一个新分支
$ git checkout -b test origin/master
# 合并指定分支到当前分支，一般在master上操作（需要有管理员权限）
#默认使用当前分支与 [branch] 合并,合并指定分支到当前分支
$ git merge [branch]
# 合并其他分支的某个文件到当前分支
$ git merge --patch [branch] [file.name]
$ git merge -p [branch] [file.name]
# 切换到上一个分支
$ git checkout -
# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]
# 例：git branch --set-upstream master origin/master
# 建立当前分支提交关系
$ git branch --set-upstream-to=[remote]/[branch]
# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]
# 删除分支
$ git branch -d [branch-name]
#强制删除分支
$ git branch -D [branch-name]
# 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]
# 重命名分支
$ git branch -m old-name new-name
# 重命名当前分支
$ git branch -m new-name
# 远程重命名分支,在本地重命名分支后，你需要先远程删除该分支，然后再次推送重命名的分支。
$ git push origin :old-name
$ git push origin new-name
# 查找分支,显示包含特定提交的所有分支
$ git branch --contains <commit>
```
### 远程同步
```
# 下载远程仓库的所有变动
$ git fetch [origin]# 显示所有远程仓库
$ git remote -v
# 显示某个远程仓库的信息
$ git remote show [remote]
# 增加一个新的远程仓库，并命名
$ git remote add [shortname] [url]
# 取回远程仓库的变化，并与本地分支合并
$ git pull [remote] [branch]
# 上传本地指定分支到远程仓库 （注：先执行git fetch [origin] ,）
#（注：分支提交前首先先建立联系 git branch --set-upstream [branch] [remote-branch]
# 务必先与master合并 git checkout master ，git pull ，git checkout  [当前分支]， git merge [master] ..）
$ git push [remote] [branch]
# 强行推送当前分支到远程仓库，即使有冲突
$ git push [remote] --force
# 推送所有分支到远程仓库
$ git push [remote] --all
```
### 标签
主要标识某次提交（适用场景如：给项目各个测试阶段加标签，灰度测试、beta测试(b tag),release (R tag））
```
# 列出所有tag
$ git tag
# 新建一个tag在当前commit
$ git tag [tag]
# 新建一个tag在指定commit
$ git tag [tag] [commit]
# 删除本地tag
$ git tag -d [tag]
# 删除远程tag
$ git push origin :refs/tags/[tagName]
# 查看tag信息
$ git show [tag]
# 提交指定tag
$ git push [remote] [tag]
# 提交所有tag
$ git push [remote] --tags
# 新建一个分支，指向某个tag
$ git checkout -b [branch] [tag]
```
### 查看信息
```
# 显示有变更的文件
$ git status
# 显示当前分支的版本历史
$ git log
# 显示commit历史，以及每次commit发生变更的文件
$ git log --stat
# 搜索提交历史，根据关键词
$ git log -S [keyword]
# 显示某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --pretty=format:%s
# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature
# 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]
# 最近两周内每次提交所引入的差异
$ git whatchanged —-since=‘2 weeks ago’
# 显示指定文件相关的每一次diff
$ git log -p [file]
# 显示过去5次提交
$ git log -5 --pretty --oneline
# 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn
# 显示指定文件是什么人在什么时间修改过
$ git blame [file]
# 显示暂存区和工作区的差异
$ git diff
# 显示暂存区和上一个commit的差异
$ git diff --cached [file]
# 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD
# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]
# 显示今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"
# 打开需要你解决这些冲突的所有文件
$ git diff --name-only --diff-filter=U | uniq  | xargs $EDITOR
# 显示某次提交的元数据和内容变化
$ git show [commit]
# 显示某次提交发生变化的文件
$ git show --name-only [commit]
# 显示某次提交时，某个文件的内容
$ git show [commit]:[filename]
# 显示当前分支的最近几次提交
$ git reflog
```
### 撤销
```
# 恢复暂存区的指定文件到工作区
$ git checkout [file]
# 恢复某个commit的指定文件到暂存区和工作区
$ git checkout [commit] [file]
# 恢复暂存区的所有文件到工作区
$ git checkout .
# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset [file]
# 重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard
# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset [commit]
# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard [commit]
# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]
# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
$ git revert [commit]
# 暂时将未提交的变化移除，稍后再移入，（适用：将本次未提交的内容悬挂，切换分支工作完后，在切回当前分支）
$ git stash
$ git stash pop
```

## 在本地优化存储库
```
# 更多信息查看：git help gc
$ git gc --prune=now --aggressive
```

## submodule

```
# 新增submodule
git submodule add git@github.com:lib.git <local path>
# 初始化submodule
git submodule init
# 更新submodule
git submodule update
# 修改submodule后必须通过submodule命令提交后才能
# 同步到主工程中，否则git submodule update拉取的仍是之前的commit head
git push --recurse-submodules=on-demand
```
submodules的命令很长，为提升效率，可以创建alias，记录在.git/config路径下。如下：
git config alias.spush 'push --recurse-submodules=on-demand'
git config alias.supdate 'submodule update --remote --merge'

## 其他
### 修改远程仓库
方法有三种：
1. 修改命令
```
git remote set-url origin [url]
```
例如：
```
git remote set-url origin gitlab@gitlab.chumob.com:php/hasoffer.git
```
2. 先删后加
```
git remote rm origin
git remote add origin [url]
```
3. 直接修改config文件
### 删除后的tag又恢复了
问题：多人开发时，一人删除了一些无用的tag，push到远程仓库后，另一人pull下来后，使用`git tag 1.10.8`, `git push -tags`，后远程仓库又重新出现已经删除的tags
原因：似乎git目前也没有提供一个直接的命令和参数选项可以删除本地的在远程已经不存在的tag
解决方案：远程回退到原版，然后本地
```
#删除所有本地tag
git tag -l | xargs git tag -d
#从远程仓库中重新拉取tag
git pull
```
为了避免之后再次出现这种情况，建议每次提交tag时不使用提交所有的tags命令： `git push -tags` ，而使用仅提交当前标注到tag命令： `git push origin V-1.02.003 `
，此外应当给当前tag添加附注 `git tag -a V-1.02 -m “版本1.02”`

### 自定义快捷命令
mac环境下vim ~/.zshrc， 添加自定义即可，例如下
```
# user defined alias
alias work='cd ~/Documents/workplace && ls'
alias gt='git add . '
alias gl='git pull'
alias gh='git push'
alias gs='git status'
alias dev='npm run dev'
alias build='npm run build'
alias push='git add . && git commit -m "bugfix" && git pull && git push'
```
