# python可变对象在sqlalchemy中的问题


## 问题
sqlalchemy 在处理可变对象时，如果可变对象地址没有变化，不会触发更新


```python

repo = session_maker

async def test_edit_fields(
    self, engine,init_app_page_extractions
):
    repo = container.repo()
    async with repo.new_session() as session, session.begin():
        result = await repo.session.execute(select(PageCommandOrm))
        pages = result.scalars().all()
        for row in pages:
            print(row.edit_fields)
            row.edit_fields["ff"] = 1


        repo.session.add_all(pages)

    async with repo.new_session() as session, session.begin():
        session.flush()
        result = await repo.session.execute(select(PageCommandOrm))
        pages = result.scalars().all()
        for row in pages:
            print(row.edit_fields)

```

输出如下
```
{}
{}
{}
{}
{}
{}
```

在上面的例子中，`row.edit_fields["ff"] = 1` 这样的操作不会修改edit_fields 这个变量的地址，因此sqlalchemy认为未修改该字段，不会更新该字段

而`row.edit_fields = {"ff":1}` 修改了，触发了更新


## 解决方案

使用官方提供的方法`flag_modified`

```
from sqlalchemy.orm.attributes import flag_modified

async def test_edit_fields(
    self, engine, init_app_page_extractions
):
    
    repo = container.repo()
    async with repo.new_session() as session, session.begin():
        result = await repo.session.execute(select(PageCommandOrm))
        pages = result.scalars().all()
        for row in pages:
            print(row.edit_fields)
            row.edit_fields["ff"] = 1
            flag_modified(row, "edit_fields") # 标记该字段需更新
           

        repo.session.add_all(pages)
```