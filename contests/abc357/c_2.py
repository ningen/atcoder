import sys
sys.setrecursionlimit(10**9)

def generate_block(level):
    if level == 1:
        return [
            "###",
            "#.#",
            "###"
        ]

    if level == 0:
        return ["#"]
    
    # 前のレベルのブロックを取得
    prev_block = generate_block(level - 1)
    size = len(prev_block)
    new_size = size * 3
    new_block = [['' for _ in range(new_size)] for _ in range(new_size)]
    
    for i in range(3):
        for j in range(3):
            for x in range(size):
                for y in range(size):
                    if i == 1 and j == 1:
                        new_block[i * size + x][j * size + y] = '.'  # 中央のブロックは空
                    else:
                        new_block[i * size + x][j * size + y] = prev_block[x][y]
    
    return ["".join(row) for row in new_block]

# 使用例
level = int(input())
block = generate_block(level)
for row in block:
    print(row)
