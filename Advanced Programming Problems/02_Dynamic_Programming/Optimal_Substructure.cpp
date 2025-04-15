#include <algorithm>
#include <iostream>
#include <vector>

int maxNonAdjacentSum(const std::vector<int>& values) {
    int take = 0;
    int skip = 0;
    for (int value : values) {
        int nextTake = skip + value;
        skip = std::max(skip, take);
        take = nextTake;
    }
    return std::max(take, skip);
}

int main() {
    std::cout << maxNonAdjacentSum({2, 7, 9, 3, 1}) << '\n';
    return 0;
}
