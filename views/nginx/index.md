# NGINX

> [nginx中文手册](https://www.nginx.cn/nginx-how-to)
> http://nginx.org/en/docs/
> [Nginx 容器教程](https://www.ruanyifeng.com/blog/2018/02/nginx-docker.html)

## 安装

> 参考：https://blog.csdn.net/zz00008888/article/details/109114904

```shell
# 搜索 Nginx 包
$ brew search nginx
# 查看 Nginx 包、是否安装、启动、存放、等信息
$ brew info nginx
# 安装命令
$ brew install nginx
```

- 安装成功之后，nginx 的本地路径为：`/usr/local/var/homebrew/linked/nginx`
- nginx 本地配置文件路径：`/usr/local/etc/nginx/nginx.conf`
- nginx 文件存放路径为，在 Mac 上其实这个存放路径是软链出来的：`/usr/local/var/www`
- nginx logs 文件存放路径为：`/usr/local/var/log`
```
# 可以通过命令查看各个日志文件的信息以及大小：
$ cd /usr/local/var/log
$ ls -alF
```
- 启动 Nginx，启动之后打开 `http://localhost:8080/` 链接，就会出现 `Welcome to nginx!`。

## 常用命令

```shell
# 启动服务器
$ nginx
# 直接停止服务器
$ nginx -s stop
# 等所有请求结束之后，停止服务器
$ nginx -s quit
# 验证配置是否正确
$ nginx -t
# 重新加载配置文件,不停止服务器
$ nginx -s reload
# 重新加载日志文件，不停止服务器
$ nginx -s reopen
# 版本
$ nginx -v
```

## 配置

```shell
#运行用户
user nobody;
# Nginx worker 进程个数：其数量直接影响性能。
# 启动进程,通常设置成和cpu的数量相等,推荐设置：cpu的个数 * 核心数(几核CPU)
worker_processes  1;

#全局错误日志及PID文件
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

#工作模式及连接数上限
events {
    # epoll是多路复用IO(I/O Multiplexing)中的一种方式,
    # 仅用于linux2.6以上内核,可以大大提高nginx的性能
    use   epoll;

    # 单个后台worker process进程的最大并发链接数    
    worker_connections  1024;

    # 并发总数是 worker_processes 和 worker_connections 的乘积
    # 即 max_clients = worker_processes * worker_connections
    # 在设置了反向代理的情况下，max_clients = worker_processes * worker_connections / 4  为什么
    # 为什么上面反向代理要除以4，应该说是一个经验值
    # 根据以上条件，正常情况下的Nginx Server可以应付的最大连接数为：4 * 8000 = 32000
    # worker_connections 值的设置跟物理内存大小有关
    # 因为并发受IO约束，max_clients的值须小于系统可以打开的最大文件数
    # 而系统可以打开的最大文件数和内存大小成正比，一般1GB内存的机器上可以打开的文件数大约是10万左右
    # 我们来看看360M内存的VPS可以打开的文件句柄数是多少：
    # $ cat /proc/sys/fs/file-max
    # 输出 34336
    # 32000 < 34336，即并发连接总数小于系统可以打开的文件句柄总数，这样就在操作系统可以承受的范围之内
    # 所以，worker_connections 的值需根据 worker_processes 进程数目和系统可以打开的最大文件总数进行适当地进行设置
    # 使得并发总数小于操作系统可以打开的最大文件数目
    # 其实质也就是根据主机的物理CPU和内存进行配置
    # 当然，理论上的并发总数可能会和实际有所偏差，因为主机还有其他的工作进程需要消耗系统资源。
    # ulimit -SHn 65535

}


http {
    # 设定mime类型,类型由mime.type文件定义
    include    mime.types;
    # 响应文件类型
    default_type  application/octet-stream;
    # 日志格式
    # 语法：log_format 格式名称 格式样式(可以多个)
    # log_format 与 access_log 既可以配置在 http{ ... }里面，也可以配置在虚拟主机 server{ ... } 里面
    # 设定日志格式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    # 日志文件的存放路径、格式、缓存大小
    # log_format 与 access_log 既可以配置在 http{ ... }里面，也可以配置在虚拟主机 server{ ... } 里面
    access_log  logs/access.log  main;

    # sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，
    # 对于普通应用，必须设为 on,
    # 如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，
    # 以平衡磁盘与网络I/O处理速度，降低系统的uptime.
    sendfile     on;
    # tcp_nopush     on;

    # 连接超时时间
    keepalive_timeout  65;
    tcp_nodelay     on;

    #开启gzip压缩
    gzip  on;
    gzip_disable "MSIE [1-6].";

    #设定请求缓冲
    client_header_buffer_size    128k;
    large_client_header_buffers  4 128k;


    # 设定虚拟主机配置, 每一个 server 就是一个虚拟主机，当需要多站点的时候多配置几个 server 即可
    server {
        # 侦听80端口
        listen    80;
        # 定义使用 www.nginx.cn访问, 主机名称，如果是本地电脑测试，记得在 hosts 文件中做好域名解析
        server_name  www.nginx.cn;

        #定义服务器的默认网站根目录位置
        root html;

        #设定本虚拟主机的访问日志
        access_log  logs/nginx.access.log  main;

        #默认请求
        location / {
            # 匹配的根目录，只写文件名默认在 /nginx 文件夹下
            # 也可以写成绝对路径 root /usr/local/var/dzm;
            root html;
            # 定义首页索引文件的名称,设置默认首页，按先后顺序匹配首页
            index index.php index.html index.htm;   

        }

        # 定义错误提示页面
        error_page   500 502 503 504 /50x.html;
            location = /50x.html {
        }

        #静态文件，nginx自己处理
        location ~ ^/(images|javascript|js|css|flash|media|static)/ {

            #过期30天，静态文件不怎么更新，过期可以设大一点，
            #如果频繁更新，则可以设置得小一点。
            expires 30d;
        }

        #PHP 脚本请求全部转发到 FastCGI处理. 使用FastCGI默认配置.
        location ~ .php$ {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include fastcgi_params;
        }

        #禁止访问 .htxxx 文件
        location ~ /.ht {
            deny all;
        }

        location /patient/ {
           try_files $uri $uri/ /patient/index.html;
        }
        location /patient/smart/ {
            expires 0;
            alias /home/work/dev/web/smart/dist/;
            try_files $uri $uri/ /patient/smart/index.html;		
        }
        location /epidemic-h5/ {
              alias /Users/linqiang/Downloads/epidemic-h5/dist/;
              try_files $uri $uri/ /epidemic-h5/index.html;
              # GZIP should be enabled to make response payload smaller
              gzip                on;
              gzip_vary           on;
              gzip_proxied        any;
              gzip_comp_level     6;
              gzip_buffers        16 8k;
              gzip_http_version   1.1;
              gzip_min_length     1000;
              gzip_types          text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;
              # For better cache policy, browser will send an HEAD request before using local cache
              expires         0;
              add_header      Cache-Control private;
              #add_header Cache-Control no-store;
              #add_header Hm-Nginx 1;
              if ($request_filename ~* .*\.(?:htm|html)$) {
                  add_header Last-Modified $date_gmt;
                  add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
                  expires off;
              }
              if ($request_filename ~* .*\.(?:js)$) {
                  expires 7d;
              }
              if ($request_filename ~* .*\.(?:|css)$) {
                  add_header Content-Type "text/css;charset=utf-8";
                  expires 7d;
              }
              if ($request_filename ~* .*\.(?:jpg|jpeg|gif|ttf|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm)$) {
                  expires 7d;
              }
          }
        location ~* (/epidemic-h5)(/.*)+/(css|js|data|fonts|images|img)/ {
            alias /Users/linqiang/Downloads/epidemic-h5/dist;
            rewrite (.*)\/(css|js|data|fonts|images|img)\/(.*) $1/$3/$4 last;
        }
    }
    # 嵌入其他配置文件
    # 语法：include /path/file 绝对路径，指定目录下的指定文件
    # 语法：include path/file 相对路径，指定目录下的指定文件
    # 语法：include path/* 指定目录下的所有文件
    # 语法：include file 当前 nginx.conf 同文件夹下的指定文件
    # 参数既可以是绝对路径也可以是相对路径（相对于 nginx 的配置目录，即 nginx.conf 所在的目录
    # 本文下面有使用示例 —— nginx.conf 多个虚拟主机使用
    include servers/*;
}
```

### docker内server示例

```
server {
    # 监听端口
    listen      80 default_server;

    root        /var/www/default;
    index       index.html;

    location / {
        # try_files $uri $uri/ =404;
        try_files $uri $uri/ /index.html;
        # GZIP should be enabled to make response payload smaller
        gzip            on;
        gzip_types      text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;
        # For better cache policy, browser will send an HEAD request before using local cache
        expires         0;
        add_header      Cache-Control private;
        add_header      Set-Cookie 'ucenter_session=123; HttpOnly; Path=/';
        add_header      Set-Cookie 'session=777; HttpOnly; Path=/';
        if ($request_filename ~* .*\.(?:htm|html)$) {
            add_header Last-Modified $date_gmt;
            add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
            expires off;
        }
        if ($request_filename ~* .*\.(?:js)$) {
            expires 7d;
        }
        if ($request_filename ~* .*\.(?:|css)$) {
            add_header Content-Type "text/css;charset=utf-8";
            expires 7d;
        }
        if ($request_filename ~* .*\.(?:jpg|jpeg|gif|ttf|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm)$) {
            expires 7d;
        }
        if ($request_filename ~* .*\.(?:xlsx|xls)$){
              add_header Content-Disposition: 'attachment;';
              add_header Content-Type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;';
        }
    }
    location /phone {
        # try_files $uri $uri/ =404;
        try_files $uri $uri/ /phone.html;
    }
    location ~* /(pc|phone)/(css|img|js|flv|swf|download) {
        rewrite (.*)\/(pc|phone)\/(.*) $1/$3 last;
    }
    location ~ ^/api/(.*)$ {
        proxy_pass https://www.baidu.com/api/$1;
    }
    location ~* /(api|ucenter|gaia|sso|frontsso)/(.*)$ {
        if ($request_uri ~* /ydy/api/) {
            rewrite /ydy/api/(.*) /api/$1 last;
        }
        proxy_pass https://www.baidu.com;
        # index index.html index.htm;
        # proxy_set_header X-real-ip $remote_addr;
        # proxy_set_header Host $http_host;
      }
}
```


### location

location有两种格式：
- 匹配uri类型，有四种参数可选，当然也可以不带参数。`location [ = | ~ | ~* | ^~ ] uri { ... }`
- 命名location，用@来标识，类似于定义goto语句块。`location @name { ... }02`

#### location匹配参数解释

|参数|解释|
|:-|:-|
|location|后没有参数直接跟着URI，表示前缀匹配，代表跟请求中的URI从头开始匹配。|
|~	|执行一个正则匹配，区分大小写。|
|~*	|执行一个正则匹配，不区分大小写。|
|^~	|普通字符匹配，多用来匹配目录。|
|=	|执行普通字符精确匹配。|
|@	|"@" 定义一个命名的 location，@定义的locaiton名字一般用在内部定向，例如error_page, try_files命令中。它的功能类似于编程中的goto。|

## 反向代理

> http://nginx.org/en/docs/http/ngx_http_proxy_module.html
