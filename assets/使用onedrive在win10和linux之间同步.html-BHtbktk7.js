import{_ as t,r as o,o as l,c as d,a as e,b as n,e as a,d as i}from"./app-CFIaTHNp.js";const r={},c=e("h1",{id:"使用onedrive在win10和linux之间同步",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#使用onedrive在win10和linux之间同步","aria-hidden":"true"},"#"),n(" 使用onedrive在win10和linux之间同步")],-1),u=e("p",null,"我们在写代码的时候,经常有这样的场景: 在Windows下开发,然后放在服务器上跑",-1),p=e("p",null,"刚开始开发,整个项目只有一个文件(.py) ,这时候我使用xshell链接到服务器,使用rz命令上传文件, 就解决了问题",-1),h=e("p",null,"之后, 使用PyCharm 远程调试, 链接服务器进行同步, 也解决一定的问题,",-1),v=e("p",null,"最近跟风上了一年的OneDrive 365 (家庭版,6人240,一人40), onedrive 空间从免费的5g提升到了1tb,",-1),m={href:"https://github.com/skilion/onedrive",target:"_blank",rel:"noopener noreferrer"},b=i(`<p>!!!! 在ubuntu16上有些许问题， 因为大佬不在维护， 因此使用另外一个同学的产品 <code>https://github.com/abraunegg/onedrive.git</code></p><p>本人环境: win10 , centos7(1g 1h 1m)</p><h2 id="上手" tabindex="-1"><a class="header-anchor" href="#上手" aria-hidden="true">#</a> 上手:</h2><h3 id="事前准备-fedora-centos" tabindex="-1"><a class="header-anchor" href="#事前准备-fedora-centos" aria-hidden="true">#</a> 事前准备: Fedora/CentOS</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> libcurl-devel
<span class="token function">sudo</span> yum <span class="token function">install</span> sqlite-devel
<span class="token function">curl</span> <span class="token parameter variable">-fsS</span> https://dlang.org/install.sh <span class="token operator">|</span> <span class="token function">bash</span> <span class="token parameter variable">-s</span> dmd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/skilion/onedrive.git
<span class="token builtin class-name">cd</span> onedrive
<span class="token function">make</span>
<span class="token function">sudo</span> <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="卸载" tabindex="-1"><a class="header-anchor" href="#卸载" aria-hidden="true">#</a> 卸载</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">make</span> uninstall
<span class="token comment"># delete the application state</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> .config/onedrive
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><span id="pz"></span></p><h3 id="进行配置" tabindex="-1"><a class="header-anchor" href="#进行配置" aria-hidden="true">#</a> 进行配置</h3><p>如果不配置, 你Onedrive中的文件默认会下载到 <code>~/OneDrive</code>这个目录,并且隐藏的文件会跳过 如果你想改变位置等等, 做以下操作</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/.config/onedrive
<span class="token function">cp</span> ./config ~/.config/onedrive/config
<span class="token function">vim</span> ~/.config/onedrive/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可用选项:</p><ul><li><code>sync_dir</code>: 本地的onedrive文件夹路径,onedrive中的文件会保存在本地的这个目录</li><li><code>skip_file</code>: 设置跳过的文件</li></ul><p><strong>demo:</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Directory where the files will be synced
sync_dir = &quot;~/OneDrive&quot;
# Skip files and directories that match this pattern
skip_file = &quot;.*|~*&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),_=e("code",null,"*",-1),f=e("code",null,"?",-1),g={href:"https://technet.microsoft.com/en-us/library/bb490639.aspx",target:"_blank",rel:"noopener noreferrer"},k=e("code",null,"|",-1),x=i(`<p>Note: 改变配置文件后, 应该执行 <code>onedrive --resync</code> 以获得同步</p><h3 id="选择性同步" tabindex="-1"><a class="header-anchor" href="#选择性同步" aria-hidden="true">#</a> 选择性同步</h3><p>选择性同步允许你只同步一个文件夹,或者是一个文件 方法:</p><ul><li>首先,确保你做了上面的配置文件,如果没有,<a href="#pz">点击跳转</a></li><li>然后, 在~/.config/onedrive/ 目录下创建文件 <code>sync_list</code></li></ul><p><code>sync_list</code>:的一个例子</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Backup
Documents/latest_report.docx
Work/ProjectX
notes.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Note: 改变配置文件后, 应该执行 <code>onedrive --resync</code> 以获得同步</p><h2 id="本人的使用方法" tabindex="-1"><a class="header-anchor" href="#本人的使用方法" aria-hidden="true">#</a> 本人的使用方法</h2>`,8),y={href:"https://github.com/tamlok/vnote",target:"_blank",rel:"noopener noreferrer"},w={href:"https://github.com/tamlok/viki",target:"_blank",rel:"noopener noreferrer"},N=e("p",null,"具体操作:",-1),q=e("li",null,[n("在onedrive 根目录下新建文件夹"),e("code",null,"blog")],-1),D=e("li",null,[n("打开vnote, 新建一个笔记本,并设置根目录为 "),e("code",null,"onedrive/blog")],-1),O={href:"https://github.com/tamlok/viki/archive/v2.0.1.zip",target:"_blank",rel:"noopener noreferrer"};function z(B,S){const s=o("ExternalLinkIcon");return l(),d("div",null,[c,u,p,h,v,e("p",null,[n("同时也看到了大佬的github "),e("a",m,[n("skilion"),a(s)]),n(",")]),b,e("p",null,[n("Patterns are case insensitive. "),_,n(" and "),f,n(),e("a",g,[n("wildcards characters"),a(s)]),n(" are supported. Use "),k,n(" to separate multiple patterns.")]),x,e("p",null,[n("本人使用 "),e("a",y,[n("vnote"),a(s)]),n(" 来编写笔记, 同时使用 "),e("a",w,[n("viki"),a(s)]),n(" 来作为web服务")]),N,e("ul",null,[q,D,e("li",null,[n("下载最新版的viki源文件, "),e("a",O,[n("下载链接"),a(s)]),n(",解压缩")])])])}const C=t(r,[["render",z],["__file","使用onedrive在win10和linux之间同步.html.vue"]]);export{C as default};
