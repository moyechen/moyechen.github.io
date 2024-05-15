import{_ as e,o as t,c as i,d as n}from"./app-CFIaTHNp.js";const a="/assets/20220728154343100_23767-Z8AYAW4s.png",s={},d=n(`<h1 id="vmware虚拟机硬盘调整" tabindex="-1"><a class="header-anchor" href="#vmware虚拟机硬盘调整" aria-hidden="true">#</a> vmware虚拟机硬盘调整</h1><p>vmware 调整硬盘大小</p><blockquote><p>https://www.cnblogs.com/ZHJ0125/p/12904471.html 安装gparted</p></blockquote><p>x11授权 sudo xauth add $(xauth -f ~moyechen/.Xauthority list|tail -1)</p><p>如果遇到</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
moyechen@moye:~$ sudo xauth add $(xauth -f ~moyechen/.Xauthority list|tail -1)
xauth:  timeout in locking authority file /home/moyechen/.Xauthority
xauth:  timeout in locking authority file /home/moyechen/.Xauthority


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>则执行</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rm ~/.Xaut*
exit
再次登录时，会提示
/usr/bin/xauth:  file /home/moyechen/.Xauthority does not exist

然后创建该文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>https://superuser.com/questions/315050/xauth-x11-ssh-forwarding-errors-with-xauthority-file-not-writable</p></blockquote><p>最后启动程序</p><p>sudo gparted</p><p><img src="`+a+'" alt=""></p><p>LVM</p><p>https://blog.csdn.net/Fly_1213/article/details/105142427</p><p>lvextend -L 80G /dev/mapper/ubuntu--vg-ubuntu--lv</p><p>resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv</p>',16),l=[d];function r(u,o){return t(),i("div",null,l)}const m=e(s,[["render",r],["__file","vmware虚拟机硬盘调整.html.vue"]]);export{m as default};
