import{_ as n,o as s,c as a,d as e}from"./app-CFIaTHNp.js";const t={},i=e(`<h1 id="python可变对象在sqlalchemy中的问题" tabindex="-1"><a class="header-anchor" href="#python可变对象在sqlalchemy中的问题" aria-hidden="true">#</a> python可变对象在sqlalchemy中的问题</h1><h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h2><p>sqlalchemy 在处理可变对象时，如果可变对象地址没有变化，不会触发更新</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
repo <span class="token operator">=</span> session_maker

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">test_edit_fields</span><span class="token punctuation">(</span>
    self<span class="token punctuation">,</span> engine<span class="token punctuation">,</span>init_app_page_extractions
<span class="token punctuation">)</span><span class="token punctuation">:</span>
    repo <span class="token operator">=</span> container<span class="token punctuation">.</span>repo<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">async</span> <span class="token keyword">with</span> repo<span class="token punctuation">.</span>new_session<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> session<span class="token punctuation">,</span> session<span class="token punctuation">.</span>begin<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        result <span class="token operator">=</span> <span class="token keyword">await</span> repo<span class="token punctuation">.</span>session<span class="token punctuation">.</span>execute<span class="token punctuation">(</span>select<span class="token punctuation">(</span>PageCommandOrm<span class="token punctuation">)</span><span class="token punctuation">)</span>
        pages <span class="token operator">=</span> result<span class="token punctuation">.</span>scalars<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token builtin">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> row <span class="token keyword">in</span> pages<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span>row<span class="token punctuation">.</span>edit_fields<span class="token punctuation">)</span>
            row<span class="token punctuation">.</span>edit_fields<span class="token punctuation">[</span><span class="token string">&quot;ff&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>


        repo<span class="token punctuation">.</span>session<span class="token punctuation">.</span>add_all<span class="token punctuation">(</span>pages<span class="token punctuation">)</span>

    <span class="token keyword">async</span> <span class="token keyword">with</span> repo<span class="token punctuation">.</span>new_session<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> session<span class="token punctuation">,</span> session<span class="token punctuation">.</span>begin<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        session<span class="token punctuation">.</span>flush<span class="token punctuation">(</span><span class="token punctuation">)</span>
        result <span class="token operator">=</span> <span class="token keyword">await</span> repo<span class="token punctuation">.</span>session<span class="token punctuation">.</span>execute<span class="token punctuation">(</span>select<span class="token punctuation">(</span>PageCommandOrm<span class="token punctuation">)</span><span class="token punctuation">)</span>
        pages <span class="token operator">=</span> result<span class="token punctuation">.</span>scalars<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token builtin">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> row <span class="token keyword">in</span> pages<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span>row<span class="token punctuation">.</span>edit_fields<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{}
{}
{}
{}
{}
{}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，<code>row.edit_fields[&quot;ff&quot;] = 1</code> 这样的操作不会修改edit_fields 这个变量的地址，因此sqlalchemy认为未修改该字段，不会更新该字段</p><p>而<code>row.edit_fields = {&quot;ff&quot;:1}</code> 修改了，触发了更新</p><h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h2><p>使用官方提供的方法<code>flag_modified</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from sqlalchemy.orm.attributes import flag_modified

async def test_edit_fields(
    self, engine, init_app_page_extractions
):
    
    repo = container.repo()
    async with repo.new_session() as session, session.begin():
        result = await repo.session.execute(select(PageCommandOrm))
        pages = result.scalars().all()
        for row in pages:
            print(row.edit_fields)
            row.edit_fields[&quot;ff&quot;] = 1
            flag_modified(row, &quot;edit_fields&quot;) # 标记该字段需更新
           

        repo.session.add_all(pages)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),p=[i];function o(c,l){return s(),a("div",null,p)}const d=n(t,[["render",o],["__file","python可变对象在sqlalchemy中的问题.html.vue"]]);export{d as default};
