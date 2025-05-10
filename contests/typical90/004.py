# 解説: https://drken1215.hatenablog.com/entry/2021/07/25/215000
H, W = map(int, input().split())

a = [None] * H

for i in range(H):
    a[i] = list(map(int, input().split()))


H_SUMS = [0] * H
W_SUMS = [0] * W


for i in range(H):
    for j in range(W):
        H_SUMS[i] += a[i][j]
        W_SUMS[j] += a[i][j]


for i in range(H):
    for j in range(W):
        end = "\n" if j == W - 1 else " "
        print(H_SUMS[i] + W_SUMS[j] - a[i][j], end=end)