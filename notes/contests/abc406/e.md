---
title: E - Popcount Sum 3 
tags: ["未AC"]
---

# E - Popcount Sum 3 

## 考えていること

例えば 1ビット目の個数を考えると N // 2 で求められそう
--> .総和だったわ...

DPとか？立てていいbit を増やしていって個数を求める？

Nからどこまでbitmap を立てていいか計算して、
itertools.combinations() を使って必要な数だけ足す modint は一旦頑張ってすべての計算でmod する

combinations だと、k が大きいときにTLE してしまうので、数学的に解く必要がありそうだが、思いつかなかった...

```python
from itertools import combinations
from math import log2, floor
from functools import reduce
T = int(input())


for _ in range(T):
    n, k = map(int, input().split())

    # N から 最大の bit を求める log2(N)
    max_bit = floor(log2(n))
    available_bits = range(0, max_bit)


    ans = 0
    for bit_items in combinations(available_bits, k):
        print(bit_items)
        val = reduce(lambda prev, current: prev + (2 ** current), bit_items)
        if val > n:
            continue

        ans += val
        ans %= 998244353
    
    print(ans)
```