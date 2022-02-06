PDSU Winter Round#4 题解
=====================


problem A. [Number Sequence](https://vjudge.net/problem/HDU-1711)
----------------
***  
**题意:**  
输入两段数字,输出可以与第二段数字匹配的第一段数字的第一个字符的下标.

**解决方案:**  
KMP板子题

```c++
#include<bits/stdc++.h>
using namespace std;
#define ms(x, n) memset(x,n,sizeof(x));
typedef  long long LL;
const LL maxn = 1e6+10;

int s1[maxn], s2[maxn], n, m;
int nxt[maxn];
void getNext(){
    int i = 1, j = 0;
    while(i < m){
        if(j==0 || s2[i]==s2[j]){
            ++i, ++j;
            if(s2[i] != s2[j]) nxt[i] = j;
            else nxt[i] = nxt[j];
        }
        else j = nxt[j];
    }
}
int kmp(){
    getNext();
    int i = 1, j = 1;
    while(i <= n && j <= m){
        if(s1[i]==s2[j] || j==0) ++i, ++j;
        else j = nxt[j];
    }
    if(j > m) return i - m;
    else return -1;
}

int main()
{
    int T;
    scanf("%d",&T);
    while(T--){
        ms(s1, 0); ms(s2, 0); ms(nxt, 0);
        scanf("%d%d",&n,&m);
        for(int i = 1; i <= n; i++)
            scanf("%d",&s1[i]);
        for(int j = 1; j <= m; j++)
            scanf("%d",&s2[j]);

        printf("%d\n",kmp());
    }
    return 0;
}


```



problem B. [迷宫(一)](https://vjudge.net/problem/%E8%AE%A1%E8%92%9C%E5%AE%A2-T1595)
----------------
***


**题意:**  
走迷宫

**解决方案:**  
简单广搜，先让出发点坐标入队，然后依次将队首出队，判断周围是否有可以走的点，如果有就入队新坐标并标记，如果遇到出口 T 返回 **真** ；如果所有可以走的路都判断过了还没到终点则返回 **假**。

```c++
#include <iostream>
#include <queue>

using namespace std;

const int MAXN = int(1e1 + 9);

char m[MAXN][MAXN];

bool bfs(int a, int b) {
        int c[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        queue<int> qx, qy;
        qx.push(a);
        qy.push(b);
        while (!qx.empty()) {
                a = qx.front();
                b = qy.front();
                qx.pop();
                qy.pop();
                for (int i = 0; i < 4; i++) {
                        int x = a + c[i][0], y = b + c[i][1];
                        if (m[x][y] == 'T') return true;
                        if (m[x][y] == '.') qx.push(x), qy.push(y), m[x][y] = '*';
                }
        }
        return false;
}

int main() {
        ios::sync_with_stdio(0);
        cin.tie(0);
        int a, b; cin >> a >> b;
        for (int i = 0; i <= a + 1; i++) m[i][0] = m[i][b + 1] = '*';
        for (int i = 0; i <= b + 1; i++) m[0][i] = m[a + 1][i] = '*';
        int x, y;
        for (int i = 1; i <= a; i++) for (int j = 1; j <= b; j++) {
                cin >> m[i][j];
                if (m[i][j] == 'S') x = i, y = j;
        }
        if (bfs(x, y)) cout << "yes" << endl;
        else cout << "no" << endl;
        return 0;
}
```


problem C. [Alaska](https://vjudge.net/problem/HDU-3764)
----------------
***
**题意:**  
一个人从一个城市通过笔直的高速公路前往另一个城市(总长度固定,为1422千米),道路中间有一些充电站
,每次充完电可以跑200公里,现在给你每一个充电站离起点的距离,问是否可以走到另一个城市  

不过文章末尾有这么一句话, 

>Can Brenda drive her car from Dawson City to Delta Juntion and back?  
>布伦达可以开车从道森市到三角洲交界处，然后返回吗？

也就是说最后一个充电桩必须在终点100千米内, 否则他将无法返回起点城市

只需要判断每两个充电桩之间的距离是否小于等于200即可,然后对于最远的那个充电桩,进行特殊判断,必须在1322-1422之间即可


**代码**  

```cpp

int t,nums[10005];

int main() {

    while (cin>>t&&t)
    {
        for (int i = 0; i < t; i++)
        {
            cin>>nums[i];
        }
        sort(nums,nums+t); //从小到大排序

        nums[t] = 1522;  //好好想想
        int f  = 0;
        for (int i = 1; i <= t; i++)
        {            
            if(nums[i] - nums[i-1] > 200){
                f = 1;
                break;
            }
        }
        if (f)
        {
            cout<<"IMPOSSIBLE"<<endl;
        }else
        {
            cout<<"POSSIBLE"<<endl;
        }
    }
    return 0;
}


```



problem D. [迷宫（三）](https://vjudge.net/problem/%E8%AE%A1%E8%92%9C%E5%AE%A2-T1597)
----------------
***

**题意&解决方案**  
也是简单广搜，不太一样的是
1. 修改边界为一个特殊字符，如 `T`
2. 修改初始点记录的条件 `S 改成 @`
3. 添加一个记录时间的队列 `queue<int> qt;`
4. 注意遇到 T 时返回的时间应该减 1 因为题目是到边缘就算终点，而我们的 T 是【题目给的边缘】的又外面一圈

先让出发点坐标入队，然后依次将队首出队，判断周围是否有可以走的点，如果有就入队新坐标并标记，如果遇到出口 T 返回 **计算出来的长度 - 1** ；如果所有可以走的路都判断过了还没到终点则返回 **-1**


```c++

#include <iostream>
#include <queue>

using namespace std;

const int MAXN = int(1e1 + 9);

char m[MAXN][MAXN];

int bfs(int a, int b) {
        int c[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        queue<int> qx, qy, qt;
        qx.push(a);
        qy.push(b);
        qt.push(0);
        while (!qx.empty()) {
                a = qx.front();
                b = qy.front();
                int t = qt.front();
                qx.pop();
                qy.pop();
                qt.pop();
                for (int i = 0; i < 4; i++) {
                        int x = a + c[i][0], y = b + c[i][1], tt = t + 1;
                        if (m[x][y] == 'T') return tt - 1;
                        if (m[x][y] == '.') qx.push(x), qy.push(y), qt.push(tt), m[x][y] = '#';
                }
        }
        return -1;
}

int main() {
        ios::sync_with_stdio(0);
        cin.tie(0);
        int a, b; cin >> a >> b;
        for (int i = 0; i <= a + 1; i++) m[i][0] = m[i][b + 1] = 'T';
        for (int i = 0; i <= b + 1; i++) m[0][i] = m[a + 1][i] = 'T';
        int x, y;
        for (int i = 1; i <= a; i++) for (int j = 1; j <= b; j++) {
                cin >> m[i][j];
                if (m[i][j] == '@') x = i, y = j;
        }
        cout << bfs(x, y) << endl;
        return 0;
}


```


problem E.  [Harmonic Number ](https://vjudge.net/problem/LightOJ-1234)
----------------
***
**题意:**

n的调和数是1+1/2+1/3+....+1/n，给一个数计算n的调和数。

**思路分析:**
1.	首先排除暴力法，因为10的8次方肯定会超时。
2.	之后就要考虑打表了，但是10的8次方如果每一个数都打表的话，空间会不足
3.	那么就每隔100（不固定）个数，进行一次打表，之后的100个数进行计算，这样即节省了大部分时间，也节省了空间。
4.	即数组a为打的表，a[1]存n=100时的结果，a[2]存n=200的结果，之后先将n值除100，取出值后，进行计算加上剩下的数，即为结果

```c++

#include <iostream>
#include <cstdio>
#include <algorithm>
#include <vector>
#include <queue>
#include <stack>
// *start on @date: 2020-02-01 16:20 
using namespace std;
typedef long long ll;
const int maxn = 1e6 + 5;
const int inf  = 0x3f3f3f3f;

double nums[maxn];

int main() {


    double tmp = 0;

    //打表
    for (int i = 1; i <= 1e8; i++)
    {
        tmp += (1.0/i);
        if(i%100 == 0){
            nums[i/100] = tmp;
        }
    }

    int t,x;
    scanf("%d",&t);
    for (int i = 0; i < t; i++)
    {
        scanf("%d",&x);

        double tmp = nums[x/100];  //整百部分

        //然后加上不足整百的部分
        
        for (int j = x/100*100 +1; j <= x; j++)
        {
            tmp += (1.0/j);
        }
        
        printf("Case %d: %.10f\n",i+1,tmp);

    }
    return 0;
}

```

problem F. [Mysterious Bacteria](https://vjudge.net/problem/LightOJ-1220)
----------------
***
**题意:**  
给你一个整数n(可能为负数),让你求满足a^p=n的最大的p


**解决方案:**  

首先将所有素数存起来，存到数组a中
当n是正数时,直接对n进行素因子分解（即对n挨个除a数组中的质数，能除尽就一直除），在对它的所有素因子 的**个数**进行gcd(即求最大公约数)  
例如

- 12=3*2^2     , gcd(2,1)=2,为答案
- 17=17^1      , gcd(1,1)=1,为答案
- 36=2^2 * 3^2 , gcd(2,2)=2,为答案

当n是负数时,则p的值一定是奇数,因为一个数的偶数次方一定为正数，因此需要将它的素因子个数全都化为奇数。

```c++
#include <iostream>
#include <cstdio>
#include <cstring>
#include <algorithm>
#include <cmath>
using namespace std;
const int maxn = 1000100;
long long int prim[maxn / 10];
int flag = 0;
int m = 0;
int vis[maxn];

//使用筛法求素数
void Init()
{
    memset(vis, 0, sizeof(vis));
    for (long long int i = 2; i < maxn; i++)
    {
        if (!vis[i])
        {
            prim[m++] = i;
        }
        for (long long int j = i * i; j < maxn; j += i)
        {
            vis[j] = 1;
        }
    }
}
int gcd(int x, int y)
{
    int a = x, b = y;
    while (a % b != 0)
    {
        int t = a % b;
        a = b;
        b = t;
    }
    return b;
}
int solve(long long int x)
{
    int ans = 0;
    int v = 0;
    for (int i = 0; i < m && prim[i] * prim[i] <= x; i++)
    {
        int res = 0;
        while (x % prim[i] == 0 && x)
        {
            x /= prim[i];
            v = 1;
            res++;
        }
        if (flag)
        {
            while (res % 2 == 0 && res)
            {
                res /= 2;
            }
        }
        if (res && !ans)
        {
            ans = res;
        }
        else if (res && ans)
        {
            ans = gcd(ans, res);
        }
    }
    if (v == 0)
        ans = 1;
    return ans;
}
int main()
{
    int n;
    Init();
    scanf("%d", &n);

    for (int i = 1; i <= n; i++)
    {
        long long int x;
        flag = 0;
        scanf("%lld", &x);
        if (x < 0)
        {
            flag = 1;
            x = -x;
        }
        printf("Case %d: %d\n", i, solve(x));
    }
}

```