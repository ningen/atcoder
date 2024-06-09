def mod_inverse(a, p):
    # フェルマーの小定理を使って逆元を計算
    return pow(a, p-2, p)

def repeated_concatenation_remainder(N):
    MOD = 998244353
    N_str = str(N)
    d = len(N_str)
    N_int = int(N_str) % MOD
    power_of_10_d = pow(10, d, MOD)
    
    # 幾何級数の分母
    denominator = (power_of_10_d - 1 + MOD) % MOD
    denominator_inv = mod_inverse(denominator, MOD)
    
    # 幾何級数の分子
    numerator = (pow(power_of_10_d, N, MOD) - 1 + MOD) % MOD
    
    # 計算結果
    result = (N_int * numerator % MOD) * denominator_inv % MOD
    return result

N = int(input()) 
print(repeated_concatenation_remainder(N))
