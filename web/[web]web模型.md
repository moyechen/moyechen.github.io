# [web]web模型


常见的python wsgi服务器，以及模型


1. nginx + uwsgi socket + django


可以开进程线程，但是不懂区别


2. nginx proxy_pass + gunicorn 


command = gunicorn -b 0.0.0.0:9004 -w %(ENV_WORKER)s --timeout 20  range_backend.asgi:application -k uvicorn.workers.UvicornWorker


