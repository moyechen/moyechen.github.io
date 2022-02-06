# [CF1300A]


## <center>[Non-zero](https://codeforces.com/contest/1300/problem/A)</centet>
Guy-Manuel and Thomas have an array $a$ of $n$ integers [$a_1, a_2, \dots, a_n$]. In one step they can add $1$ to any element of the array. Formally, in one step they can choose any integer index $i$ ($1 \le i \le n$) and do $a_i := a_i + 1$.

_If either the sum or the product of all elements in the array is equal to zero, Guy-Manuel and Thomas do not mind to do this operation one more time._

What is the minimum number of steps they need to do to make both the sum and the product of all elements in the array different from zero? Formally, find the minimum number of steps to make $a_1 + a_2 +$ $\dots$ $+ a_n \ne 0$ and $a_1 \cdot a_2 \cdot$ $\dots$ $\cdot a_n \ne 0$.


|__input__|__output__|
|:--|--|
|4<br>3<br>2 -1 -1<br>4<br>-1 0 0 1<br>2<br>-1 2<br>3<br>0 -2 1<br>|1<br>2<br>0<br>2|




题意:
数组有n个元素,  你可以执行一次操作,让某个数字加1
问最少多少次操作后,  数组的和以及乘积均不为0

题解:
计算0的个数,记为cnt
再求一下原数组的和,记为sum

如果 sum + cnt != 0, 输出sum + cnt ;
否则输出 sum + cnt +1




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
2020 - 02 - 09 - 22 - 06
*/

using namespace std;
typedef long long ll;
const int maxn = 1e5 + 5;
const int inf  = 0x3f3f3f3f;



int main() {
std::ios::sync_with_stdio(false);
cin.tie(0);

    int t,n;
   
    cin>>t;
    while (t--)
    {
        cin>>n;
        ll sum = 0;
        int q = 0;
        for (int i = 0; i < n; i++)
        {   int tmp;

            cin>>tmp;
            if(tmp == 0){
                q++;
            }
            sum += tmp;
        }

        if(sum + q == 0){
            cout<<q+1<<endl;
        }else
        {
            cout<<q<<endl;
        }
    }
    
    

    return 0;
}
```