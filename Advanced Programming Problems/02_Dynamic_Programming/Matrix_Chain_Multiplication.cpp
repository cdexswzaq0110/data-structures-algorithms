#include <algorithm>
#include <iostream>
#include <limits>
#include <vector>

int main() {
    std::vector<int> dimensions = {40, 20, 30, 10, 30};
    int n = static_cast<int>(dimensions.size()) - 1;
    std::vector<std::vector<int>> dp(n, std::vector<int>(n, 0));
    for (int length = 2; length <= n; ++length) {
        for (int left = 0; left <= n - length; ++left) {
            int right = left + length - 1;
            dp[left][right] = std::numeric_limits<int>::max();
            for (int split = left; split < right; ++split) {
                int cost = dp[left][split] + dp[split + 1][right] + dimensions[left] * dimensions[split + 1] * dimensions[right + 1];
                dp[left][right] = std::min(dp[left][right], cost);
            }
        }
    }
    std::cout << dp[0][n - 1] << '\n';
    return 0;
}
