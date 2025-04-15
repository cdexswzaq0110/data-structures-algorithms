#include <algorithm>
#include <iostream>
#include <vector>

void sortValues(std::vector<int>& values) {
    std::make_heap(values.begin(), values.end());
    std::sort_heap(values.begin(), values.end());
}

int main() {
    std::vector<int> values = {5, 1, 4, 2, 8};
    sortValues(values);
    for (int value : values) {
        std::cout << value << ' ';
    }
    std::cout << '\n';
    return 0;
}
