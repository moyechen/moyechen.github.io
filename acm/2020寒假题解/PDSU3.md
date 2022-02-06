PDSU Winter Round#3 题解
=====================


problem A. Superhero Transformation 
----------------
***  
**题意:**  
问两个字符串相同位置的字符类型是否相同(是否都是元音或者都是辅音)

**解决方案:**  
先处理一个字符串, 如果是元音用1替代,是辅音

```c++
//元音字符
char yy[] = {'a', 'e', 'i', 'o' ,'u' };

string  sol(const string &a)
{
    string ans = "";
    int len = a.size();
    for (int i = 0; i < len; i++)
    {
        int f = 0;
        for (int j = 0; j < 5; j++)
        {
            if(a[i] == yy[j]){
                f = 1;
                break;
            }
        }
        if(f == 0){
            ans+='0';
        }else
        {
            ans+='1';
        }
    }
    return ans;
}

int main() {

    string s1,s2;
    cin>>s1>>s2;
    if(sol(s1) == sol(s2)){
        cout<<"Yes"<<endl;
    }else
    {
        cout<<"No"<<endl;
    }
    return 0;
}

```



problem B.	Average Superhero Gang Power
----------------
***
**题意:**  
有n个超级英雄，每个英雄的力量可以提高最多k次，所有英雄力量的提高和删除的次数不大于m次。求超级英雄的平均最大力量是多少。

**解决方案:**  
思路：对力量进行排序，依次删除最小的值，求得当前平均力量，取最大值。

注意点：删除也占用操作次数，相乘时需开long long

```c++
作者: pdsu_刘力宾
longlong an[100005];
int main()
{
    ll n,k,m;
    while(cin >> n >> k >> m)
    {
        for(int i = 1;i <= n;i++)
        cin >> an[i];
        sort(an + 1,an + 1 + n);
       for(int i = 1;i <= n;i++)
        {
            an[i] += an[i - 1];
        }
        double res = an[n] * 1.0 / n;
        for(ll i = 0;i < n;i++)
        {
            if(i > m)
            break;
            ll add = min((m - i),(n - i) * k) * 1.0;
            res = max(res,((an[n] - an[i] + add) * 1.0 / (n - i) ));
        }
        printf("%.15lf\n",res);
    }
    return 0;
}



```


problem C. Power Strings 
----------------
***
**题解:**  周宁  
**题意:**  
给出一个字符串 问它最多由多少相同的字串组成  
如  abababab由4个ab组成


```cpp
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <vector>

// *start on @date: 2020-01-28 20:36 
using namespace std;
typedef long long ll;
const int maxn = 1000 + 5;
const int inf  = 0x3f3f3f3f;

vector<int> v;
int a,b,n,k;
int x;

/*
*函数功能:  计算 摧毁   l到r区间需要的花费
*
*/
ll sol(int l,int r)
{    
    //查找l,r区间内有几个复仇者
    
    //lower_bound  返回指向范围 [first, last) 中首个不小于（即大于或等于） value 的元素的迭代器，或若找不到这种元素则返回 last 
    //upper_bound  返回指向范围 [first, last) 中首个大于 value 的元素的迭代器，或若找不到这种元素则返回 last 
    
    //    第一个比r大的                                   第一个比l小的
    ll num = upper_bound(v.begin(),v.end(), r)  -  lower_bound(v.begin(),v.end(), l) ;
    //这样两个迭代器的差值即为区间内复仇者的数量


    ll cost;

    if(num == 0){  //如果没有复仇者, 摧毁这个区间花费a
        cost = a;
    
    }else
    {
        cost = b*num*(r-l+1);   

        if(r>l)   //如果这个区间可以切分,则尝试切分
            return min(cost,sol(l,(l+r)/2)  + sol((l+r)/2+1,r)    );
    }

    return cost;
}



int main() {
    
    scanf("%d %d %d %d",&n,&k,&a,&b);
    
    int num=  1;
    for (int i = 0; i < n; i++)num*=2;
    
    for (int i = 0; i < k; i++)
    {
        scanf("%d",&x);
        v.push_back(x);
    }
    sort(v.begin(),v.end());  //排序, 方便二分查找
    cout<<sol(1,num)<<endl;

    return 0;
}
```



problem D. K for the Price of One (Easy Version) 
----------------
***

**题意&解决方案**  
有n个物品，p块钱，k（这道题里k只取2）个物品一组以及n个ai表示n个物品的价格。
你可以随便挑小于k个物品作为一组，然后只需要付其中价格最贵的物品的钱就可以把这k个物品全部带走。求最多能买多少物品。
例：
n = 5，p = 6，k = 2，a = {2, 4, 3, 5, 7}
最好的分组方法是a[0]一组（2块钱），a[1]和a[2]作为一组（4块钱），刚好6块能买3个物品
n = 5，p = 11，k = 2，a = {2, 4, 3, 5, 7}
最好的分组方法是a[0]和a[2]一组（3块钱），a[1]和a[3]作为一组（5块钱），花掉8块能买4个物品，不能买更多了
**解决方案**  
愿意是动态规划题，但这道题限制k只取2，暴力也能ac，这里只介绍暴力的思路。
先排序，然后第一步：
a[0]单独一组，之后两个两个物品为一组，不断将总数取和，当钱数大于自己拥有的钱数时停止，之后如果物品没取完再判断是否能单独买最后那组里比较便宜的那个物品，可以买的话总数加一，最后得出a[0]单独作为一组时可以买的最多物品数suma；
第二步：
a[0]和a[1]所谓第一组，之后两个两个物品为一组，不断将总数取和，当钱数大于自己拥有的钱数时停止，之后如果物品没取完再判断是否能单独买最后那组里比较便宜的那个物品，可以买的话总数加一，最后得出可以买的最多物品数sumb；
最后输出 max(suma, sumb)。

