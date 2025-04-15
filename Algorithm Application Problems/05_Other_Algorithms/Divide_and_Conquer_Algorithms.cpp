#include <algorithm>
#include <iostream>
#include <vector>

int maximumSubarray(const std::vector<int>& values, int left, int right) {
    if (left == right) return values[left];
    int middle = left + (right - left) / 2;
    int bestLeft = maximumSubarray(values, left, middle);
    int bestRight = maximumSubarray(values, middle + 1, right);
    int sum = 0, crossLeft = values[middle], crossRight = values[middle + 1];
    for (int i = middle; i >= left; --i) { sum += values[i]; crossLeft = std::max(crossLeft, sum); }
    sum = 0;
    for (int i = middle + 1; i <= right; ++i) { sum += values[i]; crossRight = std::max(crossRight, sum); }
    return std::max({bestLeft, bestRight, crossLeft + crossRight});
}

int main() {
    std::vector<int> values = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    std::cout << maximumSubarray(values, 0, static_cast<int>(values.size()) - 1) << '\n';
    return 0;
}
