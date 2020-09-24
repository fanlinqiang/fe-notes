# linux

## linux指令

### 切换root用户

```
sudo su - root
```


## docker

### 更改docker配置

```
切换到 root 账户
vim 打开 /usr/lib/systemd/system/docker.service 文件
docker 启动参数列表里添加 --insecure-registry xxx.xxx.cn
重新加载
systemctl daemon-reload
systemctl restart docker
```

### 登录docker

```
$user 表示用户名
$library 表示仓库名
$repository 分支

docker login -u $user xxx.xxx.cn （按提示输入密码）

docker pull hub.xxx.cn/$library/$repository
docker tag hub.xxx.cn/$library/$repository hub.k8s.xxx.cn/$user/$repository
docker push hub.k8s.xxx.cn/$user/$repository
```
