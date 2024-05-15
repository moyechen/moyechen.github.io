import{_ as n,o as s,c as a,d as e}from"./app-CFIaTHNp.js";const t={},p=e(`<h1 id="django" tabindex="-1"><a class="header-anchor" href="#django" aria-hidden="true">#</a> django</h1><p>作者：PegasusWang 链接：https://www.zhihu.com/question/56472691/answer/292510026 来源：知乎 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</p><p>简单的说就是服务端监听 每次 accept 一个新的请求后，开一个处理 这个 socket 客户连接。如果你对底层实现原理感兴趣，可以继续看下去，从 socket 编程的角度来解释多线程 server。最后附上一个异步框架工作过程的视频讲解。这里我们自己撸一个简单的多线程 wsgi server 来看下原理，还是需要深入源码和 socket 编程你才能真正理解。 我们从 python 自带的一个 wsgi server 看下如何实现多线程处理请求。首先你需要熟悉下 wsgi。 看一个最简单的 wsgi app：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">#!/usr/bin/env python</span>
<span class="token comment"># -*- coding:utf-8 -*-</span>


<span class="token keyword">def</span> <span class="token function">application</span><span class="token punctuation">(</span>environ<span class="token punctuation">,</span> start_response<span class="token punctuation">)</span><span class="token punctuation">:</span>
    status <span class="token operator">=</span> <span class="token string">&#39;200 OK&#39;</span>
    headers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token string">&#39;Content-Type&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;text/html; charset=utf8&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>

    start_response<span class="token punctuation">(</span>status<span class="token punctuation">,</span> headers<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string">b&quot;&lt;h1&gt;Hello&lt;/h1&gt;&quot;</span><span class="token punctuation">]</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    <span class="token keyword">from</span> wsgiref<span class="token punctuation">.</span>simple_server <span class="token keyword">import</span> make_server
    httpd <span class="token operator">=</span> make_server<span class="token punctuation">(</span><span class="token string">&#39;127.0.0.1&#39;</span><span class="token punctuation">,</span> <span class="token number">8000</span><span class="token punctuation">,</span> application<span class="token punctuation">)</span>
    httpd<span class="token punctuation">.</span>serve_forever<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后用你的开发工具跟进去 make_server 这个函数，看下它的定义：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># lib/python2.7/wsgiref/simple_server.py</span>

<span class="token keyword">def</span> <span class="token function">make_server</span><span class="token punctuation">(</span>
    host<span class="token punctuation">,</span> port<span class="token punctuation">,</span> app<span class="token punctuation">,</span> server_class<span class="token operator">=</span>WSGIServer<span class="token punctuation">,</span> handler_class<span class="token operator">=</span>WSGIRequestHandler
<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;Create a new WSGI server listening on \`host\` and \`port\` for \`app\`&quot;&quot;&quot;</span>
    server <span class="token operator">=</span> server_class<span class="token punctuation">(</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">,</span> handler_class<span class="token punctuation">)</span>
    server<span class="token punctuation">.</span>set_app<span class="token punctuation">(</span>app<span class="token punctuation">)</span>
    <span class="token keyword">return</span> server

<span class="token keyword">class</span> <span class="token class-name">WSGIServer</span><span class="token punctuation">(</span>HTTPServer<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token triple-quoted-string string">&quot;&quot;&quot;BaseHTTPServer that implements the Python WSGI protocol&quot;&quot;&quot;</span>

    application <span class="token operator">=</span> <span class="token boolean">None</span>

    <span class="token keyword">def</span> <span class="token function">server_bind</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Override server_bind to store the server name.&quot;&quot;&quot;</span>
        HTTPServer<span class="token punctuation">.</span>server_bind<span class="token punctuation">(</span>self<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>setup_environ<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">setup_environ</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># Set up base environment</span>
        env <span class="token operator">=</span> self<span class="token punctuation">.</span>base_environ <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        env<span class="token punctuation">[</span><span class="token string">&#39;SERVER_NAME&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> self<span class="token punctuation">.</span>server_name
        env<span class="token punctuation">[</span><span class="token string">&#39;GATEWAY_INTERFACE&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;CGI/1.1&#39;</span>
        env<span class="token punctuation">[</span><span class="token string">&#39;SERVER_PORT&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>server_port<span class="token punctuation">)</span>
        env<span class="token punctuation">[</span><span class="token string">&#39;REMOTE_HOST&#39;</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&#39;&#39;</span>
        env<span class="token punctuation">[</span><span class="token string">&#39;CONTENT_LENGTH&#39;</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&#39;&#39;</span>
        env<span class="token punctuation">[</span><span class="token string">&#39;SCRIPT_NAME&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>

    <span class="token keyword">def</span> <span class="token function">get_app</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>application

    <span class="token keyword">def</span> <span class="token function">set_app</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span>application<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>application <span class="token operator">=</span> application
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看到这个 WSGIServer 定义了吗，继承了一个 HttpServer。我们再继续追一下其定义：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># lib/python2.7/BaseHTTPServer.py</span>

<span class="token keyword">class</span> <span class="token class-name">HTTPServer</span><span class="token punctuation">(</span>SocketServer<span class="token punctuation">.</span>TCPServer<span class="token punctuation">)</span><span class="token punctuation">:</span>

    allow_reuse_address <span class="token operator">=</span> <span class="token number">1</span>    <span class="token comment"># Seems to make sense in testing environment</span>

    <span class="token keyword">def</span> <span class="token function">server_bind</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Override server_bind to store the server name.&quot;&quot;&quot;</span>
        SocketServer<span class="token punctuation">.</span>TCPServer<span class="token punctuation">.</span>server_bind<span class="token punctuation">(</span>self<span class="token punctuation">)</span>
        host<span class="token punctuation">,</span> port <span class="token operator">=</span> self<span class="token punctuation">.</span>socket<span class="token punctuation">.</span>getsockname<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span>
        self<span class="token punctuation">.</span>server_name <span class="token operator">=</span> socket<span class="token punctuation">.</span>getfqdn<span class="token punctuation">(</span>host<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>server_port <span class="token operator">=</span> port
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到这里，我们继续追，看到 TcpServer 定义:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># lib/python2.7/SocketServer.py</span>

<span class="token keyword">class</span> <span class="token class-name">TCPServer</span><span class="token punctuation">(</span>BaseServer<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;这里我省略了定义&quot;&quot;&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你还可以发现一个 ThreadingTCPServer 类：我们看下它的定义</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">ThreadingTCPServer</span><span class="token punctuation">(</span>ThreadingMixIn<span class="token punctuation">,</span> TCPServer<span class="token punctuation">)</span><span class="token punctuation">:</span> 
    <span class="token keyword">pass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>好了，怎么多线程处理请求呢？看下这个 ThreadingMixIn 类是如何实现的:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">ThreadingMixIn</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;Mix-in class to handle each request in a new thread.&quot;&quot;&quot;</span>

    <span class="token comment"># Decides how threads will act upon termination of the</span>
    <span class="token comment"># main process</span>
    daemon_threads <span class="token operator">=</span> <span class="token boolean">False</span>

    <span class="token keyword">def</span> <span class="token function">process_request_thread</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> request<span class="token punctuation">,</span> client_address<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Same as in BaseServer but as a thread.

        In addition, exception handling is done here.

        &quot;&quot;&quot;</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>finish_request<span class="token punctuation">(</span>request<span class="token punctuation">,</span> client_address<span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>shutdown_request<span class="token punctuation">(</span>request<span class="token punctuation">)</span>
        <span class="token keyword">except</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>handle_error<span class="token punctuation">(</span>request<span class="token punctuation">,</span> client_address<span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>shutdown_request<span class="token punctuation">(</span>request<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">process_request</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> request<span class="token punctuation">,</span> client_address<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Start a new thread to process the request.&quot;&quot;&quot;</span>
        t <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target <span class="token operator">=</span> self<span class="token punctuation">.</span>process_request_thread<span class="token punctuation">,</span>
                             args <span class="token operator">=</span> <span class="token punctuation">(</span>request<span class="token punctuation">,</span> client_address<span class="token punctuation">)</span><span class="token punctuation">)</span>
        t<span class="token punctuation">.</span>daemon <span class="token operator">=</span> self<span class="token punctuation">.</span>daemon_threads
        t<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看到吗，其实就是对于每个新请求，会启动一个新的线程来处理 socket 请求。假如让我们自己实现一个多线程 socket server 应该怎么实现呢？先来写一个简单的单线程 socker echo server:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> socket <span class="token keyword">import</span> <span class="token operator">*</span>  <span class="token comment"># 偷懒这么写</span>
s <span class="token operator">=</span> socket<span class="token punctuation">(</span>AF_INET<span class="token punctuation">,</span> SOCK_STREAM<span class="token punctuation">)</span>
s<span class="token punctuation">.</span>bind<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token number">9000</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
s<span class="token punctuation">.</span>listen<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
    c<span class="token punctuation">,</span> a <span class="token operator">=</span> s<span class="token punctuation">.</span>accept<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span> <span class="token string">&quot;Received connection from&quot;</span><span class="token punctuation">,</span> a
    c<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token string">&quot;Hello %s\\\\n&quot;</span> <span class="token operator">%</span> a<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    c<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以用telnet之类的工具连上该端口看效果。 这样一次只能处理一个请求，如果想每次来一个请求用一个线程处理呢？我们可以这样做：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> threading
<span class="token keyword">from</span> socket <span class="token keyword">import</span> <span class="token operator">*</span>

<span class="token keyword">def</span> <span class="token function">handle_client</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 处理 client 请求</span>
    c<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token string">&quot;Hello\\n&quot;</span><span class="token punctuation">)</span>
    c<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span>

s <span class="token operator">=</span> socket<span class="token punctuation">(</span>AF_INET<span class="token punctuation">,</span> SOCK_STREAM<span class="token punctuation">)</span>
s<span class="token punctuation">.</span>bind<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token number">9000</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
s<span class="token punctuation">.</span>listen<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
    c<span class="token punctuation">,</span> a <span class="token operator">=</span> s<span class="token punctuation">.</span>accept<span class="token punctuation">(</span><span class="token punctuation">)</span>
    t <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>handle_client<span class="token punctuation">,</span>
                         args<span class="token operator">=</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是不是很简单，这其实就是多线程工作的原理，每次 accept 得到一个新的客户端请求以后开一个线程去处理。当然 socket 编程还是偏底层，我们刚才看到了 python 提供了 SocketServer 模块来简化 socket 编程。我们使用 SocketServer 模块来发送数据：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> SocketServer
<span class="token keyword">import</span> time

<span class="token keyword">class</span> <span class="token class-name">TimeHandler</span><span class="token punctuation">(</span>SocketServer<span class="token punctuation">.</span>BaseRequestHandler<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">handle</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># self.request 是一个 client socket 对象</span>
        self<span class="token punctuation">.</span>request<span class="token punctuation">.</span>sendall<span class="token punctuation">(</span><span class="token punctuation">.</span>ctime<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span>

serv <span class="token operator">=</span> SocketServer<span class="token punctuation">.</span>TCPServer<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token number">8889</span><span class="token punctuation">)</span><span class="token punctuation">,</span> TimeHandler<span class="token punctuation">)</span>
serv<span class="token punctuation">.</span>serve_forever<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它的执行原理是这样的：server 等待请求到来对每个 socket 连接，server 创建一个新的 handler 类handle() 方法调用处理 client socket 对象，比如发送数据handle() 方法返回后，连接关闭，同时 handler 实例对象销毁但是这个 server 的处理能力很差，一次只能处理一个请求，我们看下这个模块提供了几个类：TCPServer: 同步的 tcp serverForkingTCPServer: 多进程 tcp serverThreadingTCPServer: 多线程 tcp server怎么实现一个多线程 tcp server 呢？很简单：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 改成 ThreadingTCPServer 就行了，代码其他部分不动</span>
serv <span class="token operator">=</span> SocketServer<span class="token punctuation">.</span>ThreadingTCPServer<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span><span class="token number">8000</span><span class="token punctuation">)</span><span class="token punctuation">,</span>TimeHandler<span class="token punctuation">)</span>
serv<span class="token punctuation">.</span>serve_forever<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样一来，新的请求就能被新的线程去处理了。我们就通过线程来增强了并发能力，当然线程开销比较大，不如用协程(抽空会写个用协程实现异步的socker server）。 如果你浏览该模块，还能看到两个 Mixin:ForkingMixinThreadingMixIn我们只要继承它们就很容易实现一个多进程或者多线程的 server，比如实现一个多线程的 HTTPServerfrom BaseHTTPServer</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> HTTPServer
<span class="token keyword">from</span> SimpleHTTPServer <span class="token keyword">import</span> SimpleHTTPRequestHandler
<span class="token keyword">from</span> SocketServer <span class="token keyword">import</span> ThreadingMixIn

<span class="token keyword">class</span> <span class="token class-name">ThreadedHTTPServer</span><span class="token punctuation">(</span>ThreadingMixIn<span class="token punctuation">,</span> HTTPServer<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">pass</span>

serv <span class="token operator">=</span> ThreadedHTTPServer<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">,</span> SimpleHTTPRequestHandler<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好了，看了这么多让我们改造下 Python 自带的 wsgi server 为多线程的：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token keyword">import</span> SocketServer
<span class="token keyword">import</span> socket
<span class="token keyword">from</span> SimpleHTTPServer <span class="token keyword">import</span> SimpleHTTPRequestHandler
<span class="token keyword">from</span> SocketServer <span class="token keyword">import</span> ThreadingMixIn


<span class="token keyword">class</span> <span class="token class-name">HTTPServer</span><span class="token punctuation">(</span>SocketServer<span class="token punctuation">.</span>TCPServer<span class="token punctuation">)</span><span class="token punctuation">:</span>

    allow_reuse_address <span class="token operator">=</span> <span class="token number">1</span>    <span class="token comment"># Seems to make sense in testing environment</span>

    <span class="token keyword">def</span> <span class="token function">server_bind</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Override server_bind to store the server name.&quot;&quot;&quot;</span>
        SocketServer<span class="token punctuation">.</span>TCPServer<span class="token punctuation">.</span>server_bind<span class="token punctuation">(</span>self<span class="token punctuation">)</span>
        host<span class="token punctuation">,</span> port <span class="token operator">=</span> self<span class="token punctuation">.</span>socket<span class="token punctuation">.</span>getsockname<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span>
        self<span class="token punctuation">.</span>server_name <span class="token operator">=</span> socket<span class="token punctuation">.</span>getfqdn<span class="token punctuation">(</span>host<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>server_port <span class="token operator">=</span> port


<span class="token keyword">class</span> <span class="token class-name">ThreadedHTTPServer</span><span class="token punctuation">(</span>ThreadingMixIn<span class="token punctuation">,</span> HTTPServer<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">pass</span>


<span class="token keyword">class</span> <span class="token class-name">ThreadWSGIServer</span><span class="token punctuation">(</span>ThreadedHTTPServer<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token triple-quoted-string string">&quot;&quot;&quot;BaseHTTPServer that implements the Python WSGI protocol&quot;&quot;&quot;</span>

    application <span class="token operator">=</span> <span class="token boolean">None</span>

    <span class="token keyword">def</span> <span class="token function">server_bind</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Override server_bind to store the server name.&quot;&quot;&quot;</span>
        HTTPServer<span class="token punctuation">.</span>server_bind<span class="token punctuation">(</span>self<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>setup_environ<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">setup_environ</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># Set up base environment</span>
        env <span class="token operator">=</span> self<span class="token punctuation">.</span>base_environ <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        env<span class="token punctuation">[</span><span class="token string">&#39;SERVER_NAME&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> self<span class="token punctuation">.</span>server_name
        env<span class="token punctuation">[</span><span class="token string">&#39;GATEWAY_INTERFACE&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;CGI/1.1&#39;</span>
        env<span class="token punctuation">[</span><span class="token string">&#39;SERVER_PORT&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>server_port<span class="token punctuation">)</span>
        env<span class="token punctuation">[</span><span class="token string">&#39;REMOTE_HOST&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
        env<span class="token punctuation">[</span><span class="token string">&#39;CONTENT_LENGTH&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
        env<span class="token punctuation">[</span><span class="token string">&#39;SCRIPT_NAME&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>

    <span class="token keyword">def</span> <span class="token function">get_app</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>application

    <span class="token keyword">def</span> <span class="token function">set_app</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> application<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>application <span class="token operator">=</span> application


<span class="token keyword">def</span> <span class="token function">application</span><span class="token punctuation">(</span>environ<span class="token punctuation">,</span> start_response<span class="token punctuation">)</span><span class="token punctuation">:</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>    <span class="token comment"># 注意这里的 sleep</span>
    status <span class="token operator">=</span> <span class="token string">&#39;200 OK&#39;</span>
    headers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token string">&#39;Content-Type&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;text/html; charset=utf8&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>

    start_response<span class="token punctuation">(</span>status<span class="token punctuation">,</span> headers<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string">b&quot;&lt;h1&gt;Hello&lt;/h1&gt;&quot;</span><span class="token punctuation">]</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    <span class="token keyword">from</span> wsgiref<span class="token punctuation">.</span>simple_server <span class="token keyword">import</span> make_server
    httpd <span class="token operator">=</span> make_server<span class="token punctuation">(</span><span class="token string">&#39;127.0.0.1&#39;</span><span class="token punctuation">,</span> <span class="token number">8000</span><span class="token punctuation">,</span> application<span class="token punctuation">,</span> server_class<span class="token operator">=</span>ThreadWSGIServer<span class="token punctuation">)</span>
    httpd<span class="token punctuation">.</span>serve_forever<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对了，我们怎么证明这个真是多线程的 wsgi server 了呢，很简单。你看我加了个 sleep(10)。 如果你在之前的单线程 wsgi server 跑，你可以开俩个终端去 curl，curl 完一个赶紧切到另一个 curl 。 单线程你会发现几乎是 10 + 10 秒，但是下边这个多线程 wsgi server 你会发现大概只用10秒，两个请求是并发的(当然我这种测试很 low，你可以随便用一个网络测试工具）。虽然我没看过 django wsgi server 的实现，但是它自己实现的开发服务器原理应该是类似的。如果你能坚持看到这里，是更明白了呢还是更懵了呢？你可以看下PegasusWang/notebooks 这个是手撸 web 框架的教程，看完你就对 wsgi，如何自己写 框架以及 gunicorn 部署有点概念了。最近在学习异步框架的工作原理，感兴趣可以看看，之后还会出个协程版本的。</p><blockquote><p>https://zhuanlan.zhihu.com/p/42044997</p></blockquote>`,28),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","django.html.vue"]]);export{r as default};
