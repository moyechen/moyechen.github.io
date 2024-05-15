import{_ as e,o as i,c as n,d as s}from"./app-CFIaTHNp.js";const r={},d=s(`<h1 id="监控某个服务正常运行" tabindex="-1"><a class="header-anchor" href="#监控某个服务正常运行" aria-hidden="true">#</a> 监控某个服务正常运行</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/sh
check_time=120
sserver_port=\`uci get sserver.config.port\`

vcount=0
while [ &quot;1&quot; = &quot;1&quot; ]  #死循环
do
  sleep $check_time

   icount=\`ps -w|grep ssr-server |grep -v grep |wc -l\`

   if [ $icount = 0  ] ;then
   logger -t &quot;ssr&quot; &quot;restart ssr server!&quot;
   /etc/init.d/sserver restart
   exit 0
   fi

   icount=\`iptables -S|grep  $sserver_port|wc -l\`
   if [ $icount = 0  ] ;then
   logger -t &quot;sserver&quot; &quot;recover iptables,restart ssr server!&quot;
   /etc/init.d/sserver restart
   exit 0
   fi

done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),l=[d];function t(v,c){return i(),n("div",null,l)}const u=e(r,[["render",t],["__file","监控某个服务正常运行.html.vue"]]);export{u as default};
