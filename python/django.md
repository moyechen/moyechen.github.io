# django
作者：PegasusWang
链接：https://www.zhihu.com/question/56472691/answer/292510026
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

简单的说就是服务端监听  每次 accept 一个新的请求后，开一个处理 这个 socket 客户连接。如果你对底层实现原理感兴趣，可以继续看下去，从 socket 编程的角度来解释多线程  server。最后附上一个异步框架工作过程的视频讲解。这里我们自己撸一个简单的多线程 wsgi server 来看下原理，还是需要深入源码和 socket 编程你才能真正理解。 我们从 python 自带的一个 wsgi server 看下如何实现多线程处理请求。首先你需要熟悉下 wsgi。 看一个最简单的 wsgi app：
```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-


def application(environ, start_response):
    status = '200 OK'
    headers = [('Content-Type', 'text/html; charset=utf8')]

    start_response(status, headers)
    return [b"<h1>Hello</h1>"]


if __name__ == '__main__':
    from wsgiref.simple_server import make_server
    httpd = make_server('127.0.0.1', 8000, application)
    httpd.serve_forever()
```
然后用你的开发工具跟进去 make_server 这个函数，看下它的定义：
```python
# lib/python2.7/wsgiref/simple_server.py

def make_server(
    host, port, app, server_class=WSGIServer, handler_class=WSGIRequestHandler
):
    """Create a new WSGI server listening on `host` and `port` for `app`"""
    server = server_class((host, port), handler_class)
    server.set_app(app)
    return server

class WSGIServer(HTTPServer):

    """BaseHTTPServer that implements the Python WSGI protocol"""

    application = None

    def server_bind(self):
        """Override server_bind to store the server name."""
        HTTPServer.server_bind(self)
        self.setup_environ()

    def setup_environ(self):
        # Set up base environment
        env = self.base_environ = {}
        env['SERVER_NAME'] = self.server_name
        env['GATEWAY_INTERFACE'] = 'CGI/1.1'
        env['SERVER_PORT'] = str(self.server_port)
        env['REMOTE_HOST']=''
        env['CONTENT_LENGTH']=''
        env['SCRIPT_NAME'] = ''

    def get_app(self):
        return self.application

    def set_app(self,application):
        self.application = application
```
看到这个 WSGIServer 定义了吗，继承了一个 HttpServer。我们再继续追一下其定义：
```python
# lib/python2.7/BaseHTTPServer.py

class HTTPServer(SocketServer.TCPServer):

    allow_reuse_address = 1    # Seems to make sense in testing environment

    def server_bind(self):
        """Override server_bind to store the server name."""
        SocketServer.TCPServer.server_bind(self)
        host, port = self.socket.getsockname()[:2]
        self.server_name = socket.getfqdn(host)
        self.server_port = port
```
到这里，我们继续追，看到 TcpServer 定义:
```python
# lib/python2.7/SocketServer.py

class TCPServer(BaseServer):
    """这里我省略了定义"""
```
你还可以发现一个 ThreadingTCPServer 类：我们看下它的定义
```python
class ThreadingTCPServer(ThreadingMixIn, TCPServer): 
    pass
```
好了，怎么多线程处理请求呢？看下这个 ThreadingMixIn 类是如何实现的:

```python
class ThreadingMixIn:
    """Mix-in class to handle each request in a new thread."""

    # Decides how threads will act upon termination of the
    # main process
    daemon_threads = False

    def process_request_thread(self, request, client_address):
        """Same as in BaseServer but as a thread.

        In addition, exception handling is done here.

        """
        try:
            self.finish_request(request, client_address)
            self.shutdown_request(request)
        except:
            self.handle_error(request, client_address)
            self.shutdown_request(request)

    def process_request(self, request, client_address):
        """Start a new thread to process the request."""
        t = threading.Thread(target = self.process_request_thread,
                             args = (request, client_address))
        t.daemon = self.daemon_threads
        t.start()
```

看到吗，其实就是对于每个新请求，会启动一个新的线程来处理 socket 请求。假如让我们自己实现一个多线程 socket server 应该怎么实现呢？先来写一个简单的单线程 socker echo server:

