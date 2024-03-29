PDSU Winter Round#5 题解
====

problem A. [和为给定数 ](https://vjudge.net/problem/%E8%AE%A1%E8%92%9C%E5%AE%A2-T1158)
----

**题意**  
蒜头君给出若干个整数，询问其中是否有一对数的和等于给定的数。

**解法**  

两种解法
1. 二分
    - 存储在数组nums中,然后先按照从小到大的顺序排序
    - 读取到给定数,记为SUM
    - 遍历数组,假设当前遍历到的元素的值为nums[i], 则去查找数组中是否存在  SUM - nums[i],因为我们已经排过序了, 所以我们可以使用时间复杂度为`logn`的二分查找, 如果找到输出
2. stl
    - 存储在map或set中
    - 遍历map或set , 检测SUM - nums[i] 是否也在map或者set中:  map.count(),  set.count()
    - 因为map和set的特性(自动升序排序),所以我们找到的第一个答案就是正确答案
> 若有多个数对满足条件，选择数对中较小的数更小的。


problem B. [Minecraft](https://vjudge.net/problem/%E8%AE%A1%E8%92%9C%E5%AE%A2-T1200)
----

**题意**  
给你n个相同的正方体,拼成长方体,问体积为n的长方体的最小表面积

**解法**  
三层for循环枚举长宽高, 取合理的(能拼成长方体的) 且表面积最小的


problem C. [夫子云游](https://vjudge.net/problem/%E8%AE%A1%E8%92%9C%E5%AE%A2-T1284)
----

**题意**  
某人刚开始有2壶酒
遇到酒店 买酒   , 身上酒数量翻倍
遇到桃花 喝酒  , 身上酒数量减一

已知最后遇到的是是花, 问夫子遇到店和花的合理的次序种数

**解法**  

使用搜索可解
状态为 身上的酒数量,  还可遇到的酒店数量, 还可遇到的桃花数量
`(int v, int dian, int hua)`



problem D. [判断元素是否存在](https://vjudge.net/problem/%E8%AE%A1%E8%92%9C%E5%AE%A2-T1184)
----

**题意**  
给定k和x,k会生成一个集合`{M}={2*y+1,3*y+1,k},y∈M`.然后问x是否在M中.

**解法**  
深搜,具体看代码

```c++

int dfs(int k,int x)
{
    if(k==x)
        return 1;
    if(k>x)
       return 0;
    return dfs(3*k+1,x)||dfs(2*k+1,x);
}
```


problem E. [九的余数](https://vjudge.net/problem/%E8%AE%A1%E8%92%9C%E5%AE%A2-T1548)
----

**题意**  
给定一个数,然后求它取余9的余数.

**解法**  

对于数字123
有:  
```
1   =  0 * 10 + 1 
12  =  1 * 10 + 2
123 =  12 * 10 + 3

所以最终123 = ((0*10+1) * 10 + 2 ) *10 + 3
```

又由同余定理:

>(a+b)mod n=((a mod n)+(b mod n))mod n;
>( a * b)mod n=((a mod n)*(b mod n))mod n;




所以最终  `123 mod 9  = (((     0*10 mod 9    +1)* 10 mod 9 + 2 ) *10  mod 9 + 3 ) mod 9`







problem F. [一次函数](https://vjudge.net/problem/%E8%AE%A1%E8%92%9C%E5%AE%A2-T1744)
----

**题意**  
求一次函数的k和b
然后格式化的输出

**解法**  
这道题是考了一个一次函数的知识点
也许数学好的人会知道这个
**注意，前方高能警告**

敲黑板了
y=kx+b（k!=0）一次函数一般式
其中这k是斜率，b是截距
如题我们有这样两个一次函数解析式
```
{
    y1 = k*x1 + b;
    y2 = k*x2 + b;
}

此时k=(y2-y1)/(x2-x1)
b=﹙y2x1－y1x2﹚/﹙x1－x2﹚



```

>[题解链接](https://www.luogu.com.cn/problemnew/solution/P2026)


