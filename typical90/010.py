# from itertools import accumulate


n = int(input())

one = [0] * n 
two = [0] * n


for i in range(n):
    one[i] = one[i-1] if i > 0 else 0
    two[i] = two[i-1] if i > 0 else 0

    c, p = map(int, input().split())
    cls_arr = one if c == 1 else two
    cls_arr[i] += p


q = int(input())

for _ in range(q):
    l, r = map(int, input().split())
    l-=1
    r-=1

    calc_sum = lambda arr: arr[r] - (arr[l-1] if  l > 0 else 0)
    print(calc_sum(one), calc_sum(two))