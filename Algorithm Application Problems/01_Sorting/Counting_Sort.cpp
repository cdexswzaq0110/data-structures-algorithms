#include <algorithm>
#include <iostream>
#include <vector>

std::vector<int> countingSort(const std::vector<int>& values) {
    int maximum = *std::max_element(values.begin(), values.end());
    std::vector<int> counts(maximum + 1, 0);
    for (int value : values) ++counts[value];
    std::vector<int> result;
    for (int value = 0; value <= maximum; ++value) result.insert(result.end(), counts[value], value);
    return result;
}

int main() {
    for (int value : countingSort({4, 2, 2, 8, 3, 3, 1})) std::cout << value << ' ';
    std::cout << '\n';
    return 0;
}
