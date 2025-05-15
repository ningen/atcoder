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