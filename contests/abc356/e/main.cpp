#include<bits/stdc++.h>
#include <vector>

using namespace std;

int main() {
    int N;
    cin >> N;
    vector<int> A(N);
    for(int i = 0; i < N; i++) {
        cin >> A[i];
    }

    long long sum = 0;

    for(int i = 0; i < N-1; i++) {
        for(int j = i + 1; j < N; j++) {
            int minVal = min(A[i], A[j]);
            int maxVal = max(A[i], A[j]);
            sum += maxVal / minVal;
        }
    }

    cout << sum << endl;
    return 0;
}
