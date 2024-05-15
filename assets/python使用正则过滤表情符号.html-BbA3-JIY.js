import{_ as e,o as n,c as u,d as i}from"./app-CFIaTHNp.js";const s={},t=i(`<h1 id="python使用正则过滤表情符号" tabindex="-1"><a class="header-anchor" href="#python使用正则过滤表情符号" aria-hidden="true">#</a> python使用正则过滤表情符号</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>def remove_emojis(data):
    emoj = re.compile(&quot;[&quot;
        u&quot;\\U0001F600-\\U0001F64F&quot;  # emoticons
        u&quot;\\U0001F300-\\U0001F5FF&quot;  # symbols &amp; pictographs
        u&quot;\\U0001F680-\\U0001F6FF&quot;  # transport &amp; map symbols
        u&quot;\\U0001F1E0-\\U0001F1FF&quot;  # flags (iOS)
        # u&quot;\\U00002500-\\U00002BEF&quot;  # chinese char
        u&quot;\\U00002702-\\U000027B0&quot;
        u&quot;\\U00002702-\\U000027B0&quot;
        # u&quot;\\U000024C2-\\U0001F251&quot; //中文
        u&quot;\\U0001f926-\\U0001f937&quot;
        u&quot;\\U00010000-\\U0010ffff&quot;
        u&quot;\\u2640-\\u2642&quot; 
        u&quot;\\u2600-\\u2B55&quot;
        u&quot;\\u200d&quot;
        u&quot;\\u23cf&quot;
        u&quot;\\u23e9&quot;
        u&quot;\\u231a&quot;
        u&quot;\\ufe0f&quot;  # dingbats
        u&quot;\\u3030&quot;
                      &quot;]+&quot;, re.UNICODE)
    return re.sub(emoj, &#39;&#39;, data)


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),d=[t];function o(l,a){return n(),u("div",null,d)}const v=e(s,[["render",o],["__file","python使用正则过滤表情符号.html.vue"]]);export{v as default};
