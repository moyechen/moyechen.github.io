import{_ as n,o as s,c as a,d as p}from"./app-CFIaTHNp.js";const t={},e=p(`<h1 id="teg争霸赛" tabindex="-1"><a class="header-anchor" href="#teg争霸赛" aria-hidden="true">#</a> teg争霸赛</h1><h3 id="第一关-刷到10000" tabindex="-1"><a class="header-anchor" href="#第一关-刷到10000" aria-hidden="true">#</a> 第一关 刷到10000</h3><p>直接返回a 即可</p><h3 id="第二关" tabindex="-1"><a class="header-anchor" href="#第二关" aria-hidden="true">#</a> 第二关</h3><p>看js 返回a*a+a 即可</p><h3 id="第三关-20201021" tabindex="-1"><a class="header-anchor" href="#第三关-20201021" aria-hidden="true">#</a> 第三关 20201021</h3><p>将js看懂后改写</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>
window <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">var</span> bl5 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;A5473788&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">bl1<span class="token punctuation">,</span> bl2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> <span class="token function-variable function">bl4</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">bl3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">--</span>bl3<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            bl1<span class="token punctuation">[</span><span class="token string">&#39;push&#39;</span><span class="token punctuation">]</span><span class="token punctuation">(</span>bl1<span class="token punctuation">[</span><span class="token string">&#39;shift&#39;</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">bl4</span><span class="token punctuation">(</span><span class="token operator">++</span>bl2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span>bl5<span class="token punctuation">,</span> <span class="token number">496</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token keyword">var</span> <span class="token function-variable function">_0x23fc</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">bl1<span class="token punctuation">,</span> bl2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    bl1 <span class="token operator">=</span> bl1 <span class="token operator">-</span> <span class="token number">0x0</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> bl4 <span class="token operator">=</span> bl5<span class="token punctuation">[</span>bl1<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> bl4<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

window<span class="token punctuation">[</span><span class="token function">_0x23fc</span><span class="token punctuation">(</span><span class="token string">&#39;0x0&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">bl6</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> bl9 <span class="token operator">=</span> <span class="token number">199999</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> bl8 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> bl8 <span class="token operator">&lt;</span> <span class="token number">199999</span><span class="token punctuation">;</span> bl8<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> bl7 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token comment">//for (var bl10 = 0; bl10 &lt; bl8; bl10++) {</span>
        <span class="token comment">//  bl7 += bl6[&#39;a&#39;][0];</span>
        <span class="token comment">//} 这里循环删掉</span>
        bl7 <span class="token operator">+=</span> bl6<span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">*</span> bl8<span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>bl7 <span class="token operator">%</span> bl6<span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">==</span> bl6<span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> bl8 <span class="token operator">&lt;</span> bl9<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            bl9 <span class="token operator">=</span> bl8
            <span class="token keyword">break</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> bl9<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span><span class="token constant">A5473788</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第四关-20201022" tabindex="-1"><a class="header-anchor" href="#第四关-20201022" aria-hidden="true">#</a> 第四关 20201022</h3><p>原始代码直接放node里面, 报错,</p><p>一点点剥皮后发现node 里没有window 对象, 加上即可</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>
window <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

window<span class="token punctuation">.</span>setTimeout <span class="token operator">=</span> setTimeout

window<span class="token punctuation">.</span><span class="token function-variable function">A593C8B8</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">b106</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">$<span class="token punctuation">,</span> b106<span class="token punctuation">,</span> b105<span class="token punctuation">,</span> b104<span class="token punctuation">,</span> b103</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

    <span class="token keyword">let</span> <span class="token function-variable function">b102</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token operator">*</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">yield</span><span class="token punctuation">[</span>    <span class="token punctuation">(</span><span class="token parameter">b106<span class="token punctuation">,</span> b105</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> b106 <span class="token operator">+</span> b105<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">b106<span class="token punctuation">,</span> b105</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> b106 <span class="token operator">-</span> b105<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">b106<span class="token punctuation">,</span> b105</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> b106 <span class="token operator">*</span> b105<span class="token punctuation">]</span>   <span class="token punctuation">[</span><span class="token operator">++</span>b105 <span class="token operator">%</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;bind&#39;</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> b104<span class="token punctuation">,</span> b103<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> <span class="token function-variable function">b101</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">b102<span class="token punctuation">,</span> b101<span class="token punctuation">,</span> b100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        b103 <span class="token operator">=</span> b102<span class="token punctuation">;</span>
        b104 <span class="token operator">=</span> b101<span class="token punctuation">[</span><span class="token string">&quot;next&quot;</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">&#39;value&#39;</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        b105 <span class="token operator">==</span> b106<span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&quot;length&quot;</span><span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token function">b100</span><span class="token punctuation">(</span><span class="token operator">-</span>b104<span class="token punctuation">)</span>

    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">// return new Promise(b105 =&gt; b106[&#39;a&#39;][&#39;forEach&#39;](b104 =&gt; $[&quot;setTimeout&quot;](b103 =&gt; b101(b104, b102, b105), b104)))</span>


    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">b105</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

        b106<span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;forEach&#39;</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">b104</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token parameter">b103</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token function">b101</span><span class="token punctuation">(</span>b104<span class="token punctuation">,</span> b102<span class="token punctuation">,</span> b105<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>b104<span class="token operator">/</span><span class="token number">50</span><span class="token punctuation">)</span>

        <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">,</span> b106<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以运行,但是很慢, 搞懂后, 在延时处 b104/50 即可</p><h3 id="第五关-20201023" tabindex="-1"><a class="header-anchor" href="#第五关-20201023" aria-hidden="true">#</a> 第五关 20201023</h3><p>这关用的wasm</p><blockquote><p>https://www.wasm.com.cn/docs/semantics/</p></blockquote><div class="language-wasm line-numbers-mode" data-ext="wasm"><pre class="language-wasm"><code>
<span class="token punctuation">(</span><span class="token keyword">module</span>
  <span class="token punctuation">(</span><span class="token keyword">func</span> <span class="token variable">$Math.min</span> <span class="token comment">(;0;)</span> <span class="token punctuation">(</span><span class="token keyword">import</span> <span class="token string">&quot;Math&quot;</span> <span class="token string">&quot;min&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">param</span> <span class="token keyword">i32</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">result</span> <span class="token keyword">i32</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">(</span><span class="token keyword">func</span> <span class="token variable">$Math.max</span> <span class="token comment">(;1;)</span> <span class="token punctuation">(</span><span class="token keyword">import</span> <span class="token string">&quot;Math&quot;</span> <span class="token string">&quot;max&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">param</span> <span class="token keyword">i32</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">result</span> <span class="token keyword">i32</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">(</span><span class="token keyword">func</span> <span class="token variable">$Run</span> <span class="token comment">(;2;)</span> <span class="token punctuation">(</span><span class="token keyword">export</span> <span class="token string">&quot;Run&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">param</span> <span class="token variable">$var0</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">param</span> <span class="token variable">$var1</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">result</span> <span class="token keyword">i32</span><span class="token punctuation">)</span>
    <span class="token punctuation">(</span><span class="token keyword">local</span> <span class="token variable">$var2</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">local</span> <span class="token variable">$var3</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">local</span> <span class="token variable">$var4</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">local</span> <span class="token variable">$var5</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">local</span> <span class="token variable">$var6</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">local</span> <span class="token variable">$var7</span> <span class="token keyword">i32</span><span class="token punctuation">)</span>
    <span class="token keyword">local</span>.get <span class="token variable">$var0</span>
    <span class="token keyword">local</span>.set <span class="token variable">$var2</span>
    <span class="token keyword">local</span>.get <span class="token variable">$var1</span>
    <span class="token keyword">i32<span class="token punctuation">.</span>const</span> <span class="token number">1</span>
    <span class="token keyword">i32<span class="token punctuation">.</span>sub</span>
    <span class="token keyword">local</span>.tee <span class="token variable">$var4</span>
    <span class="token keyword">if</span>
      <span class="token keyword">loop</span> <span class="token variable">$label1</span>
        <span class="token keyword">local</span>.get <span class="token variable">$var2</span>
        <span class="token keyword">local</span>.set <span class="token variable">$var3</span>
        <span class="token keyword">i32<span class="token punctuation">.</span>const</span> <span class="token number">0</span>
        <span class="token keyword">local</span>.set <span class="token variable">$var6</span>
        <span class="token keyword">i32<span class="token punctuation">.</span>const</span> <span class="token number">10</span>
        <span class="token keyword">local</span>.set <span class="token variable">$var7</span>
        <span class="token keyword">loop</span> <span class="token variable">$label0</span>
          <span class="token keyword">local</span>.get <span class="token variable">$var3</span>
          <span class="token keyword">i32<span class="token punctuation">.</span>const</span> <span class="token number">10</span>
          <span class="token keyword">i32<span class="token punctuation">.</span>rem_u</span>
          <span class="token keyword">local</span>.set <span class="token variable">$var5</span>
          <span class="token keyword">local</span>.get <span class="token variable">$var3</span>
          <span class="token keyword">i32<span class="token punctuation">.</span>const</span> <span class="token number">10</span>
          <span class="token keyword">i32<span class="token punctuation">.</span>div_u</span>
          <span class="token keyword">local</span>.set <span class="token variable">$var3</span>
          <span class="token keyword">local</span>.get <span class="token variable">$var5</span>
          <span class="token keyword">local</span>.get <span class="token variable">$var6</span>
          <span class="token keyword">call</span> <span class="token variable">$Math.max</span>
          <span class="token keyword">local</span>.set <span class="token variable">$var6</span>
          <span class="token keyword">local</span>.get <span class="token variable">$var5</span>
          <span class="token keyword">local</span>.get <span class="token variable">$var7</span>
          <span class="token keyword">call</span> <span class="token variable">$Math.min</span>
          <span class="token keyword">local</span>.set <span class="token variable">$var7</span>
          <span class="token keyword">local</span>.get <span class="token variable">$var3</span>
          <span class="token keyword">i32<span class="token punctuation">.</span>const</span> <span class="token number">0</span>
          <span class="token keyword">i32<span class="token punctuation">.</span>gt_u</span>
          <span class="token keyword">br_if</span> <span class="token variable">$label0</span>
        <span class="token keyword">end</span> <span class="token variable">$label0</span>
        <span class="token keyword">local</span>.get <span class="token variable">$var2</span>
        <span class="token keyword">local</span>.get <span class="token variable">$var6</span>
        <span class="token keyword">local</span>.get <span class="token variable">$var7</span>
        <span class="token keyword">i32<span class="token punctuation">.</span>mul</span>
        <span class="token keyword">i32<span class="token punctuation">.</span>add</span>
        <span class="token keyword">local</span>.set <span class="token variable">$var2</span>
        <span class="token keyword">local</span>.get <span class="token variable">$var4</span>
        <span class="token keyword">i32<span class="token punctuation">.</span>const</span> <span class="token number">1</span>
        <span class="token keyword">i32<span class="token punctuation">.</span>sub</span>
        <span class="token keyword">local</span>.tee <span class="token variable">$var4</span>
        <span class="token keyword">br_if</span> <span class="token variable">$label1</span>
      <span class="token keyword">end</span> <span class="token variable">$label1</span>
    <span class="token keyword">end</span>
    <span class="token keyword">local</span>.get <span class="token variable">$var2</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>https://github.com/WebAssembly/wabt</p><p>wasm 转c, 然后编译时加上 Ofast 优化 即可</p><p><code>gcc a.c -o a.out -Ofast</code></p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;limits.h&gt;</span></span>
 <span class="token keyword">unsigned</span> <span class="token function">max</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> a<span class="token punctuation">,</span><span class="token keyword">unsigned</span> b<span class="token punctuation">)</span><span class="token punctuation">{</span>
     <span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token operator">&gt;</span>b<span class="token punctuation">)</span>
     <span class="token keyword">return</span> a<span class="token punctuation">;</span>
     <span class="token keyword">else</span> <span class="token keyword">return</span> b<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>

 <span class="token keyword">unsigned</span> <span class="token function">min</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> a<span class="token punctuation">,</span><span class="token keyword">unsigned</span> b<span class="token punctuation">)</span><span class="token punctuation">{</span>
     <span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token operator">&lt;</span>b<span class="token punctuation">)</span>
     <span class="token keyword">return</span> a<span class="token punctuation">;</span>
     <span class="token keyword">else</span> <span class="token keyword">return</span> b<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
 

<span class="token keyword">int</span> <span class="token function">_Run</span><span class="token punctuation">(</span><span class="token keyword">int</span> _p0<span class="token punctuation">,</span> <span class="token keyword">int</span> _p1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">int</span> _l2 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> _l3 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> _l4 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> _l5 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> _l6 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> _l7 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token comment">//   FUNC_PROLOGUE;</span>
  <span class="token keyword">int</span> _i0<span class="token punctuation">,</span> _i1<span class="token punctuation">,</span> _i2<span class="token punctuation">;</span>

  
  _l2 <span class="token operator">=</span> _p0<span class="token punctuation">;</span>
  _i0 <span class="token operator">=</span> _p1<span class="token punctuation">;</span>
  _i1 <span class="token operator">=</span> <span class="token number">1u</span><span class="token punctuation">;</span>
  _i0 <span class="token operator">-=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  _l4 <span class="token operator">=</span> _i0<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>_i0<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//   printf(&quot;i0 = %d\\n&quot;,_i0);</span>
    _L1<span class="token operator">:</span> 
    
      _i0 <span class="token operator">=</span> _l2<span class="token punctuation">;</span>
      _l3 <span class="token operator">=</span> _i0<span class="token punctuation">;</span>
      _i0 <span class="token operator">=</span> <span class="token number">0u</span><span class="token punctuation">;</span>
      _l6 <span class="token operator">=</span> _i0<span class="token punctuation">;</span>
      _i0 <span class="token operator">=</span> <span class="token number">10u</span><span class="token punctuation">;</span>
      _l7 <span class="token operator">=</span> _i0<span class="token punctuation">;</span>
      _L2<span class="token operator">:</span> 
    <span class="token comment">//   printf(&quot;i0 = %d\\n&quot;,_i0);</span>
        _i0 <span class="token operator">=</span> _l3<span class="token punctuation">;</span>
        _i1 <span class="token operator">=</span> <span class="token number">10u</span><span class="token punctuation">;</span>
        <span class="token comment">// _i0 = REM_U(_i0, _i1);  //有符号求余数</span>
        _i0 <span class="token operator">=</span> _i0 <span class="token operator">%</span> _i1<span class="token punctuation">;</span>
        _l5 <span class="token operator">=</span> _i0 <span class="token punctuation">;</span>
        _i0 <span class="token operator">=</span> _l3<span class="token punctuation">;</span>
        _i1 <span class="token operator">=</span> <span class="token number">10u</span><span class="token punctuation">;</span>
        <span class="token comment">// _i0 = DIV_U(_i0, _i1);  //向下整除</span>
        _i0 <span class="token operator">=</span> _i0 <span class="token operator">/</span> _i1<span class="token punctuation">;</span> 
        _l3 <span class="token operator">=</span> _i0<span class="token punctuation">;</span>
        _i0 <span class="token operator">=</span> _l5<span class="token punctuation">;</span>
        _i1 <span class="token operator">=</span> _l6<span class="token punctuation">;</span>
        _i0 <span class="token operator">=</span> <span class="token function">max</span><span class="token punctuation">(</span>_i0<span class="token punctuation">,</span> _i1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        _l6 <span class="token operator">=</span> _i0<span class="token punctuation">;</span>
        _i0 <span class="token operator">=</span> _l5<span class="token punctuation">;</span>
        _i1 <span class="token operator">=</span> _l7<span class="token punctuation">;</span>
        _i0 <span class="token operator">=</span> <span class="token function">min</span><span class="token punctuation">(</span>_i0<span class="token punctuation">,</span> _i1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        _l7 <span class="token operator">=</span> _i0<span class="token punctuation">;</span>
        _i0 <span class="token operator">=</span> _l3<span class="token punctuation">;</span>
        _i1 <span class="token operator">=</span> <span class="token number">0u</span><span class="token punctuation">;</span>
        _i0 <span class="token operator">=</span> _i0 <span class="token operator">&gt;</span> _i1<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>_i0<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token keyword">goto</span> _L2<span class="token punctuation">;</span><span class="token punctuation">}</span>
      _i0 <span class="token operator">=</span> _l2<span class="token punctuation">;</span>
      _i1 <span class="token operator">=</span> _l6<span class="token punctuation">;</span>
      _i2 <span class="token operator">=</span> _l7<span class="token punctuation">;</span>
      _i1 <span class="token operator">*=</span> _i2<span class="token punctuation">;</span>
      _i0 <span class="token operator">+=</span> _i1<span class="token punctuation">;</span>
      _l2 <span class="token operator">=</span> _i0<span class="token punctuation">;</span>
      _i0 <span class="token operator">=</span> _l4<span class="token punctuation">;</span>
      _i1 <span class="token operator">=</span> <span class="token number">1u</span><span class="token punctuation">;</span>
      _i0 <span class="token operator">-=</span> _i1<span class="token punctuation">;</span>
      _l4 <span class="token operator">=</span> _i0<span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>_i0<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token keyword">goto</span> _L1<span class="token punctuation">;</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  _i0 <span class="token operator">=</span> _l2<span class="token punctuation">;</span>
<span class="token comment">//   FUNC_EPILOGUE;</span>
  <span class="token keyword">return</span> _i0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span> <span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// int dd = _Run(211814391, 6301083);    </span>
    <span class="token comment">// printf(&quot;%s,%s&quot;,argv[1],argv[2]);</span>
    <span class="token keyword">int</span> dd <span class="token operator">=</span> <span class="token function">_Run</span><span class="token punctuation">(</span><span class="token function">atoi</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">atoi</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    
    <span class="token comment">//211814400</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d&quot;</span><span class="token punctuation">,</span>dd<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","teg争霸赛.html.vue"]]);export{k as default};
