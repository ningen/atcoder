#include<bits/stdc++.h>
#include<vector>
using namespace std;


int main() {
    string s; cin >> s;

    int lower_count = 0;
    int upper_count = 0;

    for(int i=0;i<s.length(); i++) {
        if(('a' <= s[i]) && (s[i] <= 'z')) {
            lower_count++;
        } else {
            upper_count++;
        }
    }

    if(upper_count > lower_count) {
        transform(s.begin(), s.end(), s.begin(), [](char &c) {
            return toupper(c);
        });
    } else {
        transform(s.begin(), s.end(), s.begin(), [](char &c) {
            return tolower(c);
        }); 
    }

    cout << s << endl;

}