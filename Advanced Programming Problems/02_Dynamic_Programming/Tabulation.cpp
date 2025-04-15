#include <iostream>
#include <vector>

int main() {
    int n = 10;
    std::vector<long long> table(n + 1, 0);
    table[1] = 1;
    for (int i = 2; i <= n; ++i) table[i] = table[i - 1] + table[i - 2];
    std::cout << table[n] << '\n';
    return 0;
}
