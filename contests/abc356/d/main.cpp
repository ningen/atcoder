#include<bits/stdc++.h>
#include<vector>
using namespace std;

#define ll long long 


long long countSetBits(ll n, int i) {
    if (i < 0 || n < 0) {
        return 0;
    }

    ll block_size = 1LL << i;  // 2^i
    ll half_block_size = block_size >> 1;  // 2^(i-1)

    ll quotient = n / block_size;
    ll remainder = n % block_size;

    ll count = quotient * half_block_size;
    count += max(0LL, remainder - half_block_size + 1);

    return count;
}

int main() {
    ll n, m; cin >> n >> m;
    ll ans = 0;

    if(m % 2 == 1) {
        ans += ((n + 1) / 2) % 998244353;
    }

    for(ll i=1;i<=60; i++) {
        ll val = pow(2, i);

        ll counts;
        bool match;

        counts = countSetBits(n, i+1);
        match = (m >> i) & 1;

        if(counts == 0) break;

        if(match) {
            ans += counts;
            ans %= 998244353;
        };
    }

    cout << ans << endl;
}