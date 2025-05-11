# 解説AC

from math import ceil
H, W = map(int, input().split())

if H == 1 or W == 1:
    print(H * W)
else:
    print(ceil(H / 2) * ceil(W / 2))
