import{_ as n,o as s,c as a,d as e}from"./app-CFIaTHNp.js";const i={},p=e(`<h1 id="nginx简洁" tabindex="-1"><a class="header-anchor" href="#nginx简洁" aria-hidden="true">#</a> nginx简洁</h1><blockquote><p>nginx是一个反向代理服务器,同时也是一个轻量的web服务器(php要配置php) 在一台服务器上,我们可以在不同的端口开设web服务,以 ip:port 的形式访问,但是这是不好看的 如果你有一个已经备案的域名,则可以在域名服务商处设置隐形url, 将二级域名转发到ip:port 如果你的服务器在国外,同时域名没有备案, 可以通过nginx来设置二级域名,</p></blockquote><h1 id="_2022-2-6-nginx图片分层" tabindex="-1"><a class="header-anchor" href="#_2022-2-6-nginx图片分层" aria-hidden="true">#</a> 2022-2-6 nginx图片分层</h1><p>存储大量图片时,可能会遇到linux文件夹文件数量的限制 我所使用的方案:保存图片时按照图片的md5前四位建立二级目录,例如md5为abcdefgxxx ,则保存后的文件目录为 /www/static/images/ab/cd/abcdefgxxx 然后使用nginx正则去获取文件的前四位</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code>
<span class="token directive"><span class="token keyword">location</span> ~ ^/static/images/((..)(..).+)</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">set</span> <span class="token variable">$dir1</span> <span class="token variable">$2</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">set</span> <span class="token variable">$dir2</span> <span class="token variable">$3</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">set</span> <span class="token variable">$filename</span> <span class="token variable">$1</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span> image/jpeg</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">alias</span> /www/static/images/<span class="token variable">$dir1</span>/<span class="token variable">$dir2</span>/</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$filename</span> =404</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="nginx作为静态资源服务器" tabindex="-1"><a class="header-anchor" href="#nginx作为静态资源服务器" aria-hidden="true">#</a> nginx作为静态资源服务器</h1><blockquote><p>https://www.w3cschool.cn/nginxsysc/nginxsysc-cache.html</p></blockquote><h1 id="nginx简单操作" tabindex="-1"><a class="header-anchor" href="#nginx简单操作" aria-hidden="true">#</a> nginx简单操作</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
//检测编写的配置文件是否有语法错误
nginx <span class="token parameter variable">-t</span> 
// 热重启nginx <span class="token punctuation">(</span>nginx不重启的情况下重新加载配置文件<span class="token punctuation">)</span>
nginx <span class="token parameter variable">-s</span> reload  

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="通过nginx设置二级域名" tabindex="-1"><a class="header-anchor" href="#通过nginx设置二级域名" aria-hidden="true">#</a> 通过nginx设置二级域名</h1><p>首先, 需要在域名服务商处将 *.your.domain 解析到你的服务器</p><p>然后安装nginx服务,具体不细说</p><p>在/etc/nginx/conf.d 文件夹下新建 test.conf文件</p><p>假设你要将本机 3456端口的内容设置到blog这个二级域名</p><p>server_name 二级域名 proxy_pass 写你本机的地址</p><p>配置文件编写如下</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span> blog.moyechen.cn</span><span class="token punctuation">;</span>

  <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span>  X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span>  Host   <span class="token variable">$http_host</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_pass</span>     http://0.0.0.0:3456</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="nginx作为轻量的web服务器" tabindex="-1"><a class="header-anchor" href="#nginx作为轻量的web服务器" aria-hidden="true">#</a> nginx作为轻量的web服务器</h1><p>root那里写web页面的路径<br> index写主页文件.可以多个</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span>  scs.moyechen.cn</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">index</span>       index.html index.php</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">root</span>         /root/src/cnn/conv/</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span>  X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span>  Host   <span class="token variable">$http_host</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="带php的页面" tabindex="-1"><a class="header-anchor" href="#带php的页面" aria-hidden="true">#</a> 带PHP的页面</h2><p>需要我们本地安装有PHP服务,然后设置一下PHP服务即可</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span> default_server</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">listen</span>       [::]:80 default_server</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span>  acm.moyechen.cn</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">index</span>       index.php</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">root</span>         /home/judge/src/web</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
    <span class="token directive"><span class="token keyword">location</span> ~ \\.php$</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">fastcgi_index</span>               index.php</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">fastcgi_pass</span>                127.0.0.1:9000</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">fastcgi_param</span>               SCRIPT_FILENAME <span class="token variable">$document_root</span><span class="token variable">$fastcgi_script_name</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">fastcgi_split_path_info</span>     ^(.+\\.php)(/.+)$</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">client_max_body_size</span>        <span class="token number">80m</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">include</span>                     fastcgi_params</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="直接偷别人的页面" tabindex="-1"><a class="header-anchor" href="#直接偷别人的页面" aria-hidden="true">#</a> 直接偷别人的页面</h1><p>但是好像不能登陆,可能是https导致的</p><div class="language-nging line-numbers-mode" data-ext="nging"><pre class="language-nging"><code>server {
  listen 80;
  server_name vj.moyechen.cn;

  location / {
    proxy_set_header  X-Real-IP $remote_addr;
    proxy_set_header  Host   $http_host;
    proxy_pass     https://vjudge.net;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="frps-简单配置" tabindex="-1"><a class="header-anchor" href="#frps-简单配置" aria-hidden="true">#</a> frps 简单配置</h1><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> *.frp.moyechen.cn</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:7080</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span>    Host            <span class="token variable">$host</span>:80</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span>    X-Real-IP       <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span>    X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_hide_header</span>   X-Powered-By</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> frp.moyechen.cn</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:7500</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span>    Host            <span class="token variable">$host</span>:80</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span>    X-Real-IP       <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span>    X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_hide_header</span>   X-Powered-By</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="国内服务器如何不备案放到域名上" tabindex="-1"><a class="header-anchor" href="#国内服务器如何不备案放到域名上" aria-hidden="true">#</a> 国内服务器如何不备案放到域名上</h1><p>如果国内服务器不备案,并且被一个域名指向,那么几天后你访问就会出现需要备案的标记</p><p>我们可以用一台国外服务器来做中转,注意端口最好不要使用80以及443等常用端口<br> 不然好像还会被封</p><p>假设国内服务器ip为 xxx.xxx.xxx.xxx 假设web服务开设在国内服务器5678端口</p><ul><li>第一步, 在域名服务商设置你的域名解析到国外服务器的ip</li><li>第二步, 设置中转机器</li></ul><p><strong>中转机器配置信息:</strong></p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span> 写你的域名</span><span class="token punctuation">;</span>

  <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span>  X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span>  Host   <span class="token variable">$http_host</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_pass</span>     http://xxx.xxx.xxx.xxx:5678</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那既然有国外服务器了,为什么还要用国内服务器开设web页面呢? 我也不知道</p><h2 id="nginx日志审计" tabindex="-1"><a class="header-anchor" href="#nginx日志审计" aria-hidden="true">#</a> nginx日志审计</h2><h3 id="统计访问ip前十" tabindex="-1"><a class="header-anchor" href="#统计访问ip前十" aria-hidden="true">#</a> 统计访问IP前十</h3><p><code>awk &#39;{print $1}&#39; /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -10</code></p><h3 id="统计状态码" tabindex="-1"><a class="header-anchor" href="#统计状态码" aria-hidden="true">#</a> 统计状态码</h3><p><code>awk &#39;{print $9}&#39; /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -10</code></p><h2 id="nginx-安全" tabindex="-1"><a class="header-anchor" href="#nginx-安全" aria-hidden="true">#</a> nginx 安全</h2><h3 id="账户验证" tabindex="-1"><a class="header-anchor" href="#账户验证" aria-hidden="true">#</a> 账户验证</h3><p>在linux中，如果不安装apache，但是又需要用htpasswd生成登录账号，如：配置Nginx，pure-ftpd,subversion等。</p><p>那就需要找一个替代htpasswd生成密码的方法，用openssl就可以办到</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># printf &quot;user:$(openssl passwd -crypt 123456)\\n&quot; &gt;&gt;conf/.htpasswd
# cat conf/htpasswd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>===结果=== user:xyJkVhXGAZ8tM</p><p>这样就生成了一个用户名为user，密码为123456的账号了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
         auth_basic      &quot;login&quot;;
         auth_basic_user_file    conf/.htpasswd;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,49),t=[p];function c(l,d){return s(),a("div",null,t)}const r=n(i,[["render",c],["__file","nginx.html.vue"]]);export{r as default};
