# 日志

## 关闭.bash_history

已经在Ubuntu 16.04.6 LTS验证有效

> 我们可以修改/etc/profile文件中修改2个参数来控制历史命令记录和输出。
> ```bash
> echo "export HISTFILESIZE=0" >> /etc/profile
> source /etc/profile
> ```


1. https://www.cndba.cn/dave/article/4086
2. https://blog.csdn.net/smasegain/article/details/46678113



## 关闭mysql连接日志

1. ~/.mysql_history

https://www.cnblogs.com/milantgh/p/3602206.html


2.
> 如何关闭MySQL的日志功能：删除日志：执行：/usr/local/mysql/bin/mysql -u root -p
> 输入密码登录后再执行：reset master;
> 再输入：quit 退出mysql命令模式。
> 彻底禁用MySQL日志：修改/etc/my.cnf 文件，
> 找到log-bin搜索=mysql-binbinlog_format=mixed再这两行前面加上#，
> 将其注释掉，再执行/etc/init.d/mysql restart即可。
> 或直接去目录/usr/local/mysql/var/删除日志文件即可正常使用！
> ————————————————
> 版权声明：本文为CSDN博主「风火程序员」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
> 原文链接：https://blog.csdn.net/phpfenghuo/article/details/42262031


编辑 /etc/mysql/mysql.conf.d/mysqld.cnf



## 关闭SSH日志




编辑/etc/ssh/sshd_config


/var/log/syslog 没有这个文件

正常登录
Mar 23 03:10:40 ubuntu systemd[1]: Started Session 7 of user homepc.


grep sshd /var/log/auth.log


https://www.cnblogs.com/sparkdev/p/7694202.html

[ssh远程登陆日志分析](https://blog.csdn.net/supertor/article/details/84334710?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task)





[root@master ~]# vim /etc/ssh/sshd_config
#SyslogFacility AUTH
SyslogFacility AUTHPRIV
#LogLevel INFO
改 SyslogFacility  local1
 
更改日志服务配置
[root@master ~]# vim /etc/rsyslog.conf
#sign
local1.* /var/log/sshd.log //这里该成空,就可以全删除了



