# ddd+graphql数据流


数据流
kong就是openresty的一个应用，nginx

前端 -> kong （解析token，装上user信息）->后端


-> controller层 ->resolve-> types -> graphql input -> 封装为command 

-> 应用层-> mutation_service -> 调用各种domain、repo方法，
-> domain 层， 领域方法
-> 调用domain层repo的方法（实现在infrastructure中），持久化到db


返回数据，在应用层中定义了各种Representation，可以序列化数据


与Django的映射：
types = view之前的数据解析
apps = view



问题1：数据校验，唯一性校验应该db实现
问题2：数据默认值，应该在orm层实现，还是在app层实现
问题3：选择输入，如何判断输入数据有效性？ 

	基础的，应该在domain的validate中定义，抛出ValueError即可
	复杂的，比如增加工段需要工序id，就需判断工序id是否存在，是否同一个租户下的，
		这种应该在app层实现



问题4：关联关系时，db-orm只存储关联的id，那聚合根的model如何写？ graphql的types怎么写？中间如何转换

