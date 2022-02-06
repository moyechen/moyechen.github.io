# [CF1300B]Assigning to Classes

[Assigning to Classes](https://codeforces.com/contest/1300/problem/B)
[$a_1, a_2, \dots, a_{2k+1}$]
题意

给你2*n个学生的分数

你将其分为两个人数为奇数的队伍

问中位数差 的绝对值 最小为几


题解:

直接分为两部分, 人数分别为1,  2*n -1
排序后取中间两个数,相减即可

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
2020 - 02 - 09 - 22 - 12
*/

using namespace std;
typedef long long ll;
const int maxn = 1e5 + 5;
const int inf  = 0x3f3f3f3f;



int main() {
std::ios::sync_with_stdio(false);
cin.tie(0);
    int t,n,tmp;
    cin>>t;

    vector<int> v;
    while (t--)
    {
        v.clear();
        cin>>n;

        for (int i = 0; i < 2*n; i++)
        {
            cin>>tmp;
            v.push_back(tmp);

        }
        sort(v.begin(),v.end());

        int ans = v[n] - v[n-1];
        
        if(ans < 0)ans*= -1;
        cout<<ans<<endl;

    }
    

    
    return 0;
}

```