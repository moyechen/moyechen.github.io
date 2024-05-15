import{_ as e,o as n,c as i,d as s}from"./app-CFIaTHNp.js";const a={},l=s(`<h1 id="mysql-主从复制" tabindex="-1"><a class="header-anchor" href="#mysql-主从复制" aria-hidden="true">#</a> [mysql]主从复制</h1><h2 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤" aria-hidden="true">#</a> 步骤</h2><h3 id="_1-主开启binlog" tabindex="-1"><a class="header-anchor" href="#_1-主开启binlog" aria-hidden="true">#</a> 1，主开启binlog</h3><p>docker run --name mydb2 -itd -e MYSQL_ROOT_PASSWORD=pwd -v /dbconf/:/etc/mysql/conf.d/ mariadb</p><p>[root@bogon ~]# vim /mydb1/conf/my.cnf [mysqld] server_id=1 log_bin=mysql-bin</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">show</span> master <span class="token keyword">status</span><span class="token punctuation">;</span>
<span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">&#39;%%log_bin%&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-副修改server-id" tabindex="-1"><a class="header-anchor" href="#_2-副修改server-id" aria-hidden="true">#</a> 2. 副修改server_id</h3><p>[root@bogon ~]# vim /mydb2/conf/my.cnf [mysqld] server_id=2</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>
<span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">&#39;%server_id%&#39;</span><span class="token punctuation">;</span>      

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-副开启主从" tabindex="-1"><a class="header-anchor" href="#_3-副开启主从" aria-hidden="true">#</a> 3.副开启主从</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MariaDB [(none)]&gt; CHANGE MASTER TO MASTER_HOST=&#39;172.17.0.2&#39;, MASTER_USER=&#39;slave&#39;, MASTER_PASSWORD=&#39;slave&#39;, MASTER_LOG_FILE=&#39;mysql-bin.000001&#39;, MASTER_LOG_POS=511;     
Query OK, 0 rows affected (0.015 sec)

MariaDB [(none)]&gt; start slave;
Query OK, 0 rows affected (0.005 sec)

MariaDB [(none)]&gt; show slave status\\G
*************************** 1. row ***************************
                Slave_IO_State: Waiting for master to send event
                   Master_Host: 172.17.0.2
                   Master_User: slave
                   Master_Port: 3306
                 Connect_Retry: 60
               Master_Log_File: mysql-bin.000001
           Read_Master_Log_Pos: 511
                Relay_Log_File: mysqld-relay-bin.000002
                 Relay_Log_Pos: 555
         Relay_Master_Log_File: mysql-bin.000001
              Slave_IO_Running: Yes
             Slave_SQL_Running: Yes
               Replicate_Do_DB: 
           Replicate_Ignore_DB: 
            Replicate_Do_Table: 
        Replicate_Ignore_Table: 
       Replicate_Wild_Do_Table: 
   Replicate_Wild_Ignore_Table: 
                    Last_Errno: 0
                    Last_Error: 
                  Skip_Counter: 0
           Exec_Master_Log_Pos: 511
               Relay_Log_Space: 865
               Until_Condition: None
                Until_Log_File: 
                 Until_Log_Pos: 0
            Master_SSL_Allowed: No
            Master_SSL_CA_File: 
            Master_SSL_CA_Path: 
               Master_SSL_Cert: 
             Master_SSL_Cipher: 
                Master_SSL_Key: 
         Seconds_Behind_Master: 0
 Master_SSL_Verify_Server_Cert: No
                 Last_IO_Errno: 0
                 Last_IO_Error: 
                Last_SQL_Errno: 0
                Last_SQL_Error: 
   Replicate_Ignore_Server_Ids: 
              Master_Server_Id: 1
                Master_SSL_Crl: 
            Master_SSL_Crlpath: 
                    Using_Gtid: No
                   Gtid_IO_Pos: 
       Replicate_Do_Domain_Ids: 
   Replicate_Ignore_Domain_Ids: 
                 Parallel_Mode: conservative
                     SQL_Delay: 0
           SQL_Remaining_Delay: NULL
       Slave_SQL_Running_State: Slave has read all relay log; waiting for the slave I/O thread to update it
              Slave_DDL_Groups: 0
Slave_Non_Transactional_Groups: 0
    Slave_Transactional_Groups: 0
1 row in set (0.000 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),d=[l];function r(v,c){return n(),i("div",null,d)}const t=e(a,[["render",r],["__file","mysql_主从复制.html.vue"]]);export{t as default};
