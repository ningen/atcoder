from math import gcd


a, b, c = map(int, input().split())

num = gcd(a, b, c)

print(a // num - 1 + b // num - 1 + c // num - 1)