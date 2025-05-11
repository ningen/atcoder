N = int(input())

unq = set()

for i in range(N):
    prev_len = len(unq)
    user = input()
    unq.add(user)

    if prev_len != len(unq):
        print(i + 1)