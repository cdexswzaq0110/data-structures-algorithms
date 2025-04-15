#include <algorithm>
#include <iostream>
#include <limits>
#include <vector>

int main() {
    const int inf = std::numeric_limits<int>::max() / 4;
    std::vector<std::vector<int>> distance = {{0, 3, inf}, {inf, 0, 2}, {5, inf, 0}};
    for (int k = 0; k < 3; ++k) {
        for (int i = 0; i < 3; ++i) {
            for (int j = 0; j < 3; ++j) {
                if (distance[i][k] != inf && distance[k][j] != inf) distance[i][j] = std::min(distance[i][j], distance[i][k] + distance[k][j]);
            }
        }
    }
    std::cout << distance[0][2] << '\n';
    return 0;
}
