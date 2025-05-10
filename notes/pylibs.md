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