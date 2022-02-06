# Mysql





## 2020/9/28

### 重置mysql密码

服务器版本: ubuntu

第一步：停止mysql服务
`sudo /etc/init.d/mysqld stop` or `sudo service mysql stop`

第二步, 以跳过密码验证模式启动mysql , 这一步窗口会阻塞, 需要再开启一个终端
`sudo mysqld_safe --skip-grant-tables`


可能有人这个时候报了一个错误, `mysqld_safe Directory '/var/run/mysqld' for UNIX socket file don't exists`

google 得到解决方案
>https://stackoverflow.com/questions/42153059/mysqld-safe-directory-var-run-mysqld-for-unix-socket-file-dont-exists

```
sudo mkdir -p /var/run/mysqld
sudo chown mysql:mysql /var/run/mysqld
```

问题解决


第三步: 进入mysql

```mysql```

第四步, 更新密码,这里我将密码改为`your_password`

```

use mysql;

update user set authentication_string = password("your_password") where user = "root";
flush privileges;

```

然后重启mysql 即可
```
先杀掉我们
```


## 2020/4/5

### select insert

```sql

INSERT INTO table2
(column_name(s))
SELECT column_name(s)
FROM table1;
```


## 2020/3/29

### mysql  语句分析:

explain + sql语句

### 数据类型为text 的时间字段, 对比

1. 最简形式 96s

```sql
SELECT * FROM `tousu_heimao_table` WHERE complaint_time > '2020-03-27'


加入limit 50
SELECT id FROM `tousu_heimao_table` WHERE complaint_time > '2020-03-27' ORDER BY complaint_time limit 50;  5s

```
2. 使用时间戳,以及替换*为字段名  45s

```sql
SELECT id,identity_code,crawl_time,title,complain_man,website,object_of_complaint,question_type,appeal_type,details_of_complaint,process_flow,comment_data,complaint_time FROM `tousu_heimao_table` WHERE unix_timestamp(complaint_time) > 1585281379`



```
3. 只查询id,没有设置limit

```
SELECT id FROM `tousu_heimao_table` WHERE unix_timestamp(complaint_time) > 1585281379 limit 50
```

4. 前50个 6.5s, 第1000-1050个, 65s
```
SELECT id FROM `tousu_heimao_table` WHERE unix_timestamp(complaint_time) > 1585281379 ORDER BY complaint_time DESC limit 50
```    


5. 第100000-100050条 40s

```
SELECT id FROM `tousu_heimao_table` WHERE 1=1 ORDER BY complaint_time DESC limit 100000,50
```
6. 稍微优化, 27s

```
SELECT id FROM `tousu_heimao_table` WHERE id > (select id from `tousu_heimao_table` ORDER BY complaint_time DESC limit 100000,1) limit 50
```

7.究极优化 3s

```
SELECT * FROM `tousu_heimao_table` WHERE id > (select id from `tousu_heimao_table` ORDER BY id  limit 100000,1) limit 50
```
8 .加入时间  2s

```
SELECT * FROM `tousu_heimao_table` WHERE id > (select id from `tousu_heimao_table` where complaint_time>'2019-3-27'    ORDER BY id  limit 100000,1) limit 50
```

9. 字段数据类型设置为datetime


```
SELECT * FROM tousu_table WHERE complaint_time > '2020-3-27' limit 100;   7s
```

```
SELECT * FROM tousu_table WHERE complaint_time > '2020-03-27' limit 100;  10s
```


### 输出表的字段名 2020/03/26


```sql
select COLUMN_NAME from information_schema.COLUMNS where table_name = 'your_table_name' and table_schema = 'your_db_name';
```




### 查询所有符合要求的行数, 同时取limit数据

一般思路: 查一下count(1) , 然后把count(1) 换成 * , 后面加上limit 0, 50, 再次查询得到数据

优化:
[博客](https://blog.csdn.net/qq_31122833/article/details/83894509)

> ```sql
> select SQL_CALC_FOUND_ROWS 
>     col_name1 as colName1,
>     col_name2 as colName2
> from table_name limit 0,10;
> select FOUND_ROWS() as count;
>  
> 在SELECT语句中加上修饰SQL_CALC_FOUND_ROWS 之后，SELECT FOUND_ROWS() 会返回满足条件记录的总数。
>  ```
> 这样，你执行完 select SQL_CALC_FOUND_ROWS 之后，再取一下记录总数就行了。

## 3/29:

```sql
 SELECT SQL_CALC_FOUND_ROWS
	*
FROM
	tousu_table 
WHERE
	(complaint_time <= '2020-03-30' AND complaint_time >= '2020-03-22' )
ORDER BY
	complaint_time 
	LIMIT 0,
	50
```
建立索引后,加与不加时间差异很大,加上后6.6s
不加1s

使用这个东西会导致全表扫描