```c++
#include <iostream>
#include <vector>
#include <algorithm>
typedef long long ll;
using namespace std;
int n, k;
ll m;
vector<ll> v;
ll is(int a)
{
    ll s = 0;
    int i;
    for (i = a; i < n; i += k)
    {
        s += v[i];
        if (s > m)
            break;
    }
    if (i < n)
        s -= v[i];
    int j;
    for (j = min(i - 1, n - 1); j > i - k; j--)
    {
        s += v[j];
        if (s <= m)
            break;
        s -= v[j];
    }
    return j + 1;
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int t;
    cin >> t;
    while (t--)
    {
        v.clear();
        cin >> n >> m >> k;
        k = 2;
        for (int i = 0; i < n; i++)
        {
            ll a;
            cin >> a;
            v.push_back(a);
        }
        sort(v.begin(), v.end());
        cout << max(is(0), is(1)) << endl;
    }
    return 0;
}


```


problem E.  哈密顿绕行世界问题
----------------
***
**题意:**

各相邻的二十个城市呈十二面体式分布,从一个城市出发能经过每个城市刚好一次后回到出发的城市。
问从第m个城市出发经过每个城市1次又回到m的所有路线,如有多条路线,按字典序输出.

**解决方案:**
比较基础的搜索题目  这个题的思路我是用的结构体保存路径信息 STL队列进行搜索.

关于这个题网上应该都是dfs的题解, 我是用bfs过的, 相对来说我这个bfs的思路应该会更好理解,有兴趣也可以去搜索一下这个题的dfs思路.

```c++
作者: pdsu_刘力宾
int maze[25][3];
int m;
int ans;
struct node
{
    int index, num;//index表已经走了(index+1)个城市 num表当前城市
    int step[25], vis[25];//step数组表路径 vis数组表城市是否经过(一个城市只能经过一次)
};

//检查路径是否符合要求
int can(node a)
{
    for (int i = 1; i <= 20; i++)
        if (!a.vis[i])
            return 0;
    int flag = 0;
    for (int i = 0; i < 3; i++)
        if (maze[a.num][i] == m)
            flag = 1;//最后经过的城市需可以到达出发城市
    if (flag)
        return 1;
    return 0;
}

void bfs(int n)
{
    int i, j;
    queue<node> q;
    node now, next;//now为出发城市 next为当前城市的相邻城市
    now.num = n;
    now.index = 0;
    now.step[now.index] = n;
    memset(now.vis, 0, sizeof(now.vis));
    now.vis[n] = 1;//将出发城市设为已经过
    q.push(now);
    while (!q.empty())
    {
        now = q.front();
        if (can(now))//符合条件输出路径
        {
            cout << ans++ << ":  ";
            for (int i = 0; i <= now.index; i++)
                cout << now.step[i] << " ";
            cout << m << endl;
        }
        q.pop();
        for (i = 0; i < 3; i++)//每个城市有三个相邻城市  将三个城市都入队搜索
            if (!now.vis[maze[now.num][i]])
            {
                next.num = maze[now.num][i];
                for (j = 0; j <= now.index; j++)
                    next.step[j] = now.step[j];
                for (j = 0; j <= 20; j++)
                    next.vis[j] = now.vis[j];
                next.index = now.index;
                next.index++;
                next.step[next.index] = next.num;
                next.vis[next.num] = 1;
                q.push(next);
            }
    }
}

int main()
{
    IOS;
    int i, j;
    for (i = 1; i <= 20; i++)
        for (j = 0; j <= 2; j++)
            cin >> maze[i][j];
    while (cin >> m && m != 0)
    {
        ans = 1;//路径数
        bfs(m);
    }
}

```

problem F. Codehorses T-shirts 
----------------
***
**题意:**  
有两个衣服大小的名单,分别是s1,s2  

衣服的型号规则:  
`The valid sizes of T-shirts are either "M" or from 0 to 3 "X" followed by "S" or "L". For example, sizes "M", "XXS", "L", "XXXL" are valid and "XM", "Z", "XXXXL" are not.`  

所以全部的型号为  
`X, S, L, XL, XS, XXL, XXS, XXXL, XXXS`

你每次可以做如下操作:  替换一个型号里面的字符为其他字符,这将花费你1秒钟的时间  
比如XXL -> XXS  


在样例1中:  
s1 = ["XS","XS","M"]  
s2 = ["XL","S","XS"]  
第一秒将s2里面的  "S"  更换为"M"  
第二秒将s2里面的  "XL" 更换为"XS"   

操作完成后, s1和s2相同(不需要考虑顺序),花费时间为2秒,所以输出2




**解决方案:**  

