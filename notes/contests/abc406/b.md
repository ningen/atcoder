---
title: B - Product Calculator
tags: []
---

# B - Product Calculator

## 考えていたこと

単純に問題文をシュミレートすれば良さそう

## 提出

```python
def solve():
    N, K = map(int, input().split())
    A = list(map(int, input().split()))

    val = 1
    for i in range(N):
        tmp_val = val * A[i]
        if tmp_val >= 10 ** K:
             val = 1
        else:
             val = tmp_val
    print(val)


solve()
```