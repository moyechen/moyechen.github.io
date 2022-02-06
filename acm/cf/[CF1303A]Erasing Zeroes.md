# [CF1303A]Erasing Zeroes

## <center>[Erasing Zeroes](https://codeforces.com/contest/1303/problem/A)</center>

You are given a string `s`. Each character is either 0 or 1.

You want all 1's in the string to form a contiguous subsegment. For example, if the string is 0, 1, 00111 or 01111100, then all 1's form a contiguous subsegment, and if the string is 0101, 100001 or 11111111111101, then this condition is not met.

You may erase some (possibly none) 0's from the string. What is the minimum number of 0's that you have to erase?

__Input__
The first line contains one integer  ($1 <= t <= 100$) — the number of test cases.

Then  lines follow, each representing a test case. Each line contains one string  ($1 <= s <= 100$  ) each character of  is either 0 or 1.

__Output__
Print  integers, where the -th integer is the answer to the -th testcase (the minimum number of 0's that you have to erase from ).

__Example__
|INPUT|OUTPUT|
|---|---|
|3<br>010011<br>0<br>1111000|2<br>0<br>0 |

__Note__
In the first test case you have to delete the third and forth symbols from string 010011 (it turns into 0111).

__think__
找第一个`1`和最后一个`1`之间有多少个0


__solution__

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
2020 - 02 - 12 - 22 - 36
*/

using namespace std;
typedef long long ll;
const int maxn = 5e5 + 5;
const int inf  = 0x3f3f3f3f;



int main() {
std::ios::sync_with_stdio(false);
cin.tie(0);

    int n;
    cin>>n;
    int tmp;
    string s;
    for (int i = 0; i < n; i++)
    {
        cin>>s;

        int ind1 = -1,ind2 = -1;
        for (int j = 0; j < s.size(); j++)
        {
            if(s[j] == '1'){
                ind1 = j;
                break;
            }
        }
        for (int j = s.size() - 1; j >= 0; j--)
        {
            if(s[j] == '1'){
                ind2 = j;
                break;
            }
        }
        if(ind1 == -1){
            cout<<"0"<<endl;
            continue;
        }

        if(ind2 == ind1){
            cout<<"0"<<endl;
            continue;
        }
        int ans = 0;
        for (int j = ind1; j <= ind2; j++)
        {
            if(s[j] == '0')ans++;
        }
        cout<<ans<<endl;
        

        
        
    }
    
    
    return 0;
}

```