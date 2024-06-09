#include<bits/stdc++.h>
#include<vector>
using namespace std;


int main() {
    int n, m; cin >> n >> m;
    vector<int> h(n);
    for(int i=0;i<n;i++) cin >> h[i];

    int ans = 0;

    while(true) {
        if(m - h[ans] < 0 || ans == n) break;
        m -= h[ans];
        ans++;
    }

    cout << ans << endl;
}