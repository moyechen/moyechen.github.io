# linux学习


### 删除含有行的文件

```bash

sed -e '/abc/d'  clickhouse-server.log  > a.log 
chown clickhouse:clickhouse a.log
chmod 640 a.log
mv a.log clickhouse-server.log
service clickhouse-server reload


```


## 软连接 2020/4/20

Usage: ln [OPTION]... [-T] TARGET LINK_NAME   (1st form)
  or:  ln [OPTION]... TARGET                  (2nd form)
  or:  ln [OPTION]... TARGET... DIRECTORY     (3rd form)
  or:  ln [OPTION]... -t DIRECTORY TARGET...  (4th form)
In the 1st form, create a link to TARGET with the name LINK_NAME.
In the 2nd form, create a link to TARGET in the current directory.
In the 3rd and 4th forms, create links to each TARGET in DIRECTORY.
Create hard links by default, symbolic links with --symbolic.
By default, each destination (name of new link) should not already exist.
When creating hard links, each TARGET must exist.  Symbolic links
can hold arbitrary text; if later resolved, a relative link is
interpreted in relation to its parent directory.


### 删除所有以.log结尾的文件 20200806
find ./ -name "*.log" -exec rm {} \;