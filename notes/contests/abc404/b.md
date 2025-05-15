---
title: B - Grid Rotation
tags: []
---

# B - Grid Rotation

## 考えたこと

愚直に回転しながらarrayのdiff を数えればOK
どっちを回転するのかと、回すのもdiff に加える必要がある

## 提出

```python
import pprint
N = int(input())

S = [None] * N
T = [None] * N

rotate = lambda base: [list(reversed(items)) for items in zip(*base)]

def calc_diff(arr1, arr2, N):
    diff = 0
    for i in range(N):
        for j in range(N):
            if arr1[i][j] != arr2[i][j]:
                diff+=1
    return diff


for i in range(N):
    val = input()
    S[i] = list(val)

for i in range(N):
    val = input()
    T[i] = list(val)

ans = 100000
for rotate_num in range(0,4):
    arr2 = S
    cnt = 0
    for _ in range(rotate_num):
        arr2 = rotate(arr2)
        cnt+= 1
    ans = min(ans, calc_diff(T, arr2, N) + cnt)

print(ans)
```
