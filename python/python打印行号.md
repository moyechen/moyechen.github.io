# skill


### python 打印行号
```python
import sys

print(sys._getframe().f_code.co_name)  # 当前函数名
print(sys._getframe().f_lineno)  # 当前行号
```



### python 获取当前脚本或其他模块的所有类

>背景: 一个py文件里有40+个类, 需要创建实例并执行共有的run方法, 简单的方法是写40+行代码完成任务, 也可以通过python高阶函数使用

```python

import sys, inspect


def get_class(current_module):
    cls = []
    print("class:",end='')
    for name, obj in inspect.getmembers(current_module):
        if inspect.isclass(obj):
            print(name, end=',')
            cls.append(obj)
    print()
    return cls


class A():
    def run(self):
        print("current class:", self.__class__.__name__)


class B():
    def run(self):
        print("current class:", self.__class__.__name__)


class C():
    def run(self):
        print("current class:", self.__class__.__name__)


class D():
    def run(self):
        print("current class:", self.__class__.__name__)


if __name__ == '__main__':
    current_module = sys.modules[__name__]  获取当前文件对象

    for cls in get_class(current_module):
        cls().run()


```


运行结果

```
class:A,B,C,D,
current class: A
current class: B
current class: C
current class: D

```