PDSU Winter Round#1 题解
=====================
出题人&题解制作:宋晨,王天飞,周宁,李虹雨

problem A. angery student[思维]
----------------
***
**题意:**  
每一秒,每个愤怒的学生会向他前方那位同学扔雪球,这个操作会导致前方的同学也愤怒(如果他没有愤怒的话),注意:这个动作是同时的!

**解决方案:**  
我们只需要计算在第一个愤怒的学生的前方,最多有几个连续的,不愤怒的学生即可

```c++
//作者: pdsu_llb
#include<iostream>
using namespace std;
char a[1005];
int main()
{
    int t;
    cin >> t;
    while (t--)
    {
        int n;
        cin >> n;
        scanf("%s", a);
        int ans = 0;
        int k = 0;
        for (int i = 0; i < n; i++)
        {
            if (a[i] == 'A')
            {
                while (a[i + 1] == 'P')
                {
                    k++;
                    i++;
                }
            }
            ans = max(k, ans);
            k = 0;
        }
        printf("%d\n", ans);
    }
    return 0;
}


```

problem B. Red and Black[搜索]
----------------
***
**题意:**

问在'@'位置的人能够走到的位置的数量('.'和'@'可以走. '#'不可以走)

**结决方案:**
广搜,深搜均可

**深搜:**

```c++
//作者:yihe11
#include<stdio.h>
#include<string.h>
int a,b,n,m;
char c[22][22];
int app(int a,int b)
{
    if(c[a][b]=='#'||a>=m||b>=n||a<0||b<0)
        return 0;
    else
    {
        c[a][b]='#';
        return 1+app(a,b+1)+app(a,b-1)+app(a-1,b)+app(a+1,b);
    }
}
int main()
{
    int i,j;
    while(scanf("%d%d",&n,&m),n||m)
    {
        for(i=0;i<m;i++)
        {
            getchar();
            for(j=0;j<n;j++)
            {
                scanf("%c",&c[i][j]);
                if(c[i][j]=='@')
                {
                    a=i;b=j;
                }
            }
        }
            n=app(a,b);
            printf("%d\n",n);
    }
    return 0;
}

```

problem C.Bone Collector[DP]
------------
***
**题意:**

一个叫做Bone Collector的男的有一个包，往包里放东西，使得其价值最大。
输入：注意是先输入的是价值，后是体积。


**结决方案:**

01 背包问题特点是：每种物品仅有一件，可以选择放或不放。用子问题定义状态：即`F[i][v]` 表示前i 件物品恰放入一个容量为v的背包可以获得的最大价值。则其状态转移方程便是:  
`F[i][v] = max(F[i-1][v], F[i-1][v-Ci] + Wig)`  
这个方程非常重要，基本上所有跟背包相关的问题的方程都是由它衍生出来的。所以有必要将它详细解释一下：“将前`i` 件物品放入容量为`v`的背包中”这个子问题，若只考虑第`i` 件物品的策略（放或不放），那么就可以转化为一个只和前`i-1`件物品相关的问题。如果不放第`i` 件物品，那么问题就转化为“前`i-1`件物品放入容量为`v`的背包中”，价值为`F[i-1][v]` 如果放第`i` 件物品，那么问题就转化为“前`i-1`件物品放入剩下的容量为`v-Ci` 的背包中”，此时能获得的最大价值就是`F[i-1][v-Ci]` 再加上通过放入第i 件物品获得的价值Wi。
刚刚接触这个问题不免还有有点儿不熟悉。`F[i-1][v]`倒是好理解. `F[i-1][v-Ci]+Wi` 稍微难得看懂点。其实如果丢掉后面的 `Wi`，`F[i-1][v-Ci]`可以按照
`F[i-1][v]`,一样理解。

**代码:**  
**二维写法**

```c++
for(i=1;i<=n;i++){
    for(j=0;j<=v;j++){
        if(j-a[i].cost>=0&&f[i-1][j]<f[i-1][j-a[i].cost]+a[i].val)
            f[i][j]=f[i-1][j-a[i].cost]+a[i].val;
        else
            f[i][j]=f[i-1][j];
    }
}
printf("%d\n",f[n][v]);
```

