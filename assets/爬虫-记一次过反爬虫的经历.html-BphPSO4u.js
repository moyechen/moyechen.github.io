import{_ as e,o as t,c as l,a as _,b as o}from"./app-CFIaTHNp.js";const s={},n=_("h1",{id:"记一次过反爬虫的经历",tabindex:"-1"},[_("a",{class:"header-anchor",href:"#记一次过反爬虫的经历","aria-hidden":"true"},"#"),o(" 记一次过反爬虫的经历")],-1),i=_("p",null,"fakame.com",-1),c=_("p",null,"反爬表现特征: 1.云服务器第一次访问被拦截, 而本地调试时请求正常发送 2.被拦截时会返回一动态的js代码, 作用是重定向到当前网址 3.加上动态代理后, 即使访问该重定向网址, 下次请求也会被拦截 4.每天8点, 先使用代码访问, 被拦截, 此时使用浏览器访问一次, 然后再使用代码, 可正常工作",-1),a=_("p",null,"网站反爬模式 默认所有ip为黑ip, 当用户第一次访问时, 返回js代码重定向到原网页, 如果此次请求成功, 将该ip加白, 有效期约为1天",-1),d=_("p",null,"特征解读",-1),r=_("ol",null,[_("li",null,"调试时已使用浏览器访问过网站, 已经被加白"),_("li",null,"动态代理每次请求ip不同, 因此访问重定向网址的ip与原ip不同, 无法被加白, 即使被加白, 下次访问ip又发生变化, 无法抓取"),_("li",null,"使用本地浏览器访问, 即访问重定向网站, 给自己的ip加白, 此后使用本机ip即可正常访问")],-1),p=[n,i,c,a,d,r];function h(u,f){return t(),l("div",null,p)}const x=e(s,[["render",h],["__file","爬虫-记一次过反爬虫的经历.html.vue"]]);export{x as default};
