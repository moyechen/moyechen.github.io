import{_ as t,o as e,c as d,d as r}from"./app-CFIaTHNp.js";const a={},_=r('<h1 id="异步任务与事务" tabindex="-1"><a class="header-anchor" href="#异步任务与事务" aria-hidden="true">#</a> [异步任务与事务]</h1><p>业务</p><p>用户可以开始任务</p><p>任务状态变成等待中，提交给celery，等待执行</p><p>这是，用户可以撤销任务</p><p>撤销任务：</p><p>任务状态变成ready</p><p>所以当还没被消费时，用户就撤销了，就很完美</p><p>但是已经开始消费了，用户再撤销，就会有bug</p><table><thead><tr><th>事务A start_task</th><th>事务B revoke_task</th></tr></thead><tbody><tr><td>判断Task state是否为cancel</td><td></td></tr><tr><td></td><td>修改Task state=cancel Save Task</td></tr><tr><td>update_network_check_item_state = SEARCH_CATALOG Save NetworkCheckItem</td><td></td></tr><tr><td>成功或失败 Save NetworkCheckItem</td><td></td></tr><tr><td></td><td>等待0.8秒</td></tr><tr><td></td><td>Save NetworkCheckItem</td></tr><tr><td>修改Task = RUNNING</td><td></td></tr><tr><td>Save Task</td><td></td></tr><tr><td>提交事务</td><td>提交事务</td></tr></tbody></table>',10),c=[_];function s(o,h){return e(),d("div",null,c)}const n=t(a,[["render",s],["__file","异步任务与事务_.html.vue"]]);export{n as default};
