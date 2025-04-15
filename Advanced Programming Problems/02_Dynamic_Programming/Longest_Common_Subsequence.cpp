#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

int main() {
    std::string a = "AGGTAB";
    std::string b = "GXTXAYB";
    std::vector<std::vector<int>> dp(a.size() + 1, std::vector<int>(b.size() + 1, 0));
    for (std::size_t i = 1; i <= a.size(); ++i) {
        for (std::size_t j = 1; j <= b.size(); ++j) {
            dp[i][j] = a[i - 1] == b[j - 1] ? dp[i - 1][j - 1] + 1 : std::max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    std::cout << dp[a.size()][b.size()] << '\n';
    return 0;
}
