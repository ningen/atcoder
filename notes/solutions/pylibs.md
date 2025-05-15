---
title: Python で使う標準ライブラリ
tags: ["累積和", "combination"]
---

# Python で使う標準ライブラリ

## 累積和

```python
from itertools import accumulate
```

## N 個の中から k 個を選ぶ

```python
from itertools import combinations
for comb in combinations(A, k):
    # comb は tuple
```

## 先頭へも末尾へも高速に挿入、削除したいとき

```python
from collections import deque
que = deque()

que.appendleft() # 先頭への追加
que.append() # 末尾への追加
que[i] # index access
```

## 文字列を1文字ずつに分解する方法

```python
s = "python"
splited = list(s)
```

## ２次元配列の行列を回転する

```
arr = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]

rotate = lambda base: [list(reversed(items)) for items in zip(*base)]

```
