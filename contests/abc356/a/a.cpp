#include<bits/stdc++.h>
#include<vector>
using namespace std;

int main() {
    int n, l, r; cin >> n >> l >> r;
    l--;
    r--;

    vector<int> ans(n);
    for(int i=0;i<n;i++) {
        ans[i] = i + 1;
    }

    sort(ans.begin() + l, ans.begin() + r + 1, std::greater<>());

    for(int i=0;i<n;i++) {
        cout << ans[i];
        if(i != n - 1) {
            cout << ' ';
        } else {
            cout << endl;
        }
    }
}