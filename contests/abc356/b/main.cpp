#include<bits/stdc++.h>
#include<vector>
using namespace std;

int main() {

    int n, m; cin >> n >> m;
    vector<int> a(m);
    for(int i=0;i<m;i++) cin >> a[i];
    for(int i=0;i<n;i++) {
        for(int j=0;j<m;j++) {
            int v; cin >> v;
            a[j] -= v;
        }
    }

    for(int i=0;i<m;i++) {
        if(a[i] > 0) {
            cout << "No" << endl;
            return 0;
        }
    }

    cout << "Yes" << endl;
    return 0;
}