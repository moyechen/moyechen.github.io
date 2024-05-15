import{_ as n,o as e,c as s,d as i}from"./app-CFIaTHNp.js";const a="/assets/20221206100854428_16773-lzTFwxv1.png",d={},l=i(`<h1 id="oj" tabindex="-1"><a class="header-anchor" href="#oj" aria-hidden="true">#</a> oj</h1><p>pdsuoj</p><h2 id="php7-2" tabindex="-1"><a class="header-anchor" href="#php7-2" aria-hidden="true">#</a> php7.2</h2><h3 id="代码路径信息" tabindex="-1"><a class="header-anchor" href="#代码路径信息" aria-hidden="true">#</a> 代码路径信息</h3><p>php配置文件路径<code>/etc/php/7.2/fpm/php.ini</code></p><p>这个文件修改后需重启php使修改生效<code>service php7.2-fpm restart</code></p><p>代码路径<code>/home/judge/src/web/</code></p><p>开发代码路径<code>/home/judge/src/web-dev/</code></p><p>下面的信息都基于项目根目录</p><ul><li>数据库等配置文件的路径<code>include/db_info.inc.php</code></li></ul><h2 id="代码结构" tabindex="-1"><a class="header-anchor" href="#代码结构" aria-hidden="true">#</a> 代码结构</h2><p>假设主目录为<code>/home/judge/src/web/</code> 主目录下的php文件为后端文件，负责数据库查询，数组结构组装</p><p>其中前端在template/bs3/ 路径下 admin前端在 admin/ 路径下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tree -L 1

├── ace                        在线编辑器组件
├── acm_number.txt
├── acm_ranking.php            acm排名页面
├── admin
├── bbs
├── bbs.php
├── blog_show.php               博客
├── bootstrap
├── config.yaml
├── csrf.php
├── discuss3
├── edit_area
├── faqcss
├── favicon.ico
├── fckeditor
├── fonts
├── gpl-2.0.txt
├── highlight
├── image
├── include
├── index.php
├── kindeditor
├── lang
├── mergely
├── newranking_guize.txt
├── php_errors.log           日志，基本是警告与错误
├── qrcodetmp
├── reportlogin.html
├── study_vedio              学习视频
├── summary                  知识图谱   
├── template
└── upload

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> nginx</h2><p>nginx 是最流行，性能最强的web服务器，使用多路复用，性能很强，基本替代了以前的apache</p><p><img src="`+a+`" alt="php-fpm与nginx访问流程图"></p><p>nginx 配置文件路径 for 生产 <code>/etc/nginx/sites-enabled/default</code></p><p>nginx 配置文件路径 for 开发 <code>/etc/nginx/sites-enabled/web-dev</code></p><p>nginx 常用命令</p><p>nginx -t 检查配置文件是否正确</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@iZ2ze954cl1vua04rezfxcZ:/home/judge/src/web# nginx -t 
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>nginx -s reload 使用新的配置文件重载nginx(编辑配置后，需重载使nginx生效, 正常情况下无输出）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@iZ2ze954cl1vua04rezfxcZ:/home/judge/src/web# nginx -s reload
root@iZ2ze954cl1vua04rezfxcZ:/home/judge/src/web#

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>nginx配置文件demo</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 主要区别在于listen 的端口以及root 的位置， 创建新的文件，并修改这两个，即可设置多个站点</span>
<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    
        <span class="token directive"><span class="token keyword">listen</span> <span class="token number">8000</span> default_server</span><span class="token punctuation">;</span>            
        <span class="token directive"><span class="token keyword">listen</span> [::]:8000 default_server</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">include</span> snippets/phpmyadmin.conf</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">root</span> /home/judge/src/web-dev</span><span class="token punctuation">;</span>

        <span class="token comment"># Add index.php to the list if you are using PHP</span>
        <span class="token directive"><span class="token keyword">index</span> index.php index.htm index.nginx-debian.html</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">server_name</span> _</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
                <span class="token comment"># First attempt to serve request as file, then</span>
                <span class="token comment"># as directory, then fall back to displaying a 404.</span>
                <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ =404</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment"># pass PHP scripts to FastCGI server</span>
        <span class="token comment">#</span>
        <span class="token directive"><span class="token keyword">location</span> ~ \\.php$</span> <span class="token punctuation">{</span>
                <span class="token directive"><span class="token keyword">include</span> snippets/fastcgi-php.conf</span><span class="token punctuation">;</span>
        <span class="token comment">#</span>
        <span class="token comment">#       # With php-fpm (or other unix sockets):</span>
                <span class="token directive"><span class="token keyword">fastcgi_pass</span> unix:/var/run/php/php7.2-fpm.sock</span><span class="token punctuation">;</span>
        <span class="token comment">#       # With php-cgi (or other tcp sockets):</span>
        <span class="token comment">#       fastcgi_pass 127.0.0.1:9000;</span>
        <span class="token comment">#}</span>

        <span class="token punctuation">}</span><span class="token comment">#added by hustoj</span>



<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26),c=[l];function t(p,r){return e(),s("div",null,c)}const v=n(d,[["render",t],["__file","oj.html.vue"]]);export{v as default};
