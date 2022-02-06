# [CF1299A]


[Anu Has a Function](https://codeforces.com/contest/1299/problem/A)

题意:
给定一个顺序, 使得经过操作后得到的值最大


解法:
由定义知道

f(x,y) = x|y - y

所以 f(x,y) = x&(~y)

而与操作是有交换律的, 所以我们使用前缀数组以及后缀数组
这样使得在O(n)的时间内即可操作完毕

```c++
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <vector>
#include <queue>
#include <stack>
// *start on @date: 2020-01-30 19:38 

/*
moyechen
2020 - 02 - 09 - 23 - 36
*/

using namespace std;
typedef long long ll;
const int maxn = 1e5 + 5;
const int inf  = 0x3f3f3f3f;

int nums[maxn];
int qz[maxn];
int hz[maxn];

int main() {
std::ios::sync_with_stdio(false);
cin.tie(0);
 int n;
    cin>>n;
    int tmp;
    
    
    for (int i = 0; i < n; i++)
    {
        cin>>nums[i];   
    }

    
    int ans = INT_MIN,pos = -1;
    qz[0] = nums[0];
    hz[n-1] = nums[n-1];

    qz[0] = ~qz[0];
    hz[n-1] = ~hz[n-1];
    

    for (int i = 1; i < n; i++)
    {
        qz[i] = qz[i-1]&(~nums[i]);
    }

    for (int i = n - 1 -1; i >= 0; i--)
    {
        hz[i] = hz[i+1]&(~nums[i]);
    }


    for (int i = 1; i < n-1; i++)
    {
        //选择第i位置作为第一个,则
        tmp = nums[i]&(qz[i-1])&(hz[i+1]);
        
        if(tmp > ans){
            pos = i;
            ans = tmp;
        }
    }

    int q = nums[0];
    for (int i = 1; i < n; i++)
    {
        q&=(~nums[i]);
    }
    if(q > ans){
        pos = 0;
        ans = q;
    }

    q = nums[n-1];
    for (int i=n-1-1;i>=0;i--)
    {
        q&=(~nums[i]);
    }
    if(q > ans){
        pos = n-1;
        ans = q;
    }


    


    for (int i = 0; i < n; i++)
    {
        cout<<nums[(i+pos)%n]<<" ";
    }
    
    
    


    
    

    
    return 0;
}


```