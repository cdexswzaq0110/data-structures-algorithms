#include <algorithm>
#include <iostream>
#include <vector>

void sortValues(std::vector<int>& values) {
    for (std::size_t index = 0; index < values.size(); ++index) {
        std::size_t minimum = index;
        for (std::size_t candidate = index + 1; candidate < values.size(); ++candidate) {
            if (values[candidate] < values[minimum]) {
                minimum = candidate;
            }
        }
        std::swap(values[index], values[minimum]);
    }
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
