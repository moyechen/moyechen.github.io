import{_ as e,o as a,c as r,d as o}from"./app-CFIaTHNp.js";const t={},d=o('<h1 id="_23-5-22pg数据库的中文排序" tabindex="-1"><a class="header-anchor" href="#_23-5-22pg数据库的中文排序" aria-hidden="true">#</a> 23-5-22pg数据库的中文排序</h1><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>pg数据库存储的utf8字段，需要按拼音进行排序</p><h2 id="方案1" tabindex="-1"><a class="header-anchor" href="#方案1" aria-hidden="true">#</a> 方案1</h2><p>方案1：在了解到gbk编码按照拼音顺序编码后，使用convert函数将utf8字段转为gbk，然后ordr by即可 <code>ORDER BY CONVERT(ColumnName USING gbk)</code> 小问题：存储的emjoy等不能转换为utf8的，则会查询失败， 需要禁止输入非gbk编码</p><h2 id="方案2" tabindex="-1"><a class="header-anchor" href="#方案2" aria-hidden="true">#</a> 方案2</h2><p>方案2：<code>select * from process order by name collate &quot;zh_CN&quot;</code> 前提db有这个collate，可以通过<code>select * from pg_collation;</code>查询</p><p>group_member_ids: list[StringIDInput] = Field(alias=&quot;group_members&quot;)</p>',8),c=[d];function _(n,h){return a(),r("div",null,c)}const s=e(t,[["render",_],["__file","23-5-22pg数据库的中文排序.html.vue"]]);export{s as default};
