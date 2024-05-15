import{_ as e,o as i,c as n,d as r}from"./app-CFIaTHNp.js";const a={},s=r(`<h1 id="_2020-5-9-docker-时区设置" tabindex="-1"><a class="header-anchor" href="#_2020-5-9-docker-时区设置" aria-hidden="true">#</a> 2020/5/9 docKer 时区设置</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;Asia/Shanghai&quot;</span> <span class="token operator">&gt;</span> /etc/timezone
dpkg-reconfigure <span class="token parameter variable">-f</span> noninteractive tzdata
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有tzdata,需要手动安装 <code>apt-get install -y tzdata</code></p><h1 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> docker</h1><p>给容器换一个名字, 比如说 docker run -it --name=mycentos2 centos:7 /bin/bash, 可以解决问题. 将原来的容器删除</p><p>查询当前容器: docker container ls -all</p><p>删除当前容器： docker container rm mycentos(提示: 这一步要确定删除容器没问题的情况下, 才可以做)</p><h2 id="ubuntu-16-04-阿里源" tabindex="-1"><a class="header-anchor" href="#ubuntu-16-04-阿里源" aria-hidden="true">#</a> Ubuntu 16.04 阿里源</h2><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>
deb-src http://archive.ubuntu.com/ubuntu xenial main restricted #Added by software-properties
deb http://mirrors.aliyun.com/ubuntu/ xenial main restricted
deb-src http://mirrors.aliyun.com/ubuntu/ xenial main restricted multiverse universe #Added by software-properties
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted multiverse universe #Added by software-properties
deb http://mirrors.aliyun.com/ubuntu/ xenial universe
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates universe
deb http://mirrors.aliyun.com/ubuntu/ xenial multiverse
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates multiverse
deb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse #Added by software-properties
deb http://archive.canonical.com/ubuntu xenial partner
deb-src http://archive.canonical.com/ubuntu xenial partner
deb http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted multiverse universe #Added by software-properties
deb http://mirrors.aliyun.com/ubuntu/ xenial-security universe
deb http://mirrors.aliyun.com/ubuntu/ xenial-security multiverse

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pip-国内源" tabindex="-1"><a class="header-anchor" href="#pip-国内源" aria-hidden="true">#</a> pip 国内源</h2><p>pip3 install django==2.1 -i https://pypi.tuna.tsinghua.edu.cn/simple</p><p>cd ; mkdir .config ; cd .config ; mkdir pip ; cd pip ; vim pip.conf</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[global]
timeout = 6000
index-url = http://mirrors.aliyun.com/pypi/simple/
trusted-host = mirrors.aliyun.com

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),t=[s];function d(u,c){return i(),n("div",null,t)}const o=e(a,[["render",d],["__file","docker.html.vue"]]);export{o as default};
