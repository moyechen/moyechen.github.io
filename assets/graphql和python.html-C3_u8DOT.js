import{_ as e,o as r,c as t,d as o}from"./app-CFIaTHNp.js";const n={},p=o(`<h1 id="graphql和python" tabindex="-1"><a class="header-anchor" href="#graphql和python" aria-hidden="true">#</a> graphql和python</h1><ol><li>graphql 定义 这里没有id这个东西， type ProductionGroup{ &quot;班组ID&quot; id: String! &quot;班组名称&quot; name: String! &quot;班组长&quot; groupLeader: Staff! &quot;班组成员&quot; groupMembers: [Staff!]! &quot;备注&quot; remark: String }</li></ol><p>input CreateProductionGroupInput { name: String! groupLeader: StringIDInput! groupMembers: [StringIDInput!]! remark: String }</p><ol start="2"><li>创建的流程</li></ol><p>2.1 前端传递 group_leader: {id:&quot;p1&quot;}</p><p>然后types中收到这个input， 内容和gql中定义的一样</p><p>process： {&quot;id&quot;:&quot;p1&quot;}</p><p>2.2 这时，解析给app层mutation.py中定义的command</p><p>class CreateGroupCommand(Command): tenant_id: str name: str group_leader: StringIDInput group_members: list[StringIDInput] remark: str | None</p><p>这里是command和graphql定义一样，还有一种是内部全部使用id，那么在这里就需要进行一些别名，包括内部的所有（聚合根，实体，orm，Representation）都带上id group_id: StringIDInput | None = Field(alias=&#39;group&#39;)</p><p>2.3 app层拿到command， 解析，并处理，构建Group对象</p><p>class Group(AggregateRoot): id: GroupId name: str tenant_id: TenantId group_leader: StaffId group_members: list[StaffId] remark: str | None</p><p>2.4 然后通过repo，将对象转换为orm对象，并保存到db</p><p>class GroupOrm(Base, TenantMixin, SoftDeleteMixin, TimeMixin): tablename = &quot;group&quot; entity = Group</p><pre><code>id = sa.Column(sa.String, primary_key=True)
name = sa.Column(sa.String)
group_leader = sa.Column(sa.String)
# 班组成员，不包含班组长
group_members = sa.Column(ARRAY(sa.String), server_default=&quot;{}&quot;)
# 班组人员字段，班组人员 包含班组长以及班组成员
group_staffs = sa.Column(ARRAY(sa.String), server_default=&quot;{}&quot;)
remark = sa.Column(sa.String)

@classmethod
def from_entity(cls, entity: Group):
    orm_instance = entity.orm_instance() or cls()  # type: ignore
    orm_instance.copy_from_entity(entity)
    orm_instance.group_staffs = entity.group_members + [entity.group_leader]
    return orm_instance
</code></pre><p>就此，创建流程结束</p><p>3 查询 3.1前端构建查询input，发送到types，转发给app层的queryService，得到filter字典、offset、limit、order_by &quot;&quot;&quot; 问题，这里filter的graphql定义也是不带id的，所以前端传过来StringIdInput，我们的filter类中，应当这样编写 &quot;&quot;&quot; class SectionFilter(FilterBase): search: str = FilterField(expression=lambda v: SectionOrm.name.like(f&quot;%{v}%&quot;)) name: str = FilterField(column=SectionOrm.name) tenant_id: str = FilterField(column=SectionOrm.tenant_id) process: StringIDInput = FilterField(expression=lambda v: SectionOrm.process_ids.contains([v])) is_deleted: bool = FilterField(False, expression=lambda v: SectionOrm.is_deleted.is_(v))</p><p>3.2queryService 直接查询orm，并使用Representation返回给前端</p><p>class GroupRepresentation(Representation): id: str name: str group_leader: str group_members: list[str] remark: str | None</p><p>3.3 到达graphql层，controller根据types里的resolve，将对象进行解析，处理后返回给客户端</p><p>@managed() @dataclass class GroupType(ObjectType): name = &quot;ProductionGroup&quot;</p><pre><code>@field_resolver(&quot;groupLeader&quot;)
async def resolve_group_leader(self, parent: GroupRepresentation, info: GraphQLResolveInfo):
    group_leader_id = get_attr(parent, &quot;group_leader&quot;)
    return {&quot;id&quot;: group_leader_id}

@field_resolver(&quot;groupMembers&quot;)
async def resolve_group_members(self, parent: GroupRepresentation, info: GraphQLResolveInfo):
    group_members = get_attr(parent, &quot;group_members&quot;)
    return [{&quot;id&quot;: member_id} for member_id in group_members]
</code></pre>`,22),a=[p];function i(s,u){return r(),t("div",null,a)}const m=e(n,[["render",i],["__file","graphql和python.html.vue"]]);export{m as default};
