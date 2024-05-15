import{_ as a,o as e,c as s,d as n}from"./app-CFIaTHNp.js";const r={},t=n(`<h1 id="数据传输" tabindex="-1"><a class="header-anchor" href="#数据传输" aria-hidden="true">#</a> 数据传输</h1><h3 id="mysql-dump" tabindex="-1"><a class="header-anchor" href="#mysql-dump" aria-hidden="true">#</a> mysql dump</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mysqldump <span class="token parameter variable">--tables</span> myTable <span class="token parameter variable">--where</span><span class="token operator">=</span><span class="token string">&quot;id &lt; 1000&quot;</span>


mysqldump <span class="token parameter variable">--databases</span> X <span class="token parameter variable">--tables</span> Y <span class="token parameter variable">--where</span><span class="token operator">=</span><span class="token string">&quot;1 limit 1000000&quot;</span>

--no-create-info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),l=[t];function i(d,c){return e(),s("div",null,l)}const p=a(r,[["render",i],["__file","数据传输.html.vue"]]);export{p as default};
