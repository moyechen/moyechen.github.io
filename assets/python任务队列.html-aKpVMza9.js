import{_ as a,o as e,c as i,d}from"./app-CFIaTHNp.js";const n={},r=d(`<h1 id="任务队列" tabindex="-1"><a class="header-anchor" href="#任务队列" aria-hidden="true">#</a> 任务队列</h1><h1 id="流程" tabindex="-1"><a class="header-anchor" href="#流程" aria-hidden="true">#</a> 流程</h1><h2 id="最初版本" tabindex="-1"><a class="header-anchor" href="#最初版本" aria-hidden="true">#</a> 最初版本</h2><p>1.通过接口获取到今天的数据(.csv)</p><ol start="2"><li>执行程序</li></ol><h2 id="aps版本" tabindex="-1"><a class="header-anchor" href="#aps版本" aria-hidden="true">#</a> aps版本</h2><p>定义一个定时任务, 然后每天稳定拉取数据,到任务队列中, 程序读取此队列, 并将爬取结果保存到结果队列</p><h3 id="四个进程" tabindex="-1"><a class="header-anchor" href="#四个进程" aria-hidden="true">#</a> 四个进程</h3><ul><li>任务获取进程</li><li>爬虫进程</li><li>上传进程</li><li>监控进程</li></ul><h3 id="两个队列" tabindex="-1"><a class="header-anchor" href="#两个队列" aria-hidden="true">#</a> 两个队列</h3><ul><li>任务队列</li><li>结果队列</li></ul><p>这种方式看起来非常专业, 但是有时候临时需要跑一部分数据时, 就会很麻烦, 因此我想这在队列这里解决, 从python 自带的队列替换为 redis的list</p><h2 id="redis-版本" tabindex="-1"><a class="header-anchor" href="#redis-版本" aria-hidden="true">#</a> redis 版本</h2><p>在将python 的队列更改为redis 后, 我又编写了 redis_push.py , 可以手动将文件中的数据推送到redis 队列中, 非常的好用</p><p>但是过了周六周日两天后, 我发现 APScheduler 又出现了bug, 没有按时拉取数据, 我不由得怀疑这个库的稳定性 ,因此我又回到了crontab</p><h2 id="crontab-版本" tabindex="-1"><a class="header-anchor" href="#crontab-版本" aria-hidden="true">#</a> crontab 版本</h2><p>经过了近一个月, 多次的更改,我探究了最适合的方案</p><p>需要有以下几个优点</p><ul><li>可随时跑残缺数据 python run.py file</li><li>网站变化频繁, 只需修改spider 文件即可, 比较方便</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
- source_data/      原始数据
- aaa/   爬虫aaa
    --  spider.py  爬虫主体, 仅负责爬取数据
    --  main.py     读取文件, 解析数据, 上传数据等等
    --  data/        爬到的数据
- bbb/
    --  spider.py
    --  main.py     
    --  data/
- download_data.py  拉取原始数据, 使用crontab 例行化

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),s=[r];function l(t,h){return e(),i("div",null,s)}const o=a(n,[["render",l],["__file","python任务队列.html.vue"]]);export{o as default};
