from collections import deque


Q = int(input())


cards = deque()

for _ in range(Q):
    t, x = map(int, input().split())

    if t == 1:
        cards.appendleft(x)
    if t == 2:
        cards.append(x)
    if t == 3:
        print(cards[x - 1])