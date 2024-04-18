# drf常见问题

1. 如果我创建希望传的参数比model多，如何处理

解决方案：ArticleSerializer新增字段，write_only = True即可

