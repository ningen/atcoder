---
title: A - Not Acceptable
tags: []
---

# A - Not Acceptable

## 考えたこと

提出期限の時間が違う場合のみ　分での比較が必要
なので、先に時間での比較をして同じ場合のみ分で比較する


## 提出

```python
def solve():
    A, B, C, D = map(int, input().split())
    if A != C:
        if A > C:
            print("Yes")
        else:
            print("No")
        return
    
    if B > D:
        print("Yes")
    else:
        print("No")

    



solve()
```