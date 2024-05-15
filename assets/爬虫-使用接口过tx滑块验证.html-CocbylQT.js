import{_ as n,o as s,c as a,d as t}from"./app-CFIaTHNp.js";const e="/assets/20200901183418861_6495-BtNbziKQ.png",p="/assets/20200901183528812_6549-eiG_IOC-.png",o="/assets/20200901193852676_25722-y4fZKSML.png",i="/assets/20200901183708535_18118-LdmqeBgr.png",c="/assets/20200901183832304_18855-BNXVTvdm.png",l={},u=t('<h1 id="使用接口过tx滑块验证" tabindex="-1"><a class="header-anchor" href="#使用接口过tx滑块验证" aria-hidden="true">#</a> 使用接口过tx滑块验证</h1><blockquote><p>使用的接口 https://www.notion.so/T-X-HTTP-637bca0458704724a5692a0e283ff5aa</p></blockquote><blockquote><p>过验证码场景: 富途 https://passport.futunn.com/?target=https%3A%2F%2Fsetup2.futu5.com%2F&amp;lang=zh-cn</p></blockquote><p><img src="'+e+'" alt=""></p><h3 id="_0x00-抓包分析" tabindex="-1"><a class="header-anchor" href="#_0x00-抓包分析" aria-hidden="true">#</a> 0x00 抓包分析</h3><p>首先我们手动操作一波, 发现三个和验证码有关的请求 <img src="'+p+'" alt=""></p><ul><li><p>其中第一个是用来展示验证码的, 抓包可以得到aid</p></li><li><p><img src="'+o+'" alt=""></p></li><li><p>第二个则是我们将滑块滑倒尾端后发出的验证请求, 如果成功则可以得到<code>ticket</code>和<code>randstr</code></p></li></ul><p><img src="'+i+'" alt="ticket和randstr"></p><ul><li>接着是注册账号时发送短信验证码的请求, 可以看到里面有上个请求获取到的<code>ticket</code>和<code>randstr</code>字段 <img src="'+c+`" alt=""></li></ul><p>也就是说, 只要获取到ticket 等信息, 就可以发送短信验证码</p><h3 id="_0x01-获取ticket和randstr" tabindex="-1"><a class="header-anchor" href="#_0x01-获取ticket和randstr" aria-hidden="true">#</a> 0x01 获取ticket和randstr</h3><p>以下代码是对api的进一步封装</p><blockquote><p>用到的接口: https://www.notion.so/T-X-HTTP-637bca0458704724a5692a0e283ff5aa</p></blockquote><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
<span class="token keyword">def</span> <span class="token function">get_ticket</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">dict</span><span class="token punctuation">:</span>
    <span class="token keyword">import</span> json
    <span class="token keyword">import</span> time
    <span class="token keyword">import</span> requests
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    返回可过验证码的ticket和randstr
    :return:
    {&quot;ticket&quot;:&quot;t039_9QCC5xXgpqgLzf2a3PsLAiF2mWGTo9NuFTGKnifb1Xp42wUqn5JUQ-XrAwsNLg4M3fvoZ-cQnCuXVKcDX5nOsPbozWMeQ_&quot;,&quot;randstr&quot;:&quot;@qHZ&quot;}
    &quot;&quot;&quot;</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;需要人机验证,获取中~&quot;</span><span class="token punctuation">)</span>

    aid <span class="token operator">=</span> <span class="token string">&quot;2081701200&quot;</span> <span class="token comment"># 替换为你的aid</span>
    user <span class="token operator">=</span> <span class="token string">&quot;******&quot;</span>
    password <span class="token operator">=</span> <span class="token string">&quot;******&quot;</span>

    session <span class="token operator">=</span> requests<span class="token punctuation">.</span>session<span class="token punctuation">(</span><span class="token punctuation">)</span>

    url <span class="token operator">=</span> <span class="token string">&quot;http://gengduo.me/api/v1/alihd/wstask_tengx?aid={}&amp;servertype=1&amp;refer=&amp;newtype=1&amp;cap_cd=&amp;asig=&amp;user={}&amp;pass={}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>
        aid<span class="token punctuation">,</span>
        user<span class="token punctuation">,</span> password<span class="token punctuation">)</span>

    <span class="token comment"># 尝试三次, 获取任务ID</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            res <span class="token operator">=</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">,</span> timeout<span class="token operator">=</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
        <span class="token keyword">except</span><span class="token punctuation">:</span>
            <span class="token keyword">pass</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>  <span class="token comment"># 成功则停止</span>
            <span class="token keyword">break</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>  <span class="token comment"># 均失败, 返回空</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token string">&quot;request_id&quot;</span> <span class="token keyword">in</span> res<span class="token punctuation">:</span>

        request_id <span class="token operator">=</span> res<span class="token punctuation">[</span><span class="token string">&quot;request_id&quot;</span><span class="token punctuation">]</span>

        url <span class="token operator">=</span> <span class="token string">&#39;http://gengduo.me/api/v1/alihd/wstask_result?request_id={request_id}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>request_id<span class="token operator">=</span>request_id<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
        <span class="token comment"># 轮询60次</span>
        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;&gt;&gt;&gt;&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
            <span class="token keyword">try</span><span class="token punctuation">:</span>
                res <span class="token operator">=</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">,</span> timeout<span class="token operator">=</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token keyword">print</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
            <span class="token keyword">except</span><span class="token punctuation">:</span>
                <span class="token keyword">continue</span>

            <span class="token keyword">if</span> <span class="token string">&quot;_status&quot;</span> <span class="token keyword">in</span> res <span class="token keyword">and</span> res<span class="token punctuation">[</span><span class="token string">&quot;_status&quot;</span><span class="token punctuation">]</span> <span class="token keyword">is</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
                <span class="token keyword">try</span><span class="token punctuation">:</span>
                    res_json <span class="token operator">=</span> json<span class="token punctuation">.</span>loads<span class="token punctuation">(</span>res<span class="token punctuation">[</span><span class="token string">&quot;_data&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                    ticket <span class="token operator">=</span> res_json<span class="token punctuation">[</span><span class="token string">&quot;data&quot;</span><span class="token punctuation">]</span>
                    <span class="token keyword">return</span> ticket
                <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
                    <span class="token keyword">print</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
            <span class="token keyword">elif</span> <span class="token string">&quot;_data&quot;</span> <span class="token keyword">in</span> res <span class="token keyword">and</span> <span class="token string">&quot;error&quot;</span> <span class="token keyword">in</span> <span class="token builtin">str</span><span class="token punctuation">(</span>res<span class="token punctuation">[</span><span class="token string">&quot;_data&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),r=[u];function d(k,v){return s(),a("div",null,r)}const b=n(l,[["render",d],["__file","爬虫-使用接口过tx滑块验证.html.vue"]]);export{b as default};
