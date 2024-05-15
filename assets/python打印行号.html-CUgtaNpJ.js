import{_ as n,o as s,c as a,d as t}from"./app-CFIaTHNp.js";const p={},e=t(`<h1 id="skill" tabindex="-1"><a class="header-anchor" href="#skill" aria-hidden="true">#</a> skill</h1><h3 id="python-打印行号" tabindex="-1"><a class="header-anchor" href="#python-打印行号" aria-hidden="true">#</a> python 打印行号</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> sys

<span class="token keyword">print</span><span class="token punctuation">(</span>sys<span class="token punctuation">.</span>_getframe<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>f_code<span class="token punctuation">.</span>co_name<span class="token punctuation">)</span>  <span class="token comment"># 当前函数名</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>sys<span class="token punctuation">.</span>_getframe<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>f_lineno<span class="token punctuation">)</span>  <span class="token comment"># 当前行号</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="python-获取当前脚本或其他模块的所有类" tabindex="-1"><a class="header-anchor" href="#python-获取当前脚本或其他模块的所有类" aria-hidden="true">#</a> python 获取当前脚本或其他模块的所有类</h3><blockquote><p>背景: 一个py文件里有40+个类, 需要创建实例并执行共有的run方法, 简单的方法是写40+行代码完成任务, 也可以通过python高阶函数使用</p></blockquote><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
<span class="token keyword">import</span> sys<span class="token punctuation">,</span> inspect


<span class="token keyword">def</span> <span class="token function">get_class</span><span class="token punctuation">(</span>current_module<span class="token punctuation">)</span><span class="token punctuation">:</span>
    cls <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;class:&quot;</span><span class="token punctuation">,</span>end<span class="token operator">=</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> name<span class="token punctuation">,</span> obj <span class="token keyword">in</span> inspect<span class="token punctuation">.</span>getmembers<span class="token punctuation">(</span>current_module<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> inspect<span class="token punctuation">.</span>isclass<span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> end<span class="token operator">=</span><span class="token string">&#39;,&#39;</span><span class="token punctuation">)</span>
            cls<span class="token punctuation">.</span>append<span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> cls


<span class="token keyword">class</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;current class:&quot;</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>__class__<span class="token punctuation">.</span>__name__<span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;current class:&quot;</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>__class__<span class="token punctuation">.</span>__name__<span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;current class:&quot;</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>__class__<span class="token punctuation">.</span>__name__<span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">D</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;current class:&quot;</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>__class__<span class="token punctuation">.</span>__name__<span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    current_module <span class="token operator">=</span> sys<span class="token punctuation">.</span>modules<span class="token punctuation">[</span>__name__<span class="token punctuation">]</span>  获取当前文件对象

    <span class="token keyword">for</span> cls <span class="token keyword">in</span> get_class<span class="token punctuation">(</span>current_module<span class="token punctuation">)</span><span class="token punctuation">:</span>
        cls<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>run<span class="token punctuation">(</span><span class="token punctuation">)</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class:A,B,C,D,
current class: A
current class: B
current class: C
current class: D

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),c=[e];function o(l,i){return s(),a("div",null,c)}const d=n(p,[["render",o],["__file","python打印行号.html.vue"]]);export{d as default};
