import{_ as s,o as e,c as n,d as a}from"./app-CFIaTHNp.js";const t={},i=a(`<h1 id="进程管理" tabindex="-1"><a class="header-anchor" href="#进程管理" aria-hidden="true">#</a> 进程管理</h1><blockquote><p>supervisor 管理进程简明教程:https://www.jianshu.com/p/bf2b3f4dec73 使用 supervisor 管理进程:https://liyangliang.me/posts/2015/06/using-supervisor/ https://www.cnblogs.com/wswang/p/5795766.html</p></blockquote><p>方便管理 =配置复杂</p><p>为实现进程管理, 需要先对程序做以下分类</p><ul><li>demo 程序: 可能会出问题的程序, 需要保留程序上下文 1.使用screen 进行操作</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">screen</span> <span class="token parameter variable">-S</span> screen_Name

python3 main.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.<code>nohup python3 main.py &gt; log 2&gt;&amp;1 &amp;</code></p><ul><li>例行任务</li></ul><ol><li>crontab</li></ol><p>这种是比较简单的方式,缺点在于移动文件时不好管理</p><ol start="2"><li>superversion + schedule(APScheduler)</li></ol><p>配置较复杂 带有web接口</p><p>superversion program.conf</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[program:zhonghua]
command=python3 APScheduler_main.py              ; the program (relative uses PATH, can take args)
process_name=%(program_name)s ; process_name expr (default %(program_name)s)
numprocs=1                    ; number of processes copies to start (def 1)
directory=/home/ubuntu/zorsong/zhonghua_task                ; directory to cwd to before exec (def no cwd)
;umask=022                     ; umask for process (default None)
;priority=999                  ; the relative start priority (default 999)
;autostart=true                ; start at supervisord start (default: true)
;startsecs=1                   ; # of secs prog must stay up to be running (def. 1)
;startretries=3                ; max # of serial start failures when starting (default 3)
autorestart=unexpected        ; when to restart if exited after running (def: unexpected)
exitcodes=0,2                 ; &#39;expected&#39; exit codes used with autorestart (default 0,2)
stopsignal=QUIT               ; signal used to kill process (default TERM)
stopwaitsecs=10               ; max num secs to wait b4 SIGKILL (default 10)
stopasgroup=false             ; send stop signal to the UNIX process group (default false)
killasgroup=false             ; SIGKILL the UNIX process group (def false)
user=ubuntu                   ; setuid to this UNIX account to run the program
redirect_stderr=true          ; redirect proc stderr to stdout (default false)
stdout_logfile=/home/ubuntu/zorsong/zhonghua_task/logfile        ; stdout log path, NONE for none; default AUTO
;stdout_logfile_maxbytes=1MB   ; max # logfile bytes b4 rotation (default 50MB)
;stdout_logfile_backups=10     ; # of stdout logfile backups (default 10)
;stdout_capture_maxbytes=1MB   ; number of bytes in &#39;capturemode&#39; (default 0)
;stdout_events_enabled=false   ; emit events on stdout writes (default false)
stderr_logfile=/home/ubuntu/zorsong/zhonghua_task/logfile        ; stderr log path, NONE for none; default AUTO
;stderr_logfile_maxbytes=1MB   ; max # logfile bytes b4 rotation (default 50MB)
;stderr_logfile_backups=10     ; # of stderr logfile backups (default 10)
;stderr_capture_maxbytes=1MB   ; number of bytes in &#39;capturemode&#39; (default 0)
;stderr_events_enabled=false   ; emit events on stderr writes (default false)
;environment=A=&quot;1&quot;,B=&quot;2&quot;       ; process environment additions (def no adds)
;serverurl=AUTO                ; override serverurl computation (childutils)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="apscheduler" tabindex="-1"><a class="header-anchor" href="#apscheduler" aria-hidden="true">#</a> APScheduler</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
<span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;foo&quot;</span><span class="token punctuation">)</span>


<span class="token keyword">from</span> apscheduler<span class="token punctuation">.</span>schedulers<span class="token punctuation">.</span>background <span class="token keyword">import</span> BackgroundScheduler

sch <span class="token operator">=</span> BackgroundScheduler<span class="token punctuation">(</span><span class="token punctuation">)</span>

sch<span class="token punctuation">.</span>add_job<span class="token punctuation">(</span>foo<span class="token punctuation">)</span> <span class="token comment"># 不加时间, 会在sch.start()后立即执行</span>
sch<span class="token punctuation">.</span>add_job<span class="token punctuation">(</span>foo<span class="token punctuation">,</span><span class="token string">&#39;interval&#39;</span><span class="token punctuation">,</span>minutes<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">)</span>  <span class="token comment"># 每5分钟执行一次</span>
sch<span class="token punctuation">.</span>add_job<span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token string">&#39;cron&#39;</span><span class="token punctuation">,</span> hour<span class="token operator">=</span><span class="token string">&#39;9&#39;</span><span class="token punctuation">)</span> <span class="token comment"># 每天的09:00 执行一次</span>



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_20201026" tabindex="-1"><a class="header-anchor" href="#_20201026" aria-hidden="true">#</a> 20201026</h3><p>http://www.vuln.cn/9121</p>`,18),l=[i];function o(r,d){return e(),n("div",null,l)}const c=s(t,[["render",o],["__file","进程管理.html.vue"]]);export{c as default};