**一维空间优化**

```c++
for(i=1;i<=n;i++)
    for(j=v;j>=a[i].cost;j--)
        if(f[j]<f[j-a[i].cost]+a[i].val)
            f[j]=f[j-a[i].cost]+a[i].val;
printf("%d\n",f[v]);
```

problem D. 剪花布条[STL]
------------
***

**题意:**

输入串1以及串2  
问串1中包含有多少个串2

**结决方案:**
利用 string 对象的方法进行模拟字符串匹配

a.find(b) 方法可以从字符串 a 中获取字符串 b 第一次出现的位置
a.size() 方法可以获取字符串 a 的长度
a.erase(p0, p1) 使用两个迭代器地址 p0，p1 来删除字符串 a 中的一段字符
a.begin() 获得字符串 a 的首字符迭代器地址
更详细的有关 string 和其他 STL 容器的信息可以去看猹的 STL 简介文章：[StandardTemplateLibrary](https://hybrogen.github.io/2020/01/STL1/)

首先找到 a 字符串中 b 第一次出现的位置，然后从 a 中删掉【第一个 b 】以及这个 b 之前的所有字符，防止前面的和后面的连起来又组成 b 串，每删掉一个计数加一。
如此循环删除直到 a 串中找不到 b 串，输出计数。            


```c++
//作者:191210221
#include <iostream>
#include <string>
using namespace std;
int main()
{
    string t;
    while(cin>>t)
    {
        if(t=="#")
            break;
        int sum=0;
        string t1;
        cin>>t1;
        while(t.find(t1)!=-1)
        {
            sum++;
            t.erase(t.find(t1),t1.size());
        }
        cout<<sum<<endl;
    }
    return 0;
}
```

problem E. Binary Tree Traversals[数据结构-二叉树]
------------
***

**题意:**  
根据前序和中序写出后序  前序：1 2 4 7 3 5 8 9 6 中序：4 7 2 1 8 5 9 3 6 求出后序：7 4 2 8 9 5 6 3 1  
**解决方案:**  
首先得知道是如何前序遍历、中序遍历、后序遍历的，自己上网查下，我在这里就不多说了  
第一步：根据前序可知根节点为1；第二步：根据中序可知4 7 2为根节点1的左子树和8 5 9 3 6为根节点1的右子树；第三步：递归实现，把4 7 2当做新的一棵树和8 5 9 3 6也当做新的一棵树；第四步：在递归的过程中输出后序。

**代码:**  
```c++
//原文链接https://www.cnblogs.com/jiangjing/archive/2013/01/14/2860163.html
//根据前序和中序遍历写出后序遍历
#include<iostream>
using namespace std;
int t1[1001],t2[1001];
void sousuo(int a,int b,int n,int flag)
{
    
    if(n==1)//如果存在左子树或右子树就直接输出
    {
        printf("%d ",t1[a]);
        return ;
    }
    else if(n<=0)//如果不存在左子树或右子树就返回上一层
        return ;
    int i;//继续罚分为左子树和右子树
    for(i=0;t1[a]!=t2[b+i];i++) ;//找到罚分点也就是根节点
    sousuo(a+1,b,i,0);//左子树的遍历
    sousuo(a+i+1,b+i+1,n-i-1,0);//右子树的遍历
    if(flag==1)//最原始的跟节点
        printf("%d",t1[a]);
    else//一般的根节点
        printf("%d ",t1[a]);
}
int main()
{
    int n,i;
    while(scanf("%d",&n)!=EOF)
    {
        for(i=1;i<=n;i++)
            scanf("%d",&t1[i]);//t1中存的是前序
        for(i=1;i<=n;i++)//t2中存的中序
            scanf("%d",&t2[i]);
        sousuo(1,1,n,1);
        printf("\n");
    }
    return 0;
}
```