```python
from socket import *  # 偷懒这么写
s = socket(AF_INET, SOCK_STREAM)
s.bind(("", 9000))
s.listen(5)
while True:
    c, a = s.accept()
    print "Received connection from", a
    c.send("Hello %s\\n" % a[0])
    c.close()
```
你可以用telnet之类的工具连上该端口看效果。 这样一次只能处理一个请求，如果想每次来一个请求用一个线程处理呢？我们可以这样做：
```python
import threading
from socket import *

def handle_client(c):
    # 处理 client 请求
    c.send("Hello\n")
    c.close()
    return

s = socket(AF_INET, SOCK_STREAM)
s.bind(("", 9000))
s.listen(5)
while True:
    c, a = s.accept()
    t = threading.Thread(target=handle_client,
                         args=(c,))
```
是不是很简单，这其实就是多线程工作的原理，每次 accept 得到一个新的客户端请求以后开一个线程去处理。当然 socket 编程还是偏底层，我们刚才看到了 python 提供了 SocketServer 模块来简化 socket 编程。我们使用 SocketServer 模块来发送数据：
```python
import SocketServer
import time

class TimeHandler(SocketServer.BaseRequestHandler):
    def handle(self):
        # self.request 是一个 client socket 对象
        self.request.sendall(.ctime() + "\n")

serv = SocketServer.TCPServer(("", 8889), TimeHandler)
serv.serve_forever()
```
它的执行原理是这样的：server 等待请求到来对每个 socket 连接，server 创建一个新的 handler 类handle() 方法调用处理 client socket 对象，比如发送数据handle() 方法返回后，连接关闭，同时 handler 实例对象销毁但是这个 server 的处理能力很差，一次只能处理一个请求，我们看下这个模块提供了几个类：TCPServer: 同步的 tcp serverForkingTCPServer: 多进程 tcp serverThreadingTCPServer: 多线程 tcp server怎么实现一个多线程 tcp server 呢？很简单：


```python
# 改成 ThreadingTCPServer 就行了，代码其他部分不动
serv = SocketServer.ThreadingTCPServer(("",8000),TimeHandler)
serv.serve_forever()

```
这样一来，新的请求就能被新的线程去处理了。我们就通过线程来增强了并发能力，当然线程开销比较大，不如用协程(抽空会写个用协程实现异步的socker server）。 如果你浏览该模块，还能看到两个 Mixin:ForkingMixinThreadingMixIn我们只要继承它们就很容易实现一个多进程或者多线程的 server，比如实现一个多线程的 HTTPServerfrom BaseHTTPServer 
```python
import HTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler
from SocketServer import ThreadingMixIn

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    pass

serv = ThreadedHTTPServer(("", 8080), SimpleHTTPRequestHandler)
```
好了，看了这么多让我们改造下 Python 自带的 wsgi server 为多线程的：

```python
import time
import SocketServer
import socket
from SimpleHTTPServer import SimpleHTTPRequestHandler
from SocketServer import ThreadingMixIn


class HTTPServer(SocketServer.TCPServer):

    allow_reuse_address = 1    # Seems to make sense in testing environment

    def server_bind(self):
        """Override server_bind to store the server name."""
        SocketServer.TCPServer.server_bind(self)
        host, port = self.socket.getsockname()[:2]
        self.server_name = socket.getfqdn(host)
        self.server_port = port


class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    pass


class ThreadWSGIServer(ThreadedHTTPServer):

    """BaseHTTPServer that implements the Python WSGI protocol"""

    application = None

    def server_bind(self):
        """Override server_bind to store the server name."""
        HTTPServer.server_bind(self)
        self.setup_environ()

    def setup_environ(self):
        # Set up base environment
        env = self.base_environ = {}
        env['SERVER_NAME'] = self.server_name
        env['GATEWAY_INTERFACE'] = 'CGI/1.1'
        env['SERVER_PORT'] = str(self.server_port)
        env['REMOTE_HOST'] = ''
        env['CONTENT_LENGTH'] = ''
        env['SCRIPT_NAME'] = ''

    def get_app(self):
        return self.application

    def set_app(self, application):
        self.application = application


def application(environ, start_response):
    time.sleep(10)    # 注意这里的 sleep
    status = '200 OK'
    headers = [('Content-Type', 'text/html; charset=utf8')]

    start_response(status, headers)
    return [b"<h1>Hello</h1>"]


if __name__ == '__main__':
    from wsgiref.simple_server import make_server
    httpd = make_server('127.0.0.1', 8000, application, server_class=ThreadWSGIServer)
    httpd.serve_forever()

```
对了，我们怎么证明这个真是多线程的 wsgi server 了呢，很简单。你看我加了个 sleep(10)。 如果你在之前的单线程 wsgi server 跑，你可以开俩个终端去 curl，curl 完一个赶紧切到另一个 curl 。 单线程你会发现几乎是 10 + 10 秒，但是下边这个多线程 wsgi server 你会发现大概只用10秒，两个请求是并发的(当然我这种测试很 low，你可以随便用一个网络测试工具）。虽然我没看过 django wsgi server 的实现，但是它自己实现的开发服务器原理应该是类似的。如果你能坚持看到这里，是更明白了呢还是更懵了呢？你可以看下PegasusWang/notebooks 这个是手撸 web 框架的教程，看完你就对 wsgi，如何自己写 框架以及 gunicorn 部署有点概念了。最近在学习异步框架的工作原理，感兴趣可以看看，之后还会出个协程版本的。


>https://zhuanlan.zhihu.com/p/42044997