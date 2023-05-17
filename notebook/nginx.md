# nginx简洁
>nginx是一个反向代理服务器,同时也是一个轻量的web服务器(php要配置php)
>在一台服务器上,我们可以在不同的端口开设web服务,以  ip:port  的形式访问,但是这是不好看的
>如果你有一个已经备案的域名,则可以在域名服务商处设置隐形url, 将二级域名转发到ip:port
>如果你的服务器在国外,同时域名没有备案, 可以通过nginx来设置二级域名,

2022-2-6 nginx图片分层
=======================

存储大量图片时,可能会遇到linux文件夹文件数量的限制
我所使用的方案:保存图片时按照图片的md5前四位建立二级目录,例如md5为abcdefgxxx ,则保存后的文件目录为 /www/static/images/ab/cd/abcdefgxxx 
然后使用nginx正则去获取文件的前四位
```nginx

location ~ ^/static/images/((..)(..).+) {
    set $dir1 $2;
    set $dir2 $3;
    set $filename $1;
    default_type image/jpeg;
    alias /www/static/images/$dir1/$dir2/;
    try_files $filename =404;
}


```


nginx作为静态资源服务器
========================

>https://www.w3cschool.cn/nginxsysc/nginxsysc-cache.html




nginx简单操作
========================

```bash

//检测编写的配置文件是否有语法错误
nginx -t 
// 热重启nginx (nginx不重启的情况下重新加载配置文件)
nginx -s reload  

```


通过nginx设置二级域名
=====================

首先, 需要在域名服务商处将 *.your.domain  解析到你的服务器


然后安装nginx服务,具体不细说

在/etc/nginx/conf.d 文件夹下新建  test.conf文件

假设你要将本机 3456端口的内容设置到blog这个二级域名

server_name  二级域名
proxy_pass 写你本机的地址


配置文件编写如下
```nginx
server {
  listen 80;
  server_name blog.moyechen.cn;

  location / {
    proxy_set_header  X-Real-IP $remote_addr;
    proxy_set_header  Host   $http_host;
    proxy_pass     http://0.0.0.0:3456;
  }
}
```





nginx作为轻量的web服务器
========================

root那里写web页面的路径  
index写主页文件.可以多个

```nginx
server {
    listen       80;
    server_name  scs.moyechen.cn;

    index       index.html index.php;
    root         /root/src/cnn/conv/;
    location / {
    proxy_set_header  X-Real-IP $remote_addr;
    proxy_set_header  Host   $http_host;
  }
}
```
带PHP的页面
-------------------------
需要我们本地安装有PHP服务,然后设置一下PHP服务即可

```nginx
server {
    listen       80 default_server;
    listen       [::]:80 default_server;
    server_name  acm.moyechen.cn;

    index       index.php;
    root         /home/judge/src/web;

    location / {

    }
    location ~ \.php$ {
            fastcgi_index               index.php;
            fastcgi_pass                127.0.0.1:9000;
            fastcgi_param               SCRIPT_FILENAME $document_root$fastcgi_script_name;
            fastcgi_split_path_info     ^(.+\.php)(/.+)$;
            client_max_body_size        80m;
            include                     fastcgi_params;
    }
}
```


直接偷别人的页面
==============================
但是好像不能登陆,可能是https导致的
```nging
server {
  listen 80;
  server_name vj.moyechen.cn;

  location / {
    proxy_set_header  X-Real-IP $remote_addr;
    proxy_set_header  Host   $http_host;
    proxy_pass     https://vjudge.net;
  }
}
```

frps 简单配置
================

```nginx
server {
    listen 80;
    server_name *.frp.moyechen.cn;
    location / {
        proxy_pass http://127.0.0.1:7080;
        proxy_set_header    Host            $host:80;
        proxy_set_header    X-Real-IP       $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_hide_header   X-Powered-By;
    }
}
server {
    listen 80;
    server_name frp.moyechen.cn;
    location / {
        proxy_pass http://127.0.0.1:7500;
        proxy_set_header    Host            $host:80;
        proxy_set_header    X-Real-IP       $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_hide_header   X-Powered-By;
    }
}
```

国内服务器如何不备案放到域名上
=================

如果国内服务器不备案,并且被一个域名指向,那么几天后你访问就会出现需要备案的标记


我们可以用一台国外服务器来做中转,注意端口最好不要使用80以及443等常用端口  
不然好像还会被封

假设国内服务器ip为 xxx.xxx.xxx.xxx
假设web服务开设在国内服务器5678端口

 - 第一步, 在域名服务商设置你的域名解析到国外服务器的ip
 - 第二步, 设置中转机器  

**中转机器配置信息:**
```nginx
server {
  listen 80;
  server_name 写你的域名;

  location / {
    proxy_set_header  X-Real-IP $remote_addr;
    proxy_set_header  Host   $http_host;
    proxy_pass     http://xxx.xxx.xxx.xxx:5678;
  }
}

```

那既然有国外服务器了,为什么还要用国内服务器开设web页面呢? 我也不知道


## nginx日志审计

### 统计访问IP前十
`awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -10`


###  统计状态码
`awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -10`



## nginx 安全


### 账户验证

在linux中，如果不安装apache，但是又需要用htpasswd生成登录账号，如：配置Nginx，pure-ftpd,subversion等。

那就需要找一个替代htpasswd生成密码的方法，用openssl就可以办到
```
# printf "user:$(openssl passwd -crypt 123456)\n" >>conf/.htpasswd
# cat conf/htpasswd
```

===结果===
user:xyJkVhXGAZ8tM


这样就生成了一个用户名为user，密码为123456的账号了。
```
server {
         auth_basic      "login";
         auth_basic_user_file    conf/.htpasswd;
}
```