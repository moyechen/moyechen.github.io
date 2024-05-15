import{_ as e,o as i,c as t,d as s}from"./app-CFIaTHNp.js";const n={},a=s(`<h1 id="ffmpeg" tabindex="-1"><a class="header-anchor" href="#ffmpeg" aria-hidden="true">#</a> ffmpeg</h1><p>接入监控系统后， 就需要对这些视频做一定的处理，水星安防app提供的云服务有事件录像、人形识别等功能，大概一年90元， 我们肯定是不会掏这个钱的，所以就需要自己处理</p><h2 id="第一个应用-制作延时摄像" tabindex="-1"><a class="header-anchor" href="#第一个应用-制作延时摄像" aria-hidden="true">#</a> 第一个应用 制作延时摄像</h2><ol><li>从每日的太阳升起到日落，将越12小时的视频，快进到10分钟左右</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ffmpeg  -hwaccel auto -i /Users/teletraan/Downloads/2023-10-10T11-15-01.mp4 -c:v libx265  -vf &quot;setpts=0.02*PTS,scale=640:-1,fps=15&quot; -b:v 500K -an -ss 00:00:00 -t 00:01:00 output.mp4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于我们录像机设置的最大是15分钟，所以还需要拼接一下</p><p>15分钟要102秒，那么12小时就是4×102s×12 =</p><blockquote><p>优化，直接用copy，就不用重新编码了</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ffmpeg  -hwaccel auto -i /Users/teletraan/Downloads/2023-10-10T11-15-01.mp4 -c:v copy  -vf &quot;setpts=0.02*PTS,scale=640:-1,fps=15&quot; -b:v 500K -an -ss 00:00:00 -t 00:01:00 output.mp4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote><p>错误的，改了码率，不能这么搞</p><p>windows 将一个目录下的所有图片剪辑为视频</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@echo off
setlocal enabledelayedexpansion

set &quot;input_folder=%~dp0&quot;
set &quot;output_file=output.mp4&quot;
set &quot;framerate=30&quot;
set &quot;codec=hevc_qsv&quot;
set &quot;pix_fmt=yuv420p&quot;
set &quot;filelist=filelist.txt&quot;
set &quot;input_files=&quot;
(for %%i in (&quot;*.jpg&quot;) do (
  echo file &#39;%%i&#39;
)) &gt; &quot;%filelist%&quot;



e:/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe -f concat -safe 0 -i  &quot;%filelist%&quot;  -framerate %framerate% -c:v %codec% -pix_fmt %pix_fmt% &quot;%output_file%&quot;

pause

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),l=[a];function d(u,o){return i(),t("div",null,l)}const r=e(n,[["render",d],["__file","ffmpeg.html.vue"]]);export{r as default};
