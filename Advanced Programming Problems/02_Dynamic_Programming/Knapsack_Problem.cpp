#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> weights = {10, 20, 30};
    std::vector<int> values = {60, 100, 120};
    int capacity = 50;
    std::vector<int> dp(capacity + 1, 0);
    for (std::size_t item = 0; item < weights.size(); ++item) {
        for (int weight = capacity; weight >= weights[item]; --weight) {
            dp[weight] = std::max(dp[weight], dp[weight - weights[item]] + values[item]);
        }
    }
    std::cout << dp[capacity] << '\n';
    return 0;
}
