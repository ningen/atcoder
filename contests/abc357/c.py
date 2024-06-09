level_1 = [
    ["#", "#", "#"],
    ["#", ".", "#"],
    ["#", "#", "#"],
]

empty = ["."]


level_2 = [
    level_1[0] * 3,
    level_1[1] * 3,
    level_1[2] * 3,
    level_1[0] * 3,
    level_1[1] * 1, empty * 3, level_1[1] * 1,
    level_1[2] * 3,
    level_1[0] * 3,
    level_1[1] * 3,
    level_1[2] * 3,
]




def build_level_n(n: int):
    ans = []
    for i in range(3 ** n):
        for j in range(3 ** n):
            i_idx = i // (3 ** (n - 1))
            j_idx = j // (3 ** (n - 1))
            ans.append(level_1[i_idx][j_idx])
        
        if not (i == 3 ** n - 1):
            ans.append("\n")
    return ans


n = int(input())

# print("".join(build_level_n(n)))
for i in range(len(level_2)):
    print("".join(level_2[i]))
