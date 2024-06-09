n = int(input())
a = list(map(int, input().split()))
counts = [1] * n
ans = 0

for i in range(n):
    idx = a[i] - 1
    if idx == i:
        count = 0
    if idx > i:
        count = a[idx]
    else:
        count = 1
    count += 1 # 自分自身
    print(count)
    ans+=count
    counts[i] = count

print(ans)
