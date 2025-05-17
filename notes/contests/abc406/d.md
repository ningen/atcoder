---
title: D - Garbage Removal 
tags: []
---

# D - Garbage Removal 

## 考えたこと

ある程度高速にゴミを削除できる必要がある
単純な2次元配列で管理するとゴミの削除のたびにO(N ** 2) の計算量が掛かりそうで、現実的ではない。
x軸ベースとy軸ベースでゴミのindex を管理して、まず消すゴミのx, y 座標を特定。
特定さえしてしまえば、Set() を使えば削除自体はO(1) で行えるため、十分に高速なはず

## 提出

```python
def solve():
    H, W, N = map(int, input().split())
    x_gomi = [set() for _ in range(H)] # x[i] で x[i] に入っているゴミの index がわかる
    y_gomi = [set() for _ in range(W)] # y[i] で y[i] に入っているゴミの index がわかる

    for i in range(N):
        x, y = map(int, input().split())
        x -= 1
        y -= 1
        x_gomi[x].add(y)
        y_gomi[y].add(x)

    Q = int(input())
    for _ in range(Q):
        command, val = map(int, input().split())
        val -= 1
        if command == 1:
            print(len(x_gomi[val]))
            for y_index in x_gomi[val]:
                y_gomi[y_index].remove(val)
            
            x_gomi[val] = set()
        if command == 2:
            print(len(y_gomi[val]))
            for x_index in y_gomi[val]:
                x_gomi[x_index].remove(val)
            
            y_gomi[val] = set()
            

solve()
```