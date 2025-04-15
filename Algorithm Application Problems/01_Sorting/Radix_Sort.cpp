#include <algorithm>
#include <iostream>
#include <vector>

void radixSort(std::vector<int>& values) {
    int maximum = *std::max_element(values.begin(), values.end());
    for (int exp = 1; maximum / exp > 0; exp *= 10) {
        std::vector<int> output(values.size());
        int count[10] = {};
        for (int value : values) ++count[(value / exp) % 10];
        for (int i = 1; i < 10; ++i) count[i] += count[i - 1];
        for (int i = static_cast<int>(values.size()) - 1; i >= 0; --i) output[--count[(values[i] / exp) % 10]] = values[i];
        values = output;
    }
}

int main() {
    std::vector<int> values = {170, 45, 75, 90, 802, 24, 2, 66};
    radixSort(values);
    for (int value : values) std::cout << value << ' ';
    std::cout << '\n';
    return 0;
}
