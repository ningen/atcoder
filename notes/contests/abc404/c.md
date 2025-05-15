---
title: C - Cycle Graph? 
tags: ["graph", "解説AC", "未AC"]
---

0:13 開始

# C - Cycle Graph? 

## 考えたこと

内容はわかってないけど、単純に

- それぞれの頂点に対して辺が2つつながっている
- 孤立した頂点が存在しない
- 頂点Nで始めたら、頂点Nに帰ってこれる

↑でいけそうだったけど実装がわからず30分たって、解説を見た

## 解説

サイクルグラフ ->  どこかの頂点から始まって、自信まで戻ってこれるようなグラフ
「サイクル」だと一部分でサイクルになっているだけ。サイクルグラフはグラフ全体がサイクルになっているようなもの

サイクルグラフに必要な要素は2つ

- 次数が2つ
- 連結している

次数 -> 頂点に引っ付いている辺の数
連結 -> 任意の頂点Nから頂点Mに遷移できる部分

愚直にやるなら、任意の頂点Nから訪問していない方の頂点を辿っていって自分自身に戻ってこれるか

## 提出

解説だけを聞いて、自分で実装してみた

```python
from collections import deque

def solve():
    N, M = map(int, input().split())
    edges = [[] for _ in range(N)]
    visited = [False for _ in range(N)]

    for _ in range(M):
        a, b = map(int, input().split())
        a-=1
        b-=1
        edges[a].append(b)
        edges[b].append(a)

    if not all(map(lambda val: len(val) == 2, edges)):
        print("No")
        return

    ans = False
    queue = deque()
    queue.append(0)

    while len(queue) > 0:
        idx = queue.popleft()
        visited[idx] = True

        edge = edges[idx]

        if edge[0] == 0 or edge[1] == 0:
            ans = True
            break

        if visited[edge[0]] == False:
            queue.append(edges[idx][0])
        elif visited[edge[1]] == False:
            queue.append(edges[idx][1])
        

    print("Yes" if ans else "No")

solve()
```