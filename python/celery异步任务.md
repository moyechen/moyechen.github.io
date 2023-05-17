# celery异步任务


在使用celery时，需要控制异步任务

任务终止有多种情况
- 任务内部错误
- celery被杀死
- 手动结束任务（通过celery控制）


这些需要我们特殊注意

```python
@shared_task(ignore_result=True, time_limit=3600*24)
def scan(task_id, report_id):

    def handle_stop(*args, **kwargs):
        pass 
        # 这里如果需要修改任务状态，则一定需要判断任务是否已结束，
        # 停止任务之后保留任务记录,
        # 杀死celery会走这里(SIGQUIT), 然后celery给该进程发送指令
        # bug：任务已完成，但是celery进程还在，那么退出celery仍旧会执行handle_stop,因此需要在stop中增加对任务状态的判断。
        # 如果机器断电，肯定走不到这里，所以需要在启动django的时候，将所有运行中的任务修改为失败

    signal.signal(signal.SIGTERM, handle_stop) # 这里注册是对整个celery worker生效，因此
    try:
        openvas_scan(task_id, report_id)
    except Exception as e:
        with open("/home/bolean/logs/vulscan.los", 'a', encoding='utf8') as f:
            f.write("漏洞扫描任务_{}_{}异常结束：handle_stop but in try except\n".format(task_id, report_id))
        logger.warning("handle_stop, but in try except")
        handle_stop()

```




### 异步任务prefork gevent的选择


使用gevent时，遇到问题
```

Traceback (most recent call last):
  File "/mnt/bolean/venv/lib/python3.10/site-packages/celery/app/trace.py", line 451, in trace_task
    R = retval = fun(*args, **kwargs)
  File "/mnt/bolean/venv/lib/python3.10/site-packages/celery/app/trace.py", line 734, in __protected_call__
    return self.run(*args, **kwargs)
  File "/mnt/bolean/sdp-backend/fuzz_testing/tasks.py", line 496, in task_test_case_result
    test_case_obj = FuzzTestingTestCase.objects.get(id=test_case_id)
  File "/mnt/bolean/venv/lib/python3.10/site-packages/django/db/models/manager.py", line 85, in manager_method
    return getattr(self.get_queryset(), name)(*args, **kwargs)
  File "/mnt/bolean/venv/lib/python3.10/site-packages/django/db/models/query.py", line 492, in get
    num = len(clone)
  File "/mnt/bolean/venv/lib/python3.10/site-packages/django/db/models/query.py", line 302, in __len__
    self._fetch_all()
  File "/mnt/bolean/venv/lib/python3.10/site-packages/django/db/models/query.py", line 1507, in _fetch_all
    self._result_cache = list(self._iterable_class(self))
  File "/mnt/bolean/venv/lib/python3.10/site-packages/django/db/models/query.py", line 57, in __iter__
    results = compiler.execute_sql(
  File "/mnt/bolean/venv/lib/python3.10/site-packages/django/db/models/sql/compiler.py", line 1359, in execute_sql
    cursor = self.connection.cursor()
  File "/mnt/bolean/venv/lib/python3.10/site-packages/django/utils/asyncio.py", line 24, in inner
    raise SynchronousOnlyOperation(message)
django.core.exceptions.SynchronousOnlyOperation: You cannot call this from an async context - use a thread or sync_to_async.

```


也就是说FuzzTestingTestCase.objects.get(id=test_case_id) 这个不能在gevent下执行


但是 这样的命令时可以执行的 
`models.Host.objects.filter(id=host_id, status=VulHostStatus.RUNNING.value).exists()`