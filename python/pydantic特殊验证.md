# pydantic特殊验证


![](vx_images/280304492836402.png)


这里对应每种的验证是不一样的，例如，对于一般的config，lable的长度限制为12
对switch，则限制为40
![](vx_images/267835701625494.png)


实测，使用时,已经转为MESFieldConfig 类型，会验证max_length=12,所以只能在基类去掉max_length的校验，改为单独编写