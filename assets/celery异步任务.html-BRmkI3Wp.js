import{_ as n,o as s,c as e,d as a}from"./app-CFIaTHNp.js";const t={},i=a(`<h1 id="celery异步任务" tabindex="-1"><a class="header-anchor" href="#celery异步任务" aria-hidden="true">#</a> celery异步任务</h1><p>在使用celery时，需要控制异步任务</p><p>任务终止有多种情况</p><ul><li>任务内部错误</li><li>celery被杀死</li><li>手动结束任务（通过celery控制）</li></ul><p>这些需要我们特殊注意</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token decorator annotation punctuation">@shared_task</span><span class="token punctuation">(</span>ignore_result<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> time_limit<span class="token operator">=</span><span class="token number">3600</span><span class="token operator">*</span><span class="token number">24</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">scan</span><span class="token punctuation">(</span>task_id<span class="token punctuation">,</span> report_id<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">handle_stop</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">pass</span> 
        <span class="token comment"># 这里如果需要修改任务状态，则一定需要判断任务是否已结束，</span>
        <span class="token comment"># 停止任务之后保留任务记录,</span>
        <span class="token comment"># 杀死celery会走这里(SIGQUIT), 然后celery给该进程发送指令</span>
        <span class="token comment"># bug：任务已完成，但是celery进程还在，那么退出celery仍旧会执行handle_stop,因此需要在stop中增加对任务状态的判断。</span>
        <span class="token comment"># 如果机器断电，肯定走不到这里，所以需要在启动django的时候，将所有运行中的任务修改为失败</span>

    signal<span class="token punctuation">.</span>signal<span class="token punctuation">(</span>signal<span class="token punctuation">.</span>SIGTERM<span class="token punctuation">,</span> handle_stop<span class="token punctuation">)</span> <span class="token comment"># 这里注册是对整个celery worker生效，因此</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        openvas_scan<span class="token punctuation">(</span>task_id<span class="token punctuation">,</span> report_id<span class="token punctuation">)</span>
    <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
        <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;/home/bolean/logs/vulscan.los&quot;</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&#39;utf8&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
            f<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&quot;漏洞扫描任务_{}_{}异常结束：handle_stop but in try except\\n&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>task_id<span class="token punctuation">,</span> report_id<span class="token punctuation">)</span><span class="token punctuation">)</span>
        logger<span class="token punctuation">.</span>warning<span class="token punctuation">(</span><span class="token string">&quot;handle_stop, but in try except&quot;</span><span class="token punctuation">)</span>
        handle_stop<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="异步任务prefork-gevent的选择" tabindex="-1"><a class="header-anchor" href="#异步任务prefork-gevent的选择" aria-hidden="true">#</a> 异步任务prefork gevent的选择</h3><p>使用gevent时，遇到问题</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
Traceback (most recent call last):
  File &quot;/mnt/bolean/venv/lib/python3.10/site-packages/celery/app/trace.py&quot;, line 451, in trace_task
    R = retval = fun(*args, **kwargs)
  File &quot;/mnt/bolean/venv/lib/python3.10/site-packages/celery/app/trace.py&quot;, line 734, in __protected_call__
    return self.run(*args, **kwargs)
  File &quot;/mnt/bolean/sdp-backend/fuzz_testing/tasks.py&quot;, line 496, in task_test_case_result
    test_case_obj = FuzzTestingTestCase.objects.get(id=test_case_id)
  File &quot;/mnt/bolean/venv/lib/python3.10/site-packages/django/db/models/manager.py&quot;, line 85, in manager_method
    return getattr(self.get_queryset(), name)(*args, **kwargs)
  File &quot;/mnt/bolean/venv/lib/python3.10/site-packages/django/db/models/query.py&quot;, line 492, in get
    num = len(clone)
  File &quot;/mnt/bolean/venv/lib/python3.10/site-packages/django/db/models/query.py&quot;, line 302, in __len__
    self._fetch_all()
  File &quot;/mnt/bolean/venv/lib/python3.10/site-packages/django/db/models/query.py&quot;, line 1507, in _fetch_all
    self._result_cache = list(self._iterable_class(self))
  File &quot;/mnt/bolean/venv/lib/python3.10/site-packages/django/db/models/query.py&quot;, line 57, in __iter__
    results = compiler.execute_sql(
  File &quot;/mnt/bolean/venv/lib/python3.10/site-packages/django/db/models/sql/compiler.py&quot;, line 1359, in execute_sql
    cursor = self.connection.cursor()
  File &quot;/mnt/bolean/venv/lib/python3.10/site-packages/django/utils/asyncio.py&quot;, line 24, in inner
    raise SynchronousOnlyOperation(message)
django.core.exceptions.SynchronousOnlyOperation: You cannot call this from an async context - use a thread or sync_to_async.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说FuzzTestingTestCase.objects.get(id=test_case_id) 这个不能在gevent下执行</p><p>但是 这样的命令时可以执行的 <code>models.Host.objects.filter(id=host_id, status=VulHostStatus.RUNNING.value).exists()</code></p>`,11),l=[i];function o(c,p){return s(),e("div",null,l)}const r=n(t,[["render",o],["__file","celery异步任务.html.vue"]]);export{r as default};
