#include <iostream>
#include <vector>

std::vector<int> mergeSort(std::vector<int> values) {
    if (values.size() <= 1) return values;
    std::size_t middle = values.size() / 2;
    std::vector<int> left(values.begin(), values.begin() + middle);
    std::vector<int> right(values.begin() + middle, values.end());
    left = mergeSort(left);
    right = mergeSort(right);
    std::vector<int> result;
    std::size_t i = 0, j = 0;
    while (i < left.size() || j < right.size()) {
        if (j == right.size() || (i < left.size() && left[i] <= right[j])) result.push_back(left[i++]);
        else result.push_back(right[j++]);
    }
    return result;
}

int main() {
    for (int value : mergeSort({5, 1, 4, 2, 8})) std::cout << value << ' ';
    std::cout << '\n';
    return 0;
}
