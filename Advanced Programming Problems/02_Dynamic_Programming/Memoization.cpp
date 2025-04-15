#include <iostream>
#include <vector>

long long fibonacci(int n, std::vector<long long>& memo) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

int main() {
    std::vector<long long> memo(11, -1);
    std::cout << fibonacci(10, memo) << '\n';
    return 0;
}
